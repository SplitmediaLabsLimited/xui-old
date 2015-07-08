/// <reference path="../../_references.ts" />

module xui.core {
    import iItem = internal.Item;
    import Environment = internal.Environment;

    export interface IItemConfigurable {
        loadConfig(): Promise<any>;
        saveConfig(configObj: any): void;
        applyConfig(configObj: any): void;
        requestSaveConfig(configObj: any): void;
        revertConfig(configObj: any): void;
    }

    class ItemConfigurable implements IItemConfigurable {
        private id: string;
        private viewID: number;

        loadConfig(): Promise<any> {
            return new Promise(resolve => {
                let slot = iItem.attach(this.id, this.viewID);

                iItem.get('prop:BrowserConfiguration', slot).then(config => {
                    let configObj = config === null ? {} : JSON.parse(config);
                    let persist = internal['persistedConfig'];
                    for (var key in persist) {
                        delete configObj[key];
                    }
                    resolve(configObj);
                });
            });
        }

        saveConfig(configObj: any) {
            if (Environment.isSourceHtml()) {
                // check for valid object
                if ({}.toString.call(configObj) === '[object Object]') {
                    xui['source'].SourceWindow.getInstance().rememberConfig(
                        configObj);

                    // add persisted configuration if available
                    // currently only top level merging is available
                    let persist = internal['persistedConfig'];
                    for (var key in persist) {
                        configObj[key] = persist[key];
                    }

                    internal.exec('SetBrowserProperty', 'Configuration',
                        JSON.stringify(configObj));
                } else {
                    throw new Error('Configuration objects should be JSON.');
                }
            } else {
                throw new Error(
                    'Only the source HTML itself may save configuration.' +
                    ' Consider applyConfig() instead.');
            }
        }

        applyConfig(configObj: any) {
            let slot = iItem.attach(this.id, this.viewID);

            iItem.set('prop:BrowserConfiguration', JSON.stringify(
                configObj), slot);
        }

        requestSaveConfig(configObj: any): void {
            if (Environment.isSourceHtml()) {
                throw new Error('Source HTML can call saveConfig() to save.');
            } else {
                let slot = iItem.attach(this.id, this.viewID);

                internal.exec('CallInner' + (slot === 0 ? '' : (slot + 1)),
                    'MessageSource', JSON.stringify({
                        'request' : 'saveConfig',
                        'data'    : configObj
                }));
            }
        }

        revertConfig(): void {
            if (Environment.isSourceHtml()) {
                throw new Error('Source HTML automatically reverts its ' +
                    'configuration when its configuration window or a global ' +
                    'script calls revertConfig().');
            } else {
                let slot = iItem.attach(this.id, this.viewID);

                internal.exec('CallInner' + (slot === 0 ? '' : (slot + 1)),
                    'MessageSource', JSON.stringify({
                        'request' : 'revertConfig'
                }));
            }
        }
    }

    internal.utils.applyMixins(Item, [ItemConfigurable]);
}

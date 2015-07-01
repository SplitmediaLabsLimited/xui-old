/// <reference path="../../_references.ts" />

module xui.core {
    import iItem = internal.Item;
    import Environment = internal.Environment;

    export interface IItemConfigurable {
        loadConfig(): Promise<{}>;
        saveConfig(configObj: {}): void;
        applyConfig(configObj: {}): void;
        requestSaveConfig(configObj: {}): void;
        revertConfig(configObj: {}): void;
    }

    class ItemConfigurable implements IItemConfigurable {
        private id: string;
        private viewID: number;

        loadConfig(): Promise<{}> {
            return new Promise(resolve => {
                let slot = iItem.attach(this.id, this.viewID);

                iItem.get('prop:BrowserConfiguration', slot).then(config => {
                    let configObj = JSON.parse(config);
                    let persist = internal['persistedConfig'];
                    for (var key in persist) {
                        delete configObj[key];
                    }
                    resolve(configObj);
                });
            });
        }

        saveConfig(configObj: {}) {
            if (Environment.isSourceHtml()) {
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
                throw new Error(
                    'Only the source HTML itself may save configuration.' +
                    ' Consider applyConfig() instead.');
            }
        }

        applyConfig(configObj: {}) {
            let slot = iItem.attach(this.id, this.viewID);

            iItem.set('prop:BrowserConfiguration', JSON.stringify(
                configObj), slot);
        }

        requestSaveConfig(configObj: {}): void {
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

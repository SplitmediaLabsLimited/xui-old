/// <reference path="../../_references.ts" />

module xui.core {
    import iItem = internal.Item;
    import JSON = internal.utils.JSON;
    import Environment = internal.Environment;

    export interface IItemConfigurable {
        loadConfig(): Promise<JSON>;
        saveConfig(configObj: JSON): void;
        applyConfig(configObj: JSON): void;
    }

    class ItemConfigurable implements IItemConfigurable {
        private id: string;
        private viewID: number;

        loadConfig(): Promise<JSON> {
            return new Promise(resolve => {
                let slot = iItem.attach(this.id, this.viewID);

                iItem.get('prop:BrowserConfiguration', slot).then(config => {
                    let configObj = window['JSON'].parse(config);
                    let persist = internal['persistedConfig'];
                    for (var key in persist) {
                        delete configObj[key];
                    }
                    resolve(configObj);
                });
            });
        }

        saveConfig(configObj: JSON) {
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
                    window['JSON'].stringify(configObj));
            } else {
                throw new Error(
                    'Only the source HTML itself may save configuration.' +
                    ' Consider applyConfig() instead.');
            }
        }

        applyConfig(configObj: JSON) {
            let slot = iItem.attach(this.id, this.viewID);

            iItem.set('prop:BrowserConfiguration', window['JSON'].stringify(
                configObj), slot);
        }

        requestSaveConfig(configObj: JSON): void {
            if (Environment.isSourceHtml()) {
                throw new Error('Source HTML can call saveConfig() to save.');
            } else {
                let slot = iItem.attach(this.id, this.viewID);

                internal.exec('CallInner' + (slot === 0 ? '' : (slot + 1)),
                    'MessageSource', window['JSON'].stringify({
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
                    'MessageSource', window['JSON'].stringify({
                        'request' : 'revertConfig'
                }));
            }
        }
    }

    internal.utils.applyMixins(Item, [ItemConfigurable]);
}

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
                iItem.attach(this.id, this.viewID);

                iItem.get('prop:BrowserConfiguration').then(config => {
                    let configObj = window['JSON'].parse(config);
                    let persist = internal['persistConfig'];
                    for (var key in persist) {
                        delete configObj[key];
                    }
                    resolve(configObj);
                });
            });
        }

        saveConfig(configObj: JSON) {
            // add persisted configuration if available
            // currently only top level merging is available
            let persist = internal['persistConfig'];
            for (var key in persist) {
                configObj['key'] = persist['key'];
            }

            if (Environment.isSourceHtml()) {
                internal.exec('SetBrowserProperty', 'Configuration',
                    window['JSON'].stringify(configObj));
            } else {
                throw new Error(
                    'Only the source HTML itself may save configuration.' +
                    ' Consider applyConfig() instead.');
            }
        }

        applyConfig(configObj: JSON) {
            iItem.set('prop:BrowserConfiguration', window['JSON'].stringify(
                configObj));
        }
    }

    internal.utils.applyMixins(Item, [ItemConfigurable]);
}

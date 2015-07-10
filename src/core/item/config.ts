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
                    let configObj = config === 'null' ? {} : JSON.parse(config);
                    let persist = internal['persistedConfig'];
                    for (var key in persist) {
                        delete configObj[key];
                    }
                    resolve(configObj);
                });
            });
        }

        saveConfig(configObj: any) {
            if (this['type'] !== ItemTypes.HTML) {
                throw new Error('Only HTML sources have configuration ' +
                    'objects.');
            } else if (Environment.isSourceHtml()) {
                let slot = iItem.attach(this.id, this.viewID);

                // only allow direct saving for self
                if (slot === 0) {
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
                        throw new Error('Configuration object should be JSON.');
                    }
                } else {
                    throw new Error('Sources may only request other sources ' +
                        'to save a configuration. Consider calling ' +
                        ' requestSaveConfig() on this Item instance instead.');
                }
            } else {
                throw new Error(
                    'Script plugins and source configuration windows are not ' +
                    'allowed to directly save configuration objects. Call ' +
                    'requestSaveConfig() instead.');
            }
        }

        applyConfig(configObj: any) {
            if (this['type'] !== ItemTypes.HTML) {
                throw new Error('Only HTML sources have configuration ' +
                    'objects.');
            } else {
                let slot = iItem.attach(this.id, this.viewID);

                iItem.set('prop:BrowserConfiguration', JSON.stringify(
                    configObj), slot);
            }
        }

        requestSaveConfig(configObj: any): void {
            if (this['type'] !== ItemTypes.HTML) {
                throw new Error('Only HTML sources have configuration ' +
                    'objects.');
            } else {
                let slot = iItem.attach(this.id, this.viewID);

                internal.exec('CallInner' + (slot === 0 ? '' : (slot + 1)),
                    'MessageSource', JSON.stringify({
                        'request': 'saveConfig',
                        'data': configObj
                    }));
            }
        }

        revertConfig(): void {
            if (this['type'] !== ItemTypes.HTML) {
                throw new Error('Only HTML sources have configuration ' +
                    'objects.');
            } else {
                let slot = iItem.attach(this.id, this.viewID);

                internal.exec('CallInner' + (slot === 0 ? '' : (slot + 1)),
                    'MessageSource', JSON.stringify({
                        'request': 'revertConfig'
                    }));
            }
        }
    }

    internal.utils.applyMixins(Item, [ItemConfigurable]);
}

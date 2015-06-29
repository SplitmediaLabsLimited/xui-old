/// <reference path="_references.ts" />

module internal {

    export function persistConfig(config: {}): void {
        internal['persistedConfig'] = config;
    }

    function readMetaConfigUrl(): Promise<any> {
        return new Promise(resolve => {
            if (Environment.isSourceHtml()) {
                // initialize config URL if necessary
                internal.exec('GetLocalPropertyAsync',
                    'prop:BrowserConfiguration',
                    result => {
                        var configObj = JSON.parse(decodeURIComponent(result));
                        if (configObj === null) {
                            configObj = {};
                        }

                        var metas = document.getElementsByTagName("meta");
                        for (var i = metas.length - 1; i >= 0; i--) {
                            if (metas[i].name === 'config-url') {
                                configObj.configUrl = metas[i].content;
                                internal.exec('SetBrowserProperty',
                                    'Configuration',
                                    JSON.stringify(configObj));

                                var persist = {
                                    configUrl: configObj.configUrl
                                };
                                persistConfig(persist);
                                break;
                            }
                        }

                        resolve();
                    });
            } else {
                resolve();
            }
        });
    }

    function getCurrentSourceID(): Promise<any> {
        return new Promise(resolve => {
            if (Environment.isSourceHtml() || Environment.isSourceConfig()) {
                // initialize Item.getSource() functions
                internal.exec('GetLocalPropertyAsync', 'prop:id',
                    result => {
                        let id = decodeURIComponent(result);
                        internal.Item.setBaseID(id);

                        if (Environment.isSourceHtml()) {
                            internal.Item.lockSourceSlot(id);
                        }

                        resolve();
                    });
            } else {
                resolve();
            }
        });
    }

    export function init(): void {
        let x = internal['initPromises'] = [];
        x.push(readMetaConfigUrl());
        x.push(getCurrentSourceID());
    }
}

internal.init();

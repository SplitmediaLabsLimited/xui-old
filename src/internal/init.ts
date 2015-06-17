/// <reference path="_references.ts" />

module internal {

    export function persistConfig(config: {}): void {
        window['internal'].persistConfig = config;
    }

    export function init(): void {
        // only valid for source plugin
        if(Environment.isSourceHtml()) {
            // initialize config URL if necessary
            internal.exec('GetLocalPropertyAsync', 'prop:BrowserConfiguration',
                result => {
                    var configObj = JSON.parse(decodeURIComponent(result));
                    if (configObj === null) {
                        configObj = {};
                    }
                    if (configObj.configUrl === undefined) {
                        var metas = document.getElementsByTagName("meta");
                        for (var i = metas.length - 1; i >= 0; i--) {
                            if (metas[i].name === 'config-url') {
                                configObj.configUrl = metas[i].content;
                                internal.exec('SetBrowserProperty',
                                    'Configuration',
                                    JSON.stringify(configObj));

                                persistConfig(configObj);
                                break;
                            }
                        }
                    }
                });

            // initialize Item.getSource() functions
            internal.exec('GetLocalPropertyAsync', 'prop:id',
                result => {
                    internal.Item.setBaseID(decodeURIComponent(result));
                });
        }
    }
}

internal.init();

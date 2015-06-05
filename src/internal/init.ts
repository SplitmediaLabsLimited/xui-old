module internal {
    export function init(): void {
        // only valid for source plugin
        if(Environment.isSourceHtml()) {
            // initialize config URL if necessary
            internal.exec('GetLocalPropertyAsync', 'prop:BrowserConfiguration',
                (result) => {
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
                                break;
                            }
                        }
                    }
                });

            // initialize Item.getSource() functions
            internal.exec('GetLocalPropertyAsync', 'prop:BrowserConfiguration',
                (result) => {
                    internal.Item.setBaseID(decodeURIComponent(result));
                });
        }
    }
}

internal.init();

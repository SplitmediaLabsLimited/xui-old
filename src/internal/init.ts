/// <reference path="_references.ts" />

module internal {

    export function persistConfig(config: {}): void {
        internal['persistedConfig'] = config;
    }

    function resolveRelativePath(path: string, base: string) {
        // ABSOLUTE PATHS
        if (path.substring(0, 7) === 'http://' || path.substring(0, 8) ===
            'https://') {
            return path;
        } else if (path.substring(0, 2) === '//') {
            // get current protocol
            return base.split('://')[0] + ':' + path;
        } else if (path.substring(0, 3) === '../') {
            // RELATIVE PATHS
            let upDirectoryCount = 0;
            // count ../ segments
            while (path.substring(0, 3) === '../') {
                path = path.substring(3);
                ++upDirectoryCount;
            }
            let baseDirectories = base.split('/');
            baseDirectories = baseDirectories.slice(0, length - 1 -
                upDirectoryCount);
            baseDirectories.push(path);
            return baseDirectories.join('/');
        } else { // captures ./ and URLS without protocols
            if (path.substring(0, 2) === './') {
                path = path.substring(2);
            }
            let baseSegments = base.split('/');
            baseSegments[baseSegments.length - 1] = path;

            return baseSegments.join('/');
        }
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
                                let url = resolveRelativePath(
                                    metas[i].content, window.location.href);
                                configObj.configUrl = url;
                                internal.exec('SetBrowserProperty',
                                    'Configuration',
                                    JSON.stringify(configObj));

                                var persist = {
                                    configUrl: url
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

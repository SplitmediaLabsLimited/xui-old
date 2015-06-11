/// <reference path="../_references.ts" />

module xui.core {
    import iApp = internal.App;
    import Scene = xui.core.Scene;
    import Item = xui.core.Item;

    enum Views {
        MAIN = 0,
        PREVIEW = 1
    }

    export class View {

        private id: number;
        
        constructor(id: number) {
            this.id = id || 0;
        }

        static MAIN = new View(Views.MAIN);
        static PREVIEW = new View(Views.PREVIEW);

        getViewID(): number {
            return this.id;
        }

        getScenes(filter?: { name?: string, id?: number }): Promise<Scene[]> {
            filter = filter ? filter : {};

            return new Promise((resolve) => {
                var ret: Array<Scene> = [];
                var regex: RegExp    = new RegExp(filter['name'], 'gi');

                iApp.getAsList('presetconfig').then(config => {
                    for (var i = 0; i < config.length; i++) {
                        if (config[i]['tag'] === 'global') {
                            continue;
                        }
                        if ((filter['name'] && regex.test(config[i]['name'])) ||
                            filter['id'] === (i + 1) ||
                            Object.keys(filter).length === 0) {
                            ret.push(new Scene({ id: i, viewID: this.id }));
                        }
                    }
                    resolve(ret);
                });
            });
        }

        getScenesCount(): Promise<number> {
            return new Promise((resolve) => {
                iApp.get('presetcount').then((count) => {
                    resolve(count);
                });
            });
        }

        setActiveScene(scene: Scene | number | any) {
            if (typeof scene === "object") {
                iApp.set('preset', scene.getID().toString());
            } else if (typeof scene === "number") {
                iApp.set('preset', scene.toString());
            }
        }

        getActiveScene(): Promise<Scene> {
            return new Promise((resolve) => {
                iApp.get('preset:' + this.id).then((sceneID) => {
                    var scene = new Scene({ id: sceneID, viewID: this.id });
                    resolve(scene);
                });
            });
        }

        getScene(sceneID: number): Promise<Scene> {
            return new Promise((resolve) => {
                resolve(new Scene({ id: sceneID, viewID: this.id }));
            });
        }

        searchItems(value: { id?: number, keyword?: string }): Promise<Item[]> {
            if (value['id'] === undefined && value['keyword'] === undefined) {
                return;
            }

            var keyword: string = value['keyword'];
            var iID: number = value['id'];
            var matches: Array<Item> = [];
            var pItems: Array<Item> = [];

            // @TODO: Discuss if this is an 'ok' approach
            var _parseItems = resolve => {
                pItems.forEach((item, idx) => {
                    item.getID().then(id => {
                        if (Number(id) === iID) {
                            matches.push(item);
                        } else {
                            return item.getName();
                        }
                    }).then(name => {
                        if (name.match(keyword) !== null) {
                            matches.push(item);
                        } else {
                            return item.getValue();
                        }
                    }).then(val => {
                        if (val.value.match(keyword) !== null) {
                            matches.push(item);
                        }

                        if (idx === pItems.length - 1) {
                            resolve(matches);
                        }
                    });
                });
            };

            return new Promise(resolve => {
                this.getScenes().then(scenes => {
                    scenes.forEach((scene, idx) => {
                        scene.getItems().then(items => {
                            if (items.length > 0) {
                                pItems = pItems.concat(items);
                            }

                            // Valid scene is only until index 11
                            if (idx === 11) {
                                _parseItems(resolve);
                            }
                        });
                    });
                });
            });
        }
    }
}

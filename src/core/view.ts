/// <reference path="../_references.ts" />

module xui.core {
    import iApp = internal.App;
    import Scene = xui.core.Scene;
    import Item = xui.core.Item;

    enum Views {
        MAIN = 0,
        PREVIEW = 1
    }

    export interface IView {
        getViewID(): Promise<number>;
        getScenes(filter?: number | string | void): Promise<IScene[]>;
        setActiveScene(scene: IScene | number);
        getActiveScene(): Promise<IScene>;
        getScene(sceneID: number): Promise<IScene>;
        searchItems(key: string): Promise<IItemBase[]>;
    }

    export class View implements IView {

        private id: number;
        
        constructor(id: number) {
            this.id = id || 0;
        }

        static MAIN = new View(Views.MAIN);
        static PREVIEW = new View(Views.PREVIEW);

        getViewID(): Promise<number> {
            return new Promise(resolve => {
                resolve(this.id);
            });
        }

        getScenes(filter?: number | string | void): Promise<Scene[]> {
            return new Promise((resolve) => {
                let ret: Array<Scene> = [];
                let regex = typeof filter === 'string' ?
                    new RegExp(filter, 'gi') : new RegExp('');

                iApp.getAsList('presetconfig').then(config => {
                    for (var i = 0; i < config.length; i++) {
                        if (config[i]['tag'] === 'global') {
                            continue;
                        }

                        if (typeof filter === 'number' && i === filter) {
                            ret.push(new Scene({ id: i, viewID: this.id }));
                            break;
                        } else if (filter === undefined ||
                            (typeof filter === 'string' &&
                            regex.test(config[i]['name']))) {
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

        setActiveScene(scene: Scene | number) {
            if (typeof scene === "object") {
                scene.getID().then(id => {
                    iApp.set('preset', id.toString());
                });
            } else if (typeof scene === "number") {
                iApp.set('preset', scene.toString());
            }
        }

        getActiveScene(): Promise<Scene> {
            return new Promise((resolve) => {
                iApp.get('preset:' + this.id).then((sceneID) => {
                    var scene = new Scene({ id: Number(sceneID),
                        viewID: this.id });
                    resolve(scene);
                });
            });
        }

        getScene(sceneID: number): Promise<Scene> {
            return new Promise((resolve) => {
                resolve(new Scene({ id: sceneID, viewID: this.id }));
            });
        }

        searchItems(key: string): Promise<Item[]> {
            // detect if UUID or keyword
            let isID: boolean = /^{[A-F0-9-]*}$/i.test(key);
            let matches: Item[] = [];

            if (isID) {
                let found = false;
                return new Promise(resolve => {
                    this.getScenes().then(scenes => {
                        scenes.forEach((scene, idx, arr) => {
                            if (!found) {
                                scene.getItems().then(items => {
                                    found = items.some(item => { // unique ID
                                        if (item['id'] === key) {
                                            matches.push(item);
                                            resolve(matches);
                                            return true;
                                        } else {
                                            return false;
                                        }
                                    });
                                    if (idx === arr.length - 1) {
                                        resolve(matches);
                                    }
                                });
                            }
                        });
                    });
                });
            } else {
                return new Promise(resolve => {
                    this.getScenes().then(scenes => {
                        return Promise.all(scenes.map(scene => {
                            return new Promise(resolveScene => {
                                scene.getItems().then(items => {
                                    if (items.length === 0) {
                                        resolveScene();
                                    } else {
                                        return Promise.all(items.map(item => {
                                            return new Promise(resolveItem => {
                                                item.getName().then(name => {
                                                    if (name.match(key)) {
                                                        matches.push(item);
                                                        return '';
                                                    } else {
                                                        return item.getValue();
                                                    }
                                                }).then(value => {
                                                    if (value.toString().match(
                                                        key)) {
                                                        matches.push(item);
                                                    }
                                                    resolveItem();
                                                });
                                            });
                                        })).then(() => {
                                            resolveScene();
                                        });
                                    }
                                });
                            });
                        })).then(() => {
                            resolve(matches);
                        });
                    });
                });
            }
        }
    }
}

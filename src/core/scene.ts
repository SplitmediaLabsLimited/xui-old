/// <reference path="../_references.ts" />

module xui.core {
    import iApp = internal.App;
    import Item = xui.core.Item;
    import JSON = internal.utils.JSON;
    import iItem = internal.Item;
    import Environment = internal.Environment;

    export class Scene {
        private id: number;
        private viewID: string;

        constructor(props: {}) {
            this.id = props['id'];
            this.viewID = props['viewID'];
        }

        getID(): number {
            return this.id;
        }

        getViewID(): string {
            return this.viewID;
        }

        getItems(): Promise<Item[]> {
            return new Promise((resolve) => {
                iApp.getAsList('presetconfig:' + this.id).then((jsonArr) => {
                    var retArray = [];
                    if (Array.isArray(jsonArr)) {
                        for (var i = 0; i < jsonArr.length; i++) {
                            jsonArr[i]['sceneID'] = this.id;
                            jsonArr[i]['viewID'] = parseInt(this.viewID);
                            var item = new Item(jsonArr[i]);
                            retArray.push(item);
                        }
                    }
                    resolve(retArray);
                });
            });
        }

        isEmpty(): Promise<boolean> {
            return new Promise((resolve) => {
                iApp.get('presetisempty:' + this.id).then((val) => {
                    resolve(val === '1');
                });
            });
        }

        getName(): Promise<string> {
            return new Promise((resolve) => {
                iApp.get('presetname:' + this.id).then((val) => {
                    resolve(val);
                });
            });
        }

        static get(id?: number): Promise<Scene> {
            return new Promise((resolve) => {
                var viewID: number;
                var currentItem: Item = new Item({ id: iItem.getBaseID() });

                if (id === undefined) {
                    if (Environment.isSourceHtml()) {
                        let curScene: JSON;

                        currentItem.getViewID().then((vID) => {
                            viewID = Number(vID);
                            return iApp.get('presetconfig:-1');
                        }).then((sceneString) => {
                            curScene = JSON.parse(sceneString);
                            return new xui.core.View(viewID).getScenes({ 
                                name: curScene['name']
                            });
                        }).then((scene) => {
                            resolve(scene[0]);
                        });
                    } else {
                        xui.core.View.MAIN.getActiveScene().then((scene) => {
                            resolve(scene);
                        });
                    }
                } else {
                    if (Environment.isSourceHtml()) {
                        currentItem.getViewID().then((vID) => {
                            viewID = Number(vID);
                            return new xui.core.View(viewID).getScene(id);
                        }).then((scene) => {
                            resolve(scene);
                        });
                    } else {
                        xui.core.View.MAIN.getScene(id).then((scene) => {
                            resolve(scene);
                        });
                    }
                }
            });
        }
    }
}

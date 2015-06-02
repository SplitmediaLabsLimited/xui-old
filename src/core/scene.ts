/// <reference path="../_references.ts" />

module xui.core {
    import iApp = internal.App;
    import Item = xui.core.Item;

    export class Scene {
        private id: number;
        private name: string;
        private viewID: string;

        constructor(props: {}) {
            this.id = props['id'];
            this.viewID = props['viewID'];
        }

        getItems(): Promise<Item[]> {
            return new Promise((resolve) => {
                iApp.getAsList('presetconfig:' + this.id).then((jsonArr) => {
                    var retArray = [];
                    if (Array.isArray(jsonArr)) {
                        for (var i = 0; i < jsonArr.length; i++) {
                            var item = new Item(jsonArr[i]);
                            item.sceneID = this.id;
                            item.viewID = parseInt(this.viewID);
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
    }
}

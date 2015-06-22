/// <reference path="../_references.ts" />

module xui.core {
    import iApp = internal.App;
    import Item = xui.core.Item;
    import JSON = internal.utils.JSON;
    import iItem = internal.Item;
    import Environment = internal.Environment;
    import VideoDevice = xui.system.VideoDevice;
    import Game = xui.system.Game;
    import File = xui.system.File;
    import URL = xui.system.URL;
    import XML = internal.utils.XML;

    export interface IScene {
        getID(): number;
        getViewID(): string;
        getItems(): Promise<IItemBase[]>;
        isEmpty(): Promise<boolean>;
        getName(): Promise<string>;
        add(item: VideoDevice | Game | File | URL | void);
    }

    export class Scene implements IScene{
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

        // Source-related Item services
        add(item: VideoDevice | Game | File | URL | void): void {
            if (item instanceof VideoDevice) {
                this.addVideoDevice(item);
            } else if (item instanceof Game) {
                this.addGame(item);
            } else if (item instanceof File) {
                this.addFile(item);
            } else if (item instanceof URL) {
                this.addUrl(item);
            } else {
                this.addScreen();
            }
        }

        private addVideoDevice(device: VideoDevice): void {
            if (device !== undefined) {
                let item = new Item({
                    'value' : XML.encode(device['disp'].toUpperCase()),
                    'name'  : device['name'],
                    'type'  : ItemTypes.LIVE
                });

                iApp.callFunc('additem', item.toXML().toString());
            }
        }

        private addGame(gameSource: Game): void {
            if (gameSource !== undefined) {
                let item = new Item({
                    'name'    : gameSource.getWindowName() + ' (' + gameSource
                                .getGapiType() + ')',
                    'value'   : XML.encode(gameSource.toXML().toString()),
                    'type'    : ItemTypes.GAMESOURCE
                });

                iApp.callFunc('additem', item.toXML().toString());
            }
        }

        private addFile(file: File): void {
            if (file !== undefined) {
                let item = new Item({
                    'value' : file.toString(),
                    'name'  : file.toString(),
                    'type'  : ItemTypes.FILE
                });

                iApp.callFunc('additem', item.toXML().toString());
            }
        }

        private addScreen(): void {
            iApp.callFunc('addscreen', '');
        }

        private addUrl(url: URL): void {
            if (url !== undefined) {
                let item = new Item({
                    'value' : url.toString(),
                    'name'  : url.toString(),
                    'type'  : ItemTypes.HTML
                });

                iApp.callFunc('additem', item.toXML().toString());
            }
        }

        private removeSource(item: Item): void {
            if (item !== undefined) {
                iApp.callFunc('removesrc', item['id']);
            }
        }
    }
}

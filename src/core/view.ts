/// <reference path="../_references.ts" />

module xui.core {
    import iApp = internal.App;
    import Scene = xui.core.Scene;

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

        getScenes(): Promise<Scene[]> {
            return new Promise((resolve) => {
                iApp.get('presetcount').then((count) => {
                    var ret = [];
                    for (var i = parseInt(count) - 1; i >= 0; i--) {
                        ret.unshift(new Scene({ id: i, viewID: this.id }))
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

        setActiveScene(scene: Scene);
        setActiveScene(scene: number);
        setActiveScene(scene: any) {
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
    }
}

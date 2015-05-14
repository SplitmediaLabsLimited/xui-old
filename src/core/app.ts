/// <reference path="../_references.ts" />

module core {
    import Rectangle = internal.utils.Rectangle;
    export class App {
        /** Call method of DLL present in Scriptdlls folder */
        static callDll(): string {
            return internal.App.callDll.apply(this, arguments);
        }

        /** Gets application's frame time (duration per frame in 100ns unit) */
        static getFrametime(): Promise<string> {
            return new Promise((resolve) => {
                resolve(internal.App.get('frametime'));
            });
        }

        /** Gets application default output resolution */
        static getResolution() : Promise<Rectangle> {
            return new Promise((resolve) => {
                internal.App.get('resolution').then(function(val) {
                    resolve(Rectangle.parse(val));
                });
            });
        }

        /** Gets application viewport display resolution */
        static getViewport() : Promise<Rectangle> {
            return new Promise((resolve) => {
                internal.App.get('viewport').then(function(val) {
                    resolve(Rectangle.parse(val));
                });
            });
        }

        /** Refers to XSplit Broadcaster DLL file version number */
        static getVersion() : Promise<string> {
            return new Promise((resolve) => {
                resolve(internal.App.get('version'));
            });
        }

        /** Gets the total number of frames rendered */
        static getFramesRendered() : Promise<string> {
            return new Promise((resolve) => {
                resolve(internal.App.get('version'));
            });
        }
    }
}

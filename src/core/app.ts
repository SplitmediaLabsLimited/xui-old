/// <reference path="../_references.ts" />

module core {
    import Rectangle = internal.utils.Rectangle;
    import Audio = xui.system.Audio;
    import iApp = internal.App;

    export class App {
        // App base services
        /** Call method of DLL present in Scriptdlls folder */
        static callDll(): string {
            return iApp.callDll.apply(this, arguments);
        }

        /** Gets application's frame time (duration per frame in 100ns unit) */
        static getFrametime(): Promise<string> {
            return new Promise((resolve) => {
                resolve(iApp.get('frametime'));
            });
        }

        /** Gets application default output resolution */
        static getResolution() : Promise<Rectangle> {
            return new Promise((resolve) => {
                iApp.get('resolution').then(function(val) {
                    resolve(Rectangle.parse(val));
                });
            });
        }

        /** Gets application viewport display resolution */
        static getViewport() : Promise<Rectangle> {
            return new Promise((resolve) => {
                iApp.get('viewport').then(function(val) {
                    resolve(Rectangle.parse(val));
                });
            });
        }

        /** Refers to XSplit Broadcaster DLL file version number */
        static getVersion() : Promise<string> {
            return new Promise((resolve) => {
                resolve(iApp.get('version'));
            });
        }

        /** Gets the total number of frames rendered */
        static getFramesRendered() : Promise<string> {
            return new Promise((resolve) => {
                resolve(iApp.get('version'));
            });
        }

        // Audio Services
        /** Call method of DLL present in Scriptdlls folder */
        static getAudioDevices(): Promise<Audio[]> {
            return new Promise((resolve) => {
                iApp.getAsList('microphonedev2').then(function(arr) {
                    resolve(arr.map((val) => {
                        return Audio.parse(val);
                    }));
                });
            });
        }
    }
}

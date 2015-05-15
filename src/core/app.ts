/// <reference path="../_references.ts" />

module core {
    import Rectangle = internal.utils.Rectangle;
    import Audio = xui.system.Audio;
    import iApp = internal.App;
    import Json = internal.utils.JSON;
    import Xml = internal.utils.XML;

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
                iApp.get('resolution').then((val) => {
                    resolve(Rectangle.parse(val));
                });
            });
        }

        /** Gets application viewport display resolution */
        static getViewport() : Promise<Rectangle> {
            return new Promise((resolve) => {
                iApp.get('viewport').then((val) => {
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
        /** List of audio input and output devices used by the application */
        // TODO: consider new classes for these devices (compare wasapienum)
        static getAudioDevices(): Promise<Audio[]> {
            return new Promise((resolve) => {
                iApp.getAsList('microphonedev2').then((arr) => {
                    resolve(arr.map((val) => {
                        return Audio.parse(val);
                    }));
                });
            });
        }

        static setAudioDevices(): void {
            return; // TODO
            // TODO fix json parsing
        }

        static getAudioGain(): Promise<Json> {
            return new Promise((resolve) => {
                iApp.get('microphonegain').then((val) => {
                    resolve(Json.parse(val)); // TODO consider AudioGain class
                });
            });
        }

        static setAudioGain(config: Json): void {
            config.tag = 'configuration';

            iApp.set('microphonegain', Xml.parseJSON(config).toString());
        }
    }
}

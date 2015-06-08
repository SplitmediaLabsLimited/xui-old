/// <reference path="../_references.ts" />

module xui.core {
    import Rectangle = internal.utils.Rectangle;
    import Audio = xui.system.Audio;
    import iApp = internal.App;
    import JSON = internal.utils.JSON;
    import XML = internal.utils.XML;
    import Presentation = xui.core.Presentation;
    import View = xui.core.View;
    import Scene = xui.core.Scene;

    function createSceneXML(scene: Scene): Promise<Scene> {
        let id = scene.getID();

        return new Promise(resolve => {
            iApp.get('presetconfig:' + id).then(xml => {
                return JSON.parse(xml);
            }).then(xml => {
                scene['defpos'] = xml['defpos'];
                scene['items'] = xml.children !== undefined ? xml.children : [];
                return scene.getName();
            }).then(name => {
                scene['name'] = name;
                resolve(scene);
            });
        });
    }

    function getGlobalNode(): Promise<JSON> {
        return new Promise(resolve => {
            iApp.getAsList('presetconfig').then(val => {
                resolve(val[val.length - 1]);
            });
        });
    }

    export class App {
        // App base services
        /** Call method of DLL present in Scriptdlls folder */
        static callDll(): string {
            return iApp.callDll.apply(this, arguments);
        }

        /** Gets application's frame time (duration per frame in 100ns unit) */
        static getFrametime(): Promise<string> {
            return new Promise(resolve => {
                iApp.get('frametime').then(val => {
                    resolve(val);
                });
            });
        }

        /** Gets application default output resolution */
        static getResolution() : Promise<Rectangle> {
            return new Promise(resolve => {
                iApp.get('resolution').then(val => {
                    resolve(Rectangle.parse(val));
                });
            });
        }

        /** Gets application viewport display resolution */
        static getViewport() : Promise<Rectangle> {
            return new Promise(resolve => {
                iApp.get('viewport').then(val => {
                    resolve(Rectangle.parse(val));
                });
            });
        }

        /** Refers to XSplit Broadcaster DLL file version number */
        static getVersion() : Promise<string> {
            return new Promise(resolve => {
                resolve(iApp.get('version'));
            });
        }

        /** Gets the total number of frames rendered */
        static getFramesRendered() : Promise<string> {
            return new Promise(resolve => {
                resolve(iApp.get('version'));
            });
        }

        // Audio Services
        /** List of audio input and output devices used by the application */
        static getAudioDevices(): Promise<Audio[]> {
            return new Promise(resolve => {
                iApp.getAsList('microphonedev2').then(arr => {
                    resolve(arr.map(val => {
                        return Audio.parse(val);
                    }));
                });
            });
        }

        static setAudioDevices(devices: Audio[]): void {
            var dev = '';
            if (Array.isArray(devices)) {
                for (var i = 0; i < devices.length; ++i) {
                    dev += devices[i].toString();
                }
            }
            dev = '<devices>' + dev + '</devices>';
            iApp.set('microphonedev2', dev);
        }

        static getAudioGain(): Promise<JSON> {
            return new Promise(resolve => {
                iApp.get('microphonegain').then(val => {
                    resolve(JSON.parse(val));
                });
            });
        }

        static setAudioGain(config: JSON): void {
            config.tag = 'configuration';

            iApp.set('microphonegain', XML.parseJSON(config).toString());
        }

        // Dialog Services
        /** Creates a persistent modal dialog */
        static newDialog(url: string): void {
            if (url !== undefined && url !== '') {
                iApp.callFunc('newdialog', url);
            }
        }

        /** Creates a modal dialog that automatically closes on outside click */
        static newAutoDialog(url: string): void {
            if (url !== undefined && url !== '') {
                iApp.callFunc('newautodialog', url);
            }
        }

        /** Close a created dialog */
        static closeDialog(width: Number, height: Number): void {
            // currently only works for source config
            internal.exec('CloseDialog');
        }

        /** Resizes a global script dialog */
        static resizeSelf(width: Number, height: Number): void {
            iApp.postMessage(iApp.POSTMESSAGE_SIZE, width, height);
        }

        /** Closes a global script dialog */
        static closeSelf(): void {
            iApp.postMessage(iApp.POSTMESSAGE_CLOSE);
        }

        // Transition Services
        static TRANSITION_CLOCK: string            = 'clock';
        static TRANSITION_COLLAPSE: string         = 'collapse';
        static TRANSITION_MOVE_BOTTOM: string      = 'move_bottom';
        static TRANSITION_MOVE_LEFT: string        = 'move_left';
        static TRANSITION_MOVE_LEFT_RIGHT: string  = 'move_left_right';
        static TRANSITION_MOVE_RIGHT: string       = 'move_right';
        static TRANSITION_MOVE_TOP: string         = 'move_top';
        static TRANSITION_FAN: string              = 'fan';
        static TRANSITION_HOLE: string             = 'hole';
        static TRANSITION_WAVE: string             = 'wave';

        /** Gets the transition for scene changes. */
        static getTransition(): Promise<string> {
            return new Promise(resolve => {
                iApp.get('transitionid').then((val) => {
                    resolve(val);
                });
            });
        }

        /** Sets the transition for scene changes. */
        static setTransition(transition: string): void {
            iApp.set('transitionid', transition);
        }

        /** Gets the scene transition duration in milliseconds. */
        static getTransitionTime(): Promise<Number> {
            return new Promise(resolve => {
                iApp.get('transitiontime').then(val => {
                    resolve(Number(val));
                });
            });
        }

        /** Sets the scene transition duration in milliseconds. */
        static setTransitionTime(time: Number): void {
            iApp.set('transitiontime', time.toString());
        }

        // Presentation services
        static getCurrentPresentation(): Promise<Presentation> {
            return new Promise(resolve => {
                let active: Scene,
                    version: string,
                    presentation: Presentation,
                    placements: Scene[],
                    global: JSON;

                View.MAIN.getActiveScene().then(activeScene => {
                    active = activeScene;
                    return App.getVersion();
                }).then(v => {
                    version = v;
                    return View.MAIN.getScenes();
                }).then(scenes => {
                    return Promise.all(
                        scenes.map((scene, index, scenes) => {
                            if (index !== scenes.length) {
                                return createSceneXML(scene);
                            }
                            else return Promise.resolve(scene);
                        }));
                }).then(scenes => {
                    // scenes should now have item array
                    placements = scenes;
                    return getGlobalNode();
                }).then(node => {
                    global = node;
                    presentation = new Presentation({
                        currentScene: active.getID(),
                        version: version,
                        placements: placements,
                        global: global
                    });
                    resolve(presentation);
                });
            });
        }
    }
}

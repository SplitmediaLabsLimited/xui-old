/// <reference path="../_references.ts" />

module xui.core {
    import Rectangle = internal.utils.Rectangle;
    import AudioDevice = xui.system.AudioDevice;
    import iApp = internal.App;
    import JSON = internal.utils.JSON;
    import XML = internal.utils.XML;
    import Presentation = xui.core.Presentation;
    import View = xui.core.View;
    import Scene = xui.core.Scene;

    function createSceneXML(scene: Scene): Promise<Scene> {
        return new Promise(resolve => {
            scene.getID().then(id => {
                iApp.get('presetconfig:' + id).then(xml => {
                    return JSON.parse(xml);
                }).then(xml => {
                    scene['defpos'] = xml['defpos'];
                    scene['items'] = xml.children !== undefined ?
                        xml.children : [];
                    return scene.getName();
                }).then(name => {
                    scene['name'] = name;
                    resolve(scene);
                });
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

    export interface IAppBase {
        callDll(): string;
        getFrametime(): Promise<string>;
        getResolution(): Promise<Rectangle>;
        getViewport(): Promise<Rectangle>;
        getVersion(): Promise<string>;
        getFramesRendered(): Promise<string>;
    }

    export interface IAppAudio {
        getAudioDevices(): Promise<AudioDevice[]>;
        setAudioDevices(devices: AudioDevice[]);
        getAudioGain(): Promise<JSON>;
        setAudioGain(config: JSON);
    }

    export interface IAppDialog {
        newDialog(url: string);
        newAutoDialog(url: string);
        closeDialog();
    }

    export interface IAppTransition {
        getTransition(): Promise<string>;
        setTransition(transition: string);
        getTransitionTime(): Promise<Number>;
        setTransitionTime(time: Number);
    }
    
    export interface IAppPresentation {
        load(pres: Presentation);
        load(pres: string);
        save(filename: string);
        clearPresentation();
    }

    export class App implements IAppBase,
                                IAppAudio,
                                IAppDialog,
                                IAppTransition,
                                IAppPresentation {
        
        // App base services
        /** Call method of DLL present in Scriptdlls folder */
        callDll(): string {
            return iApp.callDll.apply(this, arguments);
        }

        /** Gets application's frame time (duration per frame in 100ns unit) */
        getFrametime(): Promise<string> {
            return new Promise(resolve => {
                iApp.get('frametime').then(val => {
                    resolve(val);
                });
            });
        }

        /** Gets application default output resolution */
        getResolution() : Promise<Rectangle> {
            return new Promise(resolve => {
                iApp.get('resolution').then(val => {
                    resolve(Rectangle.parse(val));
                });
            });
        }

        /** Gets application viewport display resolution */
        getViewport() : Promise<Rectangle> {
            return new Promise(resolve => {
                iApp.get('viewport').then(val => {
                    resolve(Rectangle.parse(val));
                });
            });
        }

        /** Refers to XSplit Broadcaster DLL file version number */
        getVersion() : Promise<string> {
            return new Promise(resolve => {
                resolve(iApp.get('version'));
            });
        }

        /** Gets the total number of frames rendered */
        getFramesRendered() : Promise<string> {
            return new Promise(resolve => {
                resolve(iApp.get('version'));
            });
        }

        // Audio Services
        /** List of audio input and output devices used by the application */
        getAudioDevices(): Promise<AudioDevice[]> {
            return new Promise(resolve => {
                iApp.getAsList('microphonedev2').then(arr => {
                    resolve(arr.map(val => {
                        return AudioDevice.parse(val);
                    }));
                });
            });
        }

        setAudioDevices(devices: AudioDevice[]): void {
            var dev = '';
            if (Array.isArray(devices)) {
                for (var i = 0; i < devices.length; ++i) {
                    dev += devices[i].toString();
                }
            }
            dev = '<devices>' + dev + '</devices>';
            iApp.set('microphonedev2', dev);
        }

        getAudioGain(): Promise<JSON> {
            return new Promise(resolve => {
                iApp.get('microphonegain').then(val => {
                    resolve(JSON.parse(val));
                });
            });
        }

        setAudioGain(config: JSON): void {
            config.tag = 'configuration';

            iApp.set('microphonegain', XML.parseJSON(config).toString());
        }

        // Dialog Services
        /** Creates a persistent modal dialog */
        newDialog(url: string): void {
            if (url !== undefined && url !== '') {
                iApp.callFunc('newdialog', url);
            }
        }

        /** Creates a modal dialog that automatically closes on outside click */
        newAutoDialog(url: string): void {
            if (url !== undefined && url !== '') {
                iApp.callFunc('newautodialog', url);
            }
        }

        /** Close a created dialog */
        closeDialog(): void {
            // currently only works for source config
            internal.exec('CloseDialog');
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
        getTransition(): Promise<string> {
            return new Promise(resolve => {
                iApp.get('transitionid').then((val) => {
                    resolve(val);
                });
            });
        }

        /** Sets the transition for scene changes. */
        setTransition(transition: string): void {
            iApp.set('transitionid', transition);
        }

        /** Gets the scene transition duration in milliseconds. */
        getTransitionTime(): Promise<Number> {
            return new Promise(resolve => {
                iApp.get('transitiontime').then(val => {
                    resolve(Number(val));
                });
            });
        }

        /** Sets the scene transition duration in milliseconds. */
        setTransitionTime(time: Number): void {
            iApp.set('transitiontime', time.toString());
        }

        // Presentation services
        getCurrentPresentation(): Promise<Presentation> {
            return new Promise(resolve => {
                let active: Scene,
                    version: string,
                    presentation: Presentation,
                    placements: Scene[],
                    global: JSON;

                View.MAIN.getActiveScene().then(activeScene => {
                    active = activeScene;
                    return this.getVersion();
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

        /** Loads a Presentation object **/
        load(pres: Presentation): void;
        load(pres: string): void;
        load(pres: any): void {
            if (pres instanceof Presentation) {
                iApp.callFunc('loadpresets', pres.toXML().toString());
            } else if (/\.bpres$/i.test(<string>pres)) {
                iApp.callFunc('loadpresets', <string>pres);
            }
        }

        /** Saves the current presentation to a file path **/
        save(filename: string): void {
            iApp.callFunc('savepresets', filename);
        }

        /** Clear the presentation, and go to the first scene **/
        clearPresentation(): void {
            iApp.callFunc('newpresets', '');
        }
    }
}

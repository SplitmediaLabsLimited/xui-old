/// <reference path="../_references.ts" />

module xui.system {

    import iApp = internal.App;
    import Window = xui.system.Window;

    export enum AudioDeviceDataflow {
        RENDER = 1,
        CAPTURE = 2,
        ALL = 3
    }

    export enum AudioDeviceState {
        ACTIVE = 1,
        DISABLED = 2,
        UNPLUGGED = 4,
        NOTPRESENT = 8,
        ALL = 15
    }

    export class System {
        /** List audio input and output devices */
        static getAudioDevices(dataflow = AudioDeviceDataflow.ALL,
                state = AudioDeviceState.ALL): Promise<AudioDevice[]> {
            return new Promise(resolve => {
                iApp.getAsList('wasapienum').then(devicesJSON => {
                    let devices: AudioDevice[] = [];
                    if (devicesJSON !== undefined) {
                        for (var i = 0; i < devicesJSON.length; i++) {
                            let device = devicesJSON[i];
                            let bitsState = AudioDeviceState[String(device[
                                'state']).toUpperCase().replace(/\s+/g, '')];
                            if ((bitsState & state) !== bitsState) {
                                continue;
                            }
                            let bitsFlow = AudioDeviceDataflow[String(device[
                                'dataflow']).toUpperCase()];
                            if ((bitsFlow & dataflow) !== bitsFlow) {
                                continue;
                            }
                            devices.push(AudioDevice.parse(device));
                        }
                    }
                    resolve(devices);
                });
            });
        }

        /** List video devices */
        static getVideoDevices(): Promise<VideoDevice[]> {
            return new Promise(resolve => {
                iApp.getAsList('dshowenum:vsrc').then(devicesJSON => {
                    let devs: VideoDevice[] = [];
                    if (devicesJSON !== undefined) {
                        for (var i = 0; i < devicesJSON.length; i++) {
                            if (!/XSplit/ig.test(devicesJSON[i]['name'])) {
                                devs.push(VideoDevice.parse(devicesJSON[i]));
                            }
                        }
                    }
                    resolve(devs);
                });
            });
        }

        /** List currently running games */
        static getGames(): Promise<Game[]> {
            return new Promise(resolve => {
                iApp.getAsList('gsenum').then(gamesJSON => {
                    let games: Game[] = [];
                    if (gamesJSON !== undefined) {
                        for (var i = 0; i < gamesJSON.length; i++) {
                            games.push(Game.parse(gamesJSON[i]));
                        }
                    }
                    resolve(games);
                });
            });
        }

        /** Get currently running process */
        static getProcesses(): Promise<Process[]> {
            return new Promise(resolve => {
                let list = (
                    iApp.callDll('xsplit.EnumProcesses') || '').split(',');
                let processes = [];
                for (var i = 0; i < list.length; i++) {
                    processes.push(new Process().setPid(Number(list[i])));
                }
                resolve(processes);
            });
        }

        /** Lists all visible windows */
        static getVisibleWindows(): Promise<Window[]> {
            return new Promise(resolve => {
                let list = (
                    iApp.callDll('xsplit.EnumParentWindows') || '').split(',');
                let windows = [];
                for (var i = 0; i < list.length; i++) {
                    windows.push(Window.parse({ hwnd: Number(list[i]) }));
                }
                resolve(windows);
            });
        }

        /** Gets the active or foreground window */
        static getActiveWindow(): Promise<Window> {
            return Promise.resolve(Window.parse({
                hwnd: Number(iApp.callDll('xsplit.GetForegroundWindow'))
            }));
        }
    }
}

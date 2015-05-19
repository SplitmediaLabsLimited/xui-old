/// <reference path="../_references.ts" />
var xui;
(function (xui) {
    var system;
    (function (system) {
        var u = internal.utils;
        var App = internal.App;
        var Audio = (function () {
            function Audio() {
                this.defaultConsole = false;
                this.defaultMultimedia = false;
                this.defaultCommunication = false;
            }
            /**
             * ID from WASAPI (microphone or speaker) or "default" or
             * "default:<data_flow>" or "default:<data_flow>:<role>"
             */
            Audio.prototype.getId = function () {
                return this.id;
            };
            /** Friendly name of the device */
            Audio.prototype.getName = function () {
                return this.name;
            };
            /** Friendly name of the device' adapter */
            Audio.prototype.getAdapterName = function () {
                return this.adapter;
            };
            /** Description of the device' adapter  */
            Audio.prototype.getAdapterDescription = function () {
                return this.adapterdev;
            };
            /** DirectSound device identifier */
            Audio.prototype.getGuid = function () {
                return this.guid;
            };
            /** Data flow of the device. Value can be "Render" or "Capture". */
            Audio.prototype.getDataFlow = function () {
                return this.dataflow;
            };
            /**
             * State of the device. Value can be "Active", "Disabled",
             * "Not Present", or "Unplugged"
             */
            Audio.prototype.getState = function () {
                return this.state;
            };
            /** Returns true if the device is the default console device */
            Audio.prototype.isDefaultConsole = function () {
                return this.defaultConsole;
            };
            /** Returns true if the device is the default multimedia device */
            Audio.prototype.isDefaultMultimedia = function () {
                return this.defaultMultimedia;
            };
            /** Returns true if the device is the default communication device */
            Audio.prototype.isDefaultCommunication = function () {
                return this.defaultCommunication;
            };
            /** Converts the Audio item to XML string */
            Audio.prototype.toString = function () {
                var device = new u.JSON();
                device.tag = 'dev';
                var attrs = ['id', 'name', 'adapter', 'adapterdev', 'dataflow',
                    'guid', 'state', 'waveid', 'mix', 'level', 'enable',
                    'hwlevel', 'hwenable', 'delay', 'mix'];
                for (var i in attrs) {
                    var attr = attrs[i];
                    device[attr] = this[attr];
                }
                return u.XML.parseJSON(device).toString();
            };
            /** List audio devices of the system */
            Audio.list = function (filters) {
                filters = filters || { dataflow: 'all', state: 'all' };
                filters.dataflow = filters.dataflow || 'all';
                filters.state = filters.state || 'all';
                return new Promise(function (resolve) {
                    App.getAsList('wasapienum').then(function (devices) {
                        var audioDevices = [];
                        devices.map(function (device) {
                            var excludedDataFlow = !/^all$/i.test(filters.dataflow) &&
                                filters.dataflow !== device['dataflow'];
                            var excludedState = !/^all$/i.test(filters.state) &&
                                filters.state !== device['state'];
                            if (excludedDataFlow || excludedState) {
                                return;
                            }
                            audioDevices.push(Audio.parse(device));
                        });
                        resolve(audioDevices);
                    });
                });
            };
            Audio.parse = function (deviceJSON) {
                var audio = new Audio();
                // wasapienum
                audio.id = deviceJSON['id'];
                audio.name = deviceJSON['name'];
                audio.adapter = deviceJSON['adapter'];
                audio.adapterdev = deviceJSON['adapterdev'];
                audio.dataflow = deviceJSON['dataflow'];
                audio.state = deviceJSON['state'];
                audio.guid = deviceJSON['dsoundguid'];
                audio.defaultCommunication =
                    (deviceJSON['defaultcommunication'] === '1');
                audio.defaultConsole =
                    (deviceJSON['defaultconsole'] === '1');
                audio.defaultMultimedia =
                    (deviceJSON['defaultmultimedia'] === '1');
                // microphonedev2
                audio.level = deviceJSON['level'];
                audio.enable = deviceJSON['enable'];
                audio.hwlevel = deviceJSON['hwlevel'];
                return audio;
            };
            Audio.STATE_ACTIVE = 'Active';
            Audio.DATAFLOW_RENDER = 'Render';
            Audio.DATAFLOW_CAPTURE = 'Capture';
            return Audio;
        })();
        system.Audio = Audio;
    })(system = xui.system || (xui.system = {}));
})(xui || (xui = {}));
/// <reference path="../_references.ts" />
var xui;
(function (xui) {
    var core;
    (function (core) {
        var Rectangle = internal.utils.Rectangle;
        var Audio = xui.system.Audio;
        var iApp = internal.App;
        var Json = internal.utils.JSON;
        var Xml = internal.utils.XML;
        var App = (function () {
            function App() {
            }
            // App base services
            /** Call method of DLL present in Scriptdlls folder */
            App.callDll = function () {
                return iApp.callDll.apply(this, arguments);
            };
            /** Gets application's frame time (duration per frame in 100ns unit) */
            App.getFrametime = function () {
                return new Promise(function (resolve) {
                    resolve(iApp.get('frametime'));
                });
            };
            /** Gets application default output resolution */
            App.getResolution = function () {
                return new Promise(function (resolve) {
                    iApp.get('resolution').then(function (val) {
                        resolve(Rectangle.parse(val));
                    });
                });
            };
            /** Gets application viewport display resolution */
            App.getViewport = function () {
                return new Promise(function (resolve) {
                    iApp.get('viewport').then(function (val) {
                        resolve(Rectangle.parse(val));
                    });
                });
            };
            /** Refers to XSplit Broadcaster DLL file version number */
            App.getVersion = function () {
                return new Promise(function (resolve) {
                    resolve(iApp.get('version'));
                });
            };
            /** Gets the total number of frames rendered */
            App.getFramesRendered = function () {
                return new Promise(function (resolve) {
                    resolve(iApp.get('version'));
                });
            };
            // Audio Services
            /** List of audio input and output devices used by the application */
            App.getAudioDevices = function () {
                return new Promise(function (resolve) {
                    iApp.getAsList('microphonedev2').then(function (arr) {
                        resolve(arr.map(function (val) {
                            return Audio.parse(val);
                        }));
                    });
                });
            };
            App.setAudioDevices = function (devices) {
                var dev = '';
                if (Array.isArray(devices)) {
                    for (var i = 0; i < devices.length; ++i) {
                        dev += devices[i].toString();
                    }
                }
                dev = '<devices>' + dev + '</devices>';
                iApp.set('microphonedev2', dev);
            };
            App.getAudioGain = function () {
                return new Promise(function (resolve) {
                    iApp.get('microphonegain').then(function (val) {
                        resolve(Json.parse(val));
                    });
                });
            };
            App.setAudioGain = function (config) {
                config.tag = 'configuration';
                iApp.set('microphonegain', Xml.parseJSON(config).toString());
            };
            // Dialog Services
            /** Creates a persistent modal dialog */
            App.newDialog = function (url) {
                if (url !== undefined && url !== '') {
                    iApp.callFunc('newdialog', url);
                }
            };
            /** Creates a modal dialog that automatically closes on outside click */
            App.newAutoDialog = function (url) {
                if (url !== undefined && url !== '') {
                    iApp.callFunc('newautodialog', url);
                }
            };
            /** Resizes a created dialog */
            App.resizeDialog = function (width, height) {
                // TODO: currently only works for source config
                internal.exec('CloseDialog');
            };
            /** Resizes a global script dialog */
            App.resizeSelf = function (width, height) {
                iApp.postMessage(iApp.POSTMESSAGE_SIZE, width, height);
            };
            /** Closes a global script dialog */
            App.closeSelf = function () {
                iApp.postMessage(iApp.POSTMESSAGE_CLOSE);
            };
            /** Gets the transition for scene changes. */
            App.getTransition = function () {
                return new Promise(function (resolve) {
                    iApp.get('transitionid').then(function (val) {
                        resolve(val);
                    });
                });
            };
            /** Sets the transition for scene changes. */
            App.setTransition = function (transition) {
                iApp.set('transitionid', transition);
            };
            /** Gets the scene transition duration in milliseconds. */
            App.getTransitionTime = function () {
                return new Promise(function (resolve) {
                    iApp.get('transitiontime').then(function (val) {
                        resolve(Number(val));
                    });
                });
            };
            /** Sets the scene transition duration in milliseconds. */
            App.setTransitionTime = function (time) {
                iApp.set('transitiontime', time.toString());
            };
            // Transition Services
            App.TRANSITION_CLOCK = 'clock';
            App.TRANSITION_COLLAPSE = 'collapse';
            App.TRANSITION_MOVE_BOTTOM = 'move_bottom';
            App.TRANSITION_MOVE_LEFT = 'move_left';
            App.TRANSITION_MOVE_LEFT_RIGHT = 'move_left_right';
            App.TRANSITION_MOVE_RIGHT = 'move_right';
            App.TRANSITION_MOVE_TOP = 'move_top';
            App.TRANSITION_FAN = 'fan';
            App.TRANSITION_HOLE = 'hole';
            App.TRANSITION_WAVE = 'wave';
            return App;
        })();
        core.App = App;
    })(core = xui.core || (xui.core = {}));
})(xui || (xui = {}));
/// <reference path="defs/es6-promise.d.ts" />
/// <reference path="../dist/internal.d.ts" />
/// <reference path="system/audio.ts" />
/// <reference path="core/app.ts" />

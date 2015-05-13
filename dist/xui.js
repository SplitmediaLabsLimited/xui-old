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
/// <reference path="defs/es6-promise.d.ts" />
/// <reference path="../dist/internal.d.ts" />
/// <reference path="system/audio.ts" /> 

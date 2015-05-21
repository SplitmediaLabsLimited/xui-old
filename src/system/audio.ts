/// <reference path="../_references.ts" />

module xui.system {

    import u   =  internal.utils;
    import App = internal.App;

    export class Audio {
        static STATE_ACTIVE: string = 'Active';

        static DATAFLOW_RENDER: string = 'Render';
        static DATAFLOW_CAPTURE: string = 'Capture';

        // wasapienum
        private id: string;
        private name: string;
        private adapter: string;
        private adapterdev: string;
        private guid: string;

        private dataflow: string;
        private state: string;

        private defaultConsole: boolean = false;
        private defaultMultimedia: boolean = false;
        private defaultCommunication: boolean = false;

        // microphonedev2
        private level: string;
        private enable: string;
        private hwlevel: string;

        /** 
         * ID from WASAPI (microphone or speaker) or "default" or
         * "default:<data_flow>" or "default:<data_flow>:<role>"
         */
        getId(): string {
            return this.id
        }

        /** Friendly name of the device */
        getName(): string {
            return this.name;
        }

        /** Friendly name of the device' adapter */
        getAdapterName(): string {
            return this.adapter;
        }

        /** Description of the device' adapter  */
        getAdapterDescription(): string {
            return this.adapterdev;
        }

        /** DirectSound device identifier */
        getGuid(): string {
            return this.guid;
        }

        /** Data flow of the device. Value can be "Render" or "Capture". */
        getDataFlow(): string {
            return this.dataflow;
        }

        /** 
         * State of the device. Value can be "Active", "Disabled", 
         * "Not Present", or "Unplugged"
         */
        getState(): string {
            return this.state;
        }

        /** Returns true if the device is the default console device */
        isDefaultConsole(): boolean {
            return this.defaultConsole;
        }

        /** Returns true if the device is the default multimedia device */
        isDefaultMultimedia(): boolean {
            return this.defaultMultimedia;
        }

        /** Returns true if the device is the default communication device */
        isDefaultCommunication(): boolean {
            return this.defaultCommunication;
        }

        /** Converts the Audio item to XML string */
        toString(): string {
            var device = new u.JSON();
            device.tag = 'dev';

            var attrs: any[] = ['id', 'name', 'adapter', 'adapterdev', 'dataflow',
                'guid', 'state', 'waveid', 'mix', 'level', 'enable',
                'hwlevel', 'hwenable', 'delay', 'mix'];
            
            for (var i in attrs) {
                var attr = attrs[i]

                device[attr] = this[attr];
            }
            
            return u.XML.parseJSON(device).toString();
        }

        /** List audio devices of the system */
        static list(filters: any): Promise<Audio[]> {
            filters          = filters || { dataflow: 'all', state: 'all' };
            filters.dataflow = filters.dataflow || 'all';
            filters.state    = filters.state || 'all';
            
            return new Promise((resolve) => {
                App.getAsList('wasapienum').then((devices: u.JSON[]) => {
                    
                    var audioDevices: Audio[] = []

                    devices.map((device) => {
                        var excludedDataFlow =
                            !/^all$/i.test(filters.dataflow) &&
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
        }

        static parse(deviceJSON: u.JSON): Audio {
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
        }
    }
}
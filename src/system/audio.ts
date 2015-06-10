/// <reference path="../_references.ts" />

module xui.system {

    import u   =  internal.utils;
    import App = internal.App;

    export class AudioDevice {
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
        private level: Number;
        private enable: boolean;
        private hwlevel: Number;
        private hwenable: boolean;
        private delay: Number;

        constructor(props?: {}) {
            props = props || {};

            this.id                   = props['id'];
            this.name                 = props['name'];
            this.adapter              = props['adapter'];
            this.adapterdev           = props['adapterdev'];
            this.guid                 = props['guid'];
            this.dataflow             = props['dataflow'];
            this.state                = props['state'];
            this.defaultConsole       = props['defaultConsole'];
            this.defaultMultimedia    = props['defaultMultimedia'];
            this.defaultCommunication = props['defaultCommunication'];
            this.level                = props['level'];
            this.enable               = props['enable'];
            this.hwlevel              = props['hwlevel'];
        }

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

        /** Returns the value of the software audio level */
        getLevel(): Number {
            return this.level;
        }

        /** Sets the value of the software audio level */
        setLevel(level: Number) {
            this.level = level;

            return this;
        }

        /** Returns true if software audio is enabled */
        isEnabled(): boolean {
            return this.enable;
        }

        /** Enables/disables software audio */
        setEnabled(enabled: boolean) {
            this.enable = enabled;

            return this;
        }

        /** Returns the value of the system audio level */
        getSystemLevel(): Number {
            return this.hwlevel;
        }

        /** Sets the value of the system audio level */
        setSystemLevel(hwlevel: Number) {
            this.hwlevel = hwlevel;

            return this;
        }

        /** Returns true if system audio is enabled */
        isSystemEnabled(): boolean {
            return this.hwenable;
        }

        /** Enables/disables system audio */
        setSystemEnabled(enabled: boolean) {
            this.hwenable = enabled;

            return this;
        }

        /** Returns the loopback capture delay value (100 nanoseconds units) */
        getDelay(): Number {
            return this.delay;
        }

        /** Sets the loopback capture delay value (100 nanoseconds units) */
        setDelay(delay: Number) {
            this.delay = delay;

            return this;
        }

        /** Converts the AudioDevice item to XML string */
        toString(): string {
            var device = new u.JSON();
            device.tag = 'dev';

            device['id']       = this.getId();
            device['level']    = this.getLevel();
            device['enable']   = this.isEnabled() ? 1 : 0;
            device['hwlevel']  = this.getSystemLevel();
            device['hwenable'] = this.isSystemEnabled() ? 1 : 0;
            device['delay']    = this.getDelay();
            
            return u.XML.parseJSON(device).toString();
        }

        /** List audio devices of the system */
        static list(filters: any): Promise<AudioDevice[]> {
            filters          = filters || { dataflow: 'all', state: 'all' };
            filters.dataflow = filters.dataflow || 'all';
            filters.state    = filters.state || 'all';
            
            return new Promise((resolve) => {
                App.getAsList('wasapienum').then((devices: u.JSON[]) => {
                    
                    var audioDevices: AudioDevice[] = []

                    devices.map((device) => {
                        var excludedDataFlow =
                            !/^all$/i.test(filters.dataflow) &&
                            filters.dataflow !== device['dataflow'];
                            
                        var excludedState = !/^all$/i.test(filters.state) &&
                            filters.state !== device['state'];

                        if (excludedDataFlow || excludedState) {
                            return;
                        }
                        
                        audioDevices.push(AudioDevice.parse(device));
                    });

                    resolve(audioDevices);
                });
            });
        }

        static parse(deviceJSON: u.JSON): AudioDevice {
            var audio: AudioDevice = new AudioDevice({
                id:         deviceJSON['id'],
                name:       deviceJSON['name'],
                adapter:    deviceJSON['adapter'],
                adapterdev: deviceJSON['adapterdev'],
                dataflow:   deviceJSON['dataflow'],
                state:      deviceJSON['state'],
                guid:       deviceJSON['dsoundguid'],
                
                defaultCommunication: 
                    (deviceJSON['defaultcommunication'] === '1'),
                defaultConsole: 
                    (deviceJSON['defaultconsole'] === '1'),
                defaultMultimedia: 
                    (deviceJSON['defaultmultimedia'] === '1')
            });

            audio.setLevel(Number(deviceJSON['level']))
                .setEnabled(deviceJSON['enable'] === '1')
                .setSystemLevel(Number(deviceJSON['hwlevel']))
                .setSystemEnabled(deviceJSON['hwenable'] === '1')
                .setDelay(Number(deviceJSON['delay']));

            return audio;
        }
    }
}

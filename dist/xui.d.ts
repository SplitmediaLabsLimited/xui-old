/// <reference path="../src/defs/es6-promise.d.ts" />
/// <reference path="internal.d.ts" />
declare module xui.system {
    import u = internal.utils;
    class Audio {
        static STATE_ACTIVE: string;
        static DATAFLOW_RENDER: string;
        static DATAFLOW_CAPTURE: string;
        private id;
        private name;
        private adapter;
        private adapterdev;
        private guid;
        private dataflow;
        private state;
        private defaultConsole;
        private defaultMultimedia;
        private defaultCommunication;
        private level;
        private enable;
        private hwlevel;
        private hwenable;
        private delay;
        constructor(props?: {});
        /**
         * ID from WASAPI (microphone or speaker) or "default" or
         * "default:<data_flow>" or "default:<data_flow>:<role>"
         */
        getId(): string;
        /** Friendly name of the device */
        getName(): string;
        /** Friendly name of the device' adapter */
        getAdapterName(): string;
        /** Description of the device' adapter  */
        getAdapterDescription(): string;
        /** DirectSound device identifier */
        getGuid(): string;
        /** Data flow of the device. Value can be "Render" or "Capture". */
        getDataFlow(): string;
        /**
         * State of the device. Value can be "Active", "Disabled",
         * "Not Present", or "Unplugged"
         */
        getState(): string;
        /** Returns true if the device is the default console device */
        isDefaultConsole(): boolean;
        /** Returns true if the device is the default multimedia device */
        isDefaultMultimedia(): boolean;
        /** Returns true if the device is the default communication device */
        isDefaultCommunication(): boolean;
        /** Returns the value of the software audio level */
        getLevel(): Number;
        /** Sets the value of the software audio level */
        setLevel(level: Number): Audio;
        /** Returns true if software audio is enabled */
        isEnabled(): boolean;
        /** Enables/disables software audio */
        setEnabled(enabled: boolean): Audio;
        /** Returns the value of the system audio level */
        getSystemLevel(): Number;
        /** Sets the value of the system audio level */
        setSystemLevel(hwlevel: Number): Audio;
        /** Returns true if system audio is enabled */
        isSystemEnabled(): boolean;
        /** Enables/disables system audio */
        setSystemEnabled(enabled: boolean): Audio;
        /** Returns the loopback capture delay value (100 nanoseconds units) */
        getDelay(): Number;
        /** Sets the loopback capture delay value (100 nanoseconds units) */
        setDelay(delay: Number): Audio;
        /** Converts the Audio item to XML string */
        toString(): string;
        /** List audio devices of the system */
        static list(filters: any): Promise<Audio[]>;
        static parse(deviceJSON: u.JSON): Audio;
    }
}
declare module xui.core {
    import Rectangle = internal.utils.Rectangle;
    import Audio = xui.system.Audio;
    import Json = internal.utils.JSON;
    class App {
        /** Call method of DLL present in Scriptdlls folder */
        static callDll(): string;
        /** Gets application's frame time (duration per frame in 100ns unit) */
        static getFrametime(): Promise<string>;
        /** Gets application default output resolution */
        static getResolution(): Promise<Rectangle>;
        /** Gets application viewport display resolution */
        static getViewport(): Promise<Rectangle>;
        /** Refers to XSplit Broadcaster DLL file version number */
        static getVersion(): Promise<string>;
        /** Gets the total number of frames rendered */
        static getFramesRendered(): Promise<string>;
        /** List of audio input and output devices used by the application */
        static getAudioDevices(): Promise<Audio[]>;
        static setAudioDevices(devices: Audio[]): void;
        static getAudioGain(): Promise<Json>;
        static setAudioGain(config: Json): void;
        /** Creates a persistent modal dialog */
        static newDialog(url: string): void;
        /** Creates a modal dialog that automatically closes on outside click */
        static newAutoDialog(url: string): void;
        /** Close a created dialog */
        static closeDialog(width: Number, height: Number): void;
        /** Resizes a global script dialog */
        static resizeSelf(width: Number, height: Number): void;
        /** Closes a global script dialog */
        static closeSelf(): void;
        static TRANSITION_CLOCK: string;
        static TRANSITION_COLLAPSE: string;
        static TRANSITION_MOVE_BOTTOM: string;
        static TRANSITION_MOVE_LEFT: string;
        static TRANSITION_MOVE_LEFT_RIGHT: string;
        static TRANSITION_MOVE_RIGHT: string;
        static TRANSITION_MOVE_TOP: string;
        static TRANSITION_FAN: string;
        static TRANSITION_HOLE: string;
        static TRANSITION_WAVE: string;
        /** Gets the transition for scene changes. */
        static getTransition(): Promise<string>;
        /** Sets the transition for scene changes. */
        static setTransition(transition: string): void;
        /** Gets the scene transition duration in milliseconds. */
        static getTransitionTime(): Promise<Number>;
        /** Sets the scene transition duration in milliseconds. */
        static setTransitionTime(time: Number): void;
    }
}
declare module xui.core {
    interface IChannelProps {
        name: string;
        stat: string;
        channel: string;
    }
    interface IStreamDrops {
        dropped: number;
        rendered: number;
    }
    class Channel {
        private name;
        private stat;
        private channel;
        /** Channel constructor, intialize name, state, and channel values */
        constructor(props: IChannelProps);
        /** Gets the amout of frames dropped and frames rendered  */
        getStreamDrops(): Promise<IStreamDrops>;
        /** Gets the current duration of <stream> in microseconds  */
        getStreamTime(): Promise<number>;
    }
}

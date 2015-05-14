/// <reference path="../src/defs/es6-promise.d.ts" />
/// <reference path="internal.d.ts" />
declare module xui.system {
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
        /** Converts the Audio item to XML string */
        toString(): string;
        /** List audio devices of the system */
        static list(filters: any): Promise<Audio[]>;
        private static parse(deviceJSON);
    }
}
declare module core {
    import Rectangle = internal.utils.Rectangle;
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
    }
}

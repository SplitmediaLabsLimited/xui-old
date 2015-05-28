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
declare module xui.system {
    class Process {
        private pid;
        private detail;
        private hwnds;
        private modules;
        constructor(pid?: Number);
        getPid(): Number;
        setPid(pid: Number): void;
        getDetail(): string;
        getHwnds(): Number[];
        getModules(): string[];
    }
}
declare module xui.system {
    import Rectangle = internal.utils.Rectangle;
    import JSON = internal.utils.JSON;
    import XML = internal.utils.XML;
    class Game {
        private pid;
        private handle;
        private hwnd;
        private gapitype;
        private width;
        private height;
        private flags;
        private wndname;
        private lastframets;
        /**
         * Gets the game's process ID.
         */
        getPid(): Number;
        /**
         * Gets the Graphics API handle.
         */
        getHandle(): Number;
        /**
         * Gets the window handle.
         */
        getWindowHandle(): Number;
        /**
         * Gets the Graphics API type. Possible values:
         * OGL, DX8, DX8_SwapChain, DX9, DX9Ex, DX9_SwapChain,
         * DX9_PresentEx, DX10, DX11, DX11.1, DX11.1_Present1
         */
        getGapiType(): string;
        /**
         * Gets game resolution.
         */
        getResolution(): Rectangle;
        /**
         * Returns game-specific flags. 1 for exclusive full screen, 0 otherwise
         */
        getFlags(): string;
        /**
         * Gets window title.
         */
        getWindowName(): string;
        /**
         * Gets timestamp of last frame in milliseconds.
         */
        getLastFrameTimestamp(): Number;
        static parse(json: JSON): Game;
        toXML(): XML;
    }
}
declare module xui.core {
    import Rectangle = internal.utils.Rectangle;
    import Audio = xui.system.Audio;
    import JSON = internal.utils.JSON;
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
        static getAudioGain(): Promise<JSON>;
        static setAudioGain(config: JSON): void;
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
    class Channel implements IChannelProps {
        name: string;
        stat: string;
        channel: string;
        /** Channel constructor, intialize name, state, and channel values */
        constructor(props: IChannelProps);
        /** Gets the amout of frames dropped and frames rendered  */
        getStreamDrops(): Promise<IStreamDrops>;
        /** Gets the current duration of <stream> in microseconds  */
        getStreamTime(): Promise<number>;
    }
}
declare module xui.core {
    import Rectangle = internal.utils.Rectangle;
    interface IItemLayout {
        isKeepAspectRatio(): Promise<boolean>;
        setKeepAspectRatio(value: boolean): any;
        isPositionLocked(): Promise<boolean>;
        setPositionLocked(value: boolean): any;
        isEnhanceResizeEnabled(): Promise<boolean>;
        setEnhanceResizeEnabled(value: boolean): any;
        isPixelAlignmentEnabled(): Promise<boolean>;
        setPixelAlignmentEnabled(value: boolean): any;
        getPosition(): Promise<Rectangle>;
        setPosition(value: Rectangle): any;
    }
    class ItemLayout implements IItemLayout {
        private keepAspectRatio;
        private positionLocked;
        private enhanceResizeEnabled;
        private pixelAlignmentEnabled;
        private position;
        private id;
        private viewID;
        /** Check if Aspect Ratio is set to ON or OFF */
        isKeepAspectRatio(): Promise<boolean>;
        /** Set Aspect Ratio to ON or OFF */
        setKeepAspectRatio(value: boolean): void;
        /** Check if Position Locked is set to ON or OFF */
        isPositionLocked(): Promise<boolean>;
        /** Set Position Lock to ON or OFF */
        setPositionLocked(value: boolean): void;
        /** Check if Enhance Resize is Enabled or Disabled */
        isEnhanceResizeEnabled(): Promise<boolean>;
        /** Set Enhance Resize to ON or OFF */
        setEnhanceResizeEnabled(value: boolean): void;
        /** Check if Pixel Alignment is Enabled or Disabled */
        isPixelAlignmentEnabled(): Promise<boolean>;
        /** Set Pixel Alignment to ON or OFF */
        setPixelAlignmentEnabled(value: boolean): void;
        /** Get the position of the item */
        getPosition(): Promise<Rectangle>;
        /** Set Item position */
        setPosition(value: Rectangle): void;
    }
}
declare module xui.core {
    import JSON = internal.utils.JSON;
    import XML = internal.utils.XML;
    import Rectangle = internal.utils.Rectangle;
    interface IItemBase {
        getName(): Promise<string>;
        setName(value: string): any;
        getValue(): Promise<JSON>;
        setValue(value: any): any;
        getKeepLoaded(): Promise<boolean>;
        setKeepLoaded(value: boolean): any;
        getType(): Promise<number>;
        getID(): Promise<string>;
        getSceneID(): Promise<number>;
        getViewID(): Promise<number>;
    }
    class Item implements IItemBase, IItemLayout {
        private name;
        private id;
        private sceneID;
        private viewID;
        private type;
        private value;
        private customName;
        private keepLoaded;
        private position;
        static TYPE_UNDEFINED: number;
        static TYPE_FILE: number;
        static TYPE_LIVE: number;
        static TYPE_TEXT: number;
        static TYPE_BITMAP: number;
        static TYPE_SCREEN: number;
        static TYPE_FLASHFILE: number;
        static TYPE_GAMESOURCE: number;
        static TYPE_HTML: number;
        constructor(props?: {});
        /** Set name of the item */
        setName(value: string): void;
        /** Get the current name of the item */
        getName(): Promise<string>;
        /** Get the video item's main definition */
        getValue(): Promise<JSON>;
        /** Set the video item's main definition */
        setValue(value: any): void;
        /** Get Keep loaded option */
        getKeepLoaded(): Promise<boolean>;
        /** Set Keep loaded option to ON or OFF */
        setKeepLoaded(value: boolean): void;
        /** Get the type of the item */
        getType(): Promise<number>;
        /** Get Item ID */
        getID(): Promise<string>;
        /** Get Scene ID where the item is loaded */
        getSceneID(): Promise<number>;
        /** Get the View ID where the item is loaded */
        getViewID(): Promise<number>;
        /** Convert the Item object to XML */
        toXML(): XML;
        isKeepAspectRatio: () => Promise<boolean>;
        setKeepAspectRatio: () => void;
        isPositionLocked: () => Promise<boolean>;
        setPositionLocked: () => void;
        isEnhanceResizeEnabled: () => Promise<boolean>;
        setEnhanceResizeEnabled: () => void;
        isPixelAlignmentEnabled: () => Promise<boolean>;
        setPixelAlignmentEnabled: () => void;
        getPosition: () => Promise<Rectangle>;
        setPosition: () => void;
    }
}

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
        getHwnds(): any;
        getModules(): any;
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
    import JSON = internal.utils.JSON;
    import XML = internal.utils.XML;
    import Color = internal.utils.Color;
    import Rectangle = internal.utils.Rectangle;
    interface IItem {
        name: string;
        id: string;
        sceneID: number;
        viewID: number;
        type: number;
        value: any;
        trackTitle: boolean;
        volume: number;
        transparency: number;
        borderColor: Color;
        brightness: number;
        constrast: number;
        hue: number;
        saturation: number;
        customName: string;
        cuepoints: number[];
        keepAspectRatio: boolean;
        positionLocked: boolean;
        enhanceResizeEnabled: boolean;
        mute: boolean;
        pixelAlignmentEnabled: boolean;
        position: Rectangle;
        keepLoaded: boolean;
    }
    class Item implements IItem {
        name: string;
        id: string;
        sceneID: number;
        viewID: number;
        type: number;
        value: any;
        trackTitle: boolean;
        volume: number;
        transparency: number;
        borderColor: Color;
        brightness: number;
        constrast: number;
        hue: number;
        saturation: number;
        customName: string;
        cuepoints: number[];
        keepAspectRatio: boolean;
        positionLocked: boolean;
        enhanceResizeEnabled: boolean;
        mute: boolean;
        pixelAlignmentEnabled: boolean;
        position: Rectangle;
        keepLoaded: boolean;
        constructor(props: IItem);
        /** Set name of the item */
        setName(value: string): void;
        /** Get the current name of the item */
        getName(): Promise<string>;
        static TYPE_UNDEFINED: number;
        static TYPE_FILE: number;
        static TYPE_LIVE: number;
        static TYPE_TEXT: number;
        static TYPE_BITMAP: number;
        static TYPE_SCREEN: number;
        static TYPE_FLASHFILE: number;
        static TYPE_GAMESOURCE: number;
        static TYPE_HTML: number;
        /** Get the type of the item */
        getType(): Promise<number>;
        /** Set the video item's main definition */
        setValue(value: any): void;
        /** Get the video item's main definition */
        getValue(): Promise<JSON>;
        /** Set Track Window Title to ON or OFF */
        setTrackTitle(value: boolean): void;
        /** Check if Track Window Title is set to ON or OFF */
        getTrackTitle(): Promise<boolean>;
        /** Set the Volume of the item */
        setVolume(value: number): void;
        /** Get the Volume of the item */
        getVolume(): Promise<number>;
        /** Set the transparency of the item */
        setTransparency(value: number): void;
        /** Get the transparency of the item */
        getTransparency(): Promise<number>;
        /** Set the border color of the item */
        setBorderColor(value: Color): void;
        /** Get the border color of the item */
        getBorderColor(): Promise<Color>;
        /** Set the brightness of the item */
        setBrightness(value: number): void;
        /** Get the brightness */
        getBrightness(): Promise<number>;
        /** Set the contrast of the item */
        setContrast(value: number): void;
        /** Get the contrast of the item */
        getContrast(): Promise<number>;
        /** Set the hue of the item */
        setHue(value: number): void;
        /** Get the hue of the item */
        getHue(): Promise<number>;
        /** Set the saturation of the item */
        setSaturation(value: number): void;
        /** Get the saturation of the item */
        getSaturation(): Promise<number>;
        /** Set the custom name of the item */
        setCustomName(value: string): void;
        /** Get the custom name of the item */
        getCustomName(): Promise<string>;
        /** Set the cue points of the item */
        setCuePoints(values: number[]): void;
        /** Get the cue points of the item */
        getCuePoints(): Promise<number[]>;
        /** Set Keep aspect ratio to ON or OFF */
        setKeepAspectRatio(value: boolean): void;
        /** Set Position lock to ON or OFF */
        setPositionLocked(value: boolean): void;
        /** Check if position is locked or not */
        isPositionLocked(): Promise<boolean>;
        /** Set Enhanced Resize to ON or OFF */
        setEnhancedResizeEnabled(value: boolean): void;
        /** Check if Enhanced Resize is enabled or not */
        isEnhancedResizeEnabled(): Promise<boolean>;
        /** Set Mute to ON or OFF */
        setMute(value: boolean): void;
        /** Check if Mute is enabled or not */
        isMute(): Promise<boolean>;
        /** Set Pixel Alignment to ON or OFF */
        setPixelAlignmentEnabled(value: boolean): void;
        /** Check if Pixel Alignment is enabled or not */
        isPixelAlignmentEnabled(): Promise<boolean>;
        /** Set the position of the item */
        setPosition(value: Rectangle): void;
        /** Get the position of the item */
        getPosition(): Promise<Rectangle>;
        /** Crop the item */
        crop(value: Rectangle): void;
        /** Set Keep loaded option to ON or OFF */
        setKeepLoaded(value: boolean): void;
        /** Convert the Item object to XML */
        toXML(): XML;
    }
}

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
        private id;
        private viewID;
        position: Rectangle;
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
    import Color = internal.utils.Color;
    interface IItemColor {
        getTransparency(): Promise<number>;
        setTransparency(value: number): any;
        getBrightness(): Promise<number>;
        setBrightness(value: number): any;
        getContrast(): Promise<number>;
        setContrast(value: number): any;
        getHue(): Promise<number>;
        setHue(value: number): any;
        getSaturation(): Promise<number>;
        setSaturation(value: number): any;
        getBorderColor(): Promise<Color>;
        setBorderColor(value: Color): any;
    }
    class ItemColor implements IItemColor {
        private id;
        private viewID;
        /** Get Item Transparency value */
        getTransparency(): Promise<number>;
        /** Set Item Transparency */
        setTransparency(value: number): void;
        /** Get Item Brightness value */
        getBrightness(): Promise<number>;
        /** Set Item Brightness */
        setBrightness(value: number): void;
        /** Get Item Contrast value */
        getContrast(): Promise<number>;
        /** Set Item Contrast */
        setContrast(value: number): void;
        /** Get Item Hue value */
        getHue(): Promise<number>;
        /** Set Item Hue */
        setHue(value: number): void;
        /** Get Item Saturation value */
        getSaturation(): Promise<number>;
        /** Set Item Saturation */
        setSaturation(value: number): void;
        /** Get Border Color */
        getBorderColor(): Promise<Color>;
        /** Set Border Color */
        setBorderColor(value: Color): void;
    }
}
declare module xui.core {
    interface IItemAudio {
        getVolume(): Promise<number>;
        setVolume(value: number): any;
        isMuted(): Promise<boolean>;
        setMuted(value: boolean): any;
    }
    class ItemAudio implements IItemAudio {
        id: string;
        viewID: number;
        /** Get Item Volume level */
        getVolume(): Promise<number>;
        /** Set Volume level of item */
        setVolume(value: number): void;
        /** Check if item is muted */
        isMuted(): Promise<boolean>;
        /** Set Item Mute to ON or OFF */
        setMuted(value: boolean): void;
    }
}
declare module xui.core {
    interface IItemWindow {
        isWindowTracking(): Promise<boolean>;
        setWindowTracking(value: boolean): any;
    }
    class ItemWindow implements IItemWindow {
        id: string;
        viewID: number;
        /** Check if Window Tracking is ON or OFF */
        isWindowTracking(): Promise<boolean>;
        /** Set Window Tracking to ON or OFF */
        setWindowTracking(value: boolean): void;
    }
}
declare module xui.core {
    interface IItemVideo {
        getCuePoints(): Promise<number[]>;
    }
    class ItemVideo implements IItemVideo {
        id: string;
        viewID: number;
        /** Get Video item cuepoints */
        getCuePoints(): Promise<number[]>;
    }
}
declare module xui.core {
    import Color = internal.utils.Color;
    enum CHROMA_TYPE {
        KEY = 0,
        COLOR = 1,
        RGB = 2,
    }
    enum CHROMA_PRIMARY_COLORS {
        RED = 0,
        GREEN = 1,
        BLUE = 2,
    }
    enum CHROMA_ANTIALIAS {
        NONE = 0,
        LOW = 1,
        HIGH = 2,
    }
    interface IItemChroma {
        isChromaEnabled(): Promise<boolean>;
        setChromaEnabled(value: boolean): any;
        getChromaBrightness(): Promise<number>;
        setChromaBrightness(value: number): any;
        getChromaSaturation(): Promise<number>;
        setChromaSaturation(value: number): any;
        getChromaHue(): Promise<number>;
        setChromaHue(value: number): any;
        getChromaType(): Promise<CHROMA_TYPE>;
        setChromaType(value: CHROMA_TYPE): any;
        getChromaColor(): Promise<Color>;
        setChromaColor(value: Color): any;
        getChromaPrimaryColor(): Promise<CHROMA_PRIMARY_COLORS>;
        setChromaPrimaryColor(value: CHROMA_PRIMARY_COLORS): any;
        getChromaBalance(): Promise<number>;
        setChromaBalance(value: number): any;
        getChromaAntiAlias(): Promise<number>;
        setChromaAntiAlias(value: number): any;
        getChromaThreshold(): Promise<number>;
        setChromaThreshold(value: number): any;
        getChromaThresholdAA(): Promise<number>;
        setChromaThresholdAA(value: number): any;
    }
    class ItemChroma implements IItemChroma {
        id: string;
        viewID: number;
        /** Check if chroma is enabled or not */
        isChromaEnabled(): Promise<boolean>;
        /** Set Chroma to ON or OFF */
        setChromaEnabled(value: boolean): void;
        /** Get Chroma brightness */
        getChromaBrightness(): Promise<number>;
        /** Set Chroma Brightness */
        setChromaBrightness(value: number): void;
        /** Get Chroma Brightness */
        getChromaSaturation(): Promise<number>;
        /** Set Chroma Saturation */
        setChromaSaturation(value: number): void;
        /** Get Chroma Hue */
        getChromaHue(): Promise<number>;
        /** Set Chroma Hue */
        setChromaHue(value: number): void;
        /** Get Chroma Type */
        getChromaType(): Promise<CHROMA_TYPE>;
        /** Set Chroma Type */
        setChromaType(value: CHROMA_TYPE): void;
        /** Get Chroma Color */
        getChromaColor(): Promise<Color>;
        /** Set Chroma Color */
        setChromaColor(value: Color): void;
        /** Get Chroma Primary Color */
        getChromaPrimaryColor(): Promise<CHROMA_PRIMARY_COLORS>;
        /** Set Chroma Primary Color */
        setChromaPrimaryColor(value: CHROMA_PRIMARY_COLORS): void;
        /** Get Chroma Balance */
        getChromaBalance(): Promise<number>;
        /** Set Chroma Balance */
        setChromaBalance(value: number): void;
        /** Get Chroma Anti Alias level */
        getChromaAntiAlias(): Promise<CHROMA_ANTIALIAS>;
        /** Set Chroma Anti Alias level */
        setChromaAntiAlias(value: CHROMA_ANTIALIAS): void;
        /** Get Chroma Threshold */
        getChromaThreshold(): Promise<number>;
        /** Set Chroma Threshold */
        setChromaThreshold(value: number): void;
        /** Get Chroma Threshold Anti Alias */
        getChromaThresholdAA(): Promise<number>;
        /** Set Chroma Threshold Anti Alias */
        setChromaThresholdAA(value: number): void;
    }
}
declare module xui.core {
    enum PLAYBACK_END_ACTION {
        NOTHING = 0,
        REWIND = 1,
        LOOP = 2,
        HIDE = 3,
    }
    interface IItemPlayback {
        getPlaybackStartPos(): Promise<number>;
        setPlaybackStartPos(value: number): any;
        getPlaybackEndPos(): Promise<number>;
        setPlaybackEndPos(value: number): any;
        getPlaybackEndAction(): Promise<PLAYBACK_END_ACTION>;
        setPlaybackEndAction(value: PLAYBACK_END_ACTION): any;
        getPlaybackDuration(): Promise<number>;
        setPlaybackDuration(value: number): any;
    }
    class ItemPlayback implements IItemPlayback {
        id: string;
        viewID: number;
        /** Get Playback Starting position */
        getPlaybackStartPos(): Promise<number>;
        /** Set Playback Starting position */
        setPlaybackStartPos(value: number): void;
        /** Get Playback Ending position */
        getPlaybackEndPos(): Promise<number>;
        /** Set Playback Ending position */
        setPlaybackEndPos(value: number): void;
        /** Get Playback Ending action */
        getPlaybackEndAction(): Promise<PLAYBACK_END_ACTION>;
        /** Set Playback Ending action */
        setPlaybackEndAction(value: PLAYBACK_END_ACTION): void;
        /** Get Playback Duration */
        getPlaybackDuration(): Promise<number>;
        /** Set Playback Duration */
        setPlaybackDuration(value: number): void;
    }
}
declare module xui.core {
    import JSON = internal.utils.JSON;
    import XML = internal.utils.XML;
    import Color = internal.utils.Color;
    import Rectangle = internal.utils.Rectangle;
    enum ITEM_TYPES {
        UNDEFINED = 0,
        FILE = 1,
        LIVE = 2,
        TEXT = 3,
        BITMAP = 4,
        SCREEN = 5,
        FLASHFILE = 6,
        GAMESOURCE = 7,
        HTML = 8,
    }
    interface IItemBase {
        getName(): Promise<string>;
        setName(value: string): any;
        getValue(): Promise<JSON>;
        setValue(value: any): any;
        getKeepLoaded(): Promise<boolean>;
        setKeepLoaded(value: boolean): any;
        getType(): Promise<ITEM_TYPES>;
        getID(): Promise<string>;
        getSceneID(): Promise<number>;
        getViewID(): Promise<number>;
    }
    class Item implements IItemBase, IItemLayout, IItemColor, IItemAudio, IItemWindow, IItemVideo, IItemChroma, IItemPlayback {
        private name;
        private id;
        private sceneID;
        private viewID;
        private type;
        private value;
        private customName;
        private keepLoaded;
        position: Rectangle;
        /** Create Item class with all the sub classes */
        static create(props?: {}): Item;
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
        getType(): Promise<ITEM_TYPES>;
        /** Get Item ID */
        getID(): Promise<string>;
        /** Get Scene ID where the item is loaded */
        getSceneID(): Promise<number>;
        /** Get the View ID where the item is loaded */
        getViewID(): Promise<number>;
        /** Convert the Item object to XML */
        toXML(): XML;
        isKeepAspectRatio: () => Promise<boolean>;
        setKeepAspectRatio: (value: boolean) => void;
        isPositionLocked: () => Promise<boolean>;
        setPositionLocked: (value: boolean) => void;
        isEnhanceResizeEnabled: () => Promise<boolean>;
        setEnhanceResizeEnabled: (value: boolean) => void;
        isPixelAlignmentEnabled: () => Promise<boolean>;
        setPixelAlignmentEnabled: (value: boolean) => void;
        getPosition: () => Promise<Rectangle>;
        setPosition: (value: Rectangle) => void;
        getTransparency: () => Promise<number>;
        setTransparency: (value: number) => void;
        getBrightness: () => Promise<number>;
        setBrightness: (value: number) => void;
        getContrast: () => Promise<number>;
        setContrast: (value: number) => void;
        getHue: () => Promise<number>;
        setHue: (value: number) => void;
        getSaturation: () => Promise<number>;
        setSaturation: (value: number) => void;
        getBorderColor: () => Promise<Color>;
        setBorderColor: (value: Color) => void;
        getVolume: () => Promise<number>;
        setVolume: (value: number) => void;
        isMuted: () => Promise<boolean>;
        setMuted: (value: boolean) => void;
        isWindowTracking: () => Promise<boolean>;
        setWindowTracking: (value: boolean) => void;
        getCuePoints: () => Promise<number[]>;
        isChromaEnabled: () => Promise<boolean>;
        setChromaEnabled: (value: boolean) => void;
        getChromaBrightness: () => Promise<number>;
        setChromaBrightness: (value: number) => void;
        getChromaSaturation: () => Promise<number>;
        setChromaSaturation: (value: number) => void;
        getChromaHue: () => Promise<number>;
        setChromaHue: (value: number) => void;
        getChromaType: () => Promise<CHROMA_TYPE>;
        setChromaType: (value: CHROMA_TYPE) => void;
        getChromaColor: () => Promise<Color>;
        setChromaColor: (value: Color) => void;
        getChromaPrimaryColor: () => Promise<number>;
        setChromaPrimaryColor: (value: number) => void;
        getChromaBalance: () => Promise<number>;
        setChromaBalance: (value: number) => void;
        getChromaAntiAlias: () => Promise<number>;
        setChromaAntiAlias: (value: number) => void;
        getChromaThreshold: () => Promise<number>;
        setChromaThreshold: (value: number) => void;
        getChromaThresholdAA: () => Promise<number>;
        setChromaThresholdAA: (value: number) => void;
        getPlaybackStartPos: () => Promise<number>;
        setPlaybackStartPos: (value: number) => void;
        getPlaybackEndPos: () => Promise<number>;
        setPlaybackEndPos: (value: number) => void;
        getPlaybackEndAction: () => Promise<PLAYBACK_END_ACTION>;
        setPlaybackEndAction: (value: PLAYBACK_END_ACTION) => void;
        getPlaybackDuration: () => Promise<number>;
        setPlaybackDuration: (value: number) => void;
    }
}

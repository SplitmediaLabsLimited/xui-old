/// <reference path="../src/defs/es6-promise.d.ts" />
/// <reference path="internal.d.ts" />
declare module xui.system {
    import u = internal.utils;
    class AudioDevice {
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
        setLevel(level: Number): AudioDevice;
        /** Returns true if software audio is enabled */
        isEnabled(): boolean;
        /** Enables/disables software audio */
        setEnabled(enabled: boolean): AudioDevice;
        /** Returns the value of the system audio level */
        getSystemLevel(): Number;
        /** Sets the value of the system audio level */
        setSystemLevel(hwlevel: Number): AudioDevice;
        /** Returns true if system audio is enabled */
        isSystemEnabled(): boolean;
        /** Enables/disables system audio */
        setSystemEnabled(enabled: boolean): AudioDevice;
        /** Returns the loopback capture delay value (100 nanoseconds units) */
        getDelay(): Number;
        /** Sets the loopback capture delay value (100 nanoseconds units) */
        setDelay(delay: Number): AudioDevice;
        /** Converts the AudioDevice item to XML string */
        toString(): string;
        /** List audio devices of the system */
        static list(filters: any): Promise<AudioDevice[]>;
        static parse(deviceJSON: u.JSON): AudioDevice;
    }
}
declare module xui.system {
    import JSON = internal.utils.JSON;
    import XML = internal.utils.XML;
    class VideoDevice {
        private name;
        private disp;
        constructor(props?: {});
        static parse(deviceJSON: JSON): VideoDevice;
        toXML(): XML;
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
declare module xui.system {
    enum WindowState {
        HIDE = 0,
        SHOWNORMAL = 1,
        SHOWMINIMIZED = 2,
        MAXIMIZE = 3,
        SHOWNOACTIVATE = 4,
        SHOW = 5,
        MINIMIZE = 6,
        SHOWMINNOACTIVE = 7,
        SHOWNA = 8,
        RESTORE = 9,
    }
    class Window {
        private _hwnd;
        private _pid;
        private _title;
        private _state;
        private _detail;
        hwnd: number;
        getPID(): number;
        getTitle(): string;
        getState(): WindowState;
        getDetail(): string;
        static parse(args: {
            hwnd: number;
        }): Window;
    }
}
declare module xui.system {
    import Rectangle = internal.utils.Rectangle;
    import XML = internal.utils.XML;
    class ScreenRegion {
        private bounds;
        constructor(bounds?: Rectangle);
        needsSelector(): boolean;
        isRegion(): boolean;
        static regionSelect(): ScreenRegion;
        /** Creates screen region using left, top, width, and height. */
        static fromRectangle(left: number, top: number, width: number, height: number): ScreenRegion;
        toXML(): XML;
    }
}
declare module xui.system {
    class File {
        private file;
        constructor(file: string);
        toString(): string;
    }
    class URL {
        private url;
        constructor(url: string);
        toString(): string;
    }
}
declare module xui.system {
    import Window = xui.system.Window;
    enum AudioDeviceDataflow {
        RENDER = 1,
        CAPTURE = 2,
        ALL = 3,
    }
    enum AudioDeviceState {
        ACTIVE = 1,
        DISABLED = 2,
        UNPLUGGED = 4,
        NOTPRESENT = 8,
        ALL = 15,
    }
    class System {
        /** List audio input and output devices */
        static getAudioDevices(dataflow?: AudioDeviceDataflow, state?: AudioDeviceState): Promise<AudioDevice[]>;
        /** List video devices */
        static getVideoDevices(): Promise<VideoDevice[]>;
        /** List currently running games */
        static getGames(): Promise<Game[]>;
        /** Get currently running process */
        static getProcesses(): Promise<Process[]>;
        /** Lists all visible windows */
        static getVisibleWindows(): Promise<Window[]>;
        /** Gets the active or foreground window */
        static getActiveWindow(): Promise<Window>;
    }
}
declare module xui.core {
    import JSON = internal.utils.JSON;
    import XML = internal.utils.XML;
    import Color = internal.utils.Color;
    import Rectangle = internal.utils.Rectangle;
    enum ItemTypes {
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
        getValue(): Promise<string | XML>;
        setValue(value: string | XML): any;
        getKeepLoaded(): Promise<boolean>;
        setKeepLoaded(value: boolean): any;
        getType(): Promise<ItemTypes>;
        getID(): Promise<string>;
        getSceneID(): Promise<number>;
        getViewID(): Promise<number>;
    }
    class Item implements IItemBase, IItemLayout, IItemColor, IItemAudio, IItemWindow, IItemVideo, IItemChroma, IItemPlayback, IItemConfigurable {
        private name;
        private id;
        private sceneID;
        private viewID;
        private type;
        private value;
        private keepLoaded;
        private position;
        private item;
        constructor(props?: {});
        /** Set name of the item */
        setName(value: string): void;
        /** Get the current name of the item */
        getName(): Promise<string>;
        /** Get the video item's main definition */
        getValue(): Promise<string | XML>;
        /** Set the video item's main definition */
        setValue(value: string | XML): void;
        /** Get Keep loaded option */
        getKeepLoaded(): Promise<boolean>;
        /** Set Keep loaded option to ON or OFF */
        setKeepLoaded(value: boolean): void;
        /** Get the type of the item */
        getType(): Promise<ItemTypes>;
        /** Get Item ID */
        getID(): Promise<string>;
        /** Get (1-indexed) Scene ID where the item is loaded */
        getSceneID(): Promise<number>;
        /** Get the View ID where the item is loaded */
        getViewID(): Promise<number>;
        /** Convert the Item object to XML */
        toXML(): XML;
        /** Get the current source (when called for sources), or the source that
         * was right-clicked to open the config window (when called from the
         * config window). */
        static getCurrentSource(): Promise<Item>;
        /** Check if Aspect Ratio is set to ON or OFF */
        isKeepAspectRatio: () => Promise<boolean>;
        /** Check if Position Locked is set to ON or OFF */
        isPositionLocked: () => Promise<boolean>;
        /** Check if Enhance Resize is Enabled or Disabled */
        isEnhanceResizeEnabled: () => Promise<boolean>;
        /** Check if Pixel Alignment is Enabled or Disabled */
        isPixelAlignmentEnabled: () => Promise<boolean>;
        /** Get the position of the item */
        getPosition: () => Promise<Rectangle>;
        /** Set Aspect Ratio to ON or OFF */
        setKeepAspectRatio: (value: boolean) => void;
        /** Set Position Lock to ON or OFF */
        setPositionLocked: (value: boolean) => void;
        /** Set Enhance Resize to ON or OFF */
        setEnhanceResizeEnabled: (value: boolean) => void;
        /** Set Pixel Alignment to ON or OFF */
        setPixelAlignmentEnabled: (value: boolean) => void;
        /** Set Item position */
        setPosition: (value: Rectangle) => void;
        /** Get Item Transparency value */
        getTransparency: () => Promise<number>;
        /** Get Item Brightness value */
        getBrightness: () => Promise<number>;
        /** Get Item Contrast value */
        getContrast: () => Promise<number>;
        /** Get Item Hue value */
        getHue: () => Promise<number>;
        /** Get Item Saturation value */
        getSaturation: () => Promise<number>;
        /** Get Border Color */
        getBorderColor: () => Promise<Color>;
        /** Set Item Transparency */
        setTransparency: (value: number) => void;
        /** Set Item Brightness */
        setBrightness: (value: number) => void;
        /** Set Item Contrast */
        setContrast: (value: number) => void;
        /** Set Item Hue */
        setHue: (value: number) => void;
        /** Set Item Saturation */
        setSaturation: (value: number) => void;
        /** Set Border Color */
        setBorderColor: (value: Color) => void;
        /** Get Item Volume level */
        getVolume: () => Promise<number>;
        /** Check if item is muted */
        isMuted: () => Promise<boolean>;
        /** Set Volume level of item */
        setVolume: (value: number) => void;
        /** Set Item Mute to ON or OFF */
        setMuted: (value: boolean) => void;
        /** Check if Window Tracking is ON or OFF */
        isWindowTracking: () => Promise<boolean>;
        /** Set Window Tracking to ON or OFF */
        setWindowTracking: (value: boolean) => void;
        /** Get Video item cuepoints */
        getCuePoints: () => Promise<number[]>;
        /** Check if chroma is enabled or not */
        isChromaEnabled: () => Promise<boolean>;
        /** Get Chroma brightness */
        getChromaBrightness: () => Promise<number>;
        /** Get Chroma Saturation */
        getChromaSaturation: () => Promise<number>;
        /** Get Chroma Hue */
        getChromaHue: () => Promise<number>;
        /** Get Chroma Type */
        getChromaType: () => Promise<ChromaTypes>;
        /** Get Chroma Color */
        getChromaColor: () => Promise<Color>;
        /** Get Chroma Primary Color */
        getChromaPrimaryColor: () => Promise<ChromaPrimaryColors>;
        /** Get Chroma Balance */
        getChromaBalance: () => Promise<number>;
        /** Get Chroma Anti Alias level */
        getChromaAntiAlias: () => Promise<ChromaAntiAlias>;
        /** Get Chroma Threshold */
        getChromaThreshold: () => Promise<number>;
        /** Get Chroma Threshold Anti Alias */
        getChromaThresholdAA: () => Promise<number>;
        /** Set Chroma to ON or OFF */
        setChromaEnabled: (value: boolean) => void;
        /** Set Chroma Brightness */
        setChromaBrightness: (value: number) => void;
        /** Set Chroma Saturation */
        setChromaSaturation: (value: number) => void;
        /** Set Chroma Hue */
        setChromaHue: (value: number) => void;
        /** Set Chroma Type */
        setChromaType: (value: ChromaTypes) => void;
        /** Set Chroma Color */
        setChromaColor: (value: Color) => void;
        /** Set Chroma Primary Color */
        setChromaPrimaryColor: (value: ChromaPrimaryColors) => void;
        /** Set Chroma Balance */
        setChromaBalance: (value: number) => void;
        /** Set Chroma Anti Alias level */
        setChromaAntiAlias: (value: ChromaAntiAlias) => void;
        /** Set Chroma Threshold */
        setChromaThreshold: (value: number) => void;
        /** Set Chroma Threshold Anti Alias */
        setChromaThresholdAA: (value: number) => void;
        /** Get Playback Starting position */
        getPlaybackStartPos: () => Promise<number>;
        /** Get Playback Ending position */
        getPlaybackEndPos: () => Promise<number>;
        /** Get Playback Ending action */
        getPlaybackEndAction: () => Promise<PlaybackEndAction>;
        /** Get Playback Duration */
        getPlaybackDuration: () => Promise<number>;
        /** Set Playback Starting position */
        setPlaybackStartPos: (value: number) => void;
        /** Set Playback Ending position */
        setPlaybackEndPos: (value: number) => void;
        /** Set Playback Ending action */
        setPlaybackEndAction: (value: PlaybackEndAction) => void;
        /** Set Playback Duration */
        setPlaybackDuration: (value: number) => void;
        /** Load the saved browser configuration */
        loadConfig: () => Promise<JSON>;
        /** Save the configuration object */
        saveConfig: (configObj: JSON) => void;
        /** Apply changes based on passed configuration object */
        applyConfig: (configObj: JSON) => void;
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
}
declare module xui.core {
    interface IItemAudio {
        getVolume(): Promise<number>;
        setVolume(value: number): any;
        isMuted(): Promise<boolean>;
        setMuted(value: boolean): any;
    }
}
declare module xui.core {
    interface IItemWindow {
        isWindowTracking(): Promise<boolean>;
        setWindowTracking(value: boolean): any;
    }
}
declare module xui.core {
    interface IItemVideo {
        getCuePoints(): Promise<number[]>;
    }
}
declare module xui.core {
    import Color = internal.utils.Color;
    enum ChromaTypes {
        KEY = 0,
        COLOR = 1,
        RGB = 2,
    }
    enum ChromaPrimaryColors {
        RED = 0,
        GREEN = 1,
        BLUE = 2,
    }
    enum ChromaAntiAlias {
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
        getChromaType(): Promise<ChromaTypes>;
        setChromaType(value: ChromaTypes): any;
        getChromaColor(): Promise<Color>;
        setChromaColor(value: Color): any;
        getChromaPrimaryColor(): Promise<ChromaPrimaryColors>;
        setChromaPrimaryColor(value: ChromaPrimaryColors): any;
        getChromaBalance(): Promise<number>;
        setChromaBalance(value: number): any;
        getChromaAntiAlias(): Promise<number>;
        setChromaAntiAlias(value: number): any;
        getChromaThreshold(): Promise<number>;
        setChromaThreshold(value: number): any;
        getChromaThresholdAA(): Promise<number>;
        setChromaThresholdAA(value: number): any;
    }
}
declare module xui.core {
    enum PlaybackEndAction {
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
        getPlaybackEndAction(): Promise<PlaybackEndAction>;
        setPlaybackEndAction(value: PlaybackEndAction): any;
        getPlaybackDuration(): Promise<number>;
        setPlaybackDuration(value: number): any;
    }
}
declare module xui.core {
    import JSON = internal.utils.JSON;
    interface IItemConfigurable {
        loadConfig(): Promise<JSON>;
        saveConfig(configObj: JSON): void;
        applyConfig(configObj: JSON): void;
    }
}
declare module xui.core {
    import Item = xui.core.Item;
    import VideoDevice = xui.system.VideoDevice;
    import Game = xui.system.Game;
    import File = xui.system.File;
    import URL = xui.system.URL;
    import ScreenRegion = xui.system.ScreenRegion;
    interface IScene {
        getID(): Promise<number>;
        getViewID(): Promise<number>;
        getItems(): Promise<IItemBase[]>;
        isEmpty(): Promise<boolean>;
        getName(): Promise<string>;
        add(item: VideoDevice | Game | File | URL | ScreenRegion): any;
    }
    class Scene implements IScene {
        private id;
        private viewID;
        constructor(props: {});
        getID(): Promise<number>;
        getViewID(): Promise<number>;
        getItems(): Promise<Item[]>;
        isEmpty(): Promise<boolean>;
        getName(): Promise<string>;
        static get(id?: number): Promise<Scene>;
        add(item: VideoDevice | Game | File | URL | ScreenRegion): void;
        private addVideoDevice(device);
        private addGame(gameSource);
        private addFile(file);
        private addScreenRegion(item);
        private addUrl(url);
        private removeSource(item);
    }
}
declare module xui.core {
    import Scene = xui.core.Scene;
    import Item = xui.core.Item;
    interface IView {
        getViewID(): Promise<number>;
        getScenes(filter?: number | string | void): Promise<IScene[]>;
        setActiveScene(scene: IScene | number): any;
        getActiveScene(): Promise<IScene>;
        getScene(sceneID: number): Promise<IScene>;
        searchItems(key: string): Promise<IItemBase[]>;
    }
    class View implements IView {
        private id;
        constructor(id: number);
        static MAIN: View;
        static PREVIEW: View;
        getViewID(): Promise<number>;
        getScenes(filter?: number | string | void): Promise<Scene[]>;
        getScenesCount(): Promise<number>;
        setActiveScene(scene: Scene | number): void;
        getActiveScene(): Promise<Scene>;
        getScene(sceneID: number): Promise<Scene>;
        searchItems(key: string): Promise<Item[]>;
    }
}
declare module xui.core {
    import XML = internal.utils.XML;
    class Presentation {
        private currentScene;
        private version;
        private sceneDetails;
        private global;
        constructor(props: {});
        toXML(): XML;
    }
}
declare module xui.core {
    import Rectangle = internal.utils.Rectangle;
    import AudioDevice = xui.system.AudioDevice;
    import JSON = internal.utils.JSON;
    import Presentation = xui.core.Presentation;
    interface IAppBase {
        callDll(): string;
        getFrametime(): Promise<string>;
        getResolution(): Promise<Rectangle>;
        getViewport(): Promise<Rectangle>;
        getVersion(): Promise<string>;
        getFramesRendered(): Promise<string>;
    }
    interface IAppAudio {
        getAudioDevices(): Promise<AudioDevice[]>;
        setAudioDevices(devices: AudioDevice[]): any;
        getAudioGain(): Promise<JSON>;
        setAudioGain(config: JSON): any;
    }
    interface IAppDialog {
        newDialog(url: string): any;
        newAutoDialog(url: string): any;
        closeDialog(): any;
    }
    interface IAppTransition {
        getTransition(): Promise<string>;
        setTransition(transition: string): any;
        getTransitionTime(): Promise<Number>;
        setTransitionTime(time: Number): any;
    }
    interface IAppPresentation {
        load(pres: Presentation): any;
        load(pres: string): any;
        save(filename: string): any;
        clearPresentation(): any;
    }
    class App implements IAppBase, IAppAudio, IAppDialog, IAppTransition, IAppPresentation {
        /** Call method of DLL present in Scriptdlls folder */
        callDll(): string;
        /** Gets application's frame time (duration per frame in 100ns unit) */
        getFrametime(): Promise<string>;
        /** Gets application default output resolution */
        getResolution(): Promise<Rectangle>;
        /** Gets application viewport display resolution */
        getViewport(): Promise<Rectangle>;
        /** Refers to XSplit Broadcaster DLL file version number */
        getVersion(): Promise<string>;
        /** Gets the total number of frames rendered */
        getFramesRendered(): Promise<string>;
        /** List of audio input and output devices used by the application */
        getAudioDevices(): Promise<AudioDevice[]>;
        setAudioDevices(devices: AudioDevice[]): void;
        getAudioGain(): Promise<JSON>;
        setAudioGain(config: JSON): void;
        /** Creates a persistent modal dialog */
        newDialog(url: string): void;
        /** Creates a modal dialog that automatically closes on outside click */
        newAutoDialog(url: string): void;
        /** Close a created dialog */
        closeDialog(): void;
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
        getTransition(): Promise<string>;
        /** Sets the transition for scene changes. */
        setTransition(transition: string): void;
        /** Gets the scene transition duration in milliseconds. */
        getTransitionTime(): Promise<Number>;
        /** Sets the scene transition duration in milliseconds. */
        setTransitionTime(time: Number): void;
        getCurrentPresentation(): Promise<Presentation>;
        /** Loads a Presentation object **/
        load(pres: Presentation): void;
        load(pres: string): void;
        /** Saves the current presentation to a file path **/
        save(filename: string): void;
        /** Clear the presentation, and go to the first scene **/
        clearPresentation(): void;
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

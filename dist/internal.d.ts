/// <reference path="../src/defs/es6-promise.d.ts" />
declare module internal.utils {
    class Color {
        private rgb;
        private irgb;
        private bgr;
        private ibgr;
        /** Creates a Color class */
        constructor(props?: {
            rgb: string;
            irgb: number;
            bgr: string;
            ibgr: number;
        });
        /** Gets RGB value */
        getRgb(): string;
        /** Sets RGB value */
        setRgb(rgb: string): void;
        /** Gets BGR value */
        getBgr(): string;
        /** Sets BGR value */
        setBgr(bgr: string): void;
        /** Gets RGB decimal value */
        getIrgb(): number;
        /** Sets RGB decimal value */
        setIrgb(irgb: number): void;
        /** Gets BGR decimal value */
        getIbgr(): number;
        /** Sets BGR decimal value */
        setIbgr(ibgr: number): void;
    }
}
declare module internal.utils {
    class Point {
        private x;
        private y;
        private z;
        /** Creates a Point class */
        constructor(props?: {
            x: number;
            y: number;
            z: number;
        });
        /** Gets the X coordinate */
        getX(): number;
        /** Sets the X coordinate */
        setX(x: number): void;
        /** Gets the Y coordinate */
        getY(): number;
        /** Sets the Y coordinate */
        setY(y: number): void;
        /** Gets the Z coordinate */
        getZ(): number;
        /** Sets the Z coordinate */
        setZ(z: number): void;
    }
}
declare module internal.utils {
    class Rectangle {
        private top;
        private left;
        private width;
        private height;
        private right;
        private bottom;
        /** Gets the top value */
        getTop(): number;
        /** Sets the top value */
        setTop(top: number): void;
        /** Gets the left value */
        getLeft(): number;
        /** Sets the left value */
        setLeft(left: number): void;
        /** Gets the right value */
        getRight(): number;
        /** Sets the right value */
        setRight(right: number): void;
        /** Gets the bottom value */
        getBottom(): number;
        /** Sets the bottom value */
        setBottom(bottom: number): void;
        /** Gets the width value */
        getWidth(): number;
        /** Sets the width value */
        setWidth(width: number): void;
        /** Gets the height value */
        getHeight(): number;
        /** Sets the height value */
        setHeight(height: number): void;
        /** Creates a rectangle from a comma-separated string. T,L,R,B or W,H */
        static parse(str: string): Rectangle;
        /** Converts a rectangle to a comma-separated string */
        toString(value?: string): string;
    }
}
declare module internal.utils {
    class Thread {
        private callbacks;
        constructor(callbacks: Function[]);
        private next(...args);
        static sync(...callbacks: Function[]): Thread;
    }
}
declare module internal.utils {
    class XML {
        private xml;
        private static RESERVED_ATTRIBUTES;
        constructor(json?: JSON);
        toString(): string;
        static parseJSON(json: JSON): XML;
        static encode(str: string): string;
    }
}
declare module internal.utils {
    class JSON {
        tag: string;
        children: JSON[];
        value: string;
        constructor(xml?: any);
        static parse(xml: any): JSON;
    }
}
declare module internal.utils {
    function applyMixins(derivedCtor: any, baseCtors: any[]): void;
}
interface Window {
    OnAsyncCallback: Function;
    OnSceneLoad: Function;
    SetConfiguration: Function;
    SetBackGroundColor: Function;
    SetVolume: Function;
    OnDialogResult: Function;
}
declare module internal {
    var DEBUG: boolean;
    /**
     * Executes an external function
     */
    function exec(funcName: string, ...args: any[]): any;
}
declare module internal {
    class Environment {
        private static _isHtml;
        private static _isConfig;
        private static _isScript;
        private static _initialized;
        static initialize(): void;
        static isSourceHtml(): Boolean;
        static isSourceConfig(): Boolean;
        static isScriptPlugin(): Boolean;
    }
}
declare module internal {
    import u = internal.utils;
    class App {
        static POSTMESSAGE_CLOSE: string;
        static POSTMESSAGE_SIZE: string;
        /** Get the value of the given property */
        static get(name: string): Promise<string>;
        /** Gets the value of the given property as list */
        static getAsList(name: string): Promise<u.JSON[]>;
        /** Get the value of the given global property */
        static getGlobalProperty(name: string): string;
        /** Sets the value of a property */
        static set(name: string, value: string): Promise<Boolean>;
        /** Calls a DLL function synchronously */
        static callDll(func: string, ...arg: string[]): string;
        /** Calls an application method asynchronously */
        static callFunc(func: string, arg: string): Promise<string>;
        static postMessage(key: string, ...args: any[]): Promise<string>;
    }
}
declare module internal {
    class Item {
        private name;
        private value;
        private id;
        private sceneID;
        private viewID;
        private static baseID;
        private static MAX_SLOTS;
        private static lastSlot;
        private static itemSlotMap;
        private static islockedSourceSlot;
        constructor(props: any);
        /** Prepare an item for manipulation */
        static attach(itemID: string, view: number): number;
        private static cacheItemID(itemID, viewID?);
        static lockSourceSlot(itemID: string): void;
        /** Get an item's local property asynchronously */
        static get(name: string, slot?: number): Promise<string>;
        /** Sets an item's local property */
        static set(name: string, value: string, slot?: number): void;
        /** Calls a function defined in an item/source */
        static callFunc(func: string, arg: string): void;
        /** helper function to get current source on init */
        static setBaseID(id: string): void;
        /** helper function for Item.getCurrentSource() */
        static getBaseID(): string;
    }
}
declare module internal {
    function persistConfig(config: {}): void;
    function init(): void;
}

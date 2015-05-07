declare module internal {
    class App {
        static POSTMESSAGE_CLOSE: string;
        static POSTMESSAGE_SIZE: string;
        /**
         * Get the value of the given property
         */
        static get(name: string, callback: Function): void;
        static getAsList(name: string, callback: Function): void;
        /**
         * Get the value of the given global property
         */
        static getGlobalProperty(name: string): any;
    }
}
declare module internal {
    class Item {
    }
}
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
interface Window {
    OnAsyncCallback: Function;
    OnSceneLoad: Function;
    SetConfiguration: Function;
    SetBackGroundColor: Function;
    SetVolume: Function;
    OnDialogResult: Function;
}
declare module internal {
    /**
     * Executes an external function
     */
    function exec(funcName: string, ...args: any[]): any;
}

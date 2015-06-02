/// <reference path="../../_references.ts" />

module xui.core {
    import iItem = internal.Item;
    import Color = internal.utils.Color;

    export enum CHROMA_TYPE {
        KEY,
        COLOR,
        RGB
    }

    export enum CHROMA_PRIMARY_COLORS {
        RED,
        GREEN,
        BLUE
    }

    export enum CHROMA_ANTIALIAS {
        NONE,
        LOW,
        HIGH
    }

    export interface IItemChroma {
        isChromaEnabled(): Promise<boolean>;
        setChromaEnabled(value: boolean);
        getChromaBrightness(): Promise<number>;
        setChromaBrightness(value: number);
        getChromaSaturation(): Promise<number>;
        setChromaSaturation(value: number);
        getChromaHue(): Promise<number>;
        setChromaHue(value: number);
        getChromaType(): Promise<CHROMA_TYPE>;
        setChromaType(value: CHROMA_TYPE);
        getChromaColor(): Promise<Color>;
        setChromaColor(value: Color);
        getChromaPrimaryColor(): Promise<CHROMA_PRIMARY_COLORS>;
        setChromaPrimaryColor(value: CHROMA_PRIMARY_COLORS);
        getChromaBalance(): Promise<number>;
        setChromaBalance(value: number);
        getChromaAntiAlias(): Promise<number>;
        setChromaAntiAlias(value: number);
        getChromaThreshold(): Promise<number>;
        setChromaThreshold(value: number);
        getChromaThresholdAA(): Promise<number>;
        setChromaThresholdAA(value: number);
    }

    export class ItemChroma implements IItemChroma {
        id: string;
        viewID: number;

        /** Check if chroma is enabled or not */
        isChromaEnabled(): Promise<boolean> {
            return new Promise((resolve) => {
                iItem.attach(this.id, this.viewID);

                iItem.get('prop:key_chromakey').then((val) => {
                    resolve(val === '1');
                });
            });
        }

        /** Set Chroma to ON or OFF */
        setChromaEnabled(value: boolean) {
            iItem.attach(this.id, this.viewID);

            iItem.set('prop:key_chromakey', value ? '1' : '0');
        }

        /** Get Chroma brightness */
        getChromaBrightness(): Promise<number> {
            return new Promise((resolve) => {
                iItem.attach(this.id, this.viewID);

                iItem.get('prop:key_chromabr').then((val) => {
                    resolve(Number(val));
                });
            });
        }

        /** Set Chroma Brightness */
        setChromaBrightness(value: number) {
            iItem.attach(this.id, this.viewID);

            value = value < 0 ? 0 : value > 255 ? 255 : value;

            iItem.set('prop:key_chromabr', String(value));
        }

        /** Get Chroma Brightness */
        getChromaSaturation(): Promise<number> {
            return new Promise((resolve) => {
                iItem.attach(this.id, this.viewID);

                iItem.get('prop:key_chromasat').then((val) => {
                    resolve(Number(val));
                });
            });
        }

        /** Set Chroma Saturation */
        setChromaSaturation(value: number) {
            iItem.attach(this.id, this.viewID);

            value = value < 0 ? 0 : value > 255 ? 255 : value;

            iItem.set('prop:key_chromasat', String(value));
        }

        /** Get Chroma Hue */
        getChromaHue(): Promise<number> {
            return new Promise((resolve) => {
                iItem.attach(this.id, this.viewID);

                iItem.get('prop:key_chromahue').then((val) => {
                    resolve(Number(val));
                });
            });
        }

        /** Set Chroma Hue */
        setChromaHue(value: number) {
            iItem.attach(this.id, this.viewID);

            value = value < -180 ? -180 : value > 180 ? 180 : value;

            iItem.set('prop:key_chromahue', String(value));
        }

        /** Get Chroma Type */
        getChromaType(): Promise<CHROMA_TYPE> {
            return new Promise((resolve) => {
                iItem.attach(this.id, this.viewID);

                iItem.get('prop:key_chromakeytype').then((val) => {
                    resolve(Number(val));
                });
            });
        }

        /** Set Chroma Type */
        setChromaType(value: CHROMA_TYPE) {
            iItem.attach(this.id, this.viewID);

            value = value < 0 ? 0 : value > 2 ? 2 : value;

            iItem.set('prop:key_chromakeytype', String(value));
        }

        /** Get Chroma Color */
        getChromaColor(): Promise<Color> {
            return new Promise((resolve) => {
                iItem.attach(this.id, this.viewID);

                iItem.get('prop:key_colorrgb').then((val) => {
                    var color = new Color();

                    color.setBgr(val);

                    resolve(color);
                });
            });
        }

        /** Set Chroma Color */
        setChromaColor(value: Color) {
            iItem.attach(this.id, this.viewID);

            iItem.set('prop:key_colorrgb', value.getBgr());
        }

        /** Get Chroma Primary Color */
        getChromaPrimaryColor(): Promise<CHROMA_PRIMARY_COLORS> {
            return new Promise((resolve) => {
                iItem.attach(this.id, this.viewID);

                iItem.get('prop:key_chromargbkeyprimary').then((val) => {
                    resolve(Number(val));
                });
            });
        }

        /** Set Chroma Primary Color */
        setChromaPrimaryColor(value: CHROMA_PRIMARY_COLORS) {
            iItem.attach(this.id, this.viewID);

            value = value < 0 ? 0 : value > 2 ? 2 : value;

            iItem.set('prop:key_chromargbkeyprimary', String(value));
        }

        /** Get Chroma Balance */
        getChromaBalance(): Promise<number> {
            return new Promise((resolve) => {
                iItem.attach(this.id, this.viewID);

                iItem.get('prop:key_chromargbkeybalance').then((val) => {
                    resolve(Number(val));
                });
            });
        }

        /** Set Chroma Balance */
        setChromaBalance(value: number) {
            iItem.attach(this.id, this.viewID);

            value = value < 0 ? 0 : value > 255 ? 255 : value;

            iItem.set('prop:key_chromargbkeybalance', String(value));
        }

        /** Get Chroma Anti Alias level */
        getChromaAntiAlias(): Promise<CHROMA_ANTIALIAS> {
            return new Promise((resolve) => {
                iItem.attach(this.id, this.viewID);

                iItem.get('prop:key_antialiasing').then((val) => {
                    resolve(Number(val));
                });
            });
        }

        /** Set Chroma Anti Alias level */
        setChromaAntiAlias(value: CHROMA_ANTIALIAS) {
            iItem.attach(this.id, this.viewID);

            value = value < 0 ? 0 : value > 2 ? 2 : value;

            iItem.set('prop:key_antialiasing', String(value));
        }

        /** Get Chroma Threshold */
        getChromaThreshold(): Promise<number> {
            return new Promise((resolve) => {
                iItem.attach(this.id, this.viewID);

                iItem.get('prop:key_chromarang').then((val) => {
                    resolve(Number(val));
                });
            });
        }

        /** Set Chroma Threshold */
        setChromaThreshold(value: number) {
            iItem.attach(this.id, this.viewID);

            value = value < 0 ? 0 : value > 255 ? 255 : value;

            iItem.set('prop:key_chromarang', String(value));
        }

        /** Get Chroma Threshold Anti Alias */
        getChromaThresholdAA(): Promise<number> {
            return new Promise((resolve) => {
                iItem.attach(this.id, this.viewID);

                iItem.get('prop:key_chromaranga').then((val) => {
                    resolve(Number(val));
                });
            });
        }

        /** Set Chroma Threshold Anti Alias */
        setChromaThresholdAA(value: number) {
            iItem.attach(this.id, this.viewID);

            value = value < 0 ? 0 : value > 255 ? 255 : value;

            iItem.set('prop:key_chromaranga', String(value));
        }
    }
}
/// <reference path="../../_references.ts" />

module xui.core {
    import iItem = internal.Item;
    import Color = internal.utils.Color;

    export enum ChromaTypes {
        KEY,
        COLOR,
        RGB
    }

    export enum ChromaPrimaryColors {
        RED,
        GREEN,
        BLUE
    }

    export enum ChromaAntiAlias {
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
        getChromaType(): Promise<ChromaTypes>;
        setChromaType(value: ChromaTypes);
        getChromaColor(): Promise<Color>;
        setChromaColor(value: Color);
        getChromaPrimaryColor(): Promise<ChromaPrimaryColors>;
        setChromaPrimaryColor(value: ChromaPrimaryColors);
        getChromaBalance(): Promise<number>;
        setChromaBalance(value: number);
        getChromaAntiAlias(): Promise<number>;
        setChromaAntiAlias(value: number);
        getChromaThreshold(): Promise<number>;
        setChromaThreshold(value: number);
        getChromaThresholdAA(): Promise<number>;
        setChromaThresholdAA(value: number);
    }

    class ItemChroma implements IItemChroma {
        private id: string;
        private viewID: number;

        isChromaEnabled(): Promise<boolean> {
            return new Promise((resolve) => {
                let slot = iItem.attach(this.id, this.viewID);

                iItem.get('prop:key_chromakey', slot).then((val) => {
                    resolve(val === '1');
                });
            });
        }

        setChromaEnabled(value: boolean) {
            let slot = iItem.attach(this.id, this.viewID);

            iItem.set('prop:key_chromakey', (value ? '1' : '0'), slot);
        }

        getChromaBrightness(): Promise<number> {
            return new Promise((resolve) => {
                let slot = iItem.attach(this.id, this.viewID);

                iItem.get('prop:key_chromabr', slot).then((val) => {
                    resolve(Number(val));
                });
            });
        }

        setChromaBrightness(value: number) {
            let slot = iItem.attach(this.id, this.viewID);

            value = value < 0 ? 0 : value > 255 ? 255 : value;

            iItem.set('prop:key_chromabr', String(value), slot);
        }

        getChromaSaturation(): Promise<number> {
            return new Promise((resolve) => {
                let slot = iItem.attach(this.id, this.viewID);

                iItem.get('prop:key_chromasat', slot).then((val) => {
                    resolve(Number(val));
                });
            });
        }

        setChromaSaturation(value: number) {
            let slot = iItem.attach(this.id, this.viewID);

            value = value < 0 ? 0 : value > 255 ? 255 : value;

            iItem.set('prop:key_chromasat', String(value), slot);
        }

        getChromaHue(): Promise<number> {
            return new Promise((resolve) => {
                let slot = iItem.attach(this.id, this.viewID);

                iItem.get('prop:key_chromahue', slot).then((val) => {
                    resolve(Number(val));
                });
            });
        }

        setChromaHue(value: number) {
            let slot = iItem.attach(this.id, this.viewID);

            value = value < -180 ? -180 : value > 180 ? 180 : value;

            iItem.set('prop:key_chromahue', String(value), slot);
        }

        getChromaType(): Promise<ChromaTypes> {
            return new Promise((resolve) => {
                let slot = iItem.attach(this.id, this.viewID);

                iItem.get('prop:key_chromakeytype', slot).then((val) => {
                    resolve(Number(val));
                });
            });
        }

        setChromaType(value: ChromaTypes) {
            let slot = iItem.attach(this.id, this.viewID);

            value = value < 0 ? 0 : value > 2 ? 2 : value;

            iItem.set('prop:key_chromakeytype', String(value), slot);
        }

        getChromaColor(): Promise<Color> {
            return new Promise((resolve) => {
                let slot = iItem.attach(this.id, this.viewID);

                iItem.get('prop:key_colorrgb', slot).then((val) => {
                    var color = new Color();

                    color.setBgr(val);

                    resolve(color);
                });
            });
        }

        setChromaColor(value: Color) {
            let slot = iItem.attach(this.id, this.viewID);

            iItem.set('prop:key_colorrgb', value.getBgr(), slot);
        }

        getChromaPrimaryColor(): Promise<ChromaPrimaryColors> {
            return new Promise((resolve) => {
                let slot = iItem.attach(this.id, this.viewID);

                iItem.get('prop:key_chromargbkeyprimary', slot).then((val) => {
                    resolve(Number(val));
                });
            });
        }

        setChromaPrimaryColor(value: ChromaPrimaryColors) {
            let slot = iItem.attach(this.id, this.viewID);

            value = value < 0 ? 0 : value > 2 ? 2 : value;

            iItem.set('prop:key_chromargbkeyprimary', String(value), slot);
        }

        getChromaBalance(): Promise<number> {
            return new Promise((resolve) => {
                let slot = iItem.attach(this.id, this.viewID);

                iItem.get('prop:key_chromargbkeybalance', slot).then((val) => {
                    resolve(Number(val));
                });
            });
        }

        setChromaBalance(value: number) {
            let slot = iItem.attach(this.id, this.viewID);

            value = value < 0 ? 0 : value > 255 ? 255 : value;

            iItem.set('prop:key_chromargbkeybalance', String(value), slot);
        }

        getChromaAntiAlias(): Promise<ChromaAntiAlias> {
            return new Promise((resolve) => {
                let slot = iItem.attach(this.id, this.viewID);

                iItem.get('prop:key_antialiasing', slot).then((val) => {
                    resolve(Number(val));
                });
            });
        }

        setChromaAntiAlias(value: ChromaAntiAlias) {
            let slot = iItem.attach(this.id, this.viewID);

            value = value < 0 ? 0 : value > 2 ? 2 : value;

            iItem.set('prop:key_antialiasing', String(value), slot);
        }

        getChromaThreshold(): Promise<number> {
            return new Promise((resolve) => {
                let slot = iItem.attach(this.id, this.viewID);

                iItem.get('prop:key_chromarang', slot).then((val) => {
                    resolve(Number(val));
                });
            });
        }

        setChromaThreshold(value: number) {
            let slot = iItem.attach(this.id, this.viewID);

            value = value < 0 ? 0 : value > 255 ? 255 : value;

            iItem.set('prop:key_chromarang', String(value), slot);
        }

        getChromaThresholdAA(): Promise<number> {
            return new Promise((resolve) => {
                let slot = iItem.attach(this.id, this.viewID);

                iItem.get('prop:key_chromaranga', slot).then((val) => {
                    resolve(Number(val));
                });
            });
        }
        
        setChromaThresholdAA(value: number) {
            let slot = iItem.attach(this.id, this.viewID);

            value = value < 0 ? 0 : value > 255 ? 255 : value;

            iItem.set('prop:key_chromaranga', String(value), slot);
        }
    }

    internal.utils.applyMixins(Item, [ItemChroma]);
}

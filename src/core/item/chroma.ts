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
        id: string;
        viewID: number;

        isChromaEnabled(): Promise<boolean> {
            return new Promise((resolve) => {
                iItem.attach(this.id, this.viewID);

                iItem.get('prop:key_chromakey').then((val) => {
                    resolve(val === '1');
                });
            });
        }

        setChromaEnabled(value: boolean) {
            iItem.attach(this.id, this.viewID);

            iItem.set('prop:key_chromakey', value ? '1' : '0');
        }

        getChromaBrightness(): Promise<number> {
            return new Promise((resolve) => {
                iItem.attach(this.id, this.viewID);

                iItem.get('prop:key_chromabr').then((val) => {
                    resolve(Number(val));
                });
            });
        }

        setChromaBrightness(value: number) {
            iItem.attach(this.id, this.viewID);

            value = value < 0 ? 0 : value > 255 ? 255 : value;

            iItem.set('prop:key_chromabr', String(value));
        }

        getChromaSaturation(): Promise<number> {
            return new Promise((resolve) => {
                iItem.attach(this.id, this.viewID);

                iItem.get('prop:key_chromasat').then((val) => {
                    resolve(Number(val));
                });
            });
        }

        setChromaSaturation(value: number) {
            iItem.attach(this.id, this.viewID);

            value = value < 0 ? 0 : value > 255 ? 255 : value;

            iItem.set('prop:key_chromasat', String(value));
        }

        getChromaHue(): Promise<number> {
            return new Promise((resolve) => {
                iItem.attach(this.id, this.viewID);

                iItem.get('prop:key_chromahue').then((val) => {
                    resolve(Number(val));
                });
            });
        }

        setChromaHue(value: number) {
            iItem.attach(this.id, this.viewID);

            value = value < -180 ? -180 : value > 180 ? 180 : value;

            iItem.set('prop:key_chromahue', String(value));
        }

        getChromaType(): Promise<ChromaTypes> {
            return new Promise((resolve) => {
                iItem.attach(this.id, this.viewID);

                iItem.get('prop:key_chromakeytype').then((val) => {
                    resolve(Number(val));
                });
            });
        }

        setChromaType(value: ChromaTypes) {
            iItem.attach(this.id, this.viewID);

            value = value < 0 ? 0 : value > 2 ? 2 : value;

            iItem.set('prop:key_chromakeytype', String(value));
        }

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

        setChromaColor(value: Color) {
            iItem.attach(this.id, this.viewID);

            iItem.set('prop:key_colorrgb', value.getBgr());
        }

        getChromaPrimaryColor(): Promise<ChromaPrimaryColors> {
            return new Promise((resolve) => {
                iItem.attach(this.id, this.viewID);

                iItem.get('prop:key_chromargbkeyprimary').then((val) => {
                    resolve(Number(val));
                });
            });
        }

        setChromaPrimaryColor(value: ChromaPrimaryColors) {
            iItem.attach(this.id, this.viewID);

            value = value < 0 ? 0 : value > 2 ? 2 : value;

            iItem.set('prop:key_chromargbkeyprimary', String(value));
        }

        getChromaBalance(): Promise<number> {
            return new Promise((resolve) => {
                iItem.attach(this.id, this.viewID);

                iItem.get('prop:key_chromargbkeybalance').then((val) => {
                    resolve(Number(val));
                });
            });
        }

        setChromaBalance(value: number) {
            iItem.attach(this.id, this.viewID);

            value = value < 0 ? 0 : value > 255 ? 255 : value;

            iItem.set('prop:key_chromargbkeybalance', String(value));
        }

        getChromaAntiAlias(): Promise<ChromaAntiAlias> {
            return new Promise((resolve) => {
                iItem.attach(this.id, this.viewID);

                iItem.get('prop:key_antialiasing').then((val) => {
                    resolve(Number(val));
                });
            });
        }

        setChromaAntiAlias(value: ChromaAntiAlias) {
            iItem.attach(this.id, this.viewID);

            value = value < 0 ? 0 : value > 2 ? 2 : value;

            iItem.set('prop:key_antialiasing', String(value));
        }

        getChromaThreshold(): Promise<number> {
            return new Promise((resolve) => {
                iItem.attach(this.id, this.viewID);

                iItem.get('prop:key_chromarang').then((val) => {
                    resolve(Number(val));
                });
            });
        }

        setChromaThreshold(value: number) {
            iItem.attach(this.id, this.viewID);

            value = value < 0 ? 0 : value > 255 ? 255 : value;

            iItem.set('prop:key_chromarang', String(value));
        }

        getChromaThresholdAA(): Promise<number> {
            return new Promise((resolve) => {
                iItem.attach(this.id, this.viewID);

                iItem.get('prop:key_chromaranga').then((val) => {
                    resolve(Number(val));
                });
            });
        }

        setChromaThresholdAA(value: number) {
            iItem.attach(this.id, this.viewID);

            value = value < 0 ? 0 : value > 255 ? 255 : value;

            iItem.set('prop:key_chromaranga', String(value));
        }
    }

    internal.utils.applyMixins(Item, [ItemChroma]);
}

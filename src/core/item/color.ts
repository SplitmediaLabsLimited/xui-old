/// <reference path="../../_references.ts" />

module xui.core {
    import iItem     = internal.Item;
    import Rectangle = internal.utils.Rectangle;
    import Color     = internal.utils.Color;

    export interface IItemColor {
        getTransparency(): Promise<number>;
        setTransparency(value: number);
        getBrightness(): Promise<number>;
        setBrightness(value: number);
        getContrast(): Promise<number>;
        setContrast(value: number);
        getHue(): Promise<number>;
        setHue(value: number);
        getSaturation(): Promise<number>;
        setSaturation(value: number);
        getBorderColor(): Promise<Color>;
        setBorderColor(value: Color);
    }

    export class ItemColor implements IItemColor {
        private id: string;
        private viewID: number;

        /** Get Item Transparency value */
        getTransparency(): Promise<number> {
            return new Promise((resolve) => {
                iItem.attach(this.id, this.viewID);

                iItem.get('prop:alpha').then((val) => {
                    resolve(Number(val));
                });
            });
        }

        /** Set Item Transparency */
        setTransparency(value: number) {
            iItem.attach(this.id, this.viewID);

            value = value < 0 ? 0 : value > 255 ? 255 : value;

            iItem.set('prop:alpha', String(value));
        }

        /** Get Item Brightness value */
        getBrightness(): Promise<number> {
            return new Promise((resolve) => {
                iItem.attach(this.id, this.viewID);

                iItem.get('prop:cc_brightness').then((val) => {
                    resolve(Number(val));
                });
            });
        }

        /** Set Item Brightness */
        setBrightness(value: number) {
            iItem.attach(this.id, this.viewID);

            value = value < -100 ? -100 : value > 100 ? 100 : value;

            iItem.set('prop:cc_brightness', String(value));
        }

        /** Get Item Contrast value */
        getContrast(): Promise<number> {
            return new Promise((resolve) => {
                iItem.attach(this.id, this.viewID);

                iItem.get('prop:cc_contrast').then((val) => {
                    resolve(Number(val));
                });
            });
        }

        /** Set Item Contrast */
        setContrast(value: number) {
            iItem.attach(this.id, this.viewID);

            value = value < -100 ? -100 : value > 100 ? 100 : value;

            iItem.set('prop:cc_contrast', String(value));
        }

        /** Get Item Hue value */
        getHue(): Promise<number> {
            return new Promise((resolve) => {
                iItem.attach(this.id, this.viewID);

                iItem.get('prop:cc_hue').then((val) => {
                    resolve(Number(val));
                });
            });
        }

        /** Set Item Hue */
        setHue(value: number) {
            iItem.attach(this.id, this.viewID);

            value = value < -180 ? -180 : value > 180 ? 180 : value;

            iItem.set('prop:cc_hue', String(value));
        }

        /** Get Item Saturation value */
        getSaturation(): Promise<number> {
            return new Promise((resolve) => {
                iItem.attach(this.id, this.viewID);

                iItem.get('prop:cc_saturation').then((val) => {
                    resolve(Number(val));
                });
            });
        }

        /** Set Item Saturation */
        setSaturation(value: number) {
            iItem.attach(this.id, this.viewID);

            value = value < -100 ? -100 : value > 100 ? 100 : value;

            iItem.set('prop:cc_saturation', String(value));
        }

        /** Get Border Color */
        getBorderColor(): Promise<Color> {
            return new Promise((resolve) => {
                iItem.attach(this.id, this.viewID);

                iItem.get('prop:border').then((val) => {
                    var bgr: number = Number(val) - 0x80000000;
                    var color: Color = new Color();

                    color.setIbgr(bgr);

                    resolve(color);
                });
            });
        }

        /** Set Border Color */
        setBorderColor(value: Color) {
            iItem.attach(this.id, this.viewID);

            iItem.set('prop:border', String(value.getIbgr() - 0x80000000));
        }
    }
}
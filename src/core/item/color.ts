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

    class ItemColor implements IItemColor {
        private id: string;
        private viewID: number;

        getTransparency(): Promise<number> {
            return new Promise((resolve) => {
                let slot = iItem.attach(this.id, this.viewID);

                iItem.get('prop:alpha', slot).then((val) => {
                    resolve(Number(val));
                });
            });
        }

        setTransparency(value: number) {
            let slot = iItem.attach(this.id, this.viewID);

            value = value < 0 ? 0 : value > 255 ? 255 : value;

            iItem.set('prop:alpha', String(value), slot);
        }

        getBrightness(): Promise<number> {
            return new Promise((resolve) => {
                let slot = iItem.attach(this.id, this.viewID);

                iItem.get('prop:cc_brightness', slot).then((val) => {
                    resolve(Number(val));
                });
            });
        }

        setBrightness(value: number) {
            let slot = iItem.attach(this.id, this.viewID);

            value = value < -100 ? -100 : value > 100 ? 100 : value;

            iItem.set('prop:cc_brightness', String(value), slot);
        }

        getContrast(): Promise<number> {
            return new Promise((resolve) => {
                let slot = iItem.attach(this.id, this.viewID);

                iItem.get('prop:cc_contrast', slot).then((val) => {
                    resolve(Number(val));
                });
            });
        }

        setContrast(value: number) {
            let slot = iItem.attach(this.id, this.viewID);

            value = value < -100 ? -100 : value > 100 ? 100 : value;

            iItem.set('prop:cc_contrast', String(value), slot);
        }

        getHue(): Promise<number> {
            return new Promise((resolve) => {
                let slot = iItem.attach(this.id, this.viewID);

                iItem.get('prop:cc_hue', slot).then((val) => {
                    resolve(Number(val));
                });
            });
        }

        setHue(value: number) {
            let slot = iItem.attach(this.id, this.viewID);

            value = value < -180 ? -180 : value > 180 ? 180 : value;

            iItem.set('prop:cc_hue', String(value), slot);
        }

        getSaturation(): Promise<number> {
            return new Promise((resolve) => {
                let slot = iItem.attach(this.id, this.viewID);

                iItem.get('prop:cc_saturation', slot).then((val) => {
                    resolve(Number(val));
                });
            });
        }

        setSaturation(value: number) {
            let slot = iItem.attach(this.id, this.viewID);

            value = value < -100 ? -100 : value > 100 ? 100 : value;

            iItem.set('prop:cc_saturation', String(value), slot);
        }

        getBorderColor(): Promise<Color> {
            return new Promise((resolve) => {
                let slot = iItem.attach(this.id, this.viewID);

                iItem.get('prop:border', slot).then((val) => {
                    var bgr: number = Number(val) - 0x80000000;
                    var color: Color = Color.fromBGRInt(bgr);

                    resolve(color);
                });
            });
        }
        
        setBorderColor(value: Color) {
            let slot = iItem.attach(this.id, this.viewID);

            iItem.set('prop:border',
                String(value.getIbgr() - 0x80000000), slot);
        }
    }

    internal.utils.applyMixins(Item, [ItemColor]);
}

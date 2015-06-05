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
                iItem.attach(this.id, this.viewID);

                iItem.get('prop:alpha').then((val) => {
                    resolve(Number(val));
                });
            });
        }

        setTransparency(value: number) {
            iItem.attach(this.id, this.viewID);

            value = value < 0 ? 0 : value > 255 ? 255 : value;

            iItem.set('prop:alpha', String(value));
        }

        getBrightness(): Promise<number> {
            return new Promise((resolve) => {
                iItem.attach(this.id, this.viewID);

                iItem.get('prop:cc_brightness').then((val) => {
                    resolve(Number(val));
                });
            });
        }

        setBrightness(value: number) {
            iItem.attach(this.id, this.viewID);

            value = value < -100 ? -100 : value > 100 ? 100 : value;

            iItem.set('prop:cc_brightness', String(value));
        }

        getContrast(): Promise<number> {
            return new Promise((resolve) => {
                iItem.attach(this.id, this.viewID);

                iItem.get('prop:cc_contrast').then((val) => {
                    resolve(Number(val));
                });
            });
        }

        setContrast(value: number) {
            iItem.attach(this.id, this.viewID);

            value = value < -100 ? -100 : value > 100 ? 100 : value;

            iItem.set('prop:cc_contrast', String(value));
        }

        getHue(): Promise<number> {
            return new Promise((resolve) => {
                iItem.attach(this.id, this.viewID);

                iItem.get('prop:cc_hue').then((val) => {
                    resolve(Number(val));
                });
            });
        }

        setHue(value: number) {
            iItem.attach(this.id, this.viewID);

            value = value < -180 ? -180 : value > 180 ? 180 : value;

            iItem.set('prop:cc_hue', String(value));
        }

        getSaturation(): Promise<number> {
            return new Promise((resolve) => {
                iItem.attach(this.id, this.viewID);

                iItem.get('prop:cc_saturation').then((val) => {
                    resolve(Number(val));
                });
            });
        }

        setSaturation(value: number) {
            iItem.attach(this.id, this.viewID);

            value = value < -100 ? -100 : value > 100 ? 100 : value;

            iItem.set('prop:cc_saturation', String(value));
        }

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

        setBorderColor(value: Color) {
            iItem.attach(this.id, this.viewID);

            iItem.set('prop:border', String(value.getIbgr() - 0x80000000));
        }
    }

    internal.utils.applyMixins(Item, [ItemColor]);
}

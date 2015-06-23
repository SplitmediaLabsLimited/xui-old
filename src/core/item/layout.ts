/// <reference path="../../_references.ts" />

module xui.core {
    import iItem     = internal.Item;
    import Rectangle = internal.utils.Rectangle;

    export interface IItemLayout {
        isKeepAspectRatio(): Promise<boolean>;
        setKeepAspectRatio(value: boolean);
        isPositionLocked(): Promise<boolean>;
        setPositionLocked(value: boolean);
        isEnhanceResizeEnabled(): Promise<boolean>;
        setEnhanceResizeEnabled(value: boolean);
        isPixelAlignmentEnabled(): Promise<boolean>;
        setPixelAlignmentEnabled(value: boolean);
        getPosition(): Promise<Rectangle>;
        setPosition(value: Rectangle);
    }

    class ItemLayout implements IItemLayout {
        private id: string;
        private viewID: number;
        private position: Rectangle;

        isKeepAspectRatio(): Promise<boolean> {
            return new Promise((resolve) => {
                let slot = iItem.attach(this.id, this.viewID);

                iItem.get('prop:keep_ar', slot).then((val) => {
                    resolve(val === '1');
                });
            });
        }
        
        setKeepAspectRatio(value: boolean) {
            let slot = iItem.attach(this.id, this.viewID);

            iItem.set('prop:keep_ar', value ? '1' : '0', slot);
        }

        isPositionLocked(): Promise<boolean> {
            return new Promise((resolve) => {
                let slot = iItem.attach(this.id, this.viewID);

                iItem.get('prop:lockmove', slot).then((val) => {
                    resolve(val === '1');
                });
            });
        }

        setPositionLocked(value: boolean) {
            let slot = iItem.attach(this.id, this.viewID);

            iItem.set('prop:lockmove', value ? '1' : '0', slot);
        }

        isEnhanceResizeEnabled(): Promise<boolean> {
            return new Promise((resolve) => {
                let slot = iItem.attach(this.id, this.viewID);

                iItem.get('prop:mipmaps', slot).then((val) => {
                    resolve(val === '1');
                });
            });
        }

        setEnhanceResizeEnabled(value: boolean) {
            let slot = iItem.attach(this.id, this.viewID);

            iItem.set('prop:mipmaps', value ? '1' : '0', slot);
        }

        isPixelAlignmentEnabled(): Promise<boolean> {
            return new Promise((resolve) => {
                let slot = iItem.attach(this.id, this.viewID);

                iItem.get('prop:pixalign', slot).then((val) => {
                    resolve(val === '1');
                });
            });
        }

        setPixelAlignmentEnabled(value: boolean) {
            let slot = iItem.attach(this.id, this.viewID);

            iItem.set('prop:pixalign', value ? '1' : '0', slot);
        }

        getPosition():Promise<Rectangle> {
            return new Promise((resolve) => {
                let slot = iItem.attach(this.id, this.viewID);

                iItem.get('prop:pos', slot).then((val) => {
                    this.position = Rectangle.parse(val);

                    resolve(this.position);
                });
            });
        }

        setPosition(value: Rectangle) {
            let slot = iItem.attach(this.id, this.viewID);

            this.position = value;

            iItem.set('prop:pos', value.toString(), slot);
        }
    }

    internal.utils.applyMixins(Item, [ItemLayout]);
}

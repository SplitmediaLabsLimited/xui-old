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

    export class ItemLayout implements IItemLayout {
        private id: string;
        private viewID: number;
        private position: Rectangle;

        isKeepAspectRatio(): Promise<boolean> {
            return new Promise((resolve) => {
                iItem.attach(this.id, this.viewID);

                iItem.get('prop:keep_ar').then((val) => {
                    resolve(val === '1');
                });
            });
        }
        
        setKeepAspectRatio(value: boolean) {
            iItem.attach(this.id, this.viewID);

            iItem.set('prop:keep_ar', value ? '1' : '0');
        }

        isPositionLocked(): Promise<boolean> {
            return new Promise((resolve) => {
                iItem.attach(this.id, this.viewID);

                iItem.get('prop:lockmove').then((val) => {
                    resolve(val === '1');
                });
            });
        }

        setPositionLocked(value: boolean) {
            iItem.attach(this.id, this.viewID);

            iItem.set('prop:lockmove', value ? '1' : '0');
        }

        isEnhanceResizeEnabled(): Promise<boolean> {
            return new Promise((resolve) => {
                iItem.attach(this.id, this.viewID);

                iItem.get('prop:mipmaps').then((val) => {
                    resolve(val === '1');
                });
            });
        }

        setEnhanceResizeEnabled(value: boolean) {
            iItem.attach(this.id, this.viewID);

            iItem.set('prop:mipmaps', value ? '1' : '0');
        }

        isPixelAlignmentEnabled(): Promise<boolean> {
            return new Promise((resolve) => {
                iItem.attach(this.id, this.viewID);

                iItem.get('prop:pixalign').then((val) => {
                    resolve(val === '1');
                });
            });
        }

        setPixelAlignmentEnabled(value: boolean) {
            iItem.attach(this.id, this.viewID);

            iItem.set('prop:pixalign', value ? '1' : '0');
        }

        getPosition():Promise<Rectangle> {
            return new Promise((resolve) => {
                iItem.attach(this.id, this.viewID);

                iItem.get('prop:pos').then((val) => {
                    this.position = Rectangle.parse(val);

                    resolve(this.position);
                });
            });
        }

        setPosition(value: Rectangle) {
            iItem.attach(this.id, this.viewID);

            this.position = value;

            iItem.set('prop:pos', value.toString());
        }
    }
}
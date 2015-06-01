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

        // Private variables won't work with mixins, Item needs this for toXML()
        position: Rectangle;

        /** Check if Aspect Ratio is set to ON or OFF */
        isKeepAspectRatio(): Promise<boolean> {
            return new Promise((resolve) => {
                iItem.attach(this.id, this.viewID);

                iItem.get('prop:keep_ar').then((val) => {
                    resolve(val === '1');
                });
            });
        }

        /** Set Aspect Ratio to ON or OFF */
        setKeepAspectRatio(value: boolean) {
            iItem.attach(this.id, this.viewID);

            iItem.set('prop:keep_ar', value ? '1' : '0');
        }

        /** Check if Position Locked is set to ON or OFF */
        isPositionLocked(): Promise<boolean> {
            return new Promise((resolve) => {
                iItem.attach(this.id, this.viewID);

                iItem.get('prop:lockmove').then((val) => {
                    resolve(val === '1');
                });
            });
        }

        /** Set Position Lock to ON or OFF */
        setPositionLocked(value: boolean) {
            iItem.attach(this.id, this.viewID);

            iItem.set('prop:lockmove', value ? '1' : '0');
        }

        /** Check if Enhance Resize is Enabled or Disabled */
        isEnhanceResizeEnabled(): Promise<boolean> {
            return new Promise((resolve) => {
                iItem.attach(this.id, this.viewID);

                iItem.get('prop:mipmaps').then((val) => {
                    resolve(val === '1');
                });
            });
        }

        /** Set Enhance Resize to ON or OFF */
        setEnhanceResizeEnabled(value: boolean) {
            iItem.attach(this.id, this.viewID);

            iItem.set('prop:mipmaps', value ? '1' : '0');
        }

        /** Check if Pixel Alignment is Enabled or Disabled */
        isPixelAlignmentEnabled(): Promise<boolean> {
            return new Promise((resolve) => {
                iItem.attach(this.id, this.viewID);

                iItem.get('prop:pixalign').then((val) => {
                    resolve(val === '1');
                });
            });
        }

        /** Set Pixel Alignment to ON or OFF */
        setPixelAlignmentEnabled(value: boolean) {
            iItem.attach(this.id, this.viewID);

            iItem.set('prop:pixalign', value ? '1' : '0');
        }

        /** Get the position of the item */
        getPosition():Promise<Rectangle> {
            return new Promise((resolve) => {
                iItem.attach(this.id, this.viewID);

                iItem.get('prop:pos').then((val) => {
                    this.position = Rectangle.parse(val);

                    resolve(this.position);
                });
            });
        }

        /** Set Item position */
        setPosition(value: Rectangle) {
            iItem.attach(this.id, this.viewID);

            this.position = value;

            iItem.set('prop:pos', value.toString());
        }
    }
}
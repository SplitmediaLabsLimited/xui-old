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
        private keepAspectRatio: boolean;
        private positionLocked: boolean;
        private enhanceResizeEnabled: boolean;
        private pixelAlignmentEnabled: boolean;
        private position: Rectangle;
        private id: string;
        private viewID: number;

        /** Check if Aspect Ratio is set to ON or OFF */
        isKeepAspectRatio(): Promise<boolean> {
            return new Promise((resolve) => {
                iItem.attach(this.id, this.viewID);

                iItem.get('prop:keep_ar').then((val) => {
                    this.keepAspectRatio = (val === '1');

                    resolve(this.keepAspectRatio);
                });
            });
        }

        /** Set Aspect Ratio to ON or OFF */
        setKeepAspectRatio(value: boolean) {
            iItem.attach(this.id, this.viewID);

            this.keepAspectRatio = value;

            iItem.set('prop:keep_ar', this.keepAspectRatio ? '1' : '0');
        }

        /** Check if Position Locked is set to ON or OFF */
        isPositionLocked(): Promise<boolean> {
            return new Promise((resolve) => {
                iItem.attach(this.id, this.viewID);

                iItem.get('prop:lockmove').then((val) => {
                    this.positionLocked = (val === '1');

                    resolve(this.positionLocked);
                });
            });
        }

        /** Set Position Lock to ON or OFF */
        setPositionLocked(value: boolean) {
            iItem.attach(this.id, this.viewID);

            this.positionLocked = value;

            iItem.set('prop:lockmove', this.positionLocked ? '1' : '0');
        }

        /** Check if Enhance Resize is Enabled or Disabled */
        isEnhanceResizeEnabled(): Promise<boolean> {
            return new Promise((resolve) => {
                iItem.attach(this.id, this.viewID);

                iItem.get('prop:mipmaps').then((val) => {
                    this.enhanceResizeEnabled = (val === '1');

                    resolve(this.enhanceResizeEnabled);
                });
            });
        }

        /** Set Enhance Resize to ON or OFF */
        setEnhanceResizeEnabled(value: boolean) {
            iItem.attach(this.id, this.viewID);

            this.enhanceResizeEnabled = value;

            iItem.set('prop:mipmaps', this.enhanceResizeEnabled ? '1' : '0');
        }

        /** Check if Pixel Alignment is Enabled or Disabled */
        isPixelAlignmentEnabled(): Promise<boolean> {
            return new Promise((resolve) => {
                iItem.attach(this.id, this.viewID);

                iItem.get('prop:pixalign').then((val) => {
                    this.pixelAlignmentEnabled = (val === '1');

                    resolve(this.pixelAlignmentEnabled);
                });
            });
        }

        /** Set Pixel Alignment to ON or OFF */
        setPixelAlignmentEnabled(value: boolean) {
            iItem.attach(this.id, this.viewID);

            this.pixelAlignmentEnabled = value;

            iItem.set('prop:pixalign', this.pixelAlignmentEnabled ? '1' : '0');
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

            iItem.set('prop:pos', this.position.toString());
        }
    }
}
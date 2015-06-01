/// <reference path="../../_references.ts" />

module xui.core {
    import iItem = internal.Item;

    export interface IItemWindow {
        isWindowTracking(): Promise<boolean>;
        setWindowTracking(value: boolean);
    }

    export class ItemWindow implements IItemWindow {
        id: string;
        viewID: number;

        /** Check if Window Tracking is ON or OFF */
        isWindowTracking(): Promise<boolean> {
            return new Promise((resolve) => {
                iItem.attach(this.id, this.viewID);

                iItem.get('prop:ScrCapTrackWindowTitle').then((val) => {
                    resolve(val === '0');
                });
            });
        }

        /** Set Window Tracking to ON or OFF */
        setWindowTracking(value: boolean) {
            iItem.attach(this.id, this.viewID);

            iItem.set('prop:ScrCapTrackWindowTitle', (value ? '0' : '1'));
        }
    }
}
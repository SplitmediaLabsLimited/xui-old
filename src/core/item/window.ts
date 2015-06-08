/// <reference path="../../_references.ts" />

module xui.core {
    import iItem = internal.Item;

    export interface IItemWindow {
        isWindowTracking(): Promise<boolean>;
        setWindowTracking(value: boolean);
    }

    class ItemWindow implements IItemWindow {
        private id: string;
        private viewID: number;

        isWindowTracking(): Promise<boolean> {
            return new Promise((resolve) => {
                iItem.attach(this.id, this.viewID);

                iItem.get('prop:ScrCapTrackWindowTitle').then((val) => {
                    resolve(val === '0');
                });
            });
        }
        
        setWindowTracking(value: boolean) {
            iItem.attach(this.id, this.viewID);

            iItem.set('prop:ScrCapTrackWindowTitle', (value ? '0' : '1'));
        }
    }

    internal.utils.applyMixins(Item, [ItemWindow]);
}

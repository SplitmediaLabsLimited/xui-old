/// <reference path="../../_references.ts" />

module xui.core {
    import iItem = internal.Item;

    export enum PlaybackEndAction {
        NOTHING,
        REWIND,
        LOOP,
        HIDE
    }

    export interface IItemPlayback {
        getPlaybackStartPos(): Promise<number>;
        setPlaybackStartPos(value: number);
        getPlaybackEndPos(): Promise<number>;
        setPlaybackEndPos(value: number);
        getPlaybackEndAction(): Promise<PlaybackEndAction>;
        setPlaybackEndAction(value: PlaybackEndAction);
        getPlaybackDuration(): Promise<number>;
        setPlaybackDuration(value: number);
    }

    class ItemPlayback implements IItemPlayback {
        private id: string;
        private viewID: number;

        getPlaybackStartPos(): Promise<number> {
            return new Promise((resolve) => {
                let slot = iItem.attach(this.id, this.viewID);

                iItem.get('prop:InPoint', slot).then((val) => {
                    resolve(Number(val) / 10);
                });
            });
        }

        setPlaybackStartPos(value: number) {
            let slot = iItem.attach(this.id, this.viewID);

            value = value < 0 ? 0 : value;

            iItem.set('prop:InPoint', String(value * 10), slot);
        }

        getPlaybackEndPos(): Promise<number> {
            return new Promise((resolve) => {
                let slot = iItem.attach(this.id, this.viewID);

                iItem.get('prop:OutPoint', slot).then((val) => {
                    resolve(Number(val) / 10);
                });
            });
        }

        setPlaybackEndPos(value: number) {
            let slot = iItem.attach(this.id, this.viewID);

            value = value < 0 ? 0 : value;

            iItem.set('prop:OutPoint', String(value * 10), slot);
        }

        getPlaybackEndAction(): Promise<PlaybackEndAction> {
            return new Promise((resolve) => {
                let slot = iItem.attach(this.id, this.viewID);

                iItem.get('prop:OpWhenFinished', slot).then((val) => {
                    resolve(Number(val));
                });
            });
        }

        setPlaybackEndAction(value: PlaybackEndAction) {
            let slot = iItem.attach(this.id, this.viewID);

            iItem.set('prop:OpWhenFinished', String(value), slot);
        }

        getPlaybackDuration(): Promise<number> {
            return new Promise((resolve) => {
                let slot = iItem.attach(this.id, this.viewID);

                iItem.get('sync:duration', slot).then((val) => {
                    resolve(Number(val));
                });
            });
        }
        
        setPlaybackDuration(value: number) {
            let slot = iItem.attach(this.id, this.viewID);

            iItem.set('sync:duration', String(value), slot);
        }
    }

    internal.utils.applyMixins(Item, [ItemPlayback]);
}

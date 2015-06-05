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
        id: string;
        viewID: number;

        getPlaybackStartPos(): Promise<number> {
            return new Promise((resolve) => {
                iItem.attach(this.id, this.viewID);

                iItem.get('prop:InPoint').then((val) => {
                    resolve(Number(val) / 10);
                });
            });
        }

        setPlaybackStartPos(value: number) {
            iItem.attach(this.id, this.viewID);

            value = value < 0 ? 0 : value;

            iItem.set('prop:InPoint', String(value * 10));
        }

        getPlaybackEndPos(): Promise<number> {
            return new Promise((resolve) => {
                iItem.attach(this.id, this.viewID);

                iItem.get('prop:OutPoint').then((val) => {
                    resolve(Number(val) / 10);
                });
            });
        }

        setPlaybackEndPos(value: number) {
            iItem.attach(this.id, this.viewID);

            value = value < 0 ? 0 : value;

            iItem.set('prop:OutPoint', String(value * 10));
        }

        getPlaybackEndAction(): Promise<PlaybackEndAction> {
            return new Promise((resolve) => {
                iItem.attach(this.id, this.viewID);

                iItem.get('prop:OpWhenFinished').then((val) => {
                    resolve(Number(val));
                });
            });
        }

        setPlaybackEndAction(value: PlaybackEndAction) {
            iItem.attach(this.id, this.viewID);

            iItem.set('prop:OpWhenFinished', String(value));
        }

        getPlaybackDuration(): Promise<number> {
            return new Promise((resolve) => {
                iItem.attach(this.id, this.viewID);

                iItem.get('sync:duration').then((val) => {
                    resolve(Number(val));
                });
            });
        }

        setPlaybackDuration(value: number) {
            iItem.attach(this.id, this.viewID);

            iItem.set('sync:duration', String(value));
        }
    }

    internal.utils.applyMixins(Item, [ItemPlayback]);
}

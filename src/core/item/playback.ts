/// <reference path="../../_references.ts" />

module xui.core {
    import iItem = internal.Item;

    export enum PLAYBACK_END_ACTION {
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
        getPlaybackEndAction(): Promise<PLAYBACK_END_ACTION>;
        setPlaybackEndAction(value: PLAYBACK_END_ACTION);
        getPlaybackDuration(): Promise<number>;
        setPlaybackDuration(value: number);
    }

    export class ItemPlayback implements IItemPlayback {
        id: string;
        viewID: number;

        /** Get Playback Starting position */
        getPlaybackStartPos(): Promise<number> {
            return new Promise((resolve) => {
                iItem.attach(this.id, this.viewID);

                iItem.get('prop:InPoint').then((val) => {
                    resolve(Number(val) / 10);
                });
            });
        }

        /** Set Playback Starting position */
        setPlaybackStartPos(value: number) {
            iItem.attach(this.id, this.viewID);

            value = value < 0 ? 0 : value;

            iItem.set('prop:InPoint', String(value * 10));
        }

        /** Get Playback Ending position */
        getPlaybackEndPos(): Promise<number> {
            return new Promise((resolve) => {
                iItem.attach(this.id, this.viewID);

                iItem.get('prop:OutPoint').then((val) => {
                    resolve(Number(val) / 10);
                });
            });
        }

        /** Set Playback Ending position */
        setPlaybackEndPos(value: number) {
            iItem.attach(this.id, this.viewID);

            value = value < 0 ? 0 : value;

            iItem.set('prop:OutPoint', String(value * 10));
        }

        /** Get Playback Ending action */
        getPlaybackEndAction(): Promise<PLAYBACK_END_ACTION> {
            return new Promise((resolve) => {
                iItem.attach(this.id, this.viewID);

                iItem.get('prop:OpWhenFinished').then((val) => {
                    resolve(Number(val));
                });
            });
        }

        /** Set Playback Ending action */
        setPlaybackEndAction(value: PLAYBACK_END_ACTION) {
            iItem.attach(this.id, this.viewID);

            iItem.set('prop:OpWhenFinished', String(value));
        }

        /** Get Playback Duration */
        getPlaybackDuration(): Promise<number> {
            return new Promise((resolve) => {
                iItem.attach(this.id, this.viewID);

                iItem.get('sync:duration').then((val) => {
                    resolve(Number(val));
                });
            });
        }

        /** Set Playback Duration */
        setPlaybackDuration(value: number) {
            iItem.attach(this.id, this.viewID);

            iItem.set('sync:duration', String(value));
        }
    }
}
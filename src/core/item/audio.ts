/// <reference path="../../_references.ts" />

module xui.core {
    import iItem = internal.Item;

    export interface IItemAudio {
        getVolume(): Promise<number>;
        setVolume(value: number);
        isMuted(): Promise<boolean>;
        setMuted(value: boolean);
    }

    export class ItemAudio implements IItemAudio {
        id: string;
        viewID: number;

        /** Get Item Volume level */
        getVolume(): Promise<number> {
            return new Promise((resolve) => {
                iItem.attach(this.id, this.viewID);

                iItem.get('prop:volume').then((val) => {
                    resolve(Number(val));
                });
            });
        }

        /** Set Volume level of item */
        setVolume(value: number) {
            iItem.attach(this.id, this.viewID);

            value = value < 0 ? 0 : value > 100 ? 100 : value;

            iItem.set('prop:volume', String(value));
        }

        /** Check if item is muted */
        isMuted(): Promise<boolean> {
            return new Promise((resolve) => {
                iItem.attach(this.id, this.viewID);

                iItem.get('prop:mute').then((val) => {
                    resolve(val === '1');
                });
            });
        }

        /** Set Item Mute to ON or OFF */
        setMuted(value: boolean) {
            iItem.attach(this.id, this.viewID);

            iItem.set('prop:mute', value ? '1' : '0');
        }
    }
}
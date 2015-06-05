module xui.core {
    import iItem = internal.Item;

    export interface IItemAudio {
        getVolume(): Promise<number>;
        setVolume(value: number);
        isMuted(): Promise<boolean>;
        setMuted(value: boolean);
    }

    class ItemAudio implements IItemAudio {
        private id: string;
        private viewID: number;

        getVolume(): Promise<number> {
            return new Promise((resolve) => {
                iItem.attach(this.id, this.viewID);

                iItem.get('prop:volume').then((val) => {
                    resolve(Number(val));
                });
            });
        }

        setVolume(value: number) {
            iItem.attach(this.id, this.viewID);

            value = value < 0 ? 0 : value > 100 ? 100 : value;

            iItem.set('prop:volume', String(value));
        }

        isMuted(): Promise<boolean> {
            return new Promise((resolve) => {
                iItem.attach(this.id, this.viewID);

                iItem.get('prop:mute').then((val) => {
                    resolve(val === '1');
                });
            });
        }

        setMuted(value: boolean) {
            iItem.attach(this.id, this.viewID);

            iItem.set('prop:mute', value ? '1' : '0');
        }
    }

    internal.utils.applyMixins(Item, [ItemAudio]);
}

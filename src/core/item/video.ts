/// <reference path="../../_references.ts" />

module xui.core {
    import iItem = internal.Item;

    export interface IItemVideo {
        getCuePoints(): Promise<number[]>;
    }

    class ItemVideo implements IItemVideo {
        private id: string;
        private viewID: number;
        
        getCuePoints(): Promise<number[]> {
            return new Promise((resolve) => {
                let slot = iItem.attach(this.id, this.viewID);

                iItem.get('prop:CuePoints', slot).then((val) => {
                    var cuepoints: string[];;
                    var ret: number[];

                    cuepoints = val.split(',');

                    ret = cuepoints.map((value) => {
                        return Number(value) / 10;
                    });

                    resolve(ret);
                });
            });
        }
    }

    internal.utils.applyMixins(Item, [ItemVideo]);
}

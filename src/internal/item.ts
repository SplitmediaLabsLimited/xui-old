/// <reference path="_references.ts" />

module internal {
    export class Item {
        private name: string;
        private value: string;
        private id: string;
        private sceneID: Number;
        private viewID: Number;

        private static baseID: string;

        private static MAX_SLOTS: number = 2;
        private static lastSlot: number = Item.MAX_SLOTS - 1;
        private static itemSlotMap: string[] = [];

        constructor(props: any) {
            var props = props || {};
            this.name       = props.name;
            this.value      = props.item ;
            this.id         = props.id;
            this.sceneID    = props.sceneID;
            this.viewID     = props.viewID;
        }


        /** Prepare an item for manipulation */
        static attach(itemID: string, view: number): number {
            if (Environment.isScriptPlugin()) {
                return Item.cacheItemID(itemID);
            } else {
                return Item.cacheItemID(itemID, view);
            }
        }

        // returns 0-indexed slot where item ID is cached/attached
        private static cacheItemID(itemID: string, viewID?: number): number {
            let slot = Item.itemSlotMap.indexOf(itemID);
            if (slot === -1) {
                slot = ++Item.lastSlot % Item.MAX_SLOTS;
                Item.itemSlotMap[slot] = itemID;
                if (viewID === undefined) {
                    internal.exec('SearchVideoItem' +
                        (String(slot) === '0' ? '' : (slot + 1)),
                        itemID
                    );
                } else {
                    internal.exec('AttachVideoItem' +
                        (String(slot) === '0' ? '' : (slot + 1)),
                        itemID,
                        String(viewID)
                    );
                }
            }

            return slot;
        }

        /** Get an item's local property asynchronously */
        static get(name: string, slot: number = 0): Promise<string> {
            return new Promise((resolve) => {
                internal.exec('GetLocalPropertyAsync' +
                    (String(slot) === '0' ? '' : slot),
                    name,
                    (val) => {
                        resolve(val);
                    });
            });
        }

        /** Sets an item's local property */
        static set(name: string, value: string, slot: number = 0): void {
            if (slot === undefined) {
                slot = 0;
            }
            internal.exec('SetLocalPropertyAsync' +
                (String(slot) === '0' ? '' : slot),
                name,
                value);
        }

        /** Calls a function defined in an item/source */
        static callFunc(func: string, arg: string): void {
            internal.exec('CallInner', func, arg);
        }

        /** helper function to get current source on init */
        static setBaseID(id: string): void {
            Item.baseID = id;
        }

        /** helper function for Item.getCurrentSource() */
        static getBaseID(): string {
            return Item.baseID;
        }
    }
}

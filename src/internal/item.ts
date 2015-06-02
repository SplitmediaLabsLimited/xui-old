/// <reference path="_references.ts" />

module internal {
    export class Item {
        private name: string;
        private value: string;
        private id: string;
        private sceneID: Number;
        private viewID: Number;

        private static baseID: string;

        constructor(props: any) {
            var props = props || {};
            this.name       = props.name;
            this.value      = props.item ;
            this.id         = props.id;
            this.sceneID    = props.sceneID;
            this.viewID     = props.viewID;
        }


        /** Prepare an item for manipulation */
        static attach(itemID: string, view: number, slot?: number): void {
            if (Environment.isScriptPlugin()) {
                internal.exec('SearchVideoItem', itemID, String(view));
            } else {
                internal.exec('AttachVideoItem' +
                    (String(slot) === '2' ? '2' : ''),
                    itemID,
                    String(view));
            }
        }

        /** Get an item's local property asynchronously */
        static get(name: string, slot?: number): Promise<string> {
            return new Promise((resolve) => {
                internal.exec('GetLocalPropertyAsync' +
                    (String(slot) === '2' ? '2' : ''),
                    name,
                    (val) => {
                        resolve(val);
                    });
            });
        }

        /** Sets an item's local property */
        static set(name: string, value: string, slot?: number): void {
            internal.exec('SetLocalPropertyAsync' +
                (String(slot) === '2' ? '2' : ''),
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
    }
}

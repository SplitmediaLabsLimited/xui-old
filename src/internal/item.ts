/// <reference path="_references.ts" />

module internal {
    export class Item {
        /** Prepare an item for manipulation */
        static attach(itemID: string, view: string): void {
            internal.exec('SearchVideoItem', itemID, view);
        }

        /** Get an item's local property asynchronously */
        static get(name: string, slot?: string): Promise<string> {
            return new Promise((resolve) => {
                internal.exec('GetLocalPropertyAsync' +
                    (String(slot) === '1' ? '' : '2'),
                    name,
                    (val) => {
                        resolve(val);
                    });
            });
        }

        /** Sets an item's local property */
        static set(name: string, value: string, slot?: string): void {
            internal.exec('SetLocalPropertyAsync' +
                (String(slot) === '1' ? '' : '2'),
                name,
                value);
        }

        /** Calls a function defined in an item/source */
        static callFunc(func: string, arg: string): void {
            internal.exec('CallInner', func, arg);
        }
    }
}

/// <reference path="../_references.ts" />

module xui.core {
    import iApp  = internal.App;
    import iItem = internal.Item;
    import JSON  = internal.utils.JSON;
    import XML   = internal.utils.XML;
    import Color = internal.utils.Color;
    import Rectangle = internal.utils.Rectangle;

    export interface IItemBase {
        getName(): Promise<string>;
        setName(value: string);
        getValue(): Promise<JSON>;
        setValue(value: any);
        getKeepLoaded(): Promise<boolean>;
        setKeepLoaded(value: boolean);
        getType(): Promise<number>;
        getID(): Promise<string>;
        getSceneID(): Promise<number>;
        getViewID(): Promise<number>;
    }

    export class Item implements IItemBase, IItemLayout {
        private name: string;
        private id: string;
        private sceneID: number;
        private viewID: number;
        private type: number;
        private value: any;
        private customName: string;
        private keepLoaded: boolean;
        private position: Rectangle;

        // Item Types
        static TYPE_UNDEFINED: number  = 0;
        static TYPE_FILE: number       = 1;
        static TYPE_LIVE: number       = 2;
        static TYPE_TEXT: number       = 3;
        static TYPE_BITMAP: number     = 4;
        static TYPE_SCREEN: number     = 5;
        static TYPE_FLASHFILE: number  = 6;
        static TYPE_GAMESOURCE: number = 7;
        static TYPE_HTML: number       = 8;

        constructor(props?: {}) {
            this.id = props['id'];
            this.name = props['name'];
            this.sceneID = props['sceneID'];
            this.viewID = props['viewID'];
            this.type = props['type'];
            this.value = JSON.parse(props['value']);
            this.keepLoaded = props['position'];
        }

        /** Set name of the item */
        setName(value: string) {
            iItem.attach(this.id, this.viewID);

            this.name = value;

            iItem.set('prop:name', this.name);
        }

        /** Get the current name of the item */
        getName(): Promise<string> {
            return new Promise((resolve) => {
                iItem.attach(this.id, this.viewID);

                iItem.get('prop:name').then((val) => {
                    this.name = val;

                    resolve(val);
                });
            });
        }

        /** Get the video item's main definition */
        getValue(): Promise<JSON> {
            return new Promise((resolve) => {
                iItem.attach(this.id, this.viewID);

                iItem.get('prop:item').then((val) => {
                    val = (val === 'null') ? '' : val;
                    this.value = JSON.parse(val);

                    resolve(this.value);
                });
            });
        }

        /** Set the video item's main definition */
        setValue(value: any) {
            iItem.attach(this.id, this.viewID);

            var xml: string = (typeof value === 'string') ? 
                value : XML.parseJSON(value).toString();

            this.value = JSON.parse(xml);

            iItem.set('prop:item', xml);
        }

        /** Get Keep loaded option */
        getKeepLoaded(): Promise<boolean> {
            return new Promise((resolve) => {
                iItem.attach(this.id, this.viewID);

                iItem.get('prop:keeploaded').then((val) => {
                    this.keepLoaded = (val === '1');

                    resolve(this.keepLoaded);
                });
            });
        }

        /** Set Keep loaded option to ON or OFF */
        setKeepLoaded(value: boolean) {
            iItem.attach(this.id, this.viewID);

            this.keepLoaded = value;

            iItem.set('prop:keeploaded', this.keepLoaded ? '1' : '0');
        }

        /** Get the type of the item */
        getType(): Promise<number> {
            return new Promise((resolve) => {
                iItem.attach(this.id, this.viewID);

                iItem.get('prop:type').then((val) => {
                    this.type = Number(val);

                    resolve(Number(val));
                });
            });
        }

        /** Get Item ID */
        getID(): Promise<string> {
            return new Promise((resolve) => {
                iItem.attach(this.id, this.viewID);

                iItem.get('prop:id').then((val) => {
                    this.id = val;

                    resolve(this.id);
                });
            });
        }

        /** Get Scene ID where the item is loaded */
        getSceneID(): Promise<number> {
            return new Promise((resolve) => {
                resolve(this.sceneID);
            });
        }

        /** Get the View ID where the item is loaded */
        getViewID(): Promise<number> {
            return new Promise((resolve) => {
                resolve(this.viewID);
            });
        }

        /** Convert the Item object to XML */
        toXML(): XML {
            var item: JSON;

            item['tag'] = 'item';
            item['pos_left'] = this.position.getLeft() || 0.250000;
            item['pos_top'] = this.position.getTop() || 0.250000;
            item['pos_right'] = this.position.getRight() || 0.250000;
            item['pos_bottom'] = this.position.getBottom() || 0.250000;
            item['name'] = this.name;
            item['item'] = this.value;
            item['type'] = this.type;

            return XML.parseJSON(item);
        }

        // ItemLayout
        isKeepAspectRatio: () => Promise<boolean>;
        setKeepAspectRatio: () => void;
        isPositionLocked: () => Promise<boolean>;
        setPositionLocked: () => void;
        isEnhanceResizeEnabled: () => Promise<boolean>;
        setEnhanceResizeEnabled: () => void;
        isPixelAlignmentEnabled: () => Promise<boolean>;
        setPixelAlignmentEnabled: () => void;
        getPosition: () => Promise<Rectangle>;
        setPosition: () => void;
    }

    // Apply Mixins and combine it to Item class
    applyMixins(Item, [ItemLayout]);

    function applyMixins(derivedCtor: any, baseCtors: any[]) {
        baseCtors.forEach(baseCtor => {
            Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
                derivedCtor.prototype[name] = baseCtor.prototype[name];
            })
        }); 
    }
}
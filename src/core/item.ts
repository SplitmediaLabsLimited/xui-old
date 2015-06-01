/// <reference path="../_references.ts" />

module xui.core {
    import iApp  = internal.App;
    import iItem = internal.Item;
    import JSON  = internal.utils.JSON;
    import XML   = internal.utils.XML;
    import Color = internal.utils.Color;
    import Rectangle = internal.utils.Rectangle;

    export enum ITEM_TYPES {
        UNDEFINED,
        FILE,
        LIVE,
        TEXT,
        BITMAP,
        SCREEN,
        FLASHFILE,
        GAMESOURCE,
        HTML
    }

    export interface IItemBase {
        getName(): Promise<string>;
        setName(value: string);
        getValue(): Promise<JSON>;
        setValue(value: any);
        getKeepLoaded(): Promise<boolean>;
        setKeepLoaded(value: boolean);
        getType(): Promise<ITEM_TYPES>;
        getID(): Promise<string>;
        getSceneID(): Promise<number>;
        getViewID(): Promise<number>;
    }

    export class Item implements IItemBase,
                                 IItemLayout,
                                 IItemColor,
                                 IItemAudio,
                                 IItemWindow,
                                 IItemVideo,
                                 IItemChroma,
                                 IItemPlayback {
        private name: string;
        private id: string;
        private sceneID: number;
        private viewID: number;
        private type: ITEM_TYPES;
        private value: any;
        private customName: string;
        private keepLoaded: boolean;

        // Private variables won't work with mixins, we need this in ItemLayout
        position: Rectangle;

        /** Create Item class with all the sub classes */
        static create(props?: {}) {
            // When creating this damn thing, we'll need to merge other
            // sub classes to this giant pile of a poo
            applyMixins(Item, [
                ItemLayout,
                ItemColor,
                ItemAudio,
                ItemWindow,
                ItemVideo,
                ItemChroma,
                ItemPlayback
            ]);

            return new Item(props);
        }

        constructor(props?: {}) {
            Object.keys(props).forEach((val) => {
                if (this[val] !== undefined) {
                    this[val] = props[val];
                }
            });
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
        getType(): Promise<ITEM_TYPES> {
            return new Promise((resolve) => {
                iItem.attach(this.id, this.viewID);

                iItem.get('prop:type').then((val) => {
                    this.type = ITEM_TYPES[ITEM_TYPES[Number(val)]];

                    resolve(this.type);
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
        setKeepAspectRatio: (value: boolean) => void;
        isPositionLocked: () => Promise<boolean>;
        setPositionLocked: (value: boolean) => void;
        isEnhanceResizeEnabled: () => Promise<boolean>;
        setEnhanceResizeEnabled: (value: boolean) => void;
        isPixelAlignmentEnabled: () => Promise<boolean>;
        setPixelAlignmentEnabled: (value: boolean) => void;
        getPosition: () => Promise<Rectangle>;
        setPosition: (value: Rectangle) => void;

        // ItemColor
        getTransparency: () => Promise<number>;
        setTransparency: (value: number) => void;
        getBrightness: () => Promise<number>;
        setBrightness: (value: number) => void;
        getContrast: () => Promise<number>;
        setContrast: (value: number) => void;
        getHue: () => Promise<number>;
        setHue: (value: number) => void;
        getSaturation: () => Promise<number>;
        setSaturation: (value: number) => void;
        getBorderColor: () => Promise<Color>;
        setBorderColor: (value: Color) => void;

        // ItemAudio
        getVolume: () => Promise<number>;
        setVolume: (value: number) => void;
        isMuted: () => Promise<boolean>;
        setMuted: (value: boolean) => void;

        // ItemWindow
        isWindowTracking: () => Promise<boolean>;
        setWindowTracking: (value: boolean) => void;

        // ItemVideo
        getCuePoints: () => Promise<number[]>;

        // ItemChroma
        isChromaEnabled: () => Promise<boolean>;
        setChromaEnabled: (value: boolean) => void;
        getChromaBrightness: () => Promise<number>;
        setChromaBrightness: (value: number) => void;
        getChromaSaturation: () => Promise<number>;
        setChromaSaturation: (value: number) => void;
        getChromaHue: () => Promise<number>;
        setChromaHue: (value: number) => void;
        getChromaType: () => Promise<CHROMA_TYPE>;
        setChromaType: (value: CHROMA_TYPE) => void;
        getChromaColor: () => Promise<Color>;
        setChromaColor: (value: Color) => void;
        getChromaPrimaryColor: () => Promise<number>;
        setChromaPrimaryColor: (value: number) => void;
        getChromaBalance: () => Promise<number>;
        setChromaBalance: (value: number) => void;
        getChromaAntiAlias: () => Promise<number>;
        setChromaAntiAlias: (value: number) => void;
        getChromaThreshold: () => Promise<number>;
        setChromaThreshold: (value: number) => void;
        getChromaThresholdAA: () => Promise<number>;
        setChromaThresholdAA: (value: number) => void;

        // ItemPlayback
        getPlaybackStartPos: () => Promise<number>;
        setPlaybackStartPos: (value: number) => void;
        getPlaybackEndPos: () => Promise<number>;
        setPlaybackEndPos: (value: number) => void;
        getPlaybackEndAction: () => Promise<PLAYBACK_END_ACTION>;
        setPlaybackEndAction: (value: PLAYBACK_END_ACTION) => void;
        getPlaybackDuration: () => Promise<number>;
        setPlaybackDuration: (value: number) => void;
    }

    function applyMixins(derivedCtor: any, baseCtors: any[]) {
        baseCtors.forEach(baseCtor => {
            Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
                if (name === 'constructor') return;
                derivedCtor.prototype[name] = baseCtor.prototype[name];
            })
        });
    }
}
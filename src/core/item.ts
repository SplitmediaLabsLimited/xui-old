/// <reference path="../_references.ts" />

module xui.core {
    import iApp  = internal.App;
    import iItem = internal.Item;
    import JSON  = internal.utils.JSON;
    import XML   = internal.utils.XML;
    import Color = internal.utils.Color;
    import Rectangle = internal.utils.Rectangle;

    export enum ItemTypes {
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
        getValue(): Promise<string|XML>;
        setValue(value: string|XML);
        getKeepLoaded(): Promise<boolean>;
        setKeepLoaded(value: boolean);
        getType(): Promise<ItemTypes>;
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
        private type: ItemTypes;
        private value: any;
        private keepLoaded: boolean;
        private position: Rectangle;

        constructor(props?: {}) {
            props = props ? props : {};

            this.name = props['name'];
            this.id = props['id'];
            this.sceneID = props['sceneID'];
            this.viewID = props['viewID'];
            this.value = props['value'];
            this.keepLoaded = props['keeploaded'];
        }

        /** Set name of the item */
        setName(value: string) {
            let slot = iItem.attach(this.id, this.viewID);

            this.name = value;

            iItem.set('prop:name', this.name, slot);
        }

        /** Get the current name of the item */
        getName(): Promise<string> {
            return new Promise((resolve) => {
                let slot = iItem.attach(this.id, this.viewID);

                iItem.get('prop:name', slot).then((val) => {
                    this.name = val;

                    resolve(val);
                });
            });
        }

        /** Get the video item's main definition */
        getValue(): Promise<string|XML> {
            return new Promise((resolve) => {
                let slot = iItem.attach(this.id, this.viewID);

                iItem.get('prop:item', slot).then((val) => {
                    val = (val === 'null') ? '' : val;

                    if (val === '') { // don't return XML for null values
                        this.value = '';
                        resolve(val);
                    }

                    try {
                        this.value = XML.parseJSON(JSON.parse(val));
                        resolve(this.value);
                    } catch (e) {
                        // value is not JSON
                        this.value = val;
                        resolve(val);
                    }

                    resolve(this.value);
                });
            });
        }

        /** Set the video item's main definition */
        setValue(value: string | XML) {
            let slot = iItem.attach(this.id, this.viewID);

            var val: string = (typeof value === 'string') ? 
                <string> value : (<XML> value).toString();

            if (typeof value !== 'string') { // XML
                this.value = JSON.parse(val);
            }

            iItem.set('prop:item', val, slot);
        }

        /** Get Keep loaded option */
        getKeepLoaded(): Promise<boolean> {
            return new Promise((resolve) => {
                let slot = iItem.attach(this.id, this.viewID);

                iItem.get('prop:keeploaded', slot).then((val) => {
                    this.keepLoaded = (val === '1');

                    resolve(this.keepLoaded);
                });
            });
        }

        /** Set Keep loaded option to ON or OFF */
        setKeepLoaded(value: boolean) {
            let slot = iItem.attach(this.id, this.viewID);

            this.keepLoaded = value;

            iItem.set('prop:keeploaded', (this.keepLoaded ? '1' : '0'), slot);
        }

        /** Get the type of the item */
        getType(): Promise<ItemTypes> {
            return new Promise((resolve) => {
                let slot = iItem.attach(this.id, this.viewID);

                iItem.get('prop:type', slot).then((val) => {
                    this.type = ItemTypes[ItemTypes[Number(val)]];

                    resolve(this.type);
                });
            });
        }

        /** Get Item ID */
        getID(): Promise<string> {
            return new Promise((resolve) => {
                let slot = iItem.attach(this.id, this.viewID);

                iItem.get('prop:id', slot).then((val) => {
                    this.id = val;

                    resolve(this.id);
                });
            });
        }

        /** Get (1-indexed) Scene ID where the item is loaded */
        getSceneID(): Promise<number> {
            return new Promise((resolve) => {
                resolve(Number(this.sceneID) + 1);
            });
        }

        /** Get the View ID where the item is loaded */
        getViewID(): Promise<number> {
            return new Promise((resolve) => {
                let slot = iItem.attach(this.id, this.viewID);

                iItem.get('prop:viewid', slot).then((val) => {
                    this.viewID = Number(val);

                    resolve(this.viewID);
                });
            });
        }

        /** Convert the Item object to XML */
        toXML(): XML {
            var item: JSON = new JSON();

            item['tag'] = 'item';
            if (this.position === undefined) { // new items don't have positions
                item['pos_left'] = item['pos_top'] = 0.250000;
                item['pos_right'] = item['pos_bottom'] = 0.750000;
            } else {
                item['pos_left'] = this.position.getLeft() || 0.250000;
                item['pos_top'] = this.position.getTop() || 0.250000;
                item['pos_right'] = this.position.getRight() || 0.250000;
                item['pos_bottom'] = this.position.getBottom() || 0.250000;
            }
            item['name'] = this.name;
            item['item'] = this.value;
            item['type'] = this.type;

            return XML.parseJSON(item);
        }

        /** Get the current source (when called for sources), or the source that
         * was right-clicked to open the config window (when called from the
         * config window). */
        getCurrentSource(): Item {
            let item = new Item({
                id: iItem.getBaseID(),
                view: 0 // always MAIN
            });
            
            return item;
        }

        // ItemLayout
        
        /** Check if Aspect Ratio is set to ON or OFF */
        isKeepAspectRatio:        () => Promise<boolean>;

        /** Check if Position Locked is set to ON or OFF */
        isPositionLocked:         () => Promise<boolean>;

        /** Check if Enhance Resize is Enabled or Disabled */
        isEnhanceResizeEnabled:   () => Promise<boolean>;

        /** Check if Pixel Alignment is Enabled or Disabled */
        isPixelAlignmentEnabled:  () => Promise<boolean>;

        /** Get the position of the item */
        getPosition:              () => Promise<Rectangle>;

        /** Set Aspect Ratio to ON or OFF */
        setKeepAspectRatio:       (value: boolean) => void;

        /** Set Position Lock to ON or OFF */
        setPositionLocked:        (value: boolean) => void;

        /** Set Enhance Resize to ON or OFF */
        setEnhanceResizeEnabled:  (value: boolean) => void;

        /** Set Pixel Alignment to ON or OFF */
        setPixelAlignmentEnabled: (value: boolean) => void;

        /** Set Item position */
        setPosition:              (value: Rectangle) => void;


        // ItemColor
        
        /** Get Item Transparency value */
        getTransparency: () => Promise<number>;

        /** Get Item Brightness value */
        getBrightness:   () => Promise<number>;

        /** Get Item Contrast value */
        getContrast:     () => Promise<number>;

        /** Get Item Hue value */
        getHue:          () => Promise<number>;

        /** Get Item Saturation value */
        getSaturation:   () => Promise<number>;

        /** Get Border Color */
        getBorderColor:  () => Promise<Color>;

        /** Set Item Transparency */
        setTransparency: (value: number) => void;

        /** Set Item Brightness */
        setBrightness:   (value: number) => void;

        /** Set Item Contrast */
        setContrast:     (value: number) => void;

        /** Set Item Hue */
        setHue:          (value: number) => void;

        /** Set Item Saturation */
        setSaturation:   (value: number) => void;

        /** Set Border Color */
        setBorderColor:  (value: Color) => void;


        // ItemAudio
        
        /** Get Item Volume level */
        getVolume: () => Promise<number>;

        /** Check if item is muted */
        isMuted:   () => Promise<boolean>;

        /** Set Volume level of item */
        setVolume: (value: number) => void;

        /** Set Item Mute to ON or OFF */
        setMuted:  (value: boolean) => void;


        // ItemWindow

        /** Check if Window Tracking is ON or OFF */
        isWindowTracking:  () => Promise<boolean>;

        /** Set Window Tracking to ON or OFF */
        setWindowTracking: (value: boolean) => void;


        // ItemVideo

        /** Get Video item cuepoints */
        getCuePoints: () => Promise<number[]>;


        // ItemChroma

        /** Check if chroma is enabled or not */
        isChromaEnabled:       () => Promise<boolean>;

        /** Get Chroma brightness */
        getChromaBrightness:   () => Promise<number>;

        /** Get Chroma Saturation */
        getChromaSaturation:   () => Promise<number>;

        /** Get Chroma Hue */
        getChromaHue:          () => Promise<number>;

        /** Get Chroma Type */
        getChromaType:         () => Promise<ChromaTypes>;

        /** Get Chroma Color */
        getChromaColor:        () => Promise<Color>;

        /** Get Chroma Primary Color */
        getChromaPrimaryColor: () => Promise<ChromaPrimaryColors>;

        /** Get Chroma Balance */
        getChromaBalance:      () => Promise<number>;

        /** Get Chroma Anti Alias level */
        getChromaAntiAlias:    () => Promise<ChromaAntiAlias>;

        /** Get Chroma Threshold */
        getChromaThreshold:    () => Promise<number>;

        /** Get Chroma Threshold Anti Alias */
        getChromaThresholdAA:  () => Promise<number>;

        /** Set Chroma to ON or OFF */
        setChromaEnabled:      (value: boolean) => void;

        /** Set Chroma Brightness */
        setChromaBrightness:   (value: number) => void;

        /** Set Chroma Saturation */
        setChromaSaturation:   (value: number) => void;

        /** Set Chroma Hue */
        setChromaHue:          (value: number) => void;

        /** Set Chroma Type */
        setChromaType:         (value: ChromaTypes) => void;

        /** Set Chroma Color */
        setChromaColor:        (value: Color) => void;

        /** Set Chroma Primary Color */
        setChromaPrimaryColor: (value: ChromaPrimaryColors) => void;

        /** Set Chroma Balance */
        setChromaBalance:      (value: number) => void;

        /** Set Chroma Anti Alias level */
        setChromaAntiAlias:    (value: ChromaAntiAlias) => void;

        /** Set Chroma Threshold */
        setChromaThreshold:    (value: number) => void;

        /** Set Chroma Threshold Anti Alias */
        setChromaThresholdAA:  (value: number) => void;


        // ItemPlayback

        /** Get Playback Starting position */
        getPlaybackStartPos:  () => Promise<number>;

        /** Get Playback Ending position */
        getPlaybackEndPos:    () => Promise<number>;

        /** Get Playback Ending action */
        getPlaybackEndAction: () => Promise<PlaybackEndAction>;

        /** Get Playback Duration */
        getPlaybackDuration:  () => Promise<number>;

        /** Set Playback Starting position */
        setPlaybackStartPos:  (value: number) => void;

        /** Set Playback Ending position */
        setPlaybackEndPos:    (value: number) => void;

        /** Set Playback Ending action */
        setPlaybackEndAction: (value: PlaybackEndAction) => void;

        /** Set Playback Duration */
        setPlaybackDuration:  (value: number) => void;
    }
}

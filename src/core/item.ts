/// <reference path="../_references.ts" />

module xui.core {
    import iApp  = internal.App;
    import iItem = internal.Item;
    import JSON  = internal.utils.JSON;
    import XML   = internal.utils.XML;
    import Color = internal.utils.Color;
    import Rectangle = internal.utils.Rectangle;

    export interface IItem {
        name: string;
        id: string;
        sceneID: number;
        viewID: number;
        type: number;
        value: any;
        trackTitle: boolean;
        volume: number;
        transparency: number;
        borderColor: Color;
        brightness: number;
        constrast: number;
        hue: number;
        saturation: number;
        customName: string;
        cuepoints: number[];
        keepAspectRatio: boolean;
        positionLocked: boolean;
        enhanceResizeEnabled: boolean;
        mute: boolean;
        pixelAlignmentEnabled: boolean;
        position: Rectangle;
        keepLoaded: boolean;
    }

    export class Item implements IItem {
        name: string;
        id: string;
        sceneID: number;
        viewID: number;
        type: number;
        value: any;
        trackTitle: boolean;
        volume: number;
        transparency: number;
        borderColor: Color;
        brightness: number;
        constrast: number;
        hue: number;
        saturation: number;
        customName: string;
        cuepoints: number[];
        keepAspectRatio: boolean;
        positionLocked: boolean;
        enhanceResizeEnabled: boolean;
        mute: boolean;
        pixelAlignmentEnabled: boolean;
        position: Rectangle;
        keepLoaded: boolean;

        constructor(props: IItem) {
            this.id = props.id;
            this.name = props.name;
            this.sceneID = props.sceneID;
            this.viewID = props.viewID;
            this.type = props.type;
            this.trackTitle = props.trackTitle;
            this.volume = props.volume;
            this.value = JSON.parse(props.value);
        }

        /** Set name of the item */
        setName(value: string): void {
            iItem.attach(this.id, this.viewID);

            this.name = value;

            iItem.set('prop:name', this.name);
        }

        /** Get the current name of the item */
        getName(): Promise<string> {
            var _item: IItem = this;

            return new Promise((resolve) => {
                iItem.attach(_item.id, _item.viewID);

                iItem.get('prop:name').then((val) => {
                    _item.name = val;

                    resolve(val);
                });
            });
        }

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

        /** Get the type of the item */
        getType(): Promise<number> {
            var _item: IItem = this;

            return new Promise((resolve) => {
                iItem.attach(_item.id, _item.viewID);

                iItem.get('prop:type').then((val) => {
                    _item.type = Number(val);

                    resolve(Number(val));
                });
            });
        }

        /** Set the video item's main definition */
        setValue(value: any): void {
            iItem.attach(this.id, this.viewID);

            var xml: string = (typeof value === 'string') ? 
                value : XML.parseJSON(value).toString();

            this.value = JSON.parse(xml);

            iItem.set('prop:item', xml);
        }

        /** Get the video item's main definition */
        getValue(): Promise<JSON> {
            var _item: IItem = this;

            return new Promise((resolve) => {
                iItem.attach(_item.id, _item.viewID);

                iItem.get('prop:item').then((val) => {
                    val = (val === 'null') ? '' : val;
                    _item.value = JSON.parse(val);

                    resolve(_item.value);
                });
            });
        }

        /** Set Track Window Title to ON or OFF */
        setTrackTitle(value: boolean): void {
            iItem.attach(this.id, this.viewID);

            this.trackTitle = value;

            iItem.set('prop:ScrCapTrackWindowTitle', (value ? '0' : '1'));
        }

        /** Check if Track Window Title is set to ON or OFF */
        getTrackTitle(): Promise<boolean> {
            var _item: IItem = this;

            return new Promise((resolve) => {
                iItem.attach(_item.id, _item.viewID);

                iItem.get('prop:ScrCapTrackWindowTitle').then((val) => {
                    _item.trackTitle = (val === '0') ? true : false;

                    resolve(_item.trackTitle);
                });
            });
        }

        /** Set the Volume of the item */
        setVolume(value: number): void {
            iItem.attach(this.id, this.viewID);

            this.volume = value < 0 ? 0 : value > 100 ? 100: value;

            iItem.set('prop:volume', String(this.volume));
        }

        /** Get the Volume of the item */
        getVolume(): Promise<number> {
            var _item: IItem = this;

            return new Promise((resolve) => {
                iItem.attach(_item.id, _item.viewID);

                iItem.get('prop:volume').then((val) => {
                    _item.volume = Number(val);

                    resolve(_item.volume);
                });
            });
        }

        /** Set the transparency of the item */
        setTransparency(value: number): void {
            iItem.attach(this.id, this.viewID);

            this.transparency = value < 0 ? 0 : value > 255 ? 255 : value;

            iItem.set('prop:alpha', String(this.transparency));
        }

        /** Get the transparency of the item */
        getTransparency(): Promise<number> {
            var _item: IItem = this;

            return new Promise((resolve) => {
                iItem.attach(_item.id, _item.viewID);

                iItem.get('prop:alpha').then((val) => {
                    _item.transparency = Number(val);

                    resolve(_item.transparency);
                });
            });
        }

        /** Set the border color of the item */
        setBorderColor(value: Color): void {
            iItem.attach(this.id, this.viewID);

            this.borderColor = value;

            iItem.set('prop:border', String(value.getIbgr() - 0x80000000));
        }

        /** Get the border color of the item */
        getBorderColor(): Promise<Color> {
            var _item: IItem = this;

            return new Promise((resolve) => {
                iItem.attach(_item.id, _item.viewID);

                iItem.get('prop:border').then((val) => {
                    var bgr: number = Number(val) - 0x80000000;

                    _item.borderColor = new Color();
                    _item.borderColor.setIbgr(bgr);

                    resolve(_item.borderColor);
                });
            });
        }

        /** Set the brightness of the item */
        setBrightness(value: number): void {
            iItem.attach(this.id, this.viewID);

            this.brightness = value < -100 ? -100 : value > 100 ? 100 : value;

            iItem.set('prop:cc_brightness', String(this.brightness));
        }

        /** Get the brightness */
        getBrightness(): Promise<number> {
            var _item: IItem = this;

            return new Promise((resolve) => {
                iItem.attach(_item.id, _item.viewID);

                iItem.get('prop:cc_brightness').then((val) => {
                    _item.brightness = Number(val);

                    resolve(_item.brightness);
                });
            });
        }

        /** Set the contrast of the item */
        setContrast(value: number): void {
            iItem.attach(this.id, this.viewID);

            this.constrast = value < -100 ? -100 : value > 100 ? 100 : value;

            iItem.set('prop:cc_contrast', String(this.constrast));
        }

        /** Get the contrast of the item */
        getContrast(): Promise<number> {
            var _item: IItem = this;

            return new Promise((resolve) => {
                iItem.attach(_item.id, _item.viewID);

                iItem.get('prop:cc_contrast').then((val) => {
                    _item.constrast = Number(val);

                    resolve(_item.constrast);
                });
            });
        }

        /** Set the hue of the item */
        setHue(value: number): void {
            iItem.attach(this.id, this.viewID);

            this.hue = value < -180 ? -180 : value > 180 ? 180 : value;

            iItem.set('prop:cc_hue', String(this.hue));
        }

        /** Get the hue of the item */
        getHue(): Promise<number> {
            var _item: IItem = this;

            return new Promise((resolve) => {
                iItem.attach(_item.id, _item.viewID);

                iItem.get('prop:cc_hue').then((val) => {
                    _item.hue = Number(val);

                    resolve(_item.hue);
                });
            });
        }

        /** Set the saturation of the item */
        setSaturation(value: number): void {
            iItem.attach(this.id, this.viewID);

            this.saturation = value < - 100 ? -100 : value > 100 ? 100 : value;

            iItem.set('prop:cc_saturation', String(this.saturation));
        }

        /** Get the saturation of the item */
        getSaturation(): Promise<number> {
            var _item: IItem = this;

            return new Promise((resolve) => {
                iItem.attach(_item.id, _item.viewID);

                iItem.get('prop:cc_saturation').then((val) => {
                    _item.saturation = Number(val);

                    resolve(_item.saturation);
                });
            });
        }

        /** Set the custom name of the item */
        setCustomName(value: string): void {
            iItem.attach(this.id, this.viewID);

            this.customName = value;

            iItem.set('prop:cname', this.customName);
        }

        /** Get the custom name of the item */
        getCustomName(): Promise<string> {
            var _item: IItem = this;

            return new Promise((resolve) => {
                iItem.attach(_item.id, _item.viewID);

                iItem.get('prop:cname').then((val) => {
                    _item.customName = val;

                    resolve(_item.customName);
                });
            });
        }

        /** Set the cue points of the item */
        setCuePoints(values: number[]): void {
            iItem.attach(this.id, this.viewID);

            // Reset saved cuepoints
            this.cuepoints = [];

            for (var i: number = 0; i < values.length; i++) {
                this.cuepoints.push(values[i] * 10);
            }

            iItem.set('prop:CuePoints', this.cuepoints.join(','));
        }

        /** Get the cue points of the item */
        getCuePoints(): Promise<number[]> {
            var _item: IItem = this;

            return new Promise((resolve) => {
                iItem.attach(_item.id, _item.viewID);

                iItem.get('prop:CuePoints').then((val) => {
                    var cuepoints: string[] = [];

                    // Reset the saved cuepoints... again
                    _item.cuepoints = [];

                    cuepoints = val.split(',');

                    for (var i: number = 0; i < cuepoints.length; i++) {
                        _item.cuepoints.push(Number(cuepoints[i]) / 10);
                    }

                    resolve(_item.cuepoints);
                });
            });
        }

        /** Set Keep aspect ratio to ON or OFF */
        setKeepAspectRatio(value: boolean): void {
            iItem.attach(this.id, this.viewID);

            this.keepAspectRatio = value;

            iItem.set('prop:keep_ar', this.keepAspectRatio ? '1' : '0');
        }

        /** Set Position lock to ON or OFF */
        setPositionLocked(value: boolean): void {
            iItem.attach(this.id, this.viewID);

            this.positionLocked = value;

            iItem.set('prop:lockmove', this.positionLocked ? '1' : '0');
        }

        /** Check if position is locked or not */
        isPositionLocked(): Promise<boolean> {
            var _item: IItem = this;

            return new Promise((resolve) => {
                iItem.attach(_item.id, _item.viewID);

                iItem.get('prop:lockmove').then((val) => {
                    _item.positionLocked = (val === '1');

                    resolve(_item.positionLocked);
                });
            });
        }

        /** Set Enhanced Resize to ON or OFF */
        setEnhancedResizeEnabled(value: boolean): void {
            iItem.attach(this.id, this.viewID);

            this.enhanceResizeEnabled = value;

            iItem.set('prop:mipmaps', this.enhanceResizeEnabled ? '1' : '0');
        }

        /** Check if Enhanced Resize is enabled or not */
        isEnhancedResizeEnabled(): Promise<boolean> {
            var _item: IItem = this;

            return new Promise((resolve) => {
                iItem.attach(_item.id, _item.viewID);

                iItem.get('prop:mipmaps').then((val) => {
                    _item.enhanceResizeEnabled = (val === '1');

                    resolve(_item.enhanceResizeEnabled);
                });
            });
        }

        /** Set Mute to ON or OFF */
        setMute(value: boolean): void {
            iItem.attach(this.id, this.viewID);

            this.mute = value;

            iItem.set('prop:mute', this.mute ? '1' : '0');
        }

        /** Check if Mute is enabled or not */
        isMute(): Promise<boolean> {
            var _item: IItem = this;

            return new Promise((resolve) => {
                iItem.attach(_item.id, _item.viewID);

                iItem.get('prop:mute').then((val) => {
                    _item.mute = (val === '1');

                    resolve(_item.mute);
                });
            });
        }

        /** Set Pixel Alignment to ON or OFF */
        setPixelAlignmentEnabled(value: boolean): void {
            iItem.attach(this.id, this.viewID);

            this.pixelAlignmentEnabled = value;

            iItem.set('prop:pixalign', this.pixelAlignmentEnabled ? '1' : '0');
        }

        /** Check if Pixel Alignment is enabled or not */
        isPixelAlignmentEnabled(): Promise<boolean> {
            var _item: IItem = this;

            return new Promise((resolve) => {
                iItem.attach(_item.id, _item.viewID);

                iItem.get('prop:pixalign').then((val) => {
                    _item.pixelAlignmentEnabled = (val === '1');

                    resolve(_item.pixelAlignmentEnabled);
                });
            });
        }

        /** Set the position of the item */
        setPosition(value: Rectangle): void {
            iItem.attach(this.id, this.viewID);

            this.position = value;

            iItem.set('prop:pos', this.position.toString());
        }

        /** Get the position of the item */
        getPosition(): Promise<Rectangle> {
            var _item: IItem = this;

            return new Promise((resolve) => {
                iItem.attach(_item.id, _item.viewID);

                iItem.get('prop:pos').then((val) => {
                    _item.position = Rectangle.parse(val);

                    resolve(_item.position);
                });
            });
        }

        /** Crop the item */
        crop(value: Rectangle): void {
            iItem.attach(this.id, this.viewID);

            iItem.set('prop:crop', value.toString());
        }

        /** Set Keep loaded option to ON or OFF */
        setKeepLoaded(value: boolean): void {
            iItem.attach(this.id, this.viewID);

            this.keepLoaded = value;

            iItem.set('prop:keeploaded', this.keepLoaded ? '1' : '0');
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
    }
}
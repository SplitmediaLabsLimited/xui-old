/// <reference path="../_references.ts" />

module xui.system {

    import Rectangle = internal.utils.Rectangle;
    import JSON = internal.utils.JSON;
    import XML = internal.utils.XML;

    export class ScreenRegion {
        private bounds: Rectangle;

        constructor(bounds ?: Rectangle) {
            this.bounds = bounds;
        }

        needsSelector(): boolean {
            return this.bounds === undefined;
        }

        isRegion(): boolean {
            return this.bounds !== undefined;
        }

        static regionSelect() {
            return new ScreenRegion();
        }

        /** Creates screen region using left, top, width, and height. */
        static fromRectangle(left: number,
                top: number,
                width: number,
                height: number) {
            let rect = Rectangle.parse(top + ',' + left + ',' + (left + width) +
             ',' + (top + height));
            return new ScreenRegion(rect);
        }

        toXML(): XML {
            var item: JSON = new JSON();

            item['tag'] = 'screen';
            item['module'] = '';
            item['window'] = '';
            item['hwnd'] = '';
            item['wclient'] = '0';
            if (this.isRegion()) {
                item['left'] = this.bounds.getLeft();
                item['top'] = this.bounds.getTop();
                item['width'] = this.bounds.getRight() - this.bounds.getLeft();
                item['height'] = this.bounds.getBottom() - this.bounds.getTop();
            }

            return XML.parseJSON(item);
        }
    }
}

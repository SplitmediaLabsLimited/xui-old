/// <reference path="../_references.ts" />

module xui.system {

    import Window = xui.system.Window;
    import Rectangle = internal.utils.Rectangle;
    import JSON = internal.utils.JSON;
    import XML = internal.utils.XML;

    export class File {
        private file: string;
        constructor(file: string) {
            this.file = file;
        }
        toString(): string {
            return this.file;
        }
    }

    export class URL {
        private url: string;
        constructor(url: string) {
            this.url = url;
        }
        toString(): string {
            return this.url;
        }
    }

    export class ScreenRegion {
        private window: Window;
        private bounds: Rectangle;

        constructor(window ?: Window, bounds ?: Rectangle) {
            this.window = window;
            this.bounds = bounds;
        }

        needsSelector(): boolean {
            return this.window === undefined && this.bounds === undefined;
        }

        isWindow(): boolean {
            return this.window !== undefined;
        }

        isRegion(): boolean {
            return this.bounds !== undefined;
        }

        static regionSelect() {
            return new ScreenRegion();
        }

        /** Creates screen region using left, top, right, and bottom coords. */
        static fromRectangle(left: number,
                top: number,
                right: number,
                bottom: number) {
            let rect = Rectangle.parse(top + ',' + left + ',' + right + ',' +
                bottom);
            return new ScreenRegion(undefined, rect);
        }

        static fromWindow(window: Window) {
            return new ScreenRegion(window);
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

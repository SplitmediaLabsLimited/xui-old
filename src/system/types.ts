/// <reference path="../_references.ts" />

module xui.system {

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
}

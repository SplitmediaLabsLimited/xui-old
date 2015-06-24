/// <reference path="../_references.ts" />

module xui.system {

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

    export class Screen {
    }
}

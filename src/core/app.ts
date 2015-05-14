/// <reference path="../_references.ts" />

module core {
    export class App {
        /** Call method of DLL present in Scriptdlls folder */
        static callDll(): string {
            return internal.App.callDll.apply(this, arguments);
        }

        /** Gets application's frame time (duration per frame in 100ns unit) */
        static getFrametime(): Promise<string> {
            return new Promise((resolve) => {
                resolve(internal.App.get('frametime'));
            });
        }
    }
}

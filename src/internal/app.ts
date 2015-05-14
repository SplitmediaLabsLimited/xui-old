/// <reference path="_references.ts" />

module internal {
    import u = internal.utils;

    export class App {
        static POSTMESSAGE_CLOSE: string = '1';
        static POSTMESSAGE_SIZE: string = '2';

        /** Get the value of the given property */
        static get(name: string): Promise<string> {
            return new Promise((resolve) => {
                internal.exec('AppGetPropertyAsync', name, resolve);
            });    
        }

        /** Gets the value of the given property as list */
        static getAsList(name: string): Promise<u.JSON[]> {
            return new Promise((resolve) => {
                App.get(name).then((xml: string) => {
                    let propsJSON: u.JSON = u.JSON.parse(xml),
                        propsArr: u.JSON[] = [];
                    
                    if (propsJSON.children.length > 0) {
                        propsArr = propsJSON.children;
                    }
                    
                    resolve(propsArr);
                });
            });
        }

        /** Get the value of the given global property */
        static getGlobalProperty(name: string): string {
            return internal.exec('GetGlobalProperty', name);
        }

        /** Calls a DLL function synchronously */
        static callDll(): string {
            var args: any[] = [].slice.call(arguments);
            args.unshift('CallDll');
            return internal.exec.apply(this, args);
        }
    }
}

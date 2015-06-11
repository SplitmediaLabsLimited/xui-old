/// <reference path="_references.ts" />

module internal {
    import u = internal.utils;

    export class App {
        static POSTMESSAGE_CLOSE: string = '1';
        static POSTMESSAGE_SIZE: string = '2';

        /** Get the value of the given property */
        static get(name: string, isLocal?: boolean): Promise<string> {
            return new Promise((resolve) => {
                if (isLocal) {
                    internal.exec('GetLocalPropertyAsync', name, resolve);
                } else {
                    internal.exec('AppGetPropertyAsync', name, resolve);
                }
            });    
        }

        /** Gets the value of the given property as list */
        static getAsList(name: string): Promise<u.JSON[]> {
            return new Promise((resolve) => {
                App.get(name).then((xml: string) => {
                    let propsJSON: u.JSON = u.JSON.parse(xml),
                        propsArr: u.JSON[] = [];
                    
                    if (propsJSON.children && propsJSON.children.length > 0) {
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

        /** Sets the value of a property */
        static set(name: string, value: string): Promise<Boolean> {
            return new Promise((resolve) => {
                internal.exec('AppSetPropertyAsync', name, value, (ret) => {
                    resolve(ret === "0" ? false : true);
                });
            });
        }

        /** Calls a DLL function synchronously */
        static callDll(func: string, ...arg: string[]): string {
            var args: any[] = [].slice.call(arguments);
            args.unshift('CallDll');
            return internal.exec.apply(this, args);
        }

        /** Calls an application method asynchronously */
        static callFunc(func: string, arg: string): Promise<string> {
            return new Promise((resolve) => {
                internal.exec('AppCallFuncAsync', func, arg, (ret) => {
                    resolve(ret);
                });
            });
        }

        static postMessage(key: string, ...args: any[]): Promise<string> {
            return new Promise((resolve) => {
                args.unshift(key);
                args.unshift('PostMessageToParent');
                args.push((val) => {
                    resolve(val);
                });
                internal.exec.apply(this, args);
            });
        }
    }
}

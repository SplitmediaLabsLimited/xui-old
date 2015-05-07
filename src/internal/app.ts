/// <reference path="_references.ts" />

module internal {
    export class App {
        static POSTMESSAGE_CLOSE: string = '1';
        static POSTMESSAGE_SIZE: string = '2';

        /**
         * Get the value of the given property
         */
        static get(name: string, callback: Function): void {
            internal.exec('AppGetPropertyAsync', name, callback);
        }

        static getAsList(name: string, callback: Function): void {
            /*App.get(name, (xml: string) => {
                let devicesJSON = xui.utils.XML.toJSON(xml);
                
                if (!devicesJSON)
                {
                    internal.execCallback.call(this, _callback, []);
                    return false;
                }
                
                devicesJSON = devicesJSON[0].children;
                
                internal.execCallback.call(this, _callback, devicesJSON);
            });    */
        }

        /**
         * Get the value of the given global property
         */
        static getGlobalProperty(name: string): any {
            return internal.exec('GetGlobalProperty', name);
        }




    }
}
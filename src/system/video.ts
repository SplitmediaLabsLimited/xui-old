/// <reference path="../_references.ts" />

module xui.system {

    import JSON =  internal.utils.JSON;
    import XML =  internal.utils.XML;
    import App  = internal.App;

    export class VideoDevice {
        private name;
        private disp;

        constructor(props?: {}) {
            props = props || {};

            this.name = props['name'];
            this.disp = props['disp'];
        }

        parse(deviceJSON: JSON): VideoDevice {
            var vid = new VideoDevice({
                name: deviceJSON['name'],
                disp: deviceJSON['disp']
            });

            return vid;
        }

        toXML(): XML {
            var xml = new JSON();
            xml['tag'] = 'dev';
            xml['name'] = this.name;
            xml['disp'] = this.disp;
            return XML.parseJSON(xml);
        }
    }
}

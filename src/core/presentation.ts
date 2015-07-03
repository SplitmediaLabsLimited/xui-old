/// <reference path="../_references.ts" />

module xui.core {
    import iApp = internal.App;
    import View = xui.core.View;
    import Scene = xui.core.Scene;
    import JSON = internal.utils.JSON;
    import XML = internal.utils.XML;

    export class Presentation {

        private currentScene: Scene;
        private version: string;
        private sceneDetails: Scene[];
        private global: JSON;

        constructor(props: {}) {
            this.currentScene = new Scene({
                id: props['currentScene'],
                viewID: 1
            });
            this.version = props['version'];
            this.sceneDetails = props['placements'];
            this.global = props['global'];
        }

        toXML(): XML {
            let xml = new JSON();
            xml['tag'] = 'configuration';
            xml['cur'] = this.currentScene.getID();
            xml['Version'] = this.version;
            xml['children'] = [];

            for (var i = 0; i < this.sceneDetails.length; i++) {
                let scene = this.sceneDetails[i];
                let sceneNode: any = {};
                sceneNode['tag'] = 'placement';
                sceneNode['name'] = this.sceneDetails[i]['name'];
                sceneNode['defpos'] = this.sceneDetails[i]['defpos'];

                let sceneItems = this.sceneDetails[i]['items'];

                for (var j = 0; j < sceneItems.length; j++) {
                    let item = sceneItems[j]['item'];
                    if (item !== undefined) {
                        sceneItems[j]['item'] = XML.encode(item);
                    }
                    sceneItems[j]['name'] = XML.encode(sceneItems[j]['name']);
                }

                sceneNode['children'] = sceneItems;
                xml['children'].push(sceneNode);
            }

            let globalNode: any = {};
            globalNode['tag'] = 'global';
            let globalItems = this.global['children'];

            if (globalItems !== undefined) {
                for (var k = 0; k < globalItems['length']; k++) {
                    globalItems[k]['id'] = XML.encode(globalItems[k]['id']);
                }

                globalNode['children'] = globalItems;
                xml['children'].push(globalNode);
            }

            return XML.parseJSON(xml);
        }
    }


}

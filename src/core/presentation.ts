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
                viewID: '1'
            });
            this.version = props['version'];
            this.sceneDetails = props['placements'];
            this.global = props['global'];
        }

        toXML() {
            
        }
    }


}

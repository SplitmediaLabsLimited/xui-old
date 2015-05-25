/// <reference path="../_references.ts" />

module xui.system {

    import Rectangle   =  internal.utils.Rectangle;
    import JSON = internal.utils.JSON;
    import XML = internal.utils.XML;

    export class Game {

        private pid: Number;
        private handle: Number;
        private hwnd: Number;
        private gapitype: string;
        private width: Number;
        private height: Number;
        private flags: string;
        private wndname: string;
        private lastframets: Number;

        /**
         * Gets the game's process ID.
         */
        getPid() {
            return this.pid;
        }

        /**
         * Gets the Graphics API handle.
         */
        getHandle() {
            return this.handle;
        }

        /**
         * Gets the window handle.
         */
        getWindowHandle() {
            return this.hwnd;
        }

        /**
         * Gets the Graphics API type. Possible values:
         * OGL, DX8, DX8_SwapChain, DX9, DX9Ex, DX9_SwapChain,
         * DX9_PresentEx, DX10, DX11, DX11.1, DX11.1_Present1
         */
        getGapiType() {
            return this.gapitype;
        }

        /**
         * Gets game resolution.
         */
        getResolution(): Rectangle {
            return Rectangle.parse(this.width + ',' + this.height);
        }

        /**
         * Returns game-specific flags. 1 for exclusive full screen, 0 otherwise
         */
        getFlags(): string {
            return this.flags;
        }

        /**
         * Gets window title.
         */
        getWindowName() {
            return this.wndname;
        }

        /**
         * Gets timestamp of last frame in milliseconds.
         */
        getLastFrameTimestamp() {
            return this.lastframets;
        }
        
        static parse(json: JSON): Game {
            var g = new Game();

            g.pid = json['pid'] !== undefined ? parseInt(json['pid']) :
                undefined;
            g.handle = json['handle'] !== undefined ? parseInt(json['handle']) :
                undefined;
            g.hwnd = json['hwnd'] !== undefined ? parseInt(json['hwnd']) :
                undefined;
            g.gapitype = json['gapitype'];
            g.width = json['width'] !== undefined ? parseInt(json['width']) :
                undefined;
            g.height = json['height'] !== undefined ? parseInt(json['height']) :
                undefined;
            g.flags = json['flags'];
            g.wndname = json['wndname'];
            g.lastframets = json['lastframets'] !== undefined ?
                parseInt(json['lastframets']) : undefined;

            return g;
        }

        toXML() : XML {
            var gamesource = new JSON();

            gamesource.tag = 'src';
            gamesource['pid'] = this.pid;
            gamesource['handle'] = this.handle;
            gamesource['hwnd'] = this.hwnd;
            gamesource['gapitype'] = this.gapitype;
            gamesource['width'] = this.width;
            gamesource['height'] = this.height;
            gamesource['flags'] = this.flags;
            gamesource['wndname'] = this.wndname;
            gamesource['lastframets'] = this.lastframets;

            return XML.parseJSON(gamesource);
        }
    }
}

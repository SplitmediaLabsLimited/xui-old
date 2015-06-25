/// <reference path="_references.ts" />

interface Window {
    OnAsyncCallback: Function;
    OnSceneLoad: Function;
    SetConfiguration: Function;
    SetBackGroundColor: Function;
    SetVolume: Function;
    OnDialogResult: Function;
}

module internal {
    let _callbacks = {};

    export var DEBUG: boolean = false;

    /**
     * Executes an external function
     */
    export function exec(funcName: string, ...args: any[]) {
        let callback: Function = null,
            ret: any = false;

        if (args.length > 0) {
            callback = args[args.length - 1];

            if (callback instanceof Function) {
                args.pop();
            }
            else {
                callback = null;
            }
        }

        // BEGIN DEBUG
        if (internal.DEBUG) {
            console.log([
                'internal.exec("', funcName, '") ', JSON.stringify(args)
            ].join(' '));
        }
        // END DEBUG

        if (
            window.external && 
            window.external[funcName] &&
            window.external[funcName] instanceof Function
        ) {
            ret = window.external[funcName].apply(this, args);
        }
        
        // register callback if present
        if (callback !== null) {
            _callbacks[ret] = callback;
        }
        
        return ret;
    }

    /**
     * Triggered when an async method is called, 
     * asyncID is returned value in async method call 
     * and result is real return value for method call.
     */
    window.OnAsyncCallback = function(asyncID: number, result: string) {
        let callback = _callbacks[asyncID];

        if (callback instanceof Function) {
            callback.call(this, decodeURIComponent(result));
        }
    };

    /**
     * Triggered when scene changes for any view
     */
    window.OnSceneLoad = function(view: number, scene: number) {
        document.dispatchEvent(new CustomEvent(
            'scene-load', { detail: { view: view, scene: scene } }
        ));
    };


    /**
     * Triggered when configuration window sets Browser Configuration.
     * Used only by source plugins.
     */
    window.SetConfiguration = function(config: string) {
        document.dispatchEvent(new CustomEvent(
            'set-configuration', { config: config }
        ));
    };

    /**
     * Triggered when configuration window sets background color.
     * Used only by source plugins.
     */
    window.SetBackGroundColor = function(color: string) {
        document.dispatchEvent(new CustomEvent(
            'set-background-color', { color: color }
        ));
    };

    /**
     * Triggered when configuration window sets volume.
     * Used only by source plugins.
     */
    window.SetVolume = function(volume: string) {
        document.dispatchEvent(new CustomEvent(
            'set-volume', { volume: volume }
        ));
    };

    /**
     * Triggered when modal dialog calls SetDialogResult
     */
    window.OnDialogResult = function(result: string) {
        document.dispatchEvent(new CustomEvent(
            'dialog-result', { detail: { result: result } }
        ));
    };
}

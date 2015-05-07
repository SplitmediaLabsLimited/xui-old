/// <reference path="_references.ts" />
var internal;
(function (internal) {
    var App = (function () {
        function App() {
        }
        /**
         * Get the value of the given property
         */
        App.get = function (name, callback) {
            internal.exec('AppGetPropertyAsync', name, callback);
        };
        App.getAsList = function (name, callback) {
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
        };
        /**
         * Get the value of the given global property
         */
        App.getGlobalProperty = function (name) {
            return internal.exec('GetGlobalProperty', name);
        };
        App.POSTMESSAGE_CLOSE = '1';
        App.POSTMESSAGE_SIZE = '2';
        return App;
    })();
    internal.App = App;
})(internal || (internal = {}));
/// <reference path="_references.ts" />
var internal;
(function (internal) {
    var Item = (function () {
        function Item() {
        }
        return Item;
    })();
    internal.Item = Item;
})(internal || (internal = {}));
/// <reference path="../_references.ts" />
var internal;
(function (internal) {
    var utils;
    (function (utils) {
        var Color = (function () {
            /** Creates a Color class */
            function Color(props) {
                if (props.rgb)
                    this.setRgb(props.rgb);
                if (props.irgb)
                    this.setIrgb(props.irgb);
                if (props.bgr)
                    this.setBgr(props.bgr);
                if (props.ibgr)
                    this.setIbgr(props.ibgr);
            }
            /** Gets RGB value */
            Color.prototype.getRgb = function () {
                return this.rgb;
            };
            /** Sets RGB value */
            Color.prototype.setRgb = function (rgb) {
                this.rgb = rgb.replace(/^#/, '');
                this.irgb = parseInt(this.rgb, 16);
                this.bgr = [this.rgb.substring(4, 6), this.rgb.substring(2, 4),
                    this.rgb.substring(0, 2)].join('');
                this.ibgr = parseInt(this.bgr, 16);
            };
            /** Gets BGR value */
            Color.prototype.getBgr = function () {
                return this.bgr;
            };
            /** Sets BGR value */
            Color.prototype.setBgr = function (bgr) {
                this.setRgb([bgr.substring(4, 6), bgr.substring(2, 4),
                    bgr.substring(0, 2)
                ].join(''));
            };
            /** Gets RGB decimal value */
            Color.prototype.getIrgb = function () {
                return this.irgb;
            };
            /** Sets RGB decimal value */
            Color.prototype.setIrgb = function (irgb) {
                var rgb = irgb.toString(16);
                while (rgb.length < 6) {
                    rgb = '0' + rgb;
                }
                this.setRgb(rgb);
            };
            /** Gets BGR decimal value */
            Color.prototype.getIbgr = function () {
                return this.ibgr;
            };
            /** Sets BGR decimal value */
            Color.prototype.setIbgr = function (ibgr) {
                var bgr = ibgr.toString(16);
                while (bgr.length < 6) {
                    bgr = '0' + bgr;
                }
                this.setBgr(bgr);
            };
            return Color;
        })();
        utils.Color = Color;
    })(utils = internal.utils || (internal.utils = {}));
})(internal || (internal = {}));
/// <reference path="../_references.ts" />
var internal;
(function (internal) {
    var utils;
    (function (utils) {
        var Point = (function () {
            /** Creates a Point class */
            function Point(props) {
                this.setX(x);
                this.setY(y);
                this.setZ(z);
            }
            /** Gets the X coordinate */
            Point.prototype.getX = function () {
                return this.x;
            };
            /** Sets the X coordinate */
            Point.prototype.setX = function (x) {
                this.x = x;
            };
            /** Gets the Y coordinate */
            Point.prototype.getY = function () {
                return this.y;
            };
            /** Sets the Y coordinate */
            Point.prototype.setY = function (y) {
                this.y = y;
            };
            /** Gets the Z coordinate */
            Point.prototype.getZ = function () {
                return this.z;
            };
            /** Sets the Z coordinate */
            Point.prototype.setZ = function (z) {
                this.z = z;
            };
            return Point;
        })();
        utils.Point = Point;
    })(utils = internal.utils || (internal.utils = {}));
})(internal || (internal = {}));
/// <reference path="internal.ts" />
/// <reference path="app.ts" />
/// <reference path="item.ts" />
/// <reference path="utils/color.ts" />
/// <reference path="utils/point.ts" />
/// <reference path="utils/number.ts" />
/// <reference path="utils/rectangle.ts" />
/// <reference path="utils/thread.ts" />
/// <reference path="utils/xml.ts" /> 
/// <reference path="_references.ts" />
var internal;
(function (internal) {
    var _callbacks = {};
    /**
     * Executes an external function
     */
    function exec(funcName) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var callback = null, ret = false;
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
        console.log([
            'internal.exec("', funcName, '") ', JSON.stringify(args)
        ].join(' '));
        // END DEBUG
        if (window.external &&
            window.external[funcName] &&
            window.external[funcName] instanceof Function) {
            ret = window.external[funcName].apply(this, args);
        }
        // register callback if present
        if (callback !== null) {
            _callbacks[ret] = callback;
        }
        return ret;
    }
    internal.exec = exec;
    /**
     * Triggered when an async method is called,
     * asyncID is returned value in async method call
     * and result is real return value for method call.
     */
    window.OnAsyncCallback = function (asyncID, result) {
        var callback = _callbacks[asyncID];
        if (callback instanceof Function) {
            callback.call(this, decodeURIComponent(result));
        }
    };
    /**
     * Triggered when scene changes for any view
     */
    window.OnSceneLoad = function (view, scene) {
        document.dispatchEvent(new CustomEvent('scene-load', { detail: { view: view, scene: scene } }));
    };
    /**
     * Triggered when configuration window sets Browser Configuration.
     * Used only by source plugins.
     */
    window.SetConfiguration = function (config) {
        document.dispatchEvent(new CustomEvent('set-configuration', { config: config }));
    };
    /**
     * Triggered when configuration window sets background color.
     * Used only by source plugins.
     */
    window.SetBackGroundColor = function (color) {
        document.dispatchEvent(new CustomEvent('set-background-color', { color: color }));
    };
    /**
     * Triggered when configuration window sets volume.
     * Used only by source plugins.
     */
    window.SetVolume = function (volume) {
        document.dispatchEvent(new CustomEvent('set-volume', { volume: volume }));
    };
    /**
     * Triggered when modal dialog calls SetDialogResult
     */
    window.OnDialogResult = function (result) {
        document.dispatchEvent(new CustomEvent('dialog-result', { detail: { result: result } }));
    };
})(internal || (internal = {}));

/*!
 * EventEmitter v4.2.11 - git.io/ee
 * Unlicense - http://unlicense.org/
 * Oliver Caldwell - http://oli.me.uk/
 * @preserve
 */
(function(){"use strict";function t(){}function i(t,n){for(var e=t.length;e--;)if(t[e].listener===n)return e;return-1}function n(e){return function(){return this[e].apply(this,arguments)}}var e=t.prototype,r=this,s=r.EventEmitter;e.getListeners=function(n){var r,e,t=this._getEvents();if(n instanceof RegExp){r={};for(e in t)t.hasOwnProperty(e)&&n.test(e)&&(r[e]=t[e])}else r=t[n]||(t[n]=[]);return r},e.flattenListeners=function(t){var e,n=[];for(e=0;e<t.length;e+=1)n.push(t[e].listener);return n},e.getListenersAsObject=function(n){var e,t=this.getListeners(n);return t instanceof Array&&(e={},e[n]=t),e||t},e.addListener=function(r,e){var t,n=this.getListenersAsObject(r),s="object"==typeof e;for(t in n)n.hasOwnProperty(t)&&-1===i(n[t],e)&&n[t].push(s?e:{listener:e,once:!1});return this},e.on=n("addListener"),e.addOnceListener=function(e,t){return this.addListener(e,{listener:t,once:!0})},e.once=n("addOnceListener"),e.defineEvent=function(e){return this.getListeners(e),this},e.defineEvents=function(t){for(var e=0;e<t.length;e+=1)this.defineEvent(t[e]);return this},e.removeListener=function(r,s){var n,e,t=this.getListenersAsObject(r);for(e in t)t.hasOwnProperty(e)&&(n=i(t[e],s),-1!==n&&t[e].splice(n,1));return this},e.off=n("removeListener"),e.addListeners=function(e,t){return this.manipulateListeners(!1,e,t)},e.removeListeners=function(e,t){return this.manipulateListeners(!0,e,t)},e.manipulateListeners=function(r,t,i){var e,n,s=r?this.removeListener:this.addListener,o=r?this.removeListeners:this.addListeners;if("object"!=typeof t||t instanceof RegExp)for(e=i.length;e--;)s.call(this,t,i[e]);else for(e in t)t.hasOwnProperty(e)&&(n=t[e])&&("function"==typeof n?s.call(this,e,n):o.call(this,e,n));return this},e.removeEvent=function(e){var t,r=typeof e,n=this._getEvents();if("string"===r)delete n[e];else if(e instanceof RegExp)for(t in n)n.hasOwnProperty(t)&&e.test(t)&&delete n[t];else delete this._events;return this},e.removeAllListeners=n("removeEvent"),e.emitEvent=function(r,o){var e,i,t,s,n=this.getListenersAsObject(r);for(t in n)if(n.hasOwnProperty(t))for(i=n[t].length;i--;)e=n[t][i],e.once===!0&&this.removeListener(r,e.listener),s=e.listener.apply(this,o||[]),s===this._getOnceReturnValue()&&this.removeListener(r,e.listener);return this},e.trigger=n("emitEvent"),e.emit=function(e){var t=Array.prototype.slice.call(arguments,1);return this.emitEvent(e,t)},e.setOnceReturnValue=function(e){return this._onceReturnValue=e,this},e._getOnceReturnValue=function(){return this.hasOwnProperty("_onceReturnValue")?this._onceReturnValue:!0},e._getEvents=function(){return this._events||(this._events={})},t.noConflict=function(){return r.EventEmitter=s,t},"function"==typeof define&&define.amd?define(function(){return t}):"object"==typeof module&&module.exports?module.exports=t:r.EventEmitter=t}).call(this);

/* globals window, EventEmitter, internal */

(function()
{
	'use strict';

	/** This class is intended to be used by source plugin developers 
	 *   who intend to create their own plugins. This class exposes 
	 *   methods for setting how the configuration HTML should be
	 *   rendered, as well as listen to results from async callbacks.
	 *   It should be compatible with the rest of the plugin framework.
	 */

	var instance;

	var ConfigWindow = function()
	{
		window.addEventListener("message", function(event)
		{
			try
			{
				var data = JSON.parse(event.data);
			}
			catch (e)
			{
				// syntax error probably happened, exit gracefully
				return;
			}

			switch(data.event)
			{
				// currently, restrict messages to selected set
				case "set-language":
				case "set-selected-tab":
					this.emit(data.event, data.value);
					break;
				case "async-callback":
					this.emit(data.event, {
							asyncId : data.value.asyncId,
							result  : data.value.result
						});
					break;
				case "config-load":
					this.emit(data.event);
					break;
			}
		}.bind(this));

		instance = this;
	};

	ConfigWindow.prototype = Object.create(EventEmitter.prototype);

	ConfigWindow.getInstance = function()
	{
		if (instance === undefined)
		{
			instance = new ConfigWindow();
		}
		return instance;
	};

	ConfigWindow.RenderMode =
	{
		HIDDEN : "hidden",
		EMBEDDED : "embedded",
		FULLSCREEN : "full"
	};

	// helper function to config parent
	ConfigWindow.prototype._notify = function(obj)
	{
		window.parent.postMessage(JSON.stringify(obj), "*");
	};

	/**
	 * Specifies the desired rendering mode for
	 * the configuration HTML.
	 * 
	 * @method setRenderMode
	 * @param {ConfigWindow.RenderMode} renderMode
	 */
	ConfigWindow.prototype.setRenderMode = function(renderMode)
	{
		this._notify({
			event: "set-mode",
			value: renderMode
		});
	};

	/**
	 * Specifies the desired order of tabs,
	 * if plugin is using embedded mode.
	 * 
	 * @method setTaborder
	 * @param {Array} tabArray (names of tabs)
	 */
	ConfigWindow.prototype.setTabOrder = function(tabArray)
	{
		this._notify({
			event: "set-tab-order",
			value: JSON.stringify(tabArray)
		});
	};

	/**
	 * Allows the configuration HTML to declare
	 * which new tabs should be created for it.
	 * Should only be used in embedded mode.
	 * 
	 * @method declareCustomTabs
	 * @param {Array} tabArray (names of tabs)
	 */
	ConfigWindow.prototype.declareCustomTabs = function(tabArray)
	{
		this._notify({
			event: "set-custom-tabs",
			value: JSON.stringify(tabArray)
		});
	};

	/** Allows the configuration HTML to resize itself.
	 *
	 * @method resizeConfig
	 * @param {Number} width
	 * @param {Number} height
	 */
	ConfigWindow.prototype.resizeConfig = function(width, height)
	{
		internal.exec("SetDialogSize", width, height);
		this._notify({
			event: "resize",
			value: JSON.stringify({
				width: width,
				height: height
			})
		});
	};

	/** Allows the configuration HTML to close itself.
	 *
	 * @method closeConfig
	 */
	ConfigWindow.prototype.closeConfig = function()
	{
		internal.exec("Close");
	};

	if (window.xui === undefined)
	{
		window.xui = {};
	}

	if (window.xui.config === undefined)
	{
		window.xui.config = {};
	}

	window.xui.config.ConfigWindow = ConfigWindow;

	window.addEventListener("load", function()
	{
		window.xui.config.ConfigWindow.getInstance()._notify({
			event: "load"
		});
	});

	delete window.EventEmitter;
})();

/// <reference path="../_references.ts" />
var internal;
(function (internal) {
    var utils;
    (function (utils) {
        var Color = (function () {
            /** Creates a Color class */
            function Color(props) {
                if (props.rgb) {
                    this.setRgb(props.rgb);
                }
                if (props.irgb) {
                    this.setIrgb(props.irgb);
                }
                if (props.bgr) {
                    this.setBgr(props.bgr);
                }
                if (props.ibgr) {
                    this.setIbgr(props.ibgr);
                }
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
                this.setX(props.x);
                this.setY(props.y);
                this.setZ(props.z);
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
/// <reference path="../_references.ts" />
var internal;
(function (internal) {
    var utils;
    (function (utils) {
        var Rectangle = (function () {
            function Rectangle() {
            }
            /** Gets the top value */
            Rectangle.prototype.getTop = function () {
                return this.top;
            };
            /** Sets the top value */
            Rectangle.prototype.setTop = function (top) {
                this.top = top;
                if (this.bottom !== undefined) {
                    this.setHeight(Math.abs(this.top - this.bottom));
                }
                else if (this.height !== undefined) {
                    this.setBottom(this.top + this.height);
                }
            };
            /** Gets the left value */
            Rectangle.prototype.getLeft = function () {
                return this.left;
            };
            /** Sets the left value */
            Rectangle.prototype.setLeft = function (left) {
                this.left = left;
                if (this.right !== undefined) {
                    this.setWidth(Math.abs(this.right - this.left));
                }
                else if (this.width !== undefined) {
                    this.setRight(this.left + this.width);
                }
            };
            /** Gets the right value */
            Rectangle.prototype.getRight = function () {
                return this.right;
            };
            /** Sets the right value */
            Rectangle.prototype.setRight = function (right) {
                this.right = right;
                if (this.left !== undefined) {
                    this.setWidth(Math.abs(this.right - this.left));
                }
                else if (this.width !== undefined) {
                    this.setLeft(this.right - this.width);
                }
            };
            /** Gets the bottom value */
            Rectangle.prototype.getBottom = function () {
                return this.bottom;
            };
            /** Sets the bottom value */
            Rectangle.prototype.setBottom = function (bottom) {
                this.bottom = bottom;
                if (this.top !== undefined) {
                    this.setHeight(Math.abs(this.top - this.bottom));
                }
                else if (this.height !== undefined) {
                    this.setTop(this.bottom - this.height);
                }
            };
            /** Gets the width value */
            Rectangle.prototype.getWidth = function () {
                return this.width;
            };
            /** Sets the width value */
            Rectangle.prototype.setWidth = function (width) {
                this.width = width;
                if (this.right !== undefined) {
                    this.setLeft(this.right - this.width);
                }
                else if (this.left !== undefined) {
                    this.setRight(this.left + this.width);
                }
            };
            /** Gets the height value */
            Rectangle.prototype.getHeight = function () {
                return this.height;
            };
            /** Sets the height value */
            Rectangle.prototype.setHeight = function (height) {
                this.height = height;
                if (this.top !== undefined) {
                    this.setBottom(this.top + this.height);
                }
                else if (this.bottom !== undefined) {
                    this.setTop(this.bottom - this.height);
                }
            };
            /** Creates a rectangle from a comma-separated string */
            Rectangle.parse = function (str) {
                var params = str.split(','), rect = new Rectangle();
                if (params.length === 4) {
                    rect.top = Number(params[0]);
                    rect.left = Number(params[1]);
                    rect.right = Number(params[2]);
                    rect.bottom = Number(params[3]);
                }
                if (params.length === 2) {
                    rect.width = Number(params[0]);
                    rect.height = Number(params[1]);
                }
                return rect;
            };
            /** Converts a rectangle to a comma-separated string */
            Rectangle.prototype.toString = function (value) {
                var format = value || ':left,:top,:right,:bottom';
                format = format.replace(':left', String(this.left));
                format = format.replace(':top', String(this.top));
                format = format.replace(':right', String(this.right));
                format = format.replace(':bottom', String(this.bottom));
                format = format.replace(':width', String(this.width));
                format = format.replace(':height', String(this.height));
                return format;
            };
            return Rectangle;
        })();
        utils.Rectangle = Rectangle;
    })(utils = internal.utils || (internal.utils = {}));
})(internal || (internal = {}));
/// <reference path="../_references.ts" />
var internal;
(function (internal) {
    var utils;
    (function (utils) {
        var Thread = (function () {
            function Thread(callbacks) {
                this.callbacks = callbacks;
            }
            Thread.prototype.next = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                if (this.callbacks.length > 0) {
                    var callback = this.callbacks.shift();
                    args.unshift(this.next.bind(this));
                    callback.apply(this, args);
                }
            };
            Thread.sync = function () {
                var callbacks = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    callbacks[_i - 0] = arguments[_i];
                }
                var thread = new Thread(callbacks);
                thread.next();
                return thread;
            };
            return Thread;
        })();
        utils.Thread = Thread;
    })(utils = internal.utils || (internal.utils = {}));
})(internal || (internal = {}));
/// <reference path='../_references.ts' />
var internal;
(function (internal) {
    var utils;
    (function (utils) {
        var XML = (function () {
            function XML(json) {
                var attributes = '';
                if (json.value === undefined) {
                    json.value = '';
                }
                for (var key in json) {
                    if (!XML.RESERVED_ATTRIBUTES.test(key) &&
                        json[key] !== undefined) {
                        attributes += [' ', key, '=\'', json[key], '\''].join('');
                    }
                }
                if (json.children === undefined) {
                    json.children = [];
                }
                for (var _i = 0, _a = json.children; _i < _a.length; _i++) {
                    var child = _a[_i];
                    json.value += new XML(child).toString();
                }
                this.xml = ['<', json.tag, attributes, '>',
                    json.value, '</', json.tag, '>'].join('');
            }
            XML.prototype.toString = function () {
                return this.xml;
            };
            XML.parseJSON = function (json) {
                return new XML(json);
            };
            XML.encode = function (str) {
                return str.replace(/[&<>'']/g, function ($0) {
                    return '&' + {
                        '&': 'amp',
                        '<': 'lt',
                        '>': 'gt',
                        '\'': 'quot',
                        '"': '#39'
                    }[$0] + ';';
                });
            };
            XML.RESERVED_ATTRIBUTES = /^(children|tag|value)$/i;
            return XML;
        })();
        utils.XML = XML;
    })(utils = internal.utils || (internal.utils = {}));
})(internal || (internal = {}));
/// <reference path='../_references.ts' />
var internal;
(function (internal) {
    var utils;
    (function (utils) {
        var JSON = (function () {
            function JSON(xml) {
                if (xml === undefined) {
                    return;
                }
                var sxml = xml;
                if (xml instanceof utils.XML) {
                    sxml = xml.toString();
                }
                // process short ended tags
                sxml = sxml.replace(/<([^\s>]+)([^>]+)\/>/g, function (match, tagname, attributes) {
                    return ['<', tagname, attributes, '></', tagname, '>'].join('');
                });
                var container = document.createElement('div');
                container.innerHTML = sxml;
                var obj = (function processNode(node) {
                    var nodeJSON = new JSON();
                    nodeJSON.tag = node.tagName.toLowerCase();
                    // process attributes
                    for (var a = 0; a < node.attributes.length; a++) {
                        var attribute = node.attributes[a];
                        nodeJSON[attribute.name] = attribute.value;
                    }
                    // process child nodes
                    nodeJSON.children = [];
                    for (var c = 0; c < node.childNodes.length; c++) {
                        var childNode = node.childNodes[c];
                        if (childNode instanceof HTMLElement) {
                            nodeJSON.children.push(processNode(childNode));
                        }
                    }
                    // process value
                    if (nodeJSON.value === undefined &&
                        nodeJSON.children.length === 0) {
                        delete nodeJSON.children;
                        nodeJSON.value = node.textContent;
                    }
                    return nodeJSON;
                })(container);
                obj = obj.children[0];
                return obj;
            }
            JSON.parse = function (xml) {
                return new JSON(xml);
            };
            return JSON;
        })();
        utils.JSON = JSON;
    })(utils = internal.utils || (internal.utils = {}));
})(internal || (internal = {}));
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
/// <reference path="_references.ts" />
var internal;
(function (internal) {
    var Environment = (function () {
        function Environment() {
        }
        Environment.initialize = function () {
            if (Environment._initialized) {
                return;
            }
            Environment._isHtml = (window.external &&
                window.external['AttachVideoItem'] === undefined);
            Environment._isConfig = (window.external &&
                window.external['AttachVideoItem'] !== undefined &&
                window.external['GetViewId'] !== undefined &&
                window.external['GetViewId']() !== undefined);
            Environment._isScript = (window.external &&
                window.external['AttachVideoItem'] !== undefined &&
                window.external['GetViewId'] !== undefined &&
                window.external['GetViewId']() === undefined);
            Environment._initialized = true;
        };
        Environment.isSourceHtml = function () {
            return Environment._isHtml;
        };
        Environment.isSourceConfig = function () {
            return Environment._isConfig;
        };
        Environment.isScriptPlugin = function () {
            return Environment._isScript;
        };
        return Environment;
    })();
    internal.Environment = Environment;
    Environment.initialize();
})(internal || (internal = {}));
/// <reference path="_references.ts" />
var internal;
(function (internal) {
    var u = internal.utils;
    var App = (function () {
        function App() {
        }
        /** Get the value of the given property */
        App.get = function (name) {
            return new Promise(function (resolve) {
                internal.exec('AppGetPropertyAsync', name, resolve);
            });
        };
        /** Gets the value of the given property as list */
        App.getAsList = function (name) {
            return new Promise(function (resolve) {
                App.get(name).then(function (xml) {
                    var propsJSON = u.JSON.parse(xml), propsArr = [];
                    if (propsJSON.children.length > 0) {
                        propsArr = propsJSON.children;
                    }
                    resolve(propsArr);
                });
            });
        };
        /** Get the value of the given global property */
        App.getGlobalProperty = function (name) {
            return internal.exec('GetGlobalProperty', name);
        };
        /** Sets the value of a property */
        App.set = function (name, value) {
            return new Promise(function (resolve) {
                internal.exec('AppSetPropertyAsync', name, value, function (ret) {
                    resolve(ret === "0" ? false : true);
                });
            });
        };
        /** Calls a DLL function synchronously */
        App.callDll = function (func) {
            var arg = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                arg[_i - 1] = arguments[_i];
            }
            var args = [].slice.call(arguments);
            args.unshift('CallDll');
            return internal.exec.apply(this, args);
        };
        /** Calls an application method asynchronously */
        App.callFunc = function (func, arg) {
            return new Promise(function (resolve) {
                internal.exec('AppCallFuncAsync', func, arg, function (ret) {
                    resolve(ret);
                });
            });
        };
        App.postMessage = function (key) {
            var _this = this;
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            return new Promise(function (resolve) {
                args.unshift(key);
                args.unshift('PostMessageToParent');
                args.push(function (val) {
                    resolve(val);
                });
                internal.exec.apply(_this, args);
            });
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
        function Item(props) {
            var props = props || {};
            this.name = props.name;
            this.value = props.item;
            this.id = props.id;
            this.sceneID = props.sceneID;
            this.viewID = props.viewID;
        }
        /** Prepare an item for manipulation */
        Item.attach = function (itemID, view) {
            internal.exec('SearchVideoItem', itemID, String(view));
        };
        /** Get an item's local property asynchronously */
        Item.get = function (name, slot) {
            return new Promise(function (resolve) {
                internal.exec('GetLocalPropertyAsync' +
                    (String(slot) === '1' ? '' : '2'), name, function (val) {
                    resolve(val);
                });
            });
        };
        /** Sets an item's local property */
        Item.set = function (name, value, slot) {
            internal.exec('SetLocalPropertyAsync' +
                (String(slot) === '1' ? '' : '2'), name, value);
        };
        /** Calls a function defined in an item/source */
        Item.callFunc = function (func, arg) {
            internal.exec('CallInner', func, arg);
        };
        /** helper function to get current source on init */
        Item.setBaseID = function (id) {
            Item.baseID = id;
        };
        return Item;
    })();
    internal.Item = Item;
})(internal || (internal = {}));
/// <reference path="_references.ts" />
var internal;
(function (internal) {
    function init() {
        // only valid for source plugin
        if (internal.Environment.isSourceHtml()) {
            // initialize config URL if necessary
            internal.exec('GetLocalPropertyAsync', 'prop:BrowserConfiguration', function (result) {
                var configObj = JSON.parse(decodeURIComponent(result));
                if (configObj === null) {
                    configObj = {};
                }
                if (configObj.configUrl === undefined) {
                    var metas = document.getElementsByTagName("meta");
                    for (var i = metas.length - 1; i >= 0; i--) {
                        if (metas[i].name === 'config-url') {
                            configObj.configUrl = metas[i].content;
                            internal.exec('SetBrowserProperty', 'Configuration', JSON.stringify(configObj));
                            break;
                        }
                    }
                }
            });
            // initialize Item.getSource() functions
            internal.exec('GetLocalPropertyAsync', 'prop:BrowserConfiguration', function (result) {
                internal.Item.setBaseID(decodeURIComponent(result));
            });
        }
    }
    internal.init = init;
})(internal || (internal = {}));
internal.init();
/// <reference path="../defs/es6-promise.d.ts" />
/// <reference path="utils/color.ts" />
/// <reference path="utils/point.ts" />
/// <reference path="utils/rectangle.ts" />
/// <reference path="utils/thread.ts" />
/// <reference path="utils/xml.ts" />
/// <reference path="utils/json.ts" />
/// <reference path="internal.ts" />
/// <reference path="environment.ts" />
/// <reference path="app.ts" />
/// <reference path="item.ts" />
/// <reference path="init.ts" />
/// <reference path="../_references.ts" />
var xui;
(function (xui) {
    var system;
    (function (system) {
        var u = internal.utils;
        var App = internal.App;
        var Audio = (function () {
            function Audio(props) {
                this.defaultConsole = false;
                this.defaultMultimedia = false;
                this.defaultCommunication = false;
                props = props || {};
                this.id = props['id'];
                this.name = props['name'];
                this.adapter = props['adapter'];
                this.adapterdev = props['adapterdev'];
                this.guid = props['guid'];
                this.dataflow = props['dataflow'];
                this.state = props['state'];
                this.defaultConsole = props['defaultConsole'];
                this.defaultMultimedia = props['defaultMultimedia'];
                this.defaultCommunication = props['defaultCommunication'];
                this.level = props['level'];
                this.enable = props['enable'];
                this.hwlevel = props['hwlevel'];
            }
            /**
             * ID from WASAPI (microphone or speaker) or "default" or
             * "default:<data_flow>" or "default:<data_flow>:<role>"
             */
            Audio.prototype.getId = function () {
                return this.id;
            };
            /** Friendly name of the device */
            Audio.prototype.getName = function () {
                return this.name;
            };
            /** Friendly name of the device' adapter */
            Audio.prototype.getAdapterName = function () {
                return this.adapter;
            };
            /** Description of the device' adapter  */
            Audio.prototype.getAdapterDescription = function () {
                return this.adapterdev;
            };
            /** DirectSound device identifier */
            Audio.prototype.getGuid = function () {
                return this.guid;
            };
            /** Data flow of the device. Value can be "Render" or "Capture". */
            Audio.prototype.getDataFlow = function () {
                return this.dataflow;
            };
            /**
             * State of the device. Value can be "Active", "Disabled",
             * "Not Present", or "Unplugged"
             */
            Audio.prototype.getState = function () {
                return this.state;
            };
            /** Returns true if the device is the default console device */
            Audio.prototype.isDefaultConsole = function () {
                return this.defaultConsole;
            };
            /** Returns true if the device is the default multimedia device */
            Audio.prototype.isDefaultMultimedia = function () {
                return this.defaultMultimedia;
            };
            /** Returns true if the device is the default communication device */
            Audio.prototype.isDefaultCommunication = function () {
                return this.defaultCommunication;
            };
            /** Returns the value of the software audio level */
            Audio.prototype.getLevel = function () {
                return this.level;
            };
            /** Sets the value of the software audio level */
            Audio.prototype.setLevel = function (level) {
                this.level = level;
                return this;
            };
            /** Returns true if software audio is enabled */
            Audio.prototype.isEnabled = function () {
                return this.enable;
            };
            /** Enables/disables software audio */
            Audio.prototype.setEnabled = function (enabled) {
                this.enable = enabled;
                return this;
            };
            /** Returns the value of the system audio level */
            Audio.prototype.getSystemLevel = function () {
                return this.hwlevel;
            };
            /** Sets the value of the system audio level */
            Audio.prototype.setSystemLevel = function (hwlevel) {
                this.hwlevel = hwlevel;
                return this;
            };
            /** Returns true if system audio is enabled */
            Audio.prototype.isSystemEnabled = function () {
                return this.hwenable;
            };
            /** Enables/disables system audio */
            Audio.prototype.setSystemEnabled = function (enabled) {
                this.hwenable = enabled;
                return this;
            };
            /** Returns the loopback capture delay value (100 nanoseconds units) */
            Audio.prototype.getDelay = function () {
                return this.delay;
            };
            /** Sets the loopback capture delay value (100 nanoseconds units) */
            Audio.prototype.setDelay = function (delay) {
                this.delay = delay;
                return this;
            };
            /** Converts the Audio item to XML string */
            Audio.prototype.toString = function () {
                var device = new u.JSON();
                device.tag = 'dev';
                device['id'] = this.getId();
                device['level'] = this.getLevel();
                device['enable'] = this.isEnabled() ? 1 : 0;
                device['hwlevel'] = this.getSystemLevel();
                device['hwenable'] = this.isSystemEnabled() ? 1 : 0;
                device['delay'] = this.getDelay();
                return u.XML.parseJSON(device).toString();
            };
            /** List audio devices of the system */
            Audio.list = function (filters) {
                filters = filters || { dataflow: 'all', state: 'all' };
                filters.dataflow = filters.dataflow || 'all';
                filters.state = filters.state || 'all';
                return new Promise(function (resolve) {
                    App.getAsList('wasapienum').then(function (devices) {
                        var audioDevices = [];
                        devices.map(function (device) {
                            var excludedDataFlow = !/^all$/i.test(filters.dataflow) &&
                                filters.dataflow !== device['dataflow'];
                            var excludedState = !/^all$/i.test(filters.state) &&
                                filters.state !== device['state'];
                            if (excludedDataFlow || excludedState) {
                                return;
                            }
                            audioDevices.push(Audio.parse(device));
                        });
                        resolve(audioDevices);
                    });
                });
            };
            Audio.parse = function (deviceJSON) {
                var audio = new Audio({
                    id: deviceJSON['id'],
                    name: deviceJSON['name'],
                    adapter: deviceJSON['adapter'],
                    adapterdev: deviceJSON['adapterdev'],
                    dataflow: deviceJSON['dataflow'],
                    state: deviceJSON['state'],
                    guid: deviceJSON['dsoundguid'],
                    defaultCommunication: (deviceJSON['defaultcommunication'] === '1'),
                    defaultConsole: (deviceJSON['defaultconsole'] === '1'),
                    defaultMultimedia: (deviceJSON['defaultmultimedia'] === '1')
                });
                audio.setLevel(Number(deviceJSON['level']))
                    .setEnabled(deviceJSON['enable'] === '1')
                    .setSystemLevel(Number(deviceJSON['hwlevel']))
                    .setSystemEnabled(deviceJSON['hwenable'] === '1')
                    .setDelay(Number(deviceJSON['delay']));
                return audio;
            };
            Audio.STATE_ACTIVE = 'Active';
            Audio.DATAFLOW_RENDER = 'Render';
            Audio.DATAFLOW_CAPTURE = 'Capture';
            return Audio;
        })();
        system.Audio = Audio;
    })(system = xui.system || (xui.system = {}));
})(xui || (xui = {}));
/// <reference path="../_references.ts" />
var xui;
(function (xui) {
    var system;
    (function (system) {
        var App = internal.App;
        var Process = (function () {
            function Process(pid) {
                if (pid !== undefined) {
                    this.setPid(pid);
                }
            }
            Process.prototype.getPid = function () {
                return this.pid;
            };
            Process.prototype.setPid = function (pid) {
                this.pid = pid;
                var strPid = pid.toString();
                this.detail = App.callDll('xsplit.GetProcessDetails', strPid);
                this.modules = App.callDll('xsplit.GetProcessModules', strPid);
                this.hwnds = App.callDll('xsplit.GetProcessWindowsList', strPid);
            };
            Process.prototype.getDetail = function () {
                return this.detail;
            };
            Process.prototype.getHwnds = function () {
                return this.hwnds === '' ? [] : this.hwnds.split(',').map(function (element) {
                    return Number(element);
                });
            };
            Process.prototype.getModules = function () {
                return this.modules === undefined ? [] :
                    this.modules.split(',').filter(function (element) {
                        return element !== '';
                    });
            };
            return Process;
        })();
        system.Process = Process;
    })(system = xui.system || (xui.system = {}));
})(xui || (xui = {}));
/// <reference path="../_references.ts" />
var xui;
(function (xui) {
    var system;
    (function (system) {
        var Rectangle = internal.utils.Rectangle;
        var JSON = internal.utils.JSON;
        var XML = internal.utils.XML;
        var Game = (function () {
            function Game() {
            }
            /**
             * Gets the game's process ID.
             */
            Game.prototype.getPid = function () {
                return this.pid;
            };
            /**
             * Gets the Graphics API handle.
             */
            Game.prototype.getHandle = function () {
                return this.handle;
            };
            /**
             * Gets the window handle.
             */
            Game.prototype.getWindowHandle = function () {
                return this.hwnd;
            };
            /**
             * Gets the Graphics API type. Possible values:
             * OGL, DX8, DX8_SwapChain, DX9, DX9Ex, DX9_SwapChain,
             * DX9_PresentEx, DX10, DX11, DX11.1, DX11.1_Present1
             */
            Game.prototype.getGapiType = function () {
                return this.gapitype;
            };
            /**
             * Gets game resolution.
             */
            Game.prototype.getResolution = function () {
                return Rectangle.parse(this.width + ',' + this.height);
            };
            /**
             * Returns game-specific flags. 1 for exclusive full screen, 0 otherwise
             */
            Game.prototype.getFlags = function () {
                return this.flags;
            };
            /**
             * Gets window title.
             */
            Game.prototype.getWindowName = function () {
                return this.wndname;
            };
            /**
             * Gets timestamp of last frame in milliseconds.
             */
            Game.prototype.getLastFrameTimestamp = function () {
                return this.lastframets;
            };
            Game.parse = function (json) {
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
            };
            Game.prototype.toXML = function () {
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
            };
            return Game;
        })();
        system.Game = Game;
    })(system = xui.system || (xui.system = {}));
})(xui || (xui = {}));
/// <reference path="../_references.ts" />
var xui;
(function (xui) {
    var core;
    (function (core) {
        var Rectangle = internal.utils.Rectangle;
        var Audio = xui.system.Audio;
        var iApp = internal.App;
        var JSON = internal.utils.JSON;
        var Xml = internal.utils.XML;
        var App = (function () {
            function App() {
            }
            // App base services
            /** Call method of DLL present in Scriptdlls folder */
            App.callDll = function () {
                return iApp.callDll.apply(this, arguments);
            };
            /** Gets application's frame time (duration per frame in 100ns unit) */
            App.getFrametime = function () {
                return new Promise(function (resolve) {
                    resolve(iApp.get('frametime'));
                });
            };
            /** Gets application default output resolution */
            App.getResolution = function () {
                return new Promise(function (resolve) {
                    iApp.get('resolution').then(function (val) {
                        resolve(Rectangle.parse(val));
                    });
                });
            };
            /** Gets application viewport display resolution */
            App.getViewport = function () {
                return new Promise(function (resolve) {
                    iApp.get('viewport').then(function (val) {
                        resolve(Rectangle.parse(val));
                    });
                });
            };
            /** Refers to XSplit Broadcaster DLL file version number */
            App.getVersion = function () {
                return new Promise(function (resolve) {
                    resolve(iApp.get('version'));
                });
            };
            /** Gets the total number of frames rendered */
            App.getFramesRendered = function () {
                return new Promise(function (resolve) {
                    resolve(iApp.get('version'));
                });
            };
            // Audio Services
            /** List of audio input and output devices used by the application */
            App.getAudioDevices = function () {
                return new Promise(function (resolve) {
                    iApp.getAsList('microphonedev2').then(function (arr) {
                        resolve(arr.map(function (val) {
                            return Audio.parse(val);
                        }));
                    });
                });
            };
            App.setAudioDevices = function (devices) {
                var dev = '';
                if (Array.isArray(devices)) {
                    for (var i = 0; i < devices.length; ++i) {
                        dev += devices[i].toString();
                    }
                }
                dev = '<devices>' + dev + '</devices>';
                iApp.set('microphonedev2', dev);
            };
            App.getAudioGain = function () {
                return new Promise(function (resolve) {
                    iApp.get('microphonegain').then(function (val) {
                        resolve(JSON.parse(val));
                    });
                });
            };
            App.setAudioGain = function (config) {
                config.tag = 'configuration';
                iApp.set('microphonegain', Xml.parseJSON(config).toString());
            };
            // Dialog Services
            /** Creates a persistent modal dialog */
            App.newDialog = function (url) {
                if (url !== undefined && url !== '') {
                    iApp.callFunc('newdialog', url);
                }
            };
            /** Creates a modal dialog that automatically closes on outside click */
            App.newAutoDialog = function (url) {
                if (url !== undefined && url !== '') {
                    iApp.callFunc('newautodialog', url);
                }
            };
            /** Close a created dialog */
            App.closeDialog = function (width, height) {
                // currently only works for source config
                internal.exec('CloseDialog');
            };
            /** Resizes a global script dialog */
            App.resizeSelf = function (width, height) {
                iApp.postMessage(iApp.POSTMESSAGE_SIZE, width, height);
            };
            /** Closes a global script dialog */
            App.closeSelf = function () {
                iApp.postMessage(iApp.POSTMESSAGE_CLOSE);
            };
            /** Gets the transition for scene changes. */
            App.getTransition = function () {
                return new Promise(function (resolve) {
                    iApp.get('transitionid').then(function (val) {
                        resolve(val);
                    });
                });
            };
            /** Sets the transition for scene changes. */
            App.setTransition = function (transition) {
                iApp.set('transitionid', transition);
            };
            /** Gets the scene transition duration in milliseconds. */
            App.getTransitionTime = function () {
                return new Promise(function (resolve) {
                    iApp.get('transitiontime').then(function (val) {
                        resolve(Number(val));
                    });
                });
            };
            /** Sets the scene transition duration in milliseconds. */
            App.setTransitionTime = function (time) {
                iApp.set('transitiontime', time.toString());
            };
            // Transition Services
            App.TRANSITION_CLOCK = 'clock';
            App.TRANSITION_COLLAPSE = 'collapse';
            App.TRANSITION_MOVE_BOTTOM = 'move_bottom';
            App.TRANSITION_MOVE_LEFT = 'move_left';
            App.TRANSITION_MOVE_LEFT_RIGHT = 'move_left_right';
            App.TRANSITION_MOVE_RIGHT = 'move_right';
            App.TRANSITION_MOVE_TOP = 'move_top';
            App.TRANSITION_FAN = 'fan';
            App.TRANSITION_HOLE = 'hole';
            App.TRANSITION_WAVE = 'wave';
            return App;
        })();
        core.App = App;
    })(core = xui.core || (xui.core = {}));
})(xui || (xui = {}));
/// <reference path="../_references.ts" />
var xui;
(function (xui) {
    var core;
    (function (core) {
        var iApp = internal.App;
        var Channel = (function () {
            /** Channel constructor, intialize name, state, and channel values */
            function Channel(props) {
                this.name = props.name;
                this.stat = props.stat;
                this.channel = props.channel;
            }
            /** Gets the amout of frames dropped and frames rendered  */
            Channel.prototype.getStreamDrops = function () {
                var _this = this;
                return new Promise(function (resolve) {
                    iApp.get('streamdrops:' + _this.name).then(function (val) {
                        var drops = val.split(','), dropped = Number(drops[0]) || 0, rendered = Number(drops[1]) || 0;
                        resolve({ dropped: dropped, rendered: rendered });
                    });
                });
            };
            /** Gets the current duration of <stream> in microseconds  */
            Channel.prototype.getStreamTime = function () {
                var _this = this;
                return new Promise(function (resolve) {
                    iApp.get('streamtime:' + _this.name).then(function (val) {
                        var duration = Number(val) / 10;
                        resolve(duration);
                    });
                });
            };
            return Channel;
        })();
        core.Channel = Channel;
    })(core = xui.core || (xui.core = {}));
})(xui || (xui = {}));
/// <reference path="../../_references.ts" />
var xui;
(function (xui) {
    var core;
    (function (core) {
        var iItem = internal.Item;
        var Rectangle = internal.utils.Rectangle;
        var ItemLayout = (function () {
            function ItemLayout() {
            }
            /** Check if Aspect Ratio is set to ON or OFF */
            ItemLayout.prototype.isKeepAspectRatio = function () {
                var _this = this;
                return new Promise(function (resolve) {
                    iItem.attach(_this.id, _this.viewID);
                    iItem.get('prop:keep_ar').then(function (val) {
                        _this.keepAspectRatio = (val === '1');
                        resolve(_this.keepAspectRatio);
                    });
                });
            };
            /** Set Aspect Ratio to ON or OFF */
            ItemLayout.prototype.setKeepAspectRatio = function (value) {
                iItem.attach(this.id, this.viewID);
                this.keepAspectRatio = value;
                iItem.set('prop:keep_ar', this.keepAspectRatio ? '1' : '0');
            };
            /** Check if Position Locked is set to ON or OFF */
            ItemLayout.prototype.isPositionLocked = function () {
                var _this = this;
                return new Promise(function (resolve) {
                    iItem.attach(_this.id, _this.viewID);
                    iItem.get('prop:lockmove').then(function (val) {
                        _this.positionLocked = (val === '1');
                        resolve(_this.positionLocked);
                    });
                });
            };
            /** Set Position Lock to ON or OFF */
            ItemLayout.prototype.setPositionLocked = function (value) {
                iItem.attach(this.id, this.viewID);
                this.positionLocked = value;
                iItem.set('prop:lockmove', this.positionLocked ? '1' : '0');
            };
            /** Check if Enhance Resize is Enabled or Disabled */
            ItemLayout.prototype.isEnhanceResizeEnabled = function () {
                var _this = this;
                return new Promise(function (resolve) {
                    iItem.attach(_this.id, _this.viewID);
                    iItem.get('prop:mipmaps').then(function (val) {
                        _this.enhanceResizeEnabled = (val === '1');
                        resolve(_this.enhanceResizeEnabled);
                    });
                });
            };
            /** Set Enhance Resize to ON or OFF */
            ItemLayout.prototype.setEnhanceResizeEnabled = function (value) {
                iItem.attach(this.id, this.viewID);
                this.enhanceResizeEnabled = value;
                iItem.set('prop:mipmaps', this.enhanceResizeEnabled ? '1' : '0');
            };
            /** Check if Pixel Alignment is Enabled or Disabled */
            ItemLayout.prototype.isPixelAlignmentEnabled = function () {
                var _this = this;
                return new Promise(function (resolve) {
                    iItem.attach(_this.id, _this.viewID);
                    iItem.get('prop:pixalign').then(function (val) {
                        _this.pixelAlignmentEnabled = (val === '1');
                        resolve(_this.pixelAlignmentEnabled);
                    });
                });
            };
            /** Set Pixel Alignment to ON or OFF */
            ItemLayout.prototype.setPixelAlignmentEnabled = function (value) {
                iItem.attach(this.id, this.viewID);
                this.pixelAlignmentEnabled = value;
                iItem.set('prop:pixalign', this.pixelAlignmentEnabled ? '1' : '0');
            };
            /** Get the position of the item */
            ItemLayout.prototype.getPosition = function () {
                var _this = this;
                return new Promise(function (resolve) {
                    iItem.attach(_this.id, _this.viewID);
                    iItem.get('prop:pos').then(function (val) {
                        _this.position = Rectangle.parse(val);
                        resolve(_this.position);
                    });
                });
            };
            /** Set Item position */
            ItemLayout.prototype.setPosition = function (value) {
                iItem.attach(this.id, this.viewID);
                this.position = value;
                iItem.set('prop:pos', this.position.toString());
            };
            return ItemLayout;
        })();
        core.ItemLayout = ItemLayout;
    })(core = xui.core || (xui.core = {}));
})(xui || (xui = {}));
/// <reference path="../_references.ts" />
var xui;
(function (xui) {
    var core;
    (function (core) {
        var iItem = internal.Item;
        var JSON = internal.utils.JSON;
        var XML = internal.utils.XML;
        var Item = (function () {
            function Item(props) {
                this.id = props['id'];
                this.name = props['name'];
                this.sceneID = props['sceneID'];
                this.viewID = props['viewID'];
                this.type = props['type'];
                this.value = JSON.parse(props['value']);
                this.keepLoaded = props['position'];
            }
            /** Set name of the item */
            Item.prototype.setName = function (value) {
                iItem.attach(this.id, this.viewID);
                this.name = value;
                iItem.set('prop:name', this.name);
            };
            /** Get the current name of the item */
            Item.prototype.getName = function () {
                var _this = this;
                return new Promise(function (resolve) {
                    iItem.attach(_this.id, _this.viewID);
                    iItem.get('prop:name').then(function (val) {
                        _this.name = val;
                        resolve(val);
                    });
                });
            };
            /** Get the video item's main definition */
            Item.prototype.getValue = function () {
                var _this = this;
                return new Promise(function (resolve) {
                    iItem.attach(_this.id, _this.viewID);
                    iItem.get('prop:item').then(function (val) {
                        val = (val === 'null') ? '' : val;
                        _this.value = JSON.parse(val);
                        resolve(_this.value);
                    });
                });
            };
            /** Set the video item's main definition */
            Item.prototype.setValue = function (value) {
                iItem.attach(this.id, this.viewID);
                var xml = (typeof value === 'string') ?
                    value : XML.parseJSON(value).toString();
                this.value = JSON.parse(xml);
                iItem.set('prop:item', xml);
            };
            /** Get Keep loaded option */
            Item.prototype.getKeepLoaded = function () {
                var _this = this;
                return new Promise(function (resolve) {
                    iItem.attach(_this.id, _this.viewID);
                    iItem.get('prop:keeploaded').then(function (val) {
                        _this.keepLoaded = (val === '1');
                        resolve(_this.keepLoaded);
                    });
                });
            };
            /** Set Keep loaded option to ON or OFF */
            Item.prototype.setKeepLoaded = function (value) {
                iItem.attach(this.id, this.viewID);
                this.keepLoaded = value;
                iItem.set('prop:keeploaded', this.keepLoaded ? '1' : '0');
            };
            /** Get the type of the item */
            Item.prototype.getType = function () {
                var _this = this;
                return new Promise(function (resolve) {
                    iItem.attach(_this.id, _this.viewID);
                    iItem.get('prop:type').then(function (val) {
                        _this.type = Number(val);
                        resolve(Number(val));
                    });
                });
            };
            /** Get Item ID */
            Item.prototype.getID = function () {
                var _this = this;
                return new Promise(function (resolve) {
                    iItem.attach(_this.id, _this.viewID);
                    iItem.get('prop:id').then(function (val) {
                        _this.id = val;
                        resolve(_this.id);
                    });
                });
            };
            /** Get Scene ID where the item is loaded */
            Item.prototype.getSceneID = function () {
                var _this = this;
                return new Promise(function (resolve) {
                    resolve(_this.sceneID);
                });
            };
            /** Get the View ID where the item is loaded */
            Item.prototype.getViewID = function () {
                var _this = this;
                return new Promise(function (resolve) {
                    resolve(_this.viewID);
                });
            };
            /** Convert the Item object to XML */
            Item.prototype.toXML = function () {
                var item;
                item['tag'] = 'item';
                item['pos_left'] = this.position.getLeft() || 0.250000;
                item['pos_top'] = this.position.getTop() || 0.250000;
                item['pos_right'] = this.position.getRight() || 0.250000;
                item['pos_bottom'] = this.position.getBottom() || 0.250000;
                item['name'] = this.name;
                item['item'] = this.value;
                item['type'] = this.type;
                return XML.parseJSON(item);
            };
            // Item Types
            Item.TYPE_UNDEFINED = 0;
            Item.TYPE_FILE = 1;
            Item.TYPE_LIVE = 2;
            Item.TYPE_TEXT = 3;
            Item.TYPE_BITMAP = 4;
            Item.TYPE_SCREEN = 5;
            Item.TYPE_FLASHFILE = 6;
            Item.TYPE_GAMESOURCE = 7;
            Item.TYPE_HTML = 8;
            return Item;
        })();
        core.Item = Item;
        // Apply Mixins and combine it to Item class
        applyMixins(Item, [core.ItemLayout]);
        function applyMixins(derivedCtor, baseCtors) {
            baseCtors.forEach(function (baseCtor) {
                Object.getOwnPropertyNames(baseCtor.prototype).forEach(function (name) {
                    derivedCtor.prototype[name] = baseCtor.prototype[name];
                });
            });
        }
    })(core = xui.core || (xui.core = {}));
})(xui || (xui = {}));
/// <reference path="defs/es6-promise.d.ts" />
/// <reference path="../dist/internal.d.ts" />
/// <reference path="system/audio.ts" />
/// <reference path="system/process.ts" />
/// <reference path="system/game.ts" />
/// <reference path="core/app.ts" />
/// <reference path="core/channel.ts" />
/// <reference path="core/item/layout.ts" />
/// <reference path="core/item.ts" />

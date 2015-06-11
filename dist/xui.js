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
                    rect.setTop(Number(params[0]));
                    rect.setLeft(Number(params[1]));
                    rect.setRight(Number(params[2]));
                    rect.setBottom(Number(params[3]));
                }
                if (params.length === 2) {
                    rect.setWidth(Number(params[0]));
                    rect.setHeight(Number(params[1]));
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
                if (xml === undefined || xml === '') {
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
/// <reference path='../_references.ts' />
var internal;
(function (internal) {
    var utils;
    (function (utils) {
        function applyMixins(derivedCtor, baseCtors) {
            baseCtors.forEach(function (baseCtor) {
                Object.getOwnPropertyNames(baseCtor.prototype).forEach(function (name) {
                    if (name === 'constructor')
                        return;
                    derivedCtor.prototype[name] = baseCtor.prototype[name];
                });
            });
        }
        utils.applyMixins = applyMixins;
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
                window.external['GetConfiguration'] !== undefined);
            Environment._isConfig = (window.external &&
                window.external['GetConfiguration'] === undefined &&
                window.external['GetViewId'] !== undefined &&
                window.external['GetViewId']() !== undefined);
            Environment._isScript = (window.external &&
                window.external['GetConfiguration'] === undefined &&
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
                    if (propsJSON.children && propsJSON.children.length > 0) {
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
        Item.attach = function (itemID, view, slot) {
            if (internal.Environment.isScriptPlugin()) {
                internal.exec('SearchVideoItem', itemID, String(view));
            }
            else {
                internal.exec('AttachVideoItem' +
                    (String(slot) === '2' ? '2' : ''), itemID, String(view));
            }
        };
        /** Get an item's local property asynchronously */
        Item.get = function (name, slot) {
            return new Promise(function (resolve) {
                internal.exec('GetLocalPropertyAsync' +
                    (String(slot) === '2' ? '2' : ''), name, function (val) {
                    resolve(val);
                });
            });
        };
        /** Sets an item's local property */
        Item.set = function (name, value, slot) {
            internal.exec('SetLocalPropertyAsync' +
                (String(slot) === '2' ? '2' : ''), name, value);
        };
        /** Calls a function defined in an item/source */
        Item.callFunc = function (func, arg) {
            internal.exec('CallInner', func, arg);
        };
        /** helper function to get current source on init */
        Item.setBaseID = function (id) {
            Item.baseID = id;
        };
        /** helper function for Item.getCurrentSource() */
        Item.getBaseID = function () {
            return Item.baseID;
        };
        return Item;
    })();
    internal.Item = Item;
})(internal || (internal = {}));
/// <reference path="_references.ts" />
var internal;
(function (internal) {
    function persistConfig(config) {
        window['internal'].persistConfig = config;
    }
    internal.persistConfig = persistConfig;
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
                            persistConfig(configObj);
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
/// <reference path="utils/mixin.ts" />
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
        var AudioDevice = (function () {
            function AudioDevice(props) {
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
            AudioDevice.prototype.getId = function () {
                return this.id;
            };
            /** Friendly name of the device */
            AudioDevice.prototype.getName = function () {
                return this.name;
            };
            /** Friendly name of the device' adapter */
            AudioDevice.prototype.getAdapterName = function () {
                return this.adapter;
            };
            /** Description of the device' adapter  */
            AudioDevice.prototype.getAdapterDescription = function () {
                return this.adapterdev;
            };
            /** DirectSound device identifier */
            AudioDevice.prototype.getGuid = function () {
                return this.guid;
            };
            /** Data flow of the device. Value can be "Render" or "Capture". */
            AudioDevice.prototype.getDataFlow = function () {
                return this.dataflow;
            };
            /**
             * State of the device. Value can be "Active", "Disabled",
             * "Not Present", or "Unplugged"
             */
            AudioDevice.prototype.getState = function () {
                return this.state;
            };
            /** Returns true if the device is the default console device */
            AudioDevice.prototype.isDefaultConsole = function () {
                return this.defaultConsole;
            };
            /** Returns true if the device is the default multimedia device */
            AudioDevice.prototype.isDefaultMultimedia = function () {
                return this.defaultMultimedia;
            };
            /** Returns true if the device is the default communication device */
            AudioDevice.prototype.isDefaultCommunication = function () {
                return this.defaultCommunication;
            };
            /** Returns the value of the software audio level */
            AudioDevice.prototype.getLevel = function () {
                return this.level;
            };
            /** Sets the value of the software audio level */
            AudioDevice.prototype.setLevel = function (level) {
                this.level = level;
                return this;
            };
            /** Returns true if software audio is enabled */
            AudioDevice.prototype.isEnabled = function () {
                return this.enable;
            };
            /** Enables/disables software audio */
            AudioDevice.prototype.setEnabled = function (enabled) {
                this.enable = enabled;
                return this;
            };
            /** Returns the value of the system audio level */
            AudioDevice.prototype.getSystemLevel = function () {
                return this.hwlevel;
            };
            /** Sets the value of the system audio level */
            AudioDevice.prototype.setSystemLevel = function (hwlevel) {
                this.hwlevel = hwlevel;
                return this;
            };
            /** Returns true if system audio is enabled */
            AudioDevice.prototype.isSystemEnabled = function () {
                return this.hwenable;
            };
            /** Enables/disables system audio */
            AudioDevice.prototype.setSystemEnabled = function (enabled) {
                this.hwenable = enabled;
                return this;
            };
            /** Returns the loopback capture delay value (100 nanoseconds units) */
            AudioDevice.prototype.getDelay = function () {
                return this.delay;
            };
            /** Sets the loopback capture delay value (100 nanoseconds units) */
            AudioDevice.prototype.setDelay = function (delay) {
                this.delay = delay;
                return this;
            };
            /** Converts the AudioDevice item to XML string */
            AudioDevice.prototype.toString = function () {
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
            AudioDevice.list = function (filters) {
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
                            audioDevices.push(AudioDevice.parse(device));
                        });
                        resolve(audioDevices);
                    });
                });
            };
            AudioDevice.parse = function (deviceJSON) {
                var audio = new AudioDevice({
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
            AudioDevice.STATE_ACTIVE = 'Active';
            AudioDevice.DATAFLOW_RENDER = 'Render';
            AudioDevice.DATAFLOW_CAPTURE = 'Capture';
            return AudioDevice;
        })();
        system.AudioDevice = AudioDevice;
    })(system = xui.system || (xui.system = {}));
})(xui || (xui = {}));
/// <reference path="../_references.ts" />
var xui;
(function (xui) {
    var system;
    (function (system) {
        var JSON = internal.utils.JSON;
        var XML = internal.utils.XML;
        var VideoDevice = (function () {
            function VideoDevice(props) {
                props = props || {};
                this.name = props['name'];
                this.disp = props['disp'];
            }
            VideoDevice.parse = function (deviceJSON) {
                var vid = new VideoDevice({
                    name: deviceJSON['name'],
                    disp: deviceJSON['disp']
                });
                return vid;
            };
            VideoDevice.prototype.toXML = function () {
                var xml = new JSON();
                xml['tag'] = 'dev';
                xml['name'] = this.name;
                xml['disp'] = this.disp;
                return XML.parseJSON(xml);
            };
            return VideoDevice;
        })();
        system.VideoDevice = VideoDevice;
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
                return this.detail === undefined ? '' : this.detail;
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
    var system;
    (function (system) {
        var iApp = internal.App;
        (function (WindowState) {
            WindowState[WindowState["HIDE"] = 0] = "HIDE";
            WindowState[WindowState["SHOWNORMAL"] = 1] = "SHOWNORMAL";
            WindowState[WindowState["SHOWMINIMIZED"] = 2] = "SHOWMINIMIZED";
            WindowState[WindowState["MAXIMIZE"] = 3] = "MAXIMIZE";
            WindowState[WindowState["SHOWNOACTIVATE"] = 4] = "SHOWNOACTIVATE";
            WindowState[WindowState["SHOW"] = 5] = "SHOW";
            WindowState[WindowState["MINIMIZE"] = 6] = "MINIMIZE";
            WindowState[WindowState["SHOWMINNOACTIVE"] = 7] = "SHOWMINNOACTIVE";
            WindowState[WindowState["SHOWNA"] = 8] = "SHOWNA";
            WindowState[WindowState["RESTORE"] = 9] = "RESTORE";
        })(system.WindowState || (system.WindowState = {}));
        var WindowState = system.WindowState;
        var Window = (function () {
            function Window() {
            }
            Object.defineProperty(Window.prototype, "hwnd", {
                get: function () {
                    return this._hwnd;
                },
                set: function (val) {
                    this._hwnd = Number(val);
                    this._pid = Number(iApp.callDll('xsplit.GetWindowProcessId', String(this._hwnd)));
                    this._title = iApp.callDll('xsplit.GetWindowTitle', String(this._hwnd));
                    this._state = Number(iApp.callDll('xsplit.GetWindowState', String(this._hwnd)));
                    this._detail = iApp.callDll('xsplit.GetProcessDetails', String(this._pid));
                },
                enumerable: true,
                configurable: true
            });
            Window.prototype.getPID = function () {
                return this._pid;
            };
            Window.prototype.getTitle = function () {
                return this._title;
            };
            Window.prototype.getState = function () {
                return this._state;
            };
            Window.prototype.getDetail = function () {
                return this._detail;
            };
            Window.parse = function (args) {
                var win = new Window();
                if (args.hwnd) {
                    win.hwnd = args.hwnd;
                }
                return win;
            };
            return Window;
        })();
        system.Window = Window;
    })(system = xui.system || (xui.system = {}));
})(xui || (xui = {}));
/// <reference path="../_references.ts" />
var xui;
(function (xui) {
    var system;
    (function (system) {
        var iApp = internal.App;
        var Window = xui.system.Window;
        (function (AudioDeviceDataflow) {
            AudioDeviceDataflow[AudioDeviceDataflow["RENDER"] = 1] = "RENDER";
            AudioDeviceDataflow[AudioDeviceDataflow["CAPTURE"] = 2] = "CAPTURE";
            AudioDeviceDataflow[AudioDeviceDataflow["ALL"] = 3] = "ALL";
        })(system.AudioDeviceDataflow || (system.AudioDeviceDataflow = {}));
        var AudioDeviceDataflow = system.AudioDeviceDataflow;
        (function (AudioDeviceState) {
            AudioDeviceState[AudioDeviceState["ACTIVE"] = 1] = "ACTIVE";
            AudioDeviceState[AudioDeviceState["DISABLED"] = 2] = "DISABLED";
            AudioDeviceState[AudioDeviceState["UNPLUGGED"] = 4] = "UNPLUGGED";
            AudioDeviceState[AudioDeviceState["NOTPRESENT"] = 8] = "NOTPRESENT";
            AudioDeviceState[AudioDeviceState["ALL"] = 15] = "ALL";
        })(system.AudioDeviceState || (system.AudioDeviceState = {}));
        var AudioDeviceState = system.AudioDeviceState;
        var System = (function () {
            function System() {
            }
            /** List audio input and output devices */
            System.getAudioDevices = function (dataflow, state) {
                if (dataflow === void 0) { dataflow = AudioDeviceDataflow.ALL; }
                if (state === void 0) { state = AudioDeviceState.ALL; }
                return new Promise(function (resolve) {
                    iApp.getAsList('wasapienum').then(function (devicesJSON) {
                        var devices = [];
                        if (devicesJSON !== undefined) {
                            for (var i = 0; i < devicesJSON.length; i++) {
                                var device = devicesJSON[i];
                                var bitsState = AudioDeviceState[String(device['state']).toUpperCase().replace(/\s+/g, '')];
                                if ((bitsState & state) !== bitsState) {
                                    continue;
                                }
                                var bitsFlow = AudioDeviceDataflow[String(device['dataflow']).toUpperCase()];
                                if ((bitsFlow & dataflow) !== bitsFlow) {
                                    continue;
                                }
                                devices.push(system.AudioDevice.parse(device));
                            }
                        }
                        resolve(devices);
                    });
                });
            };
            /** List video devices */
            System.getVideoDevices = function () {
                return new Promise(function (resolve) {
                    iApp.getAsList('dshowenum:vsrc').then(function (devicesJSON) {
                        var devs = [];
                        if (devicesJSON !== undefined) {
                            for (var i = 0; i < devicesJSON.length; i++) {
                                if (!/XSplit/ig.test(devicesJSON[i]['name'])) {
                                    devs.push(system.VideoDevice.parse(devicesJSON[i]));
                                }
                            }
                        }
                        resolve(devs);
                    });
                });
            };
            /** List currently running games */
            System.getGames = function () {
                return new Promise(function (resolve) {
                    iApp.getAsList('gsenum').then(function (gamesJSON) {
                        var games = [];
                        if (gamesJSON !== undefined) {
                            for (var i = 0; i < gamesJSON.length; i++) {
                                games.push(system.Game.parse(gamesJSON[i]));
                            }
                        }
                        resolve(games);
                    });
                });
            };
            /** Get currently running process */
            System.getProcesses = function () {
                return new Promise(function (resolve) {
                    var list = (iApp.callDll('xsplit.EnumProcesses') || '').split(',');
                    var processes = [];
                    for (var i = 0; i < list.length; i++) {
                        processes.push(new system.Process().setPid(Number(list[i])));
                    }
                    resolve(processes);
                });
            };
            /** Lists all visible windows */
            System.getVisibleWindows = function () {
                return new Promise(function (resolve) {
                    var list = (iApp.callDll('xsplit.EnumParentWindows') || '').split(',');
                    var windows = [];
                    for (var i = 0; i < list.length; i++) {
                        windows.push(Window.parse({ hwnd: Number(list[i]) }));
                    }
                    resolve(windows);
                });
            };
            /** Gets the active or foreground window */
            System.getActiveWindow = function () {
                return Promise.resolve(Window.parse({
                    hwnd: Number(iApp.callDll('xsplit.GetForegroundWindow'))
                }));
            };
            return System;
        })();
        system.System = System;
    })(system = xui.system || (xui.system = {}));
})(xui || (xui = {}));
/// <reference path="../_references.ts" />
var xui;
(function (xui) {
    var core;
    (function (core) {
        var iItem = internal.Item;
        var JSON = internal.utils.JSON;
        var XML = internal.utils.XML;
        (function (ItemTypes) {
            ItemTypes[ItemTypes["UNDEFINED"] = 0] = "UNDEFINED";
            ItemTypes[ItemTypes["FILE"] = 1] = "FILE";
            ItemTypes[ItemTypes["LIVE"] = 2] = "LIVE";
            ItemTypes[ItemTypes["TEXT"] = 3] = "TEXT";
            ItemTypes[ItemTypes["BITMAP"] = 4] = "BITMAP";
            ItemTypes[ItemTypes["SCREEN"] = 5] = "SCREEN";
            ItemTypes[ItemTypes["FLASHFILE"] = 6] = "FLASHFILE";
            ItemTypes[ItemTypes["GAMESOURCE"] = 7] = "GAMESOURCE";
            ItemTypes[ItemTypes["HTML"] = 8] = "HTML";
        })(core.ItemTypes || (core.ItemTypes = {}));
        var ItemTypes = core.ItemTypes;
        var Item = (function () {
            function Item(props) {
                props = props ? props : {};
                this.name = props['name'];
                this.id = props['id'];
                this.sceneID = props['sceneID'];
                this.viewID = props['viewID'];
                this.value = props['value'];
                this.keepLoaded = props['keeploaded'];
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
                        _this.type = ItemTypes[ItemTypes[Number(val)]];
                        resolve(_this.type);
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
            /** Get the current source (when called for sources), or the source that
             * was right-clicked to open the config window (when called from the
             * config window). */
            Item.prototype.getCurrentSource = function () {
                var item = new Item({
                    id: iItem.getBaseID(),
                    view: 0 // always MAIN
                });
                return item;
            };
            return Item;
        })();
        core.Item = Item;
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
            ItemLayout.prototype.isKeepAspectRatio = function () {
                var _this = this;
                return new Promise(function (resolve) {
                    iItem.attach(_this.id, _this.viewID);
                    iItem.get('prop:keep_ar').then(function (val) {
                        resolve(val === '1');
                    });
                });
            };
            ItemLayout.prototype.setKeepAspectRatio = function (value) {
                iItem.attach(this.id, this.viewID);
                iItem.set('prop:keep_ar', value ? '1' : '0');
            };
            ItemLayout.prototype.isPositionLocked = function () {
                var _this = this;
                return new Promise(function (resolve) {
                    iItem.attach(_this.id, _this.viewID);
                    iItem.get('prop:lockmove').then(function (val) {
                        resolve(val === '1');
                    });
                });
            };
            ItemLayout.prototype.setPositionLocked = function (value) {
                iItem.attach(this.id, this.viewID);
                iItem.set('prop:lockmove', value ? '1' : '0');
            };
            ItemLayout.prototype.isEnhanceResizeEnabled = function () {
                var _this = this;
                return new Promise(function (resolve) {
                    iItem.attach(_this.id, _this.viewID);
                    iItem.get('prop:mipmaps').then(function (val) {
                        resolve(val === '1');
                    });
                });
            };
            ItemLayout.prototype.setEnhanceResizeEnabled = function (value) {
                iItem.attach(this.id, this.viewID);
                iItem.set('prop:mipmaps', value ? '1' : '0');
            };
            ItemLayout.prototype.isPixelAlignmentEnabled = function () {
                var _this = this;
                return new Promise(function (resolve) {
                    iItem.attach(_this.id, _this.viewID);
                    iItem.get('prop:pixalign').then(function (val) {
                        resolve(val === '1');
                    });
                });
            };
            ItemLayout.prototype.setPixelAlignmentEnabled = function (value) {
                iItem.attach(this.id, this.viewID);
                iItem.set('prop:pixalign', value ? '1' : '0');
            };
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
            ItemLayout.prototype.setPosition = function (value) {
                iItem.attach(this.id, this.viewID);
                this.position = value;
                iItem.set('prop:pos', value.toString());
            };
            return ItemLayout;
        })();
        internal.utils.applyMixins(core.Item, [ItemLayout]);
    })(core = xui.core || (xui.core = {}));
})(xui || (xui = {}));
/// <reference path="../../_references.ts" />
var xui;
(function (xui) {
    var core;
    (function (core) {
        var iItem = internal.Item;
        var Color = internal.utils.Color;
        var ItemColor = (function () {
            function ItemColor() {
            }
            ItemColor.prototype.getTransparency = function () {
                var _this = this;
                return new Promise(function (resolve) {
                    iItem.attach(_this.id, _this.viewID);
                    iItem.get('prop:alpha').then(function (val) {
                        resolve(Number(val));
                    });
                });
            };
            ItemColor.prototype.setTransparency = function (value) {
                iItem.attach(this.id, this.viewID);
                value = value < 0 ? 0 : value > 255 ? 255 : value;
                iItem.set('prop:alpha', String(value));
            };
            ItemColor.prototype.getBrightness = function () {
                var _this = this;
                return new Promise(function (resolve) {
                    iItem.attach(_this.id, _this.viewID);
                    iItem.get('prop:cc_brightness').then(function (val) {
                        resolve(Number(val));
                    });
                });
            };
            ItemColor.prototype.setBrightness = function (value) {
                iItem.attach(this.id, this.viewID);
                value = value < -100 ? -100 : value > 100 ? 100 : value;
                iItem.set('prop:cc_brightness', String(value));
            };
            ItemColor.prototype.getContrast = function () {
                var _this = this;
                return new Promise(function (resolve) {
                    iItem.attach(_this.id, _this.viewID);
                    iItem.get('prop:cc_contrast').then(function (val) {
                        resolve(Number(val));
                    });
                });
            };
            ItemColor.prototype.setContrast = function (value) {
                iItem.attach(this.id, this.viewID);
                value = value < -100 ? -100 : value > 100 ? 100 : value;
                iItem.set('prop:cc_contrast', String(value));
            };
            ItemColor.prototype.getHue = function () {
                var _this = this;
                return new Promise(function (resolve) {
                    iItem.attach(_this.id, _this.viewID);
                    iItem.get('prop:cc_hue').then(function (val) {
                        resolve(Number(val));
                    });
                });
            };
            ItemColor.prototype.setHue = function (value) {
                iItem.attach(this.id, this.viewID);
                value = value < -180 ? -180 : value > 180 ? 180 : value;
                iItem.set('prop:cc_hue', String(value));
            };
            ItemColor.prototype.getSaturation = function () {
                var _this = this;
                return new Promise(function (resolve) {
                    iItem.attach(_this.id, _this.viewID);
                    iItem.get('prop:cc_saturation').then(function (val) {
                        resolve(Number(val));
                    });
                });
            };
            ItemColor.prototype.setSaturation = function (value) {
                iItem.attach(this.id, this.viewID);
                value = value < -100 ? -100 : value > 100 ? 100 : value;
                iItem.set('prop:cc_saturation', String(value));
            };
            ItemColor.prototype.getBorderColor = function () {
                var _this = this;
                return new Promise(function (resolve) {
                    iItem.attach(_this.id, _this.viewID);
                    iItem.get('prop:border').then(function (val) {
                        var bgr = Number(val) - 0x80000000;
                        var color = new Color();
                        color.setIbgr(bgr);
                        resolve(color);
                    });
                });
            };
            ItemColor.prototype.setBorderColor = function (value) {
                iItem.attach(this.id, this.viewID);
                iItem.set('prop:border', String(value.getIbgr() - 0x80000000));
            };
            return ItemColor;
        })();
        internal.utils.applyMixins(core.Item, [ItemColor]);
    })(core = xui.core || (xui.core = {}));
})(xui || (xui = {}));
/// <reference path="../../_references.ts" />
var xui;
(function (xui) {
    var core;
    (function (core) {
        var iItem = internal.Item;
        var ItemAudio = (function () {
            function ItemAudio() {
            }
            ItemAudio.prototype.getVolume = function () {
                var _this = this;
                return new Promise(function (resolve) {
                    iItem.attach(_this.id, _this.viewID);
                    iItem.get('prop:volume').then(function (val) {
                        resolve(Number(val));
                    });
                });
            };
            ItemAudio.prototype.setVolume = function (value) {
                iItem.attach(this.id, this.viewID);
                value = value < 0 ? 0 : value > 100 ? 100 : value;
                iItem.set('prop:volume', String(value));
            };
            ItemAudio.prototype.isMuted = function () {
                var _this = this;
                return new Promise(function (resolve) {
                    iItem.attach(_this.id, _this.viewID);
                    iItem.get('prop:mute').then(function (val) {
                        resolve(val === '1');
                    });
                });
            };
            ItemAudio.prototype.setMuted = function (value) {
                iItem.attach(this.id, this.viewID);
                iItem.set('prop:mute', value ? '1' : '0');
            };
            return ItemAudio;
        })();
        internal.utils.applyMixins(core.Item, [ItemAudio]);
    })(core = xui.core || (xui.core = {}));
})(xui || (xui = {}));
/// <reference path="../../_references.ts" />
var xui;
(function (xui) {
    var core;
    (function (core) {
        var iItem = internal.Item;
        var ItemWindow = (function () {
            function ItemWindow() {
            }
            ItemWindow.prototype.isWindowTracking = function () {
                var _this = this;
                return new Promise(function (resolve) {
                    iItem.attach(_this.id, _this.viewID);
                    iItem.get('prop:ScrCapTrackWindowTitle').then(function (val) {
                        resolve(val === '0');
                    });
                });
            };
            ItemWindow.prototype.setWindowTracking = function (value) {
                iItem.attach(this.id, this.viewID);
                iItem.set('prop:ScrCapTrackWindowTitle', (value ? '0' : '1'));
            };
            return ItemWindow;
        })();
        internal.utils.applyMixins(core.Item, [ItemWindow]);
    })(core = xui.core || (xui.core = {}));
})(xui || (xui = {}));
/// <reference path="../../_references.ts" />
var xui;
(function (xui) {
    var core;
    (function (core) {
        var iItem = internal.Item;
        var ItemVideo = (function () {
            function ItemVideo() {
            }
            ItemVideo.prototype.getCuePoints = function () {
                var _this = this;
                return new Promise(function (resolve) {
                    iItem.attach(_this.id, _this.viewID);
                    iItem.get('prop:CuePoints').then(function (val) {
                        var cuepoints;
                        ;
                        var ret;
                        cuepoints = val.split(',');
                        ret = cuepoints.map(function (value) {
                            return Number(value) / 10;
                        });
                        resolve(ret);
                    });
                });
            };
            return ItemVideo;
        })();
        internal.utils.applyMixins(core.Item, [ItemVideo]);
    })(core = xui.core || (xui.core = {}));
})(xui || (xui = {}));
/// <reference path="../../_references.ts" />
var xui;
(function (xui) {
    var core;
    (function (core) {
        var iItem = internal.Item;
        var Color = internal.utils.Color;
        (function (ChromaTypes) {
            ChromaTypes[ChromaTypes["KEY"] = 0] = "KEY";
            ChromaTypes[ChromaTypes["COLOR"] = 1] = "COLOR";
            ChromaTypes[ChromaTypes["RGB"] = 2] = "RGB";
        })(core.ChromaTypes || (core.ChromaTypes = {}));
        var ChromaTypes = core.ChromaTypes;
        (function (ChromaPrimaryColors) {
            ChromaPrimaryColors[ChromaPrimaryColors["RED"] = 0] = "RED";
            ChromaPrimaryColors[ChromaPrimaryColors["GREEN"] = 1] = "GREEN";
            ChromaPrimaryColors[ChromaPrimaryColors["BLUE"] = 2] = "BLUE";
        })(core.ChromaPrimaryColors || (core.ChromaPrimaryColors = {}));
        var ChromaPrimaryColors = core.ChromaPrimaryColors;
        (function (ChromaAntiAlias) {
            ChromaAntiAlias[ChromaAntiAlias["NONE"] = 0] = "NONE";
            ChromaAntiAlias[ChromaAntiAlias["LOW"] = 1] = "LOW";
            ChromaAntiAlias[ChromaAntiAlias["HIGH"] = 2] = "HIGH";
        })(core.ChromaAntiAlias || (core.ChromaAntiAlias = {}));
        var ChromaAntiAlias = core.ChromaAntiAlias;
        var ItemChroma = (function () {
            function ItemChroma() {
            }
            ItemChroma.prototype.isChromaEnabled = function () {
                var _this = this;
                return new Promise(function (resolve) {
                    iItem.attach(_this.id, _this.viewID);
                    iItem.get('prop:key_chromakey').then(function (val) {
                        resolve(val === '1');
                    });
                });
            };
            ItemChroma.prototype.setChromaEnabled = function (value) {
                iItem.attach(this.id, this.viewID);
                iItem.set('prop:key_chromakey', value ? '1' : '0');
            };
            ItemChroma.prototype.getChromaBrightness = function () {
                var _this = this;
                return new Promise(function (resolve) {
                    iItem.attach(_this.id, _this.viewID);
                    iItem.get('prop:key_chromabr').then(function (val) {
                        resolve(Number(val));
                    });
                });
            };
            ItemChroma.prototype.setChromaBrightness = function (value) {
                iItem.attach(this.id, this.viewID);
                value = value < 0 ? 0 : value > 255 ? 255 : value;
                iItem.set('prop:key_chromabr', String(value));
            };
            ItemChroma.prototype.getChromaSaturation = function () {
                var _this = this;
                return new Promise(function (resolve) {
                    iItem.attach(_this.id, _this.viewID);
                    iItem.get('prop:key_chromasat').then(function (val) {
                        resolve(Number(val));
                    });
                });
            };
            ItemChroma.prototype.setChromaSaturation = function (value) {
                iItem.attach(this.id, this.viewID);
                value = value < 0 ? 0 : value > 255 ? 255 : value;
                iItem.set('prop:key_chromasat', String(value));
            };
            ItemChroma.prototype.getChromaHue = function () {
                var _this = this;
                return new Promise(function (resolve) {
                    iItem.attach(_this.id, _this.viewID);
                    iItem.get('prop:key_chromahue').then(function (val) {
                        resolve(Number(val));
                    });
                });
            };
            ItemChroma.prototype.setChromaHue = function (value) {
                iItem.attach(this.id, this.viewID);
                value = value < -180 ? -180 : value > 180 ? 180 : value;
                iItem.set('prop:key_chromahue', String(value));
            };
            ItemChroma.prototype.getChromaType = function () {
                var _this = this;
                return new Promise(function (resolve) {
                    iItem.attach(_this.id, _this.viewID);
                    iItem.get('prop:key_chromakeytype').then(function (val) {
                        resolve(Number(val));
                    });
                });
            };
            ItemChroma.prototype.setChromaType = function (value) {
                iItem.attach(this.id, this.viewID);
                value = value < 0 ? 0 : value > 2 ? 2 : value;
                iItem.set('prop:key_chromakeytype', String(value));
            };
            ItemChroma.prototype.getChromaColor = function () {
                var _this = this;
                return new Promise(function (resolve) {
                    iItem.attach(_this.id, _this.viewID);
                    iItem.get('prop:key_colorrgb').then(function (val) {
                        var color = new Color();
                        color.setBgr(val);
                        resolve(color);
                    });
                });
            };
            ItemChroma.prototype.setChromaColor = function (value) {
                iItem.attach(this.id, this.viewID);
                iItem.set('prop:key_colorrgb', value.getBgr());
            };
            ItemChroma.prototype.getChromaPrimaryColor = function () {
                var _this = this;
                return new Promise(function (resolve) {
                    iItem.attach(_this.id, _this.viewID);
                    iItem.get('prop:key_chromargbkeyprimary').then(function (val) {
                        resolve(Number(val));
                    });
                });
            };
            ItemChroma.prototype.setChromaPrimaryColor = function (value) {
                iItem.attach(this.id, this.viewID);
                value = value < 0 ? 0 : value > 2 ? 2 : value;
                iItem.set('prop:key_chromargbkeyprimary', String(value));
            };
            ItemChroma.prototype.getChromaBalance = function () {
                var _this = this;
                return new Promise(function (resolve) {
                    iItem.attach(_this.id, _this.viewID);
                    iItem.get('prop:key_chromargbkeybalance').then(function (val) {
                        resolve(Number(val));
                    });
                });
            };
            ItemChroma.prototype.setChromaBalance = function (value) {
                iItem.attach(this.id, this.viewID);
                value = value < 0 ? 0 : value > 255 ? 255 : value;
                iItem.set('prop:key_chromargbkeybalance', String(value));
            };
            ItemChroma.prototype.getChromaAntiAlias = function () {
                var _this = this;
                return new Promise(function (resolve) {
                    iItem.attach(_this.id, _this.viewID);
                    iItem.get('prop:key_antialiasing').then(function (val) {
                        resolve(Number(val));
                    });
                });
            };
            ItemChroma.prototype.setChromaAntiAlias = function (value) {
                iItem.attach(this.id, this.viewID);
                value = value < 0 ? 0 : value > 2 ? 2 : value;
                iItem.set('prop:key_antialiasing', String(value));
            };
            ItemChroma.prototype.getChromaThreshold = function () {
                var _this = this;
                return new Promise(function (resolve) {
                    iItem.attach(_this.id, _this.viewID);
                    iItem.get('prop:key_chromarang').then(function (val) {
                        resolve(Number(val));
                    });
                });
            };
            ItemChroma.prototype.setChromaThreshold = function (value) {
                iItem.attach(this.id, this.viewID);
                value = value < 0 ? 0 : value > 255 ? 255 : value;
                iItem.set('prop:key_chromarang', String(value));
            };
            ItemChroma.prototype.getChromaThresholdAA = function () {
                var _this = this;
                return new Promise(function (resolve) {
                    iItem.attach(_this.id, _this.viewID);
                    iItem.get('prop:key_chromaranga').then(function (val) {
                        resolve(Number(val));
                    });
                });
            };
            ItemChroma.prototype.setChromaThresholdAA = function (value) {
                iItem.attach(this.id, this.viewID);
                value = value < 0 ? 0 : value > 255 ? 255 : value;
                iItem.set('prop:key_chromaranga', String(value));
            };
            return ItemChroma;
        })();
        internal.utils.applyMixins(core.Item, [ItemChroma]);
    })(core = xui.core || (xui.core = {}));
})(xui || (xui = {}));
/// <reference path="../../_references.ts" />
var xui;
(function (xui) {
    var core;
    (function (core) {
        var iItem = internal.Item;
        (function (PlaybackEndAction) {
            PlaybackEndAction[PlaybackEndAction["NOTHING"] = 0] = "NOTHING";
            PlaybackEndAction[PlaybackEndAction["REWIND"] = 1] = "REWIND";
            PlaybackEndAction[PlaybackEndAction["LOOP"] = 2] = "LOOP";
            PlaybackEndAction[PlaybackEndAction["HIDE"] = 3] = "HIDE";
        })(core.PlaybackEndAction || (core.PlaybackEndAction = {}));
        var PlaybackEndAction = core.PlaybackEndAction;
        var ItemPlayback = (function () {
            function ItemPlayback() {
            }
            ItemPlayback.prototype.getPlaybackStartPos = function () {
                var _this = this;
                return new Promise(function (resolve) {
                    iItem.attach(_this.id, _this.viewID);
                    iItem.get('prop:InPoint').then(function (val) {
                        resolve(Number(val) / 10);
                    });
                });
            };
            ItemPlayback.prototype.setPlaybackStartPos = function (value) {
                iItem.attach(this.id, this.viewID);
                value = value < 0 ? 0 : value;
                iItem.set('prop:InPoint', String(value * 10));
            };
            ItemPlayback.prototype.getPlaybackEndPos = function () {
                var _this = this;
                return new Promise(function (resolve) {
                    iItem.attach(_this.id, _this.viewID);
                    iItem.get('prop:OutPoint').then(function (val) {
                        resolve(Number(val) / 10);
                    });
                });
            };
            ItemPlayback.prototype.setPlaybackEndPos = function (value) {
                iItem.attach(this.id, this.viewID);
                value = value < 0 ? 0 : value;
                iItem.set('prop:OutPoint', String(value * 10));
            };
            ItemPlayback.prototype.getPlaybackEndAction = function () {
                var _this = this;
                return new Promise(function (resolve) {
                    iItem.attach(_this.id, _this.viewID);
                    iItem.get('prop:OpWhenFinished').then(function (val) {
                        resolve(Number(val));
                    });
                });
            };
            ItemPlayback.prototype.setPlaybackEndAction = function (value) {
                iItem.attach(this.id, this.viewID);
                iItem.set('prop:OpWhenFinished', String(value));
            };
            ItemPlayback.prototype.getPlaybackDuration = function () {
                var _this = this;
                return new Promise(function (resolve) {
                    iItem.attach(_this.id, _this.viewID);
                    iItem.get('sync:duration').then(function (val) {
                        resolve(Number(val));
                    });
                });
            };
            ItemPlayback.prototype.setPlaybackDuration = function (value) {
                iItem.attach(this.id, this.viewID);
                iItem.set('sync:duration', String(value));
            };
            return ItemPlayback;
        })();
        internal.utils.applyMixins(core.Item, [ItemPlayback]);
    })(core = xui.core || (xui.core = {}));
})(xui || (xui = {}));
/// <reference path="../_references.ts" />
var xui;
(function (xui) {
    var core;
    (function (core) {
        var iApp = internal.App;
        var Item = xui.core.Item;
        var Scene = (function () {
            function Scene(props) {
                this.id = props['id'];
                this.viewID = props['viewID'];
            }
            Scene.prototype.getID = function () {
                return this.id;
            };
            Scene.prototype.getViewID = function () {
                return this.viewID;
            };
            Scene.prototype.getItems = function () {
                var _this = this;
                return new Promise(function (resolve) {
                    iApp.getAsList('presetconfig:' + _this.id).then(function (jsonArr) {
                        var retArray = [];
                        if (Array.isArray(jsonArr)) {
                            for (var i = 0; i < jsonArr.length; i++) {
                                jsonArr[i]['sceneID'] = _this.id;
                                jsonArr[i]['viewID'] = parseInt(_this.viewID);
                                var item = new Item(jsonArr[i]);
                                retArray.push(item);
                            }
                        }
                        resolve(retArray);
                    });
                });
            };
            Scene.prototype.isEmpty = function () {
                var _this = this;
                return new Promise(function (resolve) {
                    iApp.get('presetisempty:' + _this.id).then(function (val) {
                        resolve(val === '1');
                    });
                });
            };
            Scene.prototype.getName = function () {
                var _this = this;
                return new Promise(function (resolve) {
                    iApp.get('presetname:' + _this.id).then(function (val) {
                        resolve(val);
                    });
                });
            };
            return Scene;
        })();
        core.Scene = Scene;
    })(core = xui.core || (xui.core = {}));
})(xui || (xui = {}));
/// <reference path="../_references.ts" />
var xui;
(function (xui) {
    var core;
    (function (core) {
        var iApp = internal.App;
        var Scene = xui.core.Scene;
        var Views;
        (function (Views) {
            Views[Views["MAIN"] = 0] = "MAIN";
            Views[Views["PREVIEW"] = 1] = "PREVIEW";
        })(Views || (Views = {}));
        var View = (function () {
            function View(id) {
                this.id = id || 0;
            }
            View.prototype.getViewID = function () {
                return this.id;
            };
            View.prototype.getScenes = function (filter) {
                var _this = this;
                filter = filter ? filter : {};
                return new Promise(function (resolve) {
                    var ret = [];
                    var regex = new RegExp(filter['name'], 'gi');
                    iApp.getAsList('presetconfig').then(function (config) {
                        for (var i = 0; i < config.length; i++) {
                            if (config[i]['tag'] === 'global') {
                                continue;
                            }
                            if ((filter['name'] && regex.test(config[i]['name'])) ||
                                filter['id'] === (i + 1) ||
                                Object.keys(filter).length === 0) {
                                ret.push(new Scene({ id: i, viewID: _this.id }));
                            }
                        }
                        resolve(ret);
                    });
                });
            };
            View.prototype.getScenesCount = function () {
                return new Promise(function (resolve) {
                    iApp.get('presetcount').then(function (count) {
                        resolve(count);
                    });
                });
            };
            View.prototype.setActiveScene = function (scene) {
                if (typeof scene === "object") {
                    iApp.set('preset', scene.getID().toString());
                }
                else if (typeof scene === "number") {
                    iApp.set('preset', scene.toString());
                }
            };
            View.prototype.getActiveScene = function () {
                var _this = this;
                return new Promise(function (resolve) {
                    iApp.get('preset:' + _this.id).then(function (sceneID) {
                        var scene = new Scene({ id: sceneID, viewID: _this.id });
                        resolve(scene);
                    });
                });
            };
            View.prototype.getScene = function (sceneID) {
                var _this = this;
                return new Promise(function (resolve) {
                    resolve(new Scene({ id: sceneID, viewID: _this.id }));
                });
            };
            View.prototype.searchItems = function (value) {
                var _this = this;
                if (value['id'] === undefined && value['keyword'] === undefined) {
                    return;
                }
                var keyword = value['keyword'];
                var iID = value['id'];
                var matches = [];
                var pItems = [];
                // @TODO: Discuss if this is an 'ok' approach
                var _parseItems = function (resolve) {
                    pItems.forEach(function (item, idx) {
                        item.getID().then(function (id) {
                            if (Number(id) === iID) {
                                matches.push(item);
                            }
                            else {
                                return item.getName();
                            }
                        }).then(function (name) {
                            if (name.match(keyword) !== null) {
                                matches.push(item);
                            }
                            else {
                                return item.getValue();
                            }
                        }).then(function (val) {
                            if (val.value.match(keyword) !== null) {
                                matches.push(item);
                            }
                            if (idx === pItems.length - 1) {
                                resolve(matches);
                            }
                        });
                    });
                };
                return new Promise(function (resolve) {
                    _this.getScenes().then(function (scenes) {
                        scenes.forEach(function (scene, idx) {
                            scene.getItems().then(function (items) {
                                if (items.length > 0) {
                                    pItems = pItems.concat(items);
                                }
                                // Valid scene is only until index 11
                                if (idx === 11) {
                                    _parseItems(resolve);
                                }
                            });
                        });
                    });
                });
            };
            View.MAIN = new View(Views.MAIN);
            View.PREVIEW = new View(Views.PREVIEW);
            return View;
        })();
        core.View = View;
    })(core = xui.core || (xui.core = {}));
})(xui || (xui = {}));
/// <reference path="../_references.ts" />
var xui;
(function (xui) {
    var core;
    (function (core) {
        var Scene = xui.core.Scene;
        var JSON = internal.utils.JSON;
        var XML = internal.utils.XML;
        var Presentation = (function () {
            function Presentation(props) {
                this.currentScene = new Scene({
                    id: props['currentScene'],
                    viewID: '1'
                });
                this.version = props['version'];
                this.sceneDetails = props['placements'];
                this.global = props['global'];
            }
            Presentation.prototype.toXML = function () {
                var xml = new JSON();
                xml['tag'] = 'configuration';
                xml['cur'] = this.currentScene.getID();
                xml['Version'] = this.version;
                xml['children'] = [];
                for (var i = 0; i < this.sceneDetails.length; i++) {
                    var scene = this.sceneDetails[i];
                    var sceneNode = {};
                    sceneNode['tag'] = 'placement';
                    sceneNode['name'] = this.sceneDetails[i]['name'];
                    sceneNode['defpos'] = this.sceneDetails[i]['defpos'];
                    var sceneItems = this.sceneDetails[i]['items'];
                    for (var j = 0; j < sceneItems.length; j++) {
                        var item = sceneItems[j]['item'];
                        if (item !== undefined) {
                            sceneItems[j]['item'] = XML.encode(item);
                        }
                        sceneItems[j]['name'] = XML.encode(sceneItems[j]['name']);
                    }
                    sceneNode['children'] = sceneItems;
                    xml['children'].push(sceneNode);
                }
                var globalNode = {};
                globalNode['tag'] = 'global';
                var globalItems = this.global['children'];
                if (globalItems !== undefined) {
                    for (var k = 0; k < globalItems['length']; k++) {
                        globalItems[k]['id'] = XML.encode(globalItems[k]['id']);
                    }
                    globalNode['children'] = globalItems;
                    xml['children'].push(globalNode);
                }
                return XML.parseJSON(xml);
            };
            return Presentation;
        })();
        core.Presentation = Presentation;
    })(core = xui.core || (xui.core = {}));
})(xui || (xui = {}));
/// <reference path="../_references.ts" />
var xui;
(function (xui) {
    var core;
    (function (core) {
        var Rectangle = internal.utils.Rectangle;
        var AudioDevice = xui.system.AudioDevice;
        var iApp = internal.App;
        var JSON = internal.utils.JSON;
        var XML = internal.utils.XML;
        var Presentation = xui.core.Presentation;
        var View = xui.core.View;
        function createSceneXML(scene) {
            var id = scene.getID();
            return new Promise(function (resolve) {
                iApp.get('presetconfig:' + id).then(function (xml) {
                    return JSON.parse(xml);
                }).then(function (xml) {
                    scene['defpos'] = xml['defpos'];
                    scene['items'] = xml.children !== undefined ? xml.children : [];
                    return scene.getName();
                }).then(function (name) {
                    scene['name'] = name;
                    resolve(scene);
                });
            });
        }
        function getGlobalNode() {
            return new Promise(function (resolve) {
                iApp.getAsList('presetconfig').then(function (val) {
                    resolve(val[val.length - 1]);
                });
            });
        }
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
                    iApp.get('frametime').then(function (val) {
                        resolve(val);
                    });
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
                            return AudioDevice.parse(val);
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
                iApp.set('microphonegain', XML.parseJSON(config).toString());
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
            // Presentation services
            App.getCurrentPresentation = function () {
                return new Promise(function (resolve) {
                    var active, version, presentation, placements, global;
                    View.MAIN.getActiveScene().then(function (activeScene) {
                        active = activeScene;
                        return App.getVersion();
                    }).then(function (v) {
                        version = v;
                        return View.MAIN.getScenes();
                    }).then(function (scenes) {
                        return Promise.all(scenes.map(function (scene, index, scenes) {
                            if (index !== scenes.length) {
                                return createSceneXML(scene);
                            }
                            else
                                return Promise.resolve(scene);
                        }));
                    }).then(function (scenes) {
                        // scenes should now have item array
                        placements = scenes;
                        return getGlobalNode();
                    }).then(function (node) {
                        global = node;
                        presentation = new Presentation({
                            currentScene: active.getID(),
                            version: version,
                            placements: placements,
                            global: global
                        });
                        resolve(presentation);
                    });
                });
            };
            /** Loads a Presentation object **/
            App.load = function (pres) {
                iApp.callFunc('loadpresets', pres.toXML().toString());
            };
            /** Saves the current presentation to a file path **/
            App.save = function (filename) {
                iApp.callFunc('savepresets', filename);
            };
            /** Clear the presentation, and go to the first scene **/
            App.clearPresentation = function () {
                iApp.callFunc('newpresets', '');
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
/// <reference path="defs/es6-promise.d.ts" />
/// <reference path="../dist/internal.d.ts" />
/// <reference path="system/audio.ts" />
/// <reference path="system/video.ts" />
/// <reference path="system/process.ts" />
/// <reference path="system/game.ts" />
/// <reference path="system/window.ts" />
/// <reference path="system/system.ts" />
/// <reference path="core/item.ts" />
/// <reference path="core/item/layout.ts" />
/// <reference path="core/item/color.ts" />
/// <reference path="core/item/audio.ts" />
/// <reference path="core/item/window.ts" />
/// <reference path="core/item/video.ts" />
/// <reference path="core/item/chroma.ts" />
/// <reference path="core/item/playback.ts" />
/// <reference path="core/scene.ts" />
/// <reference path="core/view.ts" />
/// <reference path="core/presentation.ts" />
/// <reference path="core/app.ts" />
/// <reference path="core/channel.ts" />

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

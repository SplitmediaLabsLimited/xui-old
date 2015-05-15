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
                if (params.length === 2) {
                    rect.width = Number(params[0]);
                    rect.height = Number(params[1]);
                }
                return rect;
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
        App.callDll = function () {
            var args = [].slice.call(arguments);
            args.unshift('CallDll');
            return internal.exec.apply(this, args);
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
/// <reference path="../defs/es6-promise.d.ts" />
/// <reference path="utils/color.ts" />
/// <reference path="utils/point.ts" />
/// <reference path="utils/rectangle.ts" />
/// <reference path="utils/thread.ts" />
/// <reference path="utils/xml.ts" />
/// <reference path="utils/json.ts" />
/// <reference path="internal.ts" />
/// <reference path="app.ts" />
/// <reference path="item.ts" /> 

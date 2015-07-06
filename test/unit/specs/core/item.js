/* globals describe, it, expect, beforeAll, xui, internal */

describe('xui.core.Item', function() {
    'use strict';

    var scene;
    var items = [];

    beforeAll(function(done) {
        xui.core.Scene.get().then(function(value) {
            scene = value;
            return scene.getItems();
        }).then(function(val) {
            if (internal.Environment.isScriptPlugin()) {
                items = val;
                done();
            } else {
                xui.core.Item.getCurrentSource().then(function(ret) {
                    items.push(ret);
                    return scene.getItems();
                }).then(function(ret) {
                    items = items.concat(ret);
                    done();
                });
            }
        });
    });

    describe('should be able to fetch', function() {
        it('the current item', function() {
            if (internal.Environment.isScriptPlugin()) {
                expect(xui.core.Item.getCurrentSource).toThrow();
            } else {
                expect(xui.core.Item.getCurrentSource()).toBeInstanceOf(Promise);
            }
        });

        it('the name', function(done) {
            for (var idx in items) {
                (function(_idx) {
                    items[_idx].getName().then(function(val) {
                        expect(val).toBeDefined();
                        expect(val).not.toEqual('null');

                        if (_idx === (items.length - 1)) {
                            done();
                        }
                    });
                })(Number(idx));
            }
        });

        it('the type', function(done) {
            for (var idx in items) {
                (function(_idx) {
                    items[_idx].getType().then(function(val) {
                        expect(val).toBeTypeOf('number');

                        if (_idx === (items.length - 1)) {
                            done();
                        }
                    });
                })(Number(idx));
            }
        });

        it('the value', function(done) {
            for (var idx in items) {
                (function(_idx) {
                    var type = '';
                    items[_idx].getType().then(function(val) {
                        type = val;
                        
                        return items[_idx].getValue();
                    }).then(function(val) {
                        if (type === 5 || type === 7) {
                            expect(val).toBeInstanceOf(internal.utils.XML);
                        } else {
                            expect(val).toBeTypeOf('string');
                        }

                        if (_idx === (items.length - 1)) {
                            done();
                        }
                    });
                })(Number(idx));
            }
        });

        it('the save source in memory setting', function(done) {
            for (var idx in items) {
                (function(_idx) {
                    items[_idx].getKeepLoaded().then(function(val) {
                        expect(val).toBeTypeOf('boolean');

                        if (_idx === (items.length - 1)) {
                            done();
                        }
                    });
                })(Number(idx));
            }
        });

        it('the ID', function(done) {
            for (var idx in items) {
                (function(_idx) {
                    items[_idx].getID().then(function(val) {
                        expect(val).toBeTypeOf('string');

                        if (_idx === (items.length - 1)) {
                            done();
                        }
                    });
                })(Number(idx));
            }
        });

        it('the Scene ID', function(done) {
            for (var idx in items) {
                (function(_idx) {
                    items[_idx].getSceneID().then(function(val) {
                        expect(val).toBeTypeOf('number');

                        if (_idx === (items.length - 1)) {
                            done();
                        }
                    });
                })(Number(idx));
            }
        });

        it('the View ID', function(done) {
            for (var idx in items) {
                (function(_idx) {
                    items[_idx].getViewID().then(function(val) {
                        expect(val).toBeTypeOf('number');

                        if (_idx === (items.length - 1)) {
                            done();
                        }
                    });
                })(Number(idx));
            }
        });
    });

    it('should be able to parse itself to XML', function() {
        for (var idx in items) {
            expect(items[idx].toXML()).toBeInstanceOf(internal.utils.XML);
        }
    });

    describe('should be able to', function() {
        it('load the configuration', function(done) {
            for (var idx in items) {
                (function(_idx) {
                    items[_idx].loadConfig().then(function(val) {
                        expect(val).toBeTypeOf('object');

                        if (_idx === (items.length - 1)) {
                            done();
                        }
                    });
                })(Number(idx));
            }
        });

        it('save the configuration', function(done) {
            for (var idx in items) {
                (function(_idx) {
                    items[_idx].loadConfig().then(function(val) {
                        if (internal.Environment.isSourceHtml()) {
                            expect(items[_idx].saveConfig(val)).toBeUndefined();
                        } else {
                            expect(items[_idx].saveConfig).toThrow();
                        }

                        if (_idx === (items.length - 1)) {
                            done();
                        }
                    });
                })(Number(idx));
            }
        });

        it('apply the configuration', function(done) {
            for (var idx in items) {
                (function(_idx) {
                    var config = '';
                    expect(items[_idx].applyConfig).not.toThrow();

                    items[_idx].loadConfig().then(function(val) {
                        if (internal.Environment.isSourceHtml()) {
                            expect(items[_idx].saveConfig(val)).toBeUndefined();
                        } else {
                            expect(items[_idx].saveConfig).toThrow();
                        }

                        if (internal.Environment.isSourceHtml()) {
                            var emitter = xui.source.SourceWindow.getInstance();
                            items[_idx].applyConfig(config);
                            emitter.on('apply-config', function(config) {
                                expect(config).toEqual(config);

                                if (_idx === (items.length - 1)) {
                                    done();
                                }
                            });

                            if (_idx === (items.length - 1)) {
                                done();
                            }
                        } else if (_idx === (items.length - 1)) {
                            done();
                        }
                    });
                })(Number(idx));
            }
        });
    });
});

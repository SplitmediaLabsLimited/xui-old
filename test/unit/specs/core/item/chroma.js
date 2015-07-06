/* globals describe, it, expect, beforeAll, xui, internal */

describe('xui.core.ItemChroma', function() {
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
        it('the chroma enabled status', function(done) {
            for (var idx in items) {
                (function(_idx) {
                    items[_idx].isChromaEnabled().then(function(val) {
                        expect(val).toBeTypeOf('boolean');

                        if (_idx === (items.length - 1)) {
                            done();
                        }
                    });
                })(Number(idx));
            }
        });

        it('the chroma brightness', function(done) {
            for (var idx in items) {
                (function(_idx) {
                    items[_idx].getChromaBrightness().then(function(val) {
                        expect(val).toBeTypeOf('number');
                        expect(val).toBeLessThan(256);
                        expect(val).toBeGreaterThan(-1);

                        if (_idx === (items.length - 1)) {
                            done();
                        }
                    });
                })(Number(idx));
            }
        });

        it('the chroma saturation', function(done) {
            for (var idx in items) {
                (function(_idx) {
                    items[_idx].getChromaSaturation().then(function(val) {
                        expect(val).toBeTypeOf('number');
                        expect(val).toBeLessThan(256);
                        expect(val).toBeGreaterThan(-1);

                        if (_idx === (items.length - 1)) {
                            done();
                        }
                    });
                })(Number(idx));
            }
        });

        it('the chroma hue', function(done) {
            for (var idx in items) {
                (function(_idx) {
                    items[_idx].getChromaHue().then(function(val) {
                        expect(val).toBeTypeOf('number');
                        expect(val).toBeLessThan(181);
                        expect(val).toBeGreaterThan(-1);

                        if (_idx === (items.length - 1)) {
                            done();
                        }
                    });
                })(Number(idx));
            }
        });

        it('the chroma type', function(done) {
            var chromaTypes = xui.core.ChromaTypes;
            for (var idx in items) {
                (function(_idx) {
                    items[_idx].getChromaType().then(function(val) {
                        expect(val).toBeTypeOf('number');
                        expect(val)
                            .toBeLessThan(Object.keys(chromaTypes).length / 2);
                        expect(val)
                            .toBeGreaterThan(chromaTypes[chromaTypes[0]] - 1);

                        if (_idx === (items.length - 1)) {
                            done();
                        }
                    });
                })(Number(idx));
            }
        });

        it('the chroma color', function(done) {
            for (var idx in items) {
                (function(_idx) {
                    items[_idx].getChromaColor().then(function(val) {
                        expect(val).toBeInstanceOf(internal.utils.Color);

                        if (_idx === (items.length - 1)) {
                            done();
                        }
                    });
                })(Number(idx));
            }
        });

        it('the chroma primary color', function(done) {
            var chromaPColors = xui.core.ChromaPrimaryColors;
            for (var idx in items) {
                (function(_idx) {
                    items[_idx].getChromaPrimaryColor().then(function(val) {
                        expect(val).toBeTypeOf('number');
                        expect(val).toBeLessThan(
                            Object.keys(chromaPColors).length / 2);
                        expect(val).toBeGreaterThan(
                            chromaPColors[chromaPColors[0]] - 1);

                        if (_idx === (items.length - 1)) {
                            done();
                        }
                    });
                })(Number(idx));
            }
        });

        it('the chroma balance', function(done) {
            for (var idx in items) {
                (function(_idx) {
                    items[_idx].getChromaBalance().then(function(val) {
                        expect(val).toBeTypeOf('number');
                        expect(val).toBeLessThan(256);
                        expect(val).toBeGreaterThan(-1);

                        if (_idx === (items.length - 1)) {
                            done();
                        }
                    });
                })(Number(idx));
            }
        });

        it('the chroma anti alias', function(done) {
            var chromaAA = xui.core.ChromaAntiAlias;
            for (var idx in items) {
                (function(_idx) {
                    items[_idx].getChromaAntiAlias().then(function(val) {
                        expect(val).toBeTypeOf('number');
                        expect(val)
                            .toBeLessThan(Object.keys(chromaAA).length / 2);
                        expect(val)
                            .toBeGreaterThan(chromaAA[chromaAA[0]] - 1);

                        if (_idx === (items.length - 1)) {
                            done();
                        }
                    });
                })(Number(idx));
            }
        });

        it('the chroma threshold', function(done) {
            for (var idx in items) {
                (function(_idx) {
                    items[_idx].getChromaThreshold().then(function(val) {
                        expect(val).toBeTypeOf('number');
                        expect(val).toBeLessThan(256);
                        expect(val).toBeGreaterThan(-1);

                        if (_idx === (items.length - 1)) {
                            done();
                        }
                    });
                })(Number(idx));
            }
        });

        it('the chroma threshold anti alias', function(done) {
            for (var idx in items) {
                (function(_idx) {
                    items[_idx].getChromaThresholdAA().then(function(val) {
                        expect(val).toBeTypeOf('number');

                        if (_idx === (items.length - 1)) {
                            done();
                        }
                    });
                })(Number(idx));
            }
        });
    });
});

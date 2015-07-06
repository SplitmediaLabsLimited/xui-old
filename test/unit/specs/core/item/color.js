/* globals describe, it, expect, beforeAll, xui, internal */

describe('xui.core.ItemColor', function() {
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
        it('the transparency', function(done) {
            for (var idx in items) {
                (function(_idx) {
                    items[_idx].getTransparency().then(function(val) {
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

        it('the brightness level', function(done) {
            for (var idx in items) {
                (function(_idx) {
                    items[_idx].getBrightness().then(function(val) {
                        expect(val).toBeTypeOf('number');
                        expect(val).toBeLessThan(101);
                        expect(val).toBeGreaterThan(-1);

                        if (_idx === (items.length - 1)) {
                            done();
                        }
                    });
                })(Number(idx));
            }
        });

        it('the contrast', function(done) {
            for (var idx in items) {
                (function(_idx) {
                    items[_idx].getContrast().then(function(val) {
                        expect(val).toBeTypeOf('number');
                        expect(val).toBeLessThan(101);
                        expect(val).toBeGreaterThan(-1);

                        if (_idx === (items.length - 1)) {
                            done();
                        }
                    });
                })(Number(idx));
            }
        });

        it('the hue', function(done) {
            for (var idx in items) {
                (function(_idx) {
                    items[_idx].getHue().then(function(val) {
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

        it('the saturation', function(done) {
            for (var idx in items) {
                (function(_idx) {
                    items[_idx].getSaturation().then(function(val) {
                        expect(val).toBeTypeOf('number');
                        expect(val).toBeLessThan(100);
                        expect(val).toBeGreaterThan(-1);

                        if (_idx === (items.length - 1)) {
                            done();
                        }
                    });
                })(Number(idx));
            }
        });

        it('the border color', function(done) {
            for (var idx in items) {
                (function(_idx) {
                    items[_idx].getBorderColor().then(function(val) {
                        expect(val).toBeInstanceOf(internal.utils.Color);

                        if (_idx === (items.length - 1)) {
                            done();
                        }
                    });
                })(Number(idx));
            }
        });
    });
});

/* globals describe, it, expect, beforeAll, xui, internal */

describe('xui.core.ItemLayout', function() {
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
        it('the aspect ratio settings', function(done) {
            for (var idx in items) {
                (function(_idx) {
                    items[_idx].isKeepAspectRatio().then(function(val) {
                        expect(val).toBeTypeOf('boolean');

                        if (_idx === (items.length - 1)) {
                            done();
                        }
                    });
                })(Number(idx));
            }
        });

        it('the position lock settings', function(done) {
            for (var idx in items) {
                (function(_idx) {
                    items[_idx].isPositionLocked().then(function(val) {
                        expect(val).toBeTypeOf('boolean');

                        if (_idx === (items.length - 1)) {
                            done();
                        }
                    });
                })(Number(idx));
            }
        });

        it('the enhance resize settings', function(done) {
            for (var idx in items) {
                (function(_idx) {
                    items[_idx].isEnhanceResizeEnabled().then(function(val) {
                        expect(val).toBeTypeOf('boolean');

                        if (_idx === (items.length - 1)) {
                            done();
                        }
                    });
                })(Number(idx));
            }
        });

        it('the pixel alignment settings', function(done) {
            for (var idx in items) {
                (function(_idx) {
                    items[_idx].isPixelAlignmentEnabled().then(function(val) {
                        expect(val).toBeTypeOf('boolean');

                        if (_idx === (items.length - 1)) {
                            done();
                        }
                    });
                })(Number(idx));
            }
        });

        it('the position', function(done) {
            for (var idx in items) {
                (function(_idx) {
                    items[_idx].getPosition().then(function(val) {
                        expect(val).toBeInstanceOf(internal.utils.Rectangle);

                        if (_idx === (items.length - 1)) {
                            done();
                        }
                    });
                })(Number(idx));
            }
        });
    });
});

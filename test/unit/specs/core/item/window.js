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
        it('the window tracking settings', function(done) {
            for (var idx in items) {
                (function(_idx) {
                    items[_idx].isWindowTracking().then(function(val) {
                        expect(val).toBeTypeOf('boolean');

                        if (_idx === (items.length - 1)) {
                            done();
                        }
                    });
                })(Number(idx));
            }
        });
    });
});

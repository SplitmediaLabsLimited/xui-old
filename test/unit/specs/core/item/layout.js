/* globals describe, it, expect, beforeAll, xui, internal */

describe('xui.core.ItemLayout', function() {
    'use strict';

    var scene = new xui.core.Scene({ id: 3, viewID: 0 });
    var item;

    beforeAll(function(done) {
        if (internal.Environment.isScriptPlugin()) {
            scene.getItems().then(function(items) {
                item = items[0];
                done();
            });
        } else {
            xui.core.Item.getCurrentSource().then(function(ret) {
                item = ret;
                done();
            });
        }
    });

    describe('should be able to fetch', function() {
        it('the aspect ratio settings', function(done) {
            item.isKeepAspectRatio().then(function(val) {
                expect(typeof val).toBe('boolean');
                done();
            });
        });

        it('the position lock settings', function(done) {
            item.isPositionLocked().then(function(val) {
                expect(typeof val).toBe('boolean');
                done();
            });
        });

        it('the enhance resize settings', function(done) {
            item.isEnhanceResizeEnabled().then(function(val) {
                expect(typeof val).toBe('boolean');
                done();
            });
        });

        it('the pixel alignment settings', function(done) {
            item.isPixelAlignmentEnabled().then(function(val) {
                expect(typeof val).toBe('boolean');
                done();
            });
        });

        it('the position', function(done) {
            item.getPosition().then(function(val) {
                expect(val).toBeInstanceOf(internal.utils.Rectangle);
                done();
            });
        });
    });
});

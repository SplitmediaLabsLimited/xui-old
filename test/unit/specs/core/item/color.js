/* globals describe, it, expect, beforeAll, xui, internal */

describe('xui.core.ItemColor', function() {
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
        it('the transparency', function(done) {
            item.getTransparency().then(function(val) {
                expect(val).not.toBeNaN();
                expect(val).toBeLessThan(256);
                expect(val).toBeGreaterThan(-1);
                done();
            });
        });

        it('the brightness level', function(done) {
            item.getBrightness().then(function(val) {
                expect(val).not.toBeNaN();
                expect(val).toBeLessThan(101);
                expect(val).toBeGreaterThan(-1);
                done();
            });
        });

        it('the contrast', function(done) {
            item.getContrast().then(function(val) {
                expect(val).not.toBeNaN();
                expect(val).toBeLessThan(101);
                expect(val).toBeGreaterThan(-1);
                done();
            });
        });

        it('the hue', function(done) {
            item.getHue().then(function(val) {
                expect(val).not.toBeNaN();
                expect(val).toBeLessThan(181);
                expect(val).toBeGreaterThan(-1);
                done();
            });
        });

        it('the saturation', function(done) {
            item.getSaturation().then(function(val) {
                expect(val).not.toBeNaN();
                expect(val).toBeLessThan(100);
                expect(val).toBeGreaterThan(-1);
                done();
            });
        });

        it('the border color', function(done) {
            item.getBorderColor().then(function(val) {
                expect(val).toBeInstanceOf(internal.utils.Color);
                done();
            });
        });
    });
});

/* globals describe, it, expect, beforeAll, xui, internal */

describe('xui.core.ItemChroma', function() {
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
        it('the chroma enabled status', function(done) {
            item.isChromaEnabled().then(function(val) {
                expect(typeof val).toBe('boolean');
                done();
            });
        });

        it('the chroma brightness', function(done) {
            item.getChromaBrightness().then(function(val) {
                expect(val).not.toBeNaN();
                expect(val).toBeLessThan(256);
                expect(val).toBeGreaterThan(-1);
                done();
            });
        });

        it('the chroma saturation', function(done) {
            item.getChromaSaturation().then(function(val) {
                expect(val).not.toBeNaN();
                expect(val).toBeLessThan(256);
                expect(val).toBeGreaterThan(-1);
                done();
            });
        });

        it('the chroma hue', function(done) {
            item.getChromaHue().then(function(val) {
                expect(val).not.toBeNaN();
                expect(val).toBeLessThan(181);
                expect(val).toBeGreaterThan(-1);
                done();
            });
        });

        it('the chroma type', function(done) {
            item.getChromaType().then(function(val) {
                var chromaTypes = xui.core.ChromaTypes;
                expect(val).not.toBeNaN();
                expect(val).toBeLessThan(Object.keys(chromaTypes).length / 2);
                expect(val).toBeGreaterThan(chromaTypes[chromaTypes[0]] - 1);
                done();
            });
        });

        it('the chroma color', function(done) {
            item.getChromaColor().then(function(val) {
                expect(val).toBeInstanceOf(internal.utils.Color);
                done();
            });
        });

        it('the chroma primary color', function(done) {
            item.getChromaPrimaryColor().then(function(val) {
                var chromaPColors = xui.core.ChromaPrimaryColors;
                expect(val).not.toBeNaN();
                expect(val).toBeLessThan(Object.keys(chromaPColors).length / 2);
                expect(val).toBeGreaterThan(chromaPColors[chromaPColors[0]] - 1);
                done();
            });
        });

        it('the chroma balance', function(done) {
            item.getChromaBalance().then(function(val) {
                expect(val).not.toBeNaN();
                expect(val).toBeLessThan(256);
                expect(val).toBeGreaterThan(-1);
                done();
            });
        });

        it('the chroma anti alias', function(done) {
            item.getChromaAntiAlias().then(function(val) {
                var chromaAA = xui.core.ChromaAntiAlias;
                expect(val).not.toBeNaN();
                expect(val).toBeLessThan(Object.keys(chromaAA).length / 2);
                expect(val).toBeGreaterThan(chromaAA[chromaAA[0]] - 1);
                done();
            });
        });

        it('the chroma threshold', function(done) {
            item.getChromaThreshold().then(function(val) {
                expect(val).not.toBeNaN();
                expect(val).toBeLessThan(256);
                expect(val).toBeGreaterThan(-1);
                done();
            });
        });

        it('the chroma threshold anti alias', function(done) {
            item.getChromaThresholdAA().then(function(val) {
                expect(val).not.toBeNaN();
                done();
            });
        });
    });
});

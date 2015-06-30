/* globals describe, it, expect, beforeAll, xui, internal */

describe('xui.core.ItemAudio', function() {
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
        it('the volume', function(done) {
            item.getVolume().then(function(val) {
                expect(val).not.toBeNaN();
                expect(val).toBeLessThan(101);
                expect(val).toBeGreaterThan(-1);
                done();
            });
        });

        it('the mute status', function(done) {
            item.isMuted().then(function(val) {
                expect(typeof val).toBe('boolean');
                done();
            });
        });
    });
});

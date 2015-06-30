/* globals describe, it, expect, beforeAll, xui, internal */

describe('xui.core.ItemPlayback', function() {
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
        it('the playback start position', function(done) {
            item.getPlaybackStartPos().then(function(val) {
                expect(val).not.toBeNaN();
                expect(val).toBeGreaterThan(-1);
                done();
            });
        });
        
        it('the playback end position', function(done) {
            item.getPlaybackEndPos().then(function(val) {
                expect(val).not.toBeNaN();
                expect(val).toBeGreaterThan(-1);
                done();
            });
        });
        
        it('the playback end action', function(done) {
            item.getPlaybackEndAction().then(function(val) {
                var action = xui.core.PlaybackEndAction;
                expect(val).not.toBeNaN();
                expect(val).toBeLessThan(Object.keys(action).length / 2);
                expect(val).toBeGreaterThan(action[action[0]] - 1);
                done();
            });
        });
        
        it('the playback duration', function(done) {
            item.getPlaybackDuration().then(function(val) {
                expect(val).not.toBeNaN();
                done();
            });
        });
    });
});

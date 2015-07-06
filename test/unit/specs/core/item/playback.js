/* globals describe, it, expect, beforeAll, xui, internal */

describe('xui.core.ItemPlayback', function() {
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
        it('the playback start position', function(done) {
            for (var idx in items) {
                (function(_idx) {
                    items[_idx].getPlaybackStartPos().then(function(val) {
                        expect(val).toBeTypeOf('number');
                        expect(val).toBeGreaterThan(-1);

                        if (_idx === (items.length - 1)) {
                            done();
                        }
                    });
                })(Number(idx));
            }
        });
        
        it('the playback end position', function(done) {
            for (var idx in items) {
                (function(_idx) {
                    items[_idx].getPlaybackEndPos().then(function(val) {
                        expect(val).toBeTypeOf('number');
                        expect(val).toBeGreaterThan(-1);

                        if (_idx === (items.length - 1)) {
                            done();
                        }
                    });
                })(Number(idx));
            }
        });
        
        it('the playback end action', function(done) {
            var action = xui.core.PlaybackEndAction;
            for (var idx in items) {
                (function(_idx) {
                    items[_idx].getPlaybackEndAction().then(function(val) {
                        expect(val).toBeTypeOf('number');
                        expect(val).toBeLessThan(Object.keys(action).length / 2);
                        expect(val).toBeGreaterThan(action[action[0]] - 1);

                        if (_idx === (items.length - 1)) {
                            done();
                        }
                    });
                })(Number(idx));
            }
        });
        
        it('the playback duration', function(done) {
            for (var idx in items) {
                (function(_idx) {
                    items[_idx].getPlaybackDuration().then(function(val) {
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

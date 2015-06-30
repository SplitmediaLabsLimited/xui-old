/* globals describe, it, expect, beforeAll, xui, internal */

describe('xui.core.Item', function() {
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
        it('the cue points', function(done) {
            item.getCuePoints().then(function(val) {
                expect(val).toBeInstanceOf(Array);
                val.forEach(function(num, idx, arr) {
                    expect(num).not.toBeNaN();
                    if (idx === (arr.length - 1)) {
                        done();
                    }
                });
            });
        });
    });
});

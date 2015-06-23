/* globals describe, it, expect, beforeAll, xui, internal */

// @TODO: Test all methods of Item class and it's amazing sub classes
describe('xui.core.Item', function() {
    'use strict';

    var scene = new xui.core.Scene({ id: 0, viewID: 0 });
    var item;

    beforeAll(function(done) {
        if (internal.Environment.isScriptPlugin()) {
            scene.getItems().then(function(items) {
                item = items[0];
                
                done();
            });
        } else {
            item = xui.core.Item.getCurrentSource();
            done();
        }
    });

    describe('should be able to fetch', function() {
        it('the type', function(done) {
            item.getType().then(function(val) {
                expect(val).not.toBeNaN();

                done();
            });
        });

        it('the configuration', function(done) {
            item.loadConfig().then(function(config) {
                expect(config).toBeDefined();

                done();
            });
        });
    });

    describe('should be able to save', function() {
        it('config', function() {
            item.loadConfig().then(function(config) {
                var test = item.saveConfig(JSON.parse(config));

                if (internal.Environment.isSourceHtml()) {
                    expect(test).toBeTruthy();
                } else {
                    expect(test).toBeFalsy();
                }
            });
        });
    });

    describe('should also have ItemAudio methods', function() {
        it('like getVolume', function(done) {
            item.getVolume().then(function(val) {
                expect(val).toBeDefined();

                done();
            });
        });
    });
});

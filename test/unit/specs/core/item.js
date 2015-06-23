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
        var type = '';

        it('the current item', function() {
            if (internal.Environment.isScriptPlugin()) {
                expect(xui.core.Item.getCurrentSource()).toBeUndefined();
            } else {
                expect(xui.core.Item.getCurrentSource()).toBeDefined();
            }
        });

        it('the name', function(done) {
            item.getName().then(function(val) {
                expect(val).toBeDefined(); 
                done();
            });
        });

        it('the type', function(done) {
            item.getType().then(function(val) {
                expect(val).not.toBeNaN();
                type = Number(val);
                done();
            });
        });

        it('the value', function(done) {
            item.getValue().then(function(val) {
                if (type === 5 || type === 7) {
                    expect(val).toBeInstanceOf(internal.utils.XML);
                } else {
                    expect(typeof val).toBe('string');
                }
                done();
            });
        });

        it('the save source in memory setting', function(done) {
            item.getKeepLoaded().then(function(val) {
                expect(typeof val).toBe('boolean');
                done();
            });
        });

        it('the ID', function(done) {
            item.getID().then(function(val) {
                expect(val).toBeDefined();
                done();
            });
        });

        it('the Scene ID', function(done) {
            item.getSceneID().then(function(val) {
                expect(val).not.toBeNaN();
                done();
            });
        });

        it('the View ID', function(done) {
            item.getViewID().then(function(val) {
                expect(val).not.toBeNaN();
                done();
            });
        });
    });

    it('should be able to parse itself to XML', function() {
        expect(item.toXML()).toBeInstanceOf(internal.utils.XML);
    });

    describe('should be able to', function() {
        var config = '';

        it('load the configuration', function(done) {
            item.loadConfig().then(function(val) {
                expect(val).toBeInstanceOf(internal.utils.JSON);
                config = val;
                done();
            });
        });

        it('save the configuration', function() {
            if (internal.Environment.isSourceHtml()) {
                expect(item.saveConfig(config)).toBeUndefined();
            } else {
                expect(item.saveConfig(config)).toThrow();
            }
        });

        it('apply the configuration', function(done) {
            expect(item.applyConfig(config)).not.toThrow();
            if (internal.Environment.isSourceHtml()) {
                var emitter = xui.source.SourceWindow.getInstance();
                emitter.on('apply-config', function(config) {
                    expect(config).toEqual(config);
                    done();
                });
            } else {
                done();
            }
        });
    });
});

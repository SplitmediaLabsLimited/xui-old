/* globals describe, it, expect, xui */

describe('xui.core.Scene', function() {
    'use strict';

    describe('static get', function() {
        it('should be a function', function() {
            expect(xui.core.Scene.get).toBeInstanceOf(Function);
        });

        it('should be able to get the current Scene', function(done) {
            var promise = xui.core.Scene.get();
            
            expect(promise).toBeInstanceOf(Promise);
            
            promise.then(function(scene) {
                expect(scene).toBeInstanceOf(xui.core.Scene);

                done();
            });
        });

        it('should be able to get a Scene based by its ID', function(done) {
            var promise = xui.core.Scene.get(2);
            
            expect(promise).toBeInstanceOf(Promise);
            
            promise.then(function(scene) {
                expect(scene).toBeInstanceOf(xui.core.Scene);

                done();
            });
        });
    });

    describe('should be able to get', function() {
        var scene = new xui.core.Scene({ id: 0, viewID: 0 });
        var items = [];
        
        it('the ID', function(done) {
            scene.getID().then(function(val) {
                expect(val).not.toBeNaN();
                done();
            });
        });

        it('the ViewID', function(done) {
            scene.getViewID().then(function(val) {
                expect(val).not.toBeNaN();
                done();
            });
        });

        it('the Items', function(done) {
            scene.getItems().then(function(val) {
                items = val;
                expect(val).toBeInstanceOf(Array);
                if (val.length > 0) {
                    expect(val).eachToBeInstanceOf(xui.core.Item);
                }
                done();
            });
        });

        it('the status if scene is empty or not', function(done) {
            scene.isEmpty().then(function(val) {
                expect(typeof val).toBe('boolean');
                if (val === true) {
                    expect(items.length === 0).toBeTruthy();
                } else {
                    expect(items.length > 0).toBeTruthy();
                }
                done();
            });
        });

        it('the Name', function(done) {
            scene.getName().then(function(val) {
                expect(typeof val).toBe('string');
                done();
            });
        });
    });
});

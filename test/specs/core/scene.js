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
});

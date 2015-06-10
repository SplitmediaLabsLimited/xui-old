describe('xui.core.Scene', function() {

    describe('static get', function() {
        it('should be a damn function', function() {
            expect(xui.core.Scene.get).toBeInstanceOf(Function);
        });

        it('should be able to the current Scene', function(done) {
            var promise = xui.core.Scene.get();
            
            expect(promise).toBeInstanceOf(Promise);
            
            promise.then(function(scene) {
                expect(scene).toBeInstanceOf(xui.core.Scene);
            });
        });
        
        it('should be able to the current Scene', function(done) {
            var promise = xui.core.Scene.get();
            
            expect(promise).toBeInstanceOf(Promise);
            
            promise.then(function(scene) {
                expect(scene).toBeInstanceOf(xui.core.Scene);
            });
        });
    });
});

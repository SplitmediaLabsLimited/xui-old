// @TODO: Test all methods of View class
describe('xui.core.View', function() {
    var view = new xui.core.View(0);

    describe('should be able to fetch ', function() {
        var promise = view.getScenes();

        it('through a promise', function() {
            expect(promise).toBeInstanceOf(Promise);
        });

        it('an array of Scenes', function(done) {
            promise.then(function(scenes) {
                expect(scenes).toBeInstanceOf(Array);
                expect(scenes).eachToBeInstanceOf(xui.core.Scene);

                done();
            });
        });
    });

    describe('should be able to count', function() {
        var promise = view.getScenesCount();

        it('through a promise', function() {
            expect(promise).toBeInstanceOf(Promise);
        });

        it('the number of scenes', function(done) {
            promise.then(function(count) {
                expect(!Number(count).isNaN()).toBeTruthy();

                done();
            });
        });
    });
});

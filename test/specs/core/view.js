describe('xui.core.View', function() {
    var view = xui.core.View.MAIN;

    describe('should be able to fetch', function() {
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
                expect(count).not.toBeNaN();

                done();
            });
        });
    });

    describe('should be able to search scenes', function() {
        describe('by id', function() {
            var promise = view.getScenes({id: 1});

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
        
        describe('by name', function() {
            var promise = view.getScenes({name: 'Scene'});

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
    });

    describe('should be able to search items', function() {
        describe('by keyword', function() {
            var promise = view.searchItems({keyword: 'Webcam'});

            it('through a promise', function() {
                expect(promise).toBeInstanceOf(Promise);
            });

            it('an array of Items', function(done) {
                promise.then(function(scenes) {
                    expect(scenes).toBeInstanceOf(Array);
                    expect(scenes).eachToBeInstanceOf(xui.core.Item);
                    done();
                });
            });
        });
    });
});

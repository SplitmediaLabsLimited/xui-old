/// <reference path="../_references.ts" />


// @TODO: Test all methods of View class
describe('xui.core.View', () => {
    var view = new xui.core.View(0);

    describe('should be able to fetch ', () => {
        var promise = view.getScenes();

        it('through a promise', () => {
            expect(promise).toBeInstanceOf(Promise);
        });

        it('an array of Scenes', (done) => {
            promise.then((scenes) => {
                expect(scenes).toBeInstanceOf(Array);
                expect(scenes).eachToBeInstanceOf(xui.core.Scene);

                done();
            });
        });
    });

    describe('should be able to count', () => {
        var promise = view.getScenesCount();

        it('through a promise', () => {
            expect(promise).toBeInstanceOf(Promise);
        });

        it('the number of scenes', (done) => {
            promise.then((count) => {
                expect(Number(count) !== NaN).toBeTruthy();

                done();
            });
        });
    });
});

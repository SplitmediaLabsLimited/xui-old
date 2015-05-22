/// <reference path="../_references.ts" />

describe('xui.core.App', () => {
    var App = xui.core.App;

    describe('should get audio devices', () => {
        var promise;

        beforeAll(() => {
            promise = App.getAudioDevices();
        });

        it('through a promise', () => {
            expect(promise).toBeInstanceOf(Promise);
        });

        it('that returns an array of xui.system.Audio', (done) => {
            promise.then(function(audios) {
                expect(audios).toBeInstanceOf(Array);
                expect(audios).eachToBeInstanceOf(xui.system.Audio);

                done();
            });
        });
    });
});

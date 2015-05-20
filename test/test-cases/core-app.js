/* globals describe, beforeAll, beforeEach, it, expect, xui */

'use strict';

describe('Core-App', function() {
    var app;

    beforeAll(function() {
        app = xui.core.App;
    });

    describe('should get audio devices', function() {
        var promise;

        beforeEach(function() {
            promise = app.getAudioDevices();
        });

        it('through promises', function() {
            expect(promise).toBeInstanceOf(Promise);
        });

        it('wherien the type should be an array of xui.system.Audio', 
            function(done) {
                promise.then(function(audios) {
                    expect(audios).toBeInstanceOf(Array);

                    expect(audios).eachToBeInstanceOf(xui.system.Audio);

                    done();
                });
            }
        );
    });
});

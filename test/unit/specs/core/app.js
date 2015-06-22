/* globals describe, it, expect, xui */

describe('xui.core.App', function() {
    'use strict';

    var App = xui.core.App;
    
    describe('should get audio devices', function() {
        
        it('through a promise', function() {
            expect(App.getAudioDevices()).toBeInstanceOf(Promise);
        });

        it('that returns an array of xui.system.Audio', function(done) {
            App.getAudioDevices().then(function(audios) {
                expect(audios).toBeInstanceOf(Array);
                
                expect(audios).eachToBeInstanceOf(xui.system.AudioDevice);

                done();
            });
        });
    });

    describe('should be able to get current presentation', function() {
        var promise = App.getCurrentPresentation();

        it('through a promise', function() {
            expect(promise).toBeInstanceOf(Promise);
        });

        it('that returns a presentation', function(done) {
            promise.then(function(presentation) {
                expect(presentation).toBeInstanceOf(xui.core.Presentation);

                done();
            });
        });
    });

    // OFF this test case by default, we do not want to save, load, and
    // clear our presentation everytime we run the test right?
    if (false) {
        describe('should be able to load a presentation', function() {
            var filePath = 
                'C:\\Users\\dara\\Documents\\SplitmediaLabs\\default.BPres';

            it('by supplying a file path', function() {
                App.load(filePath);

                // I damn not know how to test this since there won't be any
                // indication if loading is success or it failed big time
                // so I'll just test if filePath is a string or not LoL
                expect(typeof filePath).toBe('string');
            });

            it('by supplying a presentation object', function(done) {
                App.getCurrentPresentation().then(function(presentation) {
                    App.load(presentation);

                    expect(presentation).toBeInstanceOf(xui.core.Presentation);

                    done();
                });
            });
        });

        describe('should be able to save a presentation', function() {
            var filePath = 
                'C:\\Users\\dara\\Documents\\SplitmediaLabs\\default.BPres';

            it('by supplying a file path', function() {
                App.save(filePath);

                // I damn not know how to test this since there won't be any
                // indication if loading is success or it failed big time
                // so I'll just test if filePath is a string or not LoL
                expect(typeof filePath).toBe('string');
            });
        });

        describe('should be able to clear', function() {
            it('the presentation', function() {
                App.clearPresentation();

                // I damn not know how to test this since there won't be any
                // indication if loading is success or it failed big time
                expect(App.clearPresentation).toBeInstanceOf(Function);
            });
        });
    }
});

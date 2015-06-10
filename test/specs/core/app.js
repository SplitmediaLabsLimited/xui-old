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
});

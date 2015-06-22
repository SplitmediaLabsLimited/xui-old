/* globals describe, it, expect, xui */

describe('xui.system.System', function() {
    'use strict';

    var System = xui.system.System;

    describe('should be able to get Audio Devices', function() {
        describe('without filtering', function() {
            var promise = System.getAudioDevices();

            it('through a promise', function() {
                expect(promise).toBeInstanceOf(Promise);
            });

            it('as an array of Audio Devices', function(done) {
                promise.then(function(devices) {
                    expect(devices).toBeInstanceOf(Array);

                    expect(devices).eachToBeInstanceOf(xui.system.AudioDevice);

                    done();
                });
            });
        });

        describe('filter: active devices', function() {
            var promise = System.getAudioDevices(
                xui.system.AudioDeviceDataflow.ALL,
                xui.system.AudioDeviceState.ACTIVE
            );

            it('through a promise', function() {
                expect(promise).toBeInstanceOf(Promise);
            });

            it('as an array of Active Audio Devices', function(done) {
                promise.then(function(devices) {
                    expect(devices).toBeInstanceOf(Array);

                    expect(devices).eachToBeInstanceOf(xui.system.AudioDevice);

                    devices.forEach(function(device, idx) {
                        expect(device.state).toBe('Active');

                        if (Number(idx) === devices.length - 1) {
                            done();
                        }
                    });
                });
            });
        });

        describe('filter: disabled devices', function() {
            var promise = System.getAudioDevices(
                xui.system.AudioDeviceDataflow.ALL,
                xui.system.AudioDeviceState.DISABLED
            );

            it('through a promise', function() {
                expect(promise).toBeInstanceOf(Promise);
            });

            it('as an array of Disabled Audio Devices', function(done) {
                promise.then(function(devices) {
                    expect(devices).toBeInstanceOf(Array);

                    expect(devices).eachToBeInstanceOf(xui.system.AudioDevice);

                    devices.forEach(function(device, idx) {
                        expect(device.state).toBe('Disabled');

                        if (Number(idx) === devices.length - 1) {
                            done();
                        }
                    });
                });
            });
        });

        describe('filter: Unplugged devices', function() {
            var promise = System.getAudioDevices(
                xui.system.AudioDeviceDataflow.ALL,
                xui.system.AudioDeviceState.UNPLUGGED
            );

            it('through a promise', function() {
                expect(promise).toBeInstanceOf(Promise);
            });

            it('as an array of Unplugged Audio Devices', function(done) {
                promise.then(function(devices) {
                    expect(devices).toBeInstanceOf(Array);

                    expect(devices).eachToBeInstanceOf(xui.system.AudioDevice);

                    devices.forEach(function(device, idx) {
                        expect(device.state).toBe('Unplugged');

                        if (Number(idx) === devices.length - 1) {
                            done();
                        }
                    });
                });
            });
        });

        describe('filter: Not present devices', function() {
            var promise = System.getAudioDevices(
                xui.system.AudioDeviceDataflow.ALL,
                xui.system.AudioDeviceState.NOTPRESENT
            );

            it('through a promise', function() {
                expect(promise).toBeInstanceOf(Promise);
            });

            it('as an array of Not present Audio Devices', function(done) {
                promise.then(function(devices) {
                    expect(devices).toBeInstanceOf(Array);

                    expect(devices).eachToBeInstanceOf(xui.system.AudioDevice);

                    devices.forEach(function(device, idx) {
                        expect(device.state).toBe('Not present');

                        if (Number(idx) === devices.length - 1) {
                            done();
                        }
                    });
                });
            });
        });

        describe('filter: Render dataflow devices', function() {
            var promise = System.getAudioDevices(
                xui.system.AudioDeviceDataflow.RENDER,
                xui.system.AudioDeviceState.ALL
            );

            it('through a promise', function() {
                expect(promise).toBeInstanceOf(Promise);
            });

            it('as an array of Render Audio Devices', function(done) {
                promise.then(function(devices) {
                    expect(devices).toBeInstanceOf(Array);

                    expect(devices).eachToBeInstanceOf(xui.system.AudioDevice);

                    devices.forEach(function(device, idx) {
                        expect(device.dataflow).toBe('Render');

                        if (Number(idx) === devices.length - 1) {
                            done();
                        }
                    });
                });
            });
        });

        describe('filter: Capture dataflow devices', function() {
            var promise = System.getAudioDevices(
                xui.system.AudioDeviceDataflow.CAPTURE,
                xui.system.AudioDeviceState.ALL
            );

            it('through a promise', function() {
                expect(promise).toBeInstanceOf(Promise);
            });

            it('as an array of Capture Audio Devices', function(done) {
                promise.then(function(devices) {
                    expect(devices).toBeInstanceOf(Array);

                    expect(devices).eachToBeInstanceOf(xui.system.AudioDevice);

                    devices.forEach(function(device, idx) {
                        expect(device.dataflow).toBe('Capture');

                        if (Number(idx) === devices.length - 1) {
                            done();
                        }
                    });
                });
            });
        });
    });

    describe('should be able to get Video Devices', function() {
        var promise = System.getVideoDevices();

        it('through a promise', function() {
            expect(promise).toBeInstanceOf(Promise);
        });

        it('as an array of Video Devices', function(done) {
            promise.then(function(devices) {
                expect(devices).toBeInstanceOf(Array);

                expect(devices).eachToBeInstanceOf(xui.system.VideoDevice);

                done();
            });
        });
    });

    describe('should be able to get Games', function() {
        var promise = System.getGames();

        it('through a promise', function() {
            expect(promise).toBeInstanceOf(Promise);
        });

        it('as an array of Games', function(done) {
            promise.then(function(games) {
                expect(games).toBeInstanceOf(Array);

                expect(games).eachToBeInstanceOf(xui.system.Game);

                done();
            });
        });
    });

    describe('should be able to get Processes', function() {
        var promise = System.getProcesses();

        it('through a promise', function() {
            expect(promise).toBeInstanceOf(Promise);
        });

        it('as an array of Process', function(done) {
            promise.then(function(processes) {
                expect(processes).toBeInstanceOf(Array);

                expect(processes).eachToBeInstanceOf(xui.system.Process);

                done();
            });
        });
    });

    describe('should be able to get Visible Windows', function() {
        var promise = System.getVisibleWindows();

        it('through a promise', function() {
            expect(promise).toBeInstanceOf(Promise);
        });

        it('as an array of Visible Windows', function(done) {
            promise.then(function(win) {
                expect(win).toBeInstanceOf(Array);

                expect(win).eachToBeInstanceOf(xui.system.Window);

                done();
            });
        });
    });

    describe('should be able to get Active Windows', function() {
        var promise = System.getActiveWindow();

        it('through a promise', function() {
            expect(promise).toBeInstanceOf(Promise);
        });

        it('the active window', function(done) {
            promise.then(function(win) {

                expect(win).toBeInstanceOf(xui.system.Window);

                done();
            });
        });
    });
});

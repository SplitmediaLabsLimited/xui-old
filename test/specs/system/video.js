/* globals describe, it, expect, xui, internal */

describe('xui.system.VideoDevice', function() {
    'use strict';

    var System = xui.system.System;
    var promise = System.getVideoDevices();

    describe('should be able to convert the device details', function() {
        it('into an XML object', function(done) {
            promise.then(function(devices) {
                if (devices.length > 0) {
                    expect(devices[0].toXML()).toBeInstanceOf(internal.utils.XML);
                }

                done();
            });
        });
    });
});

/* globals describe, it, expect, xui, internal */

describe('xui.core.Presentation', function() {
    'use strict';

    var App = xui.core.App;
    var promise = App.getCurrentPresentation();

    describe('should be able to convert the presentation', function() {
        it('into an XML object', function(done) {
            promise.then(function(presentation) {
                expect(presentation.toXML()).toBeInstanceOf(internal.utils.XML);

                done();
            });
        });
    });
});

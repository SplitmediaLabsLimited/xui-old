describe('xui.core.Presentation', function() {
    var App = xui.core.App;
    var promise = App.getCurrentPresentation();

    describe('should be able to convert the presentation', function() {
        it('into an XML object', function(done) {
            promise.then(function(xml) {
                expect(xml).toBeInstanceOf(internal.utils.XML);

                done();
            });
        });
    });
});

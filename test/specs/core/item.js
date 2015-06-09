// @TODO: Test all methods of Item class and it's amazing sub classes
describe('xui.core.Item', function() {
    var scene = new xui.core.Scene({ id: 0, viewID: 0 });
    var item;

    beforeEach(function(done) {
        scene.getItems().then(function(items) {
            item = items[0];
            
            done();
        });
    });

    describe('should be able to fetch', function() {
        it('the type', function(done) {
            item.getType().then(function(val) {
                expect(Number(val) !== NaN).toBeTruthy();

                done();
            });
        });
    });

    describe('should also have ItemAudio methods', function() {
        it('like getVolume', function(done) {
            item.getVolume().then(function(val) {
                expect(val).toBeDefined();

                done();
            });
        });
    });
});

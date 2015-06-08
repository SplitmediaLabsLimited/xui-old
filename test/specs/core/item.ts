/// <reference path="../_references.ts" />

// @TODO: Test all methods of Item class and it's amazing sub classes
describe('xui.core.Item', () => {
    var scene = new xui.core.Scene({ id: 1, viewID: 0 });
    var item;

    beforeEach((done) => {
        scene.getItems().then((items) => {
            item = items[0];

            done();
        });
    });

    describe('should be able to fetch', () => {
        it('the type', (done) => {
            item.getType().then((val) => {
                expect(Number(val) !== NaN).toBeTruthy();

                done();
            });
        });
    });

    describe('should also have ItemAudio methods', () => {
        it('like getVolume', (done) => {
            item.getVolume().then((val) => {
                expect(val).toBeDefined();

                done();
            });
        });
    });
});

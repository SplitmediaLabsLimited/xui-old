/// <reference path="_references.ts" />
var xui;
(function (xui) {
    var test;
    (function (test) {
        var CustomMatcherResult = (function () {
            function CustomMatcherResult(pass, message) {
                this.pass = pass;
                this.message = message;
            }
            return CustomMatcherResult;
        })();
        test.CustomMatcherResult = CustomMatcherResult;
        var ToBeInstanceOf = (function () {
            function ToBeInstanceOf() {
            }
            ToBeInstanceOf.prototype.compare = function (actual, expected) {
                return new CustomMatcherResult(actual instanceof expected);
            };
            return ToBeInstanceOf;
        })();
        test.ToBeInstanceOf = ToBeInstanceOf;
        var EachToBeInstanceOf = (function () {
            function EachToBeInstanceOf() {
            }
            EachToBeInstanceOf.prototype.compare = function (actual, expected) {
                var pass = true;
                for (var i = 0; i < actual.length; i++) {
                    pass = (actual[i] instanceof expected);
                    if (!pass) {
                        break;
                    }
                }
                return new CustomMatcherResult(pass);
            };
            return EachToBeInstanceOf;
        })();
        test.EachToBeInstanceOf = EachToBeInstanceOf;
    })(test = xui.test || (xui.test = {}));
})(xui || (xui = {}));
beforeEach(function () {
    jasmine.addMatchers({
        toBeInstanceOf: function () {
            return new xui.test.ToBeInstanceOf();
        },
        eachToBeInstanceOf: function () {
            return new xui.test.EachToBeInstanceOf();
        }
    });
});
/// <reference path="../_references.ts" />
describe('xui.core.App', function () {
    var App = xui.core.App;
    describe('should get audio devices', function () {
        var promise;
        beforeAll(function () {
            promise = App.getAudioDevices();
        });
        it('through a promise', function () {
            expect(promise).toBeInstanceOf(Promise);
        });
        it('that returns an array of xui.system.Audio', function (done) {
            promise.then(function (audios) {
                expect(audios).toBeInstanceOf(Array);
                expect(audios).eachToBeInstanceOf(xui.system.Audio);
                done();
            });
        });
    });
});
/// <reference path="../_references.ts" />
// @TODO: Test all methods of View class
describe('xui.core.View', function () {
    var view = new xui.core.View(0);
    describe('should be able to fetch ', function () {
        var promise = view.getScenes();
        it('through a promise', function () {
            expect(promise).toBeInstanceOf(Promise);
        });
        it('an array of Scenes', function (done) {
            promise.then(function (scenes) {
                expect(scenes).toBeInstanceOf(Array);
                expect(scenes).eachToBeInstanceOf(xui.core.Scene);
                done();
            });
        });
    });
    describe('should be able to count', function () {
        var promise = view.getScenesCount();
        it('through a promise', function () {
            expect(promise).toBeInstanceOf(Promise);
        });
        it('the number of scenes', function (done) {
            promise.then(function (count) {
                expect(Number(count) !== NaN).toBeTruthy();
                done();
            });
        });
    });
});
/// <reference path="../_references.ts" />
// @TODO: Test all methods of Item class and it's amazing sub classes
describe('xui.core.Item', function () {
    var scene = new xui.core.Scene({ id: 1, viewID: 0 });
    var item;
    beforeEach(function (done) {
        scene.getItems().then(function (items) {
            item = items[0];
            done();
        });
    });
    describe('should be able to fetch', function () {
        it('the type', function (done) {
            item.getType().then(function (val) {
                expect(Number(val) !== NaN).toBeTruthy();
                done();
            });
        });
    });
    describe('should also have ItemAudio methods', function () {
        it('like getVolume', function (done) {
            item.getVolume().then(function (val) {
                expect(val).toBeDefined();
                done();
            });
        });
    });
});
/// <reference path="../../dist/xui.d.ts" />
/// <reference path="../defs/jasmine.d.ts" />
/// <reference path="matchers.d.ts" />
/// <reference path="matchers.ts" />
/// <reference path="core/app.ts" />
/// <reference path="core/view.ts" />
/// <reference path="core/item.ts" /> 

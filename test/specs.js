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
/// <reference path="../../dist/xui.d.ts" />
/// <reference path="../defs/jasmine.d.ts" />
/// <reference path="matchers.d.ts" />
/// <reference path="matchers.ts" />
/// <reference path="core/app.ts" /> 

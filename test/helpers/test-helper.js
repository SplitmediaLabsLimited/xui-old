/* globals beforeEach, jasmine */

'use strict';

beforeEach(function () {
    jasmine.addMatchers({
        toBeInstanceOf: function () {
            return {
                compare: function (actual, expected) {
                    return {
                        pass: actual instanceof expected
                    };
                }
            };
        },
        eachToBeInstanceOf: function() {
            return {
                compare: function (actual, expected) {
                    var arr = actual;

                    for (var i = 0; i < arr.length; i++) {
                        if (!(arr[i] instanceof expected))
                        {
                            return { pass: false };
                        }
                    }

                    return { pass: true };
                }
            };
        }
    });
});

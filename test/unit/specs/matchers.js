/* globals beforeEach, jasmine */

beforeEach(function() {
    'use strict';
    
    jasmine.addMatchers({
        toBeInstanceOf: function() {
            return { 
                compare: function(actual, expected) {
                    var pass = true;

                    pass = (actual instanceof expected);
        
                    return { pass: pass };
                }
            };
        },

        eachToBeInstanceOf: function() {
            return {
                compare: function(actual, expected) {
                    var pass = (actual.length > 0);
        
                    for (var i = 0; i < actual.length; i++) {
                        pass = (actual[i] instanceof expected);
        
                        if (!pass) {
                            break;
                        }    
                    }
        
                    return { pass: pass };
                }
            };
        },

        toBeTypeOf: function() {
            return {
                compare: function(actual, expected) {
                    var pass = 
                        (typeof actual === String(expected).toLowerCase());

                    return { pass: pass };
                }
            };
        }
    });
});
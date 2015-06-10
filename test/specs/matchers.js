beforeEach(function() {
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
        }
    });
});
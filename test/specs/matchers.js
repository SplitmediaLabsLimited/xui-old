beforeEach(function() {
    jasmine.addMatchers({
        toBeInstanceOf: function() {
            return { 
                compare: function(actual, expected) {
                    var pass = true;
        
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

        eachToBeInstanceOf: function() {
            return {
                compare: function(actual, expected) {
                    var pass = true;
        
                    for (var i = 0; i < actual.length; i++) {
                        pass = (actual[i] instanceof expected);
        
                        if (!pass) {
                            console.log(actual[i]);
                            break;
                        }    
                    }
        
                    return { pass: pass };
                }
            };
        }
    });
});
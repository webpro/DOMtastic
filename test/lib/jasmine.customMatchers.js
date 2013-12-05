var customMatchers = {
    toBeOfType: function toBeOfType() {
        return {
            compare: function(actual, expected) {
                return {
                    pass: typeof actual === expected
                };
            }
        };
    },
    toBeInstanceOf: function toBeInstanceOf() {
        return {
            compare: function(actual, expected) {
                return {
                    pass: actual instanceof expected
                };
            }
        };
    },
    toHave: function toHave() {
        return {
            compare: function(actual, expected) {
                return {
                    pass: expected in actual
                };
            }
        };
    }
};

beforeEach(function() {
    jasmine.addMatchers(customMatchers);
});
var customMatchers = {
    toBeOfType: function toBeOfType() {
        return function(actual, expected) {
            return {
                pass: typeof actual === expected
            };
        };
    },
    toBeInstanceOf: function toBeInstanceOf() {
        return function(actual, expected) {
            return {
                pass: actual instanceof expected
            };
        };
    },
    toHave: function toHave() {
        return function(actual, expected) {
            return {
                pass: expected in actual
            }
        }
    }
};

beforeEach(function() {
    jasmine.addMatchers(customMatchers);
});
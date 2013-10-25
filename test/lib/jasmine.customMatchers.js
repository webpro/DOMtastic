var customMatchers = {
    toBeOfType: function toBeOfType() {
        return function(actual, expected) {
            pass: typeof actual === expected;
        };
    },
    toBeInstanceOf: function toBeInstanceOf() {
        return function(actual, expected) {
            return {
                pass: actual instanceof expected
            };
        };
    }
};

beforeEach(function() {
    jasmine.addMatchers(customMatchers);
});
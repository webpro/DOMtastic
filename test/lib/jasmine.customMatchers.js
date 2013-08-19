_addMatchers = function() {
    addMatchers({
        toBeOfType: function toBeOfType() {
            return {
                compare: function(actual, expected) {
                    return {
                        pass: typeof actual === expected
                    }
                }
            }
        },
        toBeInstanceOf: function toBeInstanceOf() {
            return {
                compare: function(actual, expected) {
                    return {
                        pass: actual instanceof expected
                    }
                }
            }
        }
    });
};

beforeEach(function() {
    _addMatchers();
});

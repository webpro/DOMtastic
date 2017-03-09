describe('type', function() {

  it('should have proper isFunction', function() {
    assert($.isFunction(function() {}));
    assert($.isFunction(new Function('')));
    assert($.isFunction([]) === false);
    assert($.isFunction([1]) === false);
    assert($.isFunction({}) === false);
    assert($.isFunction({ 0: 1 }) === false);
    assert($.isFunction(0) === false);
    assert($.isFunction(1) === false);
    assert($.isFunction('') === false);
    assert($.isFunction('1') === false);
    assert($.isFunction(undefined) === false);
    assert($.isFunction(null) === false);
    assert($.isFunction(false) === false);
    assert($.isFunction(true) === false);
  });

  it('should have proper isArray', function() {
    assert($.isArray([]));
    assert($.isArray([1]));
    assert($.isArray(function() {}) === false);
    assert($.isArray(new Function('')) === false);
    assert($.isArray({}) === false);
    assert($.isArray({ 0: 1 }) === false);
    assert($.isArray(0) === false);
    assert($.isArray(1) === false);
    assert($.isArray('') === false);
    assert($.isArray('1') === false);
    assert($.isArray(undefined) === false);
    assert($.isArray(null) === false);
    assert($.isArray(false) === false);
    assert($.isArray(true) === false);
  });

});

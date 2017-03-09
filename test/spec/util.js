describe('util', function() {
  it('should have extend', function() {
    var actual = $.extend({ a: 1 }, { b: 2 }, { b: 3 });
    var expected = {
      a: 1,
      b: 3
    };
    assert.deepEqual(actual, expected);
  });
});

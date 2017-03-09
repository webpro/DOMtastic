describe('array (jQuery compat)', function() {

  before(function() {
    if(!('jqueryCompat' in $)) {
      this.skip();
    }
  });

  var noop = function() {
    return true;
  };

  it('should have proper filter', function() {
    var expected = $('#testFragment li[class]');
    var all = $('#testFragment li');
    var actual = all.filter(function(index, element) {
      assert(typeof index === 'number');
      assert(this === element);
      return !!element.className;
    }, expected);
    assert.deepEqual(actual, expected);
    assert(actual.length === 3);
  });

  it('should have proper filter (selector)', function() {
    var expected = $('#testFragment li[class]');
    var actual = $('#testFragment li').filter('[class]');
    assert.deepEqual(actual, expected);
    assert(actual.length === 3);
  });

  it('should have proper each', function() {
    var expected = $('#testFragment li');
    var actual = [];
    expected.each(function(index, element) {
      assert(typeof index === 'number');
      assert(this === element);
      actual.push(element);
    }, expected);
    assert(actual.length === 5);
    assert(actual[0] === expected[0]);
  });

  it('should have proper index', function() {
    var expected = 3;
    var elements = $('#testFragment li');
    var element = elements[3];
    var actual = elements.index(element);
    assert(actual === expected);
  });

  it('should have proper map', function() {
    var expected = $([1, 1, 1, 1, 1]);
    var all = $('#testFragment li');
    var actual = all.map(function(index, element) {
      assert(typeof index === 'number');
      assert(this === element);
      return element.nodeType
    }, expected);
    assert.deepEqual(actual, expected);
  });

  it('should provide a chainable API', function() {
    var expected = $('#testFragment li');
    var actual = expected.each(noop).reverse().filter(noop).reverse();
    assert.deepEqual(actual, expected);
  });

});

describe('array', function() {

  before(function() {
    if($.jqueryCompat === true) {
      this.skip();
    }
  });

  var noop = function() {
    return true;
  };

  it('should have proper every', function() {
    var expected = $('#testFragment li');
    var actual = expected.every(function(element, index, collection) {
      assert(typeof index === 'number');
      assert(collection === expected);
      assert(this === expected);
      return element.nodeType === 1;
    }, expected);
    assert(actual);
  });

  it('should have proper filter', function() {
    var expected = $('#testFragment li[class]');
    var all = $('#testFragment li');
    var actual = all.filter(function(element, index, collection) {
      assert(typeof index === 'number');
      assert(collection === all);
      assert(this === expected);
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

  it('should have proper forEach', function() {
    var expected = $('#testFragment li');
    var actual = [];
    expected.each(function(element, index, collection) {
      assert(typeof index === 'number');
      assert(collection === expected);
      assert(this === expected);
      actual.push(element);
    }, expected);
    assert(actual.length === 5);
    assert(actual[0] === expected[0]);
    assert(expected.forEach === expected.each);
  });

  it('should have proper indexOf', function() {
    var expected = 3;
    var elements = $('#testFragment li');
    var element = elements[3];
    var actual = elements.indexOf(element);
    assert(actual === expected);
  });

  it('should have proper map', function() {
    var expected = [1, 1, 1, 1, 1];
    var all = $('#testFragment li');
    var actual = all.map(function(element, index, collection) {
      assert(typeof index === 'number');
      assert(collection === all);
      assert(this === expected);
      return element.nodeType
    }, expected);
    assert.deepEqual(actual, expected);
  });

  it('should have proper pop', function() {
    var expected = $('#testFragment li')[4];
    var elements = $('#testFragment li');
    var actual = elements.pop();
    assert(actual === expected);
    assert(elements.length === 4);
  });

  it('should have proper push', function() {
    var elements = $('#testFragment li');
    var element = document.createElement('li');
    var actual = elements.push(element);
    assert(elements.length === 6);
    assert(actual === 6);
    assert(elements[5] === element);
  });

  it('should have proper reduce', function() {
    var expected = 5;
    var all = $('#testFragment li');
    var actual = all.reduce(function(previousValue, currentValue, index, collection) {
      assert(typeof previousValue === 'number');
      assert(currentValue === collection[index]);
      assert(typeof index === 'number');
      assert(collection === all);
      return previousValue + currentValue.nodeType
    }, 0);
    assert(actual === expected);
  });

  it('should have proper reduceRight', function() {
    var expected = 5;
    var all = $('#testFragment li');
    var actual = all.reduceRight(function(previousValue, currentValue, index, collection) {
      assert(typeof previousValue === 'number');
      assert(currentValue === collection[index]);
      assert(typeof index === 'number');
      assert(collection === all);
      return previousValue + currentValue.nodeType
    }, 0);
    assert(actual === expected);
  });

  it('should have proper reverse', function() {
    var expected = $('#testFragment li')[0];
    var actual = $('#testFragment li').reverse()[4];
    assert(actual === expected);
  });

  it('should have proper shift', function() {
    var expected = $('#testFragment li')[0];
    var elements = $('#testFragment li');
    var actual = elements.shift();
    assert(actual === expected);
    assert(elements.length === 4);
  });

  it('should have proper unshift', function() {
    var elements = $('#testFragment li');
    var element = document.createElement('li');
    var actual = elements.unshift(element);
    assert(elements.length === 6);
    assert(actual === 6);
    assert(elements[0] === element);
  });

  it('should provide a chainable API', function() {
    var expected = $('#testFragment li');
    var actual = expected.each(noop).reverse().filter(noop).reverse();
    assert.deepEqual(actual, expected);
  });

});

describe('array', function() {

  it('should have proper filter (selector)', function() {
    var expected = $('#testFragment li[class]');
    var actual = $('#testFragment li').filter('[class]');
    assert.deepEqual(actual, expected);
    assert(actual.length === 3);
  });

  it('should provide a chainable API', function() {
    var expected = $('#testFragment li');
    var actual = expected.each(function() {
      return this;
    }).reverse().filter(function() {
      return true;
    }).reverse();
    assert.deepEqual(actual, expected);
  });

  describe('(Array compat)', function() {

    before(function() {
      if($.jqueryCompat === true) {
        this.skip();
      }
    });

    it('should have proper every', function() {
      var expected = $('#testFragment li');
      var actual = expected.every(function(element, index, collection) {
        assert(element === expected[index]);
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
        assert(element === all[index]);
        assert(typeof index === 'number');
        assert(collection === all);
        assert(this === expected);
        return !!element.className;
      }, expected);
      assert.deepEqual(actual, expected);
      assert(actual.length === 3);
    });

    it('should have proper forEach', function() {
      var expected = $('#testFragment li');
      var actual = [];
      expected.each(function(element, index, collection) {
        assert(element === expected[index]);
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
        assert(element === all[index]);
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

  });

  describe('(jQuery compat)', function() {

    before(function() {
      if(!('jqueryCompat' in $)) {
        this.skip();
      }
    });

    it('should have jQuery\'s each', function() {
      var expected = $('#testFragment li');
      var actual = [];
      expected.each(function(index, element, collection) {
        assert(typeof index === 'number');
        assert(element === expected[index]);
        assert(collection === undefined);
        assert(this === element);
        actual.push(element);
      }, expected);
      assert(actual.length === 5);
      assert(actual[0] === expected[0]);
    });

    it('should have jQuery\'s filter', function() {
      var expected = $('#testFragment li[class]');
      var all = $('#testFragment li');
      var actual = all.filter(function(index, element, collection) {
        assert(typeof index === 'number');
        assert(element === all[index]);
        assert(collection === undefined);
        assert(this === element);
        return !!element.className;
      }, expected);
      assert.deepEqual(actual, expected);
      assert(actual.length === 3);
    });

    it('should have jQuery\'s index', function() {
      var expected = 3;
      var elements = $('#testFragment li');
      var element = elements[3];
      var actual = elements.index(element);
      assert(actual === expected);
    });

    it('should have jQuery\'s map', function() {
      var expected = $([1, 1, 1, 1, 1]);
      var all = $('#testFragment li');
      var actual = all.map(function(index, element, collection) {
        assert(typeof index === 'number');
        assert(element === all[index]);
        assert(collection === undefined);
        assert(this === element);
        return element.nodeType
      }, expected);
      assert.deepEqual(actual, expected);
    });

    it('should not have indexOf, pop, push, shift, unshift', function() {
      assert($.fn.indexOf === undefined);
      assert($.fn.pop === undefined);
      assert($.fn.push === undefined);
      assert($.fn.shift === undefined);
      assert($.fn.unshift === undefined);
    });

  });

});

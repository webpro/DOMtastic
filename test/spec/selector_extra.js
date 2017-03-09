describe('selectors (extra)', function() {

  describe('children', function() {

    it('should return children', function() {
      var actual = $('#testFragment ul').children();
      var expected = $('#testFragment li');
      assert(actual.length === 5);
      assert.deepEqual(actual, expected);
    });

    it('should return only elements', function() {
      var children = $('<ul><li></li><!-- --><li></li>foo<li></li></ul>').children();
      assert(children.length === 3);
      assert(children[1].nodeType === 1);
      assert(children[2].nodeType === 1);
    });

    it('should not return elements from comment node', function() {
      var children = $('<!--warning-->').children();
      assert(children.length === 0);
    });

    it('should return filtered children', function() {
      var actual = $('#testFragment ul').children('[class]');
      var expected = $('#testFragment li[class]');
      assert(actual.length === 3);
      assert.deepEqual(actual, expected);
    });

  });

  describe('contents', function() {

    it('should return child nodes', function() {
      var actual = $('<ul><li></li><li></li><li></li></ul>').contents();
      assert(actual.length === 3);
      assert(actual[2].nodeType === 1);
    });

    it('should return elements, including comment and text nodes', function() {
      var children = $('<ul><li></li><!-- --><li></li>foo<li></li></ul>').contents();
      assert(children.length === 5);
      assert(children[0].nodeType === 1);
      assert(children[1].nodeType === 8);
      assert(children[3].nodeType === 3);
    });

    it('should return child nodes from each element', function() {
      var children = $('<p>1</p><p>2</p>').contents();
      assert(children.length === 2);
    });

    it('should not return elements from comment node', function() {
      var children = $('<!--warning-->').contents();
      assert(children.length === 0);
    });

  });

  describe('eq', function() {

    it('should reduce to one', function() {
      var expected = $('#testFragment li.three');
      var actual = $('#testFragment li').eq(2);
      assert(actual[0] === expected[0]);
    });

    it('should reduce to one (negative index)', function() {
      var expected = $('#testFragment li.fourth');
      var actual = $('#testFragment li').eq(-2);
      assert(actual[0] === expected[0]);
    });

  });

  describe('get', function() {

    it('should return DOM element', function() {
      var expected = $('#testFragment li.three');
      var actual = $('#testFragment li').get(2);
      assert(actual === expected[0]);
    });

  });

  describe('parent', function() {

    it('should return single direct parent', function() {
      var actual = $('#testFragment ul').parent();
      var expected = $('#testFragment');
      assert(actual.length === 1);
      assert.deepEqual(actual, expected);
    });

    it('should return direct parents', function() {
      var actual = $('#testFragment li span').parent();
      var expected = $('#testFragment li');
      assert(actual.length === 5);
      assert.deepEqual(actual, expected);
    });

    it('should return filtered parents', function() {
      var actual = $('#testFragment li span').parent('[class]');
      var expected = $('#testFragment li[class]');
      assert(actual.length === 3);
      assert.deepEqual(actual, expected);
    });

  });

  describe('siblings', function() {

    it('should return siblings', function() {
      var actual = $('#testFragment .fourth').siblings();
      var expected = $('#testFragment li').filter(':not(.fourth)');
      assert(actual.length === 4);
      assert.deepEqual(actual, expected);
    });

    it('should return filtered siblings', function() {
      var actual = $('#testFragment .fourth').siblings('[class]');
      var expected = $('#testFragment li[class]').filter(':not(.fourth)');
      assert(actual.length === 2);
      assert.deepEqual(actual, expected);
    });

    it('should return no siblings', function() {
      var actual = $('#testFragment .fourth').siblings('.nothing');
      var expected = $('#testFragment li').filter('.nothing');
      assert(actual.length === 0);
      assert.deepEqual(actual, expected);
    });

  });

  describe('slice', function() {

    it('should slice the elements', function() {
      var expected = $('#testFragment li');
      var actual = $('#testFragment li').slice(-3, -1);
      assert(actual.length === 2);
      assert(actual[0] === expected[2]);
      assert(actual[1] === expected[3]);
    });

  });

  it('should provide a chainable API', function() {
    var expected = $('.two span');
    var actual = $('#testFragment ul').children('[class]').slice().children();
    assert(actual.length === 3);
    assert(actual[0] === expected[0]);
  });

});

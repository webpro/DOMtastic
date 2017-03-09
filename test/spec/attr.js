describe('attr', function() {

  describe('set', function() {

    it('should set attribute on element', function() {
      $(document.body).attr('myAttribute', 'myValue');
      var expected = 'myValue';
      var actual = document.body.getAttribute('myAttribute');
      assert(actual === expected);
    });

    it('should set attribute on elements', function() {
      $('#testFragment li').attr('myAttribute', 'myValue');
      var expected = 'myValue';
      var actual = $('.two')[0].getAttribute('myAttribute');
      assert(actual === expected);
    });

    it('should set multiple attributes on elements', function() {
      $('#testFragment li').attr({
        myAttribute: 'myValue',
        foo: 'bar'
      });
      var expected = 'bar';
      var actual = $('.two')[0].getAttribute('foo');
      assert(actual === expected);
    });

    it('should not throw when trying to set attribute in empty collection', function() {
      var element = $('#not-there');
      var fn = element.attr.bind(element);
      assert.doesNotThrow(fn, TypeError);
    });

  });

  describe('get', function() {

    it('should get attribute from first element', function() {
      $('#testFragment .two').attr('firstAttr', 'firstValue');
      var actual = $('#testFragment [class]').attr('firstAttr');
      var expected = 'firstValue';
      assert(actual === expected);
    });

    it('should not throw when trying to get attribute in empty collection', function() {
      var element = $('#not-there');
      var fn = element.attr.bind(element);
      var actual = element.attr('foo');
      assert.doesNotThrow(fn, TypeError);
      assert(actual === undefined);
    });

  });

  describe('removeAttr', function() {

    it('should remove attribute from element', function() {
      var element = $('<div data-foo="1"></div>');
      assert(element[0].attributes.length === 1);
      element.removeAttr('data-foo');
      assert(element[0].attributes.length === 0);
    });

    it('should remove attribute from elements', function() {
      var element = $('<span a="1"></span><span a="2"></span>');
      element.removeAttr('a');
      assert(element[0].attributes.length === 0);
      assert(element[1].attributes.length === 0);
    });

  });

  it('should provide a chainable API', function() {
    var element = $('#testEmpty').attr('foo', 'bar').attr('foo', 'baz');
    var expected = 'baz';
    var actual = element[0].getAttribute('foo');
    assert(actual === expected);
  });

});

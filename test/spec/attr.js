describe('attr', function() {

  describe('set', function() {

    it('should set attribute on element', function() {
      $(document.body).attr('myAttribute', 'myValue');
      var expected = 'myValue',
        actual = document.body.getAttribute('myAttribute');
      expect(actual).to.equal(expected);
    });

    it('should set attribute on elements', function() {
      $('#testFragment li').attr('myAttribute', 'myValue');
      var expected = 'myValue',
        actual = $('.two')[0].getAttribute('myAttribute');
      expect(actual).to.equal(expected);
    });

    it('should set multiple attributes on elements', function() {
      $('#testFragment li').attr({
        myAttribute: 'myValue',
        foo: 'bar'
      });
      var expected = 'bar',
        actual = $('.two')[0].getAttribute('foo');
      expect(actual).to.equal(expected);
    });

    it('should not throw when trying to set attribute in empty collection', function() {
      var element = $('#not-there'),
        fn = element.attr.bind(element);
      expect(fn).not.to.throw(TypeError);
    });

  });

  describe('get', function() {

    it('should get attribute from first element', function() {
      $('#testFragment .two').attr('firstAttr', 'firstValue');
      var actual = $('#testFragment [class]').attr('firstAttr'),
        expected = 'firstValue';
      expect(actual).to.equal(expected);
    });

    it('should not throw when trying to get attribute in empty collection', function() {
      var element = $('#not-there'),
        fn = element.attr.bind(element),
        actual = element.attr('foo');
      expect(fn).not.to.throw(TypeError);
      expect(actual).to.be.undefined;
    });

  });

  describe('removeAttr', function() {

    it('should remove attribute from element', function() {
      var element = $('<div data-foo="1"></div>');
      expect(element[0].attributes).to.have.length(1);
      element.removeAttr('data-foo');
      expect(element[0].attributes).to.have.length(0);
    });

    it('should remove attribute from elements', function() {
      var element = $('<span a="1"></span><span a="2"></span>');
      element.removeAttr('a');
      expect(element[0].attributes).to.have.length(0);
      expect(element[1].attributes).to.have.length(0);
    });

  });

  it('should provide a chainable API', function() {
    var element = $('#testEmpty').attr('foo', 'bar').attr('foo', 'baz'),
      expected = 'baz',
      actual = element[0].getAttribute('foo');
    expect(actual).to.equal(expected);
  });

});

describe('data', function() {

  describe('data', function() {

    describe('set', function() {

      it('should set data on element', function() {
        $(document.body).data('myAttribute', 'myValue');
        var expected = 'myValue',
          actual = document.body.dataset['myAttribute'];
        expect(actual).to.equal(expected);
      });

      it('should set data on elements', function() {
        $('#testFragment li').data('myAttribute', 'myValue');
        var expected = 'myValue',
          actual = $('.two')[0].dataset['myAttribute'];
        expect(actual).to.equal(expected);
      });

      it('should not throw when trying to set data in empty collection', function() {
        var element = $('#not-there'),
          fn = element.data.bind(element);
        expect(fn).not.to.throw(TypeError);
      });

    });

    describe('get', function() {

      it('should get data from first element', function() {
        var actual = $('#testFragment li').data('id'),
          expected = '1';
        expect(actual).to.equal(expected);
      });

      it('should get data from first element (by attr))', function() {
        $('#testFragment .two').data('firstAttr', 'firstValue');
        var actual = $('#testFragment [class]')[0].getAttribute('data-first-attr'),
          expected = 'firstValue';
        expect(actual).to.equal(expected);
      });

      it('should get data from first element', function() {
        $('#testFragment .two').data('secondAttr', 'secondValue');
        var actual = $('#testFragment [class]').data('secondAttr'),
          expected = 'secondValue';
        expect(actual).to.equal(expected);
      });

      it('should not throw when trying to get attribute in empty collection', function() {
        var element = $('#not-there'),
          fn = element.data.bind(element),
          actual = element.data('foo');
        expect(fn).not.to.throw(TypeError);
        expect(actual).to.be.undefined;
      });

    });

  });

  describe('prop', function() {

    describe('set', function() {

      it('should set property on element', function() {
        $(document.body).prop('myAttribute', 'myValue');
        var expected = 'myValue',
          actual = document.body['myAttribute'];
        expect(actual).to.equal(expected);
      });

      it('should set property on elements', function() {
        $('#testFragment li').prop('myAttribute', 'myValue');
        var expected = 'myValue',
          actual = $('.two')[0]['myAttribute'];
        expect(actual).to.equal(expected);
      });

      it('should not throw when trying to set property in empty collection', function() {
        var element = $('#not-there'),
          fn = element.prop.bind(element);
        expect(fn).not.to.throw(TypeError);
      });

    });

    describe('get', function() {

      it('should get property from first element', function() {
        $('#testFragment .two').prop('firstAttr', 'firstValue');
        var actual = $('#testFragment [class]').prop('firstAttr'),
          expected = 'firstValue';
        expect(actual).to.equal(expected);
      });

      it('should not throw when trying to get attribute in empty collection', function() {
        var element = $('#not-there'),
          fn = element.prop.bind(element),
          actual = element.prop('foo');
        expect(fn).not.to.throw(TypeError);
        expect(actual).to.be.undefined;
      });

    });

  });

  it('should provide a chainable API', function() {
    var element = $('#testEmpty').data('foo', 'bar').data('foo', 'baz').prop('foo', 'baz'),
      expected = 'baz',
      actual = element[0].dataset['foo'];
    expect(actual).to.equal(expected);
  });

});

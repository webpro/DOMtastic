describe('data', function() {

  var DATAKEYPROP = $helpers.isSupportsDataSet ? 'dataset' : '__DOMTASTIC_DATA__';

  describe('data', function() {

    describe('set', function() {

      it('should set data on element', function() {
        $(document.body).data('myAttribute', 'myValue');
        var expected = 'myValue';
        var actual = document.body[DATAKEYPROP]['myAttribute'];
        assert(actual === expected);
      });

      it('should set data on element (dasherized)', function() {
        $(document.body).data('my-other-attribute', 'myValue2');
        var expected = 'myValue2';
        var actual = document.body[DATAKEYPROP]['myOtherAttribute'];
        assert(actual === expected);
      });

      it('should set data on elements', function() {
        $('#testFragment li').data('myAttribute', 'myValue');
        var expected = 'myValue';
        var actual = $('.two')[0][DATAKEYPROP]['myAttribute'];
        assert(actual === expected);
      });

      it('should not throw when trying to set data in empty collection', function() {
        var element = $('#not-there');
        var fn = element.data.bind(element);
        assert.doesNotThrow(fn, TypeError);
      });

    });

    describe('get', function() {

      it('should get/set more data from first/same element', function() {
        $('#testFragment .two').data('secondAttr', 'secondValue');
        var actual = $('#testFragment [class]').data('secondAttr');
        var expected = 'secondValue';
        assert(actual === expected);
      });

      it('should get/set more data from first/same element (dasherized)', function() {
        $('#testFragment .two').data('third-attr', 'thirdValue');
        var actual = $('#testFragment [class]').data('third-attr');
        var expected = 'thirdValue';
        assert(actual === expected);
      });

      it('should not throw when trying to get attribute in empty collection', function() {
        var element = $('#not-there');
        var fn = element.data.bind(element);
        var actual = element.data('foo');
        assert.doesNotThrow(fn, TypeError);
        assert(actual === undefined);
      });

    });


    describe('get (native dataset)', function() {

      before(function() {
        if(!$helpers.isSupportsDataSet) {
          this.skip();
        }
      });

      it('should get data from first element', function() {
        var actual = $('#testFragment li').data('id');
        var expected = '1';
        assert(actual === expected);
      });

      it('should get data from first element (by attr)', function() {
        $('#testFragment .two').data('firstAttr', 'firstValue');
        var actual = $('#testFragment [class]')[0].getAttribute('data-first-attr');
        var expected = 'firstValue';
        assert(actual === expected);
      });

    });

  });

  describe('prop', function() {

    describe('set', function() {

      it('should set property on element', function() {
        $(document.body).prop('myAttribute', 'myValue');
        var expected = 'myValue';
        var actual = document.body['myAttribute'];
        assert(actual === expected);
      });

      it('should set property on elements', function() {
        $('#testFragment li').prop('myAttribute', 'myValue');
        var expected = 'myValue';
        var actual = $('.two')[0]['myAttribute'];
        assert(actual === expected);
      });

      it('should not throw when trying to set property in empty collection', function() {
        var element = $('#not-there');
        var fn = element.prop.bind(element);
        assert.doesNotThrow(fn, TypeError);
      });

    });

    describe('get', function() {

      it('should get property from first element', function() {
        $('#testFragment .two').prop('firstAttr', 'firstValue');
        var actual = $('#testFragment [class]').prop('firstAttr');
        var expected = 'firstValue';
        assert(actual === expected);
      });

      it('should not throw when trying to get attribute in empty collection', function() {
        var element = $('#not-there');
        var fn = element.prop.bind(element);
        var actual = element.prop('foo');
        assert.doesNotThrow(fn, TypeError);
        assert(actual === undefined);
      });

    });

  });

  it('should provide a chainable API', function() {
    var element = $('#testEmpty').data('foo', 'bar').data('foo', 'baz').prop('foo', 'baz');
    var expected = 'baz';
    var actual = element[0][DATAKEYPROP]['foo'];
    assert(actual === expected);
  });

});

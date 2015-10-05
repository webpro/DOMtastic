describe('data', function() {

    var DATAKEYPROP = '__DOMTASTIC_DATA__';

    describe('data', function() {

        describe('set', function() {

            it('should set data on element', function() {
                $(document.body).data('myAttribute', 'myValue');
                var expected = 'myValue',
                    actual = document.body[DATAKEYPROP]['myAttribute'];
                expect(actual).to.equal(expected);
            });

            it('should set data on elements', function() {
                $('#testFragment li').data('myAttribute', 'myValue');
                var expected = 'myValue',
                    actual = $('.two')[0][DATAKEYPROP]['myAttribute'];
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
                $('#testFragment .two').data('firstAttr', 'firstValue');
                var actual = $('#testFragment [class]').data('firstAttr'),
                    expected = 'firstValue';
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
            actual = element[0][DATAKEYPROP]['foo'];
        expect(actual).to.equal(expected);
    });

});

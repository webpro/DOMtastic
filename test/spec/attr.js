describe('attr', function() {

    it('should set and get an attribute on an element', function() {
        var element = getElement(document.body);
        element.attr('myAttribute', 'myValue');
        expect(document.body.getAttribute('myAttribute')).to.equal('myValue');
    });

    it('should set and get an attribute on elements', function() {
        var elements = getElement('#testFragment li');
        elements.attr('myAttribute', 'myValue');
        expect(getElement('.two')[0].getAttribute('myAttribute')).to.equal('myValue');
    });

    it('should set and get multiple attributes on elements', function() {
        var elements = getElement('#testFragment li');
        elements.attr({myAttribute: 'myValue', foo: 'bar'});
        elements.attr('myAttribute');
        expect(getElement('.two')[0].getAttribute('foo')).to.equal('bar');
    });

    it('should get attribute from first element', function() {
        var element = getElement('#testFragment .two').attr('firstAttr', 'firstValue');
        var actual = getElement('#testFragment [class]').attr('firstAttr');
        var expected = 'firstValue';
        expect(actual).to.equal(expected);
    });

    it('should not throw when trying to get attribute in empty collection', function() {
        var element = getElement('#not-there'),
            fn = element.attr.bind(element),
            actual = element.attr('foo');
        expect(fn).not.to.throw(TypeError);
        expect(actual).to.be.undefined;
    });

    it('should not throw when trying to set attribute in empty collection', function() {
        var element = getElement('#not-there'),
            fn = element.attr.bind(element),
            actual = element.attr('foo', 'bar');
        expect(fn).not.to.throw(TypeError);
        expect(actual).to.eql(element);
    });

    it('should provide a chainable API', function() {
        var expected = getElement('#testEmpty');
        var actual = expected.html('');
        expect(actual).to.be.equal(expected);
    });

});

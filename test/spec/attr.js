describe('attr', function() {

    it('should set and get an attribute on an element', function() {
        var element = getElement(document.body);
        element.attr('myAttribute', 'myValue');
        expect(document.body.getAttribute('myAttribute')).toBe('myValue');
    });

    it('should set and get an attribute on elements', function() {
        var elements = $('#testFragment li');
        elements.attr('myAttribute', 'myValue');
        expect($('.two')[0].getAttribute('myAttribute')).toBe('myValue');
    });

    it('should set and get multiple attributes on elements', function() {
        var elements = $('#testFragment li');
        elements.attr({myAttribute: 'myValue', foo: 'bar'});
        expect($('.two')[0].getAttribute('foo')).toBe('bar');
    });

});

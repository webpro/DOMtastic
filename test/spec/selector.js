describe('selectors', function() {

    it('should return an empty NodeList for falsey selectors', function() {
        expect($()).toBeInstanceOf(NodeList);
        expect($().length).toBe(0);
        expect($(null)).toBeInstanceOf(NodeList);
        expect($('')).toBeInstanceOf(NodeList);
        expect($(0)).toBeInstanceOf(NodeList);
    });

    it('should return queried elements', function() {
        var elements = $('#testFragment li');
        expect(elements.length).toBe(5);
    });

    it('should return queried elements within provided context', function() {
        var elements = $('li', document.getElementById('testFragment'));
        expect(elements.length).toBe(5);
    });

    it('should return the provided element', function() {
        expect($(window)).toBe(window);
        expect($(document)).toBe(document);
        expect($(document.body)).toBe(document.body);
    });

    it('should provide a chainable API', function() {
        var element = $('body').$('#testFragment').$('.two');
        expect(element[0]).toBe($('.two')[0]);
    });

});

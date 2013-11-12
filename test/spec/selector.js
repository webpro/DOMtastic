describe('selectors', function() {

    it('should return an empty NodeList for falsey selectors', function() {

        var actual = !$.isNative ? Array : NodeList;

        expect($()).toBeInstanceOf(actual);
        expect($().length).toBe(0);
        expect($(null)).toBeInstanceOf(actual);
        expect($('')).toBeInstanceOf(actual);
        expect($(0)).toBeInstanceOf(actual);
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
        expect($(window)[0]).toBe(window);
        expect($(document)[0]).toBe(document);
        expect($(document.body)[0]).toBe(document.body);
    });

    it('should provide a chainable API', function() {
        var element = $('body').find('#testFragment').find('.two');
        expect(element[0]).toBe($('.two')[0]);
    });

});

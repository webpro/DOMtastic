describe('selectors', function() {

    var html = '<article><section><p>foo</p><p>bar</p></section></article>';

    it('should return the wrapped object', function() {
        var expected = $('#testFragment li'),
            actual = $(expected);
        expect(actual).to.equal(expected);
    });

    it('should return an empty NodeList for falsey selectors', function() {

        expect($().find).to.be.a('function');
        expect($()).to.have.length(0);
        expect($(null)).to.have.length(0);
        expect($('')).to.have.length(0);
        expect($(0)).to.have.length(0);
    });

    it('should return queried elements', function() {
        var elements = $('#testFragment li');
        expect(elements).to.have.length(5);
    });

    it('should return queried elements within provided context', function() {
        var elements = $('li', document.getElementById('testFragment'));
        expect(elements).to.have.length(5);
    });

    it('should return queried elements within provided context (string)', function() {
        var elements = $('li', '#testFragment');
        expect(elements).to.have.length(5);
    });

    it('should return the provided element', function() {
        expect($(window)[0]).to.equal(window);
        expect($(document)[0]).to.equal(document);
        expect($(document.body)[0]).to.equal(document.body);
    });

    it('should create a DOM fragment from string', function() {
        var fragment = $(html);
        expect(fragment[0].outerHTML).to.equal(html);
    });

    it('should create a DOM fragment from string (self-closing tag)', function() {
        var fragment = $('<span/>');
        expect(fragment[0].outerHTML).to.equal('<span></span>');
    });

    it('should create a DOM fragment from string (tag)', function() {
        var fragment = $('<div></div>');
        expect(fragment[0].outerHTML).to.equal('<div></div>');
    });

    it('should create a comment node from string', function() {
        var actual = $('<!--comment-->');
        expect(actual).to.have.length(1);
        expect(actual[0].nodeType).to.equal(8);
        expect(actual[0].textContent).to.equal('comment');
    });

    describe('find', function() {

        it('should return queried descendants from each element in collection', function() {
            var actual = $('#testFragment li').find('span'),
                expected = $('#testFragment li span');
            expect(actual).to.have.length(5);
            expect(actual).to.have.same.elements(expected);
        });

        it('should return unique elements', function() {
            var parent = $('#testFragment')[0],
                collection = $([parent, parent]),
                actual = collection.find('li'),
                expected = $('#testFragment li');
            expect(actual).to.have.length(5);
            expect(actual).to.have.same.elements(expected);
        });

    });

    describe('closest', function() {

        it('should return closest matching element (self)', function() {
            var actual = $('#testFragment li.two').closest('.two'),
                expected = $('#testFragment li.two');
            expect(actual).to.have.length(1);
            expect(actual).to.have.same.elements(expected);
        });

        it('should return closest matching element', function() {
            var actual = $('#testFragment li.two').closest('ul'),
                expected = $('#testFragment ul');
            expect(actual).to.have.length(1);
            expect(actual).to.have.same.elements(expected);
        });

        it('should return queried descendants from each element in collection', function() {
            var actual = $('#testFragment li span').closest('li'),
                expected = $('#testFragment li');
            expect(actual).to.have.length(5);
            expect(actual).to.have.same.elements(expected);
        });

        it('should return unique closest matching element', function() {
            var actual = $('#testFragment li').closest('ul'),
                expected = $('#testFragment ul');
            expect(actual).to.have.length(1);
            expect(actual).to.have.same.elements(expected);
        });

        it('should return closest matching element within context', function() {
            var context = $('#testFragment')[0],
                actual = $('#testFragment li.two').closest('ul', context),
                expected = $('#testFragment ul');
            expect(actual).to.have.length(1);
            expect(actual).to.have.same.elements(expected);
        });

        it('should return empty set if matching element is not within context', function() {
            var context = $('#testFragment ul')[0],
                actual = $('#testFragment li.two').closest('body', context),
                expected = $('#testFragment ul');
            expect(actual).to.have.length(0);
        });

        it('should return empty collection when there are no matches', function() {
            var actual = $('#testFragment').closest('.foo'),
                expected = $('.foo');
            expect(actual).to.have.length(0);
            expect(actual).to.have.same.elements(expected);
        });

    });

    it('should provide a chainable API', function() {
        var element = $('body').find('#testFragment').find('.two');
        expect(element[0]).to.equal($('.two')[0]);
    });

});

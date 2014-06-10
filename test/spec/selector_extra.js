!$.isNative && describe('selectors (extra)', function() {

    describe('children', function() {

        it('should return children', function() {
            var actual = $('#testFragment ul').children(),
                expected = $('#testFragment li');
            expect(actual).to.have.length(5);
            expect(actual).to.have.same.elements(expected);
        });

        it('should return only elements', function() {
            var children = $('<ul><li></li><!-- --><li></li>foo<li></li></ul>').children();
            expect(children).to.have.length(3);
            expect(children[1].nodeType).to.equal(1);
            expect(children[2].nodeType).to.equal(1);
        });

        it('should not return elements from comment node', function() {
            var children = $('<!--warning-->').children();
            expect(children).to.have.length(0);
        });

        it('should return filtered children', function() {
            var actual = $('#testFragment ul').children('[class]'),
                expected = $('#testFragment li[class]');
            expect(actual).to.have.length(3);
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

        it('should return empty collection when there are no matches', function() {
            var actual = $('#testFragment').closest('.foo'),
                expected = $('.foo');
            expect(actual).to.have.length(0);
            expect(actual).to.have.same.elements(expected);
        });

    });

    describe('contents', function() {

        it('should return child nodes', function() {
            var actual = $('<ul><li></li><li></li><li></li></ul>').contents();
            expect(actual).to.have.length(3);
            expect(actual[2].nodeType).to.equal(1);
        });

        it('should return elements, including comment and text nodes', function() {
            var children = $('<ul><li></li><!-- --><li></li>foo<li></li></ul>').contents();
            expect(children).to.have.length(5);
            expect(children[0].nodeType).to.equal(1);
            expect(children[1].nodeType).to.equal(8);
            expect(children[3].nodeType).to.equal(3);
        });

        it('should return child nodes from each element', function() {
            var children = $('<p>1</p><p>2</p>').contents();
            expect(children).to.have.length(2);
        });

        it('should not return elements from comment node', function() {
            var children = $('<!--warning-->').contents();
            expect(children).to.have.length(0);
        });

    });

    describe('eq', function() {

        it('should reduce to one', function() {
            var expected = $('#testFragment li.three'),
                actual = $('#testFragment li').eq(2);
            expect(actual[0]).to.be.equal(expected[0]);
        });

        it('should reduce to one (negative index)', function() {
            var expected = $('#testFragment li.fourth'),
                actual = $('#testFragment li').eq(-2);
            expect(actual[0]).to.be.equal(expected[0]);
        });

    });

    describe('get', function() {

        it('should return DOM element', function() {
            var expected = $('#testFragment li.three'),
                actual = $('#testFragment li').get(2);
            expect(actual).to.be.equal(expected[0]);
        });

    });

    describe('parent', function() {

        it('should return single direct parent', function() {
            var actual = $('#testFragment ul').parent(),
                expected = $('#testFragment');
            expect(actual).to.have.length(1);
            expect(actual).to.have.same.elements(expected);
        });

        it('should return direct parents', function() {
            var actual = $('#testFragment li span').parent(),
                expected = $('#testFragment li');
            expect(actual).to.have.length(5);
            expect(actual).to.have.same.elements(expected);
        });

        it('should return filtered parents', function() {
            var actual = $('#testFragment li span').parent('[class]'),
                expected = $('#testFragment li[class]');
            expect(actual).to.have.length(3);
            expect(actual).to.have.same.elements(expected);
        });

    });

    describe('slice', function() {

        it('should slice the elements', function() {
            var expected = $('#testFragment li'),
                actual = $('#testFragment li').slice(-3, -1);
            expect(actual).to.have.length(2);
            expect(actual[0]).to.equal(expected[2]);
            expect(actual[1]).to.equal(expected[3]);
        });

    });

    it('should provide a chainable API', function() {
        var expected = $('.two span'),
            actual = $('#testFragment ul').children('[class]').slice().children();
        expect(actual).to.have.length(3);
        expect(actual[0]).to.equal(expected[0]);
    });

});

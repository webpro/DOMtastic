!$.isNative && describe('selectors (extra)', function() {

    describe('children', function() {

        it('should return children', function() {
            var actual = $('#testFragment ul').children(),
                expected = $('#testFragment li');
            expect(actual.length).to.equal(5);
            expect(actual).to.eql(expected);
        });

        it('should return filtered children', function() {
            var actual = $('#testFragment ul').children('[class]'),
                expected = $('#testFragment li[class]');
            expect(actual.length).to.equal(3);
            expect(actual).to.eql(expected);
        });

    });

    describe('parent', function() {

        it('should return single direct parent', function() {
            var actual = $('#testFragment ul').parent(),
                expected = $('#testFragment');
            expect(actual.length).to.equal(1);
            expect(actual).to.eql(expected);
        });

        it('should return direct parents', function() {
            var actual = $('#testFragment li span').parent(),
                expected = $('#testFragment li');
            expect(actual.length).to.equal(5);
            expect(actual[0]).to.equal(expected[0]);
        });

        it('should return filtered parents', function() {
            var actual = $('#testFragment li span').parent('[class]'),
                expected = $('#testFragment li[class]');
            expect(actual.length).to.equal(3);
            expect(actual).to.eql(expected);
        });

    });

    describe('closest', function() {

        it('should return closest matching element (self)', function() {
            var actual = $('#testFragment li.two').closest('.two'),
                expected = $('#testFragment li.two');
            expect(actual.length).to.equal(1);
            expect(actual).to.eql(expected);
        });

        it('should return closest matching element', function() {
            var actual = $('#testFragment li.two').closest('ul'),
                expected = $('#testFragment ul');
            expect(actual.length).to.equal(1);
            expect(actual).to.eql(expected);
        });

        it('should return empty collection when there are no matches', function() {
            var actual = $('#testFragment').closest('.foo'),
                expected = $('.foo');
            expect(actual.length).to.equal(0);
            expect(actual).to.eql(expected);
        });

    });

    describe('get', function() {

        it('should return DOM element', function() {
            var expected = $('#testFragment li.three'),
                actual = $('#testFragment li').get(2);
            expect(actual).to.be.equal(expected[0]);
        });

    });


    describe('get', function() {

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

    describe('slice', function() {

        it('should slice the elements', function() {
            var expected = $('#testFragment li'),
                actual = $('#testFragment li').slice(-3, -1);
            expect(actual.length).to.be.equal(2);
            expect(actual[0]).to.be.equal(expected[2]);
            expect(actual[1]).to.be.equal(expected[3]);
        });

    });

    it('should provide a chainable API', function() {
        var expected = $('.two span'),
            actual = $('#testFragment ul').children('[class]').slice().children();
        expect(actual.length).to.equal(3);
        expect(actual[0]).to.equal(expected[0]);
    });

});

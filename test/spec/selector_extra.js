!$.isNative && describe('selectors (extra)', function() {

    describe('children', function() {

        it('should return children', function() {
            var actual = getElement('#testFragment ul').children(),
                expected = getElement('#testFragment li');
            expect(actual.length).to.equal(5);
            expect(actual).to.eql(expected);
        });

        it('should return filtered children', function() {
            var actual = getElement('#testFragment ul').children('[class]'),
                expected = getElement('#testFragment li[class]');
            expect(actual.length).to.equal(3);
            expect(actual).to.eql(expected);
        });

    });

    describe('parent', function() {

        it('should return single direct parent', function() {
            var actual = getElement('#testFragment ul').parent(),
                expected = getElement('#testFragment');
            expect(actual.length).to.equal(1);
            expect(actual).to.eql(expected);
        });

        it('should return direct parents', function() {
            var actual = getElement('#testFragment li span').parent(),
                expected = getElement('#testFragment li');
            expect(actual.length).to.equal(5);
            expect(actual[0]).to.equal(expected[0]);
        });

        it('should return filtered parents', function() {
            var actual = getElement('#testFragment li span').parent('[class]'),
                expected = getElement('#testFragment li[class]');
            expect(actual.length).to.equal(3);
            expect(actual).to.eql(expected);
        });

    });

    describe('closest', function() {

        it('should return closest matching element (self)', function() {
            var actual = getElement('#testFragment li.two').closest('.two'),
                expected = getElement('#testFragment li.two');
            expect(actual.length).to.equal(1);
            expect(actual).to.eql(expected);
        });

        it('should return closest matching element', function() {
            var actual = getElement('#testFragment li.two').closest('ul'),
                expected = getElement('#testFragment ul');
            expect(actual.length).to.equal(1);
            expect(actual).to.eql(expected);
        });

        it('should return empty collection when there are no matches', function() {
            var actual = getElement('#testFragment').closest('.foo'),
                expected = getElement('.foo');
            expect(actual.length).to.equal(0);
            expect(actual).to.eql(expected);
        });

    });

    it('should return DOM element', function() {
        var expected = getElement('#testFragment li.three'),
            actual = getElement('#testFragment li').get(2);
        expect(actual).to.be.equal(expected[0]);
    });

    it('should reduce to one', function() {
        var expected = getElement('#testFragment li.three'),
            actual = getElement('#testFragment li').eq(2);
        expect(actual[0]).to.be.equal(expected[0]);
    });

    it('should reduce to one (negative index)', function() {
        var expected = getElement('#testFragment li.fourth'),
            actual = getElement('#testFragment li').eq(-2);
        expect(actual[0]).to.be.equal(expected[0]);
    });

    it('should slice the elements', function() {
        var expected = getElement('#testFragment li'),
            actual = getElement('#testFragment li').slice(-3, -1);
        expect(actual.length).to.be.equal(2);
        expect(actual[0]).to.be.equal(expected[2]);
        expect(actual[1]).to.be.equal(expected[3]);
    });

    it('should provide a chainable API', function() {
        var expected = getElement('.two span'),
            actual = getElement('#testFragment ul').children('[class]').slice().children();
        expect(actual.length).to.equal(3);
        expect(actual[0]).to.equal(expected[0]);
    });

});

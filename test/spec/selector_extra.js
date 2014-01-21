!$.isNative && describe('selectors (extra)', function() {

    it('should return children', function() {
        var elements = getElement('#testFragment ul').children();
        expect(elements.length).to.equal(5);
    });

    it('should return filtered children', function() {
        var elements = getElement('#testFragment ul').children('[class]');
        expect(elements.length).to.equal(3);
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

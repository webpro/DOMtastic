describe('array', function() {

    var noop = function() {
        return true;
    };

    it('should have proper each/forEach', function() {
        var expected = $('#testFragment li'),
            actual = [];
        expected.each(function(element) {
            actual.push(element);
        });
        expect(actual).to.have.length(5);
        expect(expected.forEach).to.equal(expected.each);
        expect(actual[0]).to.equal(expected[0]);
    });

    it('should have proper every', function() {
        var expected = $('#testFragment li'),
            actual = expected.every(function(element) {
                return element.nodeType === 1;
            });
        expect(actual).to.be.true;
    });

    it('should have proper filter (selector)', function() {
        var expected = $('#testFragment li[class]'),
            actual = $('#testFragment li').filter('[class]');
        expect(actual).to.eql(expected);
        expect(actual).to.have.length(3);
    });

    it('should have proper filter (function)', function() {
        var expected = $('#testFragment li[class]'),
            actual = $('#testFragment li').filter(function(element) {
                return !!element.className;
            });
        expect(actual).to.eql(expected);
        expect(actual).to.have.length(3);
    });

    it('should have proper map', function() {
        var expected = [1, 1, 1, 1, 1],
            actual = $('#testFragment li').map(function(element) {
                return element.nodeType
            });
        expect(actual).to.deep.equal(expected);
    });

    it('should have proper reverse', function() {
        var expected = $('#testFragment li')[0],
            actual = $('#testFragment li').reverse()[4];
        expect(actual).to.equal(expected);
    });

    it('should have proper indexOf', function() {
        var expected = 3,
            elements = $('#testFragment li'),
            element = elements[3],
            actual = elements.indexOf(element);
        expect(actual).to.equal(expected);
    });

    it('should provide a chainable API', function() {
        var expected = $('#testFragment li'),
            actual = expected.each(noop).reverse().filter(noop).reverse();
        expect(actual).to.eql(expected);
    });

});

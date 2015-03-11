describe('array (jQuery compat)', function() {

    var noop = function() {
        return true;
    };

    it('should have proper filter', function() {
        var expected = $('#testFragment li[class]'),
            all = $('#testFragment li'),
            actual = all.filter(function(index, element) {
                expect(index).to.be.a('number');
                expect(this).to.equal(element);
                return !!element.className;
            }, expected);
        expect(actual).to.have.same.elements(expected);
        expect(actual).to.have.length(3);
    });

    it('should have proper filter (selector)', function() {
        var expected = $('#testFragment li[class]'),
            actual = $('#testFragment li').filter('[class]');
        expect(actual).to.have.same.elements(expected);
        expect(actual).to.have.length(3);
    });

    it('should have proper each', function() {
        var expected = $('#testFragment li'),
            actual = [];
        expected.each(function(index, element) {
            expect(index).to.be.a('number');
            expect(this).to.equal(element);
            actual.push(element);
        }, expected);
        expect(actual).to.have.length(5);
        expect(actual[0]).to.equal(expected[0]);
    });

    it('should have proper index', function() {
        var expected = 3,
            elements = $('#testFragment li'),
            element = elements[3],
            actual = elements.index(element);
        expect(actual).to.equal(expected);
    });

    it('should have proper map', function() {
        var expected = $([1, 1, 1, 1, 1]),
            all = $('#testFragment li'),
            actual = all.map(function(index, element) {
                expect(index).to.be.a('number');
                expect(this).to.equal(element);
                return element.nodeType
            }, expected);
        expect(actual).to.deep.equal(expected);
    });

    it('should provide a chainable API', function() {
        var expected = $('#testFragment li'),
            actual = expected.each(noop).reverse().filter(noop).reverse();
        expect(actual).to.have.same.elements(expected);
    });

});

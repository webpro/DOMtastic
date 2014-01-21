describe('array', function() {

    var noop = function(){
        return true;
    };

    it('should have each/forEach', function() {
        var count = 0;
        var elements = getElement('#testFragment li').each(function() {
            count++;
        });
        expect(count).to.equal(5);
        expect(elements.forEach).to.equal(elements.each);
    });

    it('should have every', function() {
        var elements = getElement('#testFragment li');
        var result = elements.every(function(el) {
            return el.nodeType === 1;
        });
        expect(result).to.be.ok;
    });

    it('should have filter (selector)', function() {
        var elements = getElement('#testFragment li').filter('li');
        expect(elements.length).to.equal(5);
    });

    it('should have filter (function)', function() {
        var elements = getElement('#testFragment li').filter(function(el) {
            return el.className;
        });
        expect(elements.length).to.equal(3);
    });

    it('should have map', function() {
        var elements = getElement('#testFragment li');
        var result = elements.map(function(el) {
            return el.nodeType
        });
        expect(result).to.deep.equal([1, 1, 1, 1, 1]);
    });

    it('should have reverse', function() {
        var elements = getElement('#testFragment li');
        var result = elements.reverse();
        expect(result[1]).to.equal($('.fourth')[0]);
    });

    it('should provide a chainable API', function() {
        var expected = getElement('#testFragment li');
        var actual = expected.each(noop).reverse().filter(noop).reverse();
        expect(actual[0]).to.be.equal(expected[0]);
    });

});

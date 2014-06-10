describe('array', function() {

    var noop = function() {
        return true;
    };

    it('should have proper every', function() {
        var expected = $('#testFragment li'),
            actual = expected.every(function(element, index, collection) {
                expect(index).to.be.a('number');
                expect(collection).to.equal(expected);
                expect(this).to.equal(expected);
                return element.nodeType === 1;
            }, expected);
        expect(actual).to.be.true;
    });

    it('should have proper filter', function() {
        var expected = $('#testFragment li[class]'),
            all = $('#testFragment li'),
            actual = all.filter(function(element, index, collection) {
                expect(index).to.be.a('number');
                expect(collection).to.equal(all);
                expect(this).to.equal(expected);
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

    it('should have proper forEach', function() {
        var expected = $('#testFragment li'),
            actual = [];
        expected.each(function(element, index, collection) {
            expect(index).to.be.a('number');
            expect(collection).to.equal(expected);
            expect(this).to.equal(expected);
            actual.push(element);
        }, expected);
        expect(actual).to.have.length(5);
        expect(actual[0]).to.equal(expected[0]);
        expect(expected.forEach).to.equal(expected.each);
    });

    it('should have proper indexOf', function() {
        var expected = 3,
            elements = $('#testFragment li'),
            element = elements[3],
            actual = elements.indexOf(element);
        expect(actual).to.equal(expected);
    });

    it('should have proper map', function() {
        var expected = [1, 1, 1, 1, 1],
            all = $('#testFragment li'),
            actual = all.map(function(element, index, collection) {
                expect(index).to.be.a('number');
                expect(collection).to.equal(all);
                expect(this).to.equal(expected);
                return element.nodeType
            }, expected);
        expect(actual).to.deep.equal(expected);
    });

    it('should have proper pop', function() {
        var expected = $('#testFragment li')[4],
            elements = $('#testFragment li'),
            actual = elements.pop();
        expect(actual).to.equal(expected);
        expect(elements).to.have.length(4);
    });

    it('should have proper push', function() {
        var elements = $('#testFragment li'),
            element = document.createElement('li'),
            actual = elements.push(element);
        expect(elements).to.have.length(6);
        expect(actual).to.equal(6);
        expect(elements[5]).to.equal(element);
    });

    it('should have proper reverse', function() {
        var expected = $('#testFragment li')[0],
            actual = $('#testFragment li').reverse()[4];
        expect(actual).to.equal(expected);
    });

    it('should have proper shift', function() {
        var expected = $('#testFragment li')[0],
            elements = $('#testFragment li'),
            actual = elements.shift();
        expect(actual).to.equal(expected);
        expect(elements).to.have.length(4);
    });

    it('should have proper unshift', function() {
        var elements = $('#testFragment li'),
            element = document.createElement('li'),
            actual = elements.unshift(element);
        expect(elements).to.have.length(6);
        expect(actual).to.equal(6);
        expect(elements[0]).to.equal(element);
    });

    it('should provide a chainable API', function() {
        var expected = $('#testFragment li'),
            actual = expected.each(noop).reverse().filter(noop).reverse();
        expect(actual).to.have.same.elements(expected);
    });

});

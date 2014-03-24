describe('class methods', function() {

    it('should add a class', function() {
        var expected = getRndStr();
        getElement(document.body).addClass(expected);
        var actual = document.body.className;
        expect(actual).to.contain(expected);
    });

    it('should remove a class', function() {
        var unexpected = getRndStr();
        getElement(document.body).addClass(unexpected).removeClass(unexpected);
        var actual = document.body.className;
        expect(actual).not.to.contain(unexpected);
    });

    it('should toggle a class', function() {
        var expected = getRndStr();
        getElement(document.body).toggleClass(expected);
        var actual = document.body.className;
        expect(actual).to.contain(expected);
        getElement(document.body).toggleClass(expected);
        actual = document.body.className;
        expect(actual).not.to.contain(expected);
    });

    it('should check a class', function() {
        var expected = getRndStr(),
            actual = getElement('#testFragment').hasClass(expected);
        expect(actual).to.be.false;
        var actually = getElement('#testFragment').addClass(expected).hasClass(expected);
        expect(actually).to.be.true;
    });

    it('should check a class on a NodeList', function() {
        var actual = getElement('#testFragment li').hasClass('fourth');
        expect(actual).to.be.true;
    });

    it('should not throw when trying to add a class in empty collection', function() {
        var element = getElement('#not-there'),
            fn = element.addClass.bind(element);
        expect(fn).not.to.throw(TypeError);
    });

    it('should not throw when trying to check a class in empty collection', function() {
        var element = getElement('#not-there'),
            fn = element.attr.bind(element),
            actual = element.hasClass('testClass6');
        expect(fn).not.to.throw(TypeError);
        expect(actual).to.be.false;
    });

    it('should provide a chainable API', function() {
        var expected = getElement('#testFragment'),
            className = getRndStr(),
            actual = expected.addClass(className).removeClass(className).toggleClass(className);
        expect(actual).to.equal(expected);
    });

});

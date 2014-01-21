describe('class methods', function() {

    it('should add a class', function() {
        var element = getElement(document.body);
        element.addClass('testClass1');
        expect(document.body.className).to.contain('testClass1');
    });

    it('should remove a class', function() {
        var element = getElement(document.body);
        element.addClass('testClass2');
        element.removeClass('testClass2');
        expect(document.body.className).not.to.contain('testClass2');
    });

    it('should toggle a class', function() {
        var element = getElement(document.body);
        element.toggleClass('testClass3');
        expect(document.body.className).to.contain('testClass3');
        element.toggleClass('testClass3');
        expect(document.body.className).not.to.contain('testClass3');
    });

    it('should check a class', function() {
        var element = getElement(document.getElementById('testFragment'));
        expect(element.hasClass('testClass4')).to.equal(false);
        element.addClass('testClass4');
        expect(element.hasClass('testClass4')).to.equal(true);
    });

    it('should check a class on a NodeList', function() {
        var elements = getElement('#testFragment li');
        expect(elements.hasClass('fourth')).to.equal(true);
    });

    it('should provide a chainable API', function() {
        var expected = getElement('#testFragment');
        var actual = expected.addClass('testClass5').removeClass('testClass5').toggleClass('testClass5');
        expect(actual).to.be.equal(expected);
    });

});

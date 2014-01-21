describe('html', function() {

    var emptyContainer = getElement('#testEmpty'),
        html = '<article><section><p>foo</p><p>bar</p></section></article>';

    beforeEach(function() {
        emptyContainer[0].innerHTML = '';
    });

    it('should set the innerHTML for an element', function() {
        emptyContainer.html(html);
        expect(emptyContainer[0].innerHTML).to.equal(html);
    });

    it('should get the innerHTML for an element', function() {
        emptyContainer[0].innerHTML = html;
        expect(emptyContainer.html()).to.equal(html);
    });

    it('should provide a chainable API', function() {
        var expected = emptyContainer;
        var actual = expected.html('');
        expect(actual).to.be.equal(expected);
    });

});

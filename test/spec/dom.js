describe('dom', function() {

    var emptyContainer = getElement('#testEmpty'),
        container = getElement('#testElement'),
        containerHTML = '<div id="testChild"></div>',
        html = '<article><section><p>foo</p><p>bar</p></section></article>',
        htmlSmall = '<span>1</span>',
        htmlList = '<p>foo</p><p>bar</p><p>baz</p>',
        htmlText = 'text';

    beforeEach(function() {
        container[0].innerHTML = containerHTML;
        emptyContainer[0].innerHTML = '';
    });

    it('should append DOM string', function() {
        emptyContainer.append(html);
        expect(emptyContainer[0].innerHTML).to.equal(html);
    });

    it('should append DOM string (text node)', function() {
        emptyContainer.append(htmlText);
        expect(emptyContainer[0].innerHTML).to.equal(htmlText);
    });

    it('should append DOM element', function() {
        var element = getElement(html);
        emptyContainer.append(element);
        expect(emptyContainer[0].innerHTML).to.equal(html);
    });

    it('should append DOM elements', function() {
        var element = getElement(htmlList);
        emptyContainer.append(element);
        expect(emptyContainer[0].innerHTML).to.equal(htmlList);
    });

    it('should append DOM string to each element in NodeList', function() {
        emptyContainer.append(htmlList);
        getElement('#testEmpty > *').append(htmlSmall);
        expect(emptyContainer[0].innerHTML).to.equal('<p>foo' + htmlSmall + '</p><p>bar' + htmlSmall + '</p><p>baz' + htmlSmall + '</p>');
    });

    it('should append DOM element to each element in NodeList', function() {
        emptyContainer.append(htmlList);
        getElement('#testEmpty > *').append(getElement(htmlSmall));
        expect(emptyContainer[0].innerHTML).to.equal('<p>foo' + htmlSmall + '</p><p>bar' + htmlSmall + '</p><p>baz' + htmlSmall + '</p>');
    });

    it('should append DOM elements to each element in NodeList', function() {
        emptyContainer.append(htmlList);
        getElement('#testEmpty > *').append(getElement(htmlList));
        expect(emptyContainer[0].innerHTML).to.equal('<p>foo' + htmlList + '</p><p>bar' + htmlList + '</p><p>baz' + htmlList + '</p>');
    });

    it('should insert DOM string as previous sibling', function() {
        getElement('#testChild').before(html);
        expect(container[0].innerHTML).to.equal(html + containerHTML);
    });

    it('should insert DOM string (text node) as previous sibling', function() {
        getElement('#testChild').before(htmlText);
        expect(container[0].innerHTML).to.equal(htmlText + containerHTML);
    });

    it('should insert DOM element as previous sibling', function() {
        var child = getElement(html);
        getElement('#testChild').before(child);
        expect(container[0].innerHTML).to.equal(html + containerHTML);
    });

    it('should insert DOM elements as previous sibling', function() {
        var child = getElement(htmlList);
        getElement('#testChild').before(child);
        expect(container[0].innerHTML).to.equal(htmlList + containerHTML);
    });

    it('should insert DOM string as previous sibling to each element in NodeList', function() {
        emptyContainer.append(htmlList);
        getElement('#testEmpty > *').before(htmlSmall);
        expect(emptyContainer[0].innerHTML).to.equal(htmlSmall + '<p>foo</p>' + htmlSmall + '<p>bar</p>' + htmlSmall + '<p>baz</p>');
    });

    it('should insert DOM element as previous sibling to each element in NodeList', function() {
        emptyContainer.append(htmlList);
        getElement('#testEmpty > *').before(getElement(htmlSmall));
        expect(emptyContainer[0].innerHTML).to.equal(htmlSmall + '<p>foo</p>' + htmlSmall + '<p>bar</p>' + htmlSmall + '<p>baz</p>');
    });

    it('should insert DOM elements as previous siblings to each element in NodeList', function() {
        emptyContainer.append(htmlList);
        getElement('#testEmpty > *').before(getElement(htmlList));
        expect(emptyContainer[0].innerHTML).to.equal(htmlList + '<p>foo</p>' + htmlList + '<p>bar</p>' + htmlList + '<p>baz</p>');
    });

    it('should insert DOM string as next sibling', function() {
        getElement('#testChild').after(html);
        expect(container[0].innerHTML).to.equal(containerHTML + html);
    });

    it('should insert DOM string (text node) as next sibling', function() {
        getElement('#testChild').after(htmlText);
        expect(container[0].innerHTML).to.equal(containerHTML + htmlText);
    });

    it('should insert DOM element as next sibling', function() {
        var child = getElement(html);
        getElement('#testChild').after(child);
        expect(container[0].innerHTML).to.equal(containerHTML + html);
    });

    it('should insert DOM string as next sibling to each element in NodeList', function() {
        emptyContainer.append(htmlList);
        getElement('#testEmpty > *').after(htmlSmall);
        expect(emptyContainer[0].innerHTML).to.equal('<p>foo</p>' + htmlSmall + '<p>bar</p>' + htmlSmall + '<p>baz</p>' + htmlSmall);
    });

    it('should insert DOM element as next sibling to each element in NodeList', function() {
        emptyContainer.append(htmlList);
        getElement('#testEmpty > *').after(getElement(htmlSmall));
        expect(emptyContainer[0].innerHTML).to.equal('<p>foo</p>' + htmlSmall + '<p>bar</p>' + htmlSmall + '<p>baz</p>' + htmlSmall);
    });

    it('should insert DOM elements as next siblings to each element in NodeList', function() {
        emptyContainer.append(htmlList);
        getElement('#testEmpty > *').after(getElement(htmlList));
        expect(emptyContainer[0].innerHTML).to.equal('<p>foo</p>' + htmlList + '<p>bar</p>' + htmlList + '<p>baz</p>' + htmlList);
    });

    it('should insert DOM elements as next sibling', function() {
        var child = getElement(htmlList);
        getElement('#testChild').after(child);
        expect(container[0].innerHTML).to.equal(containerHTML + htmlList);
    });

    it('should provide a chainable API', function() {
        getElement('#testChild').append(html).before(html).after(html);
        expect(container[0].innerHTML).to.equal(html + '<div id="testChild">' + html + '</div>' + html);
    });

});

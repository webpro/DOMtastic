describe('DOM', function() {

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

    it('should create a DOM fragment from string', function() {
        var fragment = $(html);
        expect(fragment[0].outerHTML).toBe(html);
    });

    it('should append DOM string', function() {
        emptyContainer.append(html);
        expect(emptyContainer[0].innerHTML).toBe(html);
    });

    it('should append DOM string (text node)', function() {
        emptyContainer.append(htmlText);
        expect(emptyContainer[0].innerHTML).toBe(htmlText);
    });

    it('should append DOM element', function() {
        var element = $(html);
        emptyContainer.append(element);
        expect(emptyContainer[0].innerHTML).toBe(html);
    });

    it('should append DOM elements', function() {
        var element = $(htmlList);
        emptyContainer.append(element);
        expect(emptyContainer[0].innerHTML).toBe(htmlList);
    });

    it('should append DOM string to each element in NodeList', function() {
        emptyContainer.append(htmlList);
        getElement('#testEmpty > *').append(htmlSmall);
        expect(emptyContainer[0].innerHTML).toBe('<p>foo' + htmlSmall + '</p><p>bar' + htmlSmall + '</p><p>baz' + htmlSmall + '</p>');
    });

    it('should append DOM element to each element in NodeList', function() {
        emptyContainer.append(htmlList);
        getElement('#testEmpty > *').append($(htmlSmall));
        expect(emptyContainer[0].innerHTML).toBe('<p>foo' + htmlSmall + '</p><p>bar' + htmlSmall + '</p><p>baz' + htmlSmall + '</p>');
    });

    it('should append DOM elements to each element in NodeList', function() {
        emptyContainer.append(htmlList);
        getElement('#testEmpty > *').append($(htmlList));
        expect(emptyContainer[0].innerHTML).toBe('<p>foo' + htmlList + '</p><p>bar' + htmlList + '</p><p>baz' + htmlList + '</p>');
    });

    it('should insert DOM string as previous sibling', function() {
        getElement('#testChild').before(html);
        expect(container[0].innerHTML).toBe(html + containerHTML);
    });

    it('should insert DOM string (text node) as previous sibling', function() {
        getElement('#testChild').before(htmlText);
        expect(container[0].innerHTML).toBe(htmlText + containerHTML);
    });

    it('should insert DOM element as previous sibling', function() {
        var child = $(html);
        getElement('#testChild').before(child);
        expect(container[0].innerHTML).toBe(html + containerHTML);
    });

    it('should insert DOM elements as previous sibling', function() {
        var child = $(htmlList);
        getElement('#testChild').before(child);
        expect(container[0].innerHTML).toBe(htmlList + containerHTML);
    });

    it('should insert DOM string as previous sibling to each element in NodeList', function() {
        emptyContainer.append(htmlList);
        getElement('#testEmpty > *').before(htmlSmall);
        expect(emptyContainer[0].innerHTML).toBe(htmlSmall + '<p>foo</p>' + htmlSmall + '<p>bar</p>' + htmlSmall + '<p>baz</p>');
    });

    it('should insert DOM element as previous sibling to each element in NodeList', function() {
        emptyContainer.append(htmlList);
        getElement('#testEmpty > *').before($(htmlSmall));
        expect(emptyContainer[0].innerHTML).toBe(htmlSmall + '<p>foo</p>' + htmlSmall + '<p>bar</p>' + htmlSmall + '<p>baz</p>');
    });

    it('should insert DOM elements as previous siblings to each element in NodeList', function() {
        emptyContainer.append(htmlList);
        getElement('#testEmpty > *').before($(htmlList));
        expect(emptyContainer[0].innerHTML).toBe(htmlList + '<p>foo</p>' + htmlList + '<p>bar</p>' + htmlList + '<p>baz</p>');
    });

    it('should insert DOM string as next sibling', function() {
        getElement('#testChild').after(html);
        expect(container[0].innerHTML).toBe(containerHTML + html);
    });

    it('should insert DOM string (text node) as next sibling', function() {
        getElement('#testChild').after(htmlText);
        expect(container[0].innerHTML).toBe(containerHTML + htmlText);
    });

    it('should insert DOM element as next sibling', function() {
        var child = $(html);
        getElement('#testChild').after(child);
        expect(container[0].innerHTML).toBe(containerHTML + html);
    });

    it('should insert DOM string as next sibling to each element in NodeList', function() {
        emptyContainer.append(htmlList);
        getElement('#testEmpty > *').after(htmlSmall);
        expect(emptyContainer[0].innerHTML).toBe('<p>foo</p>' + htmlSmall + '<p>bar</p>' + htmlSmall + '<p>baz</p>' + htmlSmall);
    });

    it('should insert DOM element as next sibling to each element in NodeList', function() {
        emptyContainer.append(htmlList);
        getElement('#testEmpty > *').after($(htmlSmall));
        expect(emptyContainer[0].innerHTML).toBe('<p>foo</p>' + htmlSmall + '<p>bar</p>' + htmlSmall + '<p>baz</p>' + htmlSmall);
    });

    it('should insert DOM elements as next siblings to each element in NodeList', function() {
        emptyContainer.append(htmlList);
        getElement('#testEmpty > *').after($(htmlList));
        expect(emptyContainer[0].innerHTML).toBe('<p>foo</p>' + htmlList + '<p>bar</p>' + htmlList + '<p>baz</p>' + htmlList);
    });

    it('should insert DOM elements as next sibling', function() {
        var child = $(htmlList);
        getElement('#testChild').after(child);
        expect(container[0].innerHTML).toBe(containerHTML + htmlList);
    });

    it('should provide a chainable API', function() {
        getElement('#testChild').append(html).before(html).after(html);
        expect(container[0].innerHTML).toBe(html + '<div id="testChild">' + html + '</div>' + html);
    });

});

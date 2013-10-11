describe('DOM', function() {

    var emptyContainer = $('#testEmpty')[0],
        container = $('#testElement')[0],
        containerHTML = '<div id="testChild"></div>',
        html = '<article><section><p>foo</p><p>bar</p></section></article>',
        htmlList = '<p>foo</p><p>bar</p><p>baz</p>';

    beforeEach(function() {
        container.innerHTML = containerHTML;
        emptyContainer.innerHTML = '';
    });

    it('should create a DOM fragment from string', function() {
        var fragment = $(html);
        expect(fragment.outerHTML).toBe(html);
    });

    it('should append DOM string', function() {
        emptyContainer.append(html);
        expect(emptyContainer.innerHTML).toBe(html);
    });

    it('should append DOM element', function() {
        var element = $(html);
        emptyContainer.append(element);
        expect(emptyContainer.innerHTML).toBe(html);
    });

    it('should append DOM elements', function() {
        var element = $(htmlList);
        emptyContainer.append(element);
        expect(emptyContainer.innerHTML).toBe(htmlList);
    });

    it('should insert DOM string as previous sibling', function() {
        $('#testChild').before(html);
        expect(container.innerHTML).toBe(html + containerHTML);
    });

    it('should insert DOM element as previous sibling', function() {
        var child = $(html);
        $('#testChild').before(child);
        expect(container.innerHTML).toBe(html + containerHTML);
    });

    it('should insert DOM elements as previous sibling', function() {
        var child = $(htmlList);
        $('#testChild').before(child);
        expect(container.innerHTML).toBe(htmlList + containerHTML);
    });

    it('should insert DOM string as next sibling', function() {
        $('#testChild').after(html);
        expect(container.innerHTML).toBe(containerHTML + html);
    });

    it('should insert DOM element as next sibling', function() {
        var child = $(html);
        $('#testChild').after(child);
        expect(container.innerHTML).toBe(containerHTML + html);
    });

    it('should insert DOM elements as next sibling', function() {
        var child = $(htmlList);
        $('#testChild').after(child);
        expect(container.innerHTML).toBe(containerHTML + htmlList);
    });

    it('should provide a chainable API', function() {
        $('#testChild').append(html).before(html).after(html);
        expect(container.innerHTML).toBe(html + '<div id="testChild">' + html + '</div>' + html);
    });

});

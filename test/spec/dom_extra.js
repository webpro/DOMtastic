describe('dom (extra)', function() {

    var emptyContainer = getElement('#testEmpty'),
        container = getElement('#testElement'),
        containerHTML = '<div id="testChild"></div>',
        html = '<article><section><p>foo</p><p>bar</p></section></article>',
        htmlSmall = '<span>1</span>',
        htmlList = '<p>foo</p><p>bar</p><p>baz</p>';

    beforeEach(function() {
        container[0].innerHTML = containerHTML;
        emptyContainer[0].innerHTML = '';
    });

    describe('appendTo', function() {

        it('should appendTo DOM element', function() {
            var element = getElement(html);
            element.appendTo(emptyContainer);
            expect(emptyContainer[0].innerHTML).to.equal(html);
        });

        it('should appendTo DOM elements', function() {
            var element = getElement(htmlList);
            element.appendTo(emptyContainer);
            expect(emptyContainer[0].innerHTML).to.equal(htmlList);
        });

        it('should appendTo DOM element to each element in NodeList', function() {
            emptyContainer.append(htmlList);
            getElement(htmlSmall).appendTo(getElement('#testEmpty > *'));
            expect(emptyContainer[0].innerHTML).to.equal('<p>foo' + htmlSmall + '</p><p>bar' + htmlSmall + '</p><p>baz' + htmlSmall + '</p>');
        });

        it('should appendTo DOM elements to each element in NodeList', function() {
            emptyContainer.append(htmlList);
            getElement(htmlList).appendTo(getElement('#testEmpty > *'));
            expect(emptyContainer[0].innerHTML).to.equal('<p>foo' + htmlList + '</p><p>bar' + htmlList + '</p><p>baz' + htmlList + '</p>');
        });

    });

    describe('remove', function() {

        it('should remove the element', function() {
            var fragment = getElement(html);
            var parent = fragment.find('section');
            parent.remove();
            expect(fragment[0].outerHTML).to.equal('<article></article>');
        });

        it('should remove each element', function() {
            var fragment = getElement(html);
            var expected = fragment.find('p');
            var actual = expected.remove();
            expect(actual[0]).to.equal(expected[0]);
            expect(fragment[0].outerHTML).to.equal('<article><section></section></article>');
        });

    });

    describe('replaceWith', function() {

        it('should replace element (DOM string)', function() {
            var fragment = getElement(html);
            var expected = fragment.find('section');
            var actual = expected.replaceWith(htmlSmall);
            expect(actual[0]).to.equal(expected[0]);
            expect(fragment[0].outerHTML).to.equal('<article>' + htmlSmall + '</article>');
        });

        it('should replace each element', function() {
            var fragment = getElement(html);
            var expected = fragment.find('p');
            var actual = expected.replaceWith(htmlSmall);
            expect(actual[0]).to.equal(expected[0]);
            expect(fragment[0].outerHTML).to.equal('<article><section>' + htmlSmall + htmlSmall + '</section></article>');
        });

        it('should replace each element in the set with the new set', function() {
            var fragment = getElement(html);
            var expected = fragment.find('p');
            var actual = expected.replaceWith(getElement(htmlList));
            expect(actual[0]).to.equal(expected[0]);
            expect(fragment[0].outerHTML).to.equal('<article><section>' + htmlList + htmlList + '</section></article>');
        });

    });
});

describe('dom (extra)', function() {

    var emptyContainer = $('#testEmpty'),
        container = $('#testElement'),
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
            var element = $(html);
            element.appendTo(emptyContainer);
            expect(emptyContainer[0].innerHTML).to.equal(html);
        });

        it('should appendTo DOM elements', function() {
            var element = $(htmlList);
            element.appendTo(emptyContainer);
            expect(emptyContainer[0].innerHTML).to.equal(htmlList);
        });

        it('should appendTo DOM element to each element in NodeList', function() {
            emptyContainer.append(htmlList);
            $(htmlSmall).appendTo($('#testEmpty > *'));
            expect(emptyContainer[0].innerHTML).to.equal('<p>foo' + htmlSmall + '</p><p>bar' + htmlSmall + '</p><p>baz' + htmlSmall + '</p>');
        });

        it('should appendTo DOM elements to each element in NodeList', function() {
            emptyContainer.append(htmlList);
            $(htmlList).appendTo($('#testEmpty > *'));
            expect(emptyContainer[0].innerHTML).to.equal('<p>foo' + htmlList + '</p><p>bar' + htmlList + '</p><p>baz' + htmlList + '</p>');
        });

        it('should appendTo DOM string', function() {
            var element = $(htmlSmall);
            var unexpected = element[0].parentNode;
            element.appendTo('<p/>');
            var actual = element[0].parentNode
            expect(actual).not.to.equal(unexpected);
            expect(actual.nodeName.toLowerCase()).to.equal('p');
        });

    });

    describe('empty', function() {

        it('should empty the element', function() {
            var element = $(html).empty();
            expect(element[0].outerHTML).to.equal('<article></article>');
        });

        it('should empty each element', function() {
            var expected = $(html).find('p'),
                actual = expected.empty();
            expect(actual[0].parentNode.innerHTML).to.equal('<p></p><p></p>');
            expect(actual[0]).to.equal(expected[0]);
        });

    });

    describe('remove', function() {

        it('should remove the element', function() {
            var fragment = $(html);
            var parent = fragment.find('section');
            parent.remove();
            expect(fragment[0].outerHTML).to.equal('<article></article>');
        });

        it('should remove each element', function() {
            var fragment = $(html);
            var expected = fragment.find('p');
            var actual = expected.remove();
            expect(actual[0]).to.equal(expected[0]);
            expect(fragment[0].outerHTML).to.equal('<article><section></section></article>');
        });

    });

    describe('replaceWith', function() {

        it('should replace element (DOM string)', function() {
            var fragment = $(html);
            var expected = fragment.find('section');
            var actual = expected.replaceWith(htmlSmall);
            expect(actual[0]).to.equal(expected[0]);
            expect(fragment[0].outerHTML).to.equal('<article>' + htmlSmall + '</article>');
        });

        it('should replace each element', function() {
            var fragment = $(html);
            var expected = fragment.find('p');
            var actual = expected.replaceWith(htmlSmall);
            expect(actual[0]).to.equal(expected[0]);
            expect(fragment[0].outerHTML).to.equal('<article><section>' + htmlSmall + htmlSmall + '</section></article>');
        });

        it('should replace each element in the set with the new set', function() {
            var fragment = $(html);
            var expected = fragment.find('p');
            var actual = expected.replaceWith($(htmlList));
            expect(actual[0]).to.equal(expected[0]);
            expect(fragment[0].outerHTML).to.equal('<article><section>' + htmlList + htmlList + '</section></article>');
        });

    });

    describe('text', function() {

        it('should set the element value', function() {
            var element = $('<p/>');
            element.text('foo');
            expect(element[0].textContent).to.equal('foo');

            element.text(1);
            expect(element[0].textContent).to.equal('1');

            element.text(false);
            expect(element[0].textContent).to.equal('false');
        });

        it('should get the element value', function() {
            var element = $('<p>foo</p>');
            expect(element.text()).to.equal('foo');
        });

        it('should be chainable', function() {
            var element = $('<input/>');
            expect(element.text('smt')).to.be.equal(element);
        });

    });

    describe('val', function() {

        it('should set the element value', function() {
            var element = $('<input/>');
            element.val('foo');
            expect(element[0].value).to.equal('foo');

            element.val(1);
            expect(element[0].value).to.equal('1');

            element.val(false);
            expect(element[0].value).to.equal('false');
        });

        it('should get the element value', function() {
            var element = $('<select><option>foo</option><option selected>bar</option></select>');
            expect(element.val()).to.equal('bar');
        });

        it('should be chainable', function() {
            var element = $('<input/>');
            expect(element.val('smt')).to.be.equal(element);
        });

    });

});

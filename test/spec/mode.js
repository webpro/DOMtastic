describe('mode', function() {

    !$.isNative && describe('default', function() {

        it('should not augment native objects', function() {

            expect(Node.prototype).not.toHave('find');
            expect(NodeList.prototype).not.toHave('find');
            expect(NodeList.prototype).not.toHave('forEach');

        });

        it('should return a wrapped array of elements for calls to $()', function() {

            var result = getElement('#testFragment li');

            expect(result).not.toBeInstanceOf(NodeList);

            expect(result).toHave('find');
            expect(result).toHave('forEach');

            expect(result[0]).toBeInstanceOf(Node);
            expect(result[0]).not.toHave('find');
            expect(result[0]).not.toHave('forEach');

        });

    });

    $.isNative && describe('native', function() {

        it('should augment native objects', function() {

            expect(Node.prototype).toHave('find');
            expect(NodeList.prototype).toHave('find');
            expect(NodeList.prototype).toHave('forEach');

        });

        it('should return a NodeList for calls to $()', function() {

            var result = getElement('#testFragment li');

            expect(result).toBeInstanceOf(NodeList);

            expect(result).toHave('find');
            expect(result).toHave('forEach');

            expect(result[0]).toBeInstanceOf(Node);
            expect(result[0]).toHave('find');
            expect(result[0]).not.toHave('forEach');

        });

    });

    it('should not modify/augment the window object', function() {

        // Most browsers actually have [window.find](https://developer.mozilla.org/en-US/docs/Web/API/Window.find).
        expect(window.find).not.toBe(getElement(document).find);
        expect(window).not.toHave('forEach');

    });

    it('should return the correct collection', function() {

        var selector = '#testFragment li',
            result = document.querySelectorAll(selector),
            $result = $(selector);

        expect(result.length).toBe(5);

        for(var i = 0; i < result.length; i++) {
            expect(result[i]).toBe($result[i]);
        }
    });

    typeof $.native === 'function' && it('should be able to switch modes', function() {

        var revertMode = $.isNative,
            result;

        $.native();

        expect(Node.prototype.find).toBeOfType('function');
        expect(NodeList.prototype.find).toBeOfType('function');
        expect(NodeList.prototype.forEach).toBeOfType('function');

        result = $('#testFragment li');

        expect(result).toBeInstanceOf(NodeList);

        $.native(false);

        expect(Node.prototype).not.toHave('find');
        expect(NodeList.prototype).not.toHave('find');
        expect(NodeList.prototype).not.toHave('forEach');

        result = $('#testFragment li');

        expect(result).not.toBeInstanceOf(NodeList);

        $.native(revertMode);

    });

});

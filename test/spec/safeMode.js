describe('safeMode', function() {

    it('should not augment native objects', function() {

        if(!$.isNative) {

            expect(Node.prototype).not.toHave('find');
            expect(NodeList.prototype).not.toHave('find');

        } else {

            expect(Node.prototype).toHave('find');
            expect(NodeList.prototype).toHave('find');

        }

    });

    it('should wrap calls to $() in an array of elements, plus augmented behavior', function() {

        var result = $('#testFragment li');

        expect(result.length).toBe(5);
        expect(result[3]).toBe(document.querySelector('.fourth'));

        if(!$.isNative) {

            expect(result).toBeInstanceOf(Array);
            expect(result).toHave('find');
            expect(result).not.toBeInstanceOf(NodeList);

        } else {

            expect(result).toBeInstanceOf(NodeList);
            expect(result).toHave('find');
            expect(result).not.toBeInstanceOf(Array);

        }

    });

    it('should be able to switch modes', function() {

        var revertMode = $.isNative,
            result;

        $.native();

        result = $('#testFragment li');

        expect(Node.prototype.find).toBeOfType('function');
        expect(NodeList.prototype.find).toBeOfType('function');
        expect(NodeList.prototype.forEach).toBeOfType('function');
        expect(result).toBeInstanceOf(NodeList);

        $.native(false);

        result = $('#testFragment li');

        expect(Node.prototype.find).not.toBeOfType('function');
        expect(NodeList.prototype.find).not.toBeOfType('function');
        expect(NodeList.prototype.forEach).toBeOfType('undefined');
        expect(result).toBeInstanceOf(Array);

        $.native(revertMode);

    });

});

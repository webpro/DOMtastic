describe('mode', function() {

    !$.isNative && describe('default', function() {

        it('should not augment native objects', function() {

            expect(Node.prototype.find).to.be.an('undefined');
            expect(NodeList.prototype.find).to.be.an('undefined');
            expect(NodeList.prototype.forEach).to.be.an('undefined');

        });

        it('should return a wrapped array of elements for calls to $()', function() {

            var result = getElement('#testFragment li');

            expect(result).not.to.be.instanceof(NodeList);

            expect(result.find).to.be.a('function');
            expect(result.forEach).to.be.a('function');

            expect(result[0]).to.be.instanceof(Node);
            expect(result[0].find).to.be.an('undefined');
            expect(result[0].forEach).to.be.an('undefined');

        });

    });

    $.isNative && describe('native', function() {

        it('should augment native objects', function() {

            expect(Node.prototype.find).to.be.a('function')
            expect(NodeList.prototype.find).to.be.a('function')
            expect(NodeList.prototype.forEach).to.be.a('function')

        });

        it('should return a NodeList for calls to $()', function() {

            var result = getElement('#testFragment li');

            expect(result).to.be.instanceof(NodeList);

            expect(result.find).to.be.a('function');
            expect(result.forEach).to.be.a('function');

            expect(result[0]).to.be.instanceof(Node);
            expect(result[0].find).to.be.a('function');
            expect(result[0].forEach).to.be.a('function');

        });

    });

    it('should not modify/augment the window object', function() {

        // Most browsers actually have [window.find](https://developer.mozilla.org/en-US/docs/Web/API/Window.find).
        expect(window.find).not.to.equal(getElement(document).find);
        expect(window.forEach).to.be.an('undefined');

    });

    it('should return the correct collection', function() {

        var selector = '#testFragment li',
            result = document.querySelectorAll(selector),
            $result = $(selector);

        expect(result.length).to.equal(5);

        for(var i = 0; i < result.length; i++) {
            expect(result[i]).to.equal($result[i]);
        }
    });

    typeof $.native === 'function' && it('should be able to switch modes', function() {

        var revertMode = $.isNative,
            result;

        $.native();

        expect(Node.prototype.find).to.be.a('function');
        expect(NodeList.prototype.find).to.be.a('function');
        expect(NodeList.prototype.forEach).to.be.a('function');

        result = $('#testFragment li');

        expect(result).to.be.instanceof(NodeList);

        $.native(false);

        expect(Node.prototype.find).to.be.an('undefined');
        expect(NodeList.prototype.find).to.be.an('undefined');
        expect(NodeList.prototype.forEach).to.be.an('undefined');

        result = $('#testFragment li');

        expect(result).not.to.be.instanceof(NodeList);

        $.native(revertMode);

    });

});

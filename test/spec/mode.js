describe('mode', function() {

    describe('default', function() {

        it('should not augment native objects', function() {

            expect(Node.prototype.find).to.be.undefined;
            expect(NodeList.prototype.find).to.be.undefined;
            expect(NodeList.prototype.forEach).to.be.undefined;

        });

        it('should return a wrapped array of elements for calls to $()', function() {

            var actual = $('#testFragment li');

            expect(actual).not.to.be.instanceof(NodeList);

            expect(actual.find).to.be.a('function');

            expect(actual[0]).to.be.instanceof(Node);
            expect(actual[0].find).to.be.undefined;

        });

    });

    it('should not modify/augment the window object', function() {

        // Most browsers actually have [window.find](https://developer.mozilla.org/en-US/docs/Web/API/Window.find).
        expect(window.find).not.to.equal($(document).find);

    });

    it('should return the correct collection', function() {

        var selector = '#testFragment li',
            actual = document.querySelectorAll(selector),
            $expected = $(selector);

        expect(actual).to.have.length(5);

        for (var i = 0; i < actual.length; i++) {
            expect(actual[i]).to.equal($expected[i]);
        }
    });

    typeof $.native === 'function' && describe('$.native()', function() {

        beforeEach(function() {
            $.native();
        });

        afterEach(function() {
            $.native(false);
        });

        it('should augment native objects', function() {

            expect(Node.prototype.find).to.be.a('function');
            expect(NodeList.prototype.find).to.be.a('function');

        });

        it('should return a NodeList for calls to $()', function() {

            var actual = $('#testFragment li');

            expect(actual).to.be.instanceof(NodeList);

            expect(actual.find).to.be.a('function');

            expect(actual[0]).to.be.instanceof(Node);
            expect(actual[0].find).to.be.a('function');

        });

        it('should operate on Elements directly', function() {

            var element = document.getElementById('testElement'),
                expected = element;

            element.each(function(actual, index, collection) {
                expect(actual).to.equal(expected);
                expect(collection).to.equal(element);
            });

            expect(element.attr('id')).to.equal('testElement');
            expect(element.html()).to.equal('<div id="testChild"></div>');

        });

        it('should correctly switch back to default mode', function() {

            $.native(false);

            expect(Node.prototype.find).to.be.undefined;
            expect(NodeList.prototype.find).to.be.undefined;

            var actual = $('#testFragment li');

            expect(actual).not.to.be.instanceof(NodeList);

        });
    })

});

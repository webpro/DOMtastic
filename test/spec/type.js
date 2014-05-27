describe('type', function() {

    it('should have proper isFunction', function() {
        expect($.isFunction(function(){})).to.be.true;
        expect($.isFunction(new Function(''))).to.be.true;
        expect($.isFunction([])).to.be.false;
        expect($.isFunction([1])).to.be.false;
        expect($.isFunction({})).to.be.false;
        expect($.isFunction({0:1})).to.be.false;
        expect($.isFunction(0)).to.be.false;
        expect($.isFunction(1)).to.be.false;
        expect($.isFunction('')).to.be.false;
        expect($.isFunction('1')).to.be.false;
        expect($.isFunction(undefined)).to.be.false;
        expect($.isFunction(null)).to.be.false;
        expect($.isFunction(false)).to.be.false;
        expect($.isFunction(true)).to.be.false;
    });

    it('should have proper isArray', function() {
        expect($.isArray(function(){})).to.be.false;
        expect($.isArray(new Function(''))).to.be.false;
        expect($.isArray([])).to.be.true;
        expect($.isArray([1])).to.be.true;
        expect($.isArray({})).to.be.false;
        expect($.isArray({0:1})).to.be.false;
        expect($.isArray(0)).to.be.false;
        expect($.isArray(1)).to.be.false;
        expect($.isArray('')).to.be.false;
        expect($.isArray('1')).to.be.false;
        expect($.isArray(undefined)).to.be.false;
        expect($.isArray(null)).to.be.false;
        expect($.isArray(false)).to.be.false;
        expect($.isArray(true)).to.be.false;
    });

});

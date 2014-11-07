describe('util', function() {
    it('should have extend', function() {
        var actual = $.extend({a:1}, {b:2}, {b:3}),
            expected = {a:1, b:3};
        expect(actual).to.eql(expected);
    });
});

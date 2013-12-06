describe('noConflict', function () {

    it('should return the $ variable to its previous owner', function () {

        var diplomat = $.noConflict();

        expect(window.$).toBeUndefined();

        window.$ = diplomat;

        expect(window.$).toBe(diplomat);

    });

});

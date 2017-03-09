describe('noConflict', function() {

  it('should return the $ variable to its previous owner', function() {

    var diplomat = $.noConflict();

    assert(typeof window.$ === 'undefined');

    window.$ = diplomat;

    assert(window.$ === diplomat);

  });

});

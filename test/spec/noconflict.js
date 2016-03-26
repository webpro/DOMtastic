describe('noConflict', function() {

  it('should return the $ variable to its previous owner', function() {

    var diplomat = $.noConflict();

    expect(window.$).to.be.an('undefined');

    window.$ = diplomat;

    expect(window.$).to.equal(diplomat);

  });

});

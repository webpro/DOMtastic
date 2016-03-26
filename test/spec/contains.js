describe('contains', function() {

  it('should recognize descendant element is contained by other element', function() {
    var container = document,
      element = $('#testFragment')[0];
    expect($.contains(container, element)).to.be.true;
  });

  it('should recognize descendant element is contained by other element (within detached fragment)', function() {
    var container = $('<div><span></span></div>'),
      element = container.find('span')[0];
    expect($.contains(container[0], element)).to.be.true;
  });

  it('should recognize ancestor element is not contained by other element', function() {
    var container = document,
      element = $('#testFragment')[0];
    expect($.contains(element, container)).to.be.false;
  });

  it('should recognize element is not contained by itself', function() {
    var element = $('#testFragment')[0];
    expect($.contains(element, element)).to.be.false;
  });

});

describe('contains', function() {

  it('should recognize descendant element is contained by other element', function() {
    var container = document;
    var element = $('#testFragment')[0];
    assert($.contains(container, element));
  });

  it('should recognize descendant element is contained by other element (within detached fragment)', function() {
    var container = $('<div><span></span></div>');
    var element = container.find('span')[0];
    assert($.contains(container[0], element));
  });

  it('should recognize ancestor element is not contained by other element', function() {
    var container = document;
    var element = $('#testFragment')[0];
    assert($.contains(element, container) === false);
  });

  it('should recognize element is not contained by itself', function() {
    var element = $('#testFragment')[0];
    assert($.contains(element, element) === false);
  });

});

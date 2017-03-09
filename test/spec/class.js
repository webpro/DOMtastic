describe('class methods', function() {

  it('should add a class', function() {
    var expected = $helpers.getRndStr();
    $(document.body).addClass(expected);
    assert(document.body.className.indexOf(expected) !== -1);
  });

  it('should add classes', function() {
    var expected = [$helpers.getRndStr(), $helpers.getRndStr()];
    $(document.body).addClass(expected.join(' '));
    assert(document.body.className.indexOf(expected[0]) !== -1);
    assert(document.body.className.indexOf(expected[1]) !== -1);
  });

  it('should remove a class', function() {
    var unexpected = $helpers.getRndStr();
    $(document.body).addClass(unexpected).removeClass(unexpected);
    assert(document.body.className.indexOf(unexpected) === -1);
  });

  it('should remove classes', function() {
    var unexpected = [$helpers.getRndStr(), $helpers.getRndStr()];
    $(document.body).addClass(unexpected[1]).addClass(unexpected[0]).removeClass(unexpected.join(' '));
    assert(document.body.className.indexOf(unexpected[0]) === -1);
    assert(document.body.className.indexOf(unexpected[1]) === -1);
  });

  it('should toggle a class', function() {
    var expected = $helpers.getRndStr();
    $(document.body).toggleClass(expected);
    assert(document.body.className.indexOf(expected) !== -1);
    $(document.body).toggleClass(expected);
    assert(document.body.className.indexOf(expected) === -1);
  });

  it('should toggle classes', function() {
    var expected = [$helpers.getRndStr(), $helpers.getRndStr()];
    $(document.body).toggleClass(expected[0]);
    $(document.body).toggleClass(expected.join(' '));
    assert(document.body.className.indexOf(expected[0]) === -1);
    assert(document.body.className.indexOf(expected[1]) !== -1);
  });

  it('should toggle a class explicitly', function() {
    var expected = $helpers.getRndStr();
    $(document.body).toggleClass(expected, false);
    assert(document.body.className.indexOf(expected) === -1);
    $(document.body).toggleClass(expected, true);
    assert(document.body.className.indexOf(expected) !== -1);
    $(document.body).toggleClass(expected, true);
    assert(document.body.className.indexOf(expected) !== -1);
  });

  it('should check a class', function() {
    var expected = $helpers.getRndStr();
    var hasClass = $('#testFragment').hasClass(expected);
    assert(hasClass === false);
    hasClass = $('#testFragment').addClass(expected).hasClass(expected);
    assert(hasClass);
  });

  it('should check a class on a NodeList', function() {
    var hasClass = $('#testFragment li').hasClass('fourth');
    assert(hasClass);
  });

  it('should not throw when trying to add a class in empty collection', function() {
    var element = $('#not-there');
    var fn = element.addClass.bind(element);
    assert.doesNotThrow(fn, TypeError);
  });

  it('should not throw when trying to check a class in empty collection', function() {
    var element = $('#not-there');
    var fn = element.hasClass.bind(element);
    var hasClass = element.hasClass('testClass6');
    assert.doesNotThrow(fn, TypeError);
    assert(hasClass === false);
  });

  it('should provide a chainable API', function() {
    var expected = $('#testFragment');
    var className = $helpers.getRndStr();
    var actual = expected.addClass(className).removeClass(className).toggleClass(className);
    assert.deepEqual(actual, expected);
  });

});

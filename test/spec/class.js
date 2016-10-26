describe('class methods', function() {

  it('should add a class', function() {
    var expected = getRndStr();
    $(document.body).addClass(expected);
    expect(document.body.className).to.contain(expected);
  });

  it('should add classes', function() {
    var expected = [getRndStr(), getRndStr()];
    $(document.body).addClass(expected.join(' '));
    expect(document.body.className).to.contain(expected[0]).and.to.contain(expected[1]);
  });

  it('should remove a class', function() {
    var unexpected = getRndStr();
    $(document.body).addClass(unexpected).removeClass(unexpected);
    expect(document.body.className).not.to.contain(unexpected);
  });

  it('should remove classes', function() {
    var unexpected = [getRndStr(), getRndStr()];
    $(document.body).addClass(unexpected[1]).addClass(unexpected[0]).removeClass(unexpected.join(' '));
    expect(document.body.className).not.to.contain(unexpected[0]).and.not.to.contain(unexpected[1]);
  });

  it('should toggle a class', function() {
    var expected = getRndStr();
    $(document.body).toggleClass(expected);
    expect(document.body.className).to.contain(expected);
    $(document.body).toggleClass(expected);
    expect(document.body.className).not.to.contain(expected);
  });

  it('should toggle classes', function() {
    var expected = [getRndStr(), getRndStr()];
    $(document.body).toggleClass(expected[0]);
    $(document.body).toggleClass(expected.join(' '));
    expect(document.body.className).to.contain(expected[1]).and.not.to.contain(expected[0]);
  });

  it('should toggle a class explicitly', function() {
    var expected = getRndStr();
    $(document.body).toggleClass(expected, false);
    expect(document.body.className).to.not.contain(expected);
    $(document.body).toggleClass(expected, true);
    expect(document.body.className).to.contain(expected);
    $(document.body).toggleClass(expected, true);
    expect(document.body.className).to.contain(expected);
  });

  it('should check a class', function() {
    var expected = getRndStr(),
      hasClass = $('#testFragment').hasClass(expected);
    expect(hasClass).to.be.false;
    hasClass = $('#testFragment').addClass(expected).hasClass(expected);
    expect(hasClass).to.be.true;
  });

  it('should check a class on a NodeList', function() {
    var hasClass = $('#testFragment li').hasClass('fourth');
    expect(hasClass).to.be.true;
  });

  it('should not throw when trying to add a class in empty collection', function() {
    var element = $('#not-there'),
      fn = element.addClass.bind(element);
    expect(fn).not.to.throw(TypeError);
  });

  it('should not throw when trying to check a class in empty collection', function() {
    var element = $('#not-there'),
      fn = element.hasClass.bind(element),
      hasClass = element.hasClass('testClass6');
    expect(fn).not.to.throw(TypeError);
    expect(hasClass).to.be.false;
  });

  it('should provide a chainable API', function() {
    var expected = $('#testFragment'),
      className = getRndStr(),
      actual = expected.addClass(className).removeClass(className).toggleClass(className);
    expect(actual).to.have.same.elements(expected);
  });

});

describe('dom (extra)', function() {

  var emptyContainer = $('#testEmpty');
  var container = $('#testElement');
  var containerHTML = '<div id="testChild"></div>';
  var html = '<article><section><p>foo</p><p>bar</p></section></article>';
  var htmlSmall = '<span>1</span>';
  var htmlList = '<p>foo</p><p>bar</p><p>baz</p>';

  beforeEach(function() {
    container[0].innerHTML = containerHTML;
    emptyContainer[0].innerHTML = '';
  });

  describe('appendTo', function() {

    it('should appendTo DOM element', function() {
      var element = $(html);
      element.appendTo(emptyContainer);
      assert(emptyContainer[0].innerHTML === html);
    });

    it('should appendTo DOM elements', function() {
      var element = $(htmlList);
      element.appendTo(emptyContainer);
      assert(emptyContainer[0].innerHTML === htmlList);
    });

    it('should appendTo DOM element to each element in NodeList', function() {
      emptyContainer.append(htmlList);
      $(htmlSmall).appendTo($('#testEmpty > *'));
      assert(emptyContainer[0].innerHTML === '<p>foo' + htmlSmall + '</p><p>bar' + htmlSmall + '</p><p>baz' + htmlSmall + '</p>');
    });

    it('should appendTo DOM elements to each element in NodeList', function() {
      emptyContainer.append(htmlList);
      $(htmlList).appendTo($('#testEmpty > *'));
      assert(emptyContainer[0].innerHTML === '<p>foo' + htmlList + '</p><p>bar' + htmlList + '</p><p>baz' + htmlList + '</p>');
    });

    it('should appendTo DOM string', function() {
      var element = $(htmlSmall);
      var unexpected = element[0].parentNode;
      element.appendTo('<p/>');
      var actual = element[0].parentNode
      assert(actual !== unexpected);
      assert(actual.nodeName.toLowerCase() === 'p');
    });

  });

  describe('empty', function() {

    it('should empty the element', function() {
      var element = $(html).empty();
      assert(element[0].outerHTML === '<article></article>');
    });

    it('should empty each element', function() {
      var expected = $(html).find('p');
      var actual = expected.empty();
      assert(actual[0].parentNode.innerHTML === '<p></p><p></p>');
      assert(actual[0] === expected[0]);
    });

  });

  describe('remove', function() {

    it('should remove the element', function() {
      var fragment = $(html);
      var parent = fragment.find('section');
      parent.remove();
      assert(fragment[0].outerHTML === '<article></article>');
    });

    it('should remove each element', function() {
      var fragment = $(html);
      var expected = fragment.find('p');
      var actual = expected.remove();
      assert(actual[0] === expected[0]);
      assert(fragment[0].outerHTML === '<article><section></section></article>');
    });

  });

  describe('replaceWith', function() {

    it('should replace element (DOM string)', function() {
      var fragment = $(html);
      var expected = fragment.find('section');
      var actual = expected.replaceWith(htmlSmall);
      assert(actual[0] === expected[0]);
      assert(fragment[0].outerHTML === '<article>' + htmlSmall + '</article>');
    });

    it('should replace each element', function() {
      var fragment = $(html);
      var expected = fragment.find('p');
      var actual = expected.replaceWith(htmlSmall);
      assert(actual[0] === expected[0]);
      assert(fragment[0].outerHTML === '<article><section>' + htmlSmall + htmlSmall + '</section></article>');
    });

    it('should replace each element in the set with the new set', function() {
      var fragment = $(html);
      var expected = fragment.find('p');
      var actual = expected.replaceWith($(htmlList));
      assert(actual[0] === expected[0]);
      assert(fragment[0].outerHTML === '<article><section>' + htmlList + htmlList + '</section></article>');
    });

  });

  describe('text', function() {

    it('should set the element value', function() {
      var element = $('<p/>');
      element.text('foo');
      assert(element[0].textContent === 'foo');

      element.text(1);
      assert(element[0].textContent === '1');

      element.text(false);
      assert(element[0].textContent === 'false');
    });

    it('should get the element value', function() {
      var element = $('<p>foo</p>');
      assert(element.text() === 'foo');
    });

    it('should be chainable', function() {
      var element = $('<input/>');
      assert(element.text('smt') === element);
    });

  });

  describe('val', function() {

    it('should set the element value', function() {
      var element = $('<input/>');
      element.val('foo');
      assert(element[0].value === 'foo');

      element.val(1);
      assert(element[0].value === '1');

      element.val(false);
      assert(element[0].value === 'false');
    });

    it('should get the element value', function() {
      var element = $('<select><option>foo</option><option selected>bar</option></select>');
      assert(element.val() === 'bar');
    });

    it('should be chainable', function() {
      var element = $('<input/>');
      assert(element.val('smt') === element);
    });

  });

});

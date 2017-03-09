describe('dom', function() {

  var emptyContainer = $('#testEmpty');
  var container = $('#testElement');
  var containerHTML = '<div id="testChild"></div>';
  var html = '<article><section><p>foo</p><p>bar</p></section></article>';
  var htmlSmall = '<span>1</span>';
  var htmlList = '<p>foo</p><p>bar</p><p>baz</p>';
  var htmlText = 'text';

  beforeEach(function() {
    container[0].innerHTML = containerHTML;
    emptyContainer[0].innerHTML = '';
  });

  describe('append', function() {

    it('should append DOM string', function() {
      emptyContainer.append(html);
      assert(emptyContainer[0].innerHTML === html);
    });

    it('should append DOM string (text node)', function() {
      emptyContainer.append(htmlText);
      assert(emptyContainer[0].innerHTML === htmlText);
    });

    it('should append DOM element', function() {
      var element = $(html);
      emptyContainer.append(element);
      assert(emptyContainer[0].innerHTML === html);
    });

    it('should append DOM element', function() {
      var element = $(htmlSmall)[0];
      emptyContainer.append(element);
      assert(emptyContainer[0].innerHTML === htmlSmall);
    });

    it('should append DOM elements', function() {
      var element = $(htmlList);
      emptyContainer.append(element);
      assert(emptyContainer[0].innerHTML === htmlList);
    });

    it('should append DOM string to each element in NodeList', function() {
      emptyContainer.append(htmlList);
      $('#testEmpty > *').append(htmlSmall);
      assert(emptyContainer[0].innerHTML === '<p>foo' + htmlSmall + '</p><p>bar' + htmlSmall + '</p><p>baz' + htmlSmall + '</p>');
    });

    it('should append DOM element to each element in NodeList', function() {
      emptyContainer.append(htmlList);
      $('#testEmpty > *').append($(htmlSmall));
      assert(emptyContainer[0].innerHTML === '<p>foo' + htmlSmall + '</p><p>bar' + htmlSmall + '</p><p>baz' + htmlSmall + '</p>');
    });

    it('should append DOM elements to each element in NodeList', function() {
      emptyContainer.append(htmlList);
      $('#testEmpty > *').append($(htmlList));
      assert(emptyContainer[0].innerHTML === '<p>foo' + htmlList + '</p><p>bar' + htmlList + '</p><p>baz' + htmlList + '</p>');
    });

    it('should append NodeList to element', function() {
      container[0].innerHTML = htmlList;
      var nodeList = container[0].querySelectorAll('p');
      emptyContainer.append(nodeList);
      assert(emptyContainer[0].innerHTML === htmlList);
    });

  });

  describe('prepend', function() {

    it('should prepend DOM string', function() {
      emptyContainer.prepend(html);
      assert(emptyContainer[0].innerHTML === html);
    });

    it('should prepend DOM string (text node)', function() {
      emptyContainer.prepend(htmlText);
      assert(emptyContainer[0].innerHTML === htmlText);
    });

    it('should prepend DOM element', function() {
      var element = $(html);
      emptyContainer.prepend(element);
      assert(emptyContainer[0].innerHTML === html);
    });

    it('should prepend DOM element', function() {
      var element = $(htmlSmall)[0];
      emptyContainer.prepend(element);
      assert(emptyContainer[0].innerHTML === htmlSmall);
    });

    it('should prepend DOM elements', function() {
      var element = $(htmlList);
      emptyContainer.prepend(element);
      assert(emptyContainer[0].innerHTML === htmlList);
    });

    it('should prepend DOM string to each element in NodeList', function() {
      emptyContainer.prepend(htmlList);
      $('#testEmpty > *').prepend(htmlSmall);
      assert(emptyContainer[0].innerHTML === '<p>' + htmlSmall + 'foo</p><p>' + htmlSmall + 'bar</p><p>' + htmlSmall + 'baz</p>');
    });

    it('should prepend DOM element to each element in NodeList', function() {
      emptyContainer.prepend(htmlList);
      $('#testEmpty > *').prepend($(htmlSmall));
      assert(emptyContainer[0].innerHTML === '<p>' + htmlSmall + 'foo</p><p>' + htmlSmall + 'bar</p><p>' + htmlSmall + 'baz</p>');
    });

    it('should prepend DOM elements to each element in NodeList', function() {
      emptyContainer.prepend(htmlList);
      $('#testEmpty > *').prepend($(htmlList));
      assert(emptyContainer[0].innerHTML === '<p>' + htmlList + 'foo</p><p>' + htmlList + 'bar</p><p>' + htmlList + 'baz</p>');
    });

    it('should prepend NodeList to element', function() {
      container[0].innerHTML = htmlList;
      var nodeList = container[0].querySelectorAll('p');
      emptyContainer.prepend(nodeList);
      assert(emptyContainer[0].innerHTML === htmlList);
    });

  });

  describe('before', function() {

    it('should insert DOM string as previous sibling', function() {
      $('#testChild').before(html);
      assert(container[0].innerHTML === html + containerHTML);
    });

    it('should insert DOM string (text node) as previous sibling', function() {
      $('#testChild').before(htmlText);
      assert(container[0].innerHTML === htmlText + containerHTML);
    });

    it('should insert DOM element as previous sibling', function() {
      var child = $(html);
      $('#testChild').before(child);
      assert(container[0].innerHTML === html + containerHTML);
    });

    it('should insert DOM elements as previous sibling', function() {
      var children = $(htmlList);
      $('#testChild').before(children);
      assert(container[0].innerHTML === htmlList + containerHTML);
    });

    it('should insert DOM string as previous sibling to each element in NodeList', function() {
      emptyContainer.append(htmlList);
      $('#testEmpty > *').before(htmlSmall);
      assert(emptyContainer[0].innerHTML === htmlSmall + '<p>foo</p>' + htmlSmall + '<p>bar</p>' + htmlSmall + '<p>baz</p>');
    });

    it('should insert DOM element as previous sibling to each element in NodeList', function() {
      emptyContainer.append(htmlList);
      $('#testEmpty > *').before($(htmlSmall));
      assert(emptyContainer[0].innerHTML === htmlSmall + '<p>foo</p>' + htmlSmall + '<p>bar</p>' + htmlSmall + '<p>baz</p>');
    });

    it('should insert DOM elements as previous siblings to each element in NodeList', function() {
      emptyContainer.append(htmlList);
      $('#testEmpty > *').before($(htmlList));
      assert(emptyContainer[0].innerHTML === htmlList + '<p>foo</p>' + htmlList + '<p>bar</p>' + htmlList + '<p>baz</p>');
    });

    it('should insert NodeList as previous sibling', function() {
      emptyContainer[0].innerHTML = htmlList;
      var nodeList = emptyContainer[0].querySelectorAll('p');
      $('#testChild').before(nodeList);
      assert(container[0].innerHTML === htmlList + containerHTML);
    });

  });

  describe('after', function() {

    it('should insert DOM string as next sibling', function() {
      $('#testChild').after(html);
      assert(container[0].innerHTML === containerHTML + html);
    });

    it('should insert DOM string (text node) as next sibling', function() {
      $('#testChild').after(htmlText);
      assert(container[0].innerHTML === containerHTML + htmlText);
    });

    it('should insert DOM element as next sibling', function() {
      var child = $(html);
      $('#testChild').after(child);
      assert(container[0].innerHTML === containerHTML + html);
    });

    it('should insert DOM string as next sibling to each element in NodeList', function() {
      emptyContainer.append(htmlList);
      $('#testEmpty > *').after(htmlSmall);
      assert(emptyContainer[0].innerHTML === '<p>foo</p>' + htmlSmall + '<p>bar</p>' + htmlSmall + '<p>baz</p>' + htmlSmall);
    });

    it('should insert DOM element as next sibling to each element in NodeList', function() {
      emptyContainer.append(htmlList);
      $('#testEmpty > *').after($(htmlSmall));
      assert(emptyContainer[0].innerHTML === '<p>foo</p>' + htmlSmall + '<p>bar</p>' + htmlSmall + '<p>baz</p>' + htmlSmall);
    });

    it('should insert DOM elements as next siblings to each element in NodeList', function() {
      emptyContainer.append(htmlList);
      $('#testEmpty > *').after($(htmlList));
      assert(emptyContainer[0].innerHTML === '<p>foo</p>' + htmlList + '<p>bar</p>' + htmlList + '<p>baz</p>' + htmlList);
    });

    it('should insert DOM elements as next sibling', function() {
      var child = $(htmlList);
      $('#testChild').after(child);
      assert(container[0].innerHTML === containerHTML + htmlList);
    });

    it('should insert NodeList as next sibling', function() {
      emptyContainer[0].innerHTML = htmlList;
      var nodeList = emptyContainer[0].querySelectorAll('p');
      $('#testChild').after(nodeList);
      assert(container[0].innerHTML === containerHTML + htmlList);
    });

  });

  describe('clone', function() {

    it('should clone the wrapped object', function() {
      var element = $('<div></div>');
      var clone = element.clone();

      assert(clone !== element);
      assert(clone[0] !== element[0]);
      assert(clone[0] instanceof Node);
      assert(clone[0].nodeType === element[0].nodeType);
    });

    it('should clone the element', function() {
      var div = document.createElement('div');
      var element = $(div);
      var clone = element.clone();
      assert(clone[0] !== div);
      assert(clone[0] instanceof Node);
      assert(clone[0].nodeType === div.nodeType);
    });

    it('should clone the DOM elements', function() {
      var element = $('#testFragment li');
      var clone = element.clone();
      assert(clone.length === 5);
      assert(clone[0].parentNode === null);
    });

    it('should deep clone', function() {
      var element = $('<div><span></span></div>');
      var clone = element.clone();
      assert(clone.find('span').length === 1);
    });

  });

  it('should provide a chainable API', function() {
    var element = $('#testChild').append(html).before(html).after(html);
    assert(container[0].innerHTML === html + '<div id="testChild">' + html + '</div>' + html);
  });

});

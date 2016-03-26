describe('dom', function() {

  var emptyContainer = $('#testEmpty'),
    container = $('#testElement'),
    containerHTML = '<div id="testChild"></div>',
    html = '<article><section><p>foo</p><p>bar</p></section></article>',
    htmlSmall = '<span>1</span>',
    htmlList = '<p>foo</p><p>bar</p><p>baz</p>',
    htmlText = 'text';

  beforeEach(function() {
    container[0].innerHTML = containerHTML;
    emptyContainer[0].innerHTML = '';
  });

  describe('append', function() {

    it('should append DOM string', function() {
      emptyContainer.append(html);
      expect(emptyContainer[0].innerHTML).to.equal(html);
    });

    it('should append DOM string (text node)', function() {
      emptyContainer.append(htmlText);
      expect(emptyContainer[0].innerHTML).to.equal(htmlText);
    });

    it('should append DOM element', function() {
      var element = $(html);
      emptyContainer.append(element);
      expect(emptyContainer[0].innerHTML).to.equal(html);
    });

    it('should append DOM element', function() {
      var element = $(htmlSmall)[0];
      emptyContainer.append(element);
      expect(emptyContainer[0].innerHTML).to.equal(htmlSmall);
    });

    it('should append DOM elements', function() {
      var element = $(htmlList);
      emptyContainer.append(element);
      expect(emptyContainer[0].innerHTML).to.equal(htmlList);
    });

    it('should append DOM string to each element in NodeList', function() {
      emptyContainer.append(htmlList);
      $('#testEmpty > *').append(htmlSmall);
      expect(emptyContainer[0].innerHTML).to.equal('<p>foo' + htmlSmall + '</p><p>bar' + htmlSmall + '</p><p>baz' + htmlSmall + '</p>');
    });

    it('should append DOM element to each element in NodeList', function() {
      emptyContainer.append(htmlList);
      $('#testEmpty > *').append($(htmlSmall));
      expect(emptyContainer[0].innerHTML).to.equal('<p>foo' + htmlSmall + '</p><p>bar' + htmlSmall + '</p><p>baz' + htmlSmall + '</p>');
    });

    it('should append DOM elements to each element in NodeList', function() {
      emptyContainer.append(htmlList);
      $('#testEmpty > *').append($(htmlList));
      expect(emptyContainer[0].innerHTML).to.equal('<p>foo' + htmlList + '</p><p>bar' + htmlList + '</p><p>baz' + htmlList + '</p>');
    });

    it('should append NodeList to element', function() {
      container[0].innerHTML = htmlList;
      var nodeList = container[0].querySelectorAll('p');
      emptyContainer.append(nodeList);
      expect(emptyContainer[0].innerHTML).to.equal(htmlList);
    });

  });

  describe('prepend', function() {

    it('should prepend DOM string', function() {
      emptyContainer.prepend(html);
      expect(emptyContainer[0].innerHTML).to.equal(html);
    });

    it('should prepend DOM string (text node)', function() {
      emptyContainer.prepend(htmlText);
      expect(emptyContainer[0].innerHTML).to.equal(htmlText);
    });

    it('should prepend DOM element', function() {
      var element = $(html);
      emptyContainer.prepend(element);
      expect(emptyContainer[0].innerHTML).to.equal(html);
    });

    it('should prepend DOM element', function() {
      var element = $(htmlSmall)[0];
      emptyContainer.prepend(element);
      expect(emptyContainer[0].innerHTML).to.equal(htmlSmall);
    });

    it('should prepend DOM elements', function() {
      var element = $(htmlList);
      emptyContainer.prepend(element);
      expect(emptyContainer[0].innerHTML).to.equal(htmlList);
    });

    it('should prepend DOM string to each element in NodeList', function() {
      emptyContainer.prepend(htmlList);
      $('#testEmpty > *').prepend(htmlSmall);
      expect(emptyContainer[0].innerHTML).to.equal('<p>' + htmlSmall + 'foo</p><p>' + htmlSmall + 'bar</p><p>' + htmlSmall + 'baz</p>');
    });

    it('should prepend DOM element to each element in NodeList', function() {
      emptyContainer.prepend(htmlList);
      $('#testEmpty > *').prepend($(htmlSmall));
      expect(emptyContainer[0].innerHTML).to.equal('<p>' + htmlSmall + 'foo</p><p>' + htmlSmall + 'bar</p><p>' + htmlSmall + 'baz</p>');
    });

    it('should prepend DOM elements to each element in NodeList', function() {
      emptyContainer.prepend(htmlList);
      $('#testEmpty > *').prepend($(htmlList));
      expect(emptyContainer[0].innerHTML).to.equal('<p>' + htmlList + 'foo</p><p>' + htmlList + 'bar</p><p>' + htmlList + 'baz</p>');
    });

    it('should prepend NodeList to element', function() {
      container[0].innerHTML = htmlList;
      var nodeList = container[0].querySelectorAll('p');
      emptyContainer.prepend(nodeList);
      expect(emptyContainer[0].innerHTML).to.equal(htmlList);
    });

  });

  describe('before', function() {

    it('should insert DOM string as previous sibling', function() {
      $('#testChild').before(html);
      expect(container[0].innerHTML).to.equal(html + containerHTML);
    });

    it('should insert DOM string (text node) as previous sibling', function() {
      $('#testChild').before(htmlText);
      expect(container[0].innerHTML).to.equal(htmlText + containerHTML);
    });

    it('should insert DOM element as previous sibling', function() {
      var child = $(html);
      $('#testChild').before(child);
      expect(container[0].innerHTML).to.equal(html + containerHTML);
    });

    it('should insert DOM elements as previous sibling', function() {
      var children = $(htmlList);
      $('#testChild').before(children);
      expect(container[0].innerHTML).to.equal(htmlList + containerHTML);
    });

    it('should insert DOM string as previous sibling to each element in NodeList', function() {
      emptyContainer.append(htmlList);
      $('#testEmpty > *').before(htmlSmall);
      expect(emptyContainer[0].innerHTML).to.equal(htmlSmall + '<p>foo</p>' + htmlSmall + '<p>bar</p>' + htmlSmall + '<p>baz</p>');
    });

    it('should insert DOM element as previous sibling to each element in NodeList', function() {
      emptyContainer.append(htmlList);
      $('#testEmpty > *').before($(htmlSmall));
      expect(emptyContainer[0].innerHTML).to.equal(htmlSmall + '<p>foo</p>' + htmlSmall + '<p>bar</p>' + htmlSmall + '<p>baz</p>');
    });

    it('should insert DOM elements as previous siblings to each element in NodeList', function() {
      emptyContainer.append(htmlList);
      $('#testEmpty > *').before($(htmlList));
      expect(emptyContainer[0].innerHTML).to.equal(htmlList + '<p>foo</p>' + htmlList + '<p>bar</p>' + htmlList + '<p>baz</p>');
    });

    it('should insert NodeList as previous sibling', function() {
      emptyContainer[0].innerHTML = htmlList;
      var nodeList = emptyContainer[0].querySelectorAll('p');
      $('#testChild').before(nodeList);
      expect(container[0].innerHTML).to.equal(htmlList + containerHTML);
    });

  });

  describe('after', function() {

    it('should insert DOM string as next sibling', function() {
      $('#testChild').after(html);
      expect(container[0].innerHTML).to.equal(containerHTML + html);
    });

    it('should insert DOM string (text node) as next sibling', function() {
      $('#testChild').after(htmlText);
      expect(container[0].innerHTML).to.equal(containerHTML + htmlText);
    });

    it('should insert DOM element as next sibling', function() {
      var child = $(html);
      $('#testChild').after(child);
      expect(container[0].innerHTML).to.equal(containerHTML + html);
    });

    it('should insert DOM string as next sibling to each element in NodeList', function() {
      emptyContainer.append(htmlList);
      $('#testEmpty > *').after(htmlSmall);
      expect(emptyContainer[0].innerHTML).to.equal('<p>foo</p>' + htmlSmall + '<p>bar</p>' + htmlSmall + '<p>baz</p>' + htmlSmall);
    });

    it('should insert DOM element as next sibling to each element in NodeList', function() {
      emptyContainer.append(htmlList);
      $('#testEmpty > *').after($(htmlSmall));
      expect(emptyContainer[0].innerHTML).to.equal('<p>foo</p>' + htmlSmall + '<p>bar</p>' + htmlSmall + '<p>baz</p>' + htmlSmall);
    });

    it('should insert DOM elements as next siblings to each element in NodeList', function() {
      emptyContainer.append(htmlList);
      $('#testEmpty > *').after($(htmlList));
      expect(emptyContainer[0].innerHTML).to.equal('<p>foo</p>' + htmlList + '<p>bar</p>' + htmlList + '<p>baz</p>' + htmlList);
    });

    it('should insert DOM elements as next sibling', function() {
      var child = $(htmlList);
      $('#testChild').after(child);
      expect(container[0].innerHTML).to.equal(containerHTML + htmlList);
    });

    it('should insert NodeList as next sibling', function() {
      emptyContainer[0].innerHTML = htmlList;
      var nodeList = emptyContainer[0].querySelectorAll('p');
      $('#testChild').after(nodeList);
      expect(container[0].innerHTML).to.equal(containerHTML + htmlList);
    });

  });

  describe('clone', function() {

    it('should clone the wrapped object', function() {
      var element = $('<div></div>'),
        clone = element.clone();

      expect(clone).not.to.equal(element);
      expect(clone[0]).not.to.equal(element[0]);
      expect(clone[0]).to.be.instanceof(Node);
      expect(clone[0].nodeType).to.equal(element[0].nodeType);
    });

    it('should clone the element', function() {
      var div = document.createElement('div'),
        element = $(div),
        clone = element.clone();
      expect(clone[0]).not.to.equal(div);
      expect(clone[0]).to.be.instanceof(Node);
      expect(clone[0].nodeType).to.equal(div.nodeType);
    });

    it('should clone the DOM elements', function() {
      var element = $('#testFragment li'),
        clone = element.clone();
      expect(clone).to.have.length(5);
      expect(clone[0].parentNode).to.be.null;
    });

    it('should deep clone', function() {
      var element = $('<div><span></span></div>'),
        clone = element.clone();
      expect(clone.find('span')).to.have.length(1);
    });

  });

  it('should provide a chainable API', function() {
    var element = $('#testChild').append(html).before(html).after(html);
    expect(container[0].innerHTML).to.equal(html + '<div id="testChild">' + html + '</div>' + html);
  });

});

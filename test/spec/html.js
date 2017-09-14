describe('html', function() {

  var emptyContainer = $('#testEmpty');
  var html = '<article><section><p>foo</p><p>bar</p></section></article>';

  beforeEach(function() {
    emptyContainer[0].innerHTML = '';
  });

  describe('set', function() {

    it('should set the innerHTML for an element', function() {
      emptyContainer.html(html);
      assert(emptyContainer[0].innerHTML === html);
    });

    it('should set the innerHTML of a <fieldset> (<legend>)', function() {
      var $select = $('<fieldset/>');
      var html = '<legend>1</legend>';
      $select.html(html);
      assert($select[0].innerHTML === html);
    });

    it('should set the innerHTML of a <fieldset> (<div>)', function() {
      var $select = $('<fieldset/>');
      var html = '<div>1</div>';
      $select.html(html);
      assert($select[0].innerHTML === html);
    });

    it('should not throw when trying to set html in empty collection', function() {
      var element = $('#not-there');
      var fn = element.html.bind(element);
      var actual = element.html('brop');
      assert.doesNotThrow(fn, TypeError);
      assert.deepEqual(actual, element);
    });

    it('should set html if content is number', function () {
      emptyContainer.html(20);
      assert(emptyContainer[0].innerHTML === '20');
    })

  });

  describe('set (magic)', function() {

    before(function() {
      if(!$helpers.isSupportsTableInnerHTML) {
        this.skip();
      }
    });

    it('should set the innerHTML of a <table> (<tr>)', function() {
      var $table = $('<table/>');
      var html = '<tr><td>1</td></tr>';
      var expected = '<tbody><tr><td>1</td></tr></tbody>';
      $table.html(html);
      assert($table[0].innerHTML === expected);
    });

    it('should set the innerHTML of a <table> (<tr><tr>)', function() {
      var $table = $('<table/>');
      var html = '<tr><td>1</td></tr><tr><td>2</td></tr>';
      var expected = '<tbody>' + html + '</tbody>';
      $table.html(html);
      assert($table[0].innerHTML === expected);
    });

    it('should set the innerHTML of a <table> (<td>)', function() {
      var $table = $('<table/>');
      var html = '<td>1</td>';
      var expected = '<tbody><tr><td>1</td></tr></tbody>';
      $table.html(html);
      assert($table[0].innerHTML === expected);
    });

    it('should set the innerHTML of a <table> (<div>)', function() {
      var $table = $('<table/>');
      var html = '<div>1</div>';
      $table.html(html);
      assert($table[0].innerHTML === html);
    });

    it('should set the innerHTML of a <select> (<option>)', function() {
      var $select = $('<select/>');
      var html = '<option>1</option>';
      $select.html(html);
      assert($select[0].innerHTML === html);
    });

    it('should set the innerHTML of a <select> (<option><option>)', function() {
      var $select = $('<select/>');
      var html = '<option>1</option><option>2</option>';
      $select.html(html);
      assert($select[0].innerHTML === html);
    });

    it('should set the innerHTML of a <select> (<div>)', function() {
      var $select = $('<select/>');
      var html = '<div>1</div>';
      var expected = '1';
      $select.html(html);
      assert($select[0].innerHTML === expected);
    });

  });

  describe('get', function() {

    it('should get the innerHTML for an element', function() {
      emptyContainer[0].innerHTML = html;
      assert(emptyContainer.html() === html);
    });

    it('should not throw when trying to get html in empty collection', function() {
      var element = $('#not-there');
      var fn = element.html.bind(element);
      var actual = element.html();
      assert.doesNotThrow(fn, TypeError);
      assert(actual === undefined);
    });

  });

  it('should provide a chainable API', function() {
    var expected = emptyContainer;
    var actual = expected.html('');
    assert(actual === expected);
  });

});

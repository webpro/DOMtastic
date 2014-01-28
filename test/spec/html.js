describe('html', function() {

    var emptyContainer = getElement('#testEmpty'),
        html = '<article><section><p>foo</p><p>bar</p></section></article>';

    beforeEach(function() {
        emptyContainer[0].innerHTML = '';
    });

    it('should set the innerHTML for an element', function() {
        emptyContainer.html(html);
        expect(emptyContainer[0].innerHTML).to.equal(html);
    });

    it('should get the innerHTML for an element', function() {
        emptyContainer[0].innerHTML = html;
        expect(emptyContainer.html()).to.equal(html);
    });

    it('should set the innerHTML of a <table> (<tr>)', function() {
        var $table = getElement('<table/>'),
            html = '<tr><td>1</td></tr>',
            expected = '<tbody><tr><td>1</td></tr></tbody>';
        $table.html(html);
        expect($table[0].innerHTML).to.equal(expected);
    });

    it('should set the innerHTML of a <table> (<tr><tr>)', function() {
        var $table = getElement('<table/>'),
            html = '<tr><td>1</td></tr><tr><td>2</td></tr>',
            expected = '<tbody>' + html + '</tbody>';
        $table.html(html);
        expect($table[0].innerHTML).to.equal(expected);
    });

    it('should set the innerHTML of a <table> (<td>)', function() {
        var $table = getElement('<table/>'),
            html = '<td>1</td>',
            expected = '<tbody><tr><td>1</td></tr></tbody>';
        $table.html(html);
        expect($table[0].innerHTML).to.equal(expected);
    });

    it('should set the innerHTML of a <table> (<div>)', function() {
        var $table = getElement('<table/>'),
            html = '<div>1</div>';
        $table.html(html);
        expect($table[0].innerHTML).to.equal(html);
    });

    it('should set the innerHTML of a <select> (<option>)', function() {
        var $select = getElement('<select/>'),
            html = '<option>1</option>';
        $select.html(html);
        expect($select[0].innerHTML).to.equal(html);
    });

    it('should set the innerHTML of a <select> (<option><option>)', function() {
        var $select = getElement('<select/>'),
            html = '<option>1</option><option>2</option>';
        $select.html(html);
        expect($select[0].innerHTML).to.equal(html);
    });

    it('should set the innerHTML of a <select> (<div>)', function() {
        var $select = getElement('<select/>'),
            html = '<div>1</div>',
            expected = '1';
        $select.html(html);
        expect($select[0].innerHTML).to.equal(expected);
    });

    it('should set the innerHTML of a <fieldset> (<legend>)', function() {
        var $select = getElement('<fieldset/>'),
            html = '<legend>1</legend>';
        $select.html(html);
        expect($select[0].innerHTML).to.equal(html);
    });

    it('should set the innerHTML of a <fieldset> (<div>)', function() {
        var $select = getElement('<fieldset/>'),
            html = '<div>1</div>';
        $select.html(html);
        expect($select[0].innerHTML).to.equal(html);
    });

    it('should provide a chainable API', function() {
        var expected = emptyContainer;
        var actual = expected.html('');
        expect(actual).to.be.equal(expected);
    });

});

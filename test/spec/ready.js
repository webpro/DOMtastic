describe('ready', function() {

  describe('ready', function() {

    it('should execute on DOMContentLoaded (or after)', function(done) {
      $(document).ready(function() {
        done();
      });
    });

    it('should execute for any element on DOMContentLoaded (or after)', function(done) {
      $('<div/>').ready(function() {
        done();
      });
    });

  });

});

describe('events', function() {

  describe('trigger', function() {

    it('should execute handler for detached node', function() {
      var element = $('<div></div>');
      var eventType = $helpers.getRndStr();
      var spy = sinon.spy();
      element.on(eventType, spy);
      element.trigger(eventType);
      assert(spy.called);
    });

    it('should execute handler for detached tree', function() {
      var element = $('<div><p></p></div>');
      var child = $(element[0].querySelector('p'));
      var eventType = $helpers.getRndStr();
      var spy = sinon.spy();
      element.on(eventType, 'p', spy);
      child.trigger(eventType);
      assert(spy.called);
      assert(spy.calledOnce);
    });

    it('should execute handler and pass the data as event detail', function() {
      var element = $('#testFragment');
      var eventType = $helpers.getRndStr();
      var eventData = { a: 1 };
      var spy = sinon.spy();
      element.on(eventType, spy);
      element.trigger(eventType, eventData);
      assert(spy.called);
      assert(spy.firstCall.args[1] === undefined);
      assert(spy.firstCall.args[0].detail === eventData);
    });

    it('should be able to send non-bubbling events', function() {
      var element = $(document.body);
      var eventType = $helpers.getRndStr();
      var spy = sinon.spy();
      element.on(eventType, spy);
      $('.two').trigger(eventType, null, { bubbles: false });
      assert(spy.called === false);
    });

    it('should call direct methods blur() and focus() for these events', function() {
      var element = $('#testFragment input');
      ['blur', 'focus'].forEach(function(eventType) {
        var stub = sinon.stub(element[0], eventType);
        element.trigger(eventType, null, { cancelable: false });
        assert(stub.called);
        element[0][eventType].restore();
      });
    });

    it('should call direct methods submit() for this event', function() {
      var element = $('#testFragment form');
      var eventType = 'submit';
      var stub = sinon.stub(element[0], eventType);
      element.trigger(eventType, null, { cancelable: false });
      assert(stub.called);
      element[0][eventType].restore();
    });

    it('should not call direct methods for other event types that do have same name', function() {
      var element = $('#testFragment input');
      var eventType = 'getAttribute';
      var stub = sinon.stub(element[0], eventType);
      element.trigger(eventType);
      assert(stub.called === false);
      element[0][eventType].restore();
    });

    it('should be able to trigger event on document', function() {
      var eventType = $helpers.getRndStr();
      var spy = sinon.spy();
      $(window).on(eventType, spy);
      $(document).trigger(eventType);
      assert(spy.called);
    });

    it('should be able to trigger event on window', function() {
      var element = $(window);
      var eventType = $helpers.getRndStr();
      var spy = sinon.spy();
      element.on(eventType, spy);
      element.trigger(eventType);
      assert(spy.called);
    });

    describe('non-cancelable', function() {

      before(function() {
        if($helpers.isJSDOM()) {
          this.skip();
        }
      });

      it('should be able to send non-cancelable events', function(done) {
        var element = $('#testFragment a');
        var eventType = 'click';
        var hash = '#' + $helpers.getRndStr();
        element.attr('href', hash).on(eventType, function(event) {
          event.preventDefault();
        });
        element.trigger(eventType, null, { cancelable: false });
        setTimeout(function() {
          assert(location.hash.indexOf(hash) !== -1);
          window.location.hash = '';
          done();
        }, 0);
      });
    })

  });

  describe('triggerHandler', function() {

    it('should execute handler', function() {
      var element = $('<div></div>');
      var eventType = $helpers.getRndStr();
      var spy = sinon.spy();
      element.on(eventType, spy);
      element.triggerHandler(eventType);
      assert(spy.called);
    });

    it('should not bubble', function() {
      var element = $('<div><span></span></div>');
      var eventType = $helpers.getRndStr();
      var spy = sinon.spy();
      element.on(eventType, spy);
      element.find('span').triggerHandler(eventType);
      assert(spy.called === false);
    });

    it('should prevent default event behavior', function() {
      var element = $('<form action="#"/>');
      var eventType = 'submit';
      element.on(eventType, function(event) {
        assert(event.isDefaultPrevented());
      });
      element.triggerHandler(eventType);
    });

    it('should execute handler for first element only', function() {
      var element = $('<p></p><p></p>');
      var eventType = $helpers.getRndStr();
      var spy = sinon.spy();
      $(element[0]).on(eventType, spy);
      $(element[1]).on(eventType, spy);
      element.triggerHandler(eventType);
      assert(spy.calledOnce);
    });

  });

});

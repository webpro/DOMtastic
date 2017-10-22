describe('events', function() {

  function trigger(element, type) {
    var ev = new CustomEvent(type, { bubbles: true });
    for(var i = 0, l = element.length; i < l; i++) {
      element[i].dispatchEvent(ev);
    }
  }

  var spy;

  beforeEach(function() {
    spy = sinon.spy();
  });

  describe('on', function() {

    it('should attach an event handler to an element', function() {
      var element = $(document.body);
      element.on('click', spy);
      trigger(element, 'click');
      assert(spy.called);
    });

    it('should execute event handler with element as `this` value', function() {
      var element = $(document.body);
      var eventType = $helpers.getRndStr();
      var expected = element[0];
      element.on(eventType, spy);
      trigger(element, eventType);
      assert(spy.firstCall.thisValue === expected);
    });

    it('should attach event handlers to multiple elements', function() {
      var elements = $('#testFragment li');
      elements.on('click', spy);
      trigger(elements, 'click');
      assert(spy.callCount === 5);
    });

    it('should attach an event handler of any type to an element', function() {
      var element = $(document.body);
      var eventType = $helpers.getRndStr();
      element.on(eventType, spy);
      trigger(element, eventType);
      assert(spy.called);
    });

    it('should attach an event handler with a namespaced type to an element', function() {
      var element = $(document.body);
      var eventType = $helpers.getRndStr();
      var eventNS = $helpers.getRndStr();
      element.on([eventType, eventNS].join('.'), spy);
      trigger(element, eventType);
      assert(spy.called);
    });

    it('should attach multiple space-separated events to an element', function() {
      var element = $(document.body);
      var eventTypes = [$helpers.getRndStr(), $helpers.getRndStr(), $helpers.getRndStr()];
      element.on(eventTypes.join(' '), spy);
      trigger(element, eventTypes[0]);
      trigger(element, eventTypes[1]);
      trigger(element, eventTypes[2]);
      assert(spy.calledThrice);
    });

    describe('delegated', function() {

      it('should execute event handler with element as `this` value', function() {
        var eventType = $helpers.getRndStr();
        var expected = $('#testFragment')[0];
        $(document.body).on(eventType, '#testFragment', spy);
        trigger($('.fourth'), eventType);
        assert(spy.firstCall.thisValue === expected);
      });

      it('should have the correct `event.target` and `event.currentTarget`', function() {
        var element = $('.fourth');
        var eventType = $helpers.getRndStr();
        $(document.body).on(eventType, 'li', function(event) {
          assert(event.target === element[0]);
          assert(this === element[0]);
          // assert(this === event.currentTarget); // Can't override this property
        });
        trigger(element, eventType);
      });

      it('should receive a delegated event from a child element', function() {
        var element = $(document.body);
        var eventType = $helpers.getRndStr();
        element.on(eventType, '#testFragment ul', spy);
        element.on(eventType, '#testFragment li', spy);
        trigger($('.fourth'), eventType);
        assert(spy.calledTwice);
      });

      it('should receive delegated events from child elements', function() {
        var element = $(document.body);
        var eventType = $helpers.getRndStr();
        element.on(eventType, 'li', spy);
        trigger($('.two'), eventType);
        trigger($('.three'), eventType);
        trigger($('.fourth'), eventType);
        assert(spy.calledThrice);
      });

      it('should receive delegated events from multiple child elements', function() {
        var elements = $('#testFragment li');
        var eventType = $helpers.getRndStr();
        elements.on(eventType, 'span', spy);
        trigger($('#testFragment li span'), eventType);
        assert(spy.callCount, 5);
      });

    });

  });

  describe('cancellation', function() {

    it('should stop propagation', function() {

      var parent = $(document.body);
      var child = $('.fourth');
      var eventType = $helpers.getRndStr();
      var event = new CustomEvent(eventType, {
        bubbles: true,
        cancelable: true,
        detail: undefined
      });
      var eventSpy = sinon.spy(event, 'stopPropagation');

      parent.on(eventType, spy);
      child.on(eventType, function(event) {
        assert(event.isPropagationStopped() === false);
        event.stopPropagation();
        assert(event.isPropagationStopped());
      });

      child[0].dispatchEvent(event);

      assert(eventSpy.called);
      assert(spy.called === false);

    });

    it('should stop propagation for delegated events', function() {

      var parent = $(document.body);
      var child = $('.fourth');
      var eventType = $helpers.getRndStr();
      var event = new CustomEvent(eventType, {
        bubbles: true,
        cancelable: true,
        detail: undefined
      });
      var eventSpy = sinon.spy(event, 'stopPropagation');

      parent.on(eventType, '#testFragment ul', function(event) {
        assert(event.isPropagationStopped() === false);
        event.stopPropagation();
        assert(event.isPropagationStopped());
      });
      parent.on(eventType, '#testFragment', spy);

      child[0].dispatchEvent(event);

      assert(eventSpy.called);
      assert(spy.called === false);

    });

    it('should stop immediate propagation', function() {

      var child = $('.fourth');
      var eventType = $helpers.getRndStr();
      var event = new CustomEvent(eventType);
      var eventSpy = sinon.spy(event, 'stopImmediatePropagation');

      child.on(eventType, function(event) {
        assert(event.isImmediatePropagationStopped() === false);
        event.stopImmediatePropagation();
        assert(event.isImmediatePropagationStopped());
      });
      child.on(eventType, spy);

      child[0].dispatchEvent(event);

      assert(eventSpy.called);
      assert(spy.called === false);

    });

    it('should stop immediate propagation for delegated events', function() {

      var parent = $(document.body);
      var child = $('.fourth');
      var eventType = $helpers.getRndStr();
      var event = new CustomEvent(eventType, {
        bubbles: true,
        cancelable: true,
        detail: undefined
      });
      var eventSpy = sinon.spy(event, 'stopImmediatePropagation');

      parent.on(eventType, '#testFragment', function(event) {
        assert(event.isImmediatePropagationStopped() === false);
        event.stopImmediatePropagation();
        assert(event.isImmediatePropagationStopped());
      });
      parent.on(eventType, '#testFragment', spy);

      child[0].dispatchEvent(event);

      assert(eventSpy.called);
      assert(spy.called === false);

    });

    it('should prevent default', function() {

      var element = $('#testFragment a');
      var eventType = 'click';
      var event = new CustomEvent(eventType, {
        bubbles: true,
        cancelable: true
      });
      var eventSpy = sinon.spy(event, 'preventDefault');
      var hash = '#' + $helpers.getRndStr();

      element.on(eventType, function(event) {
        assert(event.isDefaultPrevented() === false);
        event.preventDefault();
        assert(event.isDefaultPrevented());
      });

      element[0].dispatchEvent(event);

      assert(eventSpy.called);
      assert(window.location.hash.replace(/^#/, '') === '');

      window.location.hash = '';

    });

  });

  describe('bubbling', function() {

    it('should receive events bubbling up to an element', function() {
      var element = $(document.body);
      var eventType = $helpers.getRndStr();
      element.on(eventType, spy);
      trigger($('.two'), eventType);
      assert(spy.called);
    });

  });

  describe('off', function() {

    it('should detach an event handler from an element', function() {
      var element = $(document.body);
      var eventType = $helpers.getRndStr();
      element.on(eventType, spy);
      element.off(eventType, spy);
      trigger(element, eventType);
      assert(spy.called === false);
    });

    it('should detach an event handler with a namespace from an element', function() {
      var element = $(document.body);
      var eventType = $helpers.getRndStr();
      var eventNS = $helpers.getRndStr();
      element.on([eventType, eventNS].join('.'), spy);
      element.off(eventType);
      trigger(element, eventType);
      assert(spy.called === false);
    });

    it('should detach all event handler from a namespace from an element', function() {
      var element = $(document.body);
      var eventTypes = [$helpers.getRndStr(), $helpers.getRndStr()];
      var eventNS = $helpers.getRndStr();
      element.on([eventTypes[0], eventNS].join('.'), spy);
      element.on([eventTypes[1], eventNS].join('.'), spy);
      element.off('.' + eventNS);
      trigger(element, eventTypes[0]);
      trigger(element, eventTypes[1]);
      assert(spy.called === false);
    });

    it('should detach an event handler with a namespace from an element', function() {
      var element = $(document.body);
      var eventType = $helpers.getRndStr() + '.' + $helpers.getRndStr();
      element.on(eventType, spy);
      element.off(eventType);
      trigger(element, eventType);
      assert(spy.called === false);
    });

    it('should detach space-separated event handlers from an element', function() {
      var element = $(document.body);
      var eventTypes = [$helpers.getRndStr(), $helpers.getRndStr(), $helpers.getRndStr()];
      element.on(eventTypes.join(' '), spy);
      element.off(eventTypes[1]);
      trigger(element, eventTypes[0]);
      trigger(element, eventTypes[1]);
      assert(spy.calledOnce);
      spy.reset();
      element.off(eventTypes.join(' '));
      trigger(element, eventTypes[2]);
      assert(spy.called === false);
    });

    it('should detach all space-separated event handlers from an element', function() {
      var element = $(document.body);
      var eventTypes = [$helpers.getRndStr(), $helpers.getRndStr(), $helpers.getRndStr()];
      element.on(eventTypes.join(' '), spy);
      element.off();
      trigger(element, eventTypes[0]);
      assert(spy.called === false);
    });

    it('should detach all event handlers from an element', function() {
      var element = $(document.body);
      var eventType = $helpers.getRndStr();
      element.on(eventType, spy);
      element.on(eventType, spy);
      element.off();
      trigger(element, eventType);
      assert(spy.called === false);
    });

    it('should detach event handlers from multiple elements', function() {
      var elements = $('#testFragment li');
      var eventType = $helpers.getRndStr();
      elements.on(eventType, spy);
      elements.off(eventType, spy);
      trigger(elements, eventType);
      assert(spy.called === false);
    });

    it('should not throw for elements without event handlers', function() {
      var elements = $('#testEmpty');
      var eventType = $helpers.getRndStr();
      assert.doesNotThrow(function() {
        elements.off(eventType, function() {
        });
      });
    });

    describe('delegated', function() {

      it('should detach a delegated event handler from an element', function() {
        var element = $(document.body);
        var eventType = $helpers.getRndStr();
        element.on(eventType, 'li', spy);
        element.off(eventType, 'li', spy);
        trigger($('.fourth'), eventType);
        assert(spy.called === false);
      });

      it('should detach a delegated event handler from multiple elements', function() {
        var elements = $('#testFragment li');
        var eventType = $helpers.getRndStr();
        elements.on(eventType, 'li', spy);
        elements.off(eventType, 'li', spy);
        trigger($('.fourth'), eventType);
        assert(spy.called === false);
      });

      it('should remove all delegated handlers when un-delegating event handlers', function() {
        var element = $(document.body);
        var eventType = $helpers.getRndStr();
        element.on(eventType, 'li', spy);
        element.on(eventType, 'li', spy);
        element.on(eventType, 'li', spy);
        element.off(eventType, 'li', spy);
        trigger($('.two'), eventType);
        assert(spy.called === false);
      });

    });

  });

  describe('one', function() {
    it('should execute event handler only once', function() {
      var element = $(document.body);
      var eventType = $helpers.getRndStr();
      var expected = element[0];
      element.one(eventType, spy);
      trigger(element, eventType);
      trigger(element, eventType);
      trigger(element, eventType);
      assert(spy.calledOnce);
      assert(spy.firstCall.thisValue === expected);
    });

    it('should execute event handler only once for each element', function() {
      var elements = $('#testFragment li');
      elements.one('click', spy);
      trigger(elements[0], 'click');
      trigger(elements[1], 'click');
      trigger(elements, 'click');
      assert(spy.callCount === 5);
    });
  });

  describe('fluent', function() {

    it('should provide a chainable API', function() {
      var expected = $(document.body);
      var actual = expected.on('').off().on('', '').off();
      assert(actual === expected);
    });

  });

});

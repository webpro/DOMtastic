describe('events', function() {

  var spy;

  beforeEach(function() {
    spy = sinon.spy();
  });

  describe('on', function() {

    it('should attach an event handler to an element', function() {
      var element = $(document.body);
      element.on('click', spy);
      trigger(element, 'click');
      expect(spy).to.have.been.called;
    });

    it('should execute event handler with element as `this` value', function() {
      var element = $(document.body),
        eventType = getRndStr(),
        expected = element[0];
      element.on(eventType, spy);
      trigger(element, eventType);
      expect(spy.firstCall.thisValue).to.equal(expected);
    });

    it('should attach event handlers to multiple elements', function() {
      var elements = $('#testFragment li');
      elements.on('click', spy);
      trigger(elements, 'click');
      expect(spy.callCount).to.equal(5);
    });

    it('should attach an event handler of any type to an element', function() {
      var element = $(document.body),
        eventType = getRndStr();
      element.on(eventType, spy);
      trigger(element, eventType);
      expect(spy).to.have.been.called;
    });

    it('should attach an event handler with a namespaced type to an element', function() {
      var element = $(document.body),
        eventType = getRndStr(),
        eventNS = getRndStr();
      element.on([eventType, eventNS].join('.'), spy);
      trigger(element, eventType);
      expect(spy).to.have.been.called;
    });

    it('should attach multiple space-separated events to an element', function() {
      var element = $(document.body),
        eventTypes = [getRndStr(), getRndStr(), getRndStr()];
      element.on(eventTypes.join(' '), spy);
      trigger(element, eventTypes[0]);
      trigger(element, eventTypes[1]);
      trigger(element, eventTypes[2]);
      expect(spy).to.have.been.calledThrice;
    });

    describe('delegated', function() {

      it('should execute event handler with element as `this` value', function() {
        var eventType = getRndStr(),
          expected = $('#testFragment')[0];
        $(document.body).on(eventType, '#testFragment', spy);
        trigger($('.fourth'), eventType);
        expect(spy.firstCall.thisValue).to.equal(expected);
      });

      it('should have the correct `event.target` and `event.currentTarget`', function() {
        var element = $('.fourth'),
          eventType = getRndStr();
        $(document.body).on(eventType, 'li', function(event) {
          expect(event.target).to.equal(element[0]);
          expect(this).to.equal(element[0]);
          // expect(this).to.equal(event.currentTarget); // Can't override this property
        });
        trigger(element, eventType);
      });

      it('should receive a delegated event from a child element', function() {
        var element = $(document.body),
          eventType = getRndStr();
        element.on(eventType, '#testFragment ul', spy);
        element.on(eventType, '#testFragment li', spy);
        trigger($('.fourth'), eventType);
        expect(spy).to.have.been.calledTwice;
      });

      it('should receive delegated events from child elements', function() {
        var element = $(document.body),
          eventType = getRndStr();
        element.on(eventType, 'li', spy);
        trigger($('.two'), eventType);
        trigger($('.three'), eventType);
        trigger($('.fourth'), eventType);
        expect(spy).to.have.been.calledThrice;
      });

      it('should receive delegated events from multiple child elements', function() {
        var elements = $('#testFragment li'),
          eventType = getRndStr();
        elements.on(eventType, 'span', spy);
        trigger($('#testFragment li span'), eventType);
        expect(spy.callCount).to.have.equal(5);
      });

    });

  });

  describe('cancellation', function() {

    it('should stop propagation', function() {

      var parent = $(document.body),
        child = $('.fourth'),
        eventType = getRndStr(),
        event = new CustomEvent(eventType, {
          bubbles: true,
          cancelable: true,
          detail: undefined
        }),
        eventSpy = sinon.spy(event, 'stopPropagation');

      parent.on(eventType, spy);
      child.on(eventType, function(event) {
        expect(event.isPropagationStopped()).to.be.false;
        event.stopPropagation();
        expect(event.isPropagationStopped()).to.be.true;
      });

      child[0].dispatchEvent(event);

      expect(eventSpy).to.have.been.called;
      expect(spy).not.to.have.been.called;

    });

    it('should stop propagation for delegated events', function() {

      var parent = $(document.body),
        child = $('.fourth'),
        eventType = getRndStr(),
        event = new CustomEvent(eventType, {
          bubbles: true,
          cancelable: true,
          detail: undefined
        }),
        eventSpy = sinon.spy(event, 'stopPropagation');

      parent.on(eventType, '#testFragment ul', function(event) {
        expect(event.isPropagationStopped()).to.be.false;
        event.stopPropagation();
        expect(event.isPropagationStopped()).to.be.true;
      });
      parent.on(eventType, '#testFragment', spy);

      child[0].dispatchEvent(event);

      expect(eventSpy).to.have.been.called;
      expect(spy).not.to.have.been.called;

    });

    it('should stop immediate propagation', function() {

      var child = $('.fourth'),
        eventType = getRndStr(),
        event = new CustomEvent(eventType),
        eventSpy = sinon.spy(event, 'stopImmediatePropagation');

      child.on(eventType, function(event) {
        expect(event.isImmediatePropagationStopped()).to.be.false;
        event.stopImmediatePropagation();
        expect(event.isImmediatePropagationStopped()).to.be.true;
      });
      child.on(eventType, spy);

      child[0].dispatchEvent(event);

      expect(eventSpy).to.have.been.called;
      expect(spy).not.to.have.been.called;

    });

    it('should stop immediate propagation for delegated events', function() {

      var parent = $(document.body),
        child = $('.fourth'),
        eventType = getRndStr(),
        event = new CustomEvent(eventType, {
          bubbles: true,
          cancelable: true,
          detail: undefined
        }),
        eventSpy = sinon.spy(event, 'stopImmediatePropagation');

      parent.on(eventType, '#testFragment', function(event) {
        expect(event.isImmediatePropagationStopped()).to.be.false;
        event.stopImmediatePropagation();
        expect(event.isImmediatePropagationStopped()).to.be.true;
      });
      parent.on(eventType, '#testFragment', spy);

      child[0].dispatchEvent(event);

      expect(eventSpy).to.have.been.called;
      expect(spy).not.to.have.been.called;

    });

    it('should prevent default', function() {

      var element = $('#testFragment a'),
        eventType = 'click',
        event = new CustomEvent(eventType, {
          bubbles: true,
          cancelable: true,
          detail: undefined
        }),
        eventSpy = sinon.spy(event, 'preventDefault'),
        hash = '#' + getRndStr();

      element.on(eventType, function(event) {
        expect(event.isDefaultPrevented()).to.be.false;
        event.preventDefault();
        expect(event.isDefaultPrevented()).to.be.true;
      });

      element[0].dispatchEvent(event);

      expect(eventSpy).to.have.been.called;
      expect(location.hash.replace(/^#/, '')).to.equal('');

      location.hash = '';

    });

  });

  describe('bubbling', function() {

    it('should receive events bubbling up to an element', function() {
      var element = $(document.body),
        eventType = getRndStr();
      element.on(eventType, spy);
      trigger($('.two'), eventType);
      expect(spy).to.have.been.called;
    });

  });

  describe('off', function() {

    it('should detach an event handler from an element', function() {
      var element = $(document.body),
        eventType = getRndStr();
      element.on(eventType, spy);
      element.off(eventType, spy);
      trigger(element, eventType);
      expect(spy).not.to.have.been.called;
    });

    it('should detach an event handler with a namespace from an element', function() {
      var element = $(document.body),
        eventType = getRndStr(),
        eventNS = getRndStr();
      element.on([eventType, eventNS].join('.'), spy);
      element.off(eventType);
      trigger(element, eventType);
      expect(spy).not.to.have.been.called;
    });

    it('should detach all event handler from a namespace from an element', function() {
      var element = $(document.body),
        eventTypes = [getRndStr(), getRndStr()],
        eventNS = getRndStr();
      element.on([eventTypes[0], eventNS].join('.'), spy);
      element.on([eventTypes[1], eventNS].join('.'), spy);
      element.off('.' + eventNS);
      trigger(element, eventTypes[0]);
      trigger(element, eventTypes[1]);
      expect(spy).not.to.have.been.called;
    });

    it('should detach an event handler with a namespace from an element', function() {
      var element = $(document.body),
        eventType = getRndStr() + '.' + getRndStr();
      element.on(eventType, spy);
      element.off(eventType);
      trigger(element, eventType);
      expect(spy).not.to.have.been.called;
    });

    it('should detach space-separated event handlers from an element', function() {
      var element = $(document.body),
        eventTypes = [getRndStr(), getRndStr(), getRndStr()];
      element.on(eventTypes.join(' '), spy);
      element.off(eventTypes[1]);
      trigger(element, eventTypes[0]);
      trigger(element, eventTypes[1]);
      expect(spy).to.have.been.calledOnce;
      spy.reset();
      element.off(eventTypes.join(' '));
      trigger(element, eventTypes[2]);
      expect(spy).not.to.have.been.called;
    });

    it('should detach all space-separated event handlers from an element', function() {
      var element = $(document.body),
        eventTypes = [getRndStr(), getRndStr(), getRndStr()];
      element.on(eventTypes.join(' '), spy);
      element.off();
      trigger(element, eventTypes[0]);
      expect(spy).not.to.have.been.called;
    });

    it('should detach all event handlers from an element', function() {
      var element = $(document.body),
        eventType = getRndStr();
      element.on(eventType, spy);
      element.on(eventType, spy);
      element.off();
      trigger(element, eventType);
      expect(spy).not.to.have.been.called;
    });

    it('should detach event handlers from multiple elements', function() {
      var elements = $('#testFragment li'),
        eventType = getRndStr();
      elements.on(eventType, spy);
      elements.off(eventType, spy);
      trigger(elements, eventType);
      expect(spy).not.to.have.been.called;
    });

    it('should not throw for elements without event handlers', function() {
      var elements = $('#testEmpty'),
        eventType = getRndStr();
      expect(function() {
        elements.off(eventType, function() {
        });
      }).to.not.throw();
    });

    describe('delegated', function() {

      it('should detach a delegated event handler from an element', function() {
        var element = $(document.body),
          eventType = getRndStr();
        element.on(eventType, 'li', spy);
        element.off(eventType, 'li', spy);
        trigger($('.fourth'), eventType);
        expect(spy).not.to.have.been.called;
      });

      it('should detach a delegated event handler from multiple elements', function() {
        var elements = $('#testFragment li'),
          eventType = getRndStr();
        elements.on(eventType, 'li', spy);
        elements.off(eventType, 'li', spy);
        trigger($('.fourth'), eventType);
        expect(spy).not.to.have.been.called;
      });

      it('should remove all delegated handlers when un-delegating event handlers', function() {
        var element = $(document.body),
          eventType = getRndStr();
        element.on(eventType, 'li', spy);
        element.on(eventType, 'li', spy);
        element.on(eventType, 'li', spy);
        element.off(eventType, 'li', spy);
        trigger($('.two'), eventType);
        expect(spy).not.to.have.been.called;
      });

    });

  });

  describe('one', function() {
    it('should execute event handler only once', function() {
      var element = $(document.body),
        eventType = getRndStr(),
        expected = element[0];
      element.one(eventType, spy);
      trigger(element, eventType);
      trigger(element, eventType);
      trigger(element, eventType);
      expect(spy.calledOnce).to.be.true;
      expect(spy.firstCall.thisValue).to.equal(expected);
    });

    it('should execute event handler only once for each element', function() {
      var elements = $('#testFragment li');
      elements.one('click', spy);
      trigger(elements[0], 'click');
      trigger(elements[1], 'click');
      trigger(elements, 'click');
      expect(spy.callCount).to.equal(5);
    });
  });

  describe('fluent', function() {

    it('should provide a chainable API', function() {
      var expected = $(document.body);
      var actual = expected.on('').off().on('', '').off();
      expect(actual).to.be.equal(expected);
    });

  });

});

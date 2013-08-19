describe('events', function() {

    var spy;

    beforeEach(function() {
        spy = jasmine.createSpy();
    });

    it('should attach an event handler to an element', function() {
        var element = document.body;
        element.on('click', spy);
        element.trigger('click');
        expect(spy).toHaveBeenCalled();
    });

    it('should attach an event handler of any type to an element', function() {
        var element = document.body;
        element.on('foo', spy);
        element.trigger('foo');
        expect(spy).toHaveBeenCalled();
    });

    it('should de-attach an event handler from an element', function() {
        var element = document.body;
        element.on('foo', spy);
        element.off('foo', spy);
        element.trigger('foo');
        expect(spy).not.toHaveBeenCalled();
    });

    it('should receive a delegated event from a child element', function() {
        var element = document.body;
        element.delegate('li', 'testEvent1', spy);
        $('.fourth').trigger('testEvent1');
        expect(spy).toHaveBeenCalled();
    });

    it('should de-attach a delegated event handler from an element', function() {
        var element = document.body;
        element.delegate('li', 'testEvent2', spy);
        element.undelegate('li', 'testEvent2', spy);
        $('.fourth').trigger('testEvent2');
        expect(spy).not.toHaveBeenCalled();
    });

    it('should forward request to `delegate` if that signature was used', function() {
        var element = document.body;
        element.on('li', 'testEvent3', spy);
        $('.fourth').trigger('testEvent3');
        expect(spy).toHaveBeenCalled();
    });

    it('should have the correct `event.target` and `event.currentTarget`', function() {
        var element = $('.fourth'), eventTarget, eventCurrentTarget;
        document.body.delegate('li', 'testEvent4', function(event) {
            eventTarget = event.target;
            eventCurrentTarget = event.currentTarget;
        });
        element.trigger('testEvent4');
        expect(eventTarget).toBe(element[0]);
        expect(eventCurrentTarget).toBe(document.body);
    });

    it('should receive delegated events from child elements', function() {
        var element = document.body;
        element.delegate('li', 'testEvent5', spy);
        $('.two').trigger('testEvent5');
        $('.three').trigger('testEvent5');
        $('.fourth').trigger('testEvent5');
        expect(spy.calls.count()).toBe(3);
    });

    it('should remove all delegated handlers when un-delegating event handlers', function() {
        var element = document.body;
        element.delegate('li', 'testEvent6', spy);
        element.delegate('li', 'testEvent6', spy);
        element.delegate('li', 'testEvent6', spy);
        element.undelegate('li', 'testEvent6', spy);
        $('.two').trigger('testEvent6');
        expect(spy.calls.count()).toBe(0);
    });

    it('should provide a chainable API', function() {
        document.body.on('testEvent7', spy).off('testEvent7', spy).delegate('.two', 'testEvent7', spy).undelegate('.two', 'testEvent7', spy);
        $('.two').trigger('testEvent7');
        expect(spy.calls.count()).toBe(0);
    });

});

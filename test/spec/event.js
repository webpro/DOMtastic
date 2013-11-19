describe('events', function() {

    var spy;

    beforeEach(function() {
        spy = jasmine.createSpy();
    });

    describe('attach', function() {

        it('should attach an event handler to an element', function() {
            var element = getElement(document.body);
            element.on('click', spy);
            element.trigger('click');
            expect(spy).toHaveBeenCalled();
        });

        it('should attach event handlers to multiple elements', function() {
            var elements = getElement('#testFragment li');
            elements.on('click', spy);
            elements.trigger('click');
            expect(spy.calls.count()).toBe(5);
        });

        it('should attach an event handler of any type to an element', function() {
            var element = getElement(document.body);
            element.on('EVENT-custom', spy);
            element.trigger('EVENT-custom');
            expect(spy).toHaveBeenCalled();
        });

        it('should attach an event handler with a namespaced type to an element', function() {
            var element = getElement(document.body);
            element.on('EVENT-namespaced.namespace', spy);
            element.trigger('EVENT-namespaced');
            expect(spy).toHaveBeenCalled();
        });

        it('should have the correct `event.target` and `event.currentTarget`', function() {
            var element = getElement('.fourth'), eventTarget, eventCurrentTarget;
            getElement(document.body).delegate('li', 'EVENT-target-currentTarget', function(event) {
                eventTarget = event.target;
                eventCurrentTarget = event.currentTarget;
            });
            element.trigger('EVENT-target-currentTarget');
            expect(eventTarget).toBe(element[0]);
            expect(eventCurrentTarget).toBe(document.body);
        });

    });

    describe('cancellation', function() {

        it('should stop propagation', function() {

            var parent = getElement('#testFragment'),
                child = getElement('.fourth');

            parent.on('EVENT-stopPropagation', spy);
            child.on('EVENT-stopPropagation', function(event){
                event.stopPropagation();
            });

            var event = new CustomEvent('EVENT-stopPropagation', { bubbles: true, cancelable: true, detail: undefined });

            spyOn(event, 'stopPropagation').and.callThrough();

            child[0].dispatchEvent(event);

            expect(event.stopPropagation).toHaveBeenCalled();
            expect(spy).not.toHaveBeenCalled();

        });

        it('should prevent default', function() {

            var parent = getElement('#testFragment'),
                child = getElement('.fourth');

            parent.on('EVENT-preventDefault', spy);
            child.on('EVENT-preventDefault', function(event){
                event.preventDefault();
            });

            var event = new CustomEvent('EVENT-preventDefault', { bubbles: true, cancelable: true, detail: undefined });

            spyOn(event, 'preventDefault').and.callThrough();

            child[0].dispatchEvent(event);

            expect(event.preventDefault).toHaveBeenCalled();
            expect(spy).toHaveBeenCalled();

        });

    });

    describe('bubbling', function() {

        it('should receive events bubbling up to an element', function() {
            var element = getElement(document.body);
            element.on('EVENT-bubbling', spy);
            getElement('.two').trigger('EVENT-bubbling');
            expect(spy).toHaveBeenCalled();
        });

        it('should receive events bubbling up to an element not in the DOM', function() {
            var element = getElement('<div><p></p></div>');
            element.on('EVENT-unattached-element', spy);
            element.find('p').trigger('EVENT-unattached-element');
            expect(spy).toHaveBeenCalled();
            expect(spy.calls.count()).toBe(1);
        });

        it('should receive delegated events bubbling up to an element not in the DOM', function() {
            var element = getElement('<div><p></p></div>');
            element.on('EVENT-unattached-delegated', 'p', spy);
            element.find('p').trigger('EVENT-unattached-delegated');
            expect(spy).toHaveBeenCalled();
            expect(spy.calls.count()).toBe(1);
        });

        it('should not receive events bubbling up to an element when `bubbles` is set to false', function() {
            var element = getElement(document.body);
            element.on('EVENT-non-bubbling', spy);
            getElement('.two').trigger('EVENT-non-bubbling', {bubbles: false});
            expect(spy).not.toHaveBeenCalled();
        });

    });

    describe('detach', function() {

        it('should detach an event handler from an element', function() {
            var element = getElement(document.body);
            element.on('EVENT-detach', spy);
            element.off('EVENT-detach', spy);
            element.trigger('EVENT-detach');
            expect(spy).not.toHaveBeenCalled();
        });

        it('should detach an event handler with a namespace from an element', function() {
            var element = getElement(document.body);
            element.on('EVENT-detach.namespace', spy);
            element.off('EVENT-detach.namespace');
            element.trigger('EVENT-detach.namespace');
            expect(spy).not.toHaveBeenCalled();
        });

        it('should detach all event handlers from an element', function() {
            var element = getElement(document.body);
            element.on('EVENT-detach-all.namespace', spy);
            element.on('EVENT-detach-all.namespace', spy);
            element.off();
            element.trigger('EVENT-detach.namespace');
            expect(spy).not.toHaveBeenCalled();
        });

        it('should detach event handlers from multiple elements', function() {
            var elements = getElement('#testFragment li');
            elements.on('EVENT-detach-multi', spy);
            elements.off('EVENT-detach-multi', spy);
            elements.trigger('EVENT-detach-multi');
            expect(spy).not.toHaveBeenCalled();
        });

    });

    describe('delegate', function() {

        it('should receive a delegated event from a child element', function() {
            var element = getElement(document.body);
            element.delegate('li', 'EVENT-delegated', spy);
            getElement('.fourth').trigger('EVENT-delegated');
            expect(spy).toHaveBeenCalled();
        });

        it('should receive delegated events from multiple child elements', function() {
            var elements = getElement('#testFragment li');
            elements.delegate('span', 'EVENT-delegated-multi', spy);
            getElement('#testFragment li span').trigger('EVENT-delegated-multi');
            expect(spy.calls.count()).toBe(5);
        });

        it('should receive delegated events from child elements', function() {
            var element = getElement(document.body);
            element.delegate('li', 'EVENT-delegated-children', spy);
            getElement('.two').trigger('EVENT-delegated-children');
            getElement('.three').trigger('EVENT-delegated-children');
            getElement('.fourth').trigger('EVENT-delegated-children');
            expect(spy.calls.count()).toBe(3);
        });

        it('should forward request to `delegate` if that signature was used', function() {
            var element = getElement(document.body);
            element.on('EVENT-on-delegate', 'li', spy);
            getElement('.fourth').trigger('EVENT-on-delegate');
            expect(spy).toHaveBeenCalled();
        });

    });

    describe('undelegate', function() {

        it('should detach a delegated event handler from an element', function() {
            var element = getElement(document.body);
            element.delegate('li', 'EVENT-delegated-detach', spy);
            element.undelegate('li', 'EVENT-delegated-detach', spy);
            getElement('.fourth').trigger('testEvent2');
            expect(spy).not.toHaveBeenCalled();
        });

        it('should detach a delegated event handler from multiple elements', function() {
            var elements = getElement('#testFragment li');
            elements.delegate('li', 'EVENT-delegated-detach-multi', spy);
            elements.undelegate('li', 'EVENT-delegated-detach-multi', spy);
            getElement('.fourth').trigger('testEvent21');
            expect(spy).not.toHaveBeenCalled();
        });

        it('should remove all delegated handlers when un-delegating event handlers', function() {
            var element = getElement(document.body);
            element.delegate('li', 'EVENT-undelegate', spy);
            element.delegate('li', 'EVENT-undelegate', spy);
            element.delegate('li', 'EVENT-undelegate', spy);
            element.undelegate('li', 'EVENT-undelegate', spy);
            getElement('.two').trigger('EVENT-undelegate');
            expect(spy.calls.count()).toBe(0);
        });

        it('should forward request to `undelegate` if that signature was used', function() {
            var element = getElement(document.body);
            element.on('EVENT-off-undelegate', 'li', spy);
            element.off('EVENT-off-undelegate', 'li', spy);
            getElement('.fourth').trigger('EVENT-on-delegate');
            expect(spy).not.toHaveBeenCalled();
        });

    });

    it('should provide a chainable API', function() {
        getElement(document.body).on('EVENT-chainable', spy).off('EVENT-chainable', spy).delegate('.two', 'EVENT-chainable', spy).undelegate('.two', 'EVENT-chainable', spy);
        getElement('.two').trigger('EVENT-chainable');
        expect(spy.calls.count()).toBe(0);
    });

});

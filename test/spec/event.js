describe('events', function() {

    var spy;

    beforeEach(function() {
        spy = sinon.spy();
    });

    describe('on', function() {

        it('should attach an event handler to an element', function() {
            var element = $(document.body);
            element.on('click', spy);
            element.trigger('click');
            expect(spy).to.have.been.called;
        });

        it('should attach event handlers to multiple elements', function() {
            var elements = $('#testFragment li');
            elements.on('click', spy);
            elements.trigger('click');
            expect(spy.callCount).to.equal(5);
        });

        it('should attach an event handler of any type to an element', function() {
            var element = $(document.body),
                eventType = getRndStr();
            element.on(eventType, spy);
            element.trigger(eventType);
            expect(spy).to.have.been.called;
        });

        it('should attach an event handler with a namespaced type to an element', function() {
            var element = $(document.body),
                eventType = getRndStr(),
                eventNS = getRndStr();
            element.on([eventType, eventNS].join('.'), spy);
            element.trigger(eventType);
            expect(spy).to.have.been.called;
        });

        it('should attach multiple space-separated events to an element', function() {
            var element = $(document.body),
                eventTypes = [getRndStr(), getRndStr(), getRndStr()];
            element.on(eventTypes.join(' '), spy);
            element.trigger(eventTypes[0]);
            element.trigger(eventTypes[1]);
            element.trigger(eventTypes[2]);
            expect(spy).to.have.been.calledThrice;
        });

        it('should have the correct `event.target` and `event.currentTarget`', function() {
            var element = $('.fourth'),
                eventTarget,
                eventCurrentTarget,
                eventType = getRndStr();
            $(document.body).delegate('li', eventType, function(event) {
                eventTarget = event.target;
                eventCurrentTarget = event.currentTarget;
            });
            element.trigger(eventType);
            expect(eventTarget).to.equal(element[0]);
            expect(eventCurrentTarget).to.equal(document.body);
        });

        describe('delegated', function() {

            it('should receive a delegated event from a child element', function() {
                var element = $(document.body),
                    eventType = getRndStr();
                element.delegate('li', eventType, spy);
                $('.fourth').trigger(eventType);
                expect(spy).to.have.been.called;
            });

            it('should receive a delegated event in detached nodes', function() {
                var element = $('<div><span></span></div>'),
                    eventType = getRndStr();
                element.delegate('span', eventType, spy);
                element.find('span').trigger(eventType);
                expect(spy).to.have.been.called;
            });

            it('should receive delegated events from multiple child elements', function() {
                var elements = $('#testFragment li'),
                    eventType = getRndStr();
                elements.delegate('span', eventType, spy);
                $('#testFragment li span').trigger(eventType);
                expect(spy.callCount).to.have.equal(5);
            });

            it('should receive delegated events from child elements', function() {
                var element = $(document.body),
                    eventType = getRndStr();
                element.delegate('li', eventType, spy);
                $('.two').trigger(eventType);
                $('.three').trigger(eventType);
                $('.fourth').trigger(eventType);
                expect(spy).to.have.been.calledThrice;
            });

        });

    });

    describe('cancellation', function() {

        it('should stop propagation', function() {

            var parent = $('#testFragment'),
                child = $('.fourth'),
                eventType = getRndStr(),
                event = new CustomEvent(eventType, { bubbles: true, cancelable: true, detail: undefined }),
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

        it('should prevent default', function() {

            var parent = $('#testFragment'),
                child = $('.fourth'),
                eventType = getRndStr(),
                event = new CustomEvent(eventType, { bubbles: true, cancelable: true, detail: undefined }),
                eventSpy = sinon.spy(event, 'preventDefault');

            parent.on(eventType, spy);
            child.on(eventType, function(event) {
                expect(event.isDefaultPrevented()).to.be.false;
                event.preventDefault();
                expect(event.isDefaultPrevented()).to.be.true;
            });

            child[0].dispatchEvent(event);

            expect(eventSpy).to.have.been.called;
            expect(spy).to.have.been.called;

        });

    });


    describe('bubbling', function() {

        it('should receive events bubbling up to an element', function() {
            var element = $(document.body),
                eventType = getRndStr();
            element.on(eventType, spy);
            $('.two').trigger(eventType);
            expect(spy).to.have.been.called;
        });

        it('should receive events bubbling up to a detached element', function() {
            var element = $('<div><p></p></div>'),
                child = $(element[0].querySelector('p')),
                eventType = getRndStr();
            element.on(eventType, spy);
            child.trigger(eventType);
            expect(spy).to.have.been.called;
            expect(spy).to.have.been.calledOnce;
        });

        it('should receive delegated events bubbling up to a detached element', function() {
            var element = $('<div><p></p></div>'),
                child = $(element[0].querySelector('p')),
                eventType = getRndStr();
            element.on(eventType, 'p', spy);
            child.trigger(eventType);
            expect(spy).to.have.been.called;
            expect(spy).to.have.been.calledOnce;
        });

    });

    describe('off', function() {

        it('should detach an event handler from an element', function() {
            var element = $(document.body),
                eventType = getRndStr();
            element.on(eventType, spy);
            element.off(eventType, spy);
            element.trigger(eventType);
            expect(spy).not.to.have.been.called;
        });

        it('should detach an event handler with a namespace from an element', function() {
            var element = $(document.body),
                eventType = getRndStr(),
                eventNS = getRndStr();
            element.on([eventType, eventNS].join('.'), spy);
            element.off(eventType);
            element.trigger(eventType);
            expect(spy).not.to.have.been.called;
        });

        it('should detach all event handler from a namespace from an element', function() {
            var element = $(document.body),
                eventTypes = [getRndStr(), getRndStr()],
                eventNS = getRndStr();
            element.on([eventTypes[0], eventNS].join('.'), spy);
            element.on([eventTypes[1], eventNS].join('.'), spy);
            element.off('.' + eventNS);
            element.trigger(eventTypes[0]);
            element.trigger(eventTypes[1]);
            expect(spy).not.to.have.been.called;
        });

        it('should detach an event handler with a namespace from an element', function() {
            var element = $(document.body),
                eventType = getRndStr() + '.' + getRndStr();
            element.on(eventType, spy);
            element.off(eventType);
            element.trigger(eventType);
            expect(spy).not.to.have.been.called;
        });

        it('should detach space-separated event handlers from an element', function() {
            var element = $(document.body),
                eventTypes = [getRndStr(), getRndStr(), getRndStr()];
            element.on(eventTypes.join(' '), spy);
            element.off(eventTypes[1]);
            element.trigger(eventTypes[0]);
            element.trigger(eventTypes[1]);
            expect(spy).to.have.been.calledOnce;
            spy.reset();
            element.off(eventTypes.join(' '));
            element.trigger(eventTypes[2]);
            expect(spy).not.to.have.been.called;
        });

        it('should detach all space-separated event handlers from an element', function() {
            var element = $(document.body),
                eventTypes = [getRndStr(), getRndStr(), getRndStr()];
            element.on(eventTypes.join(' '), spy);
            element.off();
            element.trigger(eventTypes[0]);
            expect(spy).not.to.have.been.called;
        });

        it('should detach all event handlers from an element', function() {
            var element = $(document.body),
                eventType = getRndStr();
            element.on(eventType, spy);
            element.on(eventType, spy);
            element.off();
            element.trigger(eventType);
            expect(spy).not.to.have.been.called;
        });

        it('should detach event handlers from multiple elements', function() {
            var elements = $('#testFragment li'),
                eventType = getRndStr();
            elements.on(eventType, spy);
            elements.off(eventType, spy);
            elements.trigger(eventType);
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
                element.delegate('li', eventType, spy);
                element.undelegate('li', eventType, spy);
                $('.fourth').trigger('testEvent2');
                expect(spy).not.to.have.been.called;
            });

            it('should detach a delegated event handler from multiple elements', function() {
                var elements = $('#testFragment li'),
                    eventType = getRndStr();
                elements.delegate('li', eventType, spy);
                elements.undelegate('li', eventType, spy);
                $('.fourth').trigger('testEvent21');
                expect(spy).not.to.have.been.called;
            });

            it('should remove all delegated handlers when un-delegating event handlers', function() {
                var element = $(document.body),
                    eventType = getRndStr();
                element.delegate('li', eventType, spy);
                element.delegate('li', eventType, spy);
                element.delegate('li', eventType, spy);
                element.undelegate('li', eventType, spy);
                $('.two').trigger(eventType);
                expect(spy).not.to.have.been.called;
            });

        });

    });

    describe('delegate', function() {


    });

    describe('undelegate', function() {


    });

    describe('trigger', function() {

        it('should execute handler for detached nodes', function() {
            var element = $('<div></div>'),
                eventType = getRndStr();
            element.on(eventType, spy);
            element.trigger(eventType);
            expect(spy).to.have.been.called;
        });

        it('should execute handler and pass the data as event detail', function() {
            var element = $('#testFragment'),
                eventType = getRndStr(),
                eventData = {a: 1};
            element.on(eventType, spy);
            element.trigger(eventType, eventData);
            expect(spy).to.have.been.called;
            expect(spy.firstCall.args[1]).to.equal(eventData);
            expect(spy.firstCall.args[0].detail).to.equal(eventData);
        });

        it('should be able send non-bubbling events', function() {
            var element = $(document.body),
                eventType = getRndStr();
            element.on(eventType, spy);
            $('.two').trigger(eventType, null, {bubbles: false});
            expect(spy).not.to.have.been.called;
        });

    });

    describe('triggerHandler', function() {

        it('should execute handler', function() {
            var element = $('<div></div>'),
                eventType = getRndStr();
            element.on(eventType, spy);
            element.triggerHandler(eventType);
            expect(spy).to.have.been.called;
        });

        it('should not bubble', function() {
            var element = $('<div><span></span></div>'),
                eventType = getRndStr();
            element.on(eventType, spy);
            element.find('span').triggerHandler(eventType);
            expect(spy).not.to.have.been.called;
        });

        it('should prevent default event behavior', function() {
            var element = $('<div></div>'),
                eventType = getRndStr();
            element.on(eventType, function(event) {
                expect(event.isDefaultPrevented()).to.be.true;
            });
            element.triggerHandler(eventType);
        });

        it('should execute handler for first element only', function() {
            var element = $('<p></p><p></p>'),
                eventType = getRndStr();
            $(element[0]).on(eventType, spy);
            $(element[1]).on(eventType, spy);
            element.triggerHandler(eventType);
            expect(spy).to.have.been.calledOnce;
        });

    });

    describe('ready', function() {

        it('should execute on DOMContentLoaded (or after)', function(done) {
            $(document).ready(function() {
                done();
            })
        });

        it('should execute for any element on DOMContentLoaded (or after)', function(done) {
            $('<div/>').ready(function() {
                done();
            });
        });

    });

    describe('fluent', function() {

        it('should provide a chainable API', function() {
            var expected = $(document.body);
            var actual = expected.on('').off().delegate('', '').undelegate();
            expect(actual).to.be.equal(expected);
        });

    });

});

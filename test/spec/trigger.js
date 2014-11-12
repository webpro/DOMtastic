describe('events', function() {

    var spy;

    beforeEach(function() {
        spy = sinon.spy();
    });

    describe('trigger', function() {

        it('should execute handler for detached node', function() {
            var element = $('<div></div>'),
                eventType = getRndStr();
            element.on(eventType, spy);
            element.trigger(eventType);
            expect(spy).to.have.been.called;
        });

        it('should execute handler for detached tree', function() {
            var element = $('<div><p></p></div>'),
                child = $(element[0].querySelector('p')),
                eventType = getRndStr();
            element.on(eventType, 'p', spy);
            child.trigger(eventType);
            expect(spy).to.have.been.called;
            expect(spy).to.have.been.calledOnce;
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

        it('should be able to send non-bubbling events', function() {
            var element = $(document.body),
                eventType = getRndStr();
            element.on(eventType, spy);
            $('.two').trigger(eventType, null, {bubbles: false});
            expect(spy).not.to.have.been.called;
        });

        it('should be able to send non-cancelable events', function(done) {
            var element = $('#testFragment a'),
                eventType = 'click',
                hash = '#' + getRndStr();
            element.attr('href', hash).on(eventType, function(event) {
                event.preventDefault();
            });
            element.trigger(eventType, null, {cancelable: false});
            setTimeout(function() {
                expect(location.hash).to.have.string(hash);
                window.location.hash = '';
                done();
            }, 0);
        });

        it('should call direct methods blur() and focus() for these events', function() {
            var element = $('#testFragment input');
            ['blur', 'focus'].forEach(function(eventType) {
                spy = sinon.spy(element[0], eventType);
                element.trigger(eventType, null, {cancelable: false});
                expect(spy).to.have.been.called;
                element[0][eventType].restore();
            });
        });

        it('should call direct methods submit() for this event', function() {
            var element = $('#testFragment form'),
                eventType = 'submit';
            spy = sinon.spy(element[0], eventType);
            element.trigger(eventType, null, {cancelable: false});
            expect(spy).to.have.been.called;
            element[0][eventType].restore();
        });

        it('should not call direct methods for other event types that do have same name', function() {
            var element = $('#testFragment input'),
                eventType = 'getAttribute',
                spy = sinon.spy(element[0], eventType);
            element.trigger(eventType);
            expect(spy).not.to.have.been.called;
            element[0][eventType].restore();
        });

        it('should be able to trigger event on document', function() {
            var eventType = getRndStr();
            $(window).on(eventType, spy);
            $(document).trigger(eventType);
            expect(spy).to.have.been.called;
        });

        it('should be able to trigger event on window', function() {
            var element = $(window),
                eventType = getRndStr();
            element.on(eventType, spy);
            element.trigger(eventType);
            expect(spy).to.have.been.called;
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
            var element = $('<form action="#"/>'),
                eventType = 'submit';
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

});

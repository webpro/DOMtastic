// Events
// ------
//
// Chainable shorthand for `addEventListener`.
// Delegates to `delegate` if that signature is used.
//
//     element.on('click', callback);
//     element.trigger('click');

var on = function(eventName, fn, useCapture) {
    if(typeof fn === 'string' && typeof useCapture === 'function') {
        return delegate.apply(this, arguments);
    }
    (this.length ? this : [this]).forEach(function(element) {
        element.addEventListener(eventName, fn, useCapture || false);
    });
    return this;
};

// Chainable shorthand for `removeEventListener`.
// Delegates to `undelegate` if that signature is used.
//
//     element.off('click', callback);

var off = function(eventName, fn, useCapture) {
    if(typeof fn === 'string' && typeof useCapture === 'function') {
        return undelegate.apply(this, arguments);
    }
    (this.length ? this : [this]).forEach(function(element) {
        element.removeEventListener(eventName, fn, useCapture || false);
    });
    return this;
};

//     var handler = function(event) {
//         event.target; // child
//         event.currentTarget; // container
//     }
//     container.delegate('.children', 'click', handler);
//     $(.children)[2].trigger('click');
//
//     container.undelegate('.children', 'click', handler);

var delegate = function(selector, eventName, fn) {
    var args = arguments;
    (this.length ? this : [this]).forEach(function(element) {
        var handler = createEventHandler.apply(element, args);
        on.call(element, eventName, handler);
    });
    return this;
};

var undelegate = function(selector, eventName, fn) {
    var args = arguments;
    (this.length ? this : [this]).forEach(function(element) {
        var id = getEventId.apply(element, args);
        element._handlers[id].forEach(function(handler) {
            off.call(element, eventName, handler);
        }.bind(element));
        element._handlers[id] = null;
    });
    return this;
};

// Internal functions to create and get event handlers to remove them later on.

var createEventHandler = function(selector, eventName, fn) {
    var proxyFn = delegateHandler.bind(this, selector, fn),
        id = getEventId.apply(this, arguments);
    this._handlers = this._handlers || {};
    this._handlers[id] = this._handlers[id] || [];
    this._handlers[id].push(proxyFn);
    return proxyFn;
};

var eventHandlerId = 0;

var getEventId = function(selector, eventName, fn) {
    return selector + eventName + (fn._handlerId = fn._handlerId || ++eventHandlerId);
};

// Internal function to check whether delegated events match the provided `selector`; set `event.currentTarget`;
// and actually call the provided event handler.

var delegateHandler = function(selector, fn, event) {
    var matchesSelector = this.matchesSelector || this.mozMatchesSelector || this.webkitMatchesSelector || this.msMatchesSelector || this.oMatchesSelector;
    if(matchesSelector.call(event.target, selector)) {
        if(!event.currentTarget) {
            event.currentTarget = this;
        }
        fn.call(event.target, event);
    }
};

// Trigger uses `CustomEvent`.
//
//     element.trigger('anyEventName');

var trigger = function(type, options) {
    options = options || {};
    if(options.bubbles === undefined) options.bubbles = true;
    if(options.cancelable === undefined) options.cancelable = true;
    var event = new CustomEvent(type, options);
    (this.length ? this : [this]).forEach(function(element) {
        element.dispatchEvent(event);
    });
    return this;
};

// Polyfill for CustomEvent, borrowed from [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent#Polyfill).
// Needed to support IE (9, 10, 11)

(function() {
    function CustomEvent(event, params) {
        params = params || { bubbles: false, cancelable: false, detail: undefined };
        var evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
    }

    CustomEvent.prototype = window.CustomEvent.prototype;
    window.CustomEvent = CustomEvent;
})();

export { on, off, delegate, undelegate, trigger };

// # Events

/**
 * ## on
 *
 * Shorthand for `addEventListener`. Delegates to `delegate` if that signature is used.
 *
 *     $('.item').on('click', callback);
 *
 * @param {String} eventName
 * @param {Function} fn Listener
 * @param {Boolean} useCapture
 * @return {Node|NodeList|$Object} Returns the object it was applied to (`this`).
 */

var on = function(eventName, fn, useCapture) {
    if(typeof fn === 'string' && typeof useCapture === 'function') {
        return delegate.call(this, fn, eventName, useCapture);
    }
    (this.nodeType ? [this] : this).forEach(function(element) {
        element.addEventListener(eventName, fn, useCapture || false);
    });
    return this;
};

/**
 * ## off
 *
 * Shorthand for `removeEventListener`. Delegates to `undelegate` if that signature is used.
 *
 *     $('.item').off('click', callback);
 *
 * @param {String} eventName Name or type of the event
 * @param {Function} fn Event handler
 * @param {Boolean} useCapture
 * @return {Node|NodeList|$Object} Returns the object it was applied to (`this`).
 */

var off = function(eventName, fn, useCapture) {
    if(typeof fn === 'string' && typeof useCapture === 'function') {
        return undelegate.call(this, fn, eventName, useCapture);
    }
    (this.nodeType ? [this] : this).forEach(function(element) {
        element.removeEventListener(eventName, fn, useCapture || false);
    });
    return this;
};

/**
 * ## delegate
 *
 * Delegate events triggered at descendants to element(s)
 *
 *     $('.container').delegate('.item', 'click', handler);
 *
 * @param {String} selector Selector to filter descendants that delegate the event to this element.
 * @param {String} eventName Name or type of the event
 * @param {Function} fn Event handler
 * @return {Node|NodeList|$Object} Returns the object it was applied to (`this`).
 */

var delegate = function(selector, eventName, fn) {
    var args = arguments;
    (this.nodeType ? [this] : this).forEach(function(element) {
        var handler = createEventHandler.apply(element, args);
        on.call(element, eventName, handler);
    });
    return this;
};

/**
 * ## undelegate
 *
 * Undelegate events triggered at descendants to element(s)
 *
 *     $('.container').undelegate('.item', 'click', handler);
 *
 * @param {String} selector Selector to filter descendants that undelegate the event to this element.
 * @param {String} eventName Name or type of the event
 * @param {Function} fn Event handler
 * @return {Node|NodeList|$Object} Returns the object it was applied to (`this`).
 */

var undelegate = function(selector, eventName, fn) {
    var args = arguments;
    (this.nodeType ? [this] : this).forEach(function(element) {
        var id = getEventId.apply(element, args);
        element._handlers[id].forEach(function(handler) {
            off.call(element, eventName, handler);
        }.bind(element));
        element._handlers[id] = null;
    });
    return this;
};

/**
 * ## trigger
 *
 * Undelegate events triggered at descendants to element(s)
 *
 *     $('.item').trigger('anyEventType');
 *
 * @param {String} type Type of the event
 * @param {Object} params Event parameters (optional)
 * @param {Boolean} params.bubbles Does the event bubble up through the DOM or not.
 * @param {Boolean} params.cancelable Is the event cancelable or not.
 * @param {Number} params.detail Additional numerical information about the event, depending on the type of event.
 * @return {Node|NodeList|$Object} Returns the object it was applied to (`this`).
 */


var trigger = function(type, params) {
    params = params || { bubbles: true, cancelable: true, detail: undefined };
    var event = new CustomEvent(type, params);
    (this.nodeType ? [this] : this).forEach(function(element) {
        element.dispatchEvent(event);
    });
    return this;
};

/**
 * Store handler to element (to be able to remove delegated events).
 *
 * @method createEventHandler
 * @private
 * @param {String} selector Selector to filter descendants that undelegate the event to this element.
 * @param {String} eventName Name or type of the event
 * @param {Function} fn Event handler
 * @return {Function} Returns the bound event handler
 */

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


/**
 * Check whether delegated events match the provided `selector`, set `event.currentTarget`,
 * and actually call the provided event handler.
 *
 * @method delegateHandler
 * @private
 * @param {String} selector Selector to filter descendants that undelegate the event to this element.
 * @param {Function} fn Event handler
 * @param {Event} event
 * @return {Function} Returns the bound event handler
 */


var delegateHandler = function(selector, fn, event) {
    var matchesSelector = this.matchesSelector || this.mozMatchesSelector || this.webkitMatchesSelector || this.msMatchesSelector || this.oMatchesSelector;
    if(matchesSelector.call(event.target, selector)) {
        if(!event.currentTarget) {
            event.currentTarget = this;
        }
        fn.call(event.target, event);
    }
};

/**
 * Polyfill for CustomEvent, borrowed from [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent#Polyfill).
 * Needed to support IE (9, 10, 11)
 */

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

// Export interface

export { on, off, delegate, undelegate, trigger };

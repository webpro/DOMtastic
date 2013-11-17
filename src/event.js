// # Events

/**
 * ## on
 *
 * Shorthand for `addEventListener`. Supports event delegation if a filter (`selector`) is provided.
 *
 *     $('.item').on('click', callback);
 *     $('.container').on('click', '.item', handler);
 *
 * @param {String} eventName
 * @param {String} [selector] Selector to filter descendants that delegate the event to this element.
 * @param {Function} handler Event handler
 * @param {Boolean} useCapture=false
 * @return {Node|NodeList|$Object} Returns the object it was applied to (`this`).
 */

var on = function(eventName, selector, handler, useCapture) {

    if(typeof selector === 'function') {
        handler = selector;
        selector = null;
    }

    var parts = eventName.split('.');
    eventName = parts[0] || null;
    var namespace = parts[1] || null;

    var eventListener = handler;

    (this.nodeType ? [this] : this).forEach(function(element) {

        if(selector) {
            eventListener = delegateHandler.bind(element, selector, handler);
        }

        element.addEventListener(eventName, eventListener, useCapture || false);

        getHandlers(element).push({
            eventName: eventName,
            handler: handler,
            eventListener: eventListener,
            selector: selector,
            namespace: namespace
        });
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
 * @param {String} [selector] Selector to filter descendants that undelegate the event to this element.
 * @param {Function} handler Event handler
 * @param {Boolean} useCapture=false
 * @return {Node|NodeList|$Object} Returns the object it was applied to (`this`).
 */

var off = function(eventName, selector, handler, useCapture) {

    if(typeof selector === 'function') {
        handler = selector;
        selector = null;
    }

    if(eventName) {
        var parts = eventName.split('.');
        eventName = parts[0];
        var namespace = parts[1];
    }

    (this.nodeType ? [this] : this).forEach(function(element) {

        var handlers = getHandlers(element) || [];

        if(!eventName && !namespace && !selector && !handler) {

            handlers.forEach(function(item) {
                element.removeEventListener(item.eventName, item.eventListener, useCapture || false);
            });

            clearHandlers(element);

        } else {

            handlers.filter(function(item) {
                return ((!eventName || item.eventName === eventName) &&
                    (!namespace || item.namespace === namespace) &&
                    (!handler || item.handler === handler) &&
                    (!selector || item.selector === selector));
            }).forEach(function(item) {
                element.removeEventListener(item.eventName, item.eventListener, useCapture || false);
                handlers.splice(handlers.indexOf(item), 1);
            });

            if(handlers.length === 0) {
                clearHandlers(element);
            }
        }

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
    return on.call(this, eventName, selector, fn);
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
    return off.call(this, eventName, selector, fn);
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
        if(!params.bubbles || element === window || isEventBubblingInDetachedTree || document.contains(element)) {
            element.dispatchEvent(event);
        } else {
            triggerForPath(element, type, params);
        }
    });
    return this;
};

var triggerForPath = function(element, type, params) {
    params = params || {};
    params.bubbles = false;
    var event = new CustomEvent(type, params);
    event._target = element;
    while(element.parentNode) {
        element.dispatchEvent(event);
        element = element.parentNode;
    }
};

/**
 * Get event handlers from an element
 *
 * @method getHandlers
 * @private
 * @param {Node} element
 * @return {Array}
 */

var cacheKeyProp = '_jeh';
var id = 1;
var handlers = {};
var unusedKeys = [];

var getHandlers = function(element) {
    if(!element[cacheKeyProp]) {
        element[cacheKeyProp] = unusedKeys.length === 0 ? ++id : unusedKeys.pop();
    }
    var key = element[cacheKeyProp];
    return handlers[key] || (handlers[key] = []);
}

/**
 * Clear event handlers for an element
 *
 * @method clearHandlers
 * @private
 * @param {Node} element
 */

var clearHandlers = function(element) {
    var key = element[cacheKeyProp];
    if(handlers[key]) {
        handlers[key] = null;
        element[key] = null;
        unusedKeys.push(key);
    }
};

/**
 * Function to test whether delegated events match the provided `selector` (filter),
 * and then actually call the provided event handler.
 * Also sets `event.currentTarget` on the event object.
 *
 * @method delegateHandler
 * @private
 * @param {String} selector Selector to filter descendants that undelegate the event to this element.
 * @param {Function} fn Event handler
 * @param {Event} event
 */

var delegateHandler = function(selector, handler, event) {
    var eventTarget = event._target || event.target;
    if(matchesSelector.call(eventTarget, selector)) {
        if(!event.currentTarget) {
            event.currentTarget = eventTarget;
        }
        handler.call(eventTarget, event);
    }
};

var matchesSelector = function() {
    return this.matches || this.matchesSelector || this.mozMatchesSelector || this.webkitMatchesSelector || this.msMatchesSelector || this.oMatchesSelector;
}.call(Element.prototype);

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

// Are events bubbling in detached DOM trees?

var isEventBubblingInDetachedTree = function() {
    var isBubbling = false,
        parent = document.createElement('div'),
        child = parent.cloneNode();
    parent.appendChild(child);
    parent.addEventListener('e', function() {
        isBubbling = true;
    });
    child.dispatchEvent(new CustomEvent('e', {bubbles:true}));
    return isBubbling;
}();

// Export interface

export { on, off, delegate, undelegate, trigger };

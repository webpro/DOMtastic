// # Events

import { global, each } from './util';

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

    if (typeof selector === 'function') {
        handler = selector;
        selector = null;
    }

    var parts = eventName.split('.');
    eventName = parts[0] || null;
    var namespace = parts[1] || null;

    var eventListener = handler;

    each(this, function(element) {

        if (selector) {
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

    if (typeof selector === 'function') {
        handler = selector;
        selector = null;
    }

    if (eventName) {
        var parts = eventName.split('.');
        eventName = parts[0];
        var namespace = parts[1];
    }

    each(this, function(element) {

        var handlers = getHandlers(element) || [];

        if (!eventName && !namespace && !selector && !handler) {

            each(handlers, function(item) {
                element.removeEventListener(item.eventName, item.eventListener, useCapture || false);
            });

            clearHandlers(element);

        } else {

            each(handlers.filter(function(item) {
                return ((!eventName || item.eventName === eventName) &&
                    (!namespace || item.namespace === namespace) &&
                    (!handler || item.handler === handler) &&
                    (!selector || item.selector === selector));
            }), function(item) {
                element.removeEventListener(item.eventName, item.eventListener, useCapture || false);
                handlers.splice(handlers.indexOf(item), 1);
            });

            if (handlers.length === 0) {
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
 * Trigger event at element(s)
 *
 *     $('.item').trigger('anyEventType');
 *
 * @param {String} type Type of the event
 * @param {Object} [params] Event parameters (optional)
 * @param {Boolean} params.bubbles=true Does the event bubble up through the DOM or not.
 * @param {Boolean} params.cancelable=true Is the event cancelable or not.
 * @param {Mixed} params.detail=undefined Additional information about the event.
 * @return {Node|NodeList|$Object} Returns the object it was applied to (`this`).
 */

var trigger = function(type, params) {
    params = params || { bubbles: true, cancelable: true, detail: undefined };
    var event = new CustomEvent(type, params);
    each(this, function(element) {
        if (!params.bubbles || isEventBubblingInDetachedTree || isAttachedToDocument(element)) {
            element.dispatchEvent(event);
        } else {
            triggerForPath(element, type, params);
        }
    });
    return this;
};

/**
 * Check whether the element is attached to (or detached from) the document
 *
 * @method isAttachedToDocument
 * @private
 * @param {Node} element Element to test
 * @return {Boolean}
 */

var isAttachedToDocument = function(element) {
    if (element === window || element === document) {
        return true;
    }
    var container = element.ownerDocument.documentElement;
    if (container.contains) {
        return container.contains(element);
    } else if (container.compareDocumentPosition) {
        return !(container.compareDocumentPosition(element) & Node.DOCUMENT_POSITION_DISCONNECTED);
    }
    return false;
};

/**
 * Dispatch the event at the element and its ancestors.
 * Required to support delegated events in browsers that don't bubble events in detached DOM trees.
 *
 * @method triggerForPath
 * @private
 * @param {Node} element First element to dispatch the event
 * @param {String} type Type of the event
 * @param {Object} [params] Event parameters (optional)
 * @param {Boolean} params.bubbles=true Does the event bubble up through the DOM or not.
 * Will be set to false (but shouldn't matter since events don't bubble anyway).
 * @param {Boolean} params.cancelable=true Is the event cancelable or not.
 * @param {Mixed} params.detail=undefined Additional information about the event.
 */

var triggerForPath = function(element, type, params) {
    params = params || {};
    params.bubbles = false;
    var event = new CustomEvent(type, params);
    event._target = element;
    while (element.parentNode) {
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
    if (!element[cacheKeyProp]) {
        element[cacheKeyProp] = unusedKeys.length === 0 ? ++id : unusedKeys.pop();
    }
    var key = element[cacheKeyProp];
    return handlers[key] || (handlers[key] = []);
};

/**
 * Clear event handlers for an element
 *
 * @method clearHandlers
 * @private
 * @param {Node} element
 */

var clearHandlers = function(element) {
    var key = element[cacheKeyProp];
    if (handlers[key]) {
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
    if (matchesSelector.call(eventTarget, selector)) {
        if (!event.currentTarget) {
            event.currentTarget = eventTarget;
        }
        handler.call(eventTarget, event);
    }
};

// Get the available `matches` or `matchesSelector` method.

var matchesSelector = (function() {
    var context = typeof Element !== 'undefined' ? Element.prototype : global;
    return context.matches || context.matchesSelector || context.mozMatchesSelector || context.webkitMatchesSelector || context.msMatchesSelector || context.oMatchesSelector;
})();

/**
 * Polyfill for CustomEvent, borrowed from [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent#Polyfill).
 * Needed to support IE (9, 10, 11) & PhantomJS
 */

(function() {
    var CustomEvent = function(event, params) {
        params = params || { bubbles: false, cancelable: false, detail: undefined };
        var evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
    };

    CustomEvent.prototype = global.CustomEvent && global.CustomEvent.prototype;
    global.CustomEvent = CustomEvent;
})();

// Are events bubbling in detached DOM trees?

var isEventBubblingInDetachedTree = (function() {
    var isBubbling = false,
        doc = global.document;
    if (doc) {
        var parent = doc.createElement('div'),
            child = parent.cloneNode();
        parent.appendChild(child);
        parent.addEventListener('e', function() {
            isBubbling = true;
        });
        child.dispatchEvent(new CustomEvent('e', { bubbles: true }));
    }
    return isBubbling;
})();

// Export interface

export { on, off, delegate, undelegate, trigger };

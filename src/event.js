/**
 * @module Events
 */

import { global, each } from './util';
import { matches } from './selector';

/**
 * Shorthand for `addEventListener`. Supports event delegation if a filter (`selector`) is provided.
 *
 * @param {String} eventName
 * @param {String} [selector] Selector to filter descendants that delegate the event to this element.
 * @param {Function} handler Event handler
 * @param {Boolean} useCapture=false
 * @return {Object} The wrapped collection
 * @chainable
 * @example
 *     $('.item').on('click', callback);
 *     $('.container').on('click', '.item', handler);
 */

function on(eventName, selector, handler, useCapture) {

    if (typeof selector === 'function') {
        handler = selector;
        selector = null;
    }

    var parts = eventName.split('.');
    eventName = parts[0] || null;
    var namespace = parts[1] || null;

    var eventListener = createHandler(handler);

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
}

/**
 * Shorthand for `removeEventListener`. Delegates to `undelegate` if that signature is used.
 *
 * @param {String} eventName Name or type of the event
 * @param {String} [selector] Selector to filter descendants that undelegate the event to this element.
 * @param {Function} handler Event handler
 * @param {Boolean} useCapture=false
 * @return {Object} The wrapped collection
 * @chainable
 * @example
 *     $('.item').off('click', callback);
 */

function off(eventName, selector, handler, useCapture) {

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

        var handlers = getHandlers(element);

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
}

/**
 * Delegate events triggered at descendants to element(s)
 *
 * @param {String} selector Selector to filter descendants that delegate the event to this element.
 * @param {String} eventName Name or type of the event
 * @param {Function} handler Event handler
 * @return {Object} The wrapped collection
 * @chainable
 * @example
 *     $('.container').delegate('.item', 'click', handler);
 */

function delegate(selector, eventName, handler) {
    return on.call(this, eventName, selector, handler);
}

/**
 * Undelegate events triggered at descendants to element(s)
 *
 * @param {String} selector Selector to filter descendants that undelegate the event to this element.
 * @param {String} eventName Name or type of the event
 * @param {Function} handler Event handler
 * @return {Object} The wrapped collection
 * @chainable
 * @example
 *     $('.container').undelegate('.item', 'click', handler);
 */

function undelegate(selector, eventName, handler) {
    return off.call(this, eventName, selector, handler);
}

/**
 * Trigger event at element(s)
 *
 * @param {String} type Type of the event
 * @param {Object} data Data to be sent with the event (`params.detail` will be set to this).
 * @param {Object} [params] Event parameters (optional)
 * @param {Boolean} params.bubbles=true Does the event bubble up through the DOM or not.
 * @param {Boolean} params.cancelable=true Is the event cancelable or not.
 * @param {Mixed} params.detail=undefined Additional information about the event.
 * @return {Object} The wrapped collection
 * @chainable
 * @example
 *     $('.item').trigger('anyEventType');
 */

function trigger(type, data, params = {}) {
    params.bubbles = typeof params.bubbles === 'boolean' ? params.bubbles : true;
    params.cancelable = typeof params.cancelable === 'boolean' ? params.cancelable : true;
    params.detail = data;
    var event = new CustomEvent(type, params);
    each(this, function(element) {
        if (!params.bubbles || isEventBubblingInDetachedTree || isAttachedToDocument(element)) {
            element.dispatchEvent(event);
        } else {
            triggerForPath(element, type, params);
        }
    });
    return this;
}

/**
 * Execute callback when `DOMContentLoaded` fires for `document`, or immediately if called afterwards.
 *
 * @param handler Callback to execute when initial DOM content is loaded.
 * @return {Object} The wrapped collection
 * @chainable
 * @example
 *     $(document).ready(callback);
 */

function ready(handler) {
    if (/complete|loaded|interactive/.test(document.readyState) && document.body) {
        handler();
    } else {
        document.addEventListener('DOMContentLoaded', handler, false)
    }
    return this;
}

/**
 * Check whether the element is attached to (or detached from) the document
 *
 * @private
 * @param {Node} element Element to test
 * @return {Boolean}
 */

function isAttachedToDocument(element) {
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
}

/**
 * Dispatch the event at the element and its ancestors.
 * Required to support delegated events in browsers that don't bubble events in detached DOM trees.
 *
 * @private
 * @param {Node} element First element to dispatch the event
 * @param {String} type Type of the event
 * @param {Object} [params] Event parameters (optional)
 * @param {Boolean} params.bubbles=true Does the event bubble up through the DOM or not.
 * Will be set to false (but shouldn't matter since events don't bubble anyway).
 * @param {Boolean} params.cancelable=true Is the event cancelable or not.
 * @param {Mixed} params.detail=undefined Additional information about the event.
 */

function triggerForPath(element, type, params = {}) {
    params.bubbles = false;
    var event = new CustomEvent(type, params);
    event._target = element;
    do {
        element.dispatchEvent(event);
    } while (element = element.parentNode);
}

/**
 * Get event handlers from an element
 *
 * @private
 * @param {Node} element
 * @return {Array}
 */

var cacheKeyProp = '__domtastic';
var id = 1;
var handlers = {};
var unusedKeys = [];

function getHandlers(element) {
    if (!element[cacheKeyProp]) {
        element[cacheKeyProp] = unusedKeys.length === 0 ? ++id : unusedKeys.pop();
    }
    var key = element[cacheKeyProp];
    return handlers[key] || (handlers[key] = []);
}

/**
 * Clear event handlers for an element
 *
 * @private
 * @param {Node} element
 */

function clearHandlers(element) {
    var key = element[cacheKeyProp];
    if (handlers[key]) {
        handlers[key] = null;
        element[key] = null;
        unusedKeys.push(key);
    }
}

/**
 * Function to create a handler that augments the event object with some extra methods,
 * and executes the callback with the event and the event data (i.e. `event.detail`).
 *
 * @param handler Callback to execute as `handler(event, data)`
 * @returns {Function}
 */

function createHandler(handler) {
    return function(event) {
        handler(event, event.detail);
    };
}

/**
 * Function to test whether delegated events match the provided `selector` (filter),
 * and then actually call the provided event handler.
 * Also sets `event.currentTarget` on the event object.
 *
 * @private
 * @param {String} selector Selector to filter descendants that undelegate the event to this element.
 * @param {Function} handler Event handler
 * @param {Event} event
 */

function delegateHandler(selector, handler, event) {
    var eventTarget = event._target || event.target;
    if (matches(eventTarget, selector)) {
        if (!event.currentTarget) {
            event.currentTarget = eventTarget;
        }
        handler.call(eventTarget, event);
    }
}

/**
 * Polyfill for CustomEvent, borrowed from [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent#Polyfill).
 * Needed to support IE (9, 10, 11) & PhantomJS
 */

(function() {
    function CustomEvent(event, params = { bubbles: false, cancelable: false, detail: undefined }) {
        var evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
    }

    CustomEvent.prototype = global.CustomEvent && global.CustomEvent.prototype;
    global.CustomEvent = CustomEvent;
})();

/*
 * Are events bubbling in detached DOM trees?
 * @private
 */

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

/*
 * Export interface
 */

export { on, off, delegate, undelegate, trigger, ready };

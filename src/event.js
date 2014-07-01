/**
 * @module Events
 */

import { global, each } from './util';
import { closest } from './selector';

/**
 * Shorthand for `addEventListener`. Supports event delegation if a filter (`selector`) is provided.
 *
 * @param {String} eventNames List of space-separated event types to be added to the element(s)
 * @param {String} [selector] Selector to filter descendants that delegate the event to this element.
 * @param {Function} handler Event handler
 * @param {Boolean} useCapture=false
 * @return {Object} The wrapped collection
 * @chainable
 * @example
 *     $('.item').on('click', callback);
 *     $('.container').on('click focus', '.item', handler);
 */

function on(eventNames, selector, handler, useCapture) {

    if (typeof selector === 'function') {
        handler = selector;
        selector = null;
    }

    var parts,
        namespace,
        eventListener;

    eventNames.split(' ').forEach(function(eventName) {

        parts = eventName.split('.');
        eventName = parts[0] || null;
        namespace = parts[1] || null;

        eventListener = proxyHandler(handler);

        each(this, function(element) {

            if (selector && eventName in hoverEvents) {
                eventListener = hoverHandler(eventListener);
            }

            if (selector) {
                eventListener = delegateHandler.bind(element, selector, eventListener);
            }

            element.addEventListener(hoverEvents[eventName] || eventName, eventListener, useCapture || false);

            getHandlers(element).push({
                eventName: eventName,
                handler: handler,
                eventListener: eventListener,
                selector: selector,
                namespace: namespace
            });
        });

    }, this);

    return this;
}

/**
 * Shorthand for `removeEventListener`. Delegates to `undelegate` if that signature is used.
 *
 * @param {String} eventNames List of space-separated event types to be removed from the element(s)
 * @param {String} [selector] Selector to filter descendants that undelegate the event to this element.
 * @param {Function} handler Event handler
 * @param {Boolean} useCapture=false
 * @return {Object} The wrapped collection
 * @chainable
 * @example
 *     $('.item').off('click', callback);
 *     $('#my-element').off('myEvent myOtherEvent');
 *     $('.item').off();
 */

function off(eventNames = '', selector, handler, useCapture) {

    if (typeof selector === 'function') {
        handler = selector;
        selector = null;
    }

    var parts,
        namespace,
        handlers;

    eventNames.split(' ').forEach(function(eventName) {

        parts = eventName.split('.');
        eventName = parts[0] || null;
        namespace = parts[1] || null;

        each(this, function(element) {

            handlers = getHandlers(element);

            each(handlers.filter(function(item) {
                return (
                    (!eventName || item.eventName === eventName) &&
                    (!namespace || item.namespace === namespace) &&
                    (!handler || item.handler === handler) &&
                    (!selector || item.selector === selector));
            }), function(item) {
                element.removeEventListener(hoverEvents[item.eventName] || item.eventName, item.eventListener, useCapture || false);
                handlers.splice(handlers.indexOf(item), 1);
            });

            if (!eventName && !namespace && !selector && !handler) {
                clearHandlers(element);
            } else if (handlers.length === 0) {
                clearHandlers(element);
            }

        });

    }, this);

    return this;
}

function delegate(selector, eventName, handler) {
    return on.call(this, eventName, selector, handler);
}

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
    params.preventDefault = typeof params.preventDefault === 'boolean' ? params.preventDefault : false;
    params.detail = data;
    var event = new CustomEvent(type, params);
    event._preventDefault = params.preventDefault;
    each(this, function(element) {
        if (!params.bubbles || isEventBubblingInDetachedTree || isAttachedToDocument(element)) {
            dispatchEvent(element, event);
        } else {
            triggerForPath(element, type, params);
        }
    });
    return this;
}

/**
 * Trigger event at first element in the collection. Similar to `trigger()`, except:
 *
 * - Event does not bubble
 * - Default event behavior is prevented
 * - Only triggers handler for first matching element
 *
 * @param {String} type Type of the event
 * @param {Object} data Data to be sent with the event
 * @example
 *     $('form').triggerHandler('submit');
 */

function triggerHandler(type, data) {
    if (this[0]) {
        trigger.call(this[0], type, data, {bubbles: false, preventDefault: true});
    }
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
    return $.contains(element.ownerDocument.documentElement, element);
}

/**
 * Dispatch the event at the element and its ancestors.
 * Required to support delegated events in browsers that don't bubble events in detached DOM trees.
 *
 * @private
 * @param {Node} element First element to dispatch the event at
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
        dispatchEvent(element, event);
    } while (element = element.parentNode);
}

/**
 * Dispatch event to element,
 * but call direct event methods instead if available (i.e. "blur", "click", "focus", "select").
 *
 * @private
 * @param {Node} element Element to dispatch the event at
 * @param {Object} event Event to dispatch
 */

var directEventMethods = ['blur', 'click', 'focus', 'select'];

function dispatchEvent(element, event) {
    if(directEventMethods.indexOf(event.type) !== -1 && typeof element[event.type] === 'function') {
        element[event.type]();
    } else {
        element.dispatchEvent(event);
    }
}

/**
 * Get event handlers from an element
 *
 * @private
 * @param {Node} element
 * @return {Array}
 */

var eventKeyProp = '__domtastic_event__';
var id = 1;
var handlers = {};
var unusedKeys = [];

function getHandlers(element) {
    if (!element[eventKeyProp]) {
        element[eventKeyProp] = unusedKeys.length === 0 ? ++id : unusedKeys.pop();
    }
    var key = element[eventKeyProp];
    return handlers[key] || (handlers[key] = []);
}

/**
 * Clear event handlers for an element
 *
 * @private
 * @param {Node} element
 */

function clearHandlers(element) {
    var key = element[eventKeyProp];
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
 * @private
 * @param handler Callback to execute as `handler(event, data)`
 * @return {Function}
 */

function proxyHandler(handler) {
    return function(event) {
        handler.call(this, augmentEvent(event), event.detail);
    };
}

/**
 * Attempt to augment events and implement something closer to DOM Level 3 Events.
 *
 * @private
 * @param {Object} event
 * @return {Function}
 */

var augmentEvent = (function() {

    var methodName,
        eventMethods = {
            preventDefault: 'isDefaultPrevented',
            stopImmediatePropagation: 'isImmediatePropagationStopped',
            stopPropagation: 'isPropagationStopped'
        },
        noop = () => {},
        returnTrue = () => true,
        returnFalse = () => false;

    return function(event) {
        if (!event.isDefaultPrevented || event.stopImmediatePropagation || event.stopPropagation) {
            for (methodName in eventMethods) {
                (function(methodName, testMethodName, originalMethod) {
                    event[methodName] = function() {
                        this[testMethodName] = returnTrue;
                        return originalMethod.apply(this, arguments);
                    };
                    event[testMethodName] = returnFalse;
                }(methodName, eventMethods[methodName], event[methodName] || noop));
            }
            if (event._preventDefault) {
                event.preventDefault();
            }
        }
        return event;
    }

})();

/**
 * Function to test whether delegated events match the provided `selector` (filter),
 * if the event propagation was stopped, and then actually call the provided event handler.
 * Use `this` instead of `event.currentTarget` on the event object.
 *
 * @private
 * @param {String} selector Selector to filter descendants that undelegate the event to this element.
 * @param {Function} handler Event handler
 * @param {Event} event
 */

function delegateHandler(selector, handler, event) {
    var eventTarget = event._target || event.target,
        currentTarget = closest.call([eventTarget], selector, this)[0];
    if (currentTarget && currentTarget !== this) {
        if (currentTarget === eventTarget || !(event.isPropagationStopped && event.isPropagationStopped())) {
            handler.call(currentTarget, event);
        }
    }
}

/**
 * Simulate `mouseenter` and `mouseleave` events (using `mouseover` and `mouseout`).
 *
 * @private
 */

var hoverEvents = {
    mouseenter: 'mouseover',
    mouseleave: 'mouseout'
};

function hoverHandler(handler) {
    return function(event) {
        var relatedTarget = event.relatedTarget;
        if (!relatedTarget || (relatedTarget !== this && !$.contains(this, relatedTarget))) {
            return handler.apply(this, arguments);
        }
    };
}

/**
 * Polyfill for CustomEvent, borrowed from [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent#Polyfill).
 * Needed to support IE (9, 10, 11) & PhantomJS
 */

(function() {
    function CustomEvent(event, params = { bubbles: false, cancelable: false, detail: undefined }) {
        var customEvent = document.createEvent('CustomEvent');
        customEvent.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return customEvent;
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

var bind = on,
    unbind = off;

/*
 * Export interface
 */

export { on, off, delegate, undelegate, trigger, triggerHandler, bind, unbind };

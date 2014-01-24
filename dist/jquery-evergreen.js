require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
function __es6_transpiler_warn__(warning) {
  if (typeof console === 'undefined') {
  } else if (typeof console.warn === "function") {
    console.warn(warning);
  } else if (typeof console.log === "function") {
    console.log(warning);
  }
}
function __es6_transpiler_build_module_object__(name, imported) {
  var moduleInstanceObject = Object.create ? Object.create(null) : {};
  if (typeof imported === "function") {
    __es6_transpiler_warn__("imported module '"+name+"' exported a function - this may not work as expected");
  }
  for (var key in imported) {
    if (Object.prototype.hasOwnProperty.call(imported, key)) {
      moduleInstanceObject[key] = imported[key];
    }
  }
  if (Object.freeze) {
    Object.freeze(moduleInstanceObject);
  }
  return moduleInstanceObject;
}
// # API

var extend = require("./util").extend;

var api = {},
    apiNodeList = {},
    $ = {};

// Import modules to build up the API

var array = __es6_transpiler_build_module_object__("array", require("./array"));
var attr = __es6_transpiler_build_module_object__("attr", require("./attr"));
var className = __es6_transpiler_build_module_object__("className", require("./class"));
var dom = __es6_transpiler_build_module_object__("dom", require("./dom"));
var dom_extra = __es6_transpiler_build_module_object__("dom_extra", require("./dom_extra"));
var event = __es6_transpiler_build_module_object__("event", require("./event"));
var html = __es6_transpiler_build_module_object__("html", require("./html"));
var selector = __es6_transpiler_build_module_object__("selector", require("./selector"));
var selector_extra = __es6_transpiler_build_module_object__("selector_extra", require("./selector_extra"));

if (selector !== undefined) {
    $ = selector.$;
    $.matches = selector.matches;
    api.find = selector.find;
}

var mode = __es6_transpiler_build_module_object__("mode", require("./mode"));
extend($, mode);
var noconflict = __es6_transpiler_build_module_object__("noconflict", require("./noconflict"));
extend($, noconflict);

extend(api, array, attr, className, dom, dom_extra, event, html, selector_extra);
extend(apiNodeList, array);

// Util

$.extend = extend;

// Internal properties to switch between default and native mode

$._api = api;
$._apiNodeList = apiNodeList;

// Export interface

exports["default"] = $;
},{"./array":2,"./attr":3,"./class":4,"./dom":5,"./dom_extra":6,"./event":7,"./html":8,"./mode":9,"./noconflict":10,"./selector":11,"./selector_extra":12,"./util":13}],2:[function(require,module,exports){
"use strict";
// # Array

var _each = require("./util").each;
var $ = require("./selector").$;
var matches = require("./selector").matches;

var ArrayProto = Array.prototype;

// Filter the collection by selector or function.

function filter(selector) {
    var callback = typeof selector === 'function' ? selector : function(element) {
        return matches(element, selector);
    };
    return $(ArrayProto.filter.call(this, callback));
}

function each(callback) {
    return _each(this, callback);
}

function reverse() {
    var elements = ArrayProto.slice.call(this);
    return $(ArrayProto.reverse.call(elements));
}

var every = ArrayProto.every,
    forEach = each,
    map = ArrayProto.map,
    some = ArrayProto.some;

exports.each = each;
exports.every = every;
exports.filter = filter;
exports.forEach = forEach;
exports.map = map;
exports.reverse = reverse;
exports.some = some;
},{"./selector":11,"./util":13}],3:[function(require,module,exports){
"use strict";
// # Attr

var each = require("./util").each;

/**
 * ## attr
 *
 * Get the value of an attribute for the first element, or set one or more attributes for each element in the collection.
 *
 *     $('.item').attr('attrName');
 *     $('.item').attr('attrName', 'attrValue');
 *     $('.item').attr({'attr1', 'value1'}, {'attr2', 'value2});
 *
 * @param {String|Object} key The name of the attribute to get or set. Or an object containing key-value pairs to set as attributes.
 * @param {String} [value] The value of the attribute to set.
 * @return {$Object} or Node/List in native mode
 */

function attr(key, value) {

    if (typeof key === 'string' && typeof value === 'undefined') {
        return (this.nodeType ? this : this[0]).getAttribute(key);
    }

    each(this, function(element) {
        if (typeof key === 'object') {
            for (var attr in key) {
                element.setAttribute(attr, key[attr]);
            }
        } else {
            element.setAttribute(key, value);
        }
    });

    return this;
}

// Export interface

exports.attr = attr;
},{"./util":13}],4:[function(require,module,exports){
"use strict";
// # Class

var makeIterable = require("./util").makeIterable;
var each = require("./util").each;

/**
 * ## addClass
 *
 *     $('.item').addClass('bar');
 *
 * @param {String} value The class name to add to the element(s).
 * @return {$Object} or Node/List in native mode
 */

function addClass(value) {
    each(this, function(element) {
        element.classList.add(value);
    });
    return this;
}

/**
 * ## removeClass
 *
 *     $('.items').removeClass('bar');
 *
 * @param {String} value The class name to remove from the element(s).
 * @return {$Object} or Node/List in native mode
 */

function removeClass(value) {
    each(this, function(element) {
        element.classList.remove(value);
    });
    return this;
}

/**
 * ## toggleClass
 *
 *     $('.item').toggleClass('bar');
 *
 * @param {String} value The class name to toggle at the element(s).
 * @return {$Object} or Node/List in native mode
 */

function toggleClass(value) {
    each(this, function(element) {
        element.classList.toggle(value);
    });
    return this;
}

/**
 * ## hasClass
 *
 *     $('.item').hasClass('bar');
 *
 * @param {String} value Check if the DOM element contains the class name. When applied to multiple elements,
 * returns `true` if _any_ of them contains the class name.
 * @return {boolean}
 */

function hasClass(value) {
    return makeIterable(this).some(function(element) {
        return element.classList.contains(value);
    });
}

// Export interface

exports.addClass = addClass;
exports.removeClass = removeClass;
exports.toggleClass = toggleClass;
exports.hasClass = hasClass;
},{"./util":13}],5:[function(require,module,exports){
"use strict";
// # DOM Manipulation

var toArray = require("./util").toArray;

/**
 * ## append
 *
 *     $('.item').append('<p>more</p>');
 *
 * @param {String|Node|NodeList|$Object} element What to append to the element(s).
 * Clones elements as necessary.
 * @return {Node|NodeList|$Object} Returns the object it was applied to.
 */

function append(element) {
    if (this instanceof Node) {
        if (typeof element === 'string') {
            this.insertAdjacentHTML('beforeend', element);
        } else {
            if (element instanceof Node) {
                this.appendChild(element);
            } else {
                var elements = element instanceof NodeList ? toArray(element) : element;
                elements.forEach(this.appendChild.bind(this));
            }
        }
    } else {
        var l = this.length;
        while (l--) {
            var elm = l === 0 ? element : clone(element);
            append.call(this[l], elm);
        }
    }
    return this;
}

/**
 * ## before
 *
 *     $('.items').before('<p>prefix</p>');
 *
 * @param {String|Node|NodeList|$Object} element What to place as sibling(s) before to the element(s).
 * Clones elements as necessary.
 * @return {Node|NodeList|$Object} Returns the object it was applied to.
 */

function before(element) {
    if (this instanceof Node) {
        if (typeof element === 'string') {
            this.insertAdjacentHTML('beforebegin', element);
        } else {
            if (element instanceof Node) {
                this.parentNode.insertBefore(element, this);
            } else {
                var elements = element instanceof NodeList ? toArray(element) : element;
                elements.forEach(before.bind(this));
            }
        }
    } else {
        var l = this.length;
        while (l--) {
            var elm = l === 0 ? element : clone(element);
            before.call(this[l], elm);
        }
    }
    return this;
}

/**
 * ## after
 *
 *     $('.items').after('<span>suf</span><span>fix</span>');
 *
 * @param {String|Node|NodeList|$Object} element What to place as sibling(s) after to the element(s).
 * Clones elements as necessary.
 * @return {Node|NodeList|$Object} Returns the object it was applied to.
 */

function after(element) {
    if (this instanceof Node) {
        if (typeof element === 'string') {
            this.insertAdjacentHTML('afterend', element);
        } else {
            if (element instanceof Node) {
                this.parentNode.insertBefore(element, this.nextSibling);
            } else {
                var elements = element instanceof NodeList ? toArray(element) : element;
                elements.reverse().forEach(after.bind(this));
            }
        }
    } else {
        var l = this.length;
        while (l--) {
            var elm = l === 0 ? element : clone(element);
            after.call(this[l], elm);
        }
    }
    return this;
}

/**
 * @method clone
 * @private
 * @param {String|Node|NodeList|Array} element The element(s) to clone.
 * @return {String|Node|NodeList|Array} The cloned element(s)
 */

function clone(element) {
    if (typeof element === 'string') {
        return element;
    } else if (element instanceof Node) {
        return element.cloneNode(true);
    } else if ('length' in element) {
        return [].map.call(element, function(el) {
            return el.cloneNode(true);
        });
    }
    return element;
}

// Export interface

exports.append = append;
exports.before = before;
exports.after = after;
},{"./util":13}],6:[function(require,module,exports){
"use strict";
// # DOM Manipulation (extra)

var each = require("./util").each;
var append = require("./dom").append;
var before = require("./dom").before;
var after = require("./dom").after;
var $ = require("./selector").$;

/**
 * ## appendTo
 *
 * Inverse of [append](dom.html#append).
 *
 *     $('.item').appendTo(container);
 *
 * @param {Node|NodeList|$Object} element What to append the element(s) to.
 * Clones elements as necessary.
 * @return {$Object}
 */

function appendTo(element) {
    var context = typeof element === 'string' ? $(element) : element;
    append.call(context, this);
    return this;
}

/**
 * ## remove
 *
 * Remove the collection from the DOM.
 *
 * @return {Array} Removed elements
 */

function remove() {
    return each(this, function(element) {
        if (element.parentNode) {
            element.parentNode.removeChild(element);
        }
    });
}

/**
 * ## replaceWith
 *
 * Replace each element in the collection with the provided new content, and return the array of elements that were removed.
 *
 * @return {Array}
 */

function replaceWith() {
    return before.apply(this, arguments).remove();
}

// Export interface

exports.appendTo = appendTo;
exports.remove = remove;
exports.replaceWith = replaceWith;
},{"./dom":5,"./selector":11,"./util":13}],7:[function(require,module,exports){
"use strict";
// # Events

var global = require("./util").global;
var each = require("./util").each;
var matches = require("./selector").matches;

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
 * @return {Node|NodeList|$Object} Returns the object it was applied to.
 */

function on(eventName, selector, handler, useCapture) {

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
}

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
 * @return {Node|NodeList|$Object} Returns the object it was applied to.
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
}

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

function delegate(selector, eventName, fn) {
    return on.call(this, eventName, selector, fn);
}

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

function undelegate(selector, eventName, fn) {
    return off.call(this, eventName, selector, fn);
}

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

function trigger(type, params) {
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
}

/**
 * Check whether the element is attached to (or detached from) the document
 *
 * @method isAttachedToDocument
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

function triggerForPath(element, type, params) {
    params = params || {};
    params.bubbles = false;
    var event = new CustomEvent(type, params);
    event._target = element;
    while (element.parentNode) {
        element.dispatchEvent(event);
        element = element.parentNode;
    }
}

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
 * @method clearHandlers
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
    function CustomEvent(event, params) {
        params = params || { bubbles: false, cancelable: false, detail: undefined };
        var evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
    }

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

exports.on = on;
exports.off = off;
exports.delegate = delegate;
exports.undelegate = undelegate;
exports.trigger = trigger;
},{"./selector":11,"./util":13}],8:[function(require,module,exports){
"use strict";
// # HTML

var each = require("./util").each;

/*
 * ## html
 *
 * Get the HTML contents of the first element, or set the HTML contents for each element in the collection.
 *
 *     $('.item').html();
 *     $('.item').html('<span>more</span>');
 *
 * @param {String} [fragment] HTML fragment to set for the element
 * @return {Node|NodeList|$Object} Returns the object it was applied to.
 */

function html(fragment) {

    if (typeof fragment !== 'string') {
        return (this.nodeType ? this : this[0]).innerHTML;
    }

    each(this, function(element) {
        element.innerHTML = fragment;
    });

    return this;

}

// Export interface

exports.html = html;
},{"./util":13}],9:[function(require,module,exports){
"use strict";
/*
 * # Opt-in to Native Mode
 *
 * The default, non-intrusive mode is similar to how jQuery operates: working with static, array-like `$` objects:
 *
 *     $('.items').append('<span>foo</span>);
 *     $(document.body).on('click', '.tab', handler);
 *
 * However, you can opt-in to work with live NodeList objects.
 * In this "native" mode, the `Node` and `NodeList` prototypes are augmented (in a safe and reversible manner) to fill up the chainable API,
 * to enable working with `Node` and `NodeList` objects directly:
 *
 *     var collection = document.querySelectorAll('.items');
 *     collection.append('<span>foo</span>);
 *     collection.addClass('bar');
 *     collection.forEach(iteratorFn);
 *     collection.find('.more');
 *
 *     document.body.on('click', '.tab', handler)
 *
 * Note that in native mode, `$(selector)` can stil be used. It returns a NodeList.
 *
 * Build the lib using Grunt with `mode` not excluded.
 * Use `$.native()` to activate this behavior. The API is the same in both modes.
 */

var global = require("./util").global;

var isNative = false;

function native(native) {
    var wasNative = isNative;
    isNative = typeof native === 'boolean' ? native : true;
    if (global.$) {
        global.$.isNative = isNative;
    }
    if (!wasNative && isNative) {
        augmentNativePrototypes(this._api, this._apiNodeList);
    }
    if (wasNative && !isNative) {
        unaugmentNativePrototypes(this._api, this._apiNodeList);
    }
    return isNative;
}

var NodeProto = typeof Node !== 'undefined' && Node.prototype,
    NodeListProto = typeof NodeList !== 'undefined' && NodeList.prototype;

/*
 * Add a property (i.e. method) to an object in a safe and reversible manner.
 * Only add the method if object not already had it (non-inherited).
 */

function augment(obj, key, value) {
    if (!obj.hasOwnProperty(key)) {
        Object.defineProperty(obj, key, {
            value: value,
            configurable: true,
            enumerable: false
        });
    }
}

/*
 * Remove property from object (only inherited properties will be removed).
 */

function unaugment(obj, key) {
    delete obj[key];
}

/*
 * Augment native `Node` and `NodeList` objects in native mode.
 */

function augmentNativePrototypes(methodsNode, methodsNodeList) {

    var key;

    for (key in methodsNode) {
        augment(NodeProto, key, methodsNode[key]);
        augment(NodeListProto, key, methodsNode[key]);
    }

    for (key in methodsNodeList) {
        augment(NodeListProto, key, methodsNodeList[key]);
    }
}

/*
 * Unaugment native `Node` and `NodeList` objects to switch back to default mode.
 * Mainly used for tests.
 */

function unaugmentNativePrototypes(methodsNode, methodsNodeList) {

    var key;

    for (key in methodsNode) {
        unaugment(NodeProto, key);
        unaugment(NodeListProto, key);
    }

    for (key in methodsNodeList) {
        unaugment(NodeListProto, key);
    }
}

// Export interface

exports.isNative = isNative;
exports.native = native;
},{"./util":13}],10:[function(require,module,exports){
"use strict";
/*
 * # noConflict
 *
 * In case another library sets the global `$` variable before jQuery Evergreen does,
 * this method can be used to return the global `$` to that other library.
 */

var global = require("./util").global;

// Save the previous value of the global `$` variable, so that it can be restored later on.

var previousLib = global.$;

// Put jQuery Evergreen in noConflict mode, returning the `$` variable to its previous owner.
// Returns a reference to jQuery Evergreen.

function noConflict() {
    global.$ = previousLib;
    return this;
}

// Export interface

exports.noConflict = noConflict;
},{"./util":13}],11:[function(require,module,exports){
"use strict";
// # Selector

var global = require("./util").global;
var makeIterable = require("./util").makeIterable;

var slice = [].slice,
    isPrototypeSet = false,
    reFragment = /^\s*<(\w+|!)[^>]*>/,
    reSingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
    reSimpleSelector = /^[\.#]?[\w-]*$/;

/*
 * ## $
 *
 * Versatile wrapper for `querySelectorAll`.
 *
 * @param {String|Node|NodeList} selector Query selector.
 * Providing a selector string gives the default behavior.
 * Providing a Node or NodeList will return a NodeList or $Object containing the same element(s).
 * Providing a string that looks like HTML (i.e. starts with a `<tag>`) results in an attempt to create a DOM Fragment from it.
 * @param {String|Node|NodeList} context=`document` The context for the selector to query elements.
 * @return {NodeList|$Object}
 */

function $(selector, context) {

    var collection;

    if (!selector) {

        collection = document.querySelectorAll(null);

    } else if (typeof selector !== 'string') {

        collection = makeIterable(selector);

    } else if (reFragment.test(selector)) {

        collection = createFragment(selector);

    } else {

        context = context ? (typeof context === 'string' ? document.querySelector(context) : context.length ? context[0] : context) : document;

        collection = querySelector(selector, context);

    }

    return $.isNative ? collection : wrap(collection);

}

/*
 * ## Find
 *
 * Chaining for the `$` wrapper (aliasing `find` for `$`).
 *
 *     $('.selector').find('.deep').$('.deepest');
 */

function find(selector) {
    return $(selector, this);
}

/*
 * ## Matches
 *
 * Returns true if the element would be selected by the specified selector string; otherwise, returns false.
 *
 *     $.matches(element, '.match');
 *
 * @param {Node} element Element to test
 * @param {String} selector Selector to match against element
 * @return {Boolean}
 */

var matches = (function() {
    var context = typeof Element !== 'undefined' ? Element.prototype : global,
        _matches = context.matches || context.matchesSelector || context.mozMatchesSelector || context.webkitMatchesSelector || context.msMatchesSelector || context.oMatchesSelector;
    return function(element, selector) {
        return _matches.call(element, selector);
    }
})();

/*
 * Use the faster `getElementById` or `getElementsByClassName` over `querySelectorAll` if possible.
 *
 * @method querySelector
 * @private
 * @param {String} selector Query selector.
 * @param {Node} context The context for the selector to query elements.
 * @return {NodeList|Node}
 */

function querySelector(selector, context) {

    var isSimpleSelector = reSimpleSelector.test(selector);

    if (isSimpleSelector && !$.isNative) {
        if (selector[0] === '#') {
            return [(context.getElementById ? context : document).getElementById(selector.slice(1))];
        }
        if (selector[0] === '.') {
            return context.getElementsByClassName(selector.slice(1));
        }
        return context.getElementsByTagName(selector);
    }

    return context.querySelectorAll(selector);

}

/*
 * Create DOM fragment from an HTML string
 *
 * @method createFragment
 * @private
 * @param {String} html String representing HTML.
 * @return {NodeList}
 */

function createFragment(html) {

    if (reSingleTag.test(html)) {
        return [document.createElement(RegExp.$1)];
    }

    var elements = [],
        container = document.createElement('div'),
        children = container.childNodes;

    container.innerHTML = html;

    for (var i = 0, l = children.length; i < l; i++) {
        elements.push(children[i]);
    }

    return elements;
}

/*
 * Calling `$(selector)` returns a wrapped array-like object of elements [by default](mode.html).
 *
 * @method wrap
 * @private
 * @param {NodeList|Array} collection Element(s) to wrap as a `$Object`.
 * @return {$Object} Array with augmented API.
 */

function wrap(collection) {

    if (!isPrototypeSet) {
        Wrapper.prototype = $._api;
        Wrapper.prototype.constructor = Wrapper;
        isPrototypeSet = true;
    }

    return new Wrapper(collection);

}

// Constructor for the Object.prototype strategy

function Wrapper(collection) {
    var i = 0, length = collection.length;
    for (; i < length;) {
        this[i] = collection[i++];
    }
    this.length = length;
}

// Export interface

exports.$ = $;
exports.find = find;
exports.matches = matches;
},{"./util":13}],12:[function(require,module,exports){
"use strict";
// # Selector (extra)

var each = require('./util').each;
var $ = require("./selector").$;
var matches = require("./selector").matches;

/*
 * ## children
 *
 * Return children of each element in the collection (optionally filtered by a selector).
 *
 *     $('.selector').children();
 *     $('.selector').children('.filter');
 */

function children(selector) {
    var nodes = [];
    each(this, function(element) {
        each(element.children, function(child) {
            if (!selector || (selector && matches(child, selector))) {
                nodes.push(child);
            }
        });
    });
    return $(nodes);
}

/**
 * ## eq
 *
 * Return a collection containing only the one at the specified index.
 *
 * @param {Number} index
 * @returns {$Object}
 */

function eq(index) {
    return slice.call(this, index, index + 1);
}

/**
 * ## get
 *
 * Return the DOM element at the provided index.
 *
 * @param {Number} index
 * @returns {Node}
 */

function get(index) {
    return this[index];
}

/**
 * ## slice
 *
 * Return a new, sliced collection.
 *
 * @param {Number} start
 * @param {Number} end
 * @returns {$Object}
 */

function slice(start, end) {
    return $([].slice.apply(this, arguments));
}

exports.children = children;
exports.eq = eq;
exports.get = get;
exports.slice = slice;
},{"./selector":11,"./util":13}],13:[function(require,module,exports){
"use strict";
// # Util

/**
 * Reference to the global scope
 */

var global = new Function("return this")(),
    slice = Array.prototype.slice;

/**
 * ## toArray
 *
 * Convert `NodeList` to `Array`.
 *
 * @param {NodeList|Array} collection
 * @return {Array}
 */

function toArray(collection) {
    return slice.call(collection);
}

/**
 * ## makeIterable
 *
 * Return something that can be iterated over (e.g. using `forEach`).
 * Arrays and NodeLists are returned as-is, but `Node`s are wrapped in a `[]`.
 *
 * @param {Node|NodeList|Array} element
 * @return {Array|NodeList}
 */

function makeIterable(element) {
    return element.length === undefined || element === window ? [element] : element;
}

/**
 * ## each
 *
 * Faster alternative to [].forEach method
 *
 * @param {Node|NodeList|Array} collection
 * @param {Function} callback
 * @returns {Node|NodeList|Array}
 */

function each(collection, callback) {
    var length = collection.length;
    if (length !== undefined) {
        for (var i = 0; i < length; i++){
            callback(collection[i]);
        }
    } else {
        callback(collection);
    }
    return collection;
}

/**
 * ## extend
 *
 * Assign properties from source object(s) to target object
 *
 * @method extend
 * @param {Object} obj Object to extend
 * @param {Object} [source] Object to extend from
 * @returns {Object} Extended object
 */

function extend(obj) {
    slice.call(arguments, 1).forEach(function(source) {
        if (source) {
            for (var prop in source) {
                obj[prop] = source[prop];
            }
        }
    });
    return obj;
}

exports.global = global;
exports.toArray = toArray;
exports.makeIterable = makeIterable;
exports.each = each;
exports.extend = extend;
},{}],"jQueryEvergreen":[function(require,module,exports){
module.exports=require('AExCZQ');
},{}],"AExCZQ":[function(require,module,exports){
"use strict";
/**
 * # jQuery Evergreen
 *
 * Small & fast DOM and event library for modern browsers.
 * Having the same familiar API as jQuery (but without the extra "weight" of modules like `$.ajax`, `$.animate`, and `$.Deferred`), it works great stand-alone or paired up with e.g. Backbone.
 * The full version is only 7KB minified (2KB gzip), but it's easy to create a custom build to exclude parts you don't need.
 *
 * The [source](https://github.com/webpro/jquery-evergreen) is written in the ES6 Modules format, and transpiled to an AMD and a CommonJS version using the [ES6 Module Transpiler](http://square.github.io/es6-module-transpiler/). And last but also least, the CommonJS version is "browserified".
 *
 * Please find the table of contents in upper right.
 */

var $ = require("./je/api")["default"];

exports["default"] = $;
},{"./je/api":1}]},{},["AExCZQ"]);window.$=require('jQueryEvergreen')['default'];
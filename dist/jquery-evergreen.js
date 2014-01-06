require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
/*
 * # API
 *
 * Import modules to build the API.
 *
 * The special comments (e.g. `API:class`) are used to exclude modules for a custom build.
 */

var api = {},
    $ = {};

/* API:attr */
var attr = require("./attr")["default"];
api.attr = attr;
/* API:attr */

/* API:class */
var addClass = require("./class").addClass;
var removeClass = require("./class").removeClass;
var toggleClass = require("./class").toggleClass;
var hasClass = require("./class").hasClass;
api.addClass = addClass;
api.removeClass = removeClass;
api.toggleClass = toggleClass;
api.hasClass = hasClass;
/* API:class */

/* API:dom */
var append = require("./dom").append;
var before = require("./dom").before;
var after = require("./dom").after;
api.append = append;
api.before = before;
api.after = after;
/* API:dom */

/* API:event */
var on = require("./event").on;
var off = require("./event").off;
var delegate = require("./event").delegate;
var undelegate = require("./event").undelegate;
var trigger = require("./event").trigger;
api.on = on;
api.off = off;
api.delegate = delegate;
api.undelegate = undelegate;
api.trigger = trigger;
/* API:event */

/* API:html */
var html = require("./html")["default"];
api.html = html;
/* API:html */

/* API:selector */
var $ = require("./selector").$;
var find = require("./selector").find;
api.find = find;
/* API:selector */

/* API:mode */
var isNative = require("./mode").isNative;
var native = require("./mode").native;
$.isNative = isNative;
$.native = native;
/* API:mode */

/* API:noconflict */
var noConflict = require("./noconflict")["default"];
$.noConflict = noConflict;
/* API:noconflict */

/*
 * The `apiNodeList` object represents the API that gets augmented onto
 * either the wrapped array or the native `NodeList` object.
 */

var apiNodeList = {};

['every', 'filter', 'forEach', 'map', 'reverse', 'some'].forEach(function(methodName) {
    apiNodeList[methodName] = Array.prototype[methodName];
});

/*
 * Augment the `$` function to be able to:
 *
 * - wrap the `$` objects and add the API methods
 * - switch to native mode
 */

$.getNodeMethods = function() {
    return api;
};

$.getNodeListMethods = function() {
    return apiNodeList;
};

$.apiMethods = function(api, apiNodeList) {

    var methods = apiNodeList,
        key;

    for(key in api) {
        methods[key] = api[key];
    }

    return methods;

}(api, apiNodeList);

// Export interface

exports["default"] = $;
},{"./attr":2,"./class":3,"./dom":4,"./event":5,"./html":6,"./mode":7,"./noconflict":8,"./selector":9}],2:[function(require,module,exports){
"use strict";
// # Attr

var each = require("./util").each;

/**
 * ## attr
 *
 *     $('.item').attr('attrName');
 *     $('.item').attr('attrName', 'attrValue');
 *     $('.item').attr({'attr1', 'value1'}, {'attr2', 'value2});
 */

var attr = function(key, value) {

    if(typeof key === 'string' && typeof value === 'undefined') {
        return (this.nodeType ? this : this[0]).getAttribute(key);
    }

    each(this, function(element) {
        if(typeof key === 'object') {
            for(var attr in key) {
                element.setAttribute(attr, key[attr]);
            }
        } else {
            element.setAttribute(key, value);
        }
    });

    return this;
};

// Export interface

exports["default"] = attr;
},{"./util":10}],3:[function(require,module,exports){
"use strict";
// # Class methods

var makeIterable = require("./util").makeIterable;
var each = require("./util").each;

/**
 * ## addClass
 *
 *     $('.item').addClass('bar');
 *
 * @param {string} value The class name to add to the element(s).
 * @return {$Object} or Node/List in native mode (`this`)
 */

var addClass = function(value) {
    each(this, function(element) {
        element.classList.add(value);
    });
    return this;
};

/**
 * ## removeClass
 *
 *     $('.items').removeClass('bar');
 *
 * @param {string} value The class name to remove from the element(s).
 * @return {$Object} or Node/List in native mode (`this`)
 */

var removeClass = function(value) {
    each(this, function(element) {
        element.classList.remove(value);
    });
    return this;
};

/**
 * ## toggleClass
 *
 *     $('.item').toggleClass('bar');
 *
 * @param {string} value The class name to toggle at the element(s).
 * @return {$Object} or Node/List in native mode (`this`)
 */

var toggleClass = function(value) {
    each(this, function(element) {
        element.classList.toggle(value);
    });
    return this;
};

/**
 * ## hasClass
 *
 *     $('.item').hasClass('bar');
 *
 * @param {string} value Check if the DOM element contains the class name. When applied to multiple elements,
 * returns `true` if _any_ of them contains the class name.
 * @return {boolean}
 */

var hasClass = function(value) {
    return makeIterable(this).some(function(element) {
        return element.classList.contains(value);
    });
};

// Export interface

exports.addClass = addClass;
exports.removeClass = removeClass;
exports.toggleClass = toggleClass;
exports.hasClass = hasClass;
},{"./util":10}],4:[function(require,module,exports){
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
 * @return {Node|NodeList|$Object} Returns the object it was applied to (`this`).
 */

var append = function(element) {
    if(this instanceof Node) {
        if(typeof element === 'string') {
            this.insertAdjacentHTML('beforeend', element);
        } else {
            if(element instanceof Node) {
                this.appendChild(element);
            } else {
                var elements = element instanceof NodeList ? toArray(element) : element;
                elements.forEach(this.appendChild.bind(this));
            }
        }
    } else {
        var l = this.length;
        while(l--) {
            var elm = l === 0 ? element : clone(element);
            append.call(this[l], elm);
        }
    }
    return this;
};

/**
 * ## before
 *
 *     $('.items').before('<p>prefix</p>');
 *
 * @param {String|Node|NodeList|$Object} element What to place as sibling(s) before to the element(s).
 * Clones elements as necessary.
 * @return {Node|NodeList|$Object} Returns the object it was applied to (`this`).
 */

var before = function(element) {
    if(this instanceof Node) {
        if(typeof element === 'string') {
            this.insertAdjacentHTML('beforebegin', element);
        } else {
            if(element instanceof Node) {
                this.parentNode.insertBefore(element, this);
            } else {
                var elements = element instanceof NodeList ? toArray(element) : element;
                elements.forEach(before.bind(this));
            }
        }
    } else {
        var l = this.length;
        while(l--) {
            var elm = l === 0 ? element : clone(element);
            before.call(this[l], elm);
        }
    }
    return this;
};

/**
 * ## after
 *
 *     $('.items').after('<span>suf</span><span>fix</span>');
 *
 * @param {String|Node|NodeList|$Object} element What to place as sibling(s) after to the element(s).
 * Clones elements as necessary.
 * @return {Node|NodeList|$Object} Returns the object it was applied to (`this`).
 */

var after = function(element) {
    if(this instanceof Node) {
        if(typeof element === 'string') {
            this.insertAdjacentHTML('afterend', element);
        } else {
            if(element instanceof Node) {
                this.parentNode.insertBefore(element, this.nextSibling);
            } else {
                var elements = element instanceof NodeList ? toArray(element) : element;
                elements.reverse().forEach(after.bind(this));
            }
        }
    } else {
        var l = this.length;
        while(l--) {
            var elm = l === 0 ? element : clone(element);
            after.call(this[l], elm);
        }
    }
    return this;
};

/**
 * @method clone
 * @private
 * @param {String|Node|NodeList|Array} element The element(s) to clone.
 * @return {String|Node|NodeList|Array} The cloned element(s)
 */

var clone = function(element) {
    if(typeof element === 'string') {
        return '' + element;
    } else if(element instanceof Node) {
        return element.cloneNode(true);
    } else if('length' in element) {
        return [].map.call(element, function(el) {
            return el.cloneNode(true);
        });
    }
    return element;
};

// Export interface

exports.append = append;
exports.before = before;
exports.after = after;
},{"./util":10}],5:[function(require,module,exports){
"use strict";
// # Events

var global = require("./util").global;
var each = require("./util").each;

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

    each(this, function(element) {

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

    each(this, function(element) {

        var handlers = getHandlers(element) || [];

        if(!eventName && !namespace && !selector && !handler) {

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
        if(!params.bubbles || isEventBubblingInDetachedTree || isAttachedToDocument(element)) {
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
    if(element === window || element === document) {
        return true;
    }
    var container = element.ownerDocument.documentElement;
    if(container.contains) {
        return container.contains(element);
    } else if(container.compareDocumentPosition) {
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

// Get the available `matches` or `matchesSelector` method.

var matchesSelector = (function(global) {
    var context = typeof Element !== 'undefined' ? Element.prototype : global;
    return context.matches || context.matchesSelector || context.mozMatchesSelector || context.webkitMatchesSelector || context.msMatchesSelector || context.oMatchesSelector;
})(this);

/**
 * Polyfill for CustomEvent, borrowed from [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent#Polyfill).
 * Needed to support IE (9, 10, 11)
 */

(function() {
    if(global.CustomEvent) {
        var CustomEvent = function(event, params) {
            params = params || { bubbles: false, cancelable: false, detail: undefined };
            var evt = document.createEvent('CustomEvent');
            evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
            return evt;
        };

        CustomEvent.prototype = global.CustomEvent.prototype;
        global.CustomEvent = CustomEvent;
    }
})();

// Are events bubbling in detached DOM trees?

var isEventBubblingInDetachedTree = (function(global) {
    var isBubbling = false,
        doc = global.document;
    if(doc) {
        var parent = doc.createElement('div'),
            child = parent.cloneNode();
        parent.appendChild(child);
        parent.addEventListener('e', function() {
            isBubbling = true;
        });
        child.dispatchEvent(new CustomEvent('e', {bubbles:true}));
    }
    return isBubbling;
})(this);

// Export interface

exports.on = on;
exports.off = off;
exports.delegate = delegate;
exports.undelegate = undelegate;
exports.trigger = trigger;
},{"./util":10}],6:[function(require,module,exports){
"use strict";
// # HTML

var each = require("./util").each;

/*
 * ## html
 *
 *     $('.item').html();
 *     $('.item').html('<span>more</span>');
 *
 * @param {String} [fragment] HTML fragment to set for the element
 * @return {Node|NodeList|$Object} Returns the object it was applied to (`this`).
 */

var html = function(fragment) {

    if(!fragment) {
        return (this.nodeType ? this : this[0]).innerHTML;
    }

    each(this, function(element) {
        element.innerHTML = fragment;
    });
    return this;

};

// Export interface

exports["default"] = html;
},{"./util":10}],7:[function(require,module,exports){
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

var isNative = false;

var native = function(native) {
    var wasNative = isNative;
    isNative = typeof native === 'boolean' ? native : true;
    if($) {
        $.isNative = isNative;
    }
    if(!wasNative && isNative) {
        augmentNativePrototypes(this.getNodeMethods(), this.getNodeListMethods());
    }
    if(wasNative && !isNative) {
        unaugmentNativePrototypes(this.getNodeMethods(), this.getNodeListMethods());
    }
    return isNative;
};

var NodeProto = typeof Node !== 'undefined' && Node.prototype,
    NodeListProto = typeof NodeList !== 'undefined' && NodeList.prototype;

/*
 * Add a property (i.e. method) to an object in a safe and reversible manner.
 * Only add the method if object not already had it (non-inherited).
 */

var augment = function(obj, key, value) {
    if(!obj.hasOwnProperty(key)) {
        Object.defineProperty(obj, key, {
            value: value,
            configurable: true,
            enumerable: false
        });
    }
};

/*
 * Remove property from object (only inherited properties will be removed).
 */

var unaugment = function(obj, key) {
    delete obj[key];
};

/*
 * Augment native `Node` and `NodeList` objects in native mode.
 */

var augmentNativePrototypes = function(methodsNode, methodsNodeList) {

    var key;

    for(key in methodsNode) {
        augment(NodeProto, key, methodsNode[key]);
        augment(NodeListProto, key, methodsNode[key]);
    }

    for(key in methodsNodeList) {
        augment(NodeListProto, key, methodsNodeList[key]);
    }
};

/*
 * Unaugment native `Node` and `NodeList` objects to switch back to default mode.
 * Mainly used for tests.
 */

var unaugmentNativePrototypes = function(methodsNode, methodsNodeList) {

    var key;

    for(key in methodsNode) {
        unaugment(NodeProto, key);
        unaugment(NodeListProto, key);
    }

    for(key in methodsNodeList) {
        unaugment(NodeListProto, key);
    }
};

// Export interface

exports.isNative = isNative;
exports.native = native;
},{}],8:[function(require,module,exports){
"use strict";
var global = require("./util").global;

/*
 * # noConflict
 *
 * In case another library sets the global `$` variable before jQuery Evergreen does,
 * this method can be used to return the global `$` to that other library.
 */

// Save the previous value of the global `$` variable, so that it can be restored later on.

var previousLib = global.$;

// Put jQuery Evergreen in noConflict mode, returning the `$` variable to its previous owner.
// Returns a reference to jQuery Evergreen.

var noConflict = function() {
    global.$ = previousLib;
    return this;
};

// Export interface

exports["default"] = noConflict;
},{"./util":10}],9:[function(require,module,exports){
"use strict";
/*
 * # Selector
 */

var makeIterable = require("./util").makeIterable;

var slice = [].slice,
    hasProto = !Object.prototype.isPrototypeOf({__proto__: null}),
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

var $ = function(selector, context) {

    var collection;

    if(!selector) {

        collection = document.querySelectorAll(null);

    } else if(typeof selector !== 'string') {

        collection = makeIterable(selector);

    } else if(reFragment.test(selector)) {

        collection = createFragment(selector);

    } else {

        context = context ? typeof context === 'string' ? document.querySelector(context) : context.length ? context[0] : context : document;

        collection = querySelector(selector, context);

    }

    return $.isNative ? collection : wrap(collection);

};

/*
 * ## Find
 *
 * Chaining for the `$` wrapper (aliasing `find` for `$`).
 *
 *     $('.selectors).find('.deep').$('.deepest');
 */

var find = function(selector) {
    return $(selector, this);
};

/*
 * Use the faster `getElementById` or `getElementsByClassName` over `querySelectorAll` if possible.
 *
 * @method querySelector
 * @private
 * @param {String} selector Query selector.
 * @param {Node} context The context for the selector to query elements.
 * @return {NodeList|Node}
 */

var querySelector = function(selector, context) {

    var isSimpleSelector = reSimpleSelector.test(selector);

    if(isSimpleSelector && !$.isNative) {
        if(selector[0] === '#') {
            return (context.getElementById ? context : document).getElementById(selector.slice(1));
        }
        if(selector[0] === '.') {
            return context.getElementsByClassName(selector.slice(1));
        }
        return context.getElementsByTagName(selector);
    }

    return context.querySelectorAll(selector);

};

/*
 * Create DOM fragment from an HTML string
 *
 * @method createFragment
 * @private
 * @param {String} html String representing HTML.
 * @return {NodeList}
 */

var createFragment = function(html) {

    if(reSingleTag.test(html)) {
        return document.createElement(RegExp.$1);
    }

    var elements = [],
        container = document.createElement('div'),
        children = container.childNodes;

    container.innerHTML = html;

    for(var i = 0, l = children.length; i < l; i++) {
        elements.push(children[i]);
    }

    return elements;
};

/*
 * Calling `$(selector)` returns a wrapped array of elements [by default](mode.html).
 *
 * @method wrap
 * @private
 * @param {NodeList|Node|Array} collection Element(s) to wrap as a `$Object`.
 * @return {$Object} Array with augmented API.
 */

var wrap = function(collection) {

    var wrapped = collection instanceof Array ? collection : collection.length !== undefined ? slice.call(collection) : [collection],
        methods = $.apiMethods;

    if (hasProto) {
        wrapped.__proto__ = methods;
    } else {
        for(var key in methods) {
            wrapped[key] = methods[key];
        }
    }

    return wrapped;
};

// Export interface

exports.$ = $;
exports.find = find;
},{"./util":10}],10:[function(require,module,exports){
"use strict";
/**
 * Reference to the global scope
 */

var global = Function("return this")();

/**
 * ## toArray
 *
 * Convert `NodeList` to `Array`.
 *
 * @param {NodeList|Array} collection
 * @return {Array}
 */

var toArray = function(collection) {
    return [].slice.call(collection);
};

/**
 * ## makeIterable
 *
 * Make sure to return something that can be iterated over (e.g. using `forEach`).
 * Arrays and NodeLists are returned as-is, but `Node`s are wrapped in a `[]`.
 *
 * @param {Node|NodeList|Array} element
 * @return {Array|NodeList}
 */

var makeIterable = function(element) {
    return element.length === undefined || element === window ? [element] : element;
};

/**
 * ## each
 *
 * Faster alternative to [].forEach method
 *
 * @param {Node|NodeList|Array} collection
 * @param {Function} callback
 * @returns {Node|NodeList|Array}
 */

var each = function(collection, callback) {
    var length = collection.length;
    if(length !== undefined) {
        for(var i = 0; i < length; i++){
            callback(collection[i]);
        }
    } else {
        callback(collection);
    }
    return collection;
};

exports.global = global;
exports.toArray = toArray;
exports.makeIterable = makeIterable;
exports.each = each;
},{}],"jQueryEvergreen":[function(require,module,exports){
module.exports=require('iOJE2k');
},{}],"iOJE2k":[function(require,module,exports){
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
},{"./je/api":1}]},{},["iOJE2k"]);window.$=require('jQueryEvergreen')['default'];
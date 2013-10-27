// jQuery Evergreen
// ----------------
//
// jQuery Evergreen works with modern browsers.
// It has the same familiar API as jQuery, and is lean & mean with just the selector, DOM and event methods.
//
// It's under 7KB after minification (<2KB gzipped).
//
// Much of the original jQuery's "weight" is not included at all, such as `$.ajax`, `$.animate`, and `$.Deferred`.
//
// Browser support: latest version of Chrome, Firefox, Safari, Opera, Chrome Mobile iOS, and Mobile Safari. IE10 and IE11.
// IE9 only needs a polyfill for `classList` to make all tests pass.
//
// You can opt-in to work with live Node and NodeList objects (instead of the Array-like `$` objects).
// In this mode, the native `Node` and `NodeList` prototypes are augmented to fill up the chainable API,
// like `forEach`, `addClass`, `append`, `on`.

(function(root, factory) {
    if(typeof define === 'function' && define.amd) {
        define(factory);
    } else {
        root.$ = factory();
    }
}(this, function() {

    var isSafe = true;

    var array = [],
        slice = array.slice,
        map = array.map;


    // Query selector
    // --------------

    // `$` is basically a wrapper for `querySelectorAll`.

    var $ = function(selector, context) {

        var list;

        if(!selector) {

            list = document.querySelectorAll(null);

        } else if(typeof selector !== 'string') {

            // If `selector` doesn't look like a string, return (maybe a DOM element?)

            list = selector.length ? selector : [selector];

        } else if(/^\s*<(\w+|!)[^>]*>/.test(selector)) {

            // If `selector` looks like an HTML string, create and return a DOM fragment.

            list = createFragment(selector);

        } else {

            // The `context` to query elements (default: `document`).
            // It can be either a string or a Node (or a NodeList, the first Node will be used).

            context = context ? typeof context === 'string' ? document.querySelector(context) : context.length ? context[0] : context : document;

            list = context.querySelectorAll(selector);

        }

        // For least surprises, always return an array (or `NodeList` if `isSafe = false`).

        return isSafe ? wrap(list) : list;

    };

    // Chaining for the `$` wrapper (aliasing `find` for `$`)
    //
    //     $('.selectors).$('.deep').find('.deepest');

    var find = function(selector) {
        return $(selector, this);
    };

    // Create DOM fragment from an HTML string

    var createFragment = function(html) {

        var fragment = document.createDocumentFragment(),
            container = document.createElement('div');

        container.innerHTML = html.trim();

        while(container.firstChild) {
            fragment.appendChild(container.firstChild);
        }

        // For least surprises, always return a `NodeList`.

        return fragment.childNodes;
    };

    // Convert `NodeList` to `Array`.

    var toArray = function(list) {
        return slice.call(list);
    };

    // Class methods
    // -------------

    // Chainable API for native `classList`.
    //
    //     $('.myElement').addClass('myClass');

    var addClass = function(value) {
        (this.length ? this : [this]).forEach(function(element) {
            element.classList.add(value);
        });
        return this;
    };

    var removeClass = function(value) {
        (this.length ? this : [this]).forEach(function(element) {
            element.classList.remove(value);
        });
        return this;
    };

    var toggleClass = function(value) {
        (this.length ? this : [this]).forEach(function(element) {
            element.classList.toggle(value);
        });
        return this;
    };

    var hasClass = function(value) {
        return (this.length ? this : [this]).some(function(element) {
            return element.classList.contains(value);
        });
    };

    // DOM Manipulation
    // ----------------
    //
    //     $('.myElement').append('<span>more</span>');
    //     $('.myList').append('<span>more</span>');

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

    //     $('.myElement').before(element);

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

    //     $('.myList').after(elements);

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

    var clone = function(element) {
        if(typeof element === 'string') {
            return '' + element;
        } else if(element instanceof Node) {
            return element.cloneNode(true);
        } else if(element.length) {
            return map.call(element, function(el) {
                return el.cloneNode(true);
            });
        }
        return element;
    };

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
            event.currentTarget = this;
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

    // Polyfills
    // ---------

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

    // Safe Mode
    // ---------

    // Calling `$(selector)` returns a wrapped array of elements in **safe mode** (default).

    var wrap = function(list) {
        var wrapped = list instanceof NodeList ? slice.call(list) : list instanceof Array ? list : [list];
        for(var key in proto) {
            wrapped[key] = proto[key];
        }
        return wrapped;
    };

    // In **non-safe mode** a native, augmented NodeList is returned. Use `$.safeMode(false)` to activate this behavior.
    // The API is the same in both modes.

    $.safeMode = function(safe) {
        var wasSafe = isSafe;
        if(typeof safe === 'boolean') {
            isSafe = safe;
        }
        if(wasSafe && !isSafe) {
            augmentNatives();
        }
        if(!wasSafe && isSafe) {
            unaugmentNatives();
        }
        return isSafe;
    };

    // The `proto` object represents the API that gets augmented onto either the wrapped array (safe mode),
    // or the native `Node` and `Nodelist` objects (non-safe mode).

    var proto = {
        $: find,
        find: find,
        addClass: addClass,
        removeClass: removeClass,
        toggleClass: toggleClass,
        hasClass: hasClass,
        append: append,
        before: before,
        after: after,
        on: on,
        off: off,
        delegate: delegate,
        undelegate: undelegate,
        trigger: trigger
    };

    // The `protoList` object represents the API that gets augmented onto the native `Nodelist` object.
    // The wrapped array (native `Array`) already has these (and more).

    var protoList = {
        toArray: toArray,
        every: array.every,
        filter: array.filter,
        forEach: array.forEach,
        each: array.forEach,
        some: array.some,
        map: array.map
    };

    var NodeProto = Node.prototype,
        NodeListProto = NodeList.prototype,
        NodeProtoOriginals = {},
        NodeListProtoOriginals = {};

    // Augment native `Node` and `NodeList` objects for non-safe mode.

    var augmentNatives = function() {

        var key;

        for(key in proto) {
            NodeProtoOriginals[key] = NodeProto[key];
            NodeListProtoOriginals[key] = NodeListProto[key];
            NodeProto[key] = proto[key];
            NodeListProto[key] = proto[key];
        }

        for(key in protoList) {
            NodeListProtoOriginals[key] = NodeListProto[key];
            NodeListProto[key] = protoList[key];
        }
    };

    // Unaugment native `Node` and `NodeList` objects to switch back to safe mode.
    // Mainly used for tests.

    var unaugmentNatives = function() {

        var key;

        for(key in proto) {
            NodeProto[key] = NodeProtoOriginals[key];
            NodeListProto[key] = NodeListProtoOriginals[key];
        }

        for(key in protoList) {
            NodeListProto[key] = NodeListProtoOriginals[key];
        }
    };

    // Export the API

    return $;

}));

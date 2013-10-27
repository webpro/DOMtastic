// jQuery Evergreen
// ----------------
//
// jQuery Evergreen works with modern browsers.
// It has the same familiar API as jQuery, but under the hood has the major difference that it
// works with live Node and NodeList objects (instead of the Array-like `$` objects).
//
// The native `Node` and `NodeList` prototypes are augmented to fill up the chainable API, like `forEach`, `addClass`, `append`, `on`.
// Methods already on the `Node` or `NodeList` prototype are not overridden (i.e. use native method if available).
// Much of the original jQuery's "weight" is not included at all, such as `$.ajax`, `$.animate`, and `$.Deferred`.
//
// It's under 5KB after minification (<1.5KB gzipped).
//
// Browser support: latest version of Chrome, Firefox, Safari, Opera, Chrome Mobile iOS, and Mobile Safari. IE10 and IE11.
// IE9 only needs a polyfill for `classList` to make all tests pass.

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

    ['add', 'remove', 'toggle'].forEach(function(fn) {

        NodeProto[fn + 'Class'] = NodeProto[fn + 'Class'] || function(value) {
            this.classList[fn](value);
            return this;
        };

        NodeListProto[fn + 'Class'] = NodeListProto[fn + 'Class'] || function(value) {
            this.forEach(function(element) {
                element.classList[fn](value);
            });
            return this;
        };
    });

    // And hasClass.
    //
    //     $('.myElement').hasClass('myClass');

    NodeProto.hasClass = NodeProto.hasClass || function(value) {
        return this.classList.contains(value);
    };

    NodeListProto.hasClass = NodeListProto.hasClass || function(value) {
        return this.some(function(element) {
            return element.classList.contains(value);
        });
    };

    // DOM Manipulation
    // ----------------
    //
    //     $('.myElement').append('<span>more</span>');
    //     $('.myList').append('<span>more</span>');

    NodeProto.append = NodeProto.append || function(element) {
        if(typeof element === 'string') {
            this.insertAdjacentHTML('beforeend', element);
        } else {
            if(element.length) {
                var elements = element instanceof NodeList ? element.toArray() : element;
                elements.forEach(this.appendChild.bind(this));
            } else {
                this.appendChild(element);
            }
        }
        return this;
    };

    //     $('.myElement').before(element);

    NodeProto.before = NodeProto.before || function(element) {
        if(typeof element === 'string') {
            this.insertAdjacentHTML('beforebegin', element);
        } else {
            if(element.length) {
                var elements = element instanceof NodeList ? element.toArray() : element;
                elements.forEach(this.before.bind(this));
            } else {
                this.parentNode.insertBefore(element, this);
            }
        }
        return this;
    };

    //     $('.myList').after(elements);

    NodeProto.after = NodeProto.after || function(element) {
        if(typeof element === 'string') {
            this.insertAdjacentHTML('afterend', element);
        } else {
            if(element.length) {
                var elements = element instanceof NodeList ? element.toArray() : element;
                elements.reverse().forEach(this.after.bind(this));
            } else {
                this.parentNode.insertBefore(element, this.nextSibling);
            }
        }
        return this;
    };

    // Also extend `NodeList` with `append`, `before` and `after`.
    // The method clones provided elements (except for last iteration).

    ['append', 'before', 'after'].forEach(function(fn) {
        NodeListProto[fn] = NodeListProto[fn] || function(originalElement) {
            var lastIndex = this.length - 1;
            this.toArray().forEach(function(el, index) {
                var element = index === lastIndex ? originalElement : clone(originalElement);
                el[fn](element);
            });
            return this;
        };
    });

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

    NodeProto.on = NodeProto.on || function(eventName, fn, useCapture) {

        if(typeof fn === 'string' && typeof useCapture === 'function') {
            return this.delegate.apply(this, arguments);
        }

        this.addEventListener(eventName, fn, useCapture || false);
        return this;
    };

    // Chainable shorthand for `removeEventListener`.
    // Delegates to `undelegate` if that signature is used.
    //
    //     element.off('click', callback);

    NodeProto.off = NodeProto.off || function(eventName, fn, useCapture) {

        if(typeof fn === 'string' && typeof useCapture === 'function') {
            return this.undelegate.apply(this, arguments);
        }

        this.removeEventListener(eventName, fn, useCapture || false);
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

    NodeProto.delegate = NodeProto.delegate || function(selector, eventName, fn) {
        var handler = createEventHandler.apply(this, arguments);
        this.on(eventName, handler);
        return this;
    };

    NodeProto.undelegate = NodeProto.undelegate || function(selector, eventName, fn) {
        var id = getEventId.apply(this, arguments);
        this._handlers[id].forEach(function(handler) {
            this.off(eventName, handler);
        }.bind(this));
        this._handlers[id] = null;
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

    NodeProto.trigger = NodeProto.trigger || function(type, options) {

        options = options || {};
        if(options.bubbles === undefined) options.bubbles = true;
        if(options.cancelable === undefined) options.cancelable = true;

        var event = new CustomEvent(type, options);
        this.dispatchEvent(event);

        return this;
    };

    // Event methods for NodeList (apply method on each Node)

    ['on', 'off', 'delegate', 'undelegate', 'trigger'].forEach(function(fnName) {
        NodeListProto[fnName] = NodeListProto[fnName] || function() {
            var args = arguments;
            this.forEach(function(element) {
                element[fnName].apply(element, args);
            });
            return this;
        };
    });

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

    // Calling `$(selector)` returns a wrapped array of elements in safe mode (default),
    // and a native, augmented NodeList in non-safe mode (`$.safeMode(false)`).

    var wrap = function(list) {
        var wrapped = list instanceof NodeList ? slice.call(list) : list instanceof Array ? list : [list];
        for(var key in proto) {
            wrapped[key] = proto[key];
        }
        return wrapped;
    };

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
            NodeProto[key] =  proto[key];
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
            NodeProto[key] =  NodeProtoOriginals[key];
            NodeListProto[key] = NodeListProtoOriginals[key];
        }

        for(key in protoList) {
            NodeListProto[key] = NodeListProtoOriginals[key];
        }
    };


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

    return $;

}));

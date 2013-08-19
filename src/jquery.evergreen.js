// jQuery Evergreen
// ----------------
//
// jQuery Evergreen works with modern browsers.
// It has the same familiar API as jQuery 1.x and 2.x, but under the hood has the major difference that it
// works with live Node and NodeList objects (instead of the Array-like `$` objects).
//
// The native `Node` and `NodeList` objects are extended to fill up the chainable API, like `forEach`, `addClass`, `append`, `on`.
// Much of the original jQuery's "weight" is not included at all, such as `$.ajax`, `$.animate`, and `$.Deferred`.

(function(global) {

    // Query selector
    // --------------

    // `$` is basically a wrapper for `querySelectorAll`.

    var $ = function(selector, context) {

        if(!selector) {
            return document.querySelectorAll(null);
        }

        // If `selector` doesn't look like a string, return (maybe a DOM element?)

        if(typeof selector !== 'string') {
            return selector;
        }

        // If `selector` looks like an HTML string, create and return a DOM fragment.

        if(/^\s*<(\w+|!)[^>]*>/.test(selector)) {
            return createFragment(selector);
        }

        // The `context` to query elements (default: `document`).
        // It can be either a string or a Node (or a NodeList, the first Node will be used).

        context = context ? typeof context === 'string' ? document.querySelector(context) : context.length ? context[0] : context : document;

        // For least surprises, always return a `NodeList`.

        return context.querySelectorAll(selector);

    };

    // Chaining for the `$` wrapper (aliasing `find` for `$`)
    //
    //     $('.selectors).$('.deep').find('.deepest');

    Node.prototype.$ = Node.prototype.find = function(selector) {
        return $(selector, this);
    };

    NodeList.prototype.$ = NodeList.prototype.find = function(selector) {
        return $(selector, this[0]);
    };

    // Create DOM fragment from an HTML string

    var createFragment = function(html) {

        var fragment = document.createDocumentFragment(),
            container = document.createElement('div');

        container.innerHTML = html.trim();

        while(container.firstChild) {
            fragment.appendChild(container.firstChild);
        }

        // Return a single element if possible

        return fragment.childNodes.length === 1 ? fragment.firstChild : fragment.childNodes;
    };

    // Array methods
    // -------------

    // Augment with every, filter, forEach, some, map

    ['every', 'filter', 'forEach', 'some', 'map'].forEach(function(fn) {
        NodeList.prototype[fn] = [][fn];
    });

    //  Aliasing `each` for `forEach`.

    NodeList.prototype['each'] = []['forEach'];

    // Convert `NodeList` to `Array`.

    NodeList.prototype.toArray = function() {
        return Array.prototype.slice.call(this);
    };

    // Class methods
    // -------------

    // Chainable API for native `classList`.
    //
    //     $('.myElement').addClass('myClass');

    ['add', 'remove', 'toggle'].forEach(function(fn) {

        Node.prototype[fn + 'Class'] = function(value) {
            this.classList[fn](value)
            return this;
        };

        NodeList.prototype[fn + 'Class'] = function(value) {
            this.forEach(function(element) {
                element.classList[fn](value)
            });
            return this;
        };
    });

    // And hasClass.
    //
    //     $('.myElement').hasClass('myClass');

    Node.prototype.hasClass = Node.prototype.contains;

    NodeList.prototype.hasClass = NodeList.prototype.contains = function(value) {
        return this.some(function(element) {
            return element.classList.contains(value)
        }, false);
    };

    // DOM Manipulation
    // ----------------
    //
    //     $('.myElement').append('<span>more</span>');

    Node.prototype.append = function(element) {

        element = typeof element !== 'string' ? element : $(element);

        if(element instanceof NodeList) {
            element.forEach(this.appendChild.bind(this));
        } else {
            this.appendChild(element);
        }

        return this;
    };

    Node.prototype.before = function(element) {
        element = typeof element !== 'string' ? element : $(element);
        this.parentNode.insertBefore(element, this);
        return this;
    };

    Node.prototype.after = function(element) {
        element = typeof element !== 'string' ? element : $(element);
        this.parentNode.insertBefore(element, this.nextSibling);
        return this;
    };

    // Also extend `NodeList` with `append`, `before` and `after`.
    // The method is only applied to the first element in NodeList.

    ['append', 'before', 'after'].forEach(function(fn) {
        NodeList.prototype[fn] = function(element) {
            this[0][fn](element);
            return this;
        };
    });

    // Events
    // ------
    //
    // Chainable shorthand for `addEventListener`.
    // Delegates to `delegate` if that signature is used.
    //
    //     element.on('click', callback);
    //     element.trigger('click');

    Node.prototype.on = function(eventName, fn, useCapture) {

        if(typeof fn === 'string' && typeof useCapture === 'function') {
            return this.delegate.apply(this, arguments)
        }

        this.addEventListener(eventName, fn, useCapture || false);
        return this;
    };

    Node.prototype.off = function(eventName, fn, useCapture) {
        this.removeEventListener(eventName, fn, useCapture || false);
        return this;
    };

    NodeList.prototype.on = function() {
        var args = arguments;
        this.forEach(function(element) {
            element.on.apply(element, args);
        });
        return this;
    };

    NodeList.prototype.off = function() {
        var args = arguments;
        this.forEach(function(element) {
            element.off.apply(element, args);
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

    Node.prototype.delegate = function(selector, eventName, fn) {
        var handler = createEventHandler.apply(this, arguments);
        this.on(eventName, handler);
        return this;
    };

    Node.prototype.undelegate = function(selector, eventName, fn) {
        var handlers = getEventHandlers.apply(this, arguments);
        handlers.forEach(function(handler) {
            this.off(eventName, handler);
        }.bind(this));
        return this;
    };

    NodeList.prototype.delegate = function() {
        var args = arguments;
        this.forEach(function(element) {
            element.delegate.apply(element, args);
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

    var getEventHandlers = function(selector, eventName, fn) {
        var id = getEventId.apply(this, arguments);
        return this._handlers[id];
    };

    var eventHandlerId = 0;

    var getEventId = function(selector, eventName, fn) {
        return selector + eventName + (fn._handlerId = fn._handlerId || ++eventHandlerId);
    };

    // Internal function to check whether delegated events match the provided `selector`; set `event.currentTarget`;
    // and actually call the provided event handler.

    var delegateHandler = function(selector, fn, event) {
        var matchesSelector = this.matchesSelector || this.mozMatchesSelector || this.webkitMatchesSelector || this.oMatchesSelector;
        if(matchesSelector.call(event.target, selector)) {
            event.currentTarget = this;
            fn.call(event.target, event);
        }
    };

    // Trigger uses `CustomEvent`.
    //
    //     element.trigger('anyEventName');

    Node.prototype.trigger = function(type, options) {

        options = options || {};
        if(options.bubbles === undefined) options.bubbles = true;
        if(options.cancelable === undefined) options.cancelable = true;

        var event = new CustomEvent(type, options);
        this.dispatchEvent(event);

        return this;
    };

    NodeList.prototype.trigger = function() {
        var args = arguments;
        this.forEach(function(element) {
            element.trigger.apply(element, args);
        });
        return this;
    };

    // Expose `$` to global scope

    global.$ = $;

})(this);

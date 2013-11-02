define("api", 
  ["class","dom","event","selector","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __exports__) {
    "use strict";
    var api = {};

    /* API:class */
    var addClass = __dependency1__.addClass;
    var removeClass = __dependency1__.removeClass;
    var toggleClass = __dependency1__.toggleClass;
    var hasClass = __dependency1__.hasClass;
    api.addClass = addClass;
    api.removeClass = removeClass;
    api.toggleClass = toggleClass;
    api.hasClass = hasClass;
    /* API:class */

    /* API:dom */
    var append = __dependency2__.append;
    var before = __dependency2__.before;
    var after = __dependency2__.after;
    api.append = append;
    api.before = before;
    api.after = after;
    /* API:dom */

    /* API:event */
    var on = __dependency3__.on;
    var off = __dependency3__.off;
    var delegate = __dependency3__.delegate;
    var undelegate = __dependency3__.undelegate;
    var trigger = __dependency3__.trigger;
    api.on = on;
    api.off = off;
    api.delegate = delegate;
    api.undelegate = undelegate;
    api.trigger = trigger;
    /* API:event */

    /* API:selector */
    var $ = __dependency4__.$;
    var find = __dependency4__.find;
    api.$ = $;
    api.find = find;
    $._api = api;
    /* API:selector */

    __exports__.api = api;
  });
define("class", 
  ["exports"],
  function(__exports__) {
    "use strict";
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

    __exports__.addClass = addClass;
    __exports__.removeClass = removeClass;
    __exports__.toggleClass = toggleClass;
    __exports__.hasClass = hasClass;
  });
define("dom", 
  ["exports"],
  function(__exports__) {
    "use strict";
    // DOM Manipulation
    // ----------------

    // Convert `NodeList` to `Array`.

    var toArray = function(list) {
        return [].slice.call(list);
    };

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
            return [].map.call(element, function(el) {
                return el.cloneNode(true);
            });
        }
        return element;
    };

    __exports__.append = append;
    __exports__.before = before;
    __exports__.after = after;
  });
define("event", 
  ["exports"],
  function(__exports__) {
    "use strict";
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

    __exports__.on = on;
    __exports__.off = off;
    __exports__.delegate = delegate;
    __exports__.undelegate = undelegate;
    __exports__.trigger = trigger;
  });
define("main", 
  ["api","mode","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";
    // jQuery Evergreen
    // ----------------
    //
    // jQuery Evergreen works with modern browsers.
    // It has the same familiar API as jQuery, and is lean & mean with just the [selector](selector.html), [class](class.html), [DOM](dom.html) and [event](event.html) modules.
    //
    // The complete version is under 6KB after minification (<2KB gzipped).
    //
    // Much of the original jQuery's "weight" is not included at all, such as `$.ajax`, `$.animate`, and `$.Deferred`.
    //
    // Browser support: latest version of Chrome, Firefox, Safari, Opera, Chrome Mobile iOS, and Mobile Safari. IE10 and IE11.
    // IE9 only needs a polyfill for `classList` to make all tests pass.
    //
    // You can opt-in to work with [live Node and NodeList](mode.html) objects.
    //
    // You can easily create **custom builds** to exclude parts you don't need:
    //
    //     $ grunt --exclude=class,dom,event,selector
    //
    // Using **AMD**, just include it as a regular dependency:
    //
    //     define(['jquery-evergreen'], function($) {
    //
    //     });
    //
    // The sources are written in the **ES6** Modules format,
    // and transpiled to an AMD version, and a "browser global" version
    // using the [ES6 Module Transpiler](http://square.github.io/es6-module-transpiler/).

    var api = __dependency1__.api;

    __exports__["default"] = api.$;
  });
define("mode", 
  ["api","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var api = __dependency1__.api;

    // Safe vs. Native Mode
    // -------------------

    // The default "safe" mode is similar to how jQuery works (returning an array-like object).

    // However, you can opt-in to work with live Node and NodeList objects (instead of the Array-like `$` objects).
    // In this "native" mode, the `Node` and `NodeList` prototypes are augmented to fill up the chainable API,
    // like `forEach`, `addClass`, `append`, `on`.

    // In this mode, an augmented NodeList is returned when using `$(selector)`.
    // Use `$.safeMode(false)` to activate this behavior.
    // The API is the same in both modes.

    var isSafe = true;

    var safeMode = function(safe) {
        var wasSafe = isSafe;
        if(typeof safe === 'boolean') {
            isSafe = safe;
            if($) $.isSafe = isSafe;
        }
        if(wasSafe && !isSafe) {
            augmentNatives();
        }
        if(!wasSafe && isSafe) {
            unaugmentNatives();
        }
        return isSafe;
    };

    var array = [];

    // The `apiNodeList` object represents the API that gets augmented onto the native `Nodelist` object.
    // The wrapped array (native `Array`) already has these (and more).

    var apiNodeList = {
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

    // Augment native `Node` and `NodeList` objects in native mode.

    var augmentNatives = function() {

        var key;

        for(key in api) {
            NodeProtoOriginals[key] = NodeProto[key];
            NodeListProtoOriginals[key] = NodeListProto[key];
            NodeProto[key] = api[key];
            NodeListProto[key] = api[key];
        }

        for(key in apiNodeList) {
            NodeListProtoOriginals[key] = NodeListProto[key];
            NodeListProto[key] = apiNodeList[key];
        }
    };

    // Unaugment native `Node` and `NodeList` objects to switch back to safe mode.
    // Mainly used for tests.

    var unaugmentNatives = function() {

        var key;

        for(key in api) {
            NodeProto[key] = NodeProtoOriginals[key];
            NodeListProto[key] = NodeListProtoOriginals[key];
        }

        for(key in apiNodeList) {
            NodeListProto[key] = NodeListProtoOriginals[key];
        }
    };

    var $ = api.$;

    // It's possible to have a custom build without the [selector](selector.html) API,
    // but in that case only the native mode makes sense.

    if(typeof $ === 'undefined') {
        safeMode(false);
    } else {
        $.isSafe = isSafe;
        $.safeMode = safeMode;
    }

    __exports__.isSafe = isSafe;
    __exports__.safeMode = safeMode;
  });
define("selector", 
  ["exports"],
  function(__exports__) {
    "use strict";
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

        return $.isSafe ? wrap(list) : list;

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

    // Calling `$(selector)` returns a wrapped array of elements in [safe mode](mode.html) (default).

    var wrap = function(list) {
        var wrapped = list instanceof NodeList ? [].slice.call(list) : list instanceof Array ? list : [list];
        for(var key in $._api) {
            wrapped[key] = $._api[key];
        }
        return wrapped;
    };

    __exports__.$ = $;
    __exports__.find = find;
  });define("jquery-evergreen", ["main"], function(main) { return main["default"];});
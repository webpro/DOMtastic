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

export { $, find };

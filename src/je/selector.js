/*
 * # Selector
 */

import { makeIterable } from './util';

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

        collection = makeIterable(selector)

    } else if(reFragment.test(selector)) {

        collection = createFragment(selector);

    } else {

        context = context ? typeof context === 'string' ? document.querySelector(context) : context.length ? context[0] : context : document;

        collection = context.querySelectorAll(selector);

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

    var fragment = document.createDocumentFragment(),
        container = document.createElement('div');

    container.innerHTML = html.trim();

    while(container.firstChild) {
        fragment.appendChild(container.firstChild);
    }

    return fragment.childNodes;
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

    var wrapped = typeof collection.length !== 'undefined' ? slice.call(collection) : [collection],
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

export { $, find };

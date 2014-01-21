// # Class methods

import { makeIterable, each } from './util';

/**
 * ## addClass
 *
 *     $('.item').addClass('bar');
 *
 * @param {String} value The class name to add to the element(s).
 * @return {$Object} or Node/List in native mode
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
 * @param {String} value The class name to remove from the element(s).
 * @return {$Object} or Node/List in native mode
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
 * @param {String} value The class name to toggle at the element(s).
 * @return {$Object} or Node/List in native mode
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
 * @param {String} value Check if the DOM element contains the class name. When applied to multiple elements,
 * returns `true` if _any_ of them contains the class name.
 * @return {boolean}
 */

var hasClass = function(value) {
    return makeIterable(this).some(function(element) {
        return element.classList.contains(value);
    });
};

// Export interface

export { addClass, removeClass, toggleClass, hasClass };

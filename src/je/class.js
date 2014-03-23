/**
 * @module Class
 */

import { makeIterable, each } from './util';

/**
 * Add a class to the element(s)
 *
 * @param {String} value The class name to add to the element(s).
 * @return {Object} The wrapped collection
 * @chainable
 * @example
 *     $('.item').addClass('bar');
 */

function addClass(value) {
    each(this, function(element) {
        element.classList.add(value);
    });
    return this;
}

/**
 * Remove a class from the element(s)
 *
 * @param {String} value The class name to remove from the element(s).
 * @return {Object} The wrapped collection
 * @chainable
 * @example
 *     $('.items').removeClass('bar');
 */

function removeClass(value) {
    each(this, function(element) {
        element.classList.remove(value);
    });
    return this;
}

/**
 * Toggle a class at the element(s)
 *
 * @param {String} value The class name to toggle at the element(s).
 * @return {Object} The wrapped collection
 * @chainable
 * @example
 *     $('.item').toggleClass('bar');
 */

function toggleClass(value) {
    each(this, function(element) {
        element.classList.toggle(value);
    });
    return this;
}

/**
 * Check if the element(s) have a class.
 *
 * @param {String} value Check if the DOM element contains the class name. When applied to multiple elements,
 * returns `true` if _any_ of them contains the class name.
 * @return {Boolean} Whether the element's class attribute contains the class name.
 * @example
 *     $('.item').hasClass('bar');
 */

function hasClass(value) {
    return makeIterable(this).some(function(element) {
        return element.classList.contains(value);
    });
}

/*
 * Export interface
 */

export { addClass, removeClass, toggleClass, hasClass };

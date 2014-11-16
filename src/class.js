/**
 * @module Class
 */

import { makeIterable, each } from './util';

/**
 * Add a class to the element(s)
 *
 * @param {String} value Space-separated class name(s) to add to the element(s).
 * @return {Object} The wrapped collection
 * @chainable
 * @example
 *     $('.item').addClass('bar');
 *     $('.item').addClass('bar foo');
 */

function addClass(value) {
    if(value && value.length) {
        each(value.split(' '), function(className) {
            each(this, function(element) {
                element.classList.add(className);
            });
        }.bind(this));
    }
    return this;
}

/**
 * Remove a class from the element(s)
 *
 * @param {String} value Space-separated class name(s) to remove from the element(s).
 * @return {Object} The wrapped collection
 * @chainable
 * @example
 *     $('.items').removeClass('bar');
 *     $('.items').removeClass('bar foo');
 */

function removeClass(value) {
    if(value && value.length) {
        each(value.split(' '), function(className) {
            each(this, function(element) {
                element.classList.remove(className);
            });
        }.bind(this));
    }
    return this;
}

/**
 * Toggle a class at the element(s)
 *
 * @param {String} value Space-separated class name(s) to toggle at the element(s).
 * @return {Object} The wrapped collection
 * @chainable
 * @example
 *     $('.item').toggleClass('bar');
 *     $('.item').toggleClass('bar foo');
 */

function toggleClass(value) {
    if(value && value.length) {
        each(value.split(' '), function(className) {
            each(this, function(element) {
                element.classList.toggle(className);
            });
        }.bind(this));
    }
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
    return (this.nodeType ? [this] : this).some(function(element) {
        return element.classList.contains(value);
    });
}

/*
 * Export interface
 */

export { addClass, removeClass, toggleClass, hasClass };

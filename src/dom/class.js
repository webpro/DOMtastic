/**
 * @module Class
 */

import { each } from '../util';

var _addClass, _removeClass, _toggleClass, _hasClass;

if ('classList' in document.documentElement) {
    _hasClass = function(element, className) {
        return element.classList.contains(className);
    };
    _addClass = function(element, className) {
        element.classList.add(className);
    };
    _removeClass = function(element, className) {
        element.classList.remove(className);
    };
    _toggleClass = function(element, className) {
        element.classList.toggle(className);
    };
} else {
    _hasClass = function(element, className) {
        return new RegExp('(^|\\s)' + className + '(\\s|$)').test(element.className);
    };
    _addClass = function(element, className) {
        if (!_hasClass(element, className)) {
            element.className += (element.className ? ' ' : '') + className;
        }
    };
    _removeClass = function(element, className) {
        if (_hasClass(element, className)) {
            element.className = element.className.replace(new RegExp('(^|\\s)*' + className + '(\\s|$)*', 'g'), '');
        }
    };
    _toggleClass = function(element, className) {
        (_hasClass(element, className) ? _removeClass : _addClass)(element, className);
    };
}

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
        each(value.split(' '), _each.bind(this, _addClass));
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
        each(value.split(' '), _each.bind(this, _removeClass));
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
        each(value.split(' '), _each.bind(this, _toggleClass));
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
        return _hasClass(element, value);
    });
}

/**
 * Specialized iteration, applying `fn` of the classList API to each element.
 *
 * @param {String} fnName
 * @param {String} className
 * @private
 */

function _each(fn, className) {
    each(this, function(element) {
        fn(element, className);
    });
}

/*
 * Export interface
 */

export { addClass, removeClass, toggleClass, hasClass };

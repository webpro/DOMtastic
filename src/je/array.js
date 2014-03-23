/**
 * @module Array
 */

import { each as _each } from './util';
import { $, matches } from './selector';

var ArrayProto = Array.prototype;

/**
 * Filter the collection by selector or function.
 *
 * @method filter
 * @param {String|Function} selector Selector or function to filter the collection.
 * @return The wrapped object (or Node/List in native mode).
 * @chainable
 * @example
 *     $('.items').filter('.active');
 * @example
 *     $('.items').filter(function(element) {
 *         return element.hasAttribute('active')
 *     });
 */

function filter(selector) {
    var callback = typeof selector === 'function' ? selector : function(element) {
        return matches(element, selector);
    };
    return $(ArrayProto.filter.call(this, callback));
}

/**
 * Execute a function for each element in the collection.
 *
 * @method each
 * @param {Function} callback Function to execute for each element, invoked with `element` as argument.
 * @return The wrapped object (or Node/List in native mode).
 * @chainable
 * @example
 *     $('.items').each(function(element) {
 *         element.style.color = 'evergreen';
 *     );
 */

function each(callback) {
    return _each(this, callback);
}

var forEach = each;

/**
 * Create a new collection by executing the callback for each element in the collection.
 *
 * @method map
 * @param {Function} callback Function to execute for each element, invoked with `element` as argument.
 * @return {Array} Collection with the return value of the executed callback for each element.
 * @example
 *     $('.items').map(function(element) {
 *         return element.getAttribute('name')
 *     });
 *     ➤ ['ever', 'green']
 */

var map = ArrayProto.map;

/**
 * Reverses an array in place. The first array element becomes the last and the last becomes the first.
 *
 * @method reverse
 * @return The wrapped object (or Node/List in native mode).
 * @chainable
 * @example
 *     $('.items').reverse();
 */

function reverse() {
    var elements = ArrayProto.slice.call(this);
    return $(ArrayProto.reverse.call(elements));
}

/**
 * Checks if the given callback returns a true(-ish) value for each element in the collection.
 *
 * @method every
 * @param {Function} callback Function to execute for each element, invoked with `element` as argument.
 * @return Whether each element passed the callback check.
 * @example
 *     $('.items').every(function(element) {
 *         return element.hasAttribute('active')
 *     });
 *     ➤ true/false
 */

var every = ArrayProto.every;

/**
 * Checks if the given callback returns a true(-ish) value for any of the elements in the collection.
 *
 * @method some
 * @param {Function} callback Function to execute for each element, invoked with `element` as argument.
 * @return Whether any element passed the callback check.
 * @example
 *     $('.items').some(function(element) {
 *         return element.hasAttribute('active')
 *     });
 *     ➤ true/false
 */

var some = ArrayProto.some;

export { each, every, filter, forEach, map, reverse, some };

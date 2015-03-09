/**
 * @module Array
 */

import { each as _each, toArray } from './util';
import { $, matches } from './selector';

var ArrayProto = Array.prototype;

/**
 * Filter the collection by selector or function, and return a new collection with the result.
 *
 * @param {String|Function} selector Selector or function to filter the collection.
 * @return {Object} A new wrapped collection
 * @chainable
 * @example
 *     $('.items').filter('.active');
 * @example
 *     $('.items').filter(function(element) {
 *         return element.hasAttribute('active')
 *     });
 */

function filter(selector) {
    var callback = typeof selector === 'function' ? function(element, index) {
        return selector.call(element, index, element);
    } : function(element) {
        return matches(element, selector);
    };
    return $(ArrayProto.filter.call(this, callback));
}

/**
 * Execute a function for each element in the collection.
 *
 * @param {Function} callback Function to execute for each element, invoked with `index` and `element` as argument.
 * @return {Object} The wrapped collection
 * @chainable
 * @example
 *     $('.items').forEach(function(element) {
 *         element.style.color = 'evergreen';
 *     );
 */

function each(callback) {
    return _each(this, callback);
}

/**
 * Returns the index of an element in the collection.
 *
 * @param {Node} element
 * @return {Number} The zero-based index, -1 if not found.
 * @example
 *     $('.items').indexOf(element);
 *     // 2
 */

var index = ArrayProto.indexOf;

/**
 * Create a new collection by executing the callback for each element in the collection.
 *
 * @param {Function} callback Function to execute for each element, invoked with `index` and `element` as arguments.
 * @return {Object} A new wrapped collection, containing the return value of the executed callback for each element.
 * @example
 *     $('.items').map(function(index, element) {
 *         return element.getAttribute('name')
 *     });
 *     // ['ever', 'green']
 */

function map(callback) {
    return $(ArrayProto.map.call(this, function(element, index) {
        return callback.call(element, index, element);
    }));
}

/*
 * Export interface
 */

export { each, filter, index, map };

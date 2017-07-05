/**
 * @module Array
 */

import { each as _each, toArray } from './util';
import { $, matches } from './selector/index';

const ArrayProto = Array.prototype;

/**
 * Checks if the given callback returns a true(-ish) value for each element in the collection.
 *
 * @param {Function} callback Function to execute for each element, invoked with `element` as argument.
 * @param {Object} [thisArg] Value to use as `this` when executing `callback`.
 * @return {Boolean} Whether each element passed the callback check.
 * @example
 *     // Test whether every element in the collection has the "active" attribute
 *     $('.items').every(function(element) {
 *         return element.hasAttribute('active')
 *     });
 */

export const every = ArrayProto.every;

/**
 * Filter the collection by selector or function, and return a new collection with the result.
 *
 * @param {String|Function} selector Selector or function to filter the collection.
 * @param {Object} [thisArg] Value to use as `this` when executing `callback`.
 * @return {Object} A new wrapped collection
 * @chainable
 * @example
 *     $('.items').filter('.active');
 * @example
 *     $('.items').filter(function(element) {
 *         return element.hasAttribute('active')
 *     });
 */

export const filter = function( selector, thisArg ) {
  let callback;

  if ( typeof selector === 'function' ) {
    callback = selector;
  } else {
    const newSelector = selector.replace( /(.*):visible|:hidden(.*)/i , '$1$2' );
    callback = element => matches( element, newSelector );
  }
  let result = ArrayProto.filter.call( this, callback, thisArg );

  if ( /:visible/.test( selector ) ) {
    ArrayProto.filter.call( result, function( el ) {
      return !!( el.offsetWidth || el.offsetHeight || el.getClientRects().length );
    } );
  }
  if ( /:hidden/.test( selector ) ) {
    ArrayProto.filter.call( result, function( el ) {
      return !( el.offsetWidth || el.offsetHeight || el.getClientRects().length );
    } );
  }
  return $( result );
};

/**
 * Execute a function for each element in the collection.
 *
 * @param {Function} callback Function to execute for each element, invoked with `element` as argument.
 * @param {Object} [thisArg] Value to use as `this` when executing `callback`.
 * @return {Object} The wrapped collection
 * @chainable
 * @example
 *     $('.items').forEach(function(element) {
 *         element.style.color = 'evergreen';
 *     );
 */

export const forEach = function(callback, thisArg) {
  return _each(this, callback, thisArg);
};

export const each = forEach;

/**
 * Returns the index of an element in the collection.
 *
 * @param {Node} element
 * @return {Number} The zero-based index, -1 if not found.
 * @example
 *     $('.items').indexOf(element); // 2
 */

export const indexOf = ArrayProto.indexOf;

/**
 * Create a new collection by executing the callback for each element in the collection.
 *
 * @param {Function} callback Function to execute for each element, invoked with `element` as argument.
 * @param {Object} [thisArg] Value to use as `this` when executing `callback`.
 * @return {Array} Collection with the return value of the executed callback for each element.
 * @example
 *     // Create a new array with the attribute value of each element:
 *     $('.items').map(function(element) {
 *         return element.getAttribute('name')
 */

export const map = ArrayProto.map;

/**
 * Removes the last element from the collection, and returns that element.
 *
 * @return {Object} The last element from the collection.
 * @example
 *     var lastElement = $('.items').pop();
 */

export const pop = ArrayProto.pop;

/**
 * Adds one or more elements to the end of the collection, and returns the new length of the collection.
 *
 * @param {Object} element Element(s) to add to the collection
 * @return {Number} The new length of the collection
 * @example
 *     $('.items').push(element);
 */

export const push = ArrayProto.push;

/**
 * Apply a function against each element in the collection, and this accumulator function has to reduce it
 * to a single value.
 *
 * @param {Function} callback Function to execute on each value in the array, taking four arguments (see example).
 * @param {Mixed} initialValue Object to use as the first argument to the first call of the callback.
 * @example
 *     // Calculate the combined height of elements:
 *     $('.items').reduce(function(previousValue, element, index, collection) {
 *         return previousValue + element.clientHeight;
 *     }, 0);
 */

export const reduce = ArrayProto.reduce;

/**
 * Apply a function against each element in the collection (from right-to-left), and this accumulator function has
 * to reduce it to a single value.
 *
 * @param {Function} callback Function to execute on each value in the array, taking four arguments (see example).
 * @param {Mixed} initialValue Object to use as the first argument to the first call of the callback.
 * @example
 *     // Concatenate the text of elements in reversed order:
 *     $('.items').reduceRight(function(previousValue, element, index, collection) {
 *         return previousValue + element.textContent;
 *     }, '');
 */

export const reduceRight = ArrayProto.reduceRight;

/**
 * Reverses an array in place. The first array element becomes the last and the last becomes the first.
 *
 * @return {Object} The wrapped collection, reversed
 * @chainable
 * @example
 *     $('.items').reverse();
 */

export const reverse = function() {
  return $(toArray(this).reverse());
};

/**
 * Removes the first element from the collection, and returns that element.
 *
 * @return {Object} The first element from the collection.
 * @example
 *     var firstElement = $('.items').shift();
 */

export const shift = ArrayProto.shift;

/**
 * Checks if the given callback returns a true(-ish) value for any of the elements in the collection.
 *
 * @param {Function} callback Function to execute for each element, invoked with `element` as argument.
 * @return {Boolean} Whether any element passed the callback check.
 * @example
 *     $('.items').some(function(element) {
 *         return element.hasAttribute('active')
 *     }); // true/false
 */

export const some = ArrayProto.some;

/**
 * Adds one or more elements to the beginning of the collection, and returns the new length of the collection.
 *
 * @param {Object} element Element(s) to add to the collection
 * @return {Number} The new length of the collection
 * @example
 *     $('.items').unshift(element);
 */

export const unshift = ArrayProto.unshift;

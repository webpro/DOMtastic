/**
 * @module Class
 */

import { each } from '../util';

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

export const addClass = function(value) {
  if(value && value.length) {
    each(value.split(' '), _each.bind(this, 'add'));
  }
  return this;
};

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

export const removeClass = function(value) {
  if(value && value.length) {
    each(value.split(' '), _each.bind(this, 'remove'));
  }
  return this;
};

/**
 * Toggle a class at the element(s)
 *
 * @param {String} value Space-separated class name(s) to toggle at the element(s).
 * @param {Boolean} [state] A Boolean value to determine whether the class should be added or removed.
 * @return {Object} The wrapped collection
 * @chainable
 * @example
 *     $('.item').toggleClass('bar');
 *     $('.item').toggleClass('bar foo');
 *     $('.item').toggleClass('bar', true);
 */

export const toggleClass = function(value, state) {
  if(value && value.length) {
    const action = typeof state === 'boolean' ? state ? 'add' : 'remove' : 'toggle';
    each(value.split(' '), _each.bind(this, action));
  }
  return this;
};

/**
 * Check if the element(s) have a class.
 *
 * @param {String} value Check if the DOM element contains the class name. When applied to multiple elements,
 * returns `true` if _any_ of them contains the class name.
 * @return {Boolean} Whether the element's class attribute contains the class name.
 * @example
 *     $('.item').hasClass('bar');
 */

export const hasClass = function(value) {
  return (this.nodeType ? [this] : this).some(element => element.classList.contains(value));
};

/**
 * Specialized iteration, applying `fn` of the classList API to each element.
 *
 * @param {String} fnName
 * @param {String} className
 * @private
 */

const _each = function(fnName, className) {
  return each(this, element => element.classList[fnName](className));
};

/**
 * @module Data
 */

import { each } from '../util';

/**
 * Get data from first element, or set data for each element in the collection.
 *
 * @param {String} key The key for the data to get or set.
 * @param {String} [value] The data to set.
 * @return {Object} The wrapped collection
 * @chainable
 * @example
 *     $('.item').data('attrName'); // get
 *     $('.item').data('attrName', {any: 'data'}); // set
 */

export const data = function(key, value) {

  if(typeof key === 'string' && typeof value === 'undefined') {
    const element = this.nodeType ? this : this[0];
    return element && element.dataset ? element.dataset[key] : undefined;
  }

  return each(this, element => {
    element.dataset[key] = value;
  });
};

/**
 * Get property from first element, or set property on each element in the collection.
 *
 * @param {String} key The name of the property to get or set.
 * @param {String} [value] The value of the property to set.
 * @return {Object} The wrapped collection
 * @chainable
 * @example
 *     $('.item').prop('attrName'); // get
 *     $('.item').prop('attrName', 'attrValue'); // set
 */

export const prop = function(key, value) {

  if(typeof key === 'string' && typeof value === 'undefined') {
    const element = this.nodeType ? this : this[0];
    return element && element ? element[key] : undefined;
  }

  return each(this, element => element[key] = value);
};

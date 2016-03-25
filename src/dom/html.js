/**
 * @module HTML
 */

import { each } from '../util';

/*
 * Get the HTML contents of the first element, or set the HTML contents for each element in the collection.
 *
 * @param {String} [fragment] HTML fragment to set for the element. If this argument is omitted, the HTML contents are returned.
 * @return {Object} The wrapped collection
 * @chainable
 * @example
 *     $('.item').html();
 *     $('.item').html('<span>more</span>');
 */

export const html = function(fragment) {

  if(typeof fragment !== 'string') {
    const element = this.nodeType ? this : this[0];
    return element ? element.innerHTML : undefined;
  }

  return each(this, element => element.innerHTML = fragment);
};

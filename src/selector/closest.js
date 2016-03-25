/**
 * @module closest
 */

import { $, matches } from './index';
import { each, uniq } from '../util';

/**
 * Return the closest element matching the selector (starting by itself) for each element in the collection.
 *
 * @param {String} selector Filter
 * @param {Object} [context] If provided, matching elements must be a descendant of this element
 * @return {Object} New wrapped collection (containing zero or one element)
 * @chainable
 * @example
 *     $('.selector').closest('.container');
 */

export const closest = (() => {

  const closest = function(selector, context) {
    const nodes = [];
    each(this, node => {
      while(node && node !== context) {
        if(matches(node, selector)) {
          nodes.push(node);
          break;
        }
        node = node.parentElement;
      }
    });
    return $(uniq(nodes));
  };

  return typeof Element === 'undefined' || !Element.prototype.closest ? closest : function(selector, context) {
    if(!context) {
      const nodes = [];
      each(this, node => {
        const n = node.closest(selector);
        if(n) {
          nodes.push(n);
        }
      });
      return $(uniq(nodes));
    } else {
      return closest.call(this, selector, context);
    }
  };
})();

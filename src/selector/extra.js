/**
 * @module Selector (extra)
 */

import { each, toArray } from '../util';
import { $, matches } from './index';

/**
 * Return children of each element in the collection, optionally filtered by a selector.
 *
 * @param {String} [selector] Filter
 * @return {Object} New wrapped collection
 * @chainable
 * @example
 *     $('.selector').children();
 *     $('.selector').children('.filter');
 */

export const children = function(selector) {
  const nodes = [];
  each(this, element => {
    if(element.children) {
      each(element.children, child => {
        if(!selector || (selector && matches(child, selector))) {
          nodes.push(child);
        }
      });
    }
  });
  return $(nodes);
};

/**
 * Add the elements of a wrapped collection to another.
 *
 * @param {String|Node|NodeList|Array} selector Query selector, `Node`, `NodeList`, array of elements, or HTML fragment string.
 * @return {Object} The extended wrapped collection
 * @example
 *     $('.items').concat($('.more-items));
 *     $('.items').concat('.more-items);
 *     $('.items').concat('<div>more</div>');
 */

export const concat = function(selector) {
  each($(selector), element => {
    if([].indexOf.call(this, element) === -1) {
      [].push.call(this, element);
    }
  });
  return this;
};

/**
 * Return child nodes of each element in the collection, including text and comment nodes.
 *
 * @return {Object} New wrapped collection
 * @example
 *     $('.selector').contents();
 */

export const contents = function() {
  const nodes = [];
  each(this, element => nodes.push.apply(nodes, toArray(element.childNodes)));
  return $(nodes);
};

/**
 * Return a collection containing only the one at the specified index.
 *
 * @param {Number} index
 * @return {Object} New wrapped collection
 * @chainable
 * @example
 *     $('.items').eq(1)
 *     // The second item; result is the same as doing $($('.items')[1]);
 */

export const eq = function(index) {
  return slice.call(this, index, index + 1);
};

/**
 * Return a collection containing only the first item.
 *
 * @return {Object} New wrapped collection
 * @chainable
 * @example
 *     $('.items').first()
 *     // The first item; result is the same as doing $($('.items')[0]);
 */

export const first = function() {
  return slice.call(this, 0, 1);
};

/**
 * Return the DOM element at the specified index.
 *
 * @param {Number} index
 * @return {Node} Element at the specified index
 * @example
 *     $('.items').get(1)
 *     // The second element; result is the same as doing $('.items')[1];
 */

export const get = function(index) {
  return this[index];
};

/**
 * Return the parent elements of each element in the collection, optionally filtered by a selector.
 *
 * @param {String} [selector] Filter
 * @return {Object} New wrapped collection
 * @chainable
 * @example
 *     $('.selector').parent();
 *     $('.selector').parent('.filter');
 */

export const parent = function(selector) {
  const nodes = [];
  each(this, element => {
    if(!selector || (selector && matches(element.parentNode, selector))) {
      nodes.push(element.parentNode);
    }
  });
  return $(nodes);
};

/**
 * Return the sibling elements of each element in the collection, optionally filtered by a selector.
 *
 * @param {String} [selector] Filter
 * @return {Object} New wrapped collection
 * @chainable
 * @example
 *     $('.selector').siblings();
 *     $('.selector').siblings('.filter');
 */

export const siblings = function(selector) {
  const nodes = [];
  each(this, element => each(element.parentNode.children, sibling => {
    if(sibling !== element && (!selector || (selector && matches(sibling, selector)))) {
      nodes.push(sibling);
    }
  }));
  return $(nodes);
};

/**
 * Create a new, sliced collection.
 *
 * @param {Number} start
 * @param {Number} end
 * @return {Object} New wrapped collection
 * @example
 *     $('.items').slice(1, 3)
 *     // New wrapped collection containing the second, third, and fourth element.
 */

export const slice = function(start, end) { // eslint-disable-line no-unused-vars
  return $([].slice.apply(this, arguments));
};

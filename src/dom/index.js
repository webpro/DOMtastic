/**
 * @module DOM
 */

import { toArray } from '../util';
import { $ } from '../selector/index';

const forEach = Array.prototype.forEach;

/**
 * Append element(s) to each element in the collection.
 *
 * @param {String|Node|NodeList|Object} element What to append to the element(s).
 * Clones elements as necessary.
 * @return {Object} The wrapped collection
 * @chainable
 * @example
 *     $('.item').append('<p>more</p>');
 */

export const append = function(element) {
  if(this instanceof Node) {
    if(typeof element === 'string') {
      this.insertAdjacentHTML('beforeend', element);
    } else {
      if(element instanceof Node) {
        this.appendChild(element);
      } else {
        const elements = element instanceof NodeList ? toArray(element) : element;
        forEach.call(elements, this.appendChild.bind(this));
      }
    }
  } else {
    _each(this, append, element);
  }
  return this;
};

/**
 * Place element(s) at the beginning of each element in the collection.
 *
 * @param {String|Node|NodeList|Object} element What to place at the beginning of the element(s).
 * Clones elements as necessary.
 * @return {Object} The wrapped collection
 * @chainable
 * @example
 *     $('.item').prepend('<span>start</span>');
 */

export const prepend = function(element) {
  if(this instanceof Node) {
    if(typeof element === 'string') {
      this.insertAdjacentHTML('afterbegin', element);
    } else {
      if(element instanceof Node) {
        this.insertBefore(element, this.firstChild);
      } else {
        let elements = element instanceof NodeList ? toArray(element) : element;
        forEach.call(elements.reverse(), prepend.bind(this));
      }
    }
  } else {
    _each(this, prepend, element);
  }
  return this;
};

/**
 * Place element(s) before each element in the collection.
 *
 * @param {String|Node|NodeList|Object} element What to place as sibling(s) before to the element(s).
 * Clones elements as necessary.
 * @return {Object} The wrapped collection
 * @chainable
 * @example
 *     $('.items').before('<p>prefix</p>');
 */

export const before = function(element) {
  if(this instanceof Node) {
    if(typeof element === 'string') {
      this.insertAdjacentHTML('beforebegin', element);
    } else {
      if(element instanceof Node) {
        this.parentNode.insertBefore(element, this);
      } else {
        const elements = element instanceof NodeList ? toArray(element) : element;
        forEach.call(elements, before.bind(this));
      }
    }
  } else {
    _each(this, before, element);
  }
  return this;
};

/**
 * Place element(s) after each element in the collection.
 *
 * @param {String|Node|NodeList|Object} element What to place as sibling(s) after to the element(s). Clones elements as necessary.
 * @return {Object} The wrapped collection
 * @chainable
 * @example
 *     $('.items').after('<span>suf</span><span>fix</span>');
 */

export const after = function(element) {
  if(this instanceof Node) {
    if(typeof element === 'string') {
      this.insertAdjacentHTML('afterend', element);
    } else {
      if(element instanceof Node) {
        this.parentNode.insertBefore(element, this.nextSibling);
      } else {
        const elements = element instanceof NodeList ? toArray(element) : element;
        forEach.call(elements.reverse(), after.bind(this));
      }
    }
  } else {
    _each(this, after, element);
  }
  return this;
};

/**
 * Clone a wrapped object.
 *
 * @return {Object} Wrapped collection of cloned nodes.
 * @example
 *     $(element).clone();
 */

export const clone = function() {
  return $(_clone(this));
};

/**
 * Clone an object
 *
 * @param {String|Node|NodeList|Array} element The element(s) to clone.
 * @return {String|Node|NodeList|Array} The cloned element(s)
 * @private
 */

export const _clone = element => {
  if(typeof element === 'string') {
    return element;
  } else if(element instanceof Node) {
    return element.cloneNode(true);
  } else if('length' in element) {
    return [].map.call(element, el => el.cloneNode(true));
  }
  return element;
};

/**
 * Specialized iteration, applying `fn` in reversed manner to a clone of each element, but the provided one.
 *
 * @param {NodeList|Array} collection
 * @param {Function} fn
 * @param {Node} element
 * @private
 */

export const _each = (collection, fn, element) => {
  let l = collection.length;
  while(l--) {
    const elm = l === 0 ? element : _clone(element);
    fn.call(collection[l], elm);
  }
};

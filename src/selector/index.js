/**
 * @module Selector
 */

import { global, each } from '../util';

let isPrototypeSet = false;

const reFragment = /^\s*<(\w+|!)[^>]*>/;
const reSingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/;
const reSimpleSelector = /^[\.#]?[\w-]*$/;

/*
 * Versatile wrapper for `querySelectorAll`.
 *
 * @param {String|Node|NodeList|Array} selector Query selector, `Node`, `NodeList`, array of elements, or HTML fragment string.
 * @param {String|Node|NodeList} context=document The context for the selector to query elements.
 * @return {Object} The wrapped collection
 * @chainable
 * @example
 *     var $items = $(.items');
 * @example
 *     var $element = $(domElement);
 * @example
 *     var $list = $(nodeList, document.body);
 * @example
 *     var $element = $('<p>evergreen</p>');
 */

export const $ = (selector, context = document) => {

  let collection;

  if(!selector) {

    collection = document.querySelectorAll(null);

  } else if(selector instanceof Wrapper) {

    return selector;

  } else if(typeof selector !== 'string') {

    collection = selector.nodeType || selector === window ? [selector] : selector;

  } else if(reFragment.test(selector)) {

    collection = createFragment(selector);

  } else {

    context = typeof context === 'string' ? document.querySelector(context) : context.length ? context[0] : context;

    collection = querySelector(selector, context);

  }

  return wrap(collection);

};

/*
 * Find descendants matching the provided `selector` for each element in the collection.
 *
 * @param {String|Node|NodeList|Array} selector Query selector, `Node`, `NodeList`, array of elements, or HTML fragment string.
 * @return {Object} The wrapped collection
 * @example
 *     $('.selector').find('.deep').$('.deepest');
 */

export const find = function(selector) {
  const nodes = [];
  each(this, node => each(querySelector(selector, node), child => {
    if(nodes.indexOf(child) === -1) {
      nodes.push(child);
    }
  }));
  return $(nodes);
};

/*
 * Returns `true` if the element would be selected by the specified selector string; otherwise, returns `false`.
 *
 * @param {Node} element Element to test
 * @param {String} selector Selector to match against element
 * @return {Boolean}
 *
 * @example
 *     $.matches(element, '.match');
 */

export const matches = (() => {
  const context = typeof Element !== 'undefined' ? Element.prototype : global;
  const _matches = context.matches || context.matchesSelector || context.mozMatchesSelector || context.msMatchesSelector || context.oMatchesSelector || context.webkitMatchesSelector;
  return (element, selector) => _matches.call(element, selector);
})();

/*
 * Use the faster `getElementById`, `getElementsByClassName` or `getElementsByTagName` over `querySelectorAll` if possible.
 *
 * @private
 * @param {String} selector Query selector.
 * @param {Node} context The context for the selector to query elements.
 * @return {Object} NodeList, HTMLCollection, or Array of matching elements (depending on method used).
 */

const querySelector = (selector, context) => {

  const isSimpleSelector = reSimpleSelector.test(selector);

  if(isSimpleSelector) {
    if(selector[0] === '#') {
      const element = (context.getElementById ? context : document).getElementById(selector.slice(1));
      return element ? [element] : [];
    }
    if(selector[0] === '.') {
      return context.getElementsByClassName(selector.slice(1));
    }
    return context.getElementsByTagName(selector);
  }

  return context.querySelectorAll(selector);

};

/*
 * Create DOM fragment from an HTML string
 *
 * @private
 * @param {String} html String representing HTML.
 * @return {NodeList}
 */

const createFragment = html => {

  if(reSingleTag.test(html)) {
    return [document.createElement(RegExp.$1)];
  }

  const elements = [];
  const container = document.createElement('div');
  const children = container.childNodes;

  container.innerHTML = html;

  for(let i = 0, l = children.length; i < l; i++) {
    elements.push(children[i]);
  }

  return elements;
};

/*
 * Calling `$(selector)` returns a wrapped collection of elements.
 *
 * @private
 * @param {NodeList|Array} collection Element(s) to wrap.
 * @return Object) The wrapped collection
 */

const wrap = collection => {

  if(!isPrototypeSet) {
    Wrapper.prototype = $.fn;
    Wrapper.prototype.constructor = Wrapper;
    isPrototypeSet = true;
  }

  return new Wrapper(collection);
};

/*
 * Constructor for the Object.prototype strategy
 *
 * @constructor
 * @private
 * @param {NodeList|Array} collection Element(s) to wrap.
 */

export const Wrapper = function(collection) {
  let i = 0;
  const length = collection.length;
  for(; i < length;) {
    this[i] = collection[i++];
  }
  this.length = length;
};

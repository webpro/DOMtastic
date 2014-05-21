/**
 * @module Selector (extra)
 */

var each = require('./util').each;
import { $, matches } from './selector';

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

function children(selector) {
    var nodes = [];
    each(this, function(element) {
        if(element.children) {
            each(element.children, function(child) {
                if (!selector || (selector && matches(child, selector))) {
                    nodes.push(child);
                }
            });
        }
    });
    return $(nodes);
}

/**
 * Return child nodes of each element in the collection, including text and comment nodes.
 *
 * @return {Object} New wrapped collection
 * @example
 *     $('.selector').contents();
 */

function contents() {
    var nodes = [];
    each(this, function(element) {
        nodes.push.apply(nodes, element.childNodes);
    });
    return $(nodes);
}

/**
 * Return the closest element matching the selector (starting by itself).
 *
 * @param {String} selector Filter
 * @return {Object} New wrapped collection (containing zero or one element)
 * @chainable
 * @example
 *     $('.selector').closest('.container');
 */

function closest(selector) {
    var node = this[0];
    for (; node.nodeType !== node.DOCUMENT_NODE; node = node.parentNode) {
        if (matches(node, selector)) {
            return $(node);
        }
    }
    return $();
}

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

function parent(selector) {
    var nodes = [];
    each(this, function(element) {
        if (!selector || (selector && matches(element.parentNode, selector))) {
            nodes.push(element.parentNode);
        }
    });
    return $(nodes);
}

/**
 * Return a collection containing only the one at the specified index.
 *
 * @param {Number} index
 * @return {Object} New wrapped collection
 * @chainable
 * @example
 *     $('.items').eq(1)
 *     ➤ The second item; result is the same as doing $($('.items')[1]);
 */

function eq(index) {
    return slice.call(this, index, index + 1);
}

/**
 * Return the DOM element at the specified index.
 *
 * @param {Number} index
 * @return {Node} Element at the specified index
 * @example
 *     $('.items').get(1)
 *     ➤ The second element; result is the same as doing $('.items')[1];
 */

function get(index) {
    return this[index];
}

/**
 * Create a new, sliced collection.
 *
 * @param {Number} start
 * @param {Number} end
 * @return {Object} New wrapped collection
 * @example
 *     $('.items').slice(1, 3)
 *     ➤ New wrapped collection containing the second, third, and fourth element.
 */

function slice(start, end) {
    return $([].slice.apply(this, arguments));
}

/*
 * Export interface
 */

export { children, contents, closest, parent, eq, get, slice };

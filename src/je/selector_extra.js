/**
 * @module Selector (extra)
 */

var each = require('./util').each;
import { $, matches } from './selector';

/*
 * ## children
 *
 * Return children of each element in the collection (optionally filtered by a selector).
 *
 *     $('.selector').children();
 *     $('.selector').children('.filter');
 */

function children(selector) {
    var nodes = [];
    each(this, function(element) {
        each(element.children, function(child) {
            if (!selector || (selector && matches(child, selector))) {
                nodes.push(child);
            }
        });
    });
    return $(nodes);
}

/**
 * ## eq
 *
 * Return a collection containing only the one at the specified index.
 *
 * @param {Number} index
 * @returns {$Object}
 */

function eq(index) {
    return slice.call(this, index, index + 1);
}

/**
 * ## get
 *
 * Return the DOM element at the provided index.
 *
 * @param {Number} index
 * @returns {Node}
 */

function get(index) {
    return this[index];
}

/**
 * ## slice
 *
 * Return a new, sliced collection.
 *
 * @param {Number} start
 * @param {Number} end
 * @returns {$Object}
 */

function slice(start, end) {
    return $([].slice.apply(this, arguments));
}

export { children, eq, get, slice };

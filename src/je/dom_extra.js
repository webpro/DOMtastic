/**
 * @module DOM (extra)
 */

import { each } from './util';
import { append, before, after } from './dom';
import { $ } from './selector';

/**
 * Append each element in the collection to the specified element(s).
 *
 * @param {Node|NodeList|Object} element What to append the element(s) to. Clones elements as necessary.
 * @return {Object} The wrapped collection
 * @chainable
 * @example
 *     $('.item').appendTo(container);
 */

function appendTo(element) {
    var context = typeof element === 'string' ? $(element) : element;
    append.call(context, this);
    return this;
}

/**
 * Remove the collection from the DOM.
 *
 * @return {Array} Array containing the removed elements
 */

function remove() {
    return each(this, function(element) {
        if (element.parentNode) {
            element.parentNode.removeChild(element);
        }
    });
}

/**
 * Replace each element in the collection with the provided new content, and return the array of elements that were replaced.
 *
 * @return {Array} Array containing the replaced elements
 */

function replaceWith() {
    return before.apply(this, arguments).remove();
}

/*
 * Export interface
 */

export { appendTo, remove, replaceWith };

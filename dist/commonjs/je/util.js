"use strict";
/**
 * ## toArray
 *
 * Convert `NodeList` to `Array`.
 *
 * @param {NodeList|Array} collection
 * @return {Array}
 */

var toArray = function(collection) {
    return [].slice.call(collection);
};

/**
 * ## makeIterable
 *
 * Make sure to return something that can be iterated over (e.g. using `forEach`).
 * Arrays and NodeLists are returned as-is, but `Node`s are wrapped in a `[]`.
 *
 * @param {Node|NodeList|Array} element
 * @return {Array|NodeList}
 */

var makeIterable = function(element) {
    return typeof element.length === 'undefined' || element === window ? [element] : element;
};

exports.toArray = toArray;
exports.makeIterable = makeIterable;
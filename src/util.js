/*
 * @module Util
 */

/*
 * Reference to the global scope
 * @private
 */

var global = new Function("return this")(),
    slice = Array.prototype.slice;

/**
 * Convert `NodeList` to `Array`.
 *
 * @param {NodeList|Array} collection
 * @return {Array}
 * @private
 */

var toArray = (collection) => slice.call(collection);

/**
 * Return something that can be iterated over (e.g. using `forEach`).
 * Arrays and NodeLists are returned as-is, but a Node will be wrapped in a `[]`.
 *
 * @param {Node|NodeList|Array} element
 * @return {Array|NodeList}
 * @private
 */

var makeIterable = (element) => element.nodeType || element === window ? [element] : element;

/**
 * Faster alternative to [].forEach method
 *
 * @param {Node|NodeList|Array} collection
 * @param {Function} callback
 * @return {Node|NodeList|Array}
 * @private
 */

function each(collection, callback) {
    var length = collection.length;
    if (length !== undefined) {
        for (var i = 0; i < length; i++){
            callback(collection[i], i, collection);
        }
    } else {
        callback(collection, 0, collection);
    }
    return collection;
}

/**
 * Assign properties from source object(s) to target object
 *
 * @method extend
 * @param {Object} target Object to extend
 * @param {Object} [source] Object to extend from
 * @return {Object} Extended object
 * @example
 *     $.extend({a: 1}, {b: 2});
 *     ➤ {a: 1, b: 2}
 * @example
 *     $.extend({a: 1}, {b: 2}, {a: 3});
 *     ➤ {a: 3, b: 2}
 */

function extend(target, ...sources) {
    sources.forEach(function(src) {
        if (src) {
            for (var prop in src) {
                target[prop] = src[prop];
            }
        }
    });
    return target;
}

/*
 * Export interface
 */

export { global, toArray, makeIterable, each, extend };

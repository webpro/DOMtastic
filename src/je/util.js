// # Util

/**
 * Reference to the global scope
 */

var global = new Function("return this")(),
    slice = Array.prototype.slice;

/**
 * ## toArray
 *
 * Convert `NodeList` to `Array`.
 *
 * @param {NodeList|Array} collection
 * @return {Array}
 */

function toArray(collection) {
    return slice.call(collection);
}

/**
 * ## makeIterable
 *
 * Return something that can be iterated over (e.g. using `forEach`).
 * Arrays and NodeLists are returned as-is, but `Node`s are wrapped in a `[]`.
 *
 * @param {Node|NodeList|Array} element
 * @return {Array|NodeList}
 */

function makeIterable(element) {
    return element.length === undefined || element === window ? [element] : element;
}

/**
 * ## each
 *
 * Faster alternative to [].forEach method
 *
 * @param {Node|NodeList|Array} collection
 * @param {Function} callback
 * @returns {Node|NodeList|Array}
 */

function each(collection, callback) {
    var length = collection.length;
    if (length !== undefined) {
        for (var i = 0; i < length; i++){
            callback(collection[i]);
        }
    } else {
        callback(collection);
    }
    return collection;
}

/**
 * ## extend
 *
 * Assign properties from source object(s) to target object
 *
 * @method extend
 * @param {Object} obj Object to extend
 * @param {Object} [source] Object to extend from
 * @returns {Object} Extended object
 */

function extend(obj) {
    slice.call(arguments, 1).forEach(function(source) {
        if (source) {
            for (var prop in source) {
                obj[prop] = source[prop];
            }
        }
    });
    return obj;
}

export { global, toArray, makeIterable, each, extend };

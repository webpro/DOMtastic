/**
 * Reference to the global scope
 */

var global = Function("return this")();

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
    return element.length === undefined || element === window ? [element] : element;
};

/**
 * ## each
 *
 * Faster alternative to [].forEach method
 *
 * @param {Node|NodeList|Array} collection
 * @param {Function} callback
 * @returns {Node|NodeList|Array}
 */

var each = function(collection, callback) {
    var length = collection.length;
    if(length !== undefined) {
        for(var i = 0; i < length; i++){
            callback(collection[i]);
        }
    } else {
        callback(collection);
    }
    return collection;
};

export { global, toArray, makeIterable, each };

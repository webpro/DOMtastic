// # Array

import { each as _each } from './util';
import { $, matches } from './selector';

var ArrayProto = Array.prototype;

// Filter the collection by selector or function.

function filter(selector) {
    var callback = typeof selector === 'function' ? selector : function(element) {
        return matches(element, selector);
    };
    return $(ArrayProto.filter.call(this, callback));
}

function each(callback) {
    return _each(this, callback);
}

function reverse() {
    var elements = ArrayProto.slice.call(this);
    return $(ArrayProto.reverse.call(elements));
}

var every = ArrayProto.every,
    forEach = each,
    map = ArrayProto.map,
    some = ArrayProto.some;

export { each, every, filter, forEach, map, reverse, some  }

import { toArray } from './util';
import { $, matches } from './selector';

var ArrayProto = Array.prototype;

function each(callback) {
    var length = this.length;
    if (length !== undefined && this.nodeType === undefined) {
        for (var i = 0; i < length; i++){
            callback.call(this[i], i, this[i]);
        }
    } else {
        callback.call(this, 0, this);
    }
    return this;
}

function filter(selector) {
    var callback = typeof selector === 'function' ? function(element, index) {
        return selector.call(element, index, element);
    } : function(element) {
        return matches(element, selector);
    };
    return $(ArrayProto.filter.call(this, callback));
}

var forEach = each;

var index = ArrayProto.indexOf;

function map(callback) {
    return $(ArrayProto.map.call(this, (element, index) => callback.call(element, index, element)));
}

function reverse() {
    return $(toArray(this).reverse());
}

var some = ArrayProto.some;

export { each, filter, forEach, index, map, reverse, some };

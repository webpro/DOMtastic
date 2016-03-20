import { toArray } from './util';
import { $, matches } from './selector/index';

const ArrayProto = Array.prototype;

function each(callback) {
    const length = this.length;
    if (length !== undefined && this.nodeType === undefined) {
        for (let i = 0; i < length; i++){
            callback.call(this[i], i, this[i]);
        }
    } else {
        callback.call(this, 0, this);
    }
    return this;
}

function filter(selector) {
    const callback = typeof selector === 'function' ? (element, index) => selector.call(element, index, element) : element => matches(element, selector);
    return $(ArrayProto.filter.call(this, callback));
}

const forEach = each;

const index = ArrayProto.indexOf;

function map(callback) {
    return $(ArrayProto.map.call(this, (element, index) => callback.call(element, index, element)));
}

function reverse() {
    return $(toArray(this).reverse());
}

const some = ArrayProto.some;

export { each, filter, forEach, index, map, reverse, some };

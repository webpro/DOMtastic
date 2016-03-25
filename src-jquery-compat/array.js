import { toArray } from './util';
import { $, matches } from './selector/index';

const ArrayProto = Array.prototype;

export const each = function(callback) {
  const length = this.length;
  if(length !== undefined && this.nodeType === undefined) {
    for(let i = 0; i < length; i++) {
      callback.call(this[i], i, this[i]);
    }
  } else {
    callback.call(this, 0, this);
  }
  return this;
};

export const forEach = each;

export const filter = function(selector) {
  const callback = typeof selector === 'function' ? (element, index) => selector.call(element, index, element) : element => matches(element, selector);
  return $(ArrayProto.filter.call(this, callback));
};

export const index = ArrayProto.indexOf;

export const map = function(callback) {
  return $(ArrayProto.map.call(this, (element, index) => callback.call(element, index, element)));
};

export const reverse = function() {
  return $(toArray(this).reverse());
};

export const some = ArrayProto.some;

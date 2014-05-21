/**
 * @module Data
 */

import { each } from './util';

var dataKeyProp = '__domtastic_data__';

function data(key, value) {

    if (typeof key === 'string' && typeof value === 'undefined') {
        var element = this.nodeType ? this : this[0];
        return element && element[dataKeyProp] ? element[dataKeyProp][key] : undefined;
    }

    each(this, function(element) {
        element[dataKeyProp] = element[dataKeyProp] || {};
        element[dataKeyProp][key] = value;
    });

    return this;

}

/**
 * Get property from first element, or set property on each element in the collection.
 *
 * @param {String} key The name of the property to get or set.
 * @param {String} [value] The value of the property to set.
 * @return {Object} The wrapped collection
 * @chainable
 * @example
 *     $('.item').prop('attrName'); // get
 *     $('.item').prop('attrName', 'attrValue'); // set
 */

function prop(key, value) {

    if (typeof key === 'string' && typeof value === 'undefined') {
        var element = this.nodeType ? this : this[0];
        return element && element ? element[key] : undefined;
    }

    each(this, function(element) {
        element[key] = value;
    });

    return this;

}


/*
 * Export interface
 */

export { data, prop }
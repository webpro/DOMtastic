// # Attr

import { each } from './util';

/**
 * ## attr
 *
 * Get the value of an attribute for the first element, or set one or more attributes for each element in the collection.
 *
 *     $('.item').attr('attrName');
 *     $('.item').attr('attrName', 'attrValue');
 *     $('.item').attr({'attr1', 'value1'}, {'attr2', 'value2});
 *
 * @param {String|Object} key The name of the attribute to get or set. Or an object containing key-value pairs to set as attributes.
 * @param {String} [value] The value of the attribute to set.
 * @return {$Object} or Node/List in native mode
 */

function attr(key, value) {

    if (typeof key === 'string' && typeof value === 'undefined') {
        var element = this.nodeType ? this : this[0];
        return element ? element.getAttribute(key) : undefined;
    }

    each(this, function(element) {
        if (typeof key === 'object') {
            for (var attr in key) {
                element.setAttribute(attr, key[attr]);
            }
        } else {
            element.setAttribute(key, value);
        }
    });

    return this;
}

// Export interface

export { attr };

/**
 * @module HTML
 */

import { each } from '../util';

/*
 * Get the HTML contents of the first element, or set the HTML contents for each element in the collection.
 *
 * @param {String} [fragment] HTML fragment to set for the element. If this argument is omitted, the HTML contents are returned.
 * @return {Object} The wrapped collection
 * @chainable
 * @example
 *     $('.item').html();
 *     $('.item').html('<span>more</span>');
 */

function html(fragment) {

    if (typeof fragment !== 'string') {
        var element = this.nodeType ? this : this[0];
        return element ? element.innerHTML : undefined;
    }

    each(this, function(element) {
        element.innerHTML = fragment;
    });

    return this;

}

/*
 * Export interface
 */

export { html };

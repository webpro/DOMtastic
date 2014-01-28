// # HTML

import { each } from './util';

/*
 * ## html
 *
 * Get the HTML contents of the first element, or set the HTML contents for each element in the collection.
 *
 *     $('.item').html();
 *     $('.item').html('<span>more</span>');
 *
 * @param {String} [fragment] HTML fragment to set for the element
 * @return {Node|NodeList|$Object} Returns the object it was applied to.
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

// Export interface

export { html };

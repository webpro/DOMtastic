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

var html = function(fragment) {

    if (!fragment) {
        return (this.nodeType ? this : this[0]).innerHTML;
    }

    each(this, function(element) {
        element.innerHTML = fragment;
    });
    return this;

};

// Export interface

export { html };

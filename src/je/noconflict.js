/*
 * # noConflict
 *
 * In case another library sets the global `$` variable before jQuery Evergreen does,
 * this method can be used to return the global `$` to that other library.
 */

import { global } from './util';

// Save the previous value of the global `$` variable, so that it can be restored later on.

var previousLib = global.$;

// Put jQuery Evergreen in noConflict mode, returning the `$` variable to its previous owner.
// Returns a reference to jQuery Evergreen.

function noConflict() {
    global.$ = previousLib;
    return this;
}

// Export interface

export { noConflict };

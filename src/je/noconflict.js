import { global } from './util';

/*
 * # noConflict
 *
 * In case another library sets the global `$` variable before jQuery Evergreen does,
 * this method can be used to return the global `$` to that other library.
 */

// Save the previous value of the global `$` variable, so that it can be restored later on.

var previousLib = global.$;

// Put jQuery Evergreen in noConflict mode, returning the `$` variable to its previous owner.
// Returns a reference to jQuery Evergreen.

var noConflict = function() {
    global.$ = previousLib;
    return this;
};

// Export interface

export default noConflict;

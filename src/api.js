/*
 * # API
 *
 * Import modules to build the API.
 *
 * The special comments (e.g. `API:class`) are used to exclude modules for a custom build.
 */

var api = {};

/* API:attr */
import { attr } from 'attr';
api.attr = attr;
/* API:attr */

/* API:class */
import { addClass, removeClass, toggleClass, hasClass } from 'class';
api.addClass = addClass;
api.removeClass = removeClass;
api.toggleClass = toggleClass;
api.hasClass = hasClass;
/* API:class */

/* API:dom */
import { append, before, after } from 'dom';
api.append = append;
api.before = before;
api.after = after;
/* API:dom */

/* API:event */
import { on, off, delegate, undelegate, trigger } from 'event';
api.on = on;
api.off = off;
api.delegate = delegate;
api.undelegate = undelegate;
api.trigger = trigger;
/* API:event */

/* API:selector */
import { $, find } from 'selector';
api.$ = find;
api.find = find;
$._api = api;
/* API:selector */

var array = [];

/*
 * The `apiNodeList` object represents the API that gets augmented onto the native `NodeList` object.
 * The wrapped array (native `Array`) already has these (and more).
 */

var apiNodeList = {
    every: array.every,
    filter: array.filter,
    forEach: array.forEach,
    each: array.forEach,
    some: array.some,
    map: array.map
};

// Export interface

export { $, api, apiNodeList };

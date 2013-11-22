/*
 * # API
 *
 * Import modules to build the API.
 *
 * The special comments (e.g. `API:class`) are used to exclude modules for a custom build.
 */

var api = {};

/* API:je/attr */
import { attr } from './je/attr';
api.attr = attr;
/* API:je/attr */

/* API:je/class */
import { addClass, removeClass, toggleClass, hasClass } from './je/class';
api.addClass = addClass;
api.removeClass = removeClass;
api.toggleClass = toggleClass;
api.hasClass = hasClass;
/* API:je/class */

/* API:je/dom */
import { append, before, after } from './je/dom';
api.append = append;
api.before = before;
api.after = after;
/* API:je/dom */

/* API:je/event */
import { on, off, delegate, undelegate, trigger } from './je/event';
api.on = on;
api.off = off;
api.delegate = delegate;
api.undelegate = undelegate;
api.trigger = trigger;
/* API:je/event */

/* API:je/html */
import { html } from './je/html';
api.html = html;
/* API:je/html */

/* API:je/selector */
import { $, find } from './je/selector';
api.$ = find;
api.find = find;
$._api = api;
/* API:je/selector */

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

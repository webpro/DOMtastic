"use strict";
/*
 * # API
 *
 * Import modules to build the API.
 *
 * The special comments (e.g. `API:class`) are used to exclude modules for a custom build.
 */

var api = {},
    $ = {};

/* API:attr */
var attr = require("./je/attr")["default"];
api.attr = attr;
/* API:attr */

/* API:class */
var addClass = require("./je/class").addClass;
var removeClass = require("./je/class").removeClass;
var toggleClass = require("./je/class").toggleClass;
var hasClass = require("./je/class").hasClass;
api.addClass = addClass;
api.removeClass = removeClass;
api.toggleClass = toggleClass;
api.hasClass = hasClass;
/* API:class */

/* API:dom */
var append = require("./je/dom").append;
var before = require("./je/dom").before;
var after = require("./je/dom").after;
api.append = append;
api.before = before;
api.after = after;
/* API:dom */

/* API:event */
var on = require("./je/event").on;
var off = require("./je/event").off;
var delegate = require("./je/event").delegate;
var undelegate = require("./je/event").undelegate;
var trigger = require("./je/event").trigger;
api.on = on;
api.off = off;
api.delegate = delegate;
api.undelegate = undelegate;
api.trigger = trigger;
/* API:event */

/* API:html */
var html = require("./je/html")["default"];
api.html = html;
/* API:html */

/* API:selector */
var $ = require("./je/selector").$;
var find = require("./je/selector").find;
api.find = find;
/* API:selector */

/* API:mode */
var isNative = require("./je/mode").isNative;
var native = require("./je/mode").native;
$.isNative = isNative;
$.native = native;
/* API:mode */

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

/*
 * Augment the `$` function to be able to:
 *
 * - wrap the `$` objects and add the API methods
 * - switch to native mode
 */

$.getNodeMethods = function() {
    return api;
};
$.getNodeListMethods = function() {
    return apiNodeList;
};

// Export interface

exports["default"] = $;
"use strict";
/**
 * # jQuery Evergreen
 *
 * Small & fast DOM and event library for modern browsers.
 * Having the same familiar API as jQuery (but without the extra "weight" of modules like `$.ajax`, `$.animate`, and `$.Deferred`), it works great stand-alone or paired up with e.g. Backbone.
 * The full version is only 7KB minified (2KB gzip), but it's easy to create a custom build to exclude parts you don't need.
 *
 * The [source](https://github.com/webpro/jquery-evergreen) is written in the ES6 Modules format, and transpiled to an AMD and a CommonJS version using the [ES6 Module Transpiler](http://square.github.io/es6-module-transpiler/). And last but also least, the CommonJS version is "browserified".
 *
 * Please find the table of contents in upper right.
 */

var $ = require("./je/api")["default"];

exports["default"] = $;
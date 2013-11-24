/**
 *
 * # jQuery Evergreen
 *
 * jQuery Evergreen works with modern browsers.
 * It has the same familiar API as jQuery, and is lean & mean with the following, optional modules:
 * [selector](je/selector.html), [class](je/class.html), [DOM](je/dom.html), [event](je/event.html), [attr](je/attr.html) and [html](je/html.html).
 *
 * The complete version is under 7KB after minification (2KB gzipped).
 *
 * Much of the original jQuery's "weight" is not included at all, such as `$.ajax`, `$.animate`, and `$.Deferred`.
 *
 * Browser support: latest version of Chrome, Firefox, Safari, Opera, Chrome Mobile iOS, and Mobile Safari. IE10 and IE11.
 * IE9 only needs a polyfill for `classList` to make all tests pass.
 *
 * You can [opt-in](mode.html) to work directly with Node and live NodeList objects.
 *
 * You can easily create **custom builds** to exclude parts you don't need:
 *
 *     $ grunt --exclude=attr,class,dom,event,html,mode,selector
 *
 * The default build in this repo:
 *
 *     $ grunt --exclude=mode
 *
 * Using **AMD**, just include it as a regular dependency:
 *
 *     define(['jquery-evergreen'], function($) {
 *
 *     });
 *
 *  Otherwise, include something like `<script src="jquery-evergreen.js">` and have `$` globally available.
 *
 * The sources are written in the **ES6** Modules format,
 * and transpiled to an AMD version, and a "browser global" version
 * using the [ES6 Module Transpiler](http://square.github.io/es6-module-transpiler/).
 *
 * Many thanks to these sources of inspiration:
 *
 * - [remy/min.js](https://github.com/remy/min.js)
 * - [Knockout](https://github.com/knockout/knockout/blob/master/src/utils.js)
 * - [inkling/Backbone.Native](https://github.com/inkling/backbone.native/blob/master/backbone.native.js)
 * - [madrobby/zepto](https://github.com/madrobby/zepto/)
 */

import { $ } from './api';

export default $;

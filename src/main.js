/**
 *
 * # jQuery Evergreen
 *
 * jQuery Evergreen works with modern browsers.
 * It has the same familiar API as jQuery, and is lean & mean with the following, optional modules:
 * [selector](selector.html), [class](class.html), [DOM](dom.html), [event](event.html), [attr](attr.html) and [html](html.html).
 *
 * The complete version is under 7KB after minification (2KB gzipped).
 *
 * Much of the original jQuery's "weight" is not included at all, such as `$.ajax`, `$.animate`, and `$.Deferred`.
 *
 * Browser support: latest version of Chrome, Firefox, Safari, Opera, Chrome Mobile iOS, and Mobile Safari. IE10 and IE11.
 * IE9 only needs a polyfill for `classList` to make all tests pass.
 *
 * You can opt-in to work directly with [Node and live NodeList](mode.html) objects.
 *
 * You can easily create **custom builds** to exclude parts you don't need:
 *
 *     $ grunt --exclude=attr,class,dom,event,html,selector
 *
 * Using **AMD**, just include it as a regular dependency:
 *
 *     define(['jquery-evergreen'], function($) {
 *
 *     });
 *
 * The sources are written in the **ES6** Modules format,
 * and transpiled to an AMD version, and a "browser global" version
 * using the [ES6 Module Transpiler](http://square.github.io/es6-module-transpiler/).
 *
 */

import { $ } from 'api';
import 'mode';

export default = $;

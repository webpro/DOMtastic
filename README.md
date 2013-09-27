# jQuery Evergreen

jQuery Evergreen works with modern browsers.
It has the same familiar API as jQuery 1.x and 2.x, but under the hood has the major difference that it
works with live Node and NodeList objects (instead of the Array-like `$` objects).

The native `Node` and `NodeList` objects are extended to fill up the chainable API, like `forEach`, `addClass`, `append`, `on`.
Methods already on the `Node` or `NodeList` prototype are not overridden (i.e. use native method if available).
Much of the original jQuery's "weight" is not included at all, such as `$.ajax`, `$.animate`, and `$.Deferred`.

It's under 5KB after minification (<1.5KB gzipped).

Browser support: latest version of Chrome, Firefox, Safari, Opera, Chrome Mobile iOS, and Mobile Safari. IE10 and IE11.
IE9 only needs a polyfill for `classList` to make all tests pass.

[Annotated source](http://webpro.github.io/jquery-evergreen)

[MIT licensed](http://webpro.mit-license.org)

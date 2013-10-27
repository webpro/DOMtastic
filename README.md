# jQuery Evergreen

jQuery Evergreen works with modern browsers.
It has the same familiar API as jQuery, and is lean & mean with just the selector, DOM and event methods.

It's under 7KB after minification (<2KB gzipped).

Much of the original jQuery's "weight" is not included at all, such as `$.ajax`, `$.animate`, and `$.Deferred`.

Browser support: latest version of Chrome, Firefox, Safari, Opera, Chrome Mobile iOS, and Mobile Safari. IE10 and IE11.
IE9 only needs a polyfill for `classList` to make all tests pass.

You can opt-in to work with live Node and NodeList objects (instead of the Array-like `$` objects).
In this mode, the native `Node` and `NodeList` prototypes are augmented to fill up the chainable API,
like `forEach`, `addClass`, `append`, `on`.

[Annotated source](http://webpro.github.io/jquery-evergreen)

[MIT licensed](http://webpro.mit-license.org)

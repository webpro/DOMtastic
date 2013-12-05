---
layout: index
type: project
title: jquery-evergreen
---

# jQuery Evergreen

Small & fast DOM and event library for modern browsers.
Having the same familiar API as jQuery (but without the extra "weight" of modules like `$.ajax`, `$.animate`, and `$.Deferred`), it works great stand-alone or paired up with e.g. Backbone.
The full version is only 7KB minified (2KB gzip), but it's easy to create a custom build to exclude parts you don't need.

The [annotated](http://webpro.github.io/jquery-evergreen/main.html) source is written in the ES6 Modules format, and transpiled to an AMD and a CommonJS version using the [ES6 Module Transpiler](http://square.github.io/es6-module-transpiler/). And last but also least, the CommonJS version is "browserified".

## Quickstart

### AMD

    # Install
	bower install jquery-evergreen

	# Configure
	paths: {
		'jquery-evergreen': 'lib/jquery-evergreen/dist/jquery-evergreen.amd'
	}

	# Use
	define(['jquery-evergreen'], function($) {
		$('.earth').addClass('evergreen').on('sunrise', '.people', awake);
	});

### Browser Global

    # Install
	bower/npm install jquery-evergreen

	# Configure
	<script src="dist/jquery-evergreen.js"></script>

	# Use
	$('.planet').addClass('evergreen').on('sunrise', '.grass', grow);

## API

### [Attr](http://webpro.github.io/jquery-evergreen/je/attr.html)

	attr

### [Class](http://webpro.github.io/jquery-evergreen/je/class.html)

	addClass
	removeClass
	toggleClass
	hasClass

### [DOM](http://webpro.github.io/jquery-evergreen/je/dom.html)

	append
	before
	after

### [Event](http://webpro.github.io/jquery-evergreen/je/event.html)

	on
	off
	delegate
	undelegate
	trigger

### [HTML](http://webpro.github.io/jquery-evergreen/je/html.html)

	html

### [Mode](http://webpro.github.io/jquery-evergreen/je/mode.html)

	isNative
	native

### [Selector](http://webpro.github.io/jquery-evergreen/je/selector.html)

	$
	find

## Browser Support

Latest versions of Chrome, Firefox, Safari, Opera, Chrome Mobile iOS, and Mobile Safari. IE10 and IE11. IE9 only needs a polyfill for `classList` to make these tests pass.

## Native Mode

You can [opt-in](http://webpro.github.io/jquery-evergreen/je/mode.html) to work directly with `Node` and live `NodeList` objects, as opposed to the default, wrapped `$` object.

## Custom Build

	npm install jquery-evergreen
	cd jquery-evergreen
	npm install
	grunt --exclude=attr,mode,html

And find the AMD, CommonJS and browserified versions in the `/dist` folder.

## Test

Run the [test suite](./test/). You can also get it from Github or npm, and find the `/test` folder.

## Credits

Many thanks to these sources of inspiration:

* [remy/min.js](https://github.com/remy/min.js)
* [Knockout](https://github.com/knockout/knockout/blob/master/src/utils.js)
* [inkling/Backbone.Native](https://github.com/inkling/backbone.native/blob/master/backbone.native.js)
* [madrobby/zepto](https://github.com/madrobby/zepto/)

## License

[MIT licensed](http://webpro.mit-license.org)

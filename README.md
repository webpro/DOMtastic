# DOMtastic

Small & fast DOM and event library for modern browsers.
Having the same familiar API as jQuery (but without the extra "weight" of modules like `$.ajax`, `$.animate`, and `$.Deferred`), it works great stand-alone or paired up with e.g. Backbone.
The library is only 3-4KB (min+gzip), and it's easy to create a custom build to exclude parts you don't need.

The [source](https://github.com/webpro/DOMtastic) is written using ES6 features, and transpiled to AMD and CommonJS with [Traceur](https://github.com/google/traceur-compiler). Browserify is used to create a [UMD](https://github.com/umdjs/umd) bundle (supporting AMD, CommonJS, and fallback to browser global).

This library was recently renamed from "jQuery Evergreen".

## Quicklinks

* [domtastic.min.js](https://cdn.jsdelivr.net/domtastic/0.7/domtastic.min.js) (auto-updating release in 0.7.x branch on [jsDelivr CDN](http://www.jsdelivr.com/#!domtastic))
* [API Docs](http://webpro.github.io/DOMtastic/doc/)
* [Run tests](http://webpro.github.io/DOMtastic/test/)
* [Run benchmarks](http://webpro.github.io/DOMtastic/benchmark/) (results: [class](http://www.browserscope.org/user/tests/table/agt1YS1wcm9maWxlcnIRCxIEVGVzdBiAgICkvo7WCQw?v=3&layout=simple), [constructor](http://www.browserscope.org/user/tests/table/agt1YS1wcm9maWxlcnIRCxIEVGVzdBiAgICkyo2ECQw?v=3&layout=simple), [DOM](http://www.browserscope.org/user/tests/table/agt1YS1wcm9maWxlcnIRCxIEVGVzdBiAgIDk0Jv_Cgw?v=3&layout=simple), [selector](http://www.browserscope.org/user/tests/table/agt1YS1wcm9maWxlcnIRCxIEVGVzdBiAgICkzLXNCAw?v=3&layout=simple))
* [Coverage report](http://webpro.github.io/DOMtastic/coverage/dist/domtastic.js.html)
* [Complexity report](http://webpro.github.io/DOMtastic/complexity/)

[![Build Status](https://travis-ci.org/webpro/DOMtastic.png?branch=master)](https://travis-ci.org/webpro/DOMtastic)
[![Coverage Status](https://coveralls.io/repos/webpro/DOMtastic/badge.png?branch=master)](https://coveralls.io/r/webpro/DOMtastic?branch=master)
[![Selenium Test Status](https://saucelabs.com/buildstatus/webpro)](https://saucelabs.com/u/webpro)

## Quickstart

### CommonJS

    # Install
	npm install domtastic

	# Use
	var $ = require('domtastic');

### AMD

    # Install
	bower install domtastic

	# Configure
	paths: {
		'domtastic': 'bower_components/domtastic/domtastic'
	}

	# Use
	define(['domtastic'], function($) {
		$('.earth').addClass('evergreen').on('sunrise', '.people', awake);
	});

### Browser Global

	# Configure
	<script src="//cdn.jsdelivr.net/domtastic/latest/domtastic.min.js"></script>

	# Use
	$('.planet').addClass('evergreen').on('sunrise', '.grass', grow);

## API

### [Array](http://webpro.github.io/DOMtastic/doc/#array)

    every
    filter
    forEach
    indexOf
    map
    reverse
    some

### [Attr](http://webpro.github.io/DOMtastic/doc#attr)

	attr
	removeAttr

### [Class](http://webpro.github.io/DOMtastic/doc#class)

	addClass
	removeClass
	toggleClass
	hasClass

### [DOM](http://webpro.github.io/DOMtastic/doc#dom)

	after
	append
	before
	clone
	prepend

### [Event](http://webpro.github.io/DOMtastic/doc#event)

	on
	off
	delegate
	undelegate
	trigger
	triggerHandler
	ready

### [HTML](http://webpro.github.io/DOMtastic/doc#html)

	html

### [NoConflict](http://webpro.github.io/DOMtastic/doc#noconflict)

	noConflict

### [Selector](http://webpro.github.io/DOMtastic/doc#selector)

	$
	find


## API (bare)

The pre-built "bare" package does *not* include the `attr`, `data`, and `html` modules.

## API (full)

The pre-built "full" package also includes the following modules:

### [DOM (extra)](http://webpro.github.io/DOMtastic/doc#dom_extra)

	appendTo
    remove
    replaceWith
    val
    text

### [Mode](http://webpro.github.io/DOMtastic/doc#mode)

	isNative
	native

### [Selector (extra)](http://webpro.github.io/DOMtastic/doc#selector_extra)

	children
	contents
	closest
	eq
	get
	parent
	slice

## But it doesn't even have ...!

As mentioned in the introduction, DOMtastic doesn't have methods for your Ajax, Animation and Deferred needs. Please find your own libraries to fill in the gaps as needed. Here are just some examples:

* Ajax: [microjs#ajax](http://microjs.com/#ajax), [rest.js](https://github.com/cujojs/rest)
* Animation: [microjs#animation](http://microjs.com/#animation), [Move.js](http://visionmedia.github.io/move.js/), [Animate.css](https://daneden.me/animate/)
* Deferred (aka promises): [when.js](https://github.com/cujojs/when), [RSVP.js](https://github.com/tildeio/rsvp.js)

However, feel free to [open an issue](https://github.com/webpro/DOMtastic/issues) if you feel an important method is missing.

## Browser Support

[![Selenium Test Status](https://saucelabs.com/browser-matrix/webpro.svg)](https://saucelabs.com/u/webpro)

Latest versions of Chrome, Firefox, Safari, Opera, Chrome Mobile iOS, and Mobile Safari. IE10 and IE11. IE9 only needs a polyfill for `classList` to make these tests pass.

## Performance

Run the [benchmark suite](http://webpro.github.io/DOMtastic/benchmark/) to compare the performance of various methods of jQuery, Zepto and DOMtastic.

## Native Mode

You can [opt-in](https://github.com/webpro/DOMtastic/blob/master/src/mode.js) to work directly with `Node` and live `NodeList` objects, as opposed to the default, wrapped `$` object.

## Custom Build

	git clone git@github.com:webpro/DOMtastic.git
	cd DOMtastic
	npm install
	gulp --exclude=attr,mode,html

And find the output in the `dist/` folder.

## Test

Run the [test suite](http://webpro.github.io/DOMtastic/test/). You can also clone/fork the sources from Github and run tests locally.

## Credits

Many thanks to these sources of inspiration:

* [remy/min.js](https://github.com/remy/min.js)
* [Knockout](https://github.com/knockout/knockout/blob/master/src/utils.js)
* [inkling/Backbone.Native](https://github.com/inkling/backbone.native/blob/master/backbone.native.js)
* [madrobby/zepto](https://github.com/madrobby/zepto/)

Thanks to [jsDelivr](http://www.jsdelivr.com/) for [hosting DOMtastic](http://www.jsdelivr.com/#!domtastic).

## License

[MIT licensed](http://webpro.mit-license.org)

![Analytics](https://ga-beacon.appspot.com/UA-17415234-3/jquery-evergreen/readme?pixel)

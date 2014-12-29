# DOMtastic

* Small, fast, and modular **DOM & Event** library for modern browsers.
* Same familiar API as jQuery (but without the extra "weight" of modules like `$.ajax`, `$.animate`, and `$.Deferred`).
* Weighs in at only 3 to 14KB (minified), depending on included modules. Full bundle is under 5KB gzipped.
* Works great stand-alone or paired up with e.g. Backbone or Angular.
* The [source](https://github.com/webpro/DOMtastic) is written in ES6 format, and transpiled to AMD and CommonJS with [6to5](https://6to5.github.io/).
* Browserify is used to create a [UMD](https://github.com/umdjs/umd) bundle (supporting AMD, CommonJS, and fallback to browser global).
* Easy to create a [custom build](#custom-build) to include or exclude parts.
* DOMtastic also serves as a starting point for your own application-specific DOM API ([read more](#Build-a-custom-API-for-your-application)).

## Quicklinks

* Bundled sources: [domtastic.js](https://cdn.jsdelivr.net/domtastic/0.8/domtastic.js), [domtastic.min.js](https://cdn.jsdelivr.net/domtastic/0.8/domtastic.min.js)
* [API documentation](http://webpro.github.io/DOMtastic/doc/)
* [Run tests](http://webpro.github.io/DOMtastic/test/)
* Coverage: [Istanbul](http://webpro.github.io/DOMtastic/coverage/dist/domtastic.js.html), [Coveralls](https://coveralls.io/r/webpro/DOMtastic)
* Complexity: [Plato](http://webpro.github.io/DOMtastic/complexity/)
* [Run benchmarks](http://webpro.github.io/DOMtastic/benchmark/) (results: [class](http://www.browserscope.org/user/tests/table/agt1YS1wcm9maWxlcnIRCxIEVGVzdBiAgICkvo7WCQw?v=3&layout=simple), [constructor](http://www.browserscope.org/user/tests/table/agt1YS1wcm9maWxlcnIRCxIEVGVzdBiAgICkyo2ECQw?v=3&layout=simple), [DOM](http://www.browserscope.org/user/tests/table/agt1YS1wcm9maWxlcnIRCxIEVGVzdBiAgIDk0Jv_Cgw?v=3&layout=simple), [selector](http://www.browserscope.org/user/tests/table/agt1YS1wcm9maWxlcnIRCxIEVGVzdBiAgICkzLXNCAw?v=3&layout=s
p
le))

[![Build Status](https://travis-ci.org/webpro/DOMtastic.png?branch=master)](https://travis-ci.org/webpro/DOMtastic)
[![Coverage Status](https://coveralls.io/repos/webpro/DOMtastic/badge.png?branch=master)](https://coveralls.io/r/webpro/DOMtastic?branch=master)
[![Selenium Test Status](https://saucelabs.com/buildstatus/webpro)](https://saucelabs.com/u/webpro)
[![Code Climate](https://codeclimate.com/github/webpro/DOMtastic-release/badges/gpa.svg)](https://codeclimate.com/github/webpro/DOMtastic-release)

## Usage

### CommonJS / Browserify

```bash
npm install domtastic
```

```javascript
var $ = require('domtastic');
```

### AMD

```bash
bower install domtastic
```

```json
paths: {
    "domtastic": "bower_components/domtastic/amd/index"
}
```

```javascript
define(['domtastic'], function($) {
    $('.earth').addClass('evergreen').on('sunrise', '.people', awake);
});
```

### Browser Global

```html
<script src="//cdn.jsdelivr.net/domtastic/0.8/domtastic.min.js"></script>
```

```javascript
$('.planet').addClass('evergreen').on('sunrise', '.grass', grow);
```

## API

### [Array](http://webpro.github.io/DOMtastic/doc/#array)

    every
    filter
    forEach (alias: each)
    indexOf
    map
    pop
    push
    reverse
    shift
    some
    unshift

### [Attr](http://webpro.github.io/DOMtastic/doc#attr)

    attr
    removeAttr

### [Class](http://webpro.github.io/DOMtastic/doc#class)

    addClass
    hasClass
    removeClass
    toggleClass

### [Contains](http://webpro.github.io/DOMtastic/doc#contains)

    contains

### [CSS](http://webpro.github.io/DOMtastic/doc#css)

    css

### [Data](http://webpro.github.io/DOMtastic/doc#data)

    data
    prop

### [DOM](http://webpro.github.io/DOMtastic/doc#dom)

    after
    append
    before
    clone
    prepend

### [DOM (extra)](http://webpro.github.io/DOMtastic/doc#dom_extra)

    appendTo
    empty
    remove
    replaceWith
    text
    val

### [Event](http://webpro.github.io/DOMtastic/doc#event)

    on (alias: bind)
    off (alias: unbind)
    trigger
    triggerHandler

### [HTML](http://webpro.github.io/DOMtastic/doc#html)

    html

### [NoConflict](http://webpro.github.io/DOMtastic/doc#noconflict)

    noConflict

### [Ready](http://webpro.github.io/DOMtastic/doc#ready)

    ready

### [Selector](http://webpro.github.io/DOMtastic/doc#selector)

    $
    closest
    find
    matches

### [Selector (extra)](http://webpro.github.io/DOMtastic/doc#selector_extra)

    children
    contents
    eq
    get
    parent
    slice

### [Trigger](http://webpro.github.io/DOMtastic/doc#trigger)

    trigger
    triggerHandler

### [Type](http://webpro.github.io/DOMtastic/doc#type)

    isArray
    isFunction

## But it doesn't even have _awesomest-method_!

As mentioned in the introduction, DOMtastic doesn't feature methods for Ajax, Animation, Promise, etc. Please find your own libraries to fill in the gaps as needed. Here are just some examples:

* Ajax: [microjs#ajax](http://microjs.com/#ajax), [rest.js](https://github.com/cujojs/rest)
* Animation: [microjs#animation](http://microjs.com/#animation), [Move.js](http://visionmedia.github.io/move.js/), [Animate.css](https://daneden.me/animate/)
* Promises: [when.js](https://github.com/cujojs/when), [RSVP.js](https://github.com/tildeio/rsvp.js)

Please note that you can extend the `$.fn` object, just like [jQuery Plugins](http://learn.jquery.com/plugins/basic-plugin-creation/).

Feel free to [open an issue](https://github.com/webpro/DOMtastic/issues) if you feel an important method is missing.

## Browser Support

[![Selenium Test Status](https://saucelabs.com/browser-matrix/webpro.svg)](https://saucelabs.com/u/webpro)

Latest versions of Chrome, Firefox, Safari, Opera, Android, Chrome Mobile iOS, and Mobile Safari. Internet Explorer 10 and up. IE9 only needs a polyfill for `classList` to make these tests pass.

## Performance

Run the [benchmark suite](http://webpro.github.io/DOMtastic/benchmark/) to compare the performance of various methods of jQuery, Zepto and DOMtastic (tl/dr; it's fast!).

## Custom Build

You can build a custom bundle that _excludes_ specific modules that you don't need:

```bash
git clone git@github.com:webpro/DOMtastic.git
cd DOMtastic
npm install
bin/custom --exclude=attr,html,trigger
```

Alternatively, you can do the opposite and _include_ what you need:

```bash
bin/custom --include=selector,class
```

Find the output in the `dist/` folder.

### Build a custom API for your application

You can also build a custom API from the ground up. By default, DOMtastic [does it](https://github.com/webpro/DOMtastic/blob/master/src/index.js) for you, but you can easily do it yourself in a highly custom approach. Grab the `$` function from the `selector`, and extend the `$.fn` object with methods from specific modules:

```javascript
var selector = require('domtastic/commonjs/selector'),
    dom = require('domtastic/commonjs/dom');

var $ = selector.$;
$.fn = {};
$.fn.append = dom.append; // Or e.g. _.extend($, dom)
$.fn.prepend = dom.prepend;

module.exports = $;
```

This way, you don't have the slight overhead of the UMD boilerplate in a custom bundle, and a single location/module to define the API for your application. Works great with either AMD or Browserify.

## Tests

Run the hosted [test suite](http://webpro.github.io/DOMtastic/test/) in your browser. You can also clone/fork the sources from Github, and run the tests locally (using `npm test`).

## Credits

Many thanks to these sources of inspiration:

* [jQuery](http://jquery.com/)
* [madrobby/zepto](https://github.com/madrobby/zepto/)
* [remy/min.js](https://github.com/remy/min.js)
* [Knockout](https://github.com/knockout/knockout/blob/master/src/utils.js)
* [inkling/Backbone.Native](https://github.com/inkling/backbone.native/blob/master/backbone.native.js)

Thanks to [jsDelivr](http://www.jsdelivr.com/) for [hosting DOMtastic](http://www.jsdelivr.com/#!domtastic).

## License

[MIT](http://webpro.mit-license.org)

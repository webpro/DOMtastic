# DOMtastic

Small, fast, and modular DOM and event library for modern browsers.
Having the same familiar API as jQuery (but without the extra "weight" of modules like `$.ajax`, `$.animate`, and `$.Deferred`), it works great stand-alone or paired up with e.g. Backbone or Angular.
It's easy to create a custom build to include or exclude parts, while the library weighs in at only 3 to 14KB (minified).

The [source](https://github.com/webpro/DOMtastic) is written using ES6 features, and transpiled to AMD and CommonJS with [Traceur](https://github.com/google/traceur-compiler). Browserify is used to create a [UMD](https://github.com/umdjs/umd) bundle (supporting AMD, CommonJS, and fallback to browser global). However, you are encouraged to pick the modules you want in your Browserify or AMD setup, without any overhead ([read more](#Build-a-custom-API-for-your-application)).

This library was recently renamed from "jQuery Evergreen".

## Quicklinks

* [domtastic.min.js](https://cdn.jsdelivr.net/domtastic/0.8/domtastic.min.js) (auto-updating release in 0.8.x branch on [jsDelivr CDN](http://www.jsdelivr.com/#!domtastic))
* [API Docs](http://webpro.github.io/DOMtastic/doc/)
* [Run tests](http://webpro.github.io/DOMtastic/test/)
* [Run benchmarks](http://webpro.github.io/DOMtastic/benchmark/) (results: [class](http://www.browserscope.org/user/tests/table/agt1YS1wcm9maWxlcnIRCxIEVGVzdBiAgICkvo7WCQw?v=3&layout=simple), [constructor](http://www.browserscope.org/user/tests/table/agt1YS1wcm9maWxlcnIRCxIEVGVzdBiAgICkyo2ECQw?v=3&layout=simple), [DOM](http://www.browserscope.org/user/tests/table/agt1YS1wcm9maWxlcnIRCxIEVGVzdBiAgIDk0Jv_Cgw?v=3&layout=simple), [selector](http://www.browserscope.org/user/tests/table/agt1YS1wcm9maWxlcnIRCxIEVGVzdBiAgICkzLXNCAw?v=3&layout=simple))
* [Coverage report](http://webpro.github.io/DOMtastic/coverage/dist/domtastic.js.html) ([Coveralls](https://coveralls.io/r/webpro/DOMtastic))
* [Complexity report](http://webpro.github.io/DOMtastic/complexity/)

[![Build Status](https://travis-ci.org/webpro/DOMtastic.png?branch=master)](https://travis-ci.org/webpro/DOMtastic)
[![Coverage Status](https://coveralls.io/repos/webpro/DOMtastic/badge.png?branch=master)](https://coveralls.io/r/webpro/DOMtastic?branch=master)
[![Selenium Test Status](https://saucelabs.com/buildstatus/webpro)](https://saucelabs.com/u/webpro)

## Quickstart

### CommonJS / Browserify

#### Install

```bash
npm install domtastic
```

#### Use

```javascript
var $ = require('domtastic');
```

### AMD

#### Install

```bash
bower install domtastic
```

#### Configure

```json
paths: {
    'domtastic': 'bower_components/domtastic/amd/index'
}
```

#### Use

```javascript
define(['domtastic'], function($) {
    $('.earth').addClass('evergreen').on('sunrise', '.people', awake);
});
```

### Browser Global

#### Use

```html
<script src="//cdn.jsdelivr.net/domtastic/0.8/domtastic.min.js"></script>
```

```javascript
$('.planet').addClass('evergreen').on('sunrise', '.grass', grow);
```

### Bundles

After installation using npm or Bower, the `bundle` folder is where you can find some pre-built bundles: `bare`, `default`, and `full`. These are UMD bundles to include however you like: CommonJS, AMD, or directly in a `<script>` tag. Below you can find what exactly these bundles include.

## API

### [Array](http://webpro.github.io/DOMtastic/doc/#array)

    every
    filter
    forEach
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
    removeClass
    toggleClass
    hasClass

### [Contains](http://webpro.github.io/DOMtastic/doc#contains)

    contains

### [DOM](http://webpro.github.io/DOMtastic/doc#dom)

    after
    append
    before
    clone
    prepend

### [Event](http://webpro.github.io/DOMtastic/doc#event)

    on
    off
    delegate (deprecated, will be removed soon)
    undelegate (deprecated, will be removed soon)
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


## API (bare)

The pre-built "bare" bundle does *not* include the `attr`, `data`, `html`, `ready` modules.

## API (full)

The pre-built "full" bundle also includes the following modules:

### [CSS](http://webpro.github.io/DOMtastic/doc#css)

    css

### [Data](http://webpro.github.io/DOMtastic/doc#data)

    data
    prop

### [DOM (extra)](http://webpro.github.io/DOMtastic/doc#dom_extra)

    appendTo
    empty
    remove
    replaceWith
    text
    val

### [Mode](http://webpro.github.io/DOMtastic/doc#mode)

    isNative
    native

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

## But it doesn't even have _[awesomest-method]_!

As mentioned in the introduction, DOMtastic doesn't have methods for your Ajax, Animation, Deferred, and whatnot needs. Please find your own libraries to fill in the gaps as needed. Here are just some examples:

* Ajax: [microjs#ajax](http://microjs.com/#ajax), [rest.js](https://github.com/cujojs/rest)
* Animation: [microjs#animation](http://microjs.com/#animation), [Move.js](http://visionmedia.github.io/move.js/), [Animate.css](https://daneden.me/animate/)
* Deferred (aka promises): [when.js](https://github.com/cujojs/when), [RSVP.js](https://github.com/tildeio/rsvp.js)

Additionally, you can extend the `$.fn` object just like [jQuery Plugins](http://learn.jquery.com/plugins/basic-plugin-creation/).

Feel free to [open an issue](https://github.com/webpro/DOMtastic/issues) if you feel an important method is missing.

## Browser Support

[![Selenium Test Status](https://saucelabs.com/browser-matrix/webpro.svg)](https://saucelabs.com/u/webpro)

Latest versions of Chrome, Firefox, Safari, Opera, Android, Chrome Mobile iOS, and Mobile Safari. IE10 and IE11. IE9 only needs a polyfill for `classList` to make these tests pass.

## Performance

Run the [benchmark suite](http://webpro.github.io/DOMtastic/benchmark/) to compare the performance of various methods of jQuery, Zepto and DOMtastic (tl/dr; it's fast!).

## Native Mode

You can [opt-in](https://github.com/webpro/DOMtastic/blob/master/src/mode.js) to work directly with `Node` and live `NodeList` objects, as opposed to the default, wrapped `$` object. Just make sure the "mode" module is present (i.e. in the "full" or a custom build):

	$.native();
    var elements = $('.items');
    elements instanceof NodeList; // true
    elements.addClass('cool'); // works

## Custom Build

You can build a UMD bundle that _excludes_ specific modules that you don't need:

```bash
git clone git@github.com:webpro/DOMtastic.git
cd DOMtastic
npm install
gulp --exclude=attr,mode,html
```

Alternatively, you can do the opposite and _include_ what you need:

```bash
gulp --include=selector,class
```

Find the output in the `dist/` folder.

### Build a custom API for your application

You can also build a custom API from the ground up. By default, DOMtastic [does it](https://github.com/webpro/DOMtastic/blob/master/src/api.js) for you, but you can easily do it yourself in a highly custom approach. Grab the `$` function from the `selector`, and extend the `$.fn` object with methods from specific modules:

```javascript
var selector = require('domtastic/commonjs/selector'),
    class_ = require('domtastic/commonjs/class');

var $ = selector.$;
$.fn = {};
$.fn.addClass = class_.addClass; // Or e.g. _.extend($, class_)
$.fn.removeClass = class_.removeClass;

module.exports = $;
```

This way, you don't have the overhead of the UMD boilerplate in a custom bundle, and a single location/module to define the API for your application. Works great with Browserify.

## Test

Run the hosted [test suite](http://webpro.github.io/DOMtastic/test/). You can also clone/fork the sources from Github, and run the tests locally.

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

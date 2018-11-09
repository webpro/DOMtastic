# DOMtastic

* Small, fast, and modular **DOM & Event** library for modern browsers.
* Same familiar API as jQuery (but without the extra "weight" of modules like `$.ajax`, `$.animate`, and `$.Deferred`).
* Dependency-free. Weighs in at only 1KB to 12KB (minified), depending on included modules. Full bundle is about 4KB gzipped.
* Works great stand-alone or paired up with e.g. Backbone or Angular.
* The [source](https://github.com/webpro/DOMtastic) is written in ES6 format.
* [Rollup](http://rollupjs.org) and [babel](https://babeljs.io) are used to create a [UMD](https://github.com/umdjs/umd) bundle (supporting AMD, CommonJS, and fallback to browser global).
* Supercharge your components and extend from the [base class](#es6-class).
* Easy to create a [custom build](#custom-build) to include or exclude parts.
* DOMtastic also serves as a starting point for your own application-specific DOM API ([read more](#build-a-custom-api-for-your-application)).

## Quicklinks

* Bundled sources: [domtastic.js](https://cdn.jsdelivr.net/npm/domtastic@latest/dist/domtastic.js), [domtastic.min.js](https://cdn.jsdelivr.net/npm/domtastic@latest/dist/domtastic.min.js)
* [API documentation](https://domtastic.js.org/doc/)
* [Run tests](https://domtastic.js.org/test/)
* Coverage: [Istanbul](https://domtastic.js.org/coverage/), [Coveralls](https://coveralls.io/github/webpro/DOMtastic)
* [Run benchmarks](https://domtastic.js.org/benchmark/)

[![Build Status](https://travis-ci.org/webpro/DOMtastic.png?branch=master)](https://travis-ci.org/webpro/DOMtastic)
[![Coverage Status](https://coveralls.io/repos/github/webpro/DOMtastic/badge.svg)](https://coveralls.io/github/webpro/DOMtastic)
![BrowserStack Status](https://www.browserstack.com/automate/badge.svg?badge_key=MUcvSm9ES1VaYlpTMnk0NytOVDdML3FxRlJNM0VNR2RQdnBPMGduNUowZz0tLUNHWkJ4V2t0SXNqUkRRQUJjTWVnekE9PQ==--c64c417a0144336c1f174ecbe35b4801f82b74e0)
[![Code Climate](https://codeclimate.com/github/webpro/DOMtastic/badges/gpa.svg)](https://codeclimate.com/github/webpro/DOMtastic)
[![Greenkeeper Badge](https://badges.greenkeeper.io/webpro/DOMtastic.svg)](https://greenkeeper.io)
[![gzip size](http://img.badgesize.io/https://unpkg.com/domtastic/dist/domtastic.min.js?compression=gzip)](https://unpkg.com/domtastic/dist/domtastic.min.js)
[![](https://data.jsdelivr.com/v1/package/npm/domtastic/badge)](https://www.jsdelivr.com/package/npm/domtastic)

## Usage

### ES6 (with e.g. Babel)

```bash
npm install domtastic
```

```javascript
import $ from 'domtastic';
```

### CommonJS (with e.g. Browserify)

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

```javascript
requirejs.config({
    baseUrl: 'bower_components',
    packages: [{
        name: 'domtastic',
        main: 'domtastic'
    }]
});

require(['domtastic'], function($) {
    $('.earth').addClass('evergreen').on('sunrise', '.people', awake);
});
```

### Browser Global

```html
<script src="//cdn.jsdelivr.net/npm/domtastic"></script>
```

```javascript
$('.planet').addClass('evergreen').on('sunrise', '.grass', grow);
```

### ES6 Class

```javascript
import $ from 'domtastic';

class MyComponent extends $.BaseClass {
    progress(value) {
        return this.attr('data-progress', value);
    }
}

let component = new MyComponent('.my-anchor');
component.progress('ive').append('<p>enhancement</p>');
```

Read more in the [baseClass article](https://medium.com/@webprolific/domtastic-s-baseclass-437f142e8bf4) or the [docs](https://domtastic.js.org/doc/#baseClass).

## API

### [Array](https://domtastic.js.org/doc/#array)

    every
    filter
    forEach (alias: each)
    indexOf
    map
    pop
    push
    reduce
    reduceRight
    reverse
    shift
    some
    unshift

### [CSS](https://domtastic.js.org/doc#css)

    css

### [DOM](https://domtastic.js.org/doc/#dom/index)

    after
    append
    before
    clone
    prepend

### [DOM/attr](https://domtastic.js.org/doc#dom/attr)

    attr
    removeAttr

### [DOM/class](https://domtastic.js.org/doc#dom/class)

    addClass
    hasClass
    removeClass
    toggleClass

### [DOM/contains](https://domtastic.js.org/doc#dom/contains)

    contains

### [DOM/data](https://domtastic.js.org/doc#dom/data)

    data
    prop

### [DOM/extra](https://domtastic.js.org/doc#dom/extra)

    appendTo
    empty
    remove
    replaceWith
    text
    val

### [DOM/html](https://domtastic.js.org/doc#dom/html)

    html

### [Event](https://domtastic.js.org/doc/#event/index)

    on (alias: bind)
    off (alias: unbind)
    one

### [Event/ready](https://domtastic.js.org/doc#event/ready)

    ready

### [Event/trigger](https://domtastic.js.org/doc#event/trigger)

    trigger
    triggerHandler

### [NoConflict](https://domtastic.js.org/doc#noconflict)

    noConflict

### [Selector](https://domtastic.js.org/doc/#selector/index)

    $
    find
    matches

### [Selector/closest](https://domtastic.js.org/doc#selector/closest)

    closest

### [Selector/extra](https://domtastic.js.org/doc#selector/extra)

    children
    concat
    contents
    eq
    first
    get
    parent
    siblings
    slice

### [Type](https://domtastic.js.org/doc#type)

    isArray
    isFunction

### [Util](https://domtastic.js.org/doc/#util)

    extend

## But it doesn't even have _awesomest-method_!

As mentioned in the introduction, DOMtastic doesn't feature methods for Ajax, Animation, Promise, etc. Please find your own libraries to fill in the gaps as needed. Here are just some examples:

* Ajax: [microjs#ajax](http://microjs.com/#ajax), [rest.js](https://github.com/cujojs/rest)
* Animation: [microjs#animation](http://microjs.com/#animation), [Move.js](http://visionmedia.github.io/move.js/), [Animate.css](https://daneden.me/animate/)
* Promises: [when.js](https://github.com/cujojs/when), [RSVP.js](https://github.com/tildeio/rsvp.js)

Please note that you can extend the `$.fn` object, just like [jQuery Plugins](http://learn.jquery.com/plugins/basic-plugin-creation/).

Feel free to [open an issue](https://github.com/webpro/DOMtastic/issues) if you feel an important method is missing.

## Browser Support

Latest versions of Chrome, Firefox, Safari, Opera, Android, Chrome Mobile iOS, and Mobile Safari. Internet Explorer 10 and up. IE9 requires a polyfill for `classList`.

## Performance

Run the [benchmark suite](https://domtastic.js.org/benchmark/) to compare the performance of various methods of jQuery, Zepto and DOMtastic (tl/dr; it's fast!).

## Custom Build

You can build a custom bundle that _excludes_ specific modules that you don't need:

```bash
git clone git@github.com:webpro/DOMtastic.git
cd DOMtastic
npm install
npm run bundle -- --exclude=css,dom/html,event/trigger
```

Alternatively, you can do the opposite and _include_ what you need:

```bash
npm run bundle -- --include=array,selector/index,dom/class
```

Find the output in the `dist/` folder.

### jQuery Compatibility

Some iterator method signatures in jQuery are different (i.e. non-standard), most notably the `index` before `element` argument in `each`, `filter` and `map`). However, a custom build that is compatible with jQuery can be created by using the `--jquery-compat` flag:

```bash
npm run bundle -- --jquery-compat
```

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

Run the hosted [test suite](https://domtastic.js.org/test/) in your browser. You can also clone this repo, and run the tests locally with [jsdom](https://github.com/tmpvar/jsdom) (using `npm test`). Run `npm run test:bs` to run the tests in real browsers using BrowserStack.

## Credits

Many thanks to these sources of inspiration:

* [jQuery](http://jquery.com/)
* [madrobby/zepto](https://github.com/madrobby/zepto/)
* [remy/min.js](https://github.com/remy/min.js)
* [Knockout](https://github.com/knockout/knockout/blob/master/src/utils.js)
* [inkling/Backbone.Native](https://github.com/inkling/backbone.native/blob/master/backbone.native.js)

Thanks to the [jsDelivr Open Source CDN](https://www.jsdelivr.com/) for [hosting DOMtastic](https://www.jsdelivr.com/projects/domtastic).

[<img src="https://www.jsdelivr.com/img/logo@2x.png" width="300">](https://www.jsdelivr.com)

Thanks to [BrowserStack](https://www.browserstack.com) for their real device cloud.

[<img src="https://cloud.githubusercontent.com/assets/7864462/12837037/452a17c6-cb73-11e5-9f39-fc96893bc9bf.png" width="300">](https://www.browserstack.com)

## License

[MIT](http://webpro.mit-license.org)

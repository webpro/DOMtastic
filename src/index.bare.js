/**
 * @module API
 */

import { extend } from './util';

var api = {},
    $ = {};

// Import modules to build up the API

import * as array from './array';
import * as class_ from './class';
import * as contains from './contains';
import * as dom from './dom';
import * as event from './event';
import * as selector from './selector';

if (typeof selector !== 'undefined') {
    $ = selector.$;
    $.matches = selector.matches;
    api.find = selector.find;
    api.closest = selector.closest;
}

extend($, contains);
extend(api, array, class_, dom, event);

// Version

$.version = '__VERSION__';

// Util

$.extend = extend;

// Compatibility for jQuery plugins

$.fn = api;

// Export interface

export default $;

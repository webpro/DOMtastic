/**
 * @module API
 */

import { extend, extendAll } from './util';

var api = {},
    $ = {};

// Import modules to build up the API

import * as array from './array';
import * as attr from './attr';
import * as class_ from './class';
import * as contains from './contains';
import * as dom from './dom';
import * as event from './event';
import * as html from './html';
import * as noconflict from './noconflict';
import * as ready from './ready';
import * as selector from './selector';

if (typeof selector !== 'undefined') {
    $ = selector.$;
    $.matches = selector.matches;
    api.find = selector.find;
    api.closest = selector.closest;
}

extendAll($, contains, noconflict);
extendAll(api, array, attr, class_, dom, event, html, ready);

// Version

$.version = '__VERSION__';

// Util

$.extend = extend;

// Compatibility for jQuery plugins

$.fn = api;

// Export interface

export default $;

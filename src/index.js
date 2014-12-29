/**
 * @module API
 */

import { extend } from './util';

var api = {},
    $ = {};

// Import modules to build up the API

import * as array from './array';
import * as attr from './attr';
import * as class_ from './class';
import * as contains from './contains';
import * as css from './css';
import * as data from './data';
import * as dom from './dom';
import * as dom_extra from './dom_extra';
import * as event from './event';
import * as html from './html';
import * as noconflict from './noconflict';
import * as ready from './ready';
import * as selector from './selector';
import * as selector_extra from './selector_extra';
import * as trigger from './trigger';
import * as type from './type';

if (typeof selector !== 'undefined') {
    $ = selector.$;
    $.matches = selector.matches;
    api.find = selector.find;
    api.closest = selector.closest;
}

extend($, contains, noconflict, type);
extend(api, array, attr, class_, css, data, dom, dom_extra, event, html, ready, selector_extra, trigger);

$.fn = api;

// Version

$.version = '__VERSION__';

// Util

$.extend = extend;

// Export interface

export default $;

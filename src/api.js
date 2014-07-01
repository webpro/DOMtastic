/**
 * @module API
 */

import { extend } from './util';

var api = {},
    apiNodeList = {},
    $ = {};

// Import modules to build up the API

module array from './array';
module attr from './attr';
module class_ from './class';
module contains from './contains';
module css from './css';
module data from './data';
module dom from './dom';
module dom_extra from './dom_extra';
module event from './event';
module html from './html';
module mode from './mode';
module noconflict from './noconflict';
module ready from './ready';
module selector from './selector';
module selector_extra from './selector_extra';
module type from './type';

if (typeof selector !== 'undefined') {
    $ = selector.$;
    $.matches = selector.matches;
    api.find = selector.find;
    api.closest = selector.closest;
}

extend($, contains, mode, noconflict, type);
extend(api, array, attr, class_, css, data, dom, dom_extra, event, html, ready, selector_extra);
extend(apiNodeList, array);

// Version

$.version = '__VERSION__';

// Util

$.extend = extend;

// Internal properties to switch between default and native mode

$.fn = api;
$.fnList = apiNodeList;

// Export interface

export default $;

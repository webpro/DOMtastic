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
module className from './class';
module data from './data';
module dom from './dom';
module dom_extra from './dom_extra';
module event from './event';
module html from './html';
module selector from './selector';
module selector_extra from './selector_extra';
module type from './type';

if (selector !== undefined) {
    $ = selector.$;
    $.matches = selector.matches;
    api.find = selector.find;
}

module mode from './mode'; extend($, mode);
module noconflict from './noconflict'; extend($, noconflict);

extend(api, array, attr, className, data, dom, dom_extra, event, html, selector_extra, type);
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

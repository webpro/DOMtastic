/*
 * # API
 *
 * Import modules to build the API.
 */

var api = {},
    $ = {};

import attr from './attr';
api.attr = attr;

import { addClass, removeClass, toggleClass, hasClass } from './class';
api.addClass = addClass;
api.removeClass = removeClass;
api.toggleClass = toggleClass;
api.hasClass = hasClass;

import { append, before, after } from './dom';
api.append = append;
api.before = before;
api.after = after;

import { on, off, delegate, undelegate, trigger } from './event';
api.on = on;
api.off = off;
api.delegate = delegate;
api.undelegate = undelegate;
api.trigger = trigger;

import html from './html';
api.html = html;

import { $, find } from './selector';
api.find = find;

import { isNative, native } from './mode';
$.isNative = isNative;
$.native = native;

import noConflict from './noconflict';
$.noConflict = noConflict;

/*
 * The `apiNodeList` object represents the API that gets augmented onto
 * either the wrapped array or the native `NodeList` object.
 */

var apiNodeList = {};

['every', 'filter', 'forEach', 'map', 'reverse', 'some'].forEach(function(methodName) {
    apiNodeList[methodName] = Array.prototype[methodName];
});

/*
 * Augment the `$` function to be able to:
 *
 * - wrap the `$` objects and add the API methods
 * - switch to native mode
 */

$.getNodeMethods = function() {
    return api;
};

$.getNodeListMethods = function() {
    return apiNodeList;
};

$.apiMethods = function(api, apiNodeList) {

    var methods = apiNodeList,
        key;

    for (key in api) {
        methods[key] = api[key];
    }

    return methods;

}(api, apiNodeList);

// Export interface

export default $;

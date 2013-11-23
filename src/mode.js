/*
 * # Opt-in to Native Mode
 *
 * The default, non-intrusive mode is similar to how jQuery operates: working with static, array-like `$` objects:
 *
 *     $('.items').append('<span>foo</span>);
 *     $(document.body).on('click', '.tab', handler);
 *
 * However, you can opt-in to work with live NodeList objects.
 * In this "native" mode, the `Node` and `NodeList` prototypes are augmented (in a safe and reversible manner) to fill up the chainable API,
 * to enable working with `Node` and `NodeList` objects directly:
 *
 *     var collection = document.querySelectorAll('.items');
 *     collection.append('<span>foo</span>);
 *     collection.addClass('bar');
 *     collection.forEach(iteratorFn);
 *     collection.find('.more');
 *
 *     document.body.on('click', '.tab', handler)
 *
 * Note that in native mode, `$(selector)` can stil be used. It returns a NodeList.
 *
 * Build the lib using Grunt with `mode` not excluded.
 * Use `$.native()` to activate this behavior. The API is the same in both modes.
 */

import { $, api, apiNodeList } from './api';

var isNative = false;

var native = function(native) {
    var wasNative = isNative;
    isNative = typeof native === 'boolean' ? native : true;
    if($) {
        $.isNative = isNative;
    }
    if(!wasNative && isNative) {
        augmentNativePrototypes();
    }
    if(wasNative && !isNative) {
        unaugmentNativePrototypes();
    }
    return isNative;
};

var NodeProto = typeof Node !== 'undefined' && Node.prototype,
    NodeListProto = typeof NodeList !== 'undefined' && NodeList.prototype;

/*
 * Add a property (i.e. method) to an object in a safe and reversible manner.
 * Only add the method if object not already had it (non-inherited).
 */

var augment = function(obj, key, value) {
    if(!obj.hasOwnProperty(key)) {
        Object.defineProperty(obj, key, {
            value: value,
            configurable: true,
            enumerable: false
        });
    }
};

/*
 * Remove property from object (only inherited properties will be removed).
 */

var unaugment = function(obj, key) {
    delete obj[key];
};

/*
 * Augment native `Node` and `NodeList` objects in native mode.
 */

var augmentNativePrototypes = function() {

    var key;

    for(key in api) {
        augment(NodeProto, key, api[key]);
        augment(NodeListProto, key, api[key]);
    }

    for(key in apiNodeList) {
        augment(NodeListProto, key, apiNodeList[key]);
    }
};

/*
 * Unaugment native `Node` and `NodeList` objects to switch back to default mode.
 * Mainly used for tests.
 */

var unaugmentNativePrototypes = function() {

    var key;

    for(key in api) {
        unaugment(NodeProto, key);
        unaugment(NodeListProto, key);
    }

    for(key in apiNodeList) {
        unaugment(NodeListProto, key);
    }
};

/*
 * It's possible to have a custom build without the [selector](je/selector.html) API,
 * but in that case only the native mode makes sense.
 */

if(typeof $ === 'undefined') {
    native();
} else {
    $.isNative = isNative;
    $.native = native;
}

// Export interface

export { isNative, native };

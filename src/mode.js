/*
 * # Safe vs. Native Mode
 *
 * The default "safe" mode is similar to how jQuery works (returning an array-like object).
 *
 * However, you can opt-in to work with live Node and NodeList objects (instead of the Array-like `$` objects).
 * In this "native" mode, the `Node` and `NodeList` prototypes are augmented to fill up the chainable API,
 * like `forEach`, `addClass`, `append`, `on`.
 *
 * In this mode, an augmented NodeList is returned when using `$(selector)`.
 * Use `$.safeMode(false)` to activate this behavior.
 * The API is the same in both modes.
 */

import { api, apiNodeList } from 'api';

var $ = api.$;

var isSafe = true;

var safeMode = function(safe) {
    var wasSafe = isSafe;
    if(typeof safe === 'boolean') {
        isSafe = safe;
        if($) {
            $.isSafe = isSafe;
        }
    }
    if(wasSafe && !isSafe) {
        augmentNatives();
    }
    if(!wasSafe && isSafe) {
        unaugmentNatives();
    }
    return isSafe;
};

var NodeProto = Node.prototype,
    NodeListProto = NodeList.prototype;

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

var augmentNatives = function() {

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
 * Unaugment native `Node` and `NodeList` objects to switch back to safe mode.
 * Mainly used for tests.
 */

var unaugmentNatives = function() {

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
 * It's possible to have a custom build without the [selector](selector.html) API,
 * but in that case only the native mode makes sense.
 */

if(typeof $ === 'undefined') {
    safeMode(false);
} else {
    $.isSafe = isSafe;
    $.safeMode = safeMode;
}

// Export interface

export { isSafe, safeMode };

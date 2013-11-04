import { api, apiNodeList } from 'api';

var $ = api.$;

// Safe vs. Native Mode
// -------------------

// The default "safe" mode is similar to how jQuery works (returning an array-like object).

// However, you can opt-in to work with live Node and NodeList objects (instead of the Array-like `$` objects).
// In this "native" mode, the `Node` and `NodeList` prototypes are augmented to fill up the chainable API,
// like `forEach`, `addClass`, `append`, `on`.

// In this mode, an augmented NodeList is returned when using `$(selector)`.
// Use `$.safeMode(false)` to activate this behavior.
// The API is the same in both modes.

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
    NodeListProto = NodeList.prototype,
    NodeProtoOriginals = {},
    NodeListProtoOriginals = {};

// Augment native `Node` and `NodeList` objects in native mode.

var augmentNatives = function() {

    var key;

    for(key in api) {
        NodeProtoOriginals[key] = NodeProto[key];
        NodeListProtoOriginals[key] = NodeListProto[key];
        NodeProto[key] = api[key];
        NodeListProto[key] = api[key];
    }

    for(key in apiNodeList) {
        NodeListProtoOriginals[key] = NodeListProto[key];
        NodeListProto[key] = apiNodeList[key];
    }
};

// Unaugment native `Node` and `NodeList` objects to switch back to safe mode.
// Mainly used for tests.

var unaugmentNatives = function() {

    var key;

    for(key in api) {
        NodeProto[key] = NodeProtoOriginals[key];
        NodeListProto[key] = NodeListProtoOriginals[key];
    }

    for(key in apiNodeList) {
        NodeListProto[key] = NodeListProtoOriginals[key];
    }
};

// It's possible to have a custom build without the [selector](selector.html) API,
// but in that case only the native mode makes sense.

if(typeof $ === 'undefined') {
    safeMode(false);
} else {
    $.isSafe = isSafe;
    $.safeMode = safeMode;
}

export { isSafe, safeMode };

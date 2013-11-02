var api = {};

/* API:class */
import { addClass, removeClass, toggleClass, hasClass } from 'class';
api.addClass = addClass;
api.removeClass = removeClass;
api.toggleClass = toggleClass;
api.hasClass = hasClass;
/* API:class */

/* API:dom */
import { append, before, after } from 'dom';
api.append = append;
api.before = before;
api.after = after;
/* API:dom */

/* API:event */
import { on, off, delegate, undelegate, trigger } from 'event';
api.on = on;
api.off = off;
api.delegate = delegate;
api.undelegate = undelegate;
api.trigger = trigger;
/* API:event */

/* API:selector */
import { $, find } from 'selector';
api.$ = $;
api.find = find;
$._api = api;
/* API:selector */

export { api };

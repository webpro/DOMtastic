/**
 * @module noConflict
 */

import { global } from './util';

/*
 * Save the previous value of the global `$` variable, so that it can be restored later on.
 * @private
 */

const previousLib = global.$;

/**
 * In case another library sets the global `$` variable before DOMtastic does,
 * this method can be used to return the global `$` to that other library.
 *
 * @return {Object} Reference to DOMtastic.
 * @example
 *     var domtastic = $.noConflict();
 */

export const noConflict = function() {
  global.$ = previousLib;
  return this;
};

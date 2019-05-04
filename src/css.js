/**
 * @module CSS
 */

import { each } from './util';

const isNumeric = value => !isNaN(parseFloat(value)) && isFinite(value);

const dasherize = value => value.replace(/([a-z\d])([A-Z])/g, '$1-$2').toLowerCase();

/**
 * Get the value of a style property for the first element, or set one or more style properties for each element in the collection.
 *
 * @param {String|Object} key The name of the style property to get or set. Or an object containing key-value pairs to set as style properties.
 * @param {String} [value] The value of the style property to set.
 * @return {Object} The wrapped collection
 * @chainable
 * @example
 *     $('.item').css('padding-left'); // get
 *     $('.item').css('color', '#f00'); // set
 *     $('.item').css({'border-width': '1px', display: 'inline-block'}); // set multiple
 */

export const css = function(key, value) {

  let styleProps, prop, val;

  if(typeof key === 'string') {
    key = dasherize(key);

    if(typeof value === 'undefined') {
      let element = this.nodeType ? this : this[0];
      if(element) {
        val = element.style.getPropertyValue(key);
        return isNumeric(val) ? parseFloat(val) : val;
      }
      return undefined;
    }

    styleProps = {};
    styleProps[key] = value;
  } else {
    styleProps = key;
    for(prop in styleProps) {
      val = styleProps[prop];
      delete styleProps[prop];
      styleProps[dasherize(prop)] = val;
    }
  }

  each(this, element => {
    for(prop in styleProps) {
      if(styleProps[prop] || styleProps[prop] === 0) {
        const important = /!important$/.test(styleProps[prop]) ? 'important' : undefined;
        if(typeof styleProps[prop] === 'string') {
          styleProps[prop] = styleProps[prop].replace(/\s*!important$/, '');
        }
        element.style.setProperty(prop, styleProps[prop], important);
      } else {
        element.style.removeProperty(prop);
      }
    }
  });

  return this;
};

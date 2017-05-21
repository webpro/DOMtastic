/**
 * @module CSS
 */

import { each } from './util';

const isNumeric = value => !isNaN(parseFloat(value)) && isFinite(value);

const camelize = value => value.replace(/-([\da-z])/gi, (matches, letter) => letter.toUpperCase());

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
    key = camelize(key);

    if(typeof value === 'undefined') {
      let element = this.nodeType ? this : this[0];
      if(element) {
        val = element.style[key];
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
      styleProps[camelize(prop)] = val;
    }
  }

  each(this, element => {
    for(prop in styleProps) {
      if(styleProps[prop] || styleProps[prop] === 0) {
        element.style[prop] = styleProps[prop];
      } else {
        element.style.removeProperty(dasherize(prop));
      }
    }
  });

  return this;
};

export const show = function() {
  each( this, element => {
    element.style.display = '';
  } );
};

export const hide = function() {
  each( this, element => {
    element.style.display = 'none';
  } );
};

/**
 * gets/sets css height
 *
 * @param {value} optional: set height if given
 * @returns esQuery object.
 */
export const height = function(value) {
  if ( typeof value !== 'undefined' ) {
    each( this, element => {
      element.style.height = typeof value === 'string' ? value : value + 'px';
    } );
  } else {
    return parseInt(document.defaultView.getComputedStyle(this[0], null).getPropertyValue('height'));
  }
};

/**
 * gets/sets css width
 *
 * @param {value} optional: set width if given
 * @returns esQuery object.
 */
export const width = function(value) {
  if ( typeof value !== 'undefined' ) {
    each( this, element => {
      element.style.width = typeof value === 'string' ? value : value + 'px';
    } );
  } else {
    return parseInt(document.defaultView.getComputedStyle(this[0], null).getPropertyValue('width'));
  }
};

export const offset = function() {
  const rect = this[ 0 ].getBoundingClientRect();
  return {
    top: rect.top + document.body.scrollTop,
    left: rect.left + document.body.scrollLeft
  };
};

export const outerHeight = function( withMargin = false ) {
  let height = this[ 0 ].offsetHeight;
  if ( withMargin ) {
    var style = getComputedStyle( [ 0 ] );
    height += parseInt( style.marginTop ) + parseInt( style.marginBottom );
  }
  return height;
};

export const outerWidth = function( withMargin = false ) {
  let width = this[ 0 ].offsetWidth;
  if ( withMargin ) {
    var style = getComputedStyle( [ 0 ] );
    width += parseInt( style.marginLeft ) + parseInt( style.marginRight );
  }
  return width;
};

export const position = function() {
  const position = {
    left: this[ 0 ].offsetLeft,
    top: this[ 0 ].offsetTop
  };

  return position;
};

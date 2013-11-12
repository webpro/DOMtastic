// # Class methods

/**
 * ## addClass
 *
 *     $('.item').addClass('bar');
 *
 * @param {string} value The class name to add to the element(s).
 * @return {$Object} or Node/List in native mode (`this`)
 */

var addClass = function(value) {
    (this.nodeType ? [this] : this).forEach(function(element) {
        element.classList.add(value);
    });
    return this;
};

/**
 * ## removeClass
 *
 *     $('.items').removeClass('bar');
 *
 * @param {string} value The class name to remove from the element(s).
 * @return {$Object} or Node/List in native mode (`this`)
 */

var removeClass = function(value) {
    (this.nodeType ? [this] : this).forEach(function(element) {
        element.classList.remove(value);
    });
    return this;
};

/**
 * ## toggleClass
 *
 *     $('.item').toggleClass('bar');
 *
 * @param {string} value The class name to toggle at the element(s).
 * @return {$Object} or Node/List in native mode (`this`)
 */

var toggleClass = function(value) {
    (this.nodeType ? [this] : this).forEach(function(element) {
        element.classList.toggle(value);
    });
    return this;
};

/**
 * ## hasClass
 *
 *     $('.item').hasClass('bar');
 *
 * @param {string} value Check if the DOM element contains the class name. When applied to multiple elements,
 * returns `true` if _any_ of them contains the class name.
 * @return {boolean}
 */

var hasClass = function(value) {
    return (this.nodeType ? [this] : this).some(function(element) {
        return element.classList.contains(value);
    });
};

// Export interface

export { addClass, removeClass, toggleClass, hasClass };

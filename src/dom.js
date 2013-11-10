// # DOM Manipulation

/**
 * ## append
 *
 *     $('.item').append('<p>more</p>');
 *
 * @param {String|Node|NodeList|$Object} element What to append to the element(s).
 * Clones elements as necessary.
 * @return {Node|NodeList|$Object} Returns the object it was applied to (`this`).
 */

var append = function(element) {
    if(this instanceof Node) {
        if(typeof element === 'string') {
            this.insertAdjacentHTML('beforeend', element);
        } else {
            if(element instanceof Node) {
                this.appendChild(element);
            } else {
                var elements = element instanceof NodeList ? toArray(element) : element;
                elements.forEach(this.appendChild.bind(this));
            }
        }
    } else {
        var l = this.length;
        while(l--) {
            var elm = l === 0 ? element : clone(element);
            append.call(this[l], elm);
        }
    }
    return this;
};

/**
 * ## before
 *
 *     $('.items').before('<p>prefix</p>');
 *
 * @param {String|Node|NodeList|$Object} element What to place as sibling(s) before to the element(s).
 * Clones elements as necessary.
 * @return {Node|NodeList|$Object} Returns the object it was applied to (`this`).
 */

var before = function(element) {
    if(this instanceof Node) {
        if(typeof element === 'string') {
            this.insertAdjacentHTML('beforebegin', element);
        } else {
            if(element instanceof Node) {
                this.parentNode.insertBefore(element, this);
            } else {
                var elements = element instanceof NodeList ? toArray(element) : element;
                elements.forEach(before.bind(this));
            }
        }
    } else {
        var l = this.length;
        while(l--) {
            var elm = l === 0 ? element : clone(element);
            before.call(this[l], elm);
        }
    }
    return this;
};

/**
 * ## after
 *
 *     $('.items').after('<span>suf</span><span>fix</span>');
 *
 * @param {String|Node|NodeList|$Object} element What to place as sibling(s) after to the element(s).
 * Clones elements as necessary.
 * @return {Node|NodeList|$Object} Returns the object it was applied to (`this`).
 */

var after = function(element) {
    if(this instanceof Node) {
        if(typeof element === 'string') {
            this.insertAdjacentHTML('afterend', element);
        } else {
            if(element instanceof Node) {
                this.parentNode.insertBefore(element, this.nextSibling);
            } else {
                var elements = element instanceof NodeList ? toArray(element) : element;
                elements.reverse().forEach(after.bind(this));
            }
        }
    } else {
        var l = this.length;
        while(l--) {
            var elm = l === 0 ? element : clone(element);
            after.call(this[l], elm);
        }
    }
    return this;
};

/**
 * @method clone
 * @private
 * @param {String|Node|NodeList|Array} element The element(s) to clone.
 * @return {String|Node|NodeList|Array} The cloned element(s)
 */

var clone = function(element) {
    if(typeof element === 'string') {
        return '' + element;
    } else if(element instanceof Node) {
        return element.cloneNode(true);
    } else if(element.length) {
        return [].map.call(element, function(el) {
            return el.cloneNode(true);
        });
    }
    return element;
};

/**
 * @method toArray
 * @private
 * @param {NodeList|Array} collection
 * @return {Array}
 */

var toArray = function(collection) {
    return [].slice.call(collection);
};

// Export interface

export { append, before, after };

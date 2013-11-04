// DOM Manipulation
// ----------------

//     $('.myElement').append('<span>more</span>');
//     $('.myList').append('<span>more</span>');

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

//     $('.myElement').before(element);

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

//     $('.myList').after(elements);

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

// Convert `NodeList` to `Array`.

var toArray = function(list) {
    return [].slice.call(list);
};

export { append, before, after };

// Class methods
// -------------

// Chainable API for native `classList`.
//
//     $('.myElement').addClass('myClass');

var addClass = function(value) {
    (this.length ? this : [this]).forEach(function(element) {
        element.classList.add(value);
    });
    return this;
};

var removeClass = function(value) {
    (this.length ? this : [this]).forEach(function(element) {
        element.classList.remove(value);
    });
    return this;
};

var toggleClass = function(value) {
    (this.length ? this : [this]).forEach(function(element) {
        element.classList.toggle(value);
    });
    return this;
};

var hasClass = function(value) {
    return (this.length ? this : [this]).some(function(element) {
        return element.classList.contains(value);
    });
};

export { addClass, removeClass, toggleClass, hasClass };

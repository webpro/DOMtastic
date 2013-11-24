var getElement = function(element) {
    return typeof $ === 'function' && !$.isNative ?
        $(element) :
        typeof element !== 'string' ?
            element :
            /^\s*<(\w+|!)[^>]*>/.test(element) ?
                _createFragment(element) :
                document.querySelectorAll(element);
};

var _createFragment = function(html) {

    var fragment = document.createDocumentFragment(),
        container = document.createElement('div');

    container.innerHTML = html.trim();

    while(container.firstChild) {
        fragment.appendChild(container.firstChild);
    }

    return fragment.childNodes;
};
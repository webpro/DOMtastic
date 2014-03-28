function getElement(element) {
    return typeof $ === 'function' && !$.isNative ?
        $(element) :
        typeof element !== 'string' ?
            element :
            /^\s*<(\w+|!)[^>]*>/.test(element) ?
                _createFragment(element) :
                document.querySelectorAll(element);
}

function _createFragment(html) {

    var fragment = document.createDocumentFragment(),
        container = document.createElement('div');

    container.innerHTML = html.trim();

    while(container.firstChild) {
        fragment.appendChild(container.firstChild);
    }

    return fragment.childNodes;
}

function getRndStr() {
    return (Math.random() + 1).toString(36).substring(7);
}

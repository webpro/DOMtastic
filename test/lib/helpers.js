var getElement = function(element) {
    return $ && !$.isNative ? $(element) : typeof element === 'string' ? document.querySelectorAll(element) : element;
};

var getElement = function(element) {
    return $ && $.safeMode() ? $(element) : typeof element === 'string' ? document.querySelectorAll(element) : element;
};

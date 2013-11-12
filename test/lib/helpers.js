var getElement = function(element) {
    return $ && !$.isNative ?
        $(element) :
        typeof element !== 'string' ?
            element :
            /^\s*<(\w+|!)[^>]*>/.test(element) ?
                $(element) :
                document.querySelectorAll(element);
};

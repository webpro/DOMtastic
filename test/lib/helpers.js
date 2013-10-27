var getElement = function(element) {
    return $.safeMode() ? $(element) : element;
};

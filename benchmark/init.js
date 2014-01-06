(function(root) {

    var bench = root.benchrunner;

    bench.libs = [
        {
            name: 'jQuery',
            script: {
                src: './vendor/jquery.min.js',
                onload: function() {
                    root.jQuery = jQuery.noConflict();
                }
            }
        },
        {
            name: 'Zepto',
            script: {
                src: './vendor/zepto.min.js'
            }
        },
        {
            name: 'jQuery Evergreen',
            script: {
                src: '../dist/jquery-evergreen.min.js',
                onload: function() {
                    root.$ = $.noConflict();
                }
            }
        }
    ];

    bench.setup.push(function() {
        var div = document.createElement('div');
        div.id = 'container';
        div.style.display = 'none';
        document.body.appendChild(div);
    });

}(typeof global == 'object' && global || this));

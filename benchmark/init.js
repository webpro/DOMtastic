(function(root) {

    var bench = root.benchrunner;

    bench.libs = [
        {
            name: 'jQuery',
            version: '2.0.3',
            script: {
                src: './vendor/jquery.min.js',
                onload: function() {
                    root.jQuery = jQuery.noConflict();
                }
            }
        },
        {
            name: 'Zepto',
            version: '1.1.2',
            script: {
                src: './vendor/zepto.min.js'
            }
        },
        {
            name: 'jQuery Evergreen',
            version: '0.3.5',
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

    bench.complete = function(results) {

        var data = {},
            config = {
            'Class': {
                key: 'agt1YS1wcm9maWxlcnIRCxIEVGVzdBiAgICkvo7WCQw',
                url: 'http://www.browserscope.org/browse?category=usertest_agt1YS1wcm9maWxlcnIRCxIEVGVzdBiAgICkvo7WCQw'
            },
            'Constructor': {
                key: 'agt1YS1wcm9maWxlcnIRCxIEVGVzdBiAgICkyo2ECQw',
                url: 'http://www.browserscope.org/browse?category=usertest_agt1YS1wcm9maWxlcnIRCxIEVGVzdBiAgICkyo2ECQw'
            },
            'DOM': {
                key: 'agt1YS1wcm9maWxlcnIRCxIEVGVzdBiAgIDk0Jv_Cgw',
                url: 'http://www.browserscope.org/browse?category=usertest_agt1YS1wcm9maWxlcnIRCxIEVGVzdBiAgIDk0Jv_Cgw'
            },
            'Selector': {
                key: 'agt1YS1wcm9maWxlcnIRCxIEVGVzdBiAgICkzLXNCAw',
                url: 'http://www.browserscope.org/browse?category=usertest_agt1YS1wcm9maWxlcnIRCxIEVGVzdBiAgICkzLXNCAw'
            }
        };

        function log(text) {
            console.log(text + '');
            var uiConsole = isBrowser ? document.getElementById('ui-console') : false;
            if(uiConsole) {
                uiConsole.textContent += text + '\n';
            }
        }

        function postToBrowserScope(key, data) {
            window._bTestResults = data;
            var newScript = document.createElement('script'),
                firstScript = document.getElementsByTagName('script')[0];
            newScript.src = 'http://www.browserscope.org/user/beacon/' + key;
            newScript.src += '?callback=browserScopeCallback';
            firstScript.parentNode.insertBefore(newScript, firstScript);
        }

        window.browserScopeCallback = function browserScopeCallback() {
            log('Data successfully sent to BrowserScope');
        };

        bench.libs.forEach(function(lib) {
            config[lib.name] = (lib.name + '-' + lib.version).toLowerCase().replace('/[\s-]*/g', '_');
        });

        for(var suiteName in results) {
            if(suiteName in config) {
                data = {};
                for(var lib in results[suiteName]) {
                    var key = config[lib];
                    data[key] = results[suiteName][lib].hz;
                }
                log('\nSending data for "' + suiteName + '" to BrowserScope (' + config[suiteName].url + ')');
                postToBrowserScope(config[suiteName].key, data);
            }
        }
    }

}(typeof global == 'object' && global || this));

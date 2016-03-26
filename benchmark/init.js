(function(root) {

  var bench = root.benchrunner;

  bench.libs = [
    {
      name: 'jQuery',
      version: '',
      script: {
        src: '../vendor/jquery.min.js',
        onload: function(jQuery) {
          root.jQuery = (jQuery || root.jQuery).noConflict();
          bench.libs[0].version = root.jQuery.fn.jquery;
        }
      }
    },
    {
      name: 'Zepto',
      version: '1.1.6',
      script: {
        src: '../vendor/zepto.min.js'
      }
    },
    {
      name: 'DOMtastic',
      version: '',
      script: {
        src: '../dist/domtastic.min.js',
        onload: function($) {
          root.$ = ($ || root.$).noConflict();
          bench.libs[2].version = root.$.version;
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

  bench.onComplete = function(results, callback) {

    var data = {},
      suiteNameParts,
      suiteGroupName,
      key,
      config = {
        'Class': {
          key: 'agt1YS1wcm9maWxlcnIRCxIEVGVzdBiAgICkvo7WCQw',
          url: 'https://www.browserscope.org/user/tests/table/agt1YS1wcm9maWxlcnIRCxIEVGVzdBiAgICkvo7WCQw?v=3&layout=simple'
        },
        'Constructor': {
          key: 'agt1YS1wcm9maWxlcnIRCxIEVGVzdBiAgICkyo2ECQw',
          url: 'https://www.browserscope.org/user/tests/table/agt1YS1wcm9maWxlcnIRCxIEVGVzdBiAgICkyo2ECQw?v=3&layout=simple'
        },
        'DOM': {
          key: 'agt1YS1wcm9maWxlcnIRCxIEVGVzdBiAgIDk0Jv_Cgw',
          url: 'https://www.browserscope.org/user/tests/table/agt1YS1wcm9maWxlcnIRCxIEVGVzdBiAgIDk0Jv_Cgw?v=3&layout=simple'
        },
        'Selector': {
          key: 'agt1YS1wcm9maWxlcnIRCxIEVGVzdBiAgICkzLXNCAw',
          url: 'https://www.browserscope.org/user/tests/table/agt1YS1wcm9maWxlcnIRCxIEVGVzdBiAgICkzLXNCAw?v=3&layout=simple'
        }
      };

    function log(text) {
      console.log(text + '');
      var uiConsole = document && document.getElementById('ui-console');
      if(uiConsole) {
        uiConsole.textContent += text + '\n';
      }
    }

    function postToBrowserScope(suiteKey, browserScopeKey, data) {
      root._bTestResults = data;
      if(root.document && !root.phantom) {
        log('\nSending data for "' + suiteKey + '" to BrowserScope (' + config[suiteKey].url + ')');
        var newScript = document.createElement('script'),
          firstScript = document.getElementsByTagName('script')[0];
        newScript.src = 'https://www.browserscope.org/user/beacon/' + browserScopeKey;
        newScript.src += '?callback=browserScopeCallback';
        firstScript.parentNode.insertBefore(newScript, firstScript);
      } else {
        callback();
      }
    }

    root.browserScopeCallback = function browserScopeCallback() {
      log('✓');
      callback();
    };

    bench.libs.forEach(function(lib) {
      config[lib.name] = lib.name + ' ' + lib.version;
    });

    for(var suiteName in results) {
      suiteNameParts = suiteName.split('.');
      suiteGroupName = suiteNameParts[0];
      if(suiteGroupName in config) {
        data[suiteGroupName] = data[suiteGroupName] || {};
        for(var lib in results[suiteName]) {
          key = [config[lib], suiteNameParts[1]].join(' ').trim();
          data[suiteGroupName][key] = parseInt(results[suiteName][lib].hz, 10);
        }
      }
    }

    for(var suiteGroup in data) {
      postToBrowserScope(suiteGroup, config[suiteGroup].key, data[suiteGroup]);
    }

  }

}(typeof global == 'object' && global || this));

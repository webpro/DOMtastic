/**
 * Benchmark Suite Runner for benchmark.js
 *
 * Uses:
 * - benchmark.js (http://benchmarkjs.com/)
 * - Lo-Dash (http://lodash.com/)
 *
 * Heavily inspired by Lo-Dash's performance suite runner (https://github.com/lodash/lodash/blob/master/perf/perf.js)
 */

(function(global) {

  var libs = [{
    name: 'jQuery',
    version: jQuery.fn.jquery
  }, {
    name: 'Zepto',
    version: '1.2.0'
  }, {
    name: 'DOMtastic',
    version: $.version
  }];

  var setupFn = function() {
    var div = document.createElement('div');
    div.id = 'container';
    div.style.display = 'none';
    document.body.appendChild(div);
  };

  var benchrunner = global.benchrunner = {
    suites: [],
    _suites: [],
    libs: libs,
    setup: [setupFn]
  };

  var results = {};

  /**
   * Logs text to the console and some UI "console", if present.
   *
   * @private
   * @param {String} text The text to log.
   */
  function log(text) {
    console.log(text + '');
    var uiConsole = document.getElementById('ui-console');
    if(uiConsole) {
      uiConsole.textContent += text + '\n';
    }
  }

  /**
   * Computes the geometric mean (log-average) of an array of values.
   * See http://en.wikipedia.org/wiki/Geometric_mean#Relationship_with_arithmetic_mean_of_logarithms.
   *
   * @private
   * @param {Array} array The array of values.
   * @returns {number} The geometric mean.
   */
  function getGeometricMean(array) {
    return Math.pow(Math.E, _.reduce(array, function(sum, x) {
          return sum + Math.log(x);
        }, 0) / array.length) || 0;
  }

  /**
   * Gets the Hz, i.e. operations per second, of `bench` adjusted for the
   * margin of error.
   *
   * @private
   * @param {Object} bench The benchmark object.
   * @returns {number} Returns the adjusted Hz.
   */
  function getHz(bench) {
    var result = 1 / (bench.stats.mean + bench.stats.moe);
    return isFinite(result) ? result : 0;
  }

  function invokeSetupFns() {
    var setup = benchrunner.setup,
      setupFns = typeof setup == 'function' ? [setup] : setup;
    _.each(setupFns, function(setup) {
      setup();
    });
  }

  function run() {
    invokeSetupFns();
    if(benchrunner.suites[0]) {
      log('\nSit back and relax, this may take a while.');
      benchrunner.suites[0].run({ async: true });
    } else {
      log('\nNo suites found.');
    }
  }

  function next() {

    var suites = benchrunner.suites;

    // Remove current suite from queue, and run the next or calculate/log the summary
    suites.shift();

    if (suites.length) {
      suites[0].run({ async: true });
    } else {
      logSummary(results);
    }
  }

  function logSummary(results) {

    log('\nSUMMARY');

    _.map(results, function(result, benchName) {
      return {
        name: benchName,
        meanHz: getGeometricMean(result)
      };
    }).sort(function(a, b) {
      return a.meanHz > b.meanHz ? -1 : 1;
    }).forEach(function(result, index, collection) {
      if (index === 0) {
        log(result.name + ' is fastest');
      } else {
        log(result.name + ' is ' + Math.round((1 - result.meanHz / collection[0].meanHz) * 100) + '% slower');
      }
    });

    console.log(results);

  }

  _.extend(Benchmark.Suite.options, {
    onStart: function() {
      log('\n' + this.name);
    },
    onCycle: function(event) {
      log(event.target);
    },
    onComplete: function() {

      var suite = this,
        suiteResults = {},
        bench,
        errored = false;

      for (var index = 0, length = this.length; index < length; index++) {
        bench = this[index];
        if (bench.error) {
          errored = true;
        }
      }

      if (errored) {

        log(bench.error);
        log('There was a problem, skipping...');

      } else {

        var benches = this.filter('successful'),
          fastest = this.filter('fastest');

        _.each(benches, function(bench) {

          suiteResults[suite.name] = suiteResults[suite.name] || {};
          suiteResults[suite.name][bench.name] = bench;

          results[bench.name] = results[bench.name] || [];
          results[bench.name].push(getHz(bench));

          if (_.indexOf(fastest, bench) > -1) {
            log('  ' + bench.name + ' is fastest');
          } else {
            log('  ' + bench.name + ' is ' + Math.round((1 - bench.hz / fastest[0].hz) * 100) + '% slower');
          }
        });

      }

      if(!errored && typeof benchrunner.onComplete === 'function') {
        var onceNext = _.once(next);
        benchrunner.onComplete(suiteResults, onceNext);
        setTimeout(onceNext, 6000);
      } else {
        next();
      }
    }
  });

  if (Benchmark.platform) {
    log('\nPlatform: ' + Benchmark.platform);
  }

  window.addEventListener('load', run);

}(this));

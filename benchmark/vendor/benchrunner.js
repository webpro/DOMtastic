/**
 * Benchmark Suite Runner for benchmark.js
 *
 * Uses:
 * - benchmark.js (http://benchmarkjs.com/)
 * - Lo-Dash (http://lodash.com/)
 * - $script (https://github.com/ded/script.js)
 *
 * Heavily inspired by Lo-Dash's performance suite runner (https://github.com/lodash/lodash/blob/master/perf/perf.js)
 */

(function(root) {

    var load = typeof require == 'function' ? require : root.load,
        _ = (root._ || (root._ = load('./node_modules/lodash/dist/lodash.compat.min.js'))).noConflict(),
        Benchmark = root.Benchmark || (root.Benchmark = load('./node_modules/benchmark/benchmark.js')),
        isBrowser = Benchmark.support.browser,
        results = {};

    /**
     * Logs text to the console and some UI "console", if present.
     *
     * @private
     * @param {String} text The text to log.
     */
    function log(text) {
        console.log(text + '');
        var uiConsole = isBrowser ? document.getElementById('ui-console') : false;
        if(uiConsole) {
            uiConsole.textContent += text + '\n';
        }
    }

    /**
     * Loads scripts using $script (executes callbacks after each, and after all)
     * See https://github.com/ded/script.js/
     *
     * @private
     * @param {Array} scripts The scripts to load
     * @param {String} scripts.src The url
     * @param {Function} scripts.onload The callback to fire when script is loaded
     * @param {Function} callback The callback to fire when all scripts are loaded
     */
    function loadScripts(scripts, callback) {

        _.each(scripts, function(script, index) {
            if (isBrowser) {
                script.srcName = 'script' + index;
                $script(script.src, script.srcName, script.onload);
            } else {
                var path = require('system').args[1],
                    base = path.substr(0, path.lastIndexOf('/') + 1);
                var importValue = load(base + script.src);
                if (typeof script.onload === 'function') {
                    script.onload(importValue);
                }
            }
        });

        if (isBrowser) {
            $script.ready(_.pluck(scripts, 'srcName'), callback);
        } else {
            callback();
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
        var setup = root.benchrunner.setup,
            setupFns = typeof setup == 'function' ? [setup] : setup;
        _.each(setupFns, function(setup) {
            setup();
        });
    }

    function init() {
        var bench = root.benchrunner;
        loadScripts(_.pluck(bench.libs, 'script'), function() {
            invokeSetupFns();
            run();
        });
    }

    function run() {
        log('\nSit back and relax, this may take a while.');
        root.benchrunner.suites[0].run({ async: true });
    }

    _.extend(Benchmark.Suite.options, {
        onStart: function() {
            log('\n' + this.name);
        },
        onCycle: function(event) {
            log(event.target);
        },
        onComplete: function() {

            var suites = root.benchrunner.suites;

            for (var index = 0, length = this.length; index < length; index++) {
                var bench = this[index];
                if (bench.error) {
                    var errored = true;
                }
            }

            if (errored) {

                log(bench.error);
                log('There was a problem, skipping...');

            } else {

                var benches = this.filter('successful'),
                    fastest = this.filter('fastest');

                _.each(benches, function(bench) {

                    results[bench.name] = results[bench.name] || [];
                    results[bench.name].push(getHz(bench));

                    if (_.indexOf(fastest, bench) > -1) {
                        log('  ' + bench.name + ' is fastest');
                    } else {
                        log('  ' + bench.name + ' is ' + Math.round((1 - bench.hz / fastest[0].hz) * 100) + '% slower')
                    }
                });
            }

            // Remove current suite from queue, and run the next or calculate/log the summary

            suites.shift();

            if (suites.length) {

                suites[0].run({ async: true });

            } else {

                log('\nSUMMARY');

                _.map(results, function(result, benchName) {
                    return {
                        name: benchName,
                        meanHz: getGeometricMean(result)
                    }
                }).sort(function(a, b) {
                    return a.meanHz > b.meanHz ? -1 : 1;
                }).forEach(function(result, index, collection) {
                    if (index === 0) {
                        log(result.name + ' is fastest')
                    } else {
                        log(result.name + ' is ' + Math.round((1 - result.meanHz / collection[0].meanHz) * 100) + '% slower');
                    }
                });

                if (root.phantom) {
                    phantom.exit();
                }
            }
        }
    });

    if (Benchmark.platform + '') {
        log('\nPlatform: ' + Benchmark.platform);
    }

    root.benchrunner = {
        suites: [],
        _suites: [],
        libs: [],
        setup: []
    };

    if (root.document && !root.phantom) {
        window.onload = init;
    } else {
        phantom.args.forEach(load);
        init();
    }

}(typeof global == 'object' && global || this));

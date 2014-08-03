/**
 * From Travis CI build, setup tunnel to Sauce Labs and send tests
 *
 * Heavily inspired by https://github.com/lodash/lodash/blob/master/test/saucelabs.js
 */

var http = require('http'),
    ecstatic = require('ecstatic'),
    request = require('request'),
    SauceTunnel = require('sauce-tunnel');

var env = process.env,
    accessKey = env.SAUCE_ACCESS_KEY,
    username = env.SAUCE_USERNAME,
    build = env.TRAVIS_BUILD_ID || Math.floor((new Date).getTime() / 1000 - 1230768000).toString(),
    tunnelId = env.TRAVIS_JOB_NUMBER || 'tunnel',
    tags = [ env.TRAVIS_BRANCH ? process.env.TRAVIS_BRANCH : 'local'],
    port = 9001;

var platforms = [
    ['Windows 8.1', 'googlechrome', '33'],
    ['Windows 8.1', 'googlechrome', '32'],
    ['Windows 8', 'googlechrome', '33'],
    ['OS X 10.9', 'googlechrome', '33'],
    ['Linux', 'googlechrome', '32'],
    ['Windows 8.1', 'firefox', '27'],
    ['Windows 8.1', 'firefox', '26'],
    ['OS X 10.9', 'firefox', ''],
    ['OS X 10.6', 'firefox', ''],
    ['Linux', 'firefox', ''],
    ['Windows 8.1', 'internet explorer', '11'],
    ['Windows 8', 'internet explorer', '10'],
    ['OS X 10.9', 'safari', '7'],
    ['OS X 10.8', 'safari', '6'],
    ['Windows 7', 'safari', '5']
];

/**
 * Processes the result object of the test session.
 *
 * @private
 * @param {Object} results The result object to process.
 */
function handleTestResults(results) {

    var failingTests = results.filter(function(test) {
        var result = test.result;
        return !result || result.failures || /\berror\b/i.test(result.message);
    });

    if (!failingTests.length) {

        console.log('Tests passed');

    } else {

        console.error('Tests failed on platforms: ' + JSON.stringify(failingTests.map(function(test) { return test.platform; })));

        failingTests.forEach(function(test) {

            var result = test.result || {},
                details = 'See ' + test.url + ' for details.',
                failed = result.failures,
                platform = JSON.stringify(test.platform);

            if (failed) {
                console.error(failed + ' failures on ' + platform + '. ' + details);
            } else {
                var message = result.message || 'no results available. ' + details;
                console.error('Testing on ' + platform + ' failed; ' + message);
            }
        });
    }

    console.log('Shutting down Sauce Connect tunnel...');

    tunnel.stop(function() {
        process.exit(failingTests.length ? 1 : 0);
    });
}

/**
 * Makes a request for Sauce Labs to start the test session.
 *
 * @private
 */
function runTests() {
    var options = {
        build: build,
        tunnel: 'tunnel-identifier:' + tunnelId,
        platforms: platforms,
        url: 'http://localhost:' + port + '/test/index.html',
        framework: 'mocha',
        tags: tags,
        'idle-timeout': 90,
        'command-timeout': 300,
        'max-duration': 300,
        'record-screenshots': true,
        'record-video': false,
        'video-upload-on-pass': false,
        name: 'DOMtastic tests',
        public: 'public'
    };

    console.log('Starting saucelabs tests: ' + JSON.stringify(options));

    request.post('https://saucelabs.com/rest/v1/' + username + '/js-tests', {
        auth: {
            user: username,
            pass: accessKey
        },
        json: options
    }, function(error, response, body) {
        var statusCode = response && response.statusCode;
        if (statusCode == 200) {
            waitForTestCompletion(body);
        } else {
            console.error('Failed to submit test to Sauce Labs; status: ' + statusCode + ', body:\n' + JSON.stringify(body));
            if (error) {
                console.error(error);
            }
            process.exit(3);
        }
    });

}

/**
 * Checks the status of the test session. If the session has completed it
 * passes the result object to `handleTestResults`, else it checks the status
 * again in five seconds.
 *
 * @private
 * @param {Object} testIdentifier The object used to identify the session.
 */
function waitForTestCompletion(testIdentifier) {
    request.post('https://saucelabs.com/rest/v1/' + username + '/js-tests/status', {
        auth: {
            user: username,
            pass: accessKey
        },
        json: testIdentifier
    }, function(error, response, body) {
        var statusCode = response && response.statusCode;
        if (statusCode == 200) {
            if (body.completed) {
                handleTestResults(body['js tests']);
            }
            else {
                setTimeout(function() {
                    waitForTestCompletion(testIdentifier);
                }, 5000);
            }
        } else {
            console.error('Failed to check test status on Sauce Labs; status: ' + statusCode + ', body:\n' + JSON.stringify(body));
            if (error) {
                console.error(error);
            }
            process.exit(4);
        }
    });
}

http.createServer(
    ecstatic({ root: process.cwd(), cache: false })
).listen(port);

var tunnel = new SauceTunnel(username, accessKey, tunnelId, true, ['--verbose', '--se-port', '0']);

console.log('Opening Sauce Connect tunnel...');

tunnel.start(function(success) {
    if (success) {
        console.log('Sauce Connect tunnel opened');
        runTests();
    } else {
        console.error('Failed to open Sauce Connect tunnel');
        process.exit(2);
    }
});

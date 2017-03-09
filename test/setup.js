const jsdomGlobal = require('jsdom-global');
const fs = require('fs');

global.assert = require('assert');
global.sinon = require('sinon');

jsdomGlobal(fs.readFileSync('./test/index.html'));

global.$ = require('../dist/domtastic');

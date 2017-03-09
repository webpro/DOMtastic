const jsdomGlobal = require('jsdom-global');
const fs = require('fs');

global.chai = require('chai');
global.sinon = require('sinon');
global.expect = chai.expect;

jsdomGlobal(fs.readFileSync('./test/index.html'));

global.$ = require('../dist/domtastic');

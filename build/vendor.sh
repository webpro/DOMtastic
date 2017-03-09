#!/usr/bin/env bash

cp --verbose \
  node_modules/mocha/mocha.css \
  node_modules/mocha/mocha.js \
  node_modules/chai/chai.js \
  node_modules/sinon-chai/lib/sinon-chai.js \
  node_modules/sinon/pkg/sinon.js \
  node_modules/zepto/dist/zepto.min.js \
  node_modules/jquery/dist/jquery.min.js \
  node_modules/lodash/lodash.min.js \
  node_modules/benchmark/benchmark.js \
  node_modules/benchrunner/benchrunner.js vendor
cp --verbose node_modules/classlist-polyfill/src/index.js vendor/classlist-polyfill.js

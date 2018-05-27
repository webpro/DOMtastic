import minimist from 'minimist';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import replace from 'rollup-plugin-replace';
import excludeModules from './build/rollup.plugin.excludeModules.js';
import redirectModules from './build/rollup.plugin.redirectModules.js';

var argv = minimist(process.argv.slice(2));
var exclude = argv.exclude ? argv.exclude.split(',') : [];
var include = argv.include ? argv.include.split(',') : [];
var jQueryCompat = argv['config:jquery-compat'];
var minify = argv['config:minify'];

var pkg = require('./package.json');

export default {
  input: 'src/index.js',
  output: {
    file: minify ? 'dist/domtastic.min.js' : 'dist/domtastic.js',
    format: 'umd',
    name: '$',
    sourcemap: true
  },
  plugins: [
    excludeModules({
      exclude: exclude,
      include: include
    }),
    redirectModules({
      enabled: jQueryCompat,
      path: 'src-jquery-compat'
    }),
    babel(),
    replace({
      __VERSION__: pkg.version
    }),
    minify ? terser({
      mangle: {
        reserved: ['domtastic', 'DOMtastic']
      }
    }) : {}
  ]
};

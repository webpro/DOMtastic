import minimist from 'minimist';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import excludeModules from './build/rollup.plugin.excludeModules.js';

const argv = minimist(process.argv.slice(2));
const exclude = argv.exclude ? argv.exclude.split(',') : [];
const include = argv.include ? argv.include.split(',') : [];

const pkg = require('./package.json');

export default {
  entry: 'src/index.js',
  dest: 'dist/domtastic.js',
  format: 'umd',
  moduleName: '$',
  sourceMap: true,
  plugins: [
      excludeModules({
          exclude,
          include
      }),
      babel(),
      replace({
          __VERSION__: pkg.version
      })
  ]
};

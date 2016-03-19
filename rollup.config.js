import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';

const pkg = require('./package.json');

export default {
  entry: 'src/index.js',
  dest: 'dist/domtastic.js',
  format: 'umd',
  moduleName: '$',
  sourceMap: true,
  plugins: [
      babel(),
      replace({
          __VERSION__: pkg.version
      })
  ]
};

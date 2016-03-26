import path from 'path';
import fs from 'fs';
import glob from 'glob';

function endsWith(str, suffix) {
  return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

export default function redirectModules(options) {

  if(!options.enabled || !options.path) {
    return {};
  }

  var modules = glob.sync('**/*.js', {cwd: options.path});

  return {
    load: function(id) {
      var val = null;
      modules.forEach(function(module) {
        if(endsWith(id, module)) {
          var base = id.replace(module, '');
          var redirectPath = path.join(base, path.relative(base, options.path), module);
          val = fs.readFileSync(redirectPath, 'utf8');
        }
      });
      return val;
    }
  };
}

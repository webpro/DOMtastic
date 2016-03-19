import path from 'path';
import fs from 'fs';
import glob from 'glob';

var cwd = path.resolve('src');
var entry = 'src/index.js';
var base = ['index', 'util'];

function dedupe(array) {
    var dedupeObj = {};
    for(var i = 0; i < array.length; i++) dedupeObj[array[i]] = 1;
    array = [];
    for(var key in dedupeObj) array.push(key);
    return array;
}

function determineModulesToExcludes(options) {

    var modules = glob.sync('**/*.js', {cwd: cwd});
    var all = modules.map(function(module) {
        return module.replace(/\.js$/, '')
    });

    var include = options.include.length ? dedupe(base.concat(options.include)) : all.filter(function(module) {
        return !~options.exclude.indexOf(module) && !~options.exclude.indexOf(module + '/index');
    });

    var exclude = options.exclude.length ? options.exclude : all.filter(function(module) {
        return !~include.indexOf(module) && !~include.indexOf(module + '/index');
    });

    console.log('Excluded modules:', exclude.join(', '));
    console.log('Included modules:', include.join(', '));

    return exclude;
}

function excludeModulesFromEntry(src, modules) {
    var removeDeReqsRE = new RegExp('import.+\'./(__M__)\';\\n'.replace(/__M__/, modules.join('|')), 'g');
    var removeExtendsRE = new RegExp('(,\\ (__M__)\\b)'.replace(/__M__/, modules.join('|').replace(/\/index/g, '').replace(/\//g, '_')), 'g');
    return modules.length ? src.replace(removeDeReqsRE, '').replace(removeExtendsRE, '') : src;
}

export default function excludeModules(options) {

    if(options.exclude.length === 0 && options.include.length === 0) {
        return {};
    }

    var exclude = determineModulesToExcludes(options);

    return {
        load: function(id) {
            if(~id.indexOf(entry)) {
                var src = fs.readFileSync(id, 'utf8');
                return excludeModulesFromEntry(src, exclude);
            }
            return null;
        }
    };
}

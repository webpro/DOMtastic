import path from 'path';
import fs from 'fs';
import glob from 'glob';

const cwd = path.resolve('src');
const entry = 'src/index.js';
const base = ['index', 'util'];

const dedupe = array => {
    const dedupeObj = {};
    for(let i = 0; i < array.length; i++) dedupeObj[array[i]] = 1;
    array = [];
    for(let key in dedupeObj) array.push(key);
    return array;
};

const determineModulesToExcludes = options => {

    const modules = glob.sync('**/*.js', {cwd: cwd});
    const all = modules.map(module => module.replace(/\.js$/, ''));

    const include = options.include.length ? dedupe(base.concat(options.include)) : all.filter(module => {
        return !~options.exclude.indexOf(module) && !~options.exclude.indexOf(module + '/index');
    });

    const exclude = options.exclude.length ? options.exclude : all.filter(module => {
        return !~include.indexOf(module) && !~include.indexOf(module + '/index');
    });

    console.log('Excluded modules:', exclude.join(', '));
    console.log('Included modules:', include.join(', '));

    return exclude;
};

const excludeModulesFromEntry = (src, modules) => {
    const removeDeReqsRE = new RegExp('import.+\'./(__M__)\';\\n'.replace(/__M__/, modules.join('|')), 'g');
    const removeExtendsRE = new RegExp('(,\\ (__M__)\\b)'.replace(/__M__/, modules.join('|').replace(/\/index/g, '').replace(/\//g, '_')), 'g');
    return modules.length ? src.replace(removeDeReqsRE, '').replace(removeExtendsRE, '') : src;
};

export default function excludeModules(options) {

    if(options.exclude.length === 0 && options.include.length === 0) {
        return {};
    }

    const exclude = determineModulesToExcludes(options);

    return {
        load(id) {
            if(~id.indexOf(entry)) {
                const src = fs.readFileSync(id, 'utf8');
                return excludeModulesFromEntry(src, exclude);
            }
            return null;
        }
    };
}

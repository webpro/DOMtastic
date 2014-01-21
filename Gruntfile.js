module.exports = function(grunt) {

    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-requirejs");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-browserify");
    grunt.loadNpmTasks('grunt-es6-module-transpiler');
    grunt.loadNpmTasks("grunt-jscs-checker");
    grunt.loadNpmTasks("grunt-release-it");

    grunt.initConfig({

        config: {
            modules: ['main', 'je/api', 'je/util'],
            optionalModules: ['array', 'attr', 'class', 'dom', 'dom_extra', 'event', 'html', 'mode', 'noconflict', 'selector', 'selector_extra'],
            modulesToExclude: {
                default: ['dom_extra', 'mode', 'selector_extra'],
                bare: ['attr', 'dom_extra', 'html', 'mode', 'selector_extra'],
                full: []
            },
            processFiles: [],
            tmp: 'tmp/',
            output: {
                dir: '.release',
                amd: '<%= config.output.dir %>/amd',
                cjs: '<%= config.output.dir %>/commonjs',
                bundle: {
                    default: '<%= config.output.dir %>/jquery-evergreen.js',
                    bare: '<%= config.output.dir %>/bundle/bare/jquery-evergreen.js',
                    full: '<%= config.output.dir %>/bundle/full/jquery-evergreen.js'
                }

            }
        },

        watch: {
            scripts: {
                files: ['src/**/*.js'],
                tasks: ['default'],
                options: {
                    spawn: false
                }
            }
        },

        clean: {
            release: ['<%= config.output.dir %>'],
            tmp: ['<%= config.tmp %>']
        },

        copy: {
            main: {
                options: {
                    processContent: function(content, path) {
                        return /api/.test(path) ? excludeModulesFromApi(content) : content;
                    }
                },
                files: [
                    {
                        expand: true,
                        cwd: 'src/',
                        src: '<%= config.processFiles %>',
                        dest: '<%= config.tmp %>'
                    }
                ]
            },
            dist: {
                expand: true,
                cwd: '<%= config.output.dir %>/bundle/full',
                src: ['jquery-evergreen.js', 'jquery-evergreen.min.js'],
                dest: 'dist/'
            }
        },

        transpile: {
            amd: {
                type: "amd",
                anonymous: true,
                files: [
                    {
                        expand: true,
                        cwd: '<%= config.tmp %>',
                        src: ['**/*.js'],
                        dest: '<%= config.output.amd %>',
                        ext: '.js'
                    }
                ]
            },
            cjs: {
                type: "cjs",
                files: [
                    {
                        expand: true,
                        cwd: '<%= config.tmp %>',
                        src: '**/*.js',
                        dest: '<%= config.output.cjs %>',
                        ext: '.js'
                    }
                ]
            }
        },

        jscs: {
            src: '<%= config.output.dir %>/commonjs/**/*.js',
            options: {
                config: '.jscs.json',
                excludeFiles: ['<%= config.output.dir %>/commonjs/je/api.js']
            }
        },

        requirejs: {
            options: {
                optimize: 'none',
                baseUrl: '<%= config.output.amd %>'
            },
            dist: {
                options: {
                    name: 'main',
                    wrap: {
                        end: "define('jquery-evergreen',['main'],function(main){return main['default'];});"
                    },
                    out: '<%= config.output.bundle.amd %>'
                }
            }
        },

        browserify: {
            dist: {
                src: ['<%= config.output.cjs %>/main.js'],
                dest: '<%= config.output.bundle.global %>',
                options: {
                    alias: '<%= config.output.cjs %>/main.js:jQueryEvergreen',
                    postBundleCB: function(err, src, next) {
                        src += ";window.$=require('jQueryEvergreen')['default'];";
                        next(err, src);
                    }
                }
            }
        },

        uglify: {
            options: {
                mangle: true,
                preserveComments: false,
                compress: true
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.output.dir %>',
                    src: ['*.js', 'bundle/**/*.js'],
                    dest: '<%= config.output.dir %>',
                    rename: function(dest, src) {
                        return (dest + '/' + src).replace(/\.js$/, '.min.js')
                    }
                }]
            }
        },

        'release-it': {
            options: {
                pkgFiles: ['package.json', 'bower.json'],
                buildCommand: 'grunt build-release copy:dist',
                distRepo: 'https://github.com/webpro/jquery-evergreen-release.git',
                distFiles: ['**/*'],
                distBase: '<%= config.output.dir %>'
            }
        }
    });

    grunt.registerTask('configure-run', function(set) {

        set = set || 'default';

        var modulesToExclude = grunt.option('exclude') ? grunt.option('exclude').split(',') : grunt.config.get('config.modulesToExclude.' + set),
            optionalModules = grunt.config.get('config.optionalModules'),
            processFiles = grunt.config.get('config.modules');

        optionalModules.forEach(function(module) {
            if(modulesToExclude.indexOf(module) === -1) {
                processFiles.push('je/' + module);
            }
        });

        grunt.config.set('config.modulesToExclude.run', modulesToExclude);
        grunt.config.set('config.processFiles', processFiles.map(function(module) { return module + '.js'; }));

        grunt.config.set('config.output.bundle.global', grunt.config.get('config.output.bundle.' + set));
        grunt.config.set('config.output.bundle.amd', grunt.config.get('config.output.bundle.' + set).replace(/\.js$/, '.amd.js'));

    });

    grunt.registerTask('default', ['build']);

    grunt.registerTask('release', ['release-it']);

    grunt.registerTask('build', [
        'clean',
        'configure-run:full',
        'copy:main',
        'transpile:cjs',
        'jscs',
        'browserify',
        'uglify',
        'copy:dist',
        'clean:tmp'
    ]);

    grunt.registerTask('build-release', [
        'clean',
        'build-set:bare',
        'build-set:default',
        'build-set:full',
        'jscs',
        'uglify',
        'clean:tmp'
    ]);

    grunt.registerTask('build-set', function(set) {

        grunt.task.run([
            'clean:tmp',
            'configure-run:' + set,
            'copy:main',
            'transpile',
            'requirejs',
            'browserify'
        ])

    });

    function excludeModulesFromApi(content) {

        var modulesToExclude = grunt.config.get('config.modulesToExclude.run'),
            moduleImportRE = new RegExp('module[\\s\\S](__MODULES__).+\\n'.replace(/__MODULES__/g, modulesToExclude.join('|')), 'g'),
            moduleExtendRE = new RegExp('(,\\ (__MODULES__))'.replace(/__MODULES__/g, modulesToExclude.join('|')), 'g');

        if(modulesToExclude.length) {
            content = content.replace(moduleImportRE, '').replace(moduleExtendRE, '');
        }

        return content;

    }

};

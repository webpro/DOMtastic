module.exports = function(grunt) {

    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-requirejs");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-browserify");
    grunt.loadNpmTasks('grunt-es6-module-transpiler');

    grunt.initConfig({

        config: {
            modules: ['main', 'je/api', 'je/util'],
            optionalModules: ['attr', 'class', 'dom', 'event', 'html', 'mode', 'noconflict', 'selector'],
            excludeModules: [],
            excludeModuleComment: 'API:(__M__)[\\s\\S]*API:(__M__)',
            processFiles: [],
            tmp: 'tmp/',
            outputAMD: 'dist/amd/',
            outputAMDBundle: 'dist/jquery-evergreen.amd.js',
            outputCJS: 'dist/commonjs/',
            outputFileGlobal: 'dist/jquery-evergreen.js'
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
            all: ['<%= config.tmp %>', 'dist/'],
            tmp: ['<%= config.tmp %>']
        },

        copy: {
            main: {
                options: {
                    processContent: function(content) {
                        var excludeModules = grunt.config.get('config.excludeModules'),
                            excludeModuleComment = grunt.config.get('config.excludeModuleComment'),
                            excludeRegExp = new RegExp(excludeModuleComment.replace(/__M__/g, excludeModules.join('|')), 'gm');
                        if(excludeModules.length) {
                            content = content.replace(excludeRegExp, '');
                        }
                        return content;
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
                        dest: '<%= config.outputAMD %>',
                        ext: '.js'
                    }
                ]
            },
            cjs: {
                type: "cjs",
                files: [
                    {
                        expand: true,
                        cwd: 'src/',
                        src: '**/*.js',
                        dest: '<%= config.outputCJS %>',
                        ext: '.js'
                    }
                ]
            }
        },

        requirejs: {
            options: {
                optimize: 'none',
                baseUrl: '<%= config.outputAMD %>'
            },
            dist: {
                options: {
                    name: 'main',
                    wrap: {
                        end: "define('jquery-evergreen',['main'],function(main){return main['default'];});"
                    },
                    out: '<%= config.outputAMDBundle %>'
                }
            }
        },

        browserify: {
            dist: {
                src: ['<%= config.outputCJS %>/main.js'],
                dest: '<%= config.outputFileGlobal %>',
                options: {
                    alias: '<%= config.outputCJS %>/main.js:jQueryEvergreen',
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
            amd: {
                files: {
                    'dist/jquery-evergreen.min.js': ['<%= config.outputFileGlobal %>'],
                    'dist/jquery-evergreen.amd.min.js': ['<%= config.outputAMDBundle %>']
                }
            }
        }
    });

    grunt.registerTask('excludeModules', function() {

        var excludeParam = grunt.option('exclude') || '',
            excludeModules = grunt.config.get('config.excludeModules').concat(excludeParam.length ? excludeParam.split(',') : []),
            optionalModules = grunt.config.get('config.optionalModules'),
            processFiles = grunt.config.get('config.modules');

        optionalModules.forEach(function(module) {
            if(excludeModules.indexOf(module) === -1) {
                processFiles.push('je/' + module);
            }
        });

        grunt.config.set('config.excludeModules', excludeModules);
        grunt.config.set('config.processFiles', processFiles.map(function(module) { return module + '.js'; }));

    });

    grunt.registerTask('default', [
        'clean:all',
        'excludeModules',
        'copy:main',
        'transpile',
        'requirejs',
        'browserify',
        'uglify',
        'clean:tmp'
    ]);
};

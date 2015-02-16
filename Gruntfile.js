'use strict';
module.exports = function ( grunt ) {
    // Displays the execution time of grunt tasks.
    require('time-grunt')( grunt );

    // Globule to filter npm module dependencies by name.
    require('matchdep').filterDev('grunt-*').forEach( grunt.loadNpmTasks );

    // Require modrewrite.
    var modRewrite = require('connect-modrewrite');

    grunt.initConfig( {
        // [OPTION] Package.
        pkg: grunt.file.readJSON( 'package.json' ),

        // [OPTION] Paths.
        files: {
            js: [
                'app/js/controllers/**/*.js',
                'app/js/directives/**/*.js',
                'app/js/factories/**/*.js',
                'app/js/services/**/*.js',
                'app/js/filters/**/*.js',
                'app/js/app.js'
            ],
            js_vendor: [
                'components/jquery/*.js',
                'components/jquery-ui/jquery.ui-core.js',
                'components/jquery-ui/jquery.ui-widget.js',
                'components/jquery-ui/*.js',
                'components/jquery-ui-*/*.js',
                'components/bootstrap/*.js',
                'components/angular/*.js',
                'components/angular-*/*.js',
                'components/bootstrap-*/bootstrap-select.min.js',
                'components/highstock/*/*.js',
                'components/highstock/*.js',
                'components/highcharts-ng/*.js',
                'components/*/*.js'
            ],
            css: [
                'app/css/*.css'
            ],
            css_vendor: [
                'components/bootstrap/*.css',
                'components/jquery-ui/*.css',
                'app/css/vendor/*.css',
                'components/*/*.css'
            ],
            html: [
                'index.html',
                'app/views/**'
            ]
        },

        connect: {
            options: {
                hostname: 'localhost',
                middleware: function ( connect, options ) {
                    var middlewares = [];
                    middlewares.push(modRewrite(['^[^\\.]*$ /index.html [L]']));
                    options.base.forEach(function( base ) {
                        middlewares.push(connect.static(base));
                    });
                    return middlewares;
                }
            },
            dev: {
                options:{
                    keepalive:  true,
                    open:       true
                }
            }
        },

        watch: {
            default: {
                files: [
                    '<%= files.js %>',
                    '<%= files.css %>',
                    '<%= files.html %>'
                ],
                options: {
                    livereload: true
                }
            }
        },

        clean: {
            assets: {
                src: [
                    'dist/app/config',
                    'dist/app/js',
                    'dist/app/css'
                ]
            },
            dev: {
                src: [
                    'components',
                    'dist'
                ]
            }
        },

        csslint: {
            options: {
                'box-model':                false,
                'adjoining-classes':        false,
                'overqualified-elements':   false,
                'box-sizing':               false,
                'unqualified-attributes':   false,
                'important':                false,
                'fallback-colors':          false,
                'floats':                   false,
                'font-sizes':               false,
                'outline-none':             false
            },
            default: {
                src: [
                    '<%= files.css %>'
                ]
            }
        },

        jshint: {
            options: {
                loopfunc: true,
                laxcomma: true,
                globals: {
                    jQuery: true,
                    angular: true
                }
            },
            default: {
                src: [
                    '<%= files.js %>'
                ]
            }
        },


        htmlbuild: {
            dev: {
                src:            'app/config/app.html',
                dest:           'index.html',
                options: {
                    relative:   false,
                    scripts: {
                        src: [
                                '<%= files.js_vendor %>',
                                '<%= files.js %>'
                        ]
                    },
                    styles: {
                        src: [
                                '<%= files.css_vendor %>',
                                '<%= files.css %>'
                        ]
                    }
                }
            }
        },

        replace: {
            bootstrap_dev: {
                options: {
                    patterns: [
                        {
                            match: /..\/fonts\//g,
                            replacement: ''
                        }
                    ]
                },
                files: [
                    {
                        src: 'components/bootstrap/bootstrap.min.css',
                        dest: 'components/bootstrap/bootstrap.min.css'
                    }
                ]
            },
            jqueryui_dev: {
                options: {
                    patterns: [
                        {
                            match:          /images\//g,
                            replacement:    ''
                        }
                    ]
                },
                files: [
                    {
                        src:                'components/jquery-ui/jquery.ui-min.css.css',
                        dest:               'components/jquery-ui/jquery.ui-min.css.css'
                    }
                ]
            }
        },
        copy: {
            default: {
                files: [
                    {
                        expand: true,
                        src: ['app/**'],
                        dest: 'dist/'
                    },{
                        expand: true,
                        src: ['data/**'],
                        dest: 'dist/'
                    }
                ]
            }
        },

        bowercopy: {
            options: {
                clean:                                                  true,
                srcPrefix:                                              'bower_components'
            },
            js: {
                options: {
                    destPrefix:                                         'components'
                },
                files: {
                    'jquery/jquery.min.js':                             'jquery/dist/jquery.min.js',
                    'jquery/jquery.min.map':                            'jquery/dist/jquery.min.map',
                    'bootstrap/bootstrap.min.js':                       'bootstrap/dist/js/bootstrap.min.js',
                    'angular/angular.min.js':                           'angular/angular.min.js',
                    'angular/angular.min.js.map':                       'angular/angular.min.js.map',
                    'highstock/adapters/standalone-framework.js':       'highstock-release/adapters/standalone-framework.js',
                    'highstock/highstock.js':                           'highstock-release/highstock.js',
                    'highcharts-ng/highcharts-ng.js':                   'highcharts-ng/dist/highcharts-ng.js',
                    'angular-route/angular-route.min.js':               'angular-route/angular-route.min.js',
                    'angular-route/angular-route.min.js.map':           'angular-route/angular-route.min.js.map',
                    'angular-resource/angular-resource.min.js':         'angular-resource/angular-resource.min.js',
                    'angular-resource/angular-resource.min.js.map':     'angular-resource/angular-resource.min.js.map',
                    'angular-bootstrap/ui-bootstrap-tpls.min.js':       'angular-bootstrap/ui-bootstrap-tpls.min.js',
                    'bootstrap-select/bootstrap-select.min.js':         'bootstrap-select/dist/js/bootstrap-select.min.js',
                    'bootstrap-select/bootstrap-select.js.map':         'bootstrap-select/dist/js/bootstrap-select.js.map',
                    'jquery-ui/jquery.ui-core.js':                      'jquery-ui/ui/core.js',
                    'jquery-ui/jquery.ui-widget.js':                    'jquery-ui/ui/widget.js',
                    'jquery-ui/jquery.ui-mouse.js':                     'jquery-ui/ui/mouse.js',
                    'jquery-ui-datepicker/jquery.ui-datepicker.js':     'jquery-ui/ui/datepicker.js',
                    'bootstrap/bootstrap.min.css':                      'bootstrap/dist/css/bootstrap.min.css',
                    'bootstrap-select/bootstrap-select.min.css':        'bootstrap-select/dist/css/bootstrap-select.min.css',
                    'jquery-ui/jquery.ui-min.css':                      'jquery-ui/themes/smoothness/jquery-ui.min.css'
                }
            },
            resources: {
                files: {
                    'components/jquery-ui/':                            'jquery-ui/themes/smoothness/images/*',
                    'components/bootstrap/':                            'bootstrap/dist/fonts/*'
                }
            }
        }
    });

    /*
     ----------------------------
     Task init
     ----------------------------
     */
    grunt.registerTask('init', ['dev', 'connect:dev']);

    /*
     ----------------------------
     Task bower update
     ----------------------------
     */
    grunt.registerTask('update', ['bowercopy', 'replace:bootstrap_dev', 'replace:jqueryui_dev', 'htmlbuild:dev']);

    /*
     ----------------------------
     Task development
     ----------------------------
     */
    grunt.registerTask('dev', ['clean:dev', 'update']);

    /*
     ----------------------------
     Task build
     ----------------------------
     */
    grunt.registerTask('build', ['update', 'copy', 'clean:assets', 'csslint', 'cssmin', 'jshint']);
};
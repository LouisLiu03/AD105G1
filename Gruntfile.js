module.exports = function(grunt) {
    grunt.initConfig({
        //watch
        watch: {
            html: {
                files: ['*.html' ,'app/*.html','app/**/*.html']
            },
            css: {
                files: ['sass/*.scss', 'sass/**/*.scss', 'sass/**/*.css'],
                tasks: ['sass']
            },
            php: {
                files: ['dist/*.php'],
                tasks: ['php']
            },
            js: {
                files: ['js/*.js']
            },
             bake: {
                files: ['app/*.html'],
                tasks: ['bake']
            }
        },
        //sass
        sass: {
            build: {
                options: {
                    sourcemap: 'none'
                },
                files: [{
                    expand: true,
                    cwd: 'sass/',
                    src: ['*.scss'],
                    dest: 'css/',
                    ext: '.css'
                }]
            }
        },
        //php
        php: {
            dist: {
                options: {
                    hostname: '127.0.0.1',
                    port: 3333,
                    base: 'dist' // Project root
                }
            }
        },

         //browserSync
        browserSync: {
            dist: {
                bsFiles: {
                    src: [
                        'css/*.css',
                        '*.html',
                        'js/*.js',
                        'dist/*.php'
                        // Files you want to watch for changes
                    ]
                },
                options: {
                    proxy: '<%= php.dist.options.hostname %>:<%= php.dist.options.port %>',
                    port: 3333,
                    watchTask: true,
                    open: true,
                    injectChanges: true
                }
            },

            dev: {
                bsFiles: {
                    src: [
                        'css/*.css',
                        '*.html',
                        'js/*.js',
                        // Files you want to watch for changes
                    ]
                },
                options: {
                    watchTask: true,
                    server: { //首頁檔案
                        baseDir: './',
                        index: 'coininfo.html'
                    }
                }
            }
        },

        // html 樣板
       bake: {
                    build: {
                        files: {
                            "home.html" : "app/home.html",
                            "recipe-info.html" : "app/recipe-info.html",
                            "cook_ask.html" : "app/cook_ask.html",
                            "locfood.html" : "app/locfood.html",
                            "coins-shop.html" : "app/coins-shop.html",
                            "coininfo.html" : "app/coininfo.html",
                            "locfood.html" : "app/locfood.html"
                        }
                    }
                },



    });

    // load npm tasks

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-php');
    grunt.loadNpmTasks( "grunt-bake");



    // define php server task
    grunt.registerTask('server', [
        'php:dist', // Start PHP Server
        'browserSync:dist', // Using the PHP instance as a proxy
        'watch' // Any other watch tasks you want to run
    ]);
// define default task
    grunt.registerTask('default', [
        'browserSync:dev', // Using the html
        'watch', // Any other watch tasks you want to run
        'bake'
    ]);


};
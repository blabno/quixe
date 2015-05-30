module.exports = function (grunt)
{

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    var config = {
        app: '.'
    };

    grunt.initConfig({

        // Project settings
        config: config,

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= config.app %>/**/*.js', '<%= config.app %>/**/*.html'
                ]
            }
        },
        connect: {
            options: {
                port: grunt.option('frontend-port') || 9000,
                hostname: grunt.option('frontend-url') || 'localhost',
                livereload: 35729
            },
            livereload: {
                options: {
                    open: true,
                    middleware: function (connect)
                    {
                        return [
                            connect.static(config.app)
                        ];
                    }
                }
            }
        },
        wiredep: {
            app: {
                src: ['<%= config.app %>/index.html'],
                exclude: [],
                ignorePath: '<%= config.app %>/'
            }
        },
        'gh-pages': {
            options: {
                base: '.'
            },
            src: ['index.html', 'app/*.js', 'src/EventEmitter.js', 'app/bower_components/angular/angular.min.js',
                  'stories/fyretester.ulx.json','.nojekyll']
        }
    });

    grunt.registerTask('serve', 'Compile then start a connect web server', [
        'connect:livereload', 'watch'
    ]);
};

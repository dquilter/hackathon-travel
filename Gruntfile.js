module.exports = function(grunt) {

    grunt.initConfig({
        connect: {
            server: {
                options: {
                    port: 8080,
                    livereload: true,
                    open: true
                }
            }
        },
        bake: {
            dohtml: {
                options: {},
                files: {
                    'dist/index.html': 'src/html/pages/index.html'
                }
            }
        },

        sass: {
            dist: {
                options: {
                    style: 'expanded',
                    sourcemap: 'none'
                },
                files: {
                    'dist/css/styles.css': 'src/sass/styles.scss',
                }
            }
        },
        watch: {
			options: {
				livereload: true
			},
            css: {
                files: ['src/sass/**/*.scss'],
                tasks: 'sass',
            },
            html: {
                files: ['*.html'],
            },
            bake: {
                files: ['src/html/pages/src/**', 'src/html/includes/**'],
                tasks: 'bake', 
            },
            js: {
                files: ['src/js/*.js'],
            }
        }
    });
    
    grunt.loadNpmTasks('grunt-bake');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    
    grunt.registerTask('default', ['bake', 'sass', 'connect', 'watch']);
    
};
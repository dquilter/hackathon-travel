module.exports = function(grunt) {

    grunt.initConfig({
        connect: {
            server: {
                options: {
					hostname: 'localhost',
                    port: 8080,
                    livereload: true,
                    open: true,
					base: 'dist'
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
		copy: {
			css: {
				files: [{
					expand: true,
					flatten: true,
					src: ['src/sass/vendor/*'],
					dest: 'dist/css/vendor/'
				}]
			},
			js: {
				files: [{
					expand: true,
					flatten: true,
					src: ['src/js/**/*'],
					dest: 'dist/js/'
				}]
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
                files: ['src/html/**/*.html'],
                tasks: 'bake'
            },
            js: {
                files: ['src/js/*.js'],
				tasks: 'copy:js'
            }
        }
    });
    
    grunt.loadNpmTasks('grunt-bake');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    
    grunt.registerTask('default', ['bake', 'sass', 'copy', 'connect', 'watch']);
    
};
'use strict';

module.exports = function(grunt) {
	
	// Project configuration.
	grunt.initConfig({
		// Metadata.
		pkg: grunt.file.readJSON('launchly-cart.jquery.json'),
		banner: '/* <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
			'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
			'<%= pkg.homepage ? " * " + pkg.homepage + "\\n" : "" %>' +
			' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
			' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n\n',
		// Task configuration.
		clean: {
			files: ['latest']
		},
		concat: {
			latest: {
				options: {
					banner: '<%= banner %>',
					stripBanners: true
				},
				src: ['src/js/cart.js', 'src/js/events/*.js', 'src/js/handlers/*.js', 'src/js/initialise.js'],
				dest: 'latest/<%= pkg.name %>.js'
			},
			templates: {
				src: ['src/templates/*.html'],
				dest: 'latest/<%= pkg.name %>.templates.html'
			}
		},
		uglify: {
			options: {
				banner: '<%= banner %>'
			},
			latest: {
				src: '<%= concat.latest.dest %>',
				dest: 'latest/<%= pkg.name %>.min.js'
			}
		},
		qunit: {
			files: ['test/**/*.html']
		},
		jshint: {
			gruntfile: {
				options: {
					jshintrc: '.jshintrc'
				},
				src: 'Gruntfile.js'
			},
			src: {
				options: {
					jshintrc: 'src/.jshintrc'
				},
				src: ['src/js/**/*.js', 'src/events/**/*.js']
			},
			test: {
				options: {
					jshintrc: 'test/.jshintrc'
				},
				src: ['test/**/*.js']
			}
		},
		watch: {
			gruntfile: {
				files: '<%= jshint.gruntfile.src %>',
				tasks: ['jshint:gruntfile']
			},
			src: {
				files: '<%= jshint.src.src %>',
				tasks: ['jshint:src', 'qunit']
			},
			test: {
				files: '<%= jshint.test.src %>',
				tasks: ['jshint:test', 'qunit']
			}
		},
		less: {
			development: {
				files: {
					'latest/cart.css': 'src/less/cart.less'
				}
			},
			production: {
				options: {
					cleancss: true
				},
				files: {
					'latest/cart.min.css': 'src/less/cart.less'
				}
			}
		},
		copy: {
			main: {
				expand: true,
				flatten: true,
				src: 'latest/*',
				dest: 'releases/<%= pkg.version %>/'
			}
		},
		build: {
			tasks: ['default'],
			packageConfig: 'pkg',
			packages: '*.json',
			jsonSpace: 2,
			jsonReplacer: undefined,
			gitAdd: '--all'
		}
	});
	
	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-bump-build-git');
	grunt.loadNpmTasks('grunt-contrib-copy');
	
	// Default task.
//	grunt.registerTask('default', ['jshint', 'qunit', 'clean', 'concat', 'uglify']);
	grunt.registerTask('default', ['jshint', 'clean', 'concat', 'uglify', 'less', 'copy']);
};
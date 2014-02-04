// Gruntfile with the configuration of grunt-express and grunt-open. No livereload yet!
module.exports = function(grunt) {
	path = require('path');
	// Load Grunt tasks declared in the package.json file
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	// Configure Grunt
	grunt
			.initConfig({
				pkg : grunt.file.readJSON('package.json'),
				banner : '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n <%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %> * Copyright (c) <%= pkg.author %> <%= grunt.template.today("yyyy") %> Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> \n */\n',
				config : {
					dist : './dist',
					src : './src',
					js : '<%= config.src %>/**/*.js',
					css: '<%= config.src %>/**/*.css'
				},
				clean : [ '<%= config.dist %>', 'test/coverage' ],

				concat : {
					options : {
						banner : '<%= banner %>',
						stripBanners : true
					},
					dist : {
						src : [ '<%= config.js %>' ],
						dest : '<%= config.dist %>/<%= pkg.name %>.js'
					},
					css: {
						src: [ '<%= config.css %>' ],
						dest : '<%= config.dist %>/<%= pkg.name %>.css'
					}
				},
				uglify : {
					options : {
						banner : '<%= banner %>'
					},
					dist : {
						src : '<%= concat.dist.dest %>',
						dest : '<%= config.dist %>/<%= pkg.name %>.min.js'
					}
				},

				// grunt-express will serve the files from the folders listed in
				// `bases`
				// on specified `port` and `hostname`
				express : {
					all : {
						options : {
							port : 9000,
							hostname : "*",
							bases : path.resolve('.'),
							livereload : true
						}
					}
				},

				karma : {
					unit : {
						configFile : 'test/karma.conf.js',
						background: true
					}
				},

				watch : {
					gruntfile : {
						files : 'Gruntfile.js',
						tasks : [ 'build' ]
					},
					ngtemplates : {
						files : [ 'src/templates/*.html' ],
						tasks : [ 'ngtemplates' ]
					},
					livereload : {
						files : [ 'src/*.*' ],
						options : {
							livereload : true
						}
					},
					karma : {
						files : [ 'test/**/*.js' ],
						tasks : [ 'karma:unit:run' ]
					}
				},

				// grunt-open will open your browser at the project's URL
				open : {
					all : {
						// Gets the port from the connect configuration
						path : 'http://localhost:<%= express.all.options.port%>/example/example.html'
					}
				},

				ngtemplates : {
					uniTimeline : {
						cwd : 'src',
						src : 'templates/**.html',
						dest : '<%= config.dist %>/<%= pkg.name %>.tpl.js',
						options : {
							htmlmin : {
								collapseWhitespace : true,
								collapseBooleanAttributes : true
							}
						}
					}
				}
			});

	// Creates the `server` task
	grunt.registerTask('server', [ 'ngtemplates', 'express', 'open', 'karma:unit',
			'watch' ]);
	grunt.registerTask('build', [ 'clean', 'karma', 'concat', 'uglify', 'ngtemplates' ]);
	grunt.registerTask('default', [ 'karma:unit', 'watch' ]);
};
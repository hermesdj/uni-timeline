// Gruntfile with the configuration of grunt-express and grunt-open. No livereload yet!
module.exports = function(grunt) {
	path = require('path');
	// Load Grunt tasks declared in the package.json file
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	// Configure Grunt
	grunt.initConfig({

		// grunt-express will serve the files from the folders listed in `bases`
		// on specified `port` and `hostname`
		express : {
			all : {
				options : {
					port : 9000,
					hostname : "*",
					bases : path.resolve('.'),
					livereload: true
				}
			}
		},
		
		watch: {
			ngtemplates: {
				files: ['src/templates/*.html'],
				tasks: ['ngtemplates']
			},
			livereload :{
				files: ['src/*.*'],
				options: {
					livereload: true
				}
			}
		},

		// grunt-open will open your browser at the project's URL
		open : {
			all : {
				// Gets the port from the connect configuration
				path : 'http://localhost:<%= express.all.options.port%>/example/example.html'
			}
		},
		
		ngtemplates: {
			uniTimeline: {
				cwd: 'src',
				src: 'templates/**.html',
				dest: 'dist/timeline.tpl.js',
				options: {
					htmlmin: {collapseWhitespace: true, collapseBooleanAttributes: true}
				}
			}
		}
	});

	// Creates the `server` task
	grunt.registerTask('server', [ 'ngtemplates', 'express', 'open', 'watch' ]);
};
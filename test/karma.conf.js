// Karma configuration
// Generated on Tue Feb 04 2014 17:57:26 GMT+0100 (Paris, Madrid)

module.exports = function(config) {
	config.set({

		// base path, that will be used to resolve files and exclude
		basePath : '..',

		// frameworks to use
		frameworks : [ 'jasmine' ],

		// list of files / patterns to load in the browser
		files : [ "http://code.angularjs.org/1.2.1/angular.js",
				"http://code.angularjs.org/1.2.1/angular-mocks.js",
				'http://code.jquery.com/jquery-2.1.0.js',
				'dist/uni-timeline.js', 'dist/uni-timeline.tpl.js',
				'test/timeline.test.js' ],

		preprocessors : {
			'src/timeline.test.js' : [ 'coverage' ]
		},
		plugins : [ 'karma-jasmine', 'karma-firefox-launcher',
				'karma-chrome-launcher', 'karma-coverage' ],

		// list of files to exclude
		exclude : [ 'karma.conf.js' ],

		// test results reporter to use
		// possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
		reporters : [ 'dots', 'coverage' ],

		coverageReporter : {
			type : 'html',
			dir : 'test/coverage/'
		},

		// web server port
		port : 9876,

		// enable / disable colors in the output (reporters and logs)
		colors : true,

		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR ||
		// config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel : config.LOG_INFO,

		// enable / disable watching file and executing tests whenever any file
		// changes
		autoWatch : false,

		// Start these browsers, currently available:
		// - Chrome
		// - ChromeCanary
		// - Firefox
		// - Opera (has to be installed with `npm install karma-opera-launcher`)
		// - Safari (only Mac; has to be installed with `npm install
		// karma-safari-launcher`)
		// - PhantomJS
		// - IE (only Windows; has to be installed with `npm install
		// karma-ie-launcher`)
		browsers : [ 'Chrome' ],

		// If browser does not capture in given timeout [ms], kill it
		captureTimeout : 60000,

		// Continuous Integration mode
		// if true, it capture browsers, run tests and exit
		singleRun : false
	});
};

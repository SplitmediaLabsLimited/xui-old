/* globals require, Buffer */

(function()
{
	'use strict';
	
	var gulp        = require('gulp'),
		typescript  = require('gulp-tsc'),
		typedoc     = require('gulp-typedoc'),
		uglify 	    = require('gulp-uglify'),
		through     = require('through2'),
		fs          = require('fs'),
		merge       = require('merge2'),
		concat      = require('gulp-concat'),
		browserSync = require('browser-sync');

	var INTERNAL_REF_FILE = 'src/internal/_references.ts',
		INTERNAL_FILENAME = 'internal.js',
		XUI_REF_FILE      = 'src/_references.ts',
		XUI_FILENAME      = 'xui.js',
		DIST_PATH         = 'dist/',
		PLG_CONFIG_PATH   = 'src/config/',
		PLG_DEPENDENCY    = 'EventEmitter.min.js',
		PLG_CONFIG_FILE   = 'ConfigWindow.js',
		SRC_UTIL_FILE     = 'src/source/source.js';

	var DEPENDENCY_INJECT_LIB = 'lib/di4js.min.js',
		DEPENDENCY_INJECT     = 'src/init.js';

	var TYPEDOC_FILE  = './src/_references.ts';

	var TYPEDOC_CONFIG = {
		mode: 	'file', 
		out: 	'./docs/', 
		name: 	'XUI Plugin Framework', 
		target: 'ES6',
		theme: 	'default',
		readme: 'none'
	};

	gulp.task('default', [
		'compile-internal', 'compile-xui', 'merge'
	]);

	gulp.task('compile-internal', function() {
		return gulp.src(INTERNAL_REF_FILE)
			.pipe(typescript({
				declaration: true,
				outDir: 	 DIST_PATH,
				out: 		 INTERNAL_FILENAME,
				target:      'es5'
			}))
			.pipe(gulp.dest(DIST_PATH));
	});

	gulp.task('compile-xui', ['compile-internal'], function() {
		return gulp.src(XUI_REF_FILE)
			.pipe(typescript({
				declaration: true,
				outDir: 	 DIST_PATH,
				out: 		 XUI_FILENAME,
				target:      'es5'
			}))
			.pipe(gulp.dest(DIST_PATH));
	});

	gulp.task('merge', ['compile-xui'], function() {
		var xuiFile = gulp.src([DIST_PATH + XUI_FILENAME])
			.pipe(through.obj(function(file, encoding, callback) {
				var internalPath =  DIST_PATH + INTERNAL_FILENAME;

				if (file.isBuffer()) {
					file.contents = Buffer.concat([
						fs.readFileSync(internalPath), file.contents
					]);
				}

				fs.unlinkSync(internalPath);
				
				callback(null, file);
			}));

		var plgDep = gulp.src([PLG_CONFIG_PATH + PLG_DEPENDENCY]);
		var sourceUtil = gulp.src([SRC_UTIL_FILE]);
		var plgConfig = gulp.src([PLG_CONFIG_PATH + PLG_CONFIG_FILE]);

		var depLib = gulp.src(DEPENDENCY_INJECT_LIB),
			depInjection = gulp.src(DEPENDENCY_INJECT);

		return merge(xuiFile, depLib, depInjection, plgDep, sourceUtil, plgConfig)
			.pipe(concat(XUI_FILENAME))
			.pipe(uglify())
			.pipe(gulp.dest(DIST_PATH));
	});


	gulp.task('generate-typedoc', function() {
		return gulp.src(TYPEDOC_FILE).pipe(typedoc(TYPEDOC_CONFIG));
	});

	gulp.task('watch', function() {
		gulp.watch('src/**/*.ts', ['default']);
	});

	gulp.task('test', function() {
		browserSync.init({
		    open: false,
		    port: 9000,
		    server: {
				baseDir: ['./'],
				middleware: function (req, res, next) {
					res.setHeader('Access-Control-Allow-Origin', '*');
					next();
				}
		    }
		});
		
		gulp.watch('./test/specs/**/*.js', [browserSync.reload]);
	});
})();

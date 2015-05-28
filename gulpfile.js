/* globals require, Buffer */

(function()
{
	'use strict';
	
	var gulp       = require('gulp'),
		typescript = require('gulp-tsc'),
		typedoc    = require('gulp-typedoc'),
		uglify 	   = require('gulp-uglify'),
		through    = require('through2'),
		fs         = require('fs'),
		es         = require('event-stream'),
		concat     = require('gulp-concat');

	var INTERNAL_REF_FILE = 'src/internal/_references.ts',
		INTERNAL_FILENAME = 'internal.js',
		XUI_REF_FILE      = 'src/_references.ts',
		XUI_FILENAME      = 'xui.js',
		DIST_PATH         = 'dist/',
		PLG_CONFIG_PATH   = 'src/config/',
		PLG_DEPENDENCY    = 'EventEmitter.min.js',
		PLG_CONFIG_FILE   = 'ConfigWindow.js';

	var TYPEDOC_CONFIG = {
		mode: 	'file', 
		out: 	'./docs/', 
		name: 	'XUI Plugin Framework', 
		target: 'ES5',
		theme: 	'minimal',
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
				out: 		 INTERNAL_FILENAME
			}))
			.pipe(gulp.dest(DIST_PATH));
	});

	gulp.task('compile-xui', ['compile-internal'], function() {
		return gulp.src(XUI_REF_FILE)
			.pipe(typescript({
				declaration: true,
				outDir: 	 DIST_PATH,
				out: 		 XUI_FILENAME
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
		var plgConfig = gulp.src([PLG_CONFIG_PATH + PLG_CONFIG_FILE]);

		var plgConfigFull = es.merge(plgDep, plgConfig);

		return es.merge(xuiFile, plgConfigFull)
			.pipe(concat('xui.js'))
			// .pipe(uglify())
			.pipe(gulp.dest(DIST_PATH));
	});


	gulp.task('generate-typedoc', ['merge'], function() {
		return gulp.src([XUI_REF_FILE]).pipe(typedoc(TYPEDOC_CONFIG));
	});

	gulp.task('watch', function() {
		gulp.watch('src/**/*.ts', ['default']);
	});
})();

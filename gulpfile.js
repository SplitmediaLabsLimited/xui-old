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
		PLG_CONFIG_FILE   = 'ConfigWindow.js';

	var TYPEDOC_FILE  = './dist/xui.d.ts';

	var TYPEDOC_CONFIG = {
		mode: 	'file', 
		out: 	'./docs/', 
		name: 	'XUI Plugin Framework', 
		target: 'ES5',
		theme: 	'minimal',
		readme: 'none',
		includeDeclarations: true
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
		var plgConfig = gulp.src([PLG_CONFIG_PATH + PLG_CONFIG_FILE]);

		return merge(xuiFile, plgDep, plgConfig)
			.pipe(concat('xui.js'))
			.pipe(uglify())
			.pipe(gulp.dest(DIST_PATH));
	});


	gulp.task('generate-typedoc', ['merge'], function() {
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

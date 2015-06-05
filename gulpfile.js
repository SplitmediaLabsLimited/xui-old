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
		merge      = require('merge2'),
		debug      = require('gulp-debug'),
		concat     = require('gulp-concat');

	var XUI_FILENAME      = 'xui.js',
		DIST_PATH         = 'dist/',
		PLG_CONFIG_PATH   = 'src/config/',
		PLG_DEPENDENCY    = 'EventEmitter.min.js',
		PLG_CONFIG_FILE   = 'ConfigWindow.js',
		TEST_REF_FILE     = 'test/specs/_references.ts',
		TYPEDOC_FILE      = './dist/xui.d.ts';

	var TYPEDOC_CONFIG = {
		mode: 	'file',
		out: 	'./docs/',
		name: 	'XUI Plugin Framework',
		target: 'ES5',
		theme: 	'minimal',
		readme: 'none',
		includeDeclarations: true
	};

	gulp.task('default', ['compile-xui', 'merge']);

	gulp.task('compile-xui', function() {
		// This is evil, but alas, we got no choice
		var configBuffer = fs.readFileSync('./src/tsconfig.json');
		var config = JSON.parse(configBuffer.toString());

		for (var i = 0; i < config.files.length; i++) {
			config.files[i] = './src' + config.files[i].substr(1);
		}

		return gulp.src(config.files)
			.pipe(typescript(config.compilerOptions))
			.pipe(gulp.dest(DIST_PATH));
	});

	gulp.task('merge', ['compile-xui'], function() {
		var xuiFile = gulp.src([DIST_PATH + XUI_FILENAME]);
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

	gulp.task('generate-test', function() {
		gulp.src(TEST_REF_FILE)
			.pipe(typescript({
				outDir: './test/',
				out: 'specs.js'
			}))
			.pipe(gulp.dest('./test/'));
	});
})();

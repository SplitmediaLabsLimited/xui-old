/* globals require */

(function()
{
	'use strict';
	
	var gulp = require('gulp'),
		typescript = require('gulp-tsc'),
		typedoc = require('gulp-typedoc');

	gulp.task('default', ['compile-internal', 'compile-xui']);

	gulp.task('compile-internal', function() {
		return gulp.src('src/internal/_references.ts')
			.pipe(typescript({
				declaration : true,
				outDir : 'dist/',
				out : 'internal.js'
			}))
			.pipe(gulp.dest('dist/'));
	});

gulp.task('compile-xui', function() {
		return gulp.src('src/_references.ts')
			.pipe(typescript({
				declaration : true,
				outDir : 'dist/',
				out : 'xui.js'
			}))
			.pipe(gulp.dest('dist/'));
	});

	gulp.task('generate-typedoc', ['compile-xui'], function() {
		return gulp
        	.src(['src/_references.ts'])
        	.pipe(typedoc({ 
	            mode: 'file', 
	            out: './docs/', 
	            name: 'XUI Plugin Framework', 
	            target: 'ES5',
	            includeDeclarations: true
	        }));
	});

	gulp.task('watch', function() {
		gulp.watch('src/**/*.ts', ['default']);
	});
})();
var gulp = require('gulp');
var typescript = require('gulp-tsc');

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

gulp.task('compile-xui', ['compile-internal'], function() {
	return gulp.src('src/_references.ts')
		.pipe(typescript({
			declaration : true,
			outDir : 'dist/',
			out : 'xui.js'
		}))
		.pipe(gulp.dest('dist/'));
});

gulp.task('watch', function() {
	gulp.watch('src/**/*.ts', ['default']);
});

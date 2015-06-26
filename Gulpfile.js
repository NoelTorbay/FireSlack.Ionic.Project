/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require('gulp');
var bower = require('gulp-bower');
var del = require('del');
var project = require('./project.json');

var paths = {
    bower: './bower_components/',
    lib: project.webroot + '/lib/'
};

gulp.task('default', ['copy'], function () {
    return;
});

gulp.task('clean', function (done) {
    del(paths.lib, done);
});

gulp.task("copy", ["clean"], function () {
    var bower = {
        "angular": "angular/angular*.{js,map}",
        "angular-animate": "angular-animate/angular*.{js,map}",
        "angular-sanitize": "angular-sanitize/angular*.{js,map}",
        "angular-ui-router": "angular-ui-router/release/*.js",
        "angularfire": "angularfire/dist/*.js",
        "angular-md5": "angular-md5/angular-md5*.js",
        "firebase": "firebase/*.js",
        "ionic": "ionic/release/**/*.{js,css,eot,svg,ttf,woff}"
    };

    for (var module in bower) {
        console.log("Source: " + paths.bower + bower[module]);
        console.log("Destination: " + paths.lib + module);
        gulp.src(paths.bower + bower[module])
          .pipe(gulp.dest(paths.lib + module));
    };
});
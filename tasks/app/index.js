const gulp = require('gulp');
const inquirer = require('inquirer');
const template = require('gulp-template');
const rename = require('gulp-rename');
const install = require('gulp-install');
const questions = require('./questions');
const templateOptions = { 'interpolate': /<%=([\s\S]+?)%>/g };
const underscoringFiles = require('./underscoring-files');
let props = {};

gulp.task('prompt:app', () => {
  return inquirer.prompt(questions)
    .then(answers => {
      gulp.paths.app = `./${answers.name}`;
      Object.assign(props, answers);
    });
});

gulp.task('app', () => {
  return gulp.src([`${gulp.paths.templates.app}/**/*`])
    .pipe(template(props, templateOptions))
    .pipe(rename(underscoringFiles))
    .pipe(gulp.dest(gulp.paths.app));
});

gulp.task('install:app', () => {
  return gulp.src([`${gulp.paths.app}/package.json`]).pipe(install());
});
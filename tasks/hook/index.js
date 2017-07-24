const gulp = require('gulp');
const inquirer = require('inquirer');
const questions = require('./questions');
let props = {};

gulp.task('prompt:hook', () => {
  return inquirer.prompt(questions(gulp.paths.src.base, gulp.paths.src.feature))
    .then(answers => {
      Object.assign(props, answers);
    });
});
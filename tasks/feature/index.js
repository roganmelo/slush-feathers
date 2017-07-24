const gulp = require('gulp');
const inquirer = require('inquirer');
const { kebabCase, camelCase, snakeCase } = require('lodash');
const template = require('gulp-template');
const rename = require('gulp-rename');
const shell = require('shelljs');
const questions = require('./questions');
const templateOptions = { 'interpolate': /<%=([\s\S]+?)%>/g };
const registerFeature = require('./register-feature');
let props = {};

gulp.task('prompt:feature', () => {
  return inquirer.prompt(questions(gulp.paths.src.base))
    .then(answers => {
      Object.assign(props, answers, {
        serviceModule: answers.directory ? `./${camelCase(answers.folder)}/${kebabCase(answers.name)}.class.js` : `./${kebabCase(answers.name)}.class.js`,
        path: answers.path.replace(/^(\/*)|(\/*)$/g, ''),
        folder: camelCase(answers.folder),
        kebabName: kebabCase(answers.name),
        camelName: camelCase(answers.directory ? answers.folder + answers.name : answers.name),
        snakeName: snakeCase(answers.name)
      });
    });
});

gulp.task('register:feature', () => {
  return gulp.src([`${gulp.paths.src.feature}/index.js`])
    .pipe(registerFeature(props))
    .pipe(gulp.dest(gulp.paths.src.feature));
});

gulp.task('files:feature', () => {
  const dest = props.directory
    ? `${gulp.paths.src.feature}/${props.folder}/${props.kebabName}`
    : `${gulp.paths.src.feature}/${props.kebabName}`;
  const src = props.base
    ? [`${gulp.paths.templates.feature}/*.js`, `!${gulp.paths.templates.feature}/class.js`, `!${gulp.paths.templates.feature}/test.js`]
    : [`${gulp.paths.templates.feature}/*.js`, `${gulp.paths.templates.feature}/class.js`, `!${gulp.paths.templates.feature}/test.js`]

  return gulp.src(src)
    .pipe(template(props, templateOptions))
    .pipe(rename(file => file.basename = `${props.kebabName}.${file.basename}`))
    .pipe(gulp.dest(dest));
});

gulp.task('test:feature', () => {
  const dest = props.directory ? `${gulp.paths.test.path}/services/${props.folder}/${props.kebabName}` : `${gulp.paths.test.path}/services/${props.kebabName}`

  return gulp.src([`${gulp.paths.templates.feature}/test.js`])
    .pipe(template(props, templateOptions))
    .pipe(rename(file => file.basename = `${props.kebabName}.test`))
    .pipe(gulp.dest(dest));
});

gulp.task('install:feature', () => {
  const dependency1 = props.requiresAuth ? 'feathers-authentication' : '';
  const dependency2 = props.base ? 'feathers-extended-service' : '';
  if(dependency1 || dependency2) shell.exec(`npm install --save ${dependency1} ${dependency2}`);
});

const gulp = require('gulp');
const inquirer = require('inquirer');
const { snakeCase, kebabCase, camelCase } = require('lodash');
const _ = require('lodash');
const template = require('gulp-template');
const rename = require('gulp-rename');
const shell = require('shelljs');

const questions = require('./questions');
const templateOptions = { 'interpolate': /<%=([\s\S]+?)%>/g };
const registerBase = require('./register-base');
const registerConnection = require('./register-database');
const registerConnectionString = require('./register-connection-string');
const { adapterDependencies, databaseDependencies, connectionStrings } = require('./utils');
let props = {};

gulp.task('prompt:base', done => {
  return inquirer.prompt(questions)
    .then(answers => {
      Object.assign(props, answers, {
        path: answers.path.replace(/^(\/*)|(\/*)$/g, ''),
        kebabName: kebabCase(answers.name),
        camelName: camelCase(answers.name),
        snakeName: snakeCase(answers.name),
        createService: adapterDependencies[answers.adapter],
        connectionString: connectionStrings[answers.database]
      });
    });
});

gulp.task('register:base', () => {
  return gulp.src([`${gulp.paths.src.base}/index.js`])
    .pipe(registerBase(props))
    .pipe(gulp.dest(gulp.paths.src.base));
});

gulp.task('files:base', () => {
  return gulp.src([`${gulp.paths.templates.base}/*.js`, `!${gulp.paths.templates.base}/test.js`])
    .pipe(template(props, templateOptions))
    .pipe(rename(file => file.basename = `${props.kebabName}.${file.basename}`))
    .pipe(gulp.dest(`${gulp.paths.src.base}/${props.kebabName}`));
});

gulp.task('model', () => {
  return gulp.src([`${gulp.paths.templates.base}/model/${props.adapter}.js`])
    .pipe(template(props, templateOptions))
    .pipe(rename(file => file.basename = `${props.kebabName}.model`))
    .pipe(gulp.dest(`${gulp.paths.src.base}/${props.kebabName}`));
});

gulp.task('types', () => {
  return gulp.src([`${gulp.paths.templates.base}/types/${props.adapter}.js`])
    .pipe(template(props, templateOptions))
    .pipe(rename(file => file.basename = `${props.kebabName}.service`))
    .pipe(gulp.dest(`${gulp.paths.src.base}/${props.kebabName}`));
});

gulp.task('test:base', () => {
  return gulp.src([`${gulp.paths.templates.base}/test.js`])
    .pipe(template(props, templateOptions))
    .pipe(rename(file => file.basename = `${props.kebabName}.test`))
    .pipe(gulp.dest(`${gulp.paths.test.path}/base/${props.kebabName}`));
});

gulp.task('connection', () => {
  return gulp.src([`${gulp.paths.templates.base}/connection/${props.database === 'mssql' ? props.adapter + '-mssql.js' : props.adapter + '.js'}`])
    .pipe(template(props, templateOptions))
    .pipe(rename(file => file.basename = props.database))
    .pipe(gulp.dest(gulp.paths.src.path));
});

gulp.task('register:connection', () => {
  return gulp.src([`${gulp.paths.src.path}/app.js`])
    .pipe(registerConnection(props))
    .pipe(gulp.dest(gulp.paths.src.path));
});

gulp.task('register:connection:string', () => {
  return gulp.src([`${gulp.paths.config}/default.json`])
    .pipe(registerConnectionString(props))
    .pipe(gulp.dest(gulp.paths.config));
});

gulp.task('install:base', () => {
  const database = props.adapter === 'mongoose' ? 'mongoose' : props.database;
  const dependency1 = databaseDependencies[database] ? databaseDependencies[database] : '';
  const dependency2 = adapterDependencies[props.adapter] ? adapterDependencies[props.adapter] : '';
  const dependency3 = props.requiresAuth ? 'feathers-authentication' : '';
  
  if(dependency1 || dependency2 || dependency3)
    shell.exec(`npm install --save ${dependency1} ${dependency2} ${dependency3}`);
});
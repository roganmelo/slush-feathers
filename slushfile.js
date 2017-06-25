const gulp = require('gulp');
const requireDir = require('require-dir');
const gulpSync = require('gulp-sync')(gulp);

gulp.paths = {
  app: '',
  config: './config',
  src: {
    path: './src',
    base: './src/base',
    feature: './src/services'
  },
  test: {
    path: './test',
    base: './test/base',
    feature: './test/services'
  },
  templates: {
    app: `${__dirname}/templates/app`,
    base: `${__dirname}/templates/base`,
    feature: `${__dirname}/templates/feature`,
    hook: `${__dirname}/templates/hook`,
    platform: `${__dirname}/templates/platform`,
  }
};

requireDir('tasks', { recurse: true });

gulp.task('default', gulpSync.sync(['prompt:app', 'app', 'install:app']));
gulp.task('base', gulpSync.sync([
  'prompt:base',
  'files:base',
  'model',
  'types',
  'register:base',
  'test:base',
  'connection',
  'register:connection',
  'register:connection:string',
  'install:base'
]));
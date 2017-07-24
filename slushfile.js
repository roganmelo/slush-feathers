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
    hook: `${__dirname}/templates/hook`
  }
};

requireDir('tasks', { recurse: true });

gulp.task('default', gulpSync.sync(['prompt:app', 'app', 'install:app']));
gulp.task('base', gulpSync.sync([
  'prompt:base',
  'register:base',
  'files:base',
  'model',
  'types',
  'test:base',
  'connection',
  'register:connection',
  'register:connection:string',
  'install:base'
]));
gulp.task('feature', gulpSync.sync([
  'prompt:feature',
  'register:feature',
  'files:feature',
  'test:feature',
  'install:feature'
]));
gulp.task('hook', gulpSync.sync([
  'prompt:hook'
]));
const { kebabCase } = require('lodash');
const { adapters } = require('./utils');

module.exports = [{
  type: 'list',
  name: 'database',
  message: 'Which database are you connecting to?',
  default: 'mongodb',
  choices: [
    { name: 'Memory', value: 'memory' },
    { name: 'MongoDB', value: 'mongodb' },
    { name: 'NeDB', value: 'nedb' }
  ]
}, {
  type: 'list',
  name: 'adapter',
  message: 'What kind of base service is it?',
  default: 'mongoose',
  when(answers) {
    if(adapters[answers.database].length === 1) {
      props.adapter = adapters[answers.database][0];
      return false;
    }
    
    return true
  },
  choices(answers) {
    return adapters[answers.database];
  }
}, {
  name: 'name',
  message: 'What is the name of the base service?',
  validate(input) {
    if(input.trim() === '') return 'Base service name can not be empty';
    if(input.trim() === 'authentication') return '`authentication` is a reserved service name.';

    return true;
  }
}, {
  name: 'path',
  message: 'Which path should the base service be registered on?',
  default: answers => `/base/${kebabCase(answers.name)}`,
  validate(input) {
    if(input.trim() === '') {
      return 'Base service path can not be empty';
    }

    return true;
  }
}, {
  name: 'requiresAuth',
  message: 'Does the base service require authentication?',
  type: 'confirm',
  default: false,
}];
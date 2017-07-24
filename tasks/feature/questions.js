const { kebabCase } = require('lodash');
const listBases = require('./list-bases');

module.exports = baseDir => [{
  name: 'name',
  message: 'What is the name of the feature service?',
  validate: input => {
    if(input.trim() === '') return 'Feature service name can not be empty';
    if(input.trim() === 'authentication') return '`authentication` is a reserved service name.';
    return true;
  }
}, {
  type: 'confirm',
  name: 'directory',
  message: 'Do you want to put inside a folder?',
  default: false
}, {
  name: 'folder',
  message: 'What is the name of the folder you want to put the service in?',
  when: answers => answers.directory,
  validate: input => input.trim() === '' ? 'Folder name can not be empty' : true
}, {
  type: 'confirm',
  name: 'extend',
  message: 'Do you want to extends a base sevice?',
  default: false
}, {
  type: 'list',
  name: 'base',
  message: 'Which base service you want to extend?',
  when: answers => answers.extend && listBases(baseDir).length > 0,
  choices: listBases(baseDir)
}, {
  name: 'path',
  message: 'Which path should the feature service be registered on?',
  default: answers => answers.directory ? `/${kebabCase(answers.folder)}/${kebabCase(answers.name)}` : `/${kebabCase(answers.name)}`,
  validate: input => input.trim() === '' ? 'Feature service path can not be empty' : true
}, {
  name: 'requiresAuth',
  message: 'Does the feature service require authentication?',
  type: 'confirm',
  default: false
}];
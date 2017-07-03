const { dependencies } = require('./utils');

module.exports = [{
  type: 'name',
  name: 'name',
  default: 'app',
  message: 'Project name',
  validate: input => {
    const isSelfReferential = dependencies.some(dependency => {
      const separatorIndex = dependency.indexOf('@');
      const end = separatorIndex === -1 ? dependency.length : separatorIndex;
      const dependencyName = dependency.substring(0, end);

      return dependencyName === input;
    });

    if (isSelfReferential) {
      return `Your project can not be named '${input}' because the '${input}' package will be installed as a project dependency.`;
    }

    return true;
  }
}, {
  type: 'input',
  name: 'description',
  message: 'Description'
}, {
  type: 'input',
  name: 'author',
  message: 'Author name'
}, {
  type: 'input',
  name: 'email',
  message: 'Author email'
}, {
  type: 'checkbox',
  name: 'providers',
  message: 'What type of API are you making?',
  choices: [{
    name: 'REST',
    value: 'rest',
    checked: true
  }, {
    name: 'Realtime via Socket.io',
    value: 'socketio',
    checked: true
  }, {
    name: 'Realtime via Primus',
    value: 'primus'
  }],
  validate: input => {
    return (input.indexOf('primus') !== -1 && input.indexOf('socketio') !== -1)
      ? 'You can only pick SocketIO or Primus, not both.'
      : true
  }
}];
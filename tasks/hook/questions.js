module.exports = [{
  name: 'name',
  message: 'What is the name of the hook?'
}, {
  type: 'list',
  name: 'type',
  message: 'What kind of hook should it be?',
  choices: [{
    name: 'I will add it myself',
    value: null
  }, {
    value: 'before'
  }, {
    value: 'after'
  }, {
    value: 'error'
  }]
}, {
  type: 'checkbox',
  name: 'services',
  message: 'What service(s) should this hook be for (select none to add it yourself)?',
  choices() {
    return [{
      name: 'Application wide (all services)',
      value: '__app'
    }].concat(services.map(value => ({ value })));
  }
}, {
  type: 'checkbox',
  name: 'methods',
  message: 'What methods should the hook be for (select none to add it yourself)?',
  choices: [{
    value: 'all'
  }, {
    value: 'find'
  }, {
    value: 'get'
  }, {
    value: 'create'
  }, {
    value: 'update'
  }, {
    value: 'patch'
  }, {
    value: 'remove'
  }],
  when(answers) {
    return answers.type !== null && answers.services.length;
  },
  validate(methods) {
    if (methods.indexOf('all') !== -1 && methods.length !== 1) 
      return 'Select applicable methods or \'all\', not both.';

    return true;
  }
}];

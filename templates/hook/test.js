const assert = require('assert');
const <%= camelName %> = require('../../src/hooks/<%= kebabName %>');

describe('\'<%= name %>\' hook', () => {
  it('runs the hook', () => {
    const mock = {};
    const hook = <%= camelName %>();

    return hook(mock).then(result => {
      assert.equal(result, mock, 'Returns the expected hook object');
    });
  });
});

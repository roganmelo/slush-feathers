import assert from 'assert';
import <%= camelName %> from '../../src/hooks/<%= kebabName %>';

describe('\'<%= name %>\' hook', () => {
  it('runs the hook', () => {
    const mock = {};
    const hook = <%= camelName %>();

    return hook(mock).then(result => {
      assert.equal(result, mock, 'Returns the expected hook object');
    });
  });
});

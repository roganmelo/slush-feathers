const assert = require('assert');
<% if(directory) { %>const app = require('../../../../app');<% } %><% if(!directory) { %>const app = require('../../../src/app');<% } %>

describe('\'<%= name %>\' service', () => {
  it('registered the service', () => {
    const service = app.service('<%= path %>');

    assert.ok(service, 'Registered the service');
  });
});

import assert from 'assert';
<% if(directory) { %>import app from '../../../../app';<% } %><% if(!directory) { %>import app from '../../../src/app';<% } %>

describe('\'<%= name %>\' service', () => {
  it('registered the service', () => {
    const service = app.service('<%= path %>');

    assert.ok(service, 'Registered the service');
  });
});

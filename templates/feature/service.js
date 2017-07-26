<% if(extend) { %>const createService = require('../../../helpers/extended-service');<% } %><% if(!extend) { %>const createService = require('<%= serviceModule %>');<% } %>
const hooks         = require('./<%= kebabName %>.hooks');
const filters       = require('./<%= kebabName %>.filters');

module.exports = function() {
  const app = this;
  <% if(!extend) { %>const paginate = app.get('paginate');<% } %>
  
  const options = {
    name: '<%= kebabName %>',
    <% if(extend) { %>extend: '<%= base %>'<% } %><% if(!extend) { %>paginate<% } %>
  };

  app.use('/<%= path %>', createService(options));

  const service = app.service('<%= path %>');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};

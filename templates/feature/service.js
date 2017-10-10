<% if(extend && !directory) { %>import createService from '../../helpers/extended-service';<% } %>
<% if(extend && directory) { %>import createService from '../../../helpers/extended-service';<% } %>
<% if(!extend) { %>import createService from '<%= serviceModule %>';<% } %>
import hooks from './<%= kebabName %>.hooks';

export default function() {
  const app = this;
  <% if(!extend) { %>const paginate = app.get('paginate');<% } %>
  
  const options = {
    <% if(folder) { %>name: '<%= folder %>-<%= kebabName %>', <% } %><% if(!folder) { %>name: '<%= kebabName %>', <% } %>
    <% if(extend) { %>extend: '<%= base %>'<% } %><% if(!extend) { %>paginate<% } %>
  };

  app.use('/<%= path %>', createService(options));
  
  const service = app.service('<%= path %>');

  service.hooks(hooks);
}

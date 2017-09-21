import createService from '<%= createService %>';
import createModel   from './<%= kebabName %>.model';
import hooks         from './<%= kebabName %>.hooks';
import filters       from './<%= kebabName %>.filters';

export default function() {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'base-<%= kebabName %>',
    Model,
    paginate
  };

  app.use('/<%= path %>', createService(options));
  
  const service = app.service('<%= path %>');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};

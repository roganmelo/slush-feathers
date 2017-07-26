const createService = require('<%= createService %>');
const createModel   = require('./<%= kebabName %>.model');
const hooks         = require('./<%= kebabName %>.hooks');
const filters       = require('./<%= kebabName %>.filters');

module.exports = function() {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: '<%= kebabName %>',
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

const createService = require('feathers-rethinkdb');
const hooks = require('./<%= kebabName %>.hooks');
const filters = require('./<%= kebabName %>.filters');

module.exports = function () {
  const app = this;
  const Model = app.get('rethinkdbClient');
  const paginate = app.get('paginate');

  const options = {
    name: '<%= snakeName %>',
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

const createService = require('feathers-mongodb');
const hooks = require('./<%= kebabName %>.hooks');
const filters = require('./<%= kebabName %>.filters');

module.exports = function() {
  const app = this;
  const paginate = app.get('paginate');
  const mongoClient = app.get('mongoClient');
  const options = { paginate };

  app.use('/<%= path %>', createService(options));

  const service = app.service('<%= path %>');

  mongoClient.then(db => {
    service.Model = db.collection('<%= kebabName %>');
  });

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};

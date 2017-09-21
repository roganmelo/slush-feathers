import createService from 'feathers-mongodb';
import hooks from './<%= kebabName %>.hooks';
import filters from './<%= kebabName %>.filters';

export default function() {
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

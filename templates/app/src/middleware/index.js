const handler = require('feathers-errors/handler');
const notFound = require('feathers-errors/not-found');

module.exports = function () {
  const app = this;

  app.use(notFound());
  app.use(handler());
};

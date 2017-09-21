import handler from 'feathers-errors/handler';
import notFound from 'feathers-errors/not-found';

export default function() {
  const app = this;

  app.use(notFound());
  app.use(handler());
}

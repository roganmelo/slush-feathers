import { MongoClient } from 'mongodb';

export default function() {
  const app = this;
  const config = app.get('mongodb');
  const promise = MongoClient.connect(config);

  app.set('mongoClient', promise);
};

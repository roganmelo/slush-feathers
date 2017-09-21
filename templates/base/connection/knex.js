import knex from 'knex';

export default function() {
  const app = this;
  const { client, connection } = app.get('<%= database %>');
  const db = knex({ client, connection });

  app.set('knexClient', db);
};

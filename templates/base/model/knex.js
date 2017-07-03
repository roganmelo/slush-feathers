module.exports = function(app) {
  const db = app.get('knexClient');

  db.schema.createTableIfNotExists('<%= kebabName %>', table => {
    table.increments('id');
    table.string('text');
  }).then(
    () => console.log('Updated <%= kebabName %> table'),
    e => console.error('Error updating <%= kebabName %> table', e)
  );

  return db;
};

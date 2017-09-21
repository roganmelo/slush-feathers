import NeDB from 'nedb';
import path from 'path';

export default function(app) {
  const dbPath = app.get('nedb');
  const Model = new NeDB({
    filename: path.join(dbPath, '<%= kebabName %>.db'),
    autoload: true
  });

  return Model;
};

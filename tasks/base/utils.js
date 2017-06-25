module.exports.adapters = {
  memory: [{ name: 'In Memory', value: 'memory'}],
  nedb: [{ name: 'NeDB', value: 'nedb'}],
  mongodb: [{ name: 'MongoDB', value: 'mongodb' }, { name: 'Mongoose', value: 'mongoose'}]
};

module.exports.adapterDependencies = {
  memory: 'feathers-memory',
  nedb: 'feathers-nedb',
  mongodb: 'feathers-mongodb',
  mongoose: 'feathers-mongoose'
};

module.exports.databaseDependencies = {
  mongoose: 'mongoose'
};

module.exports.connectionStrings = {
  mongodb: `mongodb://localhost:27017`,
  nedb: 'nedb://../data'
};
const through = require('through2');
const jsonfile = require('jsonfile');
const jsonFormat = require('json-format');

module.exports = data => {
  return through.obj(function(file, enc, cb) {
    const self = this;

    jsonfile.readFile(file.path, (err, obj) => {
      if(err) {
        cb();
        throw new Error('Could not find the markup. The markup is mandatory.');
      }

      const result = Object.assign(obj, {
        [data.database]: 'nedb' ? data.connectionString : `${data.connectionString}/${projectName}`
      });

      file.contents = new Buffer(jsonFormat(result));
      self.push(file);
      cb();
    });
  });
}
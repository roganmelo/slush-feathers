const through = require('through2');

module.exports = data => {
  return through.obj(function(file, enc, cb) {
    let lines = file.contents.toString().split('\n');
    const splitedFilePath = file.path.split('/');
    const projectName = splitedFilePath[splitedFilePath.indexOf('config') - 1];
    const connectionsMarkupIndex = lines.indexOf('  // connections');
    const connection = data.database === 'nedb'
      ? `  "${data.database}": "${data.connectionString}",`
      : `  "${data.database}": "${data.connectionString}/${projectName}",`;

    if(connectionsMarkupIndex === -1) {
      cb();
      throw new Error('Could not find the markup. The markup is mandatory.');
    }

    if(lines.includes(connection)) {
      cb();
      return;
    }

    lines.splice(connectionsMarkupIndex + 1, 0, connection);
    file.contents = new Buffer(lines.join('\n'));
    this.push(file);
    cb();
  });
}
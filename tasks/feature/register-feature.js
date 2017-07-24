const through = require('through2');

module.exports = data => {
  return through.obj(function(file, enc, cb) {
    let lines = file.contents.toString().split('\n');
    const configurationsMarkupIndex = lines.indexOf(data.directory ? `  // ${data.folder}` : '// others');
    const require = data.directory ? `require('./${data.folder}/${data.kebabName}/${data.kebabName}.service.js')` : `require('./${data.kebabName}/${data.kebabName}.service.js')`;
    const configuration = `  app.configure(${require});`;

    if(configurationsMarkupIndex === -1) {
      cb();
      throw new Error('Could not find the markup. The markup is mandatory.');
    }

    if(lines.includes(configuration)) {
      cb();
      throw new Error('Feature service with that name already registered.');
    }

    lines.splice(configurationsMarkupIndex + 1, 0, configuration);
    file.contents = new Buffer(lines.join('\n'));
    this.push(file);
    cb();
  });
}
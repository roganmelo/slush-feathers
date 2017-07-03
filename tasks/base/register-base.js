const through = require('through2');

module.exports = data => {
  return through.obj(function(file, enc, cb) {
    let lines = file.contents.toString().split('\n');
    const requiresMarkupIndex = lines.indexOf('// requires');
    const configurationsMarkupIndex = lines.indexOf('  // configurations');
    const require = `const ${data.camelName} = require('./${data.kebabName}/${data.kebabName}.service.js');`;
    const configuration = `  app.configure(${data.camelName});`;

    if(requiresMarkupIndex === -1 || configurationsMarkupIndex === -1) {
      cb();
      throw new Error('Could not find the markup. The markup is mandatory.');
    }

    if(lines.includes(require) || lines.includes(configuration)) {
      cb();
      throw new Error('Base service with that name already registered.');
    }

    lines.splice(requiresMarkupIndex + 1, 0, require);
    lines.splice(configurationsMarkupIndex + 2, 0, configuration);
    file.contents = new Buffer(lines.join('\n'));
    this.push(file);
    cb();
  });
}
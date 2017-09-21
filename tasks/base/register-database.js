const through = require('through2');

module.exports = data => {
  return through.obj(function(file, enc, cb) {
    let lines = file.contents.toString().split('\n');
    const requiresMarkupIndex = lines.indexOf(`import base from './base';`);
    const configurationsMarkupIndex = lines.indexOf('app.configure(base);');
    const require = `import ${data.database} from './${data.database}';`;
    const configuration = `app.configure(${data.database});`;

    if(requiresMarkupIndex === -1 || configurationsMarkupIndex === -1) {
      cb();
      throw new Error('Could not find the markup. The markup is mandatory.');
    }

    if(lines.includes(require) || lines.includes(configuration)) {
      cb();
      return;
    }

    lines.splice(requiresMarkupIndex + 1, 0, require);
    lines.splice(configurationsMarkupIndex + 1, 0, configuration);
    file.contents = new Buffer(lines.join('\n'));
    this.push(file);
    cb();
  });
}
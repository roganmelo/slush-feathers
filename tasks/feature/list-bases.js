const fs = require('fs');
const path = require('path');
const getBasePath = require('./get-base-path');

module.exports = baseDir => {
  const files = fs.readdirSync(baseDir);

  return files
    .filter(curr => fs.lstatSync(path.join(baseDir, curr)).isDirectory())
    .map(curr => ({ name: curr, value: getBasePath(baseDir, curr) }));
}
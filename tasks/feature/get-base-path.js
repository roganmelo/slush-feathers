const fs = require('fs');
const path = require('path');

module.exports = (baseDir, baseName) => {
  const splitedFile = fs
    .readFileSync(path.join(baseDir, baseName, `${baseName}.service.js`))
    .toString()
    .split('\n');

  const line = splitedFile.find(line => line.includes('app.service'));

  if(!line)
    throw new Error('The `app.service` call was not found. Did you change the service file?');
    
  return line.trim().substring(line.trim().indexOf('(') + 2, line.trim().indexOf(')') - 1);
}
const fs = require('fs');
const path = require('path');

module.exports = service => {
  const splitedFile = fs.readFileSync(service).toString().split('\n');
  const line = splitedFile.find(line => line.includes('app.service'));
  if(!line) throw new Error('The `app.service` call was not found. Did you change the service file?');
  return line.trim().substring(line.trim().indexOf('(') + 2, line.trim().indexOf(')') - 1);
}
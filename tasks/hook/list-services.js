const fs = require('fs');
const path = require('path');
const getServicePath = require('./get-service-path');

module.exports = (baseDir, featuresDir) => {
  const baseFiles = fs.readdirSync(baseDir);
  const featuresFiles = fs.readdirSync(featuresDir);
  
  const baseOptions = baseFiles
    .filter(curr => fs.lstatSync(path.join(baseDir, curr)).isDirectory())
    .map(curr => ({ name: `${curr} (/${getServicePath(path.join(baseDir, curr, `${curr}.service.js`))})`, value: path.join(baseDir, curr, `${curr}.service.js`) }));

  const featuresOptions = [];

  featuresFiles.forEach(featureFile => {
    if(fs.lstatSync(path.join(featuresDir, featureFile)).isDirectory()) {
      fs.readdirSync(path.join(featuresDir, featureFile)).forEach(currDir => {
        if(fs.lstatSync(path.join(featuresDir, featureFile, currDir)).isDirectory()) {
          fs.readdirSync(path.join(featuresDir, featureFile, currDir)).forEach(curr => {
            if(curr === `${currDir}.service.js`) {
              featuresOptions.push({ name: `${currDir} (/${getServicePath(path.join(featuresDir, featureFile, currDir, curr))})`, value: path.join(featuresDir, featureFile, currDir) });
            }
          });
        } else if(currDir === `${featureFile}.service.js`) {
          featuresOptions.push({ name: `${featureFile} (/${getServicePath(path.join(featuresDir, featureFile, currDir))})`, value: path.join(featuresDir, featureFile) });
        }
      });
    }
  });

  // console.log(baseOptions.concat(featuresOptions));

  return baseOptions.concat(featuresOptions);
}
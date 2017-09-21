module.exports = file => {
  const fileNames = ['_gitignore', '_editorconfig', '_eslintrc', '_babelrc'];

  if(fileNames.includes(file.basename)) {
    file.basename = file.basename.replace('_', '.');
  }
};
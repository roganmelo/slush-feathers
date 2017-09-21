export default function(options = {}) { // eslint-disable-line no-unused-vars
  return function (hook) {
    return Promise.resolve(hook);
  };
};
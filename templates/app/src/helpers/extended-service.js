class Service {
  constructor(options = {}) {
    if(!options.extend) {
      throw new Error('ExtendService: option servicePath is mandatory!');
    }

    options.disableParams = options.disableParams || [];
    this.options = options;
  }

  setup(app) {
    this.service = app.service(this.options.extend);
  }

  find(params) {
    return this.service.find(this._getParams(params, 'find'));
  }

  get(id, params) {
    return this.service.get(id, this._getParams(params, 'get'));
  }

  create(data, params) {
    return this.service.create(data, this._getParams(params, 'create'));
  }

  update(id, data, params) {
    return this.service.update(id, data, this._getParams(params, 'update'));
  }

  patch(id, data, params) {
    return this.service.patch(id, data, this._getParams(params, 'patch'));
  }

  remove(id, params) {
    return this.service.remove(id, this._getParams(params, 'remove'));
  }

  _getParams(params, method) {
    if(this.options.disableParams.includes(method)) {
      delete params.provider;
    }

    return params;
  }
}

export default function(options) {
  return new Service(options);
}
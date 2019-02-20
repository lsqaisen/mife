const _plguin = require('./plugin').default;
const _portal = require('./portal').default;

module.exports.default = (api, options) => {
  const { type = 'plguin', ...opts } = options;
  if (type === 'plugin') {
    _plguin(api, opts)
  } else {
    _portal(api, opts)
  }
}
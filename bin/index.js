const _plugin = require('./plugin');
const _portal = require('./portal');


export default (api, options = {}) => {
  const { type = 'plguin', ...opts } = options;
  if (type === 'plugin') {
    _plugin(api, opts)
  } else {
    _portal(api, opts)
  }
}
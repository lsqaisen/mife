import $scriptjs from 'scriptjs';

window.mife_menus = {};

// render
let oldRender = () => {
  const rootContainer = window.g_plugins.apply('rootContainer', {
    initialValue: React.createElement(require('@tmp/router').default),
  });
  ReactDOM.render(
    rootContainer,
    document.getElementById('root'),
  );
};

const sub = (scriptUrl, modelName, callback = () => { }) => {
  $scriptjs(scriptUrl, function () {
    if (!!window.g_umi && !!window.g_umi.mife && !!window.g_umi.mife[modelName]) {
      window.g_routes[0].routes.unshift({
        path: `/${modelName}`,
        key: modelName,
        routes: window.g_umi.mife[modelName].routes
      });
      (window.g_umi.mife[modelName].models || []).forEach((model) => {
        window.g_app.model(model);
      })
      window.mife_menus[modelName] = window.g_umi.mife[modelName].menus || {}
      window.g_plugins.applyForEach('render', { initialValue: oldRender });
      window.g_plugins.applyForEach('patchRoutes', { initialValue: window.g_routes });
      callback();
    }
  })
}

const unsub = (modelName, callback = () => { }) => {
  if (window.g_routes[0].routes.some(route => route.path === `/${modelName}`)) {
    window.g_routes[0].routes.splice(window.g_routes[0].routes.findIndex(route => route.path === `/${modelName}`), 1)
    delete window.mife_menus[modelName]
    window.g_plugins.applyForEach('render', { initialValue: oldRender });
    window.g_plugins.applyForEach('patchRoutes', { initialValue: window.g_routes });
    callback()
  }
}

export { sub, unsub }
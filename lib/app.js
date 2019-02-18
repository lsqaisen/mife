const menusModel = {
  namespace: 'p_menus',
  state: {},
}

export function patchRoutes(routes) {
  (window.g_umi && window.g_umi.monorepo || []).forEach((repo) => {
    repo.routes.forEach(route => {
      // add routes under first layout
      routes[0].routes.unshift(route);
    });
    (repo.models || []).forEach(model => {
      window.g_app.model(model);
    });
    menusModel.state[repo.menus.name] = repo.menus.data
  });
  window.g_app.model(menusModel)
  window.g_routes = routes;
}

export function render(oldRender) {
  oldRender();
}

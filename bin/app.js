// // import $scriptjs from 'scriptjs';
// // import lodash from 'lodash';

// // window._oldRouter = [];
// // window.mife_menus = {};
// // let initOldRouter = false;

// // function addModel() {
// //   (window.g_umi && window.g_umi.monorepo || []).forEach((repo) => {
// //     (repo.models || []).forEach(model => {
// //       window.g_app.model(model);
// //     });
// //     window.mife_menus[repo.menus.name] = repo.menus.data
// //   });
// //   console.log(window.mife_menus)
// // }

// export function patchRoutes(routes) {
//   // if (!initOldRouter) {
//   //   window._oldRouter = lodash.cloneDeep(routes);
//   //   initOldRouter = true;
//   // }
//   // (window.g_umi && window.g_umi.monorepo || []).forEach((repo) => {
//   //   console.log(window._oldRouter)
//   //   repo.routes.forEach(route => {
//   //     routes[0].routes.every(_route => _route.path !== route.path) && routes[0].routes.unshift(route);
//   //   });
//   // });
//   // window.g_routes = routes;
// }

export function render(oldRender) {
  oldRender();
}
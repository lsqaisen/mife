import { join } from 'path';
import CopyWebpackPlugin from 'copy-webpack-plugin';

export default (api, options = {}) => {
  api.chainWebpackConfig(config => {
    // plugin
    config
      .plugin('copy-webpack')
      .use(CopyWebpackPlugin, [[
        { from: './src/public/', to: './public/', toType: 'dir' },
      ]]);

    config.externals(options.externals || {});
  });

  api.addHTMLHeadScript(() => {
    const scripts = Object.keys(options.externals || {}).map(external => {
      return { src: `/public/${external}.js` };
    }).concat((options.scripts || []).map(sub => {
      return { src: `${sub}?t=${new Date().getTime()}` };
    }));
    return scripts;
  });

  api.addHTMLLink(() => {
    return (options.stylesheets || []).map(sub => {
      return { href: `${sub}?t=${new Date().getTime()}`, rel: 'stylesheet' };
    });
  });

  api.addRuntimePlugin(
    join(__dirname, 'app.js'),
  );
}

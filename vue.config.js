module.exports = {
  lintOnSave: false,
  configureWebpack: (config) => {
    config.devtool = 'source-map';
  },
  css: {
    sourceMap: true,
  },
  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg');

    svgRule.uses.clear();

    svgRule
      .use('vue-svg-loader')
      .loader('vue-svg-loader');
  },
};

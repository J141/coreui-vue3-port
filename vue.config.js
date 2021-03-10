module.exports = {
  configureWebpack: {
    performance: {
      hints: false,
    },
    resolve: {
      extensions: ['*', '.vue', '.ts', '.js'],
    },
  },
  css: {
    extract: false,
  },
  transpileDependencies: [
    '@coreui/icons',
    '@coreui/utils',
  ],
};

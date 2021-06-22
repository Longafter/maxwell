// 配置路径别名
const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  // 配置基础链接地址，根据发布环境添加
  publicPath: process.env.NODE_ENV === 'production'
    ? ''
    : '/',
  outputDir: 'dist',
  // dev跨域问题
  devServer: {
    overlay: { // 让浏览器 overlay 同时显示警告和错误
      warnings: true,
      errors: true
    },
    host: "localhost",
    port: 8080, // 端口号
    https: false,
    open: false, // 配置后自动启动浏览器
    hotOnly: true, // 热更新
    proxy: {
      '/apis': {
        target: 'http://10.45.154.204:9082',
        changeOrigin: true, // 允许跨域
        pathRewrite: {
          '^/apis': ''
        }
      }
    }
  },
  productionSourceMap: process.env.NODE_ENV !== 'production',
  lintOnSave: process.env.NODE_ENV !== 'production',
  assetsDir: 'static',
  runtimeCompiler: true,
  configureWebpack: config => {
    return {
      resolve: {
        alias: {
          '@': resolve('src')
        }
      }
    }
  },
  chainWebpack (config) {
    // 移除 prefetch 插件
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')
    // config
    //   // https://webpack.js.org/configuration/devtool/#development
    //   .when(process.env.NODE_ENV === 'development', config =>
    //     config.devtool('cheap-source-map')
    //   )
  }
}

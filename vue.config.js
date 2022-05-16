const webpack = require('webpack')
module.exports = {
  lintOnSave: false,
  publicPath: './',
  css: {
    extract: false
  },
  chainWebpack: config => {
    // 发布模式
    config.when(process.env.NODE_ENV === 'production', config => {
      config.entry('app').clear().add('./src/main-prod.js').add('./src/main.js')
      
      config.set('externals',{
        vue: 'Vue',
        // 'vue-router': 'VueRouter',
        axios: 'axios'
      })
    })
    // 开发模式
    config.when(process.env.NODE_ENV === 'development', config => {
      config.entry('app').clear().add('./src/main-dev.js').add('./src/main.js')

      config.set('externals',{
        vue: 'Vue',
        // 'vue-router': 'VueRouter',
        axios: 'axios'
      })
    })
  },
  pluginOptions: {
    windicss: {
      // 具体配置请查看 https://github.com/windicss/vite-plugin-windicss/blob/main/packages/plugin-utils/src/options.ts
    },
  },
}

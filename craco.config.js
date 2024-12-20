const path = require('path')
const CracoLessPlugin = require('craco-less');

const resolve = pathname => path.resolve(__dirname, pathname)

module.exports = {
  // less
  plugins: [
    {
      plugin: CracoLessPlugin
    },
  ],

  // webpack
  webpack: {
    alias: {
      "@": resolve('src'),
      "component": resolve('src/components'),
      "utils": resolve('src/utils')
    }
  }
}
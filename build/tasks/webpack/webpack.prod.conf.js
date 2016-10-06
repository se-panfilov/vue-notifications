const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.conf')
const config = require('../../config');
const to = require('to-case')

// whether to generate source map for production files.
// disabling this can speed up the build.
const SOURCE_MAP = true

const unminified = merge(baseConfig, {
  devtool: false,
  output: {
    path: path.join(__dirname, '../dist'),
    filename: config.projectName.projectName + '.js',
    // library: to.pascal(config.projectName.projectName),
    library: 'VueNotifications',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  externals: [],
  plugins: [
    // http://vuejs.github.io/vue-loader/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ]
})


module.exports = {
  unminified
}

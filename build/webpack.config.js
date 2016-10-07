var path = require('path')
var projectRoot = path.resolve('__dirname', '../')
const config = require('./config');
const to = require('to-case')

module.exports = {
  // devtool: true,
  entry: './src/main.js',
  output: {
    // path: path.resolve(__dirname, '../dist'),
    path: path.join(__dirname, '../dist'),
    filename: config.projectName.projectName + '.js',
    library: to.pascal(config.projectName),
    // library: 'VueNotifications',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  // resolve: {
  //   extensions: ['', '.js'],
  //   fallback: [ path.join(__dirname, '../node_modules') ],
  //   alias: {
  //     'src': path.resolve(__dirname, '../src')
  //   }
  // },
  // resolveLoader: {
  //   fallback: [ path.join(__dirname, '../node_modules') ]
  // },
  externals: [],
  module: {
    preLoaders: [],
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        include: './',
        exclude: /node_modules/
      }
    ]
  },
  // eslint: {
  //   formatter: require('eslint-friendly-formatter')
  // }
}


// plugins: ['transform-runtime'],
// presets: ['es2015', 'stage-0'],
//   library: 'VueNotifications',
//   libraryTarget: 'umd',
//   loaders: [
//
// ]
// }
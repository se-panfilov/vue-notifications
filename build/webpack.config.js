var path = require('path')
var projectRoot = path.resolve('__dirname', '../')
const config = require('./config')
const to = require('to-case')
// const ClosureCompilerPlugin = require('webpack-closure-compiler')

// module.exports = {
//   debug: true,
//   // devtool: 'source-map',
//   entry: './src/main.js',
//   // target: 'web',
//   output: {
//     // path: path.resolve(__dirname, '../dist'),
//     path: path.join(__dirname, '../dist'),
//     filename: config.projectName.projectName + '.js',
//     library: to.pascal(config.projectName),
//     // library: 'VueNotifications',
//     libraryTarget: 'umd',
//     umdNamedDefine: true
//   },
//   resolve: {
//     extensions: ['', '.js'],
//     fallback: [ path.join(__dirname, '../node_modules') ],
//     alias: {
//       'src': path.resolve(__dirname, '../src')
//     }
//   },
//   // resolveLoader: {
//   //   fallback: [ path.join(__dirname, '../node_modules') ]
//   // },
//   externals: [],
//   module: {
//     preLoaders: [],
//     loaders: [
//       {
//         test: /\.js$/,
//         // path: './src/',
//         // include: './src/',
//         exclude: /(node_modules|bower_components)/,
//         loader: 'babel', // 'babel-loader' is also a valid name to reference
//         query: {
//           presets: ['es2015', 'stage-0'],
//           plugins: ['transform-runtime']
//         }
//       }
//     ]
//   },
// }


module.exports = {
  entry: './src/main.js',
  // devtool: 'source-map',
  // devtool: '#inline-source-map',
  output: {
    path: path.join(__dirname, '../dist'),
    filename: config.projectName.projectName + '.js',
    library: to.pascal(config.projectName),
    // library: 'VueNotifications',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    loaders: [
      {
        test: /.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['latest'],
          plugins: ['transform-runtime']
        }
      },
    ]
  },
  plugins: [
    // new ClosureCompilerPlugin({
    //   compiler: {
    //     language_in: 'ECMASCRIPT6',
    //     language_out: 'ECMASCRIPT5',
    //     compilation_level: 'ADVANCED'
    //   },
    //   concurrency: 3,
    // })
  ]
};
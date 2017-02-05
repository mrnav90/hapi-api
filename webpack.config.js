'use strict';

var Path = require('path');
var Webpack = require('webpack');

module.exports = {
  entry: ['babel-polyfill', './src/server.js'],
  target: 'node',
  node: {
    __dirname: false,
    __filename: false
  },
  resolve: {
    alias: {
      'handlebars': 'handlebars/dist/handlebars.js'
    }
  },
  externals: [/^(?!\.|\/).+/i],
  output: {
    path: Path.join(__dirname, 'public'),
    filename: 'server.js',
    hotUpdateChunkFilename: 'hot/hot-update.js',
    hotUpdateMainFilename: 'hot/hot-update.json',
    libraryTarget: 'commonjs'
  },
  stats: {
    children: false
  },
  devtool: '#eval-source-map',
  module: {
    exprContextCritical: false,
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel-loader']
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
  plugins: [
    new Webpack.HotModuleReplacementPlugin(),
    new Webpack.NoErrorsPlugin(),
    new Webpack.optimize.DedupePlugin(),
    new Webpack.optimize.OccurenceOrderPlugin(),
    new Webpack.IgnorePlugin(/vertx/),
    new Webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      mangle: false,
      test: /\.js$/,
      compress: {
        dead_code: false,
        conditionals: false,
        unused: false
      },
      output: {
        comments: false
      }
    })
  ]
};

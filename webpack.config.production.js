var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var webpackConfig = {
  resolve: {
    extensions: ['', '.js']
  },
  entry: [
    './client.js'
  ],
  output: {
    path: path.resolve('./build/js'),
    publicPath: '/public/js/',
    filename: 'main.min.js'
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: [
          require.resolve('babel-loader')
        ]
      },
      { test: /\.json$/, loader: 'json-loader'},
      { test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader',
          'css!autoprefixer!sass?outputStyle=expanded&' +
            "includePaths[]=" +
              (path.resolve(__dirname, "./node_modules"))
        )
      }
    ]
  },
  node: {
    setImmediate: false
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new ExtractTextPlugin("[name].css", {
      allChunks: true
    })
  ],
  devtool: 'source-map'
};

module.exports = webpackConfig;

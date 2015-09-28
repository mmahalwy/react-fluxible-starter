var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var webpackConfig = {
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      'styles': __dirname + '/src/styles',
      'components': __dirname + '/src/components',
      'actions': __dirname + '/src/actions',
      'stores': __dirname + '/src/stores',
      'constants': __dirname + '/src/constants',
      'mixins': __dirname + '/src/mixins',
      'configs': __dirname + '/src/configs',
      'utils': __dirname + '/src/utils'
    }
  },
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './client.js'
  ],
  output: {
    path: path.resolve('./build'),
    publicPath: '/public/',
    filename: 'main.js'
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: [
          require.resolve('react-hot-loader'),
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
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new ExtractTextPlugin("[name].css", {
      allChunks: true
    })
  ],
  stats: {
    colors: true,
    reasons: true
  },
  devtool: 'source-map',
  keepalive: true,
  debug: true,
  cache: true
};

module.exports = webpackConfig;

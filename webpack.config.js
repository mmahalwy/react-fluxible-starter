var webpack = require('webpack');
var path = require('path');

var Webpack_isomorphic_tools_plugin = require('webpack-isomorphic-tools/plugin')

var webpack_isomorphic_tools_plugin =
  // webpack-isomorphic-tools settings reside in a separate .js file
  // (because they will be used in the web server code too).
  new Webpack_isomorphic_tools_plugin(require('./webpack-isomorphic-tools-configuration'))
  // also enter development mode since it's a development webpack configuration
  // (see below for explanation)
  .development()

var webpackConfig = {
  context: path.join(process.env.PWD, './'),
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      'styles': __dirname + '/src/styles',
      'components': __dirname + '/src/components',
      'actions': __dirname + '/src/actions',
      'stores': __dirname + '/src/stores',
      'constants': __dirname + '/src/constants',
      'mixins': __dirname + '/src/mixins',
      'config': __dirname + '/src/config',
      'utils': __dirname + '/src/utils'
    }
  },
  entry: [
    'webpack-dev-server/client?http://localhost:3002',
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
        loader: 'babel',
        query: {
          stage: 0,
          plugins: []
        }
      },
      { test: /\.json$/, loader: 'json-loader'},
      { test: /\.scss$/,
        loaders: [ 'style', 'css?sourceMap', 'sass?sourceMap' ]
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
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        'BROWSER': true
      }
    }),
    webpack_isomorphic_tools_plugin
  ],
  stats: {
    colors: true,
    reasons: true
  },
  devtool: 'source-map',
  keepalive: true,
  debug: true,
  cache: true,
  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};
// The reason this is here and NOT in .babelrc like it should is because our
// nodejs server picks up babel too and isn't happy with this!
webpackConfig.module.loaders[0].query.plugins.push('react-transform');
webpackConfig.module.loaders[0].query.extra = {
  'react-transform': {
    transforms: [{
      transform: 'react-transform-hmr',
      imports: ['react'],
      locals: ['module']
    },
    {
      "transform": "react-transform-catch-errors",
      "imports": ["react", "redbox-react"]
    }]
  }
};

module.exports = webpackConfig;

const helpers = require('./helpers');
const webpackMerge = require('webpack-merge'); // used to merge webpack configs
const commonConfig = require('./webpack.common.js'); // the settings that are common to prod and dev

/**
 * Webpack Plugins
 */
const DefinePlugin = require('webpack/lib/DefinePlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin');

/**
 * Webpack Constants
 */
const ENV = process.env.ENV = process.env.NODE_ENV = 'development';
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 4000;
const PUBLIC = process.env.PUBLIC_DEV || HOST + ':' + PORT;
const AOT = process.env.BUILD_AOT || helpers.hasNpmFlag('aot');
const HMR = helpers.hasProcessFlag('hot');
console.log(AOT, HMR);
const METADATA = {
  host: HOST,
  port: PORT,
  public: PUBLIC,
  ENV: ENV,
  HMR: HMR,
  AOT: AOT
};

/**
 * Webpack configuration
 */
module.exports = function () {
  return webpackMerge(commonConfig({env: ENV}), {
    devtool: 'cheap-module-source-map',
    output: {
      path: helpers.root('dist'),
      filename: '[name].bundle.js',
      sourceMapFilename: '[file].map',
      chunkFilename: '[id].chunk.js',
      library: 'ac_[name]',
      libraryTarget: 'var',
    },

    plugins: [
      new DefinePlugin({
        'ENV': JSON.stringify(METADATA.ENV),
        'HMR': METADATA.HMR,
        'process.env.ENV': JSON.stringify(METADATA.ENV),
        'process.env.NODE_ENV': JSON.stringify(METADATA.ENV),
        'process.env.HMR': METADATA.HMR
      }),
      new LoaderOptionsPlugin({
        debug: true,
        options: {

        }
      }),
      new HotModuleReplacementPlugin()
    ],

    devServer: {
      port: METADATA.port,
      host: METADATA.host,
      hot: METADATA.HMR,
      public: METADATA.public,
      historyApiFallback: true,
      watchOptions: {
        // if you're using Docker you may need this
        // aggregateTimeout: 300,
        // poll: 1000,
        ignored: /node_modules/
      }
    },
    node: {
      global: true,
      crypto: 'empty',
      process: true,
      module: false,
      clearImmediate: false,
      setImmediate: false
    }

  });
};

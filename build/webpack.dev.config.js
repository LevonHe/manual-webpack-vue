const webpack = require('webpack');
const path = require('path');
const os = require('os');
const merge = require('webpack-merge');
const chalk = require('chalk');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const baseConfig = require('./webpack.base.config');
const devServer = require('./devServer');

function resolve(dir) {
  return path.join(__dirname, '../', dir);
}

function getNetworkIp() {
  let netHost = '';
  try {
    const network = os.networkInterfaces();
    Object.keys(network).forEach((dev) => {
      const iface = network[dev];
      iface.every((alias) => {
        if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
          netHost = alias.address;
          return false;
        }
        return true;
      });
    });
  } catch (error) {
    netHost = '0.0.0.0';
  }
  return netHost;
}

module.exports = merge(baseConfig, {
  mode: 'development',
  output: {
    filename: '[name]_[hash:8].main.js',
    chunkFilename: '[name]_[hash:8].chunk.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          // {
          //   loader: 'px2rem-loader',
          //   options: {
          //     remUnit: 75,
          //     remPrecision: 8,
          //   },
          // },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: (loader) => [
                require('postcss-import')({ root: loader.resourcePath }),
                require('autoprefixer')({
                  overrideBrowserslist: ['last 2 version', '>1%', 'ios 7'],
                }),
                require('cssnano')(),
              ],
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          // {
          //   loader: 'px2rem-loader',
          //   options: {
          //     remUnit: 75,
          //     remPrecision: 8,
          //   },
          // },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: (loader) => [
                require('postcss-import')({ root: loader.resourcePath }),
                require('autoprefixer')({
                  overrideBrowserslist: ['last 2 version', '>1%', 'ios 7'],
                }),
                require('cssnano')(),
              ],
            },
          },
          'less-loader',
          {
            loader: 'style-resources-loader',
            options: {
              patterns: resolve('src/assets/styles/theme.less'),
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [
          `App is running in: ${chalk.blueBright(process.env.NODE_ENV)} environment.\n`,
          `- Local: ${chalk.blueBright('http://localhost:' + chalk.greenBright(devServer.port) + '/')}`,
          `- Network: ${chalk.blueBright('http://' + getNetworkIp() + ':' + chalk.greenBright(devServer.port) + '/')}`,
        ],
        notes: [
          'Note that the development build is not optimized.',
          `To create a production build, run ${chalk.blueBright('npm run build')} or ${chalk.blueBright(
            'yarn build'
          )}.\n`,
        ],
      },
      clearConsole: true,
    }),
  ],
  devtool: 'source-map',
  devServer,
});

const webpack = require('webpack');
const os = require('os');
const merge = require('webpack-merge');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const chalk = require('chalk');
const baseConfig = require('./webpack.base.config');
const devServer = require('./devServer');

function getNetworkIp() {
  let needHost = '';
  try {
    const network = os.networkInterfaces();
    Object.keys(network).forEach((dev) => {
      const iface = network[dev];
      iface.every((alias) => {
        if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
          needHost = alias.address;
          return false;
        }
        return true;
      });
    });
  } catch (e) {
    needHost = '0.0.0.0';
  }
  return needHost;
}

console.log('Vue project is running in ' + process.env.NODE_ENV + ' environment\n');

module.exports = merge(baseConfig, {
  mode: 'development',
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

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const cssnano = require('cssnano');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config');

function resolve(dir) {
  return path.join(__dirname, '../', dir);
}

module.exports = merge(baseConfig, {
  mode: 'production',
  output: {
    filename: '[name]_[chunkhash:8].main.js',
    chunkFilename: '[name]_[chunkhash:8].chunk.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
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
          MiniCssExtractPlugin.loader,
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
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name]_[contenthash:8].css',
    }),
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: cssnano,
    }),
    new FriendlyErrorsWebpackPlugin({
      clearConsole: true,
    }),
  ],
  optimization: {
    splitChunks: {
      minSize: 0,
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'all',
          minChunks: 2,
        },
      },
    },
  },
  performance: {
    hints: 'warning',
    maxEntrypointSize: 50000000,
    maxAssetSize: 30000000,
    assetFilter: function (assetFilename) {
      return assetFilename.endsWith('.js') || assetFilename.endsWith('.css');
    },
  },
});

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

function resolve(dir) {
  return path.join(__dirname, '../', dir);
}

module.exports = {
  entry: resolve('src/main.js'),
  output: {
    path: resolve('dist'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.vue', '.js', '.json'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: [resolve('node_modules')],
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.vue$/,
        exclude: [resolve('node_modules')],
        use: [
          {
            loader: 'vue-loader',
          },
        ],
      },
      {
        resourceQuery: /blockType=i18n/,
        type: 'javascript/auto',
        loader: '@intlify/vue-i18n-loader',
      },
      {
        test: /\.(png|jpg|gif|jpeg|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              name: 'images/[name]_[hash:8].[ext]',
              esModule: false,
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'fonts/[name]_[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve('public/index.html'),
      favicon: resolve('public/favicon.png'),
      chunks: ['main'],
      inject: true,
      minify: {
        html5: true,
        collapseWhitespace: true,
        preserveLineBreaks: false,
        minifyCSS: true,
        minifyJS: true,
        removeComments: false,
      },
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        VUE_APP_VERSION: JSON.stringify(require('../package.json').version),
        ...require('../env'),
      },
    }),
    new VueLoaderPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: resolve('public'),
          to: '',
          globOptions: {
            ignore: ['**/*.html', '**/*.ico'],
          },
        },
      ],
    }),
  ],
  stats: 'errors-only',
};

const path = require('path');
const fs = require('fs');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const lessToJs = require('less-vars-to-js');
const themeVariables = lessToJs(fs.readFileSync(path.join(__dirname, './src/styles/theme.less'), 'utf8'));

//themeVariables["@icon-url"] = "'//localhost:8080/fonts/iconfont'";

module.exports = {
  context: path.join(__dirname, './src'),

  entry: {
    app: [
      'webpack-hot-middleware/client?reload=true',
      './index.js',
    ],
    vendors: [
      'classnames',
      'jwt-decode',
      'lodash',
      'query-string',
      'react',
      'react-addons-transition-group',
      'react-dom',
      'react-redux',
      'react-router',
      'react-router-redux',
      'react-router-scroll',
      'recharts',
      'redux',
      'redux-actions',
      'redux-thunk',
      'reselect',
      'whatwg-fetch',
    ],
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[hash].min.js',
    publicPath: '/',
    sourceMapFilename: '[name].[hash].js.map',
    chunkFilename: '[id].[hash].min.js',
  },

  devtool: 'cheap-module-eval-source-map',

  plugins: [
    new ProgressBarPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html',
      inject: 'body',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin('vendors', '[name].[hash].min.js'),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new ExtractTextPlugin('[name].css'),
  ],

  module: {
    loaders: [
      {
        test: /\.css$/,
        include: path.join(__dirname, 'src'),
        loader: ExtractTextPlugin.extract('style-loader', '!css-loader!postcss-loader'),
      },
      {
        test: /\.css$/,
        exclude: path.join(__dirname, 'src'),
        loader: 'style!css',
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract(
          'style-loader',
          'css-loader!' +
          'postcss-loader!' +
          'less-loader?' +
          JSON.stringify(
            { modifyVars: themeVariables, root: path.resolve(__dirname, './styles') }
            )
        ),
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel'],
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        loader: 'url-loader?prefix=img/&limit=10000',
      },
      {
        test: /\.(woff|woff2|ttf|eot)$/,
        loader: 'url-loader?prefix=font/&limit=10000',
      },
    ],
  },

  postcss: [autoprefixer],

  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
};


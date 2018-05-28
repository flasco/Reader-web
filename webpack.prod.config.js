const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const uglify = require('uglifyjs-webpack-plugin');

const extractCSS = new ExtractTextPlugin('css/[name]-self.css');
const extractLESS = new ExtractTextPlugin('css/[name]-common.css');

module.exports = {
  output: {
    path: __dirname + "/build",
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react'],
            plugins: [
              '@babel/plugin-proposal-class-properties',
              ['import', { "libraryName": "antd", "style": true }]
            ],
          }
        }
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}
          }
        ]
      },
      {
        test: /\.css$/,
        use: extractCSS.extract(['css-loader'])
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.less$/i,
        use: extractLESS.extract({
          use: [{
            loader: "css-loader"
          }, {
            loader: "less-loader",
            options: { javascriptEnabled: true }
          }],
          fallback: "style-loader"
        })
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: "commons",
          chunks: "initial",
          minChunks: 2
        }
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin(['build']),
    new uglify(),
    extractCSS,
    extractLESS
  ],
}
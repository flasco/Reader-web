const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractCSS = new ExtractTextPlugin('css/[name]-self.css');
const extractLESS = new ExtractTextPlugin('css/[name]-common.css');
module.exports = {
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
              ['import', { libraryName: "antd", style: 'css' }]
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
            options: { 
              modules: false,
              modifyVars: { "@primary-color": "'#1DA57A'" },
             }
          }],
          fallback: "style-loader"
        })
      }
    ]
  },
  devServer: {
    inline: true,
    port: 8090
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
    new CleanWebpackPlugin(['dist']),
    new OpenBrowserPlugin({
      url: 'http://localhost:8090'
    }),
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(true) // 添加一个变量，此时为测试环境
    }),
    extractCSS,
    extractLESS
  ],
}
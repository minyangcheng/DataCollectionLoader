var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
var merge = require('webpack-merge')

var baseConfig = {
  entry: './dev/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({template: './index.html', hash: true}),
  ]
}

var outputConfig

if (process.env.NODE_ENV == 'development') {
  outputConfig = merge(baseConfig, {
    mode: 'development',
    devtool: '#cheap-module-eval-source-map',
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      port: 8081,
      host: '0.0.0.0',
      historyApiFallback: true,
    },
    plugins: []
  })
} else if (process.env.NODE_ENV == 'production') {
  outputConfig = merge(baseConfig, {
    mode: 'production',
    devtool: '#source-map',
  })
}

module.exports = outputConfig ? outputConfig : baseConfig

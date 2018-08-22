var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
var merge = require('webpack-merge')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

var baseConfig = {}

var outputConfig

if (process.env.NODE_ENV == 'development') {
  outputConfig = merge(baseConfig, {
    entry: './dev/main.js',
    output: {
      path: path.resolve(__dirname, './dist'),
      publicPath: '/',
      filename: 'bundle.js'
    },
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
      }
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: ['vue-loader', 'data-collection-loader'],
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
    ],
    mode: 'development',
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      port: 8081,
      host: '0.0.0.0',
      historyApiFallback: true,
    },
  })
} else if (process.env.NODE_ENV == 'production') {
  outputConfig = merge(baseConfig, {
    entry: './src/monitor.js',
    output: {
      path: path.resolve(__dirname, './dist'),
      publicPath: '/',
      filename: 'monitor.js'
    },
    resolve: {
      extensions: ['.js', '.json'],
      alias: {}
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: "babel-loader",
        },
      ]
    },
    mode: 'production',
  })
}

module.exports = outputConfig ? outputConfig : baseConfig

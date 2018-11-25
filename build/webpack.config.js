const path = require('path')
const webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader') 

module.exports = {
  mode: 'production',
  devtool: '#source-map',
  entry: {
    'shared-footer': path.resolve(__dirname, '../src/main.js')
  },
  // default for pretty much every project
  context: __dirname,
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.(scss|css)$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader',
          {
            loader: 'style-resources-loader',
            options: {
                patterns: [
                  path.resolve(__dirname, '../src/styles/_footer-variables.scss'),
                ]
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]-[hash].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ]
}
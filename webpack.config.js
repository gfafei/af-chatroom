const path = require('path');
const index = './web/index.js';

module.exports = {
  entry: index,
  output: {
    filename: 'bundle.js',
    path: './public',
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage-0', 'react']
        }
      }, {
        test: /\.jsx$/,
        loader: 'babel-loader'
      }, {
        test: /\.less$/,
        loaders: ['style-loader', 'css-loader', 'less-loader'],
      }, {
        test: /\.(ttf|eot|woff|woff2|otf|svg)$/,
        loader: 'url-loader',
      }
    ]
  }
}
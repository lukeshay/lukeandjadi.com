const path = require('path');

module.exports = {
  entry: { emailer: './src/emailer.js' },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist/'),
  },
  mode: 'production',
  target: 'webworker',
  module: {
    rules: [
      {
        test: /\.js$/, // include .js files
        enforce: 'pre', // preload the jshint loader
        exclude: /node_modules/, // exclude any and all files in the node_modules folder
        include: __dirname,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
    ],
  },
};

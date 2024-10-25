const path = require('path');

module.exports = {
  entry: {
    main: './src/index.js',
    skating: './src/skating/index.js',
    skipping: './src/skipping/index.js'
  },
  devtool: 'eval-source-map',
  devServer: {
    static: './dist',
  },
  output: {
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].js.map',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: "development"
};
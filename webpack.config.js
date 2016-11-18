var path = require('path');

module.exports = {
  entry: {
      'asteroids-game': "./src/entry.js",
  },
  target: 'web',
  output: {
    path: path.join(__dirname, 'dist'),
  	filename: "[name].js"
  },
  module: {
    loaders: [{
      test: /\.js$/,
      include: [path.resolve(__dirname, "./src")],
      exclude: /node_modules|\.git/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015'],
        cacheDirectory: true
      }
    }]
  },
  devtool: 'source-map',
};

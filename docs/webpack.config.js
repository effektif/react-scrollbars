var webpack = require('webpack');

module.exports = {
  entry: './',
  output: {
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.css']
  },
  plugins: [
    new webpack.NormalModuleReplacementPlugin( // allow examples to include react-scrollbar
      /^react-scrollbar$/,
      __dirname + '/../src'
    )
  ],
  module: {
    loaders: [
      { test: /\.jsx$/, loaders: ['react-hot-loader', 'babel-loader'] },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.(png|woff)$/, loader: 'url-loader?limit=100000' },
      { test: /\.md$/, loader: "html!markdown" }
    ]
  }
};

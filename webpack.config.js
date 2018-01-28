const path = require('path');
const ExtractText = require('extract-text-webpack-plugin');

const extractCss = new ExtractText({
  filename: '[name].css',
});

module.exports = {
  entry: {
    'artstudio-101': './src/index.js',
    gallery: './src/js/gallery.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist/css'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
      },
      {
        test: /\.scss$/,
        use: extractCss.extract({
          use: [
            { loader: 'css-loader', options: { importLoaders: 1 } },
            'postcss-loader',
            { loader: 'sass-loader' },
          ],
          fallback: {
            loader: 'style-loader',
          },
        }),
      },
      {
        test: /\.(eot|svg|ttf|woff)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
            },
          },
        ],
      },
      {
        test: /\.(png|jpg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: '../img/',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    extractCss,
  ],
};

const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const pathSrc = './src/scripts';
const pathStatic = './src/static';
const pathTemplates = './src/templates';

const pathBuild = path.resolve(__dirname, 'build');
const pathPublic = '/scripts';
const pathModules = './node_modules';

module.exports = {
  entry: {
    app: `${pathSrc}/index`,
  },
  output: {
    path: `${pathBuild}/scripts`,
    publicPath: pathPublic,
    filename: '[name].js',
    chunkFilename: '[name].js',
  },
  target: 'web',
  devtool: 'source-map',
  devServer: {
    static: {
      directory: pathBuild,
    },
    compress: true,
    port: 3000,
    devMiddleware: {
      writeToDisk: true,
    },
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [{ loader: 'ts-loader' }],
        include: path.resolve(pathSrc),
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: pathStatic, to: pathBuild }],
    }),
    new HtmlWebPackPlugin({
      template: `${pathTemplates}/index.html`,
      filename: `${pathBuild}/index.html`,
      publicPath: pathPublic,
    }),
    new ESLintPlugin({
      extensions: ['ts', 'tsx', 'js'],
      exclude: ['node_modules', 'build'],
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    modules: [path.resolve(pathSrc), path.resolve(pathModules)],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        libs: {
          // node modules imported non-dynamically
          name: 'libs',
          chunks: 'initial',
          test: /node_modules/,
        },
      },
    },
    minimizer: [new TerserWebpackPlugin()],
  },
  stats: 'minimal',
  performance: {
    hints: false,
  },
  watchOptions: {
    ignored: /node_modules/,
  },
};

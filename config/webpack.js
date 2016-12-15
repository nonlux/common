/* eslint import/no-extraneous-dependencies: 0 */
import path from 'path';
import fs from 'fs';
import webpack from 'webpack';
import CopyPlugin from 'copy-webpack-plugin';
import CleanPlugin from 'clean-webpack-plugin';

/* path and env */
const PWD = process.cwd();
const SRC_DIR = path.resolve(PWD, 'src');
const BUILD_DIR = path.resolve(PWD, 'dist');
const STATIC_DIR = path.resolve(PWD, 'static/');

/* config keys */
const modulesDirectories = [
  'src',
  'src/common',
  'node_modules',
];

const devtool = 'eval';

/* js Loader */
const jsLoader = {
  test: /\.js$/,
  exclude: /node_modules/,
  loaders: [],
};

function babelLoader({ NODE_ENV }) {
  const babelrc = fs.readFileSync(`${PWD}/.babelrc`);
  let babelrcObject = {};

  try {
    babelrcObject = JSON.parse(babelrc);
  } catch (err) {
    console.error('==>     ERROR: Error parsing your .babelrc.');
    console.error(err);
  }

  const babelrcEnvObject = babelrcObject.env[NODE_ENV];
  let babelLoaderQuery = { ...babelrcObject };
  let combinedPlugins = babelrcObject.plugins || [];
  if (babelrcEnvObject) {
    combinedPlugins = combinedPlugins.concat(babelrcEnvObject.plugins);
    babelLoaderQuery = {
      ...babelLoaderQuery,
      ...babelrcEnvObject,
      plugins: combinedPlugins,
      cacheDirectory: '.cache/babel',
    };
  }

  return ['babel', JSON.stringify(babelLoaderQuery)].join('?');
}
jsLoader.loaders.push(babelLoader(process.env));


/* cpy assets */
const CopyStatic = { from: STATIC_DIR, to: BUILD_DIR };

/* plugins */
const plugins = [
  new CleanPlugin([BUILD_DIR], {
    root: PWD,
  }),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.NoErrorsPlugin(),
  new CopyPlugin([
    CopyStatic,
  ]),
];


/* export */
const config = {
  cache: true,
  context: PWD,
  devtool,
  entry: {
    main: 'src/index.js',
  },
  output: {
    filename: 'js/[name].js',
    chunkFilename: '[chunkhash].js',
    path: BUILD_DIR,
  },
  resolveLoader: {
    modulesDirectories,
  },
  resolve: {
    modulesDirectories,
    extensions: ['', '.json', '.js', '.jsx'],
  },
  module: {
    loaders: [
      jsLoader,
      { test: /\.json$/, loader: 'json-loader' },
    ],
  },
  plugins,
  devServer: {
    outputPath: BUILD_DIR,
    contentBase: BUILD_DIR,
    hot: true
  }
};


export default config;

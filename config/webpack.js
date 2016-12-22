/* eslint import/no-extraneous-dependencies: 0 */
import path from 'path';
import fs from 'fs';
import webpack from 'webpack';
import CopyPlugin from 'copy-webpack-plugin';
import CleanPlugin from 'clean-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

/* path and env */
const PWD = process.cwd();
const SRC_DIR = path.resolve(PWD, 'src');
const BUILD_DIR = path.resolve(PWD, 'dist');
const STATIC_DIR = path.resolve(PWD, 'static/');
const BOWER_DIR = path.resolve(PWD, 'bower_components/');

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
const bowerrc =  require(path.resolve(PWD, 'package.json'));
const CopyStatic = { from: STATIC_DIR, to: BUILD_DIR };

const cps = {
  'font-awesome': [
    { from: path.resolve(BOWER_DIR, 'font-awesome/css'),
      to: path.resolve(BUILD_DIR, 'css') },
    { from: path.resolve(BOWER_DIR, 'font-awesome/fonts'),
      to: path.resolve(BUILD_DIR, 'fonts') },
  ],
};


const copyAssets = [
  CopyStatic,
];

Object.keys(bowerrc.dependencies).forEach((key) => {
  if (cps[key]) {
    cps[key].forEach(asset => copyAssets.push(asset));
  }
});

/* plugins */
const plugins = [
  new CleanPlugin([BUILD_DIR], {
    root: PWD,
  }),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.NoErrorsPlugin(),
  new CopyPlugin(
    copyAssets
  ),
  new ExtractTextPlugin('css/main.css'),
];

/* postcss */
import pseudoPostPlugin from 'postcss-pseudo-classes';
import variablesPostPlugin from 'postcss-simple-vars';
import cssnextPostPlugin from 'postcss-cssnext';
import mixinsPostPlugin from 'postcss-mixins';
import utilitiesPostPlugin from 'postcss-utilities';
import nestedPostPlugin from 'postcss-nested';
import ancestorsPostPlugin from 'postcss-nested-ancestors';
import mediaPostPlugin from 'postcss-reverse-media';
import injectPostPlugin from 'postcss-inject';
import resemblePostPlugin from 'postcss-resemble-image';
import magicianPostPlugin from 'postcss-font-magician';
import lostPostPlugin from 'lost';
import spritesPostPlugin from 'postcss-sprites';
import importPostPlugin from 'postcss-import';

const csspath = path.resolve(PWD, 'styles/common.css');
const postcssPlugins = [
  // injectPostPlugin: ({
  //   injectTo: 'fileStart',
  //   filePath: csspath,
  // }),
  importPostPlugin({
    path: SRC_DIR,
  }),
  variablesPostPlugin({
    unknown: (node, name, result) => {
      node.warn(result, `Unknown variable ${name}`);
    },
  }),
  mixinsPostPlugin,
  cssnextPostPlugin,
  utilitiesPostPlugin,
  nestedPostPlugin,
  ancestorsPostPlugin,
  mediaPostPlugin,
  resemblePostPlugin(),
  magicianPostPlugin(),
  lostPostPlugin(),
  pseudoPostPlugin({ allCombinations: true, preserveBeforeAfter: false }),
  spritesPostPlugin({
    stylesheetPath: path.resolve(BUILD_DIR, 'css'),
    spritePath: path.resolve(BUILD_DIR, 'images'),
  }),
];
const cssLoader = {
  test: /\.css$/,
  loader: ExtractTextPlugin.extract([ 'css-loader', 'postcss-loader']),
};

/* export */

const config = {
  cache: true,
  context: PWD,
  devtool,
  entry: {
    main: 'src/index.js',
    dev: 'styles/common.css',
  },
  output: {
    filename: 'js/[name].js',
    chunkFilename: '[chunkhash].js',
    path: BUILD_DIR,
    libraryTarget: 'var',
    library: 'className',
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
      cssLoader,
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false',
        ],
      },
    ],
  },
  plugins,
  devServer: {
    outputPath: BUILD_DIR,
    contentBase: BUILD_DIR,
    hot: true,
  },
  postcss: {
    plugins: postcssPlugins,
  },
};


export default config;

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
const bowerrc =  require(path.resolve(PWD, 'bower.json'));
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
];

/* postcss */
import pseudoPostPlugin from 'postcss-preudo-plugin';
import variablesPostPlugin from 'postcss-css-variables';

const postcssPlugins = [
  variablesPostPlugin(),
  pseudoPostPlugin({ allCombinations: true, preserveBeforeAfter: false }),

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

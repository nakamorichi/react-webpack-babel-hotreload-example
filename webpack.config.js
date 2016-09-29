'use strict';

const Path = require('path');
const Webpack = require('webpack');

const DEV_SERVER_PORT = process.env.PORT = process.env.PORT || 7000;
const NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV.toLowerCase() : 'development';
const MODE_DEV_SERVER = process.argv[1].indexOf('webpack-dev-server') > -1 ? true : false;
const FAIL_ON_ERROR = process.env.FAIL_ON_ERROR ? JSON.parse(process.env.FAIL_ON_ERROR) : !MODE_DEV_SERVER; // disabled on dev-server mode, enabled in build mode
const OPTIMIZE = process.env.OPTIMIZE ? JSON.parse(process.env.OPTIMIZE) : NODE_ENV === 'production';

const plugins = [
	// Necessary for applying the correct environment everywhere
	new Webpack.DefinePlugin({
		'process.env': {
			'NODE_ENV': JSON.stringify(NODE_ENV)
		}
	})
];

if (!FAIL_ON_ERROR) {
	plugins.push(new Webpack.NoErrorsPlugin());
}

if (OPTIMIZE) {
	plugins.push(new Webpack.optimize.OccurrenceOrderPlugin());
	plugins.push(new Webpack.optimize.DedupePlugin());
	plugins.push(new Webpack.optimize.UglifyJsPlugin({
		compressor: {
			warnings: false
		}
	}));
}

const conf = {
	output: {
		path: Path.join(__dirname, 'public', 'assets'),
		filename: 'bundle.js',
		publicPath: '/assets/'
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				loaders: ['babel'],
				exclude: /node_modules/
			}
		]
	},
	resolve: {
		extensions: ['.js', '.jsx']
	},
	plugins: plugins
};

// webpack-dev-server mode
if (MODE_DEV_SERVER) {
	plugins.push(new Webpack.NamedModulesPlugin());
	plugins.push(new Webpack.HotModuleReplacementPlugin());
	conf.devtool = 'eval';
	conf.entry = [
		'babel-regenerator-runtime',
		'react-hot-loader/patch', // this has to be the first loaded plugin in order to work properly!
		'webpack-dev-server/client?http://0.0.0.0:' + DEV_SERVER_PORT, // WebpackDevServer host and port
		'webpack/hot/only-dev-server', // 'only' prevents reload on syntax errors
		'./src/app' // appʼs entry point
	];
} else {
	conf.devtool = 'source-map';
	conf.entry = ['babel-regenerator-runtime', './src/app'];
}

module.exports = conf;

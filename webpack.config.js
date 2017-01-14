'use strict';

const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Path = require('path');
const Webpack = require('webpack');

const pkg = require('./package.json');

const TARGET = process.env.npm_lifecycle_event;
const DEV_SERVER_PORT = process.env.PORT = process.env.PORT || 7000;
const NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV.toLowerCase() : 'development';
const IN_DEV_MODE = NODE_ENV == 'development';

// common plugins
const plugins = [
	new Webpack.DefinePlugin({
		'process.env': {
			// Necessary for applying the correct environment everywhere
			'NODE_ENV': JSON.stringify(NODE_ENV)
		}
	}),
	new Webpack.optimize.CommonsChunkPlugin({
		name: 'vendor'
	}),
	new HtmlWebpackPlugin({
		filename: 'index.html',
		template: 'src/index.html'
	})
];

// common configuration
const conf = {
	output: {
		path: Path.join(__dirname, 'public/assets'),
		filename: '[name].js',
		publicPath: '/'
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				loaders: ['babel-loader'],
				exclude: /node_modules/
			}
		]
	},
	resolve: {
		extensions: ['.js', '.jsx'],
		modules: [
			'src',
			'node_modules'
		]
	},
	plugins: plugins
};

if (IN_DEV_MODE) { // development mode (webpack-dev-server)
	plugins.push(new Webpack.NoErrorsPlugin());
	plugins.push(new Webpack.NamedModulesPlugin());
	plugins.push(new Webpack.HotModuleReplacementPlugin());
	plugins.push(new Webpack.SourceMapDevToolPlugin({
		filename: '[file].map'
	}));

	conf.performance = {
		hints: false
	};
	conf.entry = {
		main: [
			Path.join(__dirname, 'src/app')
		],
		vendor: [
			'react-hot-loader/patch', // this has to be the first loaded plugin in order to work properly!
			'webpack-dev-server/client?http://0.0.0.0:' + DEV_SERVER_PORT, // WebpackDevServer host and port
			'webpack/hot/only-dev-server', // 'only' prevents reload on syntax errors
			Path.join(__dirname, 'src/app') // appʼs entry point
		]
	};
} else { // production mode (bundling)
	plugins.push(new Webpack.optimize.UglifyJsPlugin({
		compressor: {
			warnings: false
		}
	}));

	plugins.push(new CleanWebpackPlugin(['public/assets'], {
		root: Path.resolve(__dirname),
		verbose: true,
		dry: false,
		exclude: ['.gitignore']
	}));

	conf.output.filename = '[name]-[chunkhash].js';
	conf.entry = {
		main: Path.join(__dirname, 'src/app'),
		vendor: Object.keys(pkg.dependencies) // determine vendor contents from package.json
	};
}

module.exports = conf;

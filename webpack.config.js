'use strict';

const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Path = require('path');
const Webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const pkg = require('./package.json');

// const TARGET = process.env.npm_lifecycle_event;
process.env.PORT = process.env.PORT || 7000;
const DEV_SERVER_PORT = process.env.PORT;
const NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV.toLowerCase() : 'development';
const IN_DEV_MODE = NODE_ENV === 'development';

// common plugins
const plugins = [
	new Webpack.DefinePlugin({
		'process.env': {
			// Necessary for applying the correct environment everywhere
			NODE_ENV: JSON.stringify(NODE_ENV),
		},
	}),
	new Webpack.optimize.CommonsChunkPlugin({
		name: 'vendor',
		minChunks: module => module.context && module.context.indexOf('node_modules') !== -1,
	}),
	new Webpack.optimize.CommonsChunkPlugin({
		name: 'manifest',
	}),
	new HtmlWebpackPlugin({
		filename: 'index.html',
		template: 'src/index.html',
	}),
];

// common configuration
const conf = {
	target: 'web',
	output: {
		path: Path.join(__dirname, 'public'),
		filename: '[name].js',
		publicPath: '/',
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				use: ['babel-loader'],
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: ['.js', '.jsx'],
		modules: [
			'src',
			'node_modules',
		],
	},
	plugins,
};

if (IN_DEV_MODE) { // development mode (webpack-dev-server)
	console.log(`Development mode: NODE_ENV=${NODE_ENV}`);
	plugins.push(new Webpack.NoEmitOnErrorsPlugin());
	plugins.push(new Webpack.NamedModulesPlugin());
	plugins.push(new Webpack.HotModuleReplacementPlugin());
	plugins.push(new Webpack.SourceMapDevToolPlugin({
		columns: false,
		// exclude: ['vendor.js'],
		filename: '[file].map',
	}));

	conf.performance = {
		hints: false,
	};
	conf.entry = {
		main: [
			Path.join(__dirname, 'src/app'),
		],
		vendor: [
			'react-hot-loader/patch', // this has to be the first loaded plugin in order to work properly!
			`webpack-dev-server/client?http://0.0.0.0:${DEV_SERVER_PORT}`, // WebpackDevServer host and port
			'webpack/hot/only-dev-server', // 'only' prevents reload on syntax errors
		].concat(Object.keys(pkg.dependencies)),
	};
} else { // production mode (bundling)
	console.log(`Production mode: NODE_ENV=${NODE_ENV}`);
	plugins.push(new UglifyJSPlugin({
		uglifyOptions: {
			compress: true,
			ecma: 8,
			ie8: false,
			mangle: true,
			warnings: false,
		},
	}));

	plugins.push(new CleanWebpackPlugin(['public'], {
		root: Path.resolve(__dirname),
		verbose: true,
		dry: false,
		exclude: ['.gitignore'],
	}));

	conf.output.filename = '[name]-[chunkhash].js';
	conf.output.publicPath = '/';
	conf.entry = {
		main: Path.join(__dirname, 'src/app'),
	};
}

module.exports = conf;

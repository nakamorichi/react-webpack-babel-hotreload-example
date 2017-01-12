'use strict';

const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Path = require('path');
const Webpack = require('webpack');

const pkg = require('./package.json');

const DEV_SERVER_PORT = process.env.PORT = process.env.PORT || 7000;
const NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV.toLowerCase() : 'development';
const MODE_DEV_SERVER = process.argv[1].indexOf('webpack-dev-server') > -1 ? true : false;
const FAIL_ON_ERROR = process.env.FAIL_ON_ERROR ? JSON.parse(process.env.FAIL_ON_ERROR) : !MODE_DEV_SERVER; // disabled on dev-server mode, enabled in build mode
const OPTIMIZE = process.env.OPTIMIZE ? JSON.parse(process.env.OPTIMIZE) : NODE_ENV === 'production';

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
		hash: true,
		filename: 'index.html',
		template: 'src/index.html'
	})
];

if (!FAIL_ON_ERROR) {
	plugins.push(new Webpack.NoErrorsPlugin());
}

if (OPTIMIZE) {
	plugins.push(new Webpack.optimize.UglifyJsPlugin({
		compressor: {
			warnings: false
		}
	}));
}

const conf = {
	output: {
		path: Path.join(__dirname, 'public/assets'),
		filename: '[name].js',
		publicPath: '/assets'
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

// webpack-dev-server mode
if (MODE_DEV_SERVER) {
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
} else {
	plugins.push(new CleanWebpackPlugin(['public/assets'], {
		root: Path.resolve(__dirname),
		verbose: true, 
		dry: false,
		exclude: ['.gitignore']
	}));
	conf.output.filename = '[name]-[chunkhash].js';
	conf.entry = {
		main: Path.join(__dirname, 'src/app'),
		vendor: Object.keys(pkg.dependencies)
	};
}

module.exports = conf;

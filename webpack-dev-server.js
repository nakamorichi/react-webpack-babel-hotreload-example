'use strict';

const Path = require('path');
const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const WebpackConfig = require('./webpack.config');

const DEV_SERVER_PORT = process.env.PORT;

new WebpackDevServer(Webpack(WebpackConfig), {
	contentBase: Path.resolve(__dirname, 'public'),
	historyApiFallback: true,
	hot: true,
	publicPath: WebpackConfig.output.publicPath,
	stats: {
		colors: true,
		chunks: false
	}
}).listen(DEV_SERVER_PORT, 'localhost', (err, result) => {
	if (err) {
		return console.log(err);
	}

	console.log(`[${process.pid}] Webpack development server running at http://localhost:${DEV_SERVER_PORT}`);
	console.log(`[${process.pid}] NODE_ENV=[${process.env.NODE_ENV}]`);
});

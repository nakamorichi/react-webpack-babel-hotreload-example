'use strict';

const Path = require('path');
const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const WebpackConfig = require('./webpack.config');

const DEV_SERVER_PORT = process.env.PORT;
const HOSTNAME = '0.0.0.0';

new WebpackDevServer(Webpack(WebpackConfig), {
	contentBase: Path.resolve(__dirname, 'public'),
	historyApiFallback: true,
	hot: true,
	publicPath: WebpackConfig.output.publicPath,
	stats: {
		colors: true,
		chunks: false,
	},
}).listen(DEV_SERVER_PORT, HOSTNAME, (err, result) => {
	if (err) {
		console.log(err);
	} else {
		console.log(`[${process.pid}] Webpack development server running at http://${HOSTNAME}:${DEV_SERVER_PORT}`);
		console.log(`[${process.pid}] NODE_ENV=[${process.env.NODE_ENV}]`);
	}
});

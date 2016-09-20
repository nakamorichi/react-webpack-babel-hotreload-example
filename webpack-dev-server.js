'use strict';

const Path = require('path');
const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const WebpackConfig = require('./webpack.config');

const port = WebpackConfig.DEV_SERVER_PORT;
const conf = WebpackConfig.conf;

new WebpackDevServer(Webpack(conf), {
	publicPath: conf.output.publicPath,
	hot: true,
	historyApiFallback: true,
	contentBase: Path.join(__dirname, 'public'),
	stats: {
		colors: true,
		chunks: false
	}
}).listen(port, 'localhost', function (err, result) {
	if (err) {
		return console.log(err);
	}

	console.log('Listening at http://localhost:' + port + '/');
	console.log('NODE_ENV=[' + process.env.NODE_ENV + ']');
});

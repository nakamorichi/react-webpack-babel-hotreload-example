'use strict';

const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const WebpackConfig = require('./webpack.config');

new WebpackDevServer(Webpack(WebpackConfig), {
	publicPath: WebpackConfig.output.publicPath,
	hot: true,
	historyApiFallback: true,
	contentBase: './public',
	stats: {
		colors: true,
		chunks: false
	}
}).listen(WebpackConfig.PORT, 'localhost', function (err, result) {
	if (err) {
		return console.log(err);
	}

	console.log('Listening at http://localhost:' + WebpackConfig.PORT + '/');
	console.log('NODE_ENV=[' + process.env.NODE_ENV + ']');
});

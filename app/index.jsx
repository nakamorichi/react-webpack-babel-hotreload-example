import {AppContainer} from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

import App from './app.jsx';

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

const root = document.getElementById('root');
const app = (
	<AppContainer>
		<App/>
	</AppContainer>
);

ReactDOM.render(app, root);

// module.hot.accept(); // does not seem to work (yet?)

if (module.hot) {
	module.hot.accept('./app.jsx', () => {
		// If you use Webpack 2 in ES modules mode, you can
		// use <App /> here rather than require() a <NextApp />.
		// const NextApp = require('./app.jsx').default;
		ReactDOM.render(
			<AppContainer>
				<App/>
			</AppContainer>, root);
	});
}
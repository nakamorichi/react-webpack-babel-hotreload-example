import {AppContainer} from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Root from './root';

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

const root = document.getElementById('root');

ReactDOM.render(<Root/>, root);

if (module.hot) {
	module.hot.accept('./root', () => {
		ReactDOM.render(
			<AppContainer>
				<Root/>
			</AppContainer>, root);
	});
}

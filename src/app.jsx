// React
import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import { AppContainer } from 'react-hot-loader';

// Redux
import { applyMiddleware, compose, createStore } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';

import injectTapEventPlugin from 'react-tap-event-plugin';

import { rootReducer, rootSaga } from './reducers';
import Root from './components/root';

function configureStore(initial_state, middleware) {
	const store = createStore(
		rootReducer,
		initial_state,
		compose(
			applyMiddleware(...middleware),
			window.devToolsExtension ? window.devToolsExtension() : x => x
		)
	);

	if (module.hot) {
		// Enable Webpack hot module replacement for reducers
		module.hot.accept('./reducers', () => {
			store.replaceReducer(rootReducer);
		});
	}

	return store;
}

const sagaMiddleware = createSagaMiddleware();
const initial_state = {};
const middleware = [sagaMiddleware];
const store = configureStore(initial_state, middleware);
const history = syncHistoryWithStore(browserHistory, store);

sagaMiddleware.run(rootSaga);

// Needed for onTouchTap
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

const root = document.getElementById('root');

render(<Root store={store} history={history}/>, root);

if (module.hot) {
	module.hot.accept('./components/root', () => {
		render(
			<AppContainer>
				<Root store={store} history={history}/>
			</AppContainer>, root);
	});
}

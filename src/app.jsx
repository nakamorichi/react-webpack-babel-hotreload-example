// React
import React from 'react';
import { render } from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import { AppContainer } from 'react-hot-loader';

// Redux
import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';

import injectTapEventPlugin from 'react-tap-event-plugin';

import { rootReducer, rootSaga } from './reducers';
import Root from './components/root';

const configureStore = (initial_state, middleware) => {
	const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
	const store = createStore(
		rootReducer,
		initial_state,
		composeEnhancers(
			applyMiddleware(...middleware)
		)
	);

	if (module.hot) {
		// Enable Webpack hot module replacement for reducers
		module.hot.accept('./reducers', () => {
			store.replaceReducer(rootReducer);
		});
	}

	return store;
};

const initial_state = {};
const history = createHistory();
const reactRouterReduxMiddleware = routerMiddleware(history);
const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware, reactRouterReduxMiddleware];
const store = configureStore(initial_state, middleware);

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

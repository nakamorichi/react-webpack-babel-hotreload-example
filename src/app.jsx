// React
import React from 'react';
import {render} from 'react-dom';
import {browserHistory} from 'react-router';
import {AppContainer} from 'react-hot-loader';

// Redux
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {syncHistoryWithStore, routerReducer} from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';

import injectTapEventPlugin from 'react-tap-event-plugin';

import {exampleReducer, rootSaga} from './reducers';
import Root from './root';

const rootReducer = combineReducers({routing: routerReducer, exampleReducer});
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
	rootReducer,
	window.devToolsExtension && window.devToolsExtension(),
	applyMiddleware(sagaMiddleware)
);
const history = syncHistoryWithStore(browserHistory, store);

sagaMiddleware.run(rootSaga);

// Needed for onTouchTap
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

const root = document.getElementById('root');

render(<Root store={store} history={history}/>, root);

if (module.hot) {
	module.hot.accept('./root', () => {
		render(
			<AppContainer>
				<Root store={store} history={history}/>
			</AppContainer>, root);
	});
}

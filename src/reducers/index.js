import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { fork } from 'redux-saga/effects';

import { asyncFetchReducer, asyncFetchWatchers } from './async_fetch_reducer';
import { menuReducer } from './menu_reducer';

export const rootReducer = combineReducers({
	routing: routerReducer,
	asyncFetchReducer,
	menuReducer
});

export const rootSaga = function* () {
	yield [
		...asyncFetchWatchers.map(watcher => fork(watcher))
	];
};

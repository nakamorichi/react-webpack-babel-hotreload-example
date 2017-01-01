import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { fork } from 'redux-saga/effects';

import { asyncFetchReducer, asyncFetchWatchers } from 'reducers/async_fetch_reducer';

export const rootReducer = combineReducers({
	routing: routerReducer,
	asyncFetchReducer
});

export const rootSaga = function* () {
	yield [
		fork(asyncFetchWatchers)
	];
};

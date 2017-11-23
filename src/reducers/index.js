import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { all } from 'redux-saga/effects';

import { asyncFetchReducer, asyncFetchWatchers } from 'reducers/async_fetch_reducer';

export const rootReducer = combineReducers({
	routing: routerReducer,
	asyncFetchReducer,
});

export const rootSaga = function* () {
	yield all([
		asyncFetchWatchers(),
	]);
};

import { call, put, select, takeLatest } from 'redux-saga/effects';

import http from 'utilities/http';

// Redux reducer's initial state
const initial_state = {
	fetch_url: 'https://jsonplaceholder.typicode.com/users',
	fetch_result: []
};

// Redux action types
//// Redux action requests
export const ASYNC_FETCH_SUCCEEDED = 'ASYNC_FETCH_SUCCEEDED';
export const ASYNC_FETCH_FAILED = 'ASYNC_FETCH_FAILED';
export const CHANGE_FETCH_URL = 'CHANGE_FETCH_URL';

//// Saga worker requests
export const REQUEST_ASYNC_FETCH = 'REQUEST_ASYNC_FETCH';

// Redux actions
export const requestAsyncFetchAction = (url) => {
	const action = { type: REQUEST_ASYNC_FETCH };
	if (typeof url === 'string') action['url'] = url;
	return action;
};

export const changeFetchURLAction = (obj) => {
	const new_fetch_url = obj.target.value || typeof(obj) === 'string' ? obj : '';
	return { type: CHANGE_FETCH_URL, new_fetch_url };
};

// Saga workers
const asyncFetchWorker = function* (action) {
	const fetch_url = action.url || (yield select((state) => state.asyncFetchReducer.fetch_url));
	try {
		let data = yield call(http, fetch_url);
		if (data && !(data instanceof Array)) data = [data];
		yield put({ type: ASYNC_FETCH_SUCCEEDED, data });
	} catch (error) {
		yield put({ type: ASYNC_FETCH_FAILED, error: { message: error.message } });
	}
};

// Saga watchers (remember to fork these in the root Saga)
export const asyncFetchWatchers = function* () {
	yield [
		takeLatest(REQUEST_ASYNC_FETCH, asyncFetchWorker)
	];
};

export const asyncFetchReducer = (state = initial_state, action) => {
	switch (action.type) {

		case ASYNC_FETCH_SUCCEEDED:
			return {
				...state,
				fetch_result: action.data
			};

		case ASYNC_FETCH_FAILED:
			return {
				...state,
				error: action.error
			};

		case CHANGE_FETCH_URL:
			return {
				...state,
				fetch_url: action.new_fetch_url
			};

		default:
			return state;
	}
};

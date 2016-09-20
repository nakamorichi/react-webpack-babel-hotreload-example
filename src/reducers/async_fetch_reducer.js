import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

// Redux action types
const types = {
	// Redux action requests
	ASYNC_FETCH_SUCCEEDED: 'ASYNC_FETCH_SUCCEEDED',
	ASYNC_FETCH_FAILED: 'ASYNC_FETCH_FAILED',
	SHOW_DIALOG: 'SHOW_DIALOG',
	HIDE_DIALOG: 'HIDE_DIALOG',

	// Saga worker requests
	REQUEST_ASYNC_FETCH: 'REQUEST_ASYNC_FETCH'
};

// Redux actions
export const actions = {
	showDialog: () => ({ type: types.SHOW_DIALOG }),
	hideDialog: () => ({ type: types.HIDE_DIALOG }),
	requestAsyncFetch: () => ({ type: types.REQUEST_ASYNC_FETCH })
};

function fetchExample(url) {
	return fetch(url).then(response => response.json());
}

// Saga workers
export function* asyncFetchWorker(action) {
	const url = 'https://jsonplaceholder.typicode.com/users';
	try {
		const data = yield call(fetchExample, url);
		yield put({ type: types.ASYNC_FETCH_SUCCEEDED, data });
	} catch (error) {
		yield put({ type: types.ASYNC_FETCH_FAILED, error: { type: error.type, message: error.message } });
	}
}

// Saga watchers
export function* asyncFetchWatcher() {
	yield* takeEvery(types.REQUEST_ASYNC_FETCH, asyncFetchWorker);
}

const initial_state = {
	fetch_result: [],
	is_showing_dialog: false
};

export function asyncFetchReducer(state = initial_state, action) {
	switch (action.type) {

		case types.SHOW_DIALOG:
			return {
				...state,
				is_showing_dialog: true
			};

		case types.HIDE_DIALOG:
			return {
				...state,
				is_showing_dialog: false
			};

		case types.ASYNC_FETCH_SUCCEEDED:
			return {
				...state,
				fetch_result: action.data
			};

		case types.ASYNC_FETCH_FAILED:
			return {
				...state
			};

		default:
			return state;
	}
}

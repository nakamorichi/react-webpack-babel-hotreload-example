import { takeEvery } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';

// Redux action types
const types = {
	// Redux action requests
	ASYNC_FETCH_SUCCEEDED: 'ASYNC_FETCH_SUCCEEDED',
	ASYNC_FETCH_FAILED: 'ASYNC_FETCH_FAILED',
	SHOW_DIALOG: 'SHOW_DIALOG',
	HIDE_DIALOG: 'HIDE_DIALOG',
	CHANGE_FETCH_URL: 'CHANGE_FETCH_URL',

	// Saga worker requests
	REQUEST_ASYNC_FETCH: 'REQUEST_ASYNC_FETCH'
};

// Redux actions
export const actions = {
	showDialog: () => ({ type: types.SHOW_DIALOG }),
	hideDialog: () => ({ type: types.HIDE_DIALOG }),
	requestAsyncFetch: () => ({ type: types.REQUEST_ASYNC_FETCH }),
	changeFetchURL: (obj) => {
		const new_fetch_url = obj.target.value || typeof(obj) === 'string' ? obj : '';
		return { type: types.CHANGE_FETCH_URL, new_fetch_url };
	}
};

const fetchExample = (url) => {
	return fetch(url).then(response => {
		if (response.ok) {
			return response.json();
		} else throw new Error('Fetch failed with status code: ' + response.status);
	});
};

const getFetchURL = (state) => state.asyncFetchReducer.fetch_url;

// Saga workers
export function* asyncFetchWorker() {
	const fetch_url = yield select(getFetchURL);
	try {
		const data = yield call(fetchExample, fetch_url);
		yield put({ type: types.ASYNC_FETCH_SUCCEEDED, data });
	} catch (error) {
		yield put({ type: types.ASYNC_FETCH_FAILED, error: { message: error.message } });
	}
}

// Saga watchers
export function* asyncFetchWatcher() {
	yield* takeEvery(types.REQUEST_ASYNC_FETCH, asyncFetchWorker);
}

const initial_state = {
	fetch_url: 'https://jsonplaceholder.typicode.com/users',
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
				...state,
				fetch_result: []
			};

		case types.CHANGE_FETCH_URL:
			return {
				...state,
				fetch_url: action.new_fetch_url
			};

		default:
			return state;
	}
}

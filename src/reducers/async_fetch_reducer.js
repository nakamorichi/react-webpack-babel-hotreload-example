import { takeEvery } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';

// Redux action types
//// Redux action requests
export const ASYNC_FETCH_SUCCEEDED = 'ASYNC_FETCH_SUCCEEDED';
export const ASYNC_FETCH_FAILED = 'ASYNC_FETCH_FAILED';
export const SHOW_DIALOG = 'SHOW_DIALOG';
export const HIDE_DIALOG = 'HIDE_DIALOG';
export const CHANGE_FETCH_URL = 'CHANGE_FETCH_URL';

//// Saga worker requests
export const REQUEST_ASYNC_FETCH = 'REQUEST_ASYNC_FETCH';

// Redux actions
export const showDialog = () => ({ type: SHOW_DIALOG });
export const hideDialog = () => ({ type: HIDE_DIALOG });
export const requestAsyncFetch = (url) => {
	const action = { type: REQUEST_ASYNC_FETCH };
	if (typeof url === 'string') action['url'] = url;
	return action;
};
export const changeFetchURL = (obj) => {
	const new_fetch_url = obj.target.value || typeof(obj) === 'string' ? obj : '';
	return { type: CHANGE_FETCH_URL, new_fetch_url };
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
export function* asyncFetchWorker(action) {
	const fetch_url = yield select(getFetchURL);
	try {
		let data = action.url || (yield call(fetchExample, fetch_url));
		if (data && !(data instanceof Array)) data = [data];
		yield put({ type: ASYNC_FETCH_SUCCEEDED, data });
	} catch (error) {
		yield put({ type: ASYNC_FETCH_FAILED, error: { message: error.message } });
	}
}

// Saga watchers
export function* asyncFetchWatcher() {
	yield* takeEvery(REQUEST_ASYNC_FETCH, asyncFetchWorker);
}

const initial_state = {
	fetch_url: 'https://jsonplaceholder.typicode.com/users',
	fetch_result: [],
	is_showing_dialog: false
};

export const asyncFetchReducer = (state = initial_state, action) => {
	switch (action.type) {

		case SHOW_DIALOG:
			return {
				...state,
				is_showing_dialog: true
			};

		case HIDE_DIALOG:
			return {
				...state,
				is_showing_dialog: false
			};

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

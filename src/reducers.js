import { takeEvery } from 'redux-saga';
import { call, fork, put } from 'redux-saga/effects';

// Redux action types
const types = {
	// Redux action requests
	REQUEST_ACTION_X: 'REQUEST_ACTION_X',
	REQUEST_ACTION_Y: 'REQUEST_ACTION_Y',
	REQUEST_ACTION_Z: 'REQUEST_ACTION_Z',

	// Saga worker requests
	ACTION_X: 'ACTION_X',
	ACTION_Y: 'ACTION_Y',
	ACTION_Z: 'ACTION_Z'
};

// Redux actions
export function actionX() {
	return { type: types.REQUEST_ACTION_X };
}
export function actionY() {
	return { type: types.REQUEST_ACTION_Y };
}
export function actionZ() {
	return { type: types.REQUEST_ACTION_Z };
}

// Saga workers
export function* actionXWorker(action) {

}
export function* actionYWorker(action) {

}
export function* actionZWorker(action) {

}

// Saga watchers
export function* actionXWatcher() {
	yield* takeEvery(types.REQUEST_ACTION_X, actionXWorker);
}
export function* actionYWatcher() {
	yield* takeEvery(types.REQUEST_ACTION_Y, actionYWorker);
}
export function* actionZWatcher() {
	yield* takeEvery(types.REQUEST_ACTION_Z, actionZWorker);
}

const initial_state = {
	x: false,
	y: false
};

export default function exampleReducer(state = initial_state, action) {
	switch (action.type) {
		case types.ACTION_X:
			return {
				...state,
				x: true
			};

		case types.ACTION_Y:
			return {
				...state,
				y: true
			};

		case types.ACTION_Z:
			return {
				...state,
				x: false,
				y: false
			};

		default:
			return state;
	}
}

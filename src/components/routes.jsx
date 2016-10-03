import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Index from './index';
import Main from './main';
import RouteExample1 from './route_example_1';
import RouteExample2 from './route_example_2';

import { requestAsyncFetchAction } from '../reducers/async_fetch_reducer';

// An example of how to initialize stateless component data asynchronously
const onEnterAction = (store, dispatchAction) => {
	return (nextState, replace) => {
		store.dispatch(dispatchAction);
	};
};

export const Routes = (store) => (
	<Route path='/' component={Main}>
		<IndexRoute component={Index}/>
		<Route path='route_example_1' component={RouteExample1} onEnter={onEnterAction(store, requestAsyncFetchAction('https://jsonplaceholder.typicode.com/posts/1'))}/>
		<Route path='route_example_2' component={RouteExample2}/>
	</Route>
);

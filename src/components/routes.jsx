import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Index from './index';
import Main from './main';
import RouteExample1 from './route_example_1';
import RouteExample2 from './route_example_2';

export default (
	<Route path='/' component={Main}>
		<IndexRoute component={Index}/>
		<Route path='route_example_1' component={RouteExample1}/>
		<Route path='route_example_2' component={RouteExample2}/>
	</Route>
);

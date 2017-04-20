import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import Index from 'components/index';
import RouteExample1 from 'components/route_example_1';
import RouteExample2 from 'components/route_example_2';

const Routes = () => (
	<div>
		<Route exact path='/' component={Index}/>
		<Route path='/route_example_1' component={RouteExample1}/>
		<Route path='/route_example_2' component={RouteExample2}/>
	</div>
);

Routes.propTypes = {
	store: PropTypes.object
};

export default Routes;

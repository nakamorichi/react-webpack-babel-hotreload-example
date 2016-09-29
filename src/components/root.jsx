import React, { PropTypes } from 'react';
import { Router} from 'react-router';

import { Provider } from 'react-redux';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { Routes } from './routes';

const muiTheme = getMuiTheme({});

const Root = ({ store, history }) => (
	<Provider store={store}>
		<MuiThemeProvider muiTheme={muiTheme}>
			<Router history={history}>
				{Routes(store)}
			</Router>
		</MuiThemeProvider>
	</Provider>
);

Root.propTypes = {
	store: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired
};

export default Root;

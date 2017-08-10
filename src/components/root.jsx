import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Main from 'components/main';

const muiTheme = getMuiTheme({});

const Root = ({ store, history }) => (
	<Provider store={store}>
		<MuiThemeProvider muiTheme={muiTheme}>
			<ConnectedRouter history={history}>
				<Main />
			</ConnectedRouter>
		</MuiThemeProvider>
	</Provider>
);

Root.propTypes = {
	store: PropTypes.objectOf(PropTypes.any).isRequired,
	history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Root;

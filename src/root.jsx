import React, {Component, PropTypes} from 'react';
import {Router} from 'react-router';

import {Provider} from 'react-redux';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Routes from './routes';

const muiTheme = getMuiTheme({});

export default class Root extends Component {
	static propTypes = {
		store: PropTypes.object.isRequired,
		history: PropTypes.object.isRequired
	};

	render() {
		const {store, history} = this.props;
		return (
			<Provider store={store}>
				<MuiThemeProvider muiTheme={muiTheme}>
					<Router history={history}>
						{Routes}
					</Router>
				</MuiThemeProvider>
			</Provider>
		);
	}
}

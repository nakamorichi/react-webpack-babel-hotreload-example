import React, {Component, PropTypes} from 'react';
import {Route, Router} from 'react-router';

import {Provider} from 'react-redux';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Main from './main';

const muiTheme = getMuiTheme({});

const routes = (
	<Route path='/' component={Main}></Route>
);

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
						{routes}
					</Router>
				</MuiThemeProvider>
			</Provider>
		);
	}
}

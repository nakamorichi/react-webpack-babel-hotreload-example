import React, {Component, PropTypes} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import {deepOrange500} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Route, IndexRoute} from 'react-router';

import Main from './main';

const styles = {
	container: {
		textAlign: 'center',
		paddingTop: 200
	}
};

const muiTheme = getMuiTheme({
	palette: {
		accent1Color: deepOrange500
	}
});

const routes = (
	<Route path='/' component={Main}></Route>
);

export default class Root extends Component {
	static propTypes = {
		store: PropTypes.object.isRequired,
		history: PropTypes.object.isRequired
	};

	constructor(props, context) {
		super(props, context);
		this.handleRequestClose = this.handleRequestClose.bind(this);
		this.handleTouchTap = this.handleTouchTap.bind(this);

		this.state = {
			open: false
		};
	}

	handleRequestClose() {
		this.setState({open: false});
	}

	handleTouchTap() {
		this.setState({open: true});
	}

	render() {
		const standardActions = <FlatButton label='Ok' secondary={true} onTouchTap={this.handleRequestClose}/>;

		return (
			<Provider store={store}>
				<Router history={history}>
					<MuiThemeProvider muiTheme={muiTheme}>
						{routes}
					</MuiThemeProvider>
				</Router>
			</Provider>
		);
	}
}

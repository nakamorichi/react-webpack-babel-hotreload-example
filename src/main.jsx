import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import {actions} from './reducers';

const styles = {
	container: {
		textAlign: 'center',
		paddingTop: 200
	}
};

class Main extends Component {
	static propTypes = {
		fetch_result: PropTypes.array.isRequired,
		is_showing_dialog: PropTypes.bool.isRequired,
		showDialog: PropTypes.func.isRequired,
		hideDialog: PropTypes.func.isRequired,
		requestAsyncFetch: PropTypes.func.isRequired
	};
	render() {
		const {fetch_result, is_showing_dialog, showDialog, hideDialog, requestAsyncFetch} = this.props;

		const dialog_actions = (
			<div>
				<FlatButton label='Fetch' secondary={true} onTouchTap={requestAsyncFetch}/>
				<FlatButton label='Close' secondary={true} onTouchTap={hideDialog}/>
			</div>
		);

		return (
			<div style={styles.container}>
				<Dialog open={is_showing_dialog} title='Example async fetch using Saga' actions={dialog_actions} onRequestClose={hideDialog}>
					<ul>
						{fetch_result.map(obj => <li key={obj.id}>{obj.website}</li>)}
					</ul>
				</Dialog>

				<h1>An example of how to set up React, Redux, Saga, and routing together with Webpack, Babel, and hot reloading</h1>
				<RaisedButton label='Test asynchronic fetch' primary={true} onTouchTap={showDialog}/>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {fetch_result: state.exampleReducer.fetch_result, is_showing_dialog: state.exampleReducer.is_showing_dialog};
}

export default connect(mapStateToProps, actions)(Main);

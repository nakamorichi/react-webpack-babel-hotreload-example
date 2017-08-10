import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import { requestAsyncFetchAction, changeFetchURLAction } from 'reducers/async_fetch_reducer';

class Index extends Component {
	// Define external properties
	static propTypes = {
		// Properties from Redux state
		fetch_url: PropTypes.string.isRequired,
		fetch_result: PropTypes.arrayOf(PropTypes.any).isRequired,

		// Redux reducer actions
		requestAsyncFetch: PropTypes.func.isRequired,
		changeFetchURL: PropTypes.func.isRequired,
	}

	// Initialize internal component instance state
	state = {
		is_showing_dialog: false,
	}

	// Component methods
	showDialog = () => {
		this.setState({ is_showing_dialog: true });
	}

	hideDialog = () => {
		this.setState({ is_showing_dialog: false });
	}

	render() {
		const { fetch_result, fetch_url, changeFetchURL, requestAsyncFetch } = this.props;
		const dialog_actions = (
			<div>
				<FlatButton label='Fetch' secondary={true} onTouchTap={requestAsyncFetch} />
				<FlatButton label='Close' secondary={true} onTouchTap={this.hideDialog} />
			</div>
		);

		return (
			<div>
				<h2>An example of how to set up React, Redux, Saga, and routing together with Webpack, Babel, and hot reloading</h2>
				<RaisedButton label='Test asynchronic fetch' primary={true} onTouchTap={this.showDialog} />

				<Dialog open={this.state.is_showing_dialog} title='Example async fetch using Saga' actions={dialog_actions} onRequestClose={this.hideDialog}>
					<TextField
						id='text-field-controlled'
						value={fetch_url}
						onChange={changeFetchURL}
						fullWidth={true}
					/>
					<ul>
						{fetch_result.map((obj, idx) => (
							<li>
								<pre>{JSON.stringify(obj)}</pre>
							</li>
						))}
					</ul>
				</Dialog>
			</div>
		);
	}
}

// Properties fetched from application-wide Redux state
const mapStateToProps = state => ({
	fetch_result: state.asyncFetchReducer.fetch_result,
	fetch_url: state.asyncFetchReducer.fetch_url,
});

// Redux actions connected to the component
export default connect(mapStateToProps, {
	requestAsyncFetch: requestAsyncFetchAction,
	changeFetchURL: changeFetchURLAction,
})(Index);

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import { showDialogAction, hideDialogAction, requestAsyncFetchAction, changeFetchURLAction } from '../reducers/async_fetch_reducer';

const Index = ({ fetch_result, is_showing_dialog, fetch_url, showDialog, hideDialog, requestAsyncFetch, changeFetchURL }) => {

	const dialog_actions = (
		<div>
			<FlatButton label='Fetch' secondary={true} onTouchTap={requestAsyncFetch}/>
			<FlatButton label='Close' secondary={true} onTouchTap={hideDialog}/>
		</div>
	);

	return (
		<div>
			<h2>An example of how to set up React, Redux, Saga, and routing together with Webpack, Babel, and hot reloading</h2>
			<RaisedButton label='Test asynchronic fetch' primary={true} onTouchTap={showDialog}/>

			<Dialog
				open={is_showing_dialog}
				title='Example async fetch using Saga'
				actions={dialog_actions}
				onRequestClose={hideDialog}
				autoScrollBodyContent
			>
				<TextField
					id='text-field-controlled'
					value={fetch_url}
					onChange={changeFetchURL}
					fullWidth={true}
				/>
				<ul>
					{fetch_result.map((obj, idx) => (
						<li key={idx}>
							<pre>{JSON.stringify(obj)}</pre>
						</li>
					))}
				</ul>
			</Dialog>
		</div>
	);
};

Index.propTypes = {
	children: PropTypes.node,
	fetch_result: PropTypes.array.isRequired,
	is_showing_dialog: PropTypes.bool.isRequired,
	showDialog: PropTypes.func.isRequired,
	hideDialog: PropTypes.func.isRequired,
	requestAsyncFetch: PropTypes.func.isRequired,
	fetch_url: PropTypes.string.isRequired,
	changeFetchURL: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	fetch_result: state.asyncFetchReducer.fetch_result,
	is_showing_dialog: state.asyncFetchReducer.is_showing_dialog,
	fetch_url: state.asyncFetchReducer.fetch_url
});

export default connect(mapStateToProps, {
	showDialog: showDialogAction,
	hideDialog: hideDialogAction,
	requestAsyncFetch: requestAsyncFetchAction,
	changeFetchURL: changeFetchURLAction
})(Index);

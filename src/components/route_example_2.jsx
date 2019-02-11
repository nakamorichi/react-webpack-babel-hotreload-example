import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { requestAsyncFetchAction } from 'reducers/async_fetch_reducer';

class RouteExample2 extends Component {
	static propTypes = {
		fetch_result: PropTypes.arrayOf(PropTypes.any).isRequired,
		requestAsyncFetch: PropTypes.func.isRequired,
	}

	componentDidMount() {
		const { requestAsyncFetch } = this.props;
		requestAsyncFetch('https://jsonplaceholder.typicode.com/posts/1');
	}

	render() {
		const { fetch_result } = this.props;
		return (
			<div>
				<h1>RouteExample2</h1>
				<ul>
					{fetch_result.map(obj => (
						<li key={obj.id}>
							<pre>{JSON.stringify(obj)}</pre>
						</li>
					))}
				</ul>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	fetch_result: state.asyncFetchReducer.fetch_result,
});

export default connect(
	mapStateToProps,
	{
		requestAsyncFetch: requestAsyncFetchAction,
	},
)(RouteExample2);

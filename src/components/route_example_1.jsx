import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

const RouteExample1 = ({ fetch_result }) => (
	<div>
		<h1>RouteExample1</h1>
		<ul>
			{fetch_result.map((obj, idx) => (
				<li key={idx}>
					<pre>{JSON.stringify(obj)}</pre>
				</li>
			))}
		</ul>
	</div>
);

RouteExample1.propTypes = {
	fetch_result: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
	fetch_result: state.asyncFetchReducer.fetch_result
});

export default connect(mapStateToProps, {})(RouteExample1);

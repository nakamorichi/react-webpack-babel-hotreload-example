import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const RouteExample1 = () => (
	<div>
		<h1>RouteExample1</h1>
	</div>
);

RouteExample1.propTypes = {};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(RouteExample1);

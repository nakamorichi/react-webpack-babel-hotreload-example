import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

export default class Main extends Component {
	static propTypes = {
		children: PropTypes.node
	}

	styles = {
		container: {
			textAlign: 'center'
		}
	}

	state = {
		is_showing_menu: false
	}

	showMenu = () => {
		this.setState({ is_showing_menu: true });
	}

	hideMenu = () => {
		this.setState({ is_showing_menu: false });
	}

	render() {
		const { children } = this.props;
		return (
			<div style={this.styles.container}>
				<Drawer open={this.state.is_showing_menu} docked={false} onRequestChange={this.hideMenu}>
					<Menu onTouchTap={this.hideMenu}>
						<MenuItem primaryText='Index' containerElement={<Link to='/' />}/>
						<MenuItem primaryText='Route Example 1' containerElement={<Link to='/route_example_1' />}/>
						<MenuItem primaryText='Route Example 2' containerElement={<Link to='/route_example_2' />}/>
					</Menu>
				</Drawer>

				<AppBar
					title='react-webpack-babel-hotreload-example'
					iconClassNameRight='muidocs-icon-navigation-expand-more'
					onLeftIconButtonTouchTap={this.showMenu}
				/>

				{children}
			</div>
		);
	}
}

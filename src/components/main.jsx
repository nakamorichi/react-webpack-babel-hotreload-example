import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

import Routes from 'components/routes';

export default class Main extends Component {
	static propTypes = {}

	state = {
		is_showing_menu: false,
	}

	styles = {
		container: {
			textAlign: 'center',
		},
	}

	showMenu = () => {
		this.setState({ is_showing_menu: true });
	}

	hideMenu = () => {
		this.setState({ is_showing_menu: false });
	}

	render() {
		const { is_showing_menu } = this.state;
		return (
			<div style={this.styles.container}>
				<Drawer open={is_showing_menu} docked={false} onRequestChange={this.hideMenu}>
					<Menu onTouchTap={this.hideMenu}>
						<MenuItem primaryText='Index' containerElement={<Link to='/' />} />
						<MenuItem primaryText='Route Example 1' containerElement={<Link to='/route_example_1' />} />
						<MenuItem primaryText='Route Example 2' containerElement={<Link to='/route_example_2' />} />
					</Menu>
				</Drawer>

				<AppBar
					title='react-webpack-babel-hotreload-example'
					iconClassNameRight='muidocs-icon-navigation-expand-more'
					onLeftIconButtonTouchTap={this.showMenu}
				/>

				<Routes />
			</div>
		);
	}
}

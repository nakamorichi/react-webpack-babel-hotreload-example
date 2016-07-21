import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';

class Main extends Component {
	render() {
		return (
			<div style={styles.container}>
				<Dialog open={this.state.open} title='Super Secret Password' actions={standardActions} onRequestClose={this.handleRequestClose}>
					1-2-3-4-5
				</Dialog>
				<h1>material-ui</h1>
				<h2>example projects</h2>
				<RaisedButton label='Super Secret Password' primary={true} onTouchTap={this.handleTouchTap}/>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {};
}

// function mapDispatchToProps(dispatch) {
// 	return {
// 		actions: bindActionCreators(menuActions, dispatch)
// 	};
// }

// function mapDispatchToProps(dispatch) {
// 	return bindActionCreators({showMenu, hideMenu}, dispatch);
// }

export default connect(mapStateToProps, actions)(Main);

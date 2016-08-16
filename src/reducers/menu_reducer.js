const initial_state = {
	is_showing_menu: false
};

const types = {
	SHOW_MENU: 'Show menu',
	HIDE_MENU: 'Hide menu'
};

export const actions = {
	showMenu() {
		return {
			type: types.SHOW_MENU
		};
	},
	hideMenu() {
		return {
			type: types.HIDE_MENU
		};
	}
};

export function menuReducer(state = initial_state, action) {
	switch (action.type) {

		case types.SHOW_MENU:
			return {
				...state,
				is_showing_menu: true
			};

		case types.HIDE_MENU:
			return {
				...state,
				is_showing_menu: false
			};

		default:
			return state;
	}
}

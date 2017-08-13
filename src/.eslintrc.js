module.exports = {
	env: {
		browser: true,
		node: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:import/errors',
		'plugin:import/warnings',
		'airbnb',
	],
	parser: 'babel-eslint',
	parserOptions: {
		ecmaVersion: 2017,
		ecmaFeatures: {
			experimentalObjectRestSpread: true,
			jsx: true,
		},
		sourceType: 'module',
	},
	plugins: ['react', 'import', 'jsx-a11y'],
	rules: {
		camelcase: 0,
		'comma-dangle': [
			'warn',
			{
				arrays: 'always-multiline',
				exports: 'always-multiline',
				functions: 'always-multiline',
				imports: 'always-multiline',
				objects: 'always-multiline',
			},
		],
		'func-names': ['error', 'as-needed'],
		'import/no-extraneous-dependencies': [
			'error',
			{
				devDependencies: false,
				optionalDependencies: false,
				peerDependencies: false,
			},
		],
		indent: ['error', 'tab', { 'SwitchCase': 1 }],
		'jsx-quotes': ['error', 'prefer-single'],
		'max-len': [
			'warn',
			120,
			2,
			{
				ignoreComments: false,
				ignoreRegExpLiterals: true,
				ignoreStrings: true,
				ignoreTemplateLiterals: true,
				ignoreUrls: true,
			},
		],
		'no-console': 1,
		'no-tabs': 0,
		'no-underscore-dangle': ['error', { allow: ['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] }],
		'no-unused-vars': [
			'error',
			{
				vars: 'local',
				args: 'none',
				ignoreRestSiblings: true,
			},
		],
		radix: 0,
		'react/jsx-boolean-value': 0,
		'react/jsx-indent': ['error', 'tab'],
		'react/jsx-indent-props': ['error', 'tab'],
	},
	settings: {
		'import/resolver': 'webpack',
	},
};

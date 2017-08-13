module.exports = {
	env: {
		browser: false,
		node: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:import/errors',
		'plugin:import/warnings',
		'airbnb',
	],
	parser: 'espree',
	parserOptions: {
		ecmaVersion: 2017,
		sourceType: 'script',
	},
	plugins: ['import'],
	rules: {
		'arrow-parens': ['error', 'as-needed'],
		'comma-dangle': [
			'warn',
			{
				arrays: 'always-multiline',
				exports: 'always-multiline',
				functions: 'never',
				imports: 'always-multiline',
				objects: 'always-multiline',
			},
		],
		'func-names': ['error', 'as-needed'],
		'import/no-extraneous-dependencies': [
			'warn',
			{
				devDependencies: true,
				optionalDependencies: true,
				peerDependencies: true,
			},
		],
		indent: ['error', 'tab', { 'SwitchCase': 1 }],
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
		'no-unused-vars': [
			'error',
			{
				vars: 'local',
				args: 'none',
				ignoreRestSiblings: true,
			},
		],
		radix: 0,
		strict: ['error', 'global'],
	},
};

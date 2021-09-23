module.exports = {
	root: true,
	env: {
		browser: true,
		node: true,
	},
	parserOptions: {
		parser: '@babel/eslint-parser',
		requireConfigFile: false,
	},
	extends: ['@nuxtjs', 'plugin:nuxt/recommended', 'prettier'],
	plugins: [],
	// add your custom rules here
	rules: {
		'no-console': 0,
		'import/no-named-as-default': 0,
		'no-unused-vars': 1,
		'import/order': 0,
		'vue/component-definition-name-casing': 0
	},
}

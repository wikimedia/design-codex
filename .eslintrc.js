/* eslint-env node */
module.exports = {
	root: true,
	extends: [
		'wikimedia',
		'wikimedia/language/es2020'
	],
	overrides: [
		{
			files: [
				'packages/*/**/*.vue',
				'packages/*/**/*.ts',
				'packages/*/**/*.js'
			],
			plugins: [
				'@typescript-eslint/eslint-plugin'
			],
			parserOptions: {
				parser: '@typescript-eslint/parser',
				sourceType: 'module',
				tsConfigRootDir: __dirname,
				project: [ './packages/**/tsconfig.json' ],
				extraFileExtensions: [ '.vue' ]
			},
			extends: [
				'plugin:@typescript-eslint/recommended',
				'plugin:@typescript-eslint/recommended-requiring-type-checking'
			],
			rules: {
				'no-unused-vars': 'off',
				'@typescript-eslint/no-unused-vars': 'error'
			}
		},
		{
			files: [ '**/*.js' ],
			rules: {
				'@typescript-eslint/no-var-requires': 'off',
				'@typescript-eslint/explicit-module-boundary-types': 'off'
			}
		},
		{
			files: [ '**/*.vue' ],
			parser: 'vue-eslint-parser',
			extends: [
				'wikimedia/vue3-common',
				'wikimedia/client-common'
			],
			rules: {
				'vue/no-unsupported-features': [ 'error', {
					version: '^3.2.27'
				} ],
				'vue/component-name-in-template-casing': [ 'error', 'kebab-case' ],
				'vue/custom-event-name-casing': [ 'error', 'kebab-case' ]
			}
		},
		{
			files: [ '**/*.vue', '**/*.test.ts' ],
			rules: {
				// Disable rules prohibiting the use/propagation of "any" values, because they
				// cause false positives when accessing methods on Vue components
				'@typescript-eslint/no-unsafe-assignment': 'off',
				'@typescript-eslint/no-unsafe-call': 'off',
				'@typescript-eslint/no-unsafe-member-access': 'off',
				'@typescript-eslint/no-unsafe-return': 'off',
				// Disable rule that throws false positives for expect( foo.bar ).toHaveBeenCalled()
				'@typescript-eslint/unbound-method': 'off'
			}
		},
		{
			files: [ '**/*.spec.[jt]s', '**/*.test.[jt]s' ],
			extends: [
				'plugin:jest/recommended',
				'wikimedia/client-common'
			]
		}
	]
};

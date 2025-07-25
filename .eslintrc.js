/* eslint-env node */
module.exports = {
	root: true,
	extends: [
		'wikimedia',
		'wikimedia/language/es2022'
	],
	overrides: [
		// Disable security/detect-non-literal-fs-filename for all non-Vue files;
		// Our build scripts do not accept user input via web request so
		// programmatic file access is fine
		{
			files: [
				'packages/*/**/*.js',
				'packages/*/**/*.mjs',
				'packages/*/**/*.ts'
			],
			rules: {
				'security/detect-non-literal-fs-filename': 'off'
			}
		},

		// Apply basic TypeScript rules to all Vue/TS/JS files
		{
			files: [
				'packages/*/**/*.vue',
				'packages/*/**/*.ts',
				'packages/*/**/*.js',
				'packages/*/**/*.mjs'
			],
			excludedFiles: [
				'packages/codex-docs/component-demos/**/examples-mw/*.vue'
			],
			plugins: [
				'@typescript-eslint/eslint-plugin'
			],
			parserOptions: {
				parser: '@typescript-eslint/parser',
				sourceType: 'module',
				extraFileExtensions: [ '.vue' ]
			},
			extends: [
				'plugin:@typescript-eslint/stylistic',
				'plugin:@typescript-eslint/recommended'
			],
			rules: {
				'no-unused-vars': 'off',
				'@typescript-eslint/no-unused-vars': 'error'
			}
		},
		// Apply type-aware TypeScript rules to all Vue/TS/JS files that are covered by one of
		// the tsconfig.json files. ESLint complains if these rules match a file that is not matched
		// by the "include" setting in one of the tsconfig.json files
		{
			files: [
				'packages/*/**/*.vue',
				'packages/*/**/*.ts',
				'packages/*/**/*.js',
				'packages/*/**/*.mjs'
			],
			excludedFiles: [
				'packages/codex-docs/component-demos/**/examples/*.vue',
				'packages/codex-docs/component-demos/**/examples-mw/*.vue',
				'packages/codex-docs/src/lib.ts'
			],
			plugins: [
				'@typescript-eslint/eslint-plugin'
			],
			parserOptions: {
				parser: '@typescript-eslint/parser',
				sourceType: 'module',
				tsConfigRootDir: __dirname,
				project: [
					'./packages/codex/tsconfig-check.json',
					'./packages/codex/cypress/tsconfig.json',
					'./packages/codex-icons/tsconfig-check.json',
					'./packages/codex-design-tokens/tsconfig.json',
					'./packages/codex-docs/tsconfig.json'
				],
				extraFileExtensions: [ '.vue' ]
			},
			extends: [
				'plugin:@typescript-eslint/stylistic-type-checked',
				'plugin:@typescript-eslint/recommended-type-checked'
			],
			rules: {
				'@typescript-eslint/no-non-null-assertion': 'error',
				'@typescript-eslint/prefer-regexp-exec': 'off',
				// These are newly-inherited shared rules, but we don't pass them (yet?)
				'comma-dangle': 'off',
				'@typescript-eslint/explicit-function-return-type': 'off',
				'@typescript-eslint/explicit-member-accessibility': 'off',
				'@typescript-eslint/explicit-module-boundary-types': 'off'
			}
		},
		{
			files: [ '**/*.ts', '**/*.vue' ],
			rules: {
				// Disable the no-missing-import rule, which is broken for TypeScript imports.
				// We don't need it anyway, because TypeScript verifies the imports already.
				'n/no-missing-import': 'off'
			}
		},
		{
			files: [ '**/*.js' ],
			rules: {
				// Allow require() to be used in JS files
				'@typescript-eslint/no-var-requires': 'off',
				'@typescript-eslint/explicit-module-boundary-types': 'off'
			}
		},
		{
			files: [ '*.mjs' ],
			parserOptions: {
				sourceType: 'module'
			},
			rules: {
				'no-underscore-dangle': [ 'error', {
					allow: [ '__dirname' ]
				} ]
			}
		},
		{
			files: [ '**/*.vue' ],
			parser: 'vue-eslint-parser',
			extends: [
				'wikimedia/vue3/common',
				'wikimedia/client/common'
			],
			rules: {
				'vue/no-unsupported-features': [ 'error', {
					version: '^3.5.13'
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
				'wikimedia/client/common'
			]
		}
	]
};

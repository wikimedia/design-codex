'use strict';

const { defineConfig, globalIgnores } = require( 'eslint/config' );
const markdown = require( '@eslint/markdown' ).default;
const cypress = require( 'eslint-plugin-cypress' );
const tseslint = require( '@typescript-eslint/eslint-plugin' );
const tsParser = require( '@typescript-eslint/parser' );
const wikimedia = require( 'eslint-config-wikimedia/flat' );

const packageFiles = [
	'packages/*/**/*.vue',
	'packages/*/**/*.ts',
	'packages/*/**/*.js',
	'packages/*/**/*.mjs'
];

module.exports = defineConfig( [
	globalIgnores( [
		'**/dist/',
		'**/coverage/',
		'**/*.snap.*',
		'packages/codex/src/env.d.ts',
		'packages/codex-docs/src/env.d.ts',
		'packages/codex-docs/docs/.vitepress/cache/',
		'packages/codex-docs/docs/components/demos/*.md'
	] ),

	// All files (was .eslintrc.js)
	...wikimedia( 'common', 'language/es2022' ),
	{
		// Our build scripts do not accept user input via web request so
		// programmatic file access is fine
		files: [
			'packages/*/**/*.js',
			'packages/*/**/*.mjs',
			'packages/*/**/*.ts'
		],
		rules: {
			'security/detect-non-literal-fs-filename': 'off'
		}
	},
	{
		// Basic TypeScript rules
		files: packageFiles,
		ignores: [ 'packages/codex-docs/component-demos/**/examples-mw/*.vue' ],
		extends: [
			tseslint.configs[ 'flat/stylistic' ],
			tseslint.configs[ 'flat/recommended' ]
		],
		languageOptions: {
			sourceType: 'module',
			parserOptions: {
				parser: tsParser,
				extraFileExtensions: [ '.vue' ]
			}
		},
		rules: {
			'no-unused-vars': 'off',
			'@typescript-eslint/no-unused-vars': 'error'
		}
	},
	{
		// Later blocks set @typescript-eslint rules for all .vue files
		files: [ 'packages/codex-docs/component-demos/**/examples-mw/*.vue' ],
		plugins: { '@typescript-eslint': tseslint }
	},
	{
		// Type-aware TypeScript rules. These rules fail on files that are not in
		// the "include" setting of a tsconfig.json file.
		files: packageFiles,
		ignores: [
			'packages/codex-docs/component-demos/**/examples/*.vue',
			'packages/codex-docs/component-demos/**/examples-mw/*.vue',
			'packages/codex-docs/src/lib.ts',
			// Markdown code block virtual files are not in any tsconfig
			'packages/codex-docs/docs/**/*.md/**'
		],
		extends: [
			tseslint.configs[ 'flat/stylistic-type-checked' ],
			tseslint.configs[ 'flat/recommended-type-checked' ]
		],
		languageOptions: {
			parserOptions: {
				tsconfigRootDir: __dirname,
				project: [
					'./packages/codex/tsconfig.json',
					'./packages/codex/cypress/tsconfig.json',
					'./packages/codex-icons/tsconfig.json',
					'./packages/codex-design-tokens/tsconfig.json',
					'./packages/codex-docs/tsconfig.json'
				]
			}
		},
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
		files: [ 'packages/*/**/*.js' ],
		rules: {
			// Allow require() to be used in JS files
			'@typescript-eslint/no-var-requires': 'off',
			'@typescript-eslint/explicit-module-boundary-types': 'off'
		}
	},
	{
		files: [ '**/*.mjs' ],
		languageOptions: {
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
		extends: [ wikimedia( 'vue3/common', 'client/common' ) ],
		rules: {
			'vue/no-unsupported-features': [ 'error', {
				version: '^3.5.13'
			} ],
			'vue/component-name-in-template-casing': [ 'error', 'kebab-case' ],
			'vue/custom-event-name-casing': [ 'error', 'kebab-case' ],
			// The max-len rule checks every line of the raw file,
			// including <style> blocks, since it has no concept of SFC blocks.
			// vue/max-len only checks lines within <script> and <template>.
			'max-len': 'off',
			'vue/max-len': [ 'warn', {
				code: 100,
				template: 100,
				tabWidth: 4,
				ignorePattern: '^[\\s]*(//|<!--) (es|style)lint-.+',
				ignoreUrls: true,
				ignoreRegExpLiterals: true,
				ignoreStrings: true,
				ignoreTemplateLiterals: true
			} ]
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
		// TODO use @vitest/eslint-plugin.
		extends: [ wikimedia( 'client/common' ) ],
		languageOptions: {
			// Only the Vitest globals the tests use, so a leftover Jest API fails at lint.
			globals: {
				afterAll: 'readonly',
				afterEach: 'readonly',
				beforeAll: 'readonly',
				beforeEach: 'readonly',
				describe: 'readonly',
				expect: 'readonly',
				it: 'readonly',
				test: 'readonly',
				vi: 'readonly'
			}
		}
	},

	// Root scripts, e.g. '.stylelintrc.js' and 'build/'
	{
		files: [ '*.js', 'build/**' ],
		extends: [ wikimedia( 'node' ) ]
	},

	// codex (was packages/codex/.eslintrc.json)
	{
		files: [ 'packages/codex/**' ],
		rules: {
			'no-restricted-imports': [ 'error', {
				patterns: [
					{
						group: [ 'components-wip/', 'components-wip' ],
						message: 'Work-in-progress components may not be used in regular components'
					}
				]
			} ]
		}
	},
	{
		files: [ 'packages/codex/src/**' ],
		ignores: [ 'packages/codex/src/**/*.test.[jt]s' ],
		extends: [ wikimedia( 'client/common', 'vue3/common', 'language/es2017' ) ],
		rules: {
			'max-len': 'off'
		}
	},
	{
		// The vue plugin is only defined for .vue files
		files: [ 'packages/codex/src/**/*.vue' ],
		rules: {
			'vue/no-unsupported-features': [ 'error', {
				version: '^3.5.13'
			} ],
			'vue/component-name-in-template-casing': [ 'error', 'kebab-case' ],
			'vue/max-len': [ 'warn', {
				code: 100,
				template: 100,
				tabWidth: 4,
				ignorePattern: '^[\\s]*(//|<!--) (es|style)lint-.+',
				ignoreUrls: true,
				ignoreRegExpLiterals: true,
				ignoreStrings: true,
				ignoreTemplateLiterals: true
			} ]
		}
	},
	{
		files: [ 'packages/codex/**/*.ts', 'packages/codex/**/*.js', 'packages/codex/**/*.mjs' ],
		ignores: [ 'packages/codex/src/**' ],
		extends: [ wikimedia( 'common', 'node' ) ],
		rules: {
			strict: 'off',
			'security/detect-non-literal-fs-filename': 'off'
		}
	},
	{
		files: [ 'packages/codex/**/*.js', 'packages/codex/**/*.mjs' ],
		ignores: [ 'packages/codex/src/**' ],
		rules: {
			'jsdoc/valid-types': 'off'
		}
	},
	{
		files: [ 'packages/codex/**/*.ts', 'packages/codex/**/*.vue' ],
		rules: {
			'no-unused-vars': 'off',
			'@typescript-eslint/no-unused-vars': 'error',
			'es-x/no-optional-chaining': 'off',
			'es-x/no-rest-spread-properties': 'off',
			'es-x/no-nullish-coalescing-operators': 'off',
			'es-x/no-async-functions': 'off',
			'es-x/no-class-fields': 'off',
			'jsdoc/require-param-type': 'off',
			'jsdoc/require-returns-type': 'off',
			'jsdoc/check-tag-names': [
				'error',
				{
					definedTags: [ 'values' ]
				}
			],
			'comma-dangle': 'off',
			'@stylistic/indent': 'off',
			'@stylistic/member-delimiter-style': 'off',
			'@stylistic/semi': 'off',
			'@stylistic/type-annotation-spacing': 'off',
			'@typescript-eslint/explicit-function-return-type': 'off',
			'@typescript-eslint/explicit-member-accessibility': 'off',
			'@typescript-eslint/explicit-module-boundary-types': 'off'
		}
	},
	{
		files: [ 'packages/codex/**/*.test.ts' ],
		rules: {
			'@typescript-eslint/restrict-template-expressions': 'off'
		}
	},
	{
		files: [ 'packages/codex/cypress/**' ],
		extends: [ cypress.configs.recommended ]
	},

	// codex-docs (was packages/codex-docs/.eslintrc.json)
	{
		files: [ 'packages/codex-docs/**/*.ts', 'packages/codex-docs/**/*.js', 'packages/codex-docs/**/*.mjs' ],
		extends: [ wikimedia( 'common', 'node' ) ],
		rules: {
			strict: 'off',
			'security/detect-non-literal-fs-filename': 'off'
		}
	},
	{
		files: [ 'packages/codex-docs/**/*.ts', 'packages/codex-docs/**/*.vue' ],
		rules: {
			'no-unused-vars': 'off',
			'@typescript-eslint/no-unused-vars': 'error',
			'es-x/no-optional-chaining': 'off',
			'es-x/no-rest-spread-properties': 'off',
			'es-x/no-nullish-coalescing-operators': 'off',
			'es-x/no-async-functions': 'off',
			'es-x/no-class-fields': 'off',
			'es-x/no-array-prototype-flat': 'off',
			'jsdoc/require-param-type': 'off',
			'jsdoc/require-returns-type': 'off',
			'n/no-missing-import': 'off',
			'comma-dangle': 'off',
			'@stylistic/indent': 'off',
			'@stylistic/member-delimiter-style': 'off',
			'@stylistic/type-annotation-spacing': 'off',
			'@typescript-eslint/explicit-member-accessibility': 'off'
		}
	},
	{
		files: [ 'packages/codex-docs/**/*.js', 'packages/codex-docs/**/*.mjs' ],
		rules: {
			'jsdoc/valid-types': 'off',
			'jsdoc/no-undefined-types': 'off',
			'jsdoc/check-tag-names': [
				'error',
				{
					definedTags: [ 'import' ]
				}
			]
		}
	},
	{
		files: [
			'packages/codex-docs/component-demos/**/examples/*.vue',
			'packages/codex-docs/component-demos/**/examples-mw/*.vue'
		],
		extends: [ wikimedia( 'language/es2017' ) ],
		rules: {
			'vue/block-lang': [ 'error', {
				script: { lang: 'js' }
			} ],
			'vue/no-undef-components': [ 'error', {
				ignorePatterns: [
					'client-only',
					'ClientOnly'
				]
			} ]
		}
	},
	{
		files: [ 'packages/codex-docs/component-demos/**/examples-mw/*.vue' ],
		languageOptions: {
			globals: {
				require: 'readonly',
				module: 'readonly'
			}
		},
		rules: {
			'vue/html-self-closing': [ 'error', {
				html: {
					void: 'never',
					normal: 'never',
					component: 'never'
				}
			} ],
			'vue/no-unused-properties': 'off',
			'max-len': 'off',
			'vue/max-len': 'off'
		}
	},
	{
		files: [ 'packages/codex-docs/docs/**/*.md' ],
		plugins: { markdown },
		processor: 'markdown/markdown'
	},
	{
		files: [ 'packages/codex-docs/docs/**/*.md/**' ],
		extends: [ tseslint.configs[ 'flat/disable-type-checked' ] ],
		rules: {
			'no-unused-vars': 'off',
			'@typescript-eslint/no-unused-vars': 'off',
			'no-undef': 'off',
			'n/no-missing-import': 'off',
			'n/no-missing-require': 'off',
			'@typescript-eslint/no-require-imports': 'off',
			indent: 'off',
			'vue/html-indent': 'off',
			'vue/html-self-closing': 'off',
			'vue/padding-line-between-blocks': 'off',
			'vue/singleline-html-element-content-newline': 'off',
			'vue/no-unused-refs': 'off',
			'vue/no-undef-properties': 'off',
			'max-len': 'off',
			'vue/max-len': 'off',
			'jsdoc/require-param-type': 'off',
			'jsdoc/require-returns-type': 'off',
			'vue/no-undef-components': 'off',
			'no-console': 'off',
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/no-empty-function': 'off',
			'@typescript-eslint/consistent-indexed-object-style': 'off',
			'vue/max-attributes-per-line': 'off',
			'no-mixed-spaces-and-tabs': [ 'error', 'smart-tabs' ]
		}
	},

	// codex-icons (was packages/codex-icons/.eslintrc.json)
	{
		files: [
			'packages/codex-icons/**/*.ts',
			'packages/codex-icons/**/*.js',
			'packages/codex-icons/**/*.mjs'
		],
		extends: [ wikimedia( 'common', 'node' ) ],
		rules: {
			strict: 'off',
			'no-underscore-dangle': [ 'error', {
				allow: [
					'__dirname',
					'__filename'
				]
			} ]
		}
	},
	{
		files: [ 'packages/codex-icons/src/**/*.ts', 'packages/codex-icons/src/**/*.js' ],
		extends: [ wikimedia( 'language/es2017' ) ]
	},
	{
		files: [ 'packages/codex-icons/**/*.ts' ],
		rules: {
			'jsdoc/require-param-type': 'off',
			'jsdoc/require-returns-type': 'off',
			'n/no-missing-import': 'off',
			'comma-dangle': 'off',
			'@stylistic/member-delimiter-style': 'off',
			'@stylistic/type-annotation-spacing': 'off'
		}
	},
	{
		files: [ 'packages/codex-icons/**/*.ts', 'packages/codex-icons/**/*.js' ],
		ignores: [ 'packages/codex-icons/src/**' ],
		rules: {
			'es-x/no-string-prototype-matchall': 'off'
		}
	},
	{
		files: [ 'packages/codex-icons/**/*.js', 'packages/codex-icons/**/*.mjs' ],
		ignores: [ 'packages/codex-icons/src/**' ],
		rules: {
			'@typescript-eslint/no-var-requires': 'off',
			'jsdoc/valid-types': 'off',
			'jsdoc/no-undefined-types': 'off',
			'jsdoc/check-tag-names': [
				'error',
				{
					definedTags: [ 'import' ]
				}
			]
		}
	},

	// codex-design-tokens (was packages/codex-design-tokens/.eslintrc.json)
	{
		files: [
			'packages/codex-design-tokens/**/*.ts',
			'packages/codex-design-tokens/**/*.js',
			'packages/codex-design-tokens/**/*.mjs'
		],
		extends: [ wikimedia( 'common', 'node' ) ],
		rules: {
			strict: 'off',
			'jsdoc/valid-types': 'off',
			'jsdoc/no-undefined-types': 'off',
			'jsdoc/check-tag-names': [
				'error',
				{
					definedTags: [ 'import' ]
				}
			],
			'@stylistic/member-delimiter-style': 'off',
			'@typescript-eslint/explicit-member-accessibility': 'off'
		}
	},

	// All packages are ES modules. Undo the sourceType that
	// eslint-config-wikimedia/flat sets for '**/*.js'.
	{
		files: [ 'packages/**/*.js' ],
		languageOptions: {
			sourceType: 'module'
		}
	}
] );

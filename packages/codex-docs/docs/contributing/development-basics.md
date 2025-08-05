---
outline: deep
---

# Development basics

::: tip Before you dive into contributing code:
- Read the [general contribution guidelines](./overview.md)
- Check out the [code design principles](../using-codex/guiding-principles.md#code-design-patterns)
:::

## Get the code

Clone [the repository](https://gerrit.wikimedia.org/g/design/codex/):
`git clone ssh://gerrit.wikimedia.org:29418/design/codex`

::: tip First time using Gerrit?
See [the Gerrit tutorial on mediawiki.org](https://www.mediawiki.org/wiki/Gerrit/Tutorial) for a
detailed guide.
:::

## Code contribution workflow

### Task tracking

Tasks are tracked in Phabricator on the [Codex](https://phabricator.wikimedia.org/tag/codex/)
workboard. Create or claim a task as soon as you decide to work on it. Note that very minor
contributions (like build asset updates or icon code optimizations) do not require a corresponding
task.

### Patch requirements

All patches must meet the following requirements:

- **Commit message:**
  - The first line of the commit message must be prefixed by the component name (Button, Icon) or
    the type of work (build, tests, styles, tokens, docs, etc.), e.g. `docs: Add more docs.` If the commit covers multiple things, include them in a comma-delineated list, e.g.
    `styles, docs, Button: Fix Button styles and document new convention`.
  - Deprecating and breaking changes are prefixed with `[DEPRECATING CHANGE]` or
    `[BREAKING CHANGE]`, e.g. `[BREAKING CHANGE] Button: Remove primary button functionality`.
  - Follow the [MediaWiki commit message guidelines](https://www.mediawiki.org/wiki/Gerrit/Commit_message_guidelines).
- **Clean code:** Code will only be merged when it follows [MediaWiki code conventions](https://www.mediawiki.org/wiki/Manual:Coding_conventions). TODO comment tags should include a relevant task number.

### Code review

Codex adheres to the [Design System Team's general process for code review](https://www.mediawiki.org/wiki/Design_System_Team/Team_Processes#Code_review).
Please review this process before submitting or reviewing a patch for the first time.

## Getting started

### Requirements

- **Node:** verify the required version of Node pinned in `.nvmrc` file. To install run `nvm install "$(<.nvmrc)"` then `nvm use` in the root of the repository.
- **npm:** version 7 or greater is required to support workspaces. You can install the latest version of npm with nvm via `nvm install --latest-npm`.

::: tip What is Node Version Manager (NVM)?
NVM is a handy tool that lets you install and switch between multiple versions of Node.js on your machine. This is especially useful when working on multiple projects that depend on different Node versions.<br>
[Learn more about NVM on GitHub](https://github.com/nvm-sh/nvm).
:::

### Workspaces

The Codex codebase is configured as a monorepo using npm. Sub-projects are defined in the
`packages/` directory with their own `package.json` and an appropriate `name`.

To run a command in a specific workspace, do the following:

```bash
# Run the "build" command in the "@wikimedia/codex" workspace
npm run build --workspace @wikimedia/codex

# Install a dependency for one workspace
npm install vite --workspace @wikimedia/codex --save-dev

# This can be shortened to -w
npm install vue -w @wikimedia/codex --save-peer
```

To run a command for all workspaces, do this instead:

```bash
# Run the "test" command in all workspaces
npm run test --workspaces

# This is equivalent
npm run test -ws
```

Note that the `lint` command is global; it has to be run in the root directory.
Running `npm test` in the root directory will lint everything and run the tests
in all workspaces.

### Directory structure
Each component has its own subdirectory in `packages/codex/src/components`, containing
the Vue single file component and unit tests.

Functions designed for use with the composition API ("composables") are in `packages/codex/src/composables`.

There are some special files at the top level of the `src/` directory:
- `lib.ts`: The main entry point for the library. Only things that are exported here are accessible
  to external users of the library.
- `types.ts`: Contains type definitions that are shared across multiple components, or need to be
  exported. This file should not export any functions or constants, only types.
- `constants.ts`: Contains constants that need to be exported or that serve as the basis for types.
- `utils.ts`: Utility functions shared across components, or for use with the types or constants
  in `types.ts` or `constants.ts`.

### Linting
Codex uses the following lint tools:
- [ESLint](https://eslint.org/) for ECMAScript files like JavaScript and TypeScript
- [typescript-eslint](https://typescript-eslint.io/) for additional linting of TypeScript files
- [Stylelint](https://stylelint.io/) for stylesheet files like CSS and Less
- [SVGlint](https://www.npmjs.com/package/svglint) for SVG files in the icons package

We use the Wikimedia coding conventions, and to enforce those we use
[eslint-config-wikimedia](https://npmjs.com/package/eslint-config-wikimedia) and
[stylelint-config-wikimedia](https://www.npmjs.com/package/stylelint-config-wikimedia) as the
starting point for our linter configuration. For Vue files, the Wikimedia coding conventions
follow the [Vue style guide](https://vuejs.org/style-guide/) closely. This means that HTML-like tags
in Vue templates sometimes don't follow the same rules as real HTML: for example, an empty
`<div>` element is `<div />` not `<div></div>`.

In addition to those conventions, Codex-specific rules are enforced. These include:
- For most CSS properties, design tokens must be used, and raw values are forbidden. (For example,
  `padding-top: 16px;` is disallowed, use `padding-top: @spacing-100;` instead.)
- Every `.js`, `.ts` and `.vue` file must be captured by the `include` paths in one of the
  `tsconfig.json` files, otherwise typescript-eslint can't run properly.

#### Running the linters
You can use the following commands to run some or all of the lint checks. All of these commands
must be run in the root directory
- All lint checks: `npm run lint` (this runs all of the commands listed below)
- ESLint: `npm run lint:scripts`
- Stylelint: `npm run lint:styles`
- SVGlint: `npm run -w @wikimedia/codex-icons lint:svg`
- TypeScript checks: `npm run -w PACKAGENAME lint:ts`, where `PACKAGENAME` is one of
  `@wikimedia/codex`, `@wikimedia/codex-design-tokens`, `@wikimedia/codex-icons` or `codex-docs`

You should also consider setting up your IDE to run ESLint, Stylelint and TypeScript checks on the
fly, to catch linter violations in real time.

#### Disabling lint rules
The lint rules produce the desired outcome the vast majority of the time, but sometimes disabling
a lint rule is necessary. The preferred way of doing this is with a `disable-next-line` comment
that identifies the name of the rule to be disabled, like this:
```js
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
input.value!.click();
```
```vue-html
<!-- eslint-disable-next-line vue/no-v-html -->
<div v-html="foo" />
```
```css
/* stylelint-disable-next-line plugin/no-unsupported-browser-features */
appearance: none;
```

Sometimes, a rule might have to be disabled for a block of multiple lines, either because it
appears multiple times in a row or because it's not possible to place a comment directly above
the offending line. To do this, use a `disable` comment for the specific rule, and then an
`enable` comment at the end of the block re-enabling the rule.

```js
/* eslint-disable no-multi-spaces */
const MODES = [
  '',             // default mode
  'rtl',          // RTL stylesheet
  'legacy',       // Legacy (14px base) stylesheet
  'legacy-rtl'    // RTL 14px base stylesheet
];
/* eslint-enable no-multi-spaces */
```
```vue-html
<!-- eslint-disable vue/no-v-html -->
<g
  v-if="iconSvg"
  v-html="iconSvg"
/>
<!-- eslint-enable vue/no-v-html -->
```
```css
/* stylelint-disable plugin/no-unsupported-browser-features */
-webkit-appearance: none;
-moz-appearance: textfield;
/* stylelint-enable plugin/no-unsupported-browser-features */
```

Some rules are disabled for an entire repository, workspace or directory in the relevant
`.eslintrc.json` or `.stylelintrc.json` file. This should not be done lightly, and is only
appropriate when the rule is not useful for a structural reason. For example, we disable the
`no-unsafe` group of rules from typescript-eslint in Vue files, because they cause lots of false
positives in Vue code.

### IDE setup

If you work on Codex using an editor not listed here, submit a patch with
suggested configurations for optimal development for that editor!

#### Visual Studio Code

1. **Install extensions:** The Codex repository contains a list of recommended extensions for
   development in Visual Studio Code (VS Code). These extensions are defined in
   `vscode/extensions.json`. When you open Codex in VS Code, you should be prompted with a message
   to install recommended extensions. You can also go to the Extensions tab and search for
   '@recommended', then install the extensions you want.
2. **Configure settings for extensions:** Configure Stylelint to check your styles, rather
   than VS Code's built-in validators. Add the following to your `.vscode/settings.json` file:
```json
{
	"css.validate": false,
	"less.validate": false,
	"stylelint.snippet": [
		"css",
		"less",
		"postcss",
		"vue"
	],
	"stylelint.validate": [
		"css",
		"less",
		"postcss",
		"vue"
	]
}
```
Configure Rewrap to wrap at 100 characters column:
```json
{
	"rewrap.wrappingColumn": 100
}
```

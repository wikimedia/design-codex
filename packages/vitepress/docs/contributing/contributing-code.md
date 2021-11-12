# Contributing code

::: tip Before you dive into contributing code:
- Read the [general contribution guidelines](./guidelines.md)
- Check out the [code design principles](../index.md#code-design-patterns)
:::

## Code contribution workflow

### Task tracking

Tasks are tracked on the on the [Codex workboard](https://phabricator.wikimedia.org/project/view/5587/).
Add or claim a task as soon as you decide to work on it. This will help avoid overlapping,
duplicate, or out-of-order work. Keep the task in the appropriate column on the workboard. Note
that relatively minor contributions (like build asset updates or icon code optimizations) do not
require a corresponding task.

When adding a new component, developing the entire component to completely fulfill design criteria
may be too much for a single patch. Consider creating a parent task for that component with
sub-tasks for the minimum viable solution and additional features.

### Component addition process

1. **Gather relevant design artifacts.** Before a component can be added to Codex, it should have a
   complete entry in the [Wikimedia Design Style Guide](https://design.wikimedia.org/style-guide/index.html).
   There may be exceptions to this, in which case the component should match [OOUI](https://doc.wikimedia.org/oojs-ui/master/demos/?page=widgets&theme=wikimediaui&direction=ltr&platform=desktop)
   styles.
2. **Gather necessary design tokens.** Note that this process is still being developed, so for now
   you can continue using Wikimedia UI Base. See [writing styles](#writing-styles) below for details.
3. **Build the component.** [Create the Vue component](#developing-components) and [write unit tests](#jest-unit-tests).
4. **Demo the component.** [Create component demos in VitePress](#component-demos).
5. **Open a patch for review.** Patches will be reviewed by developers, UX engineers, and designers.

### Patch requirements

Patches for new components should include all of the following. Patches that introduce changes
should include or update the following as needed.

- **Commit message:** The first line of the commit message has to be prefixed by the component name
(Button, Icon) or the type of work (build, tests, styles, docs, etc.), e.g. `docs: Add more docs.`
  If the commit covers multiple things, include them in a comma-delineated list, e.g.
  `styles, docs: Fix Button styles and document new convention`.
  In general, Codex is following the [MediaWiki commit message guidelines](https://www.mediawiki.org/wiki/Gerrit/Commit_message_guidelines).
- **Unit tests:** Attempt to meet the established coverage threshold, which will be calculated and
  output in the command line interface when you run tests.
- **Jest snapshots:** Include snapshots for all variations of props and slots.
- **Demos:** Each component should have a demo page on the VitePress site that shows realistic examples
  of different variations and uses of the component.
- **Documentation:** Each component should have a docblock describing what the component is and the
  basics of how it works. Props, slots, and events should be documented in the code. If a component
  would benefit from additional documentation to communicate how it can be used, include it on the
  demo page.

## Development basics

### Requirements

- **Node:** see `.nvmrc` in the root of the repository. To install and use the required version of Node, run `nvm install "$(<.nvmrc)"` then `nvm use` in the root of the repository.
- **NPM:** v7.0 or greater is required to support workspaces; it is not included by default in older
versions of Node (prior to v15) and will need to be upgraded manually.

### Workspaces

The Codex codebase is configured as a monorepo using NPM. Sub-projects are defined in the
`packages/` directory with their own `package.json` and an appropriate `name`.

To run a command in a specific workspace, do the following:

```bash
# Run the "build" command in the "vue-components" workspace
npm run build --workspace vue-components

# Install a dependency for one workspace
npm install vite --workspace vue-components --save-dev

# This can be shortened to -w
npm install vue -w vue-components --save-peer
```

To run a command for all workspaces, do this instead:

```bash
# Run the "test" command in all workspaces"
npm run test --workspaces

# This is equivalent
npm run test -ws
```

Note that the `lint` command is global; it has to be run in the root directory.
Running `npm test` in the root directory will lint everything and run the tests
in all workspaces.

### Directory structure
Each component has its own subdirectory in `packages/vue-components/src/components`, containing
the Vue single file component and unit tests.

Functions designed for use with the composition API ("composables") are in `src/composables`.
Composables should have a name starting with `use`, e.g. `useModelWrapper`. Each composable should
be in its own file, with the same name as the composable function, e.g. `src/composables/useModelWrapper.ts`.

There are some special files at the top level of the `src/` directory:
- `lib.ts`: The main entry point for the library. Only things that are exported here are accessible
  to external users of the library.
- `types.ts`: Contains type definitions that are shared across multiple components, or need to be
  exported. This file should not export any functions or constants, only types.
- `constants.ts`: Contains constants that need to be exported or that serve as the basis for types.
- `utils.ts`: Utility functions shared across components, or for use with the types or constants
  in `types.ts` or `constants.ts`.

## Developing components

### Component basics

The `vue-components` package uses [Vue 3](https://v3.vuejs.org/guide/introduction.html) and prefers
the [Composition API](https://v3.vuejs.org/guide/composition-api-introduction.html) over the
Options API.

Codex is written in TypeScript: see the [Working with TypeScript](./typescript.md) section for
information about code conventions, solved problems, and potential pitfalls.

There are two environments available for testing components during development:

1. The `Sandbox.vue` file in the `vue-components` package. `npm run dev` will spin up that page,
   provide HMR, etc. This doesn't replace the use of VitePress for demo and documentation, it is
   more of a convenience during initial component development.
2. The VitePress demo site. See the [component demos](#component-demos) section for details.

#### Conventions

- Export all components in `src/lib.ts` to make them available to library users.
- PascalCase multi-word component names are used per the Vue.js Style Guide. Component names should
be prefixed with "Cdx," e.g. `CdxButton`

### Writing styles

::: warning
This section will change once design tokens are implemented; see [T293127](https://phabricator.wikimedia.org/T293127).
:::

Styles are written in [Less](https://lesscss.org/#) and are included in the single-file component
via the `<style>` tag. Less variables from [Wikimedia UI Base](https://github.com/wikimedia/wikimedia-ui-base/blob/master/wikimedia-ui-base.less) can be imported for use.

#### Conventions

- If a component uses a value not represented in Wikimedia UI Base multiple times, add a
  component-level Less variable in the `<style>` tag before the first selector.
- A light version of [BEM](http://getbem.com/) is used for class naming structure:
  - The root element will have the class `.cdx-component-name`
  - A block within that root element would have the class `.cdx-component-name__block-name`
  - A variation of that block would have the class `.cdx-component-name__block-name--modifier-name`
- There is no need to go deeper than 2 block levels in a class name; class names of further
  sub-elements can omit some of the blocks for the sake of brevity.
- If a style or selector isn't self-explanatory, add a comment above it.
- Codex uses [stylelint-order](https://github.com/hudochenkov/stylelint-order/) to order CSS/Less
  rules
- Stylelint rules can be disabled with a valid explanation included as a comment.

Below are some sample styles for a component to demonstrate these conventions:

```less
<style lang="less">
@import 'wikimedia-ui-base/wikimedia-ui-base.less';

// Component-specific variables.
@size-radio: 20 / @font-size-browser / @font-size-base;

.cdx-radio {
	line-height: @size-radio;

	// Custom-styled radio that's visible to the user.
	&__icon {
		width: @size-radio;
		height: @size-radio;
		border-radius: @border-radius-input-radio;
	}

	&--inline {
		// Avoid line break between icon and label text.
		white-space: nowrap;
	}
}
</style>
```

### Unit tests

::: tip TL;DR
- Every component needs [Jest unit tests](#test-cases-pattern) and [snapshots](#snapshot-tests)
- Unit tests can utilize the [Vue test utils](#vue-test-utils) library
- To run unit tests: `npm run -w vue-components test:unit`
- To update snapshots: `npm run -w vue-components test:unit -- -u`
:::

Every component should have Jest unit tests. For a component named `FooBar`, the tests should be
in the file `src/components/foo-bar/FooBar.test.ts`.

#### Test cases pattern
A common pattern in unit tests is to perform the same test multiple times with different parameters,
for example calling the same function with multiple different inputs and expecting different
outputs, or mounting the same component with different prop or slot values. We use the following
conventions when writing tests that use the test cases pattern.

First, define a **test case type** called `Case` that describes what a test case looks like. This
should be an array that begins with a string explaining the test case, then the inputs to your test,
then the expected output. For example, if we're testing a function that adds two numbers, our test
case type might look like this:
```typescript
type Case = [ msg: string, a: number, b: number, expected: number ];
```
When testing components that have many optional props, it often makes sense to express the props
as an object instead of as individual array elements:
```typescript
type Case = [
	msg: string,
	props: {
		label: string,
		value?: string,
		disabled?: boolean
	},
	/* ... */
];
```

Then, define an **array of test cases** called `cases` that contains all the input and outputs
for the test. Be sure to tell TypeScript that it's of type `Case[]`, so it can catch mistakes in
test cases and correctly type check how they're used.
```typescript
const cases: Case[] = [
	[ 'Simple addition: 1+1=2', 1, 1, 2 ],
	[ 'Bigger numbers: 23+42=65', 23, 42, 65 ],
	[ 'Negative and positive: -2+5=3', -2, 5, 3 ]
];
```

Finally, write the code that iterates over these test cases and executes them. This involves some
Jest boilerplate code that extracts the values from the test case, but other than that it should
be simple: call the function and check that the result is as expected.
```typescript
test.each( cases )( 'Case %# %s', ( _, a, b, expected ) => {
	expect( addNumbers( a, b ) ).toEqual( expected );
} );
```

#### Vue test utils
Tests in Codex use the Vue test utils to mount and interact with components. To learn how to use
this library, read the [Vue test utils guide](https://next.vue-test-utils.vuejs.org/guide/),
particularly the sections on [passing data to components](https://next.vue-test-utils.vuejs.org/guide/essentials/passing-data.html), [slots](https://next.vue-test-utils.vuejs.org/guide/advanced/slots.html) and
[testing emitted events](https://next.vue-test-utils.vuejs.org/guide/essentials/event-handling.html).

#### Snapshot tests
At minimum, each component should have snapshot tests for a representative set of prop values and
slot values. To write these, we use the [test cases pattern](#test-cases-pattern), except that
test cases in snapshot tests only have inputs, no outputs. Below is a simple example for a component
with two required props and no slots:
```typescript
import { mount } from '@vue/test-utils';
import CdxComponentName from './ComponentName.vue';

describe( 'matches the snapshot', () => {
	type Case = [ msg: string, num: number, label: number ];

	const cases : Case[] = [
		'Simple', 42, 'The answer',
		'Zero', 0, 'Nothing',
		'Empty string', 0, '',
		'Long string', 23, 'Donaudampfschifffahrtselektrizitätenhauptbetriebswerkbauunterbeamtengesellschaft'
	];

	test.each( cases )( 'Case %# %s', ( _, num, label ) => {
		const wrapper = mount( CdxComponentName, { props: { num, label } } );
		expect( wrapper.element ).toMatchSnapshot();
	} );
} );
```
When these snapshot tests are run for the first time, Jest will create a file called
`ComponentName.snap.ts` with the HTML resulting from each of these test cases. Verify that these are
as expected, then commit the file to the repository.

When the tests are run again later, Jest will check that the test cases still produce the same HTML,
and the tests will fail if they don't. If you made a change to the component that results in a
legitimate change in the snapshot output, run `npm run -w vue-components test:unit -- -u` to update
the snapshot file. Both the author and the code reviewers should review the changes to the snapshot
file to verify that they are as expected.

For more information on snapshot testing in Jest, see [the Jest documentation](https://jestjs.io/docs/snapshot-testing).

#### Type errors in Jest tests
If the type of one of the props in the `Case` type doesn't match the type of the prop as defined
in the component, or if a prop is otherwise passed into `mount()` with the wrong type, `vue-tsc`
will throw a lengthy and confusing error on the line where `mount()` is called, containing the
phrases `No overload matches this call`, `Types of property 'setup' are incompatible` and
`Types of parameters 'props and 'props' are incompatible`. Most IDEs don't surface these errors,
so they may not be discovered until `vue-tsc` is run (locally or in CI). To fix this error, make
sure that the types of the props passed into the mount function match the types that the component
expects. For more on how these errors happen and how to fix them, see
[the TypeScript guidelines](./typescript.md#wrong-types-for-props-in-jest-tests).

### Component demos

::: tip TL;DR
- Codex uses [VitePress](https://vitepress.vuejs.org/) to demo components
- Run `npm run doc:dev` to serve the demo site locally
- Each component should have a demo page. Demos should cover realistic use cases and variations of
  props and slots
- Demos are written in Markdown files in `packages/vitepress/component-demos` then compiled to
  `packages/vitepress/docs/components`
:::

Codex uses [VitePress](https://vitepress.vuejs.org/) to demo Vue components. Component demos should
provide working demonstrations and code samples for all realistic use cases of a component, plus all
variations of props and slots. Ideally, a user of the library could copy and paste a code sample
into their own code to use as a starting point.

#### Component page generation

Although most of the docs are simply markdown files within `packages/vitepress/docs`, the component
page files in `packages/vitepress/docs/components` are automatically generated by
[vue-docgen-cli](https://vue-styleguidist.github.io/docs/docgen-cli.html).

Component demos are written in markdown files outside of the `packages/vitepress/docs` directory
(see below). vue-docgen-cli is configured to grab the demo file, add documentation that's generated
from the component's `.vue` file (page title, description, meta info, usage docs, etc.), and place
the generated file in `packages/vitepress/docs/components`.


#### Dev site

To serve the VitePress site locally, run this command in the root of the Codex repository:

```bash
npm run doc:dev
```

This will both serve the VitePress site at http://localhost:3000 and compile component usage docs.

#### Creating a new component demo page

Once you have a `.vue` file for the component in the `vue-components` package, you can add a demo
page for that component. This takes 2 steps:

1. Add a new directory for your component to `packages/vitepress/component-demos`. This new
   directory should exactly match the machine name of the component. Add a file,
   `component-name.md`, to that directory.
2. Add a link to the page in the sidebar by editing VitePress config in
   `packages/vitepress/docs/.vitepress/config.js`:

```js
// In packages/vitepress/docs/.vitepress/config.js
module.exports = {
	themeConfig: {
		sidebar: {
			'/': [
			 	...
				{
					text: 'Components',
					children: [
						// Add more components here.
						{ text: 'Button', link: '/components/button' },
						{ text: 'Radio', link: '/components/radio' }
					]
				},
				...
			]
		}
	}
}
```

#### Importing components

You can import Codex components directly from the `vue-components` package:

```js
<script setup>
import CdxButton from 'vue-components/src/components/button/Button.vue';
</script>
```

#### Formatting component demos

A `Wrapper` component is available in all markdown files that provides some formatting for
components demos and show code/hide code functionality. To use it, place the demo code inside the
`demo` slot, and the code sample inside the `code` slot. The code can either be a markdown code
block or an imported code snippet.

::: tip
Note that the whitespace before and after the code sample is required for the markdown to compile
properly.
:::


Example using a markdown code block:

````markdown
<Wrapper>
<template v-slot:demo>
<CdxButton type="quiet">Click me</CdxButton>
</template>

<template v-slot:code>

```vue
<CdxButton>Click me</CdxButton>
```

</template>
</Wrapper>
````

Example using an imported code snippet:

````markdown
<Wrapper>
<template v-slot:demo>
<RadioGroup />
</template>

<template v-slot:code>

<<< @/../../component-demos/radio/examples/RadioGroup.vue

</template>
</Wrapper>
````

Try to keep the code samples relevant to the library user. Remember that your code sample doesn't
actually have to match the code used in the demo: for example, you might display an example
component for the demo but include a simplified version of that example component to display as the
code snippet.

### Working with browser tests

TODO - possibly not needed if writing browser tests is a straightforward process

### Working with visual regression tests

TODO - how to create a base snapshot for the new component

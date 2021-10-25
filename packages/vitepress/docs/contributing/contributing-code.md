# Contributing code

- Task tracking and patch requirements
- Developer docs


## Contributing components

Before you dive into contributing code:
- Check the general contribution guidelines(./guidelines.md)
- Check the [code design principles](../index.md#code-design-patterns)
- Make sure your dev environment is working. Check the root `README.md` of the Codex repository for dev environment instructions and information

### Workflow

The following is a set of instructions on different topics that might come up during the process of developing a new component:

0. Gather relevant design tokens.
0. [Create the Vue component and write unit tests](#developing-components).
0. [Create component demo in VitePress](#demoing-components).
0. [Create browser tests if needed](#working-with-browser-tests).
0. Optionally, ask UX for a review.
0. Ask at least one fellow developer for a technical review.

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

The `vue-components` package uses [Vue 3](https://v3.vuejs.org/guide/introduction.html) and prefers the [Composition API](https://v3.vuejs.org/guide/composition-api-introduction.html) over the Options API.

TODO - more about using TypeScript and PostCSS

Developers can use the `Sandbox.vue` file in the `vue-components` package to test out components during development if desired.
`npm run dev` will spin up that page, provide HMR, etc.
This doesn't replace the use of `VitePress` for demo and documentation, it is more of a convenience during initial component development.

In order for external users of the library to be able to use a component, it must be exported in
`src/lib.ts`. When creating a new component, an export for it must be added to this file.

## Demoing components

TODO - how to create a demo that covers all states and what plugins/tools/utils to use

## Testing components

### Jest unit tests
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

### Working with browser tests

TODO - possibly not needed if writing browser tests is a straightforward process

### Working with visual regression tests

TODO - how to create a base snapshot for the new component



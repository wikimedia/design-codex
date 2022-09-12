---
outline: deep
---

# Testing components

## Unit tests

::: tip TL;DR
- Every component needs [Jest unit tests](#test-cases-pattern) and [snapshots](#snapshot-tests)
- Unit tests can utilize the [Vue test utils](#vue-test-utils) library
- To run unit tests: `npm run -w @wikimedia/codex test:unit`
- To update all snapshots: `npm run build-and-update-snapshots`
- To update a workspace specific snapshots: `npm run -w [workspace-name] update-snapshots` (For some packages a build may be required for the snapshots to be updated correctly)
:::

Every component should have Jest unit tests. For a component named `FooBar`, the tests should be
in the file `src/components/foo-bar/FooBar.test.ts`.

### Test cases pattern
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

### Structuring unit tests
Unit tests should be used to test the behavior of a component, independently from other units
(libraries or components). This section defines some standards to ensure that test files can be
maintained and updated with minimal effort.

It is common for test files to get very large, making adding new tests or finding a specific test a
complex task. Defining patterns makes the tests easier to maintain and update.


#### Start with a filename

The first `describe` block within a test file should be named for the component (or function) that
is being tested. This will improve the debugging experience by providing the component name in the
error message when a test fails.

```typescript
// MenuItem.test.ts

describe( 'MenuItem', () => {
	describe( 'matches the snapshots', () => {
	} );

	describe( 'descriptive test name', () => {
	} );
}
```

#### Define names that describe a behaviour not an implementation

The name of a `describe` block should describe the behavior expected by the test, not how the the
test is implemented internally. This should start with words like "when", "with" or "without".

```typescript
// Bad
describe( 'has an expanded property of "true" ', () => {
} );

// Good
describe( 'when the dropdown is expanded', () => {
} );
```

#### Use given-when-then notation

When writing a set of unit tests for your component, the test's collection of `describe` and `it`
blocks should compose sentences that resemble given-when-then notation. The block names do not have
to start with those exact words ("given", "when", "then"), but they should express the same meaning:

- **Given**: Some context on what is being tested. This is typically the component name
- **When/And**: One or more actions or scenarios that would set the test to the correct state
- **Then**: One or more consequences resulting from the above actions

```typescript
describe( 'Button', () => {
	describe( 'when clicked', () => {
		it( 'should notify its parent', () => {
		} );
	} );
} );
// Output -> Button, when clicked, should notify its parent
```

#### Abstract common logic when possible

Writing tests using given-when-then notation provides opportunities to abstract common logic within
the various `describe` blocks. Doing so makes the individual tests simple to write and debug and
also reduces the risk of manual error.

A common use case is to set all the variables, properties, and mocks required for a specific action
to take place within the `beforeEach` hook, then cleaning them up using the `afterEach` hook.

```typescript
// Props, slots, and search results variables defined above...
describe( 'TypeaheadSearch', () => {
	describe( 'when there are search results', () => {
		let wrapper: VueWrapper<any>;
		let input: DOMWrapper<Element>;
		let menu: DOMWrapper<Element>;

		// Before each test, we'll set up a component wrapper, advance past the debounce
		// interval of the input handler, then set search results.
		beforeEach( async () => {
			jest.useFakeTimers( 'modern' );

			wrapper = mount( CdxTypeaheadSearch, {
				// Add in an initial input value so we don't have to simulate entering input.
				props: { initialInputValue: 'Co', searchFooterUrl, showThumbnail: true, ...propsData },
				slots: {
					default: defaultSlot,
					searchFooterText: searchFooterTextSlot
				}
			} );

			jest.advanceTimersByTime( DebounceInterval );
			await wrapper.setProps( { searchResults } );

			// Grab the input and menu, which we'll need for a few tests.
			input = wrapper.find( '.cdx-text-input__input' );
			menu = wrapper.find( '.cdx-menu' );
		} );

		// After each test, we'll reset timers.
		afterEach( () => {
			jest.useRealTimers();
		} );

		it( 'matches the snapshot', () => {
			expect( wrapper.element ).toMatchSnapshot();
		} );

		it( 'closes menu when input is cleared', async () => {
			await input.trigger( 'focus' );
			expect( menu.isVisible() ).toBe( true );
			await input.setValue( '' );
			jest.advanceTimersByTime( DebounceInterval );
			expect( menu.isVisible() ).toBe( false );
		} );
	} );
} );
```

::: warning
Even if it is possible to use the same variables and progressively change them in each layer of
the test, it is better to actually declare the complete required object in (or before) each test to
provide more visibility.
:::

### Vue test utils
Tests in Codex use the Vue test utils to mount and interact with components. To learn how to use
this library, read the [Vue test utils guide](https://next.vue-test-utils.vuejs.org/guide/),
particularly the sections on [passing data to components](https://next.vue-test-utils.vuejs.org/guide/essentials/passing-data.html), [slots](https://next.vue-test-utils.vuejs.org/guide/advanced/slots.html) and
[testing emitted events](https://next.vue-test-utils.vuejs.org/guide/essentials/event-handling.html).

### Snapshot tests
At minimum, each component should have snapshot tests for a representative set of prop values and
slot values. To write these, we use the [test cases pattern](#test-cases-pattern), except that
test cases in snapshot tests only have inputs, no outputs. Below is a simple example for a component
with two required props and no slots:
```typescript
import { mount } from '@vue/test-utils';
import CdxComponentName from './ComponentName.vue';

describe( 'ComponentName', () => {
	describe( 'matches the snapshot', () => {
		type Case = [ msg: string, num: number, label: string ];

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

	// ...other tests...
} );
```
When these snapshot tests are run for the first time, Jest will create a file called
`ComponentName.snap.ts` with the HTML resulting from each of these test cases. Verify that these are
as expected, then commit the file to the repository.

When the tests are run again later, Jest will check that the test cases still produce the same HTML,
and the tests will fail if they don't. If you made a change to the component that results in a
legitimate change in the snapshot output, run `npm run build-and-update-snapshots` to update
the snapshot file. Both the author and the code reviewers should review the changes to the snapshot
file to verify that they are as expected.

For more information on snapshot testing in Jest, see [the Jest documentation](https://jestjs.io/docs/snapshot-testing).

### Type errors in Jest tests
If the type of one of the props in the `Case` type doesn't match the type of the prop as defined
in the component, or if a prop is otherwise passed into `mount()` with the wrong type, `vue-tsc`
will throw a lengthy and confusing error on the line where `mount()` is called, containing the
phrases `No overload matches this call`, `Types of property 'setup' are incompatible` and
`Types of parameters 'props and 'props' are incompatible`. Most IDEs don't surface these errors,
so they may not be discovered until `vue-tsc` is run (locally or in CI). To fix this error, make
sure that the types of the props passed into the mount function match the types that the component
expects. For more on how these errors happen and how to fix them, see
[the TypeScript guidelines](./typescript.md#wrong-types-for-props-in-jest-tests).

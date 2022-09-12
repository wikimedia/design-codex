---
outline: deep
---

# Working with TypeScript

TypeScript can sometimes be difficult or confusing to work with. This page documents tips for
working with TypeScript, understanding errors, common pitfalls, and particular ways that Codex uses
TypeScript.

## Template refs

When using [template refs](https://v3.vuejs.org/guide/component-template-refs.html) to access an
HTML element or component, we need to tell TypeScript what the type of the element or component is.
For example, we might have `<input ref="searchInput">` and want to call `.focus()` on that input in
one of your component's methods. We'll need to tell TypeScript that the ref is of the type
`HTMLInputElement`, so that it can verify that `.focus()` exists and is being called with the right
number and types of arguments.

### Finding the correct type
For HTML elements, use the type that contains the name of the element, e.g. `HTMLInputElement`
for `<input>` or `HTMLParagraphElement` for `<p>`. To find the type name, go to
`https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tagname`, and search for "DOM interface".
For example, https://developer.mozilla.org/en-US/docs/Web/HTML/Element/pre indicates that its DOM
interface is `HTMLPreElement`. For basic functionality, the generic `HTMLElement` type can also
be used, but this is not recommended except in complex cases (e.g. when creating an array of
HTML elements of different types).

For components, use `InstanceType<typeof ComponentName>`. For example, if the component is a
`CdxTextInput`, use `InstanceType<typeof CdxTextInput>` as the type.
:::warning
Using `typeof ComponentName` as the type for a component template ref will *appear* to work
since it doesn't cause errors, but that's because it silently disables almost all type checking!
Make sure to use `InstanceType<typeof ComponentName>` instead.
:::

### Options API
When using a template ref in a computed function or method in the options API, you have to add
a type assertion as follows:
```typescript
methods: {
	focusSearchInput() {
		// This assumes the template contains `<input ref="searchInput">`
		const searchInput = this.$refs.searchInput as HTMLInputElement;
		// If it's a component, e.g. `<cdx-text-input ref="otherSearchInput" />`, use:
		const otherSearchInput = this.$refs.otherSearchInput as InstanceType<typeof CdxTextInput>;

		searchInput.focus();

		// Alternatively, you can inline the type assertion:
		( this.$refs.searchInput as HTMLInputElement ).focus();
		// or, for components:
		( this.$refs.otherSearchInput as InstanceType<typeof CdxTextInput> ).focus();
	}
}
```
If you don't include the `as HTMLInputElement` or `as InstanceType<typeof CdxTextInput>` assertion,
you will get a TypeScript error like `Object is of type 'unknown'`.

### Composition API
When using the composition API, you have to define the type when you create the template ref.
When you use it, you won't need to use a type assertion, but you will need to use the `!` operator
(the [non-null assertion operator](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#non-null-assertion-operator-postfix-))
to tell TypeScript that the value of the template ref can't be undefined.
```typescript
setup( props, context ) {
	// This assumes the template contains `<input ref="searchInput">`
	const searchInput = ref<HTMLInputElement>();
	// If it's a component, e.g. `<cdx-text-input ref="otherSearchInput" />`, use:
	const otherSearchInput = ref<InstanceType<typeof CdxTextInput>>();

	const focusSearchInput = () => {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		searchInput.value!.focus();

		// If you need to use searchInput.value multiple times,
		// you can also store it in a variable as follows:
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const searchInputValue = searchInput.value!;
		searchInputValue.focus();
	};

	return {
		searchInput,
		focusSearchInput
	};
}
```
The `!` operator should be used *very sparingly*, and in Codex we use it **only** for template refs.
Because of this, ESLint warns whenever it's used, and you have to add a comment silencing the
ESLint warning. The `!` operator **should not be used** in other situations.

You should be careful to access template refs only in methods, computed property functions, and
other code that runs after the setup function has finished. They can't be accessed in the setup
function itself, because the `.value` property will still be undefined at that time.

If you don't use a `!` when accessing `searchInput.value`, you will get an error like `Object is
possibly undefined`.

See also the Vue documentation on [typing template refs in the composition API](https://v3.vuejs.org/guide/typescript-support.html#typing-template-refs).

::: tip Accessing public component instance methods
If you are calling a method like "focus" that is defined inside another
component, that method should be defined and exposed using the Options API;
otherwise the TS compiler may complain and throw errors.
:::

## String types
Some components have props that take only certain predefined string values. For example, the Button
component has a `action` prop that can be one of `'default'`, `'progressive'` or `'destructive'`.
This section documents how these string types are organized, and how to create a new one.
For more information on why we chose this approach, see
[the relevant ADR](../../using-codex/adrs/03-adr-string-types.md).

### Naming
String types that are particular to a prop are named for their component first and their prop
second. For example, the type for the `action` prop of the `Button` component is `ButtonAction`; for
the `type` prop of the `Input` component we use `InputType`, etc. If the string type is not
related to a single prop, try to follow a similar naming convention.

### Type definition
The possible values of each string type are defined in `constants.ts`. The constant is the plural
form of the name of the type. For example, for the `ButtonAction` type, the `ButtonActions` constant
is defined as follows:
```typescript
// In constants.ts:
export const ButtonActions = [
	'default',
	'progressive',
	'destructive'
] as const;
```

The type itself is then defined in `types.ts` by referring to this constant. For example, the
`ButtonAction` type is defined as follows:
```typescript
// In types.ts:
export type ButtonAction = typeof ButtonActions[ number ];
```

### Prop definition
To indicate that a prop may only have the values defined for the type, you can import the type
and use it for the prop, as follows. There is also a utility function to automatically generate
a validator for the prop.
```typescript
// In Button.vue:
import { defineComponent, PropType } from 'vue';
import { ButtonAction } from '../../types';
import { ButtonActions } from '../../constants';
import { makeStringTypeValidator } from '../../utils/stringTypeValidator';

// NOTE: This variable is necessary, see "Pitfall" below
const isButtonAction = makeStringTypeValidator( ButtonActions );

export default defineComponent( {
	// ...other stuff...
	props: {
		action: {
			type: String as PropType<ButtonAction>,
			default: 'default',
			validator: isButtonAction
		}
		// ...other props...
	}
})
```
**Pitfall:** Inlining the validator with `validator: makeStringTypeValidator( ButtonActions )`
causes [strange TypeScript errors](#inlining-a-string-type-validator-function).
Using an intermediate variable, as shown in the example above, avoids these errors.

## Common errors and pitfalls

### Empty objects and empty arrays
When you specify an empty array (`[]`) or an empty object (`{}`), TypeScript can't infer the type
of the values in that array or object, and you may have to explicitly tell it what type the values
are. Specifying the type can also help TypeScript check that your array or object contains what
you want it to.

For example, this code:
```ts
const idToElementMap = {};
for ( const obj of arrayOfHTMLElements ) {
	idToElementMap[ obj.id ] = obj;
}
```
will result in the following confusing error:
```
error TS7053: Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{}'.
  No index signature with a parameter of type 'string' was found on type '{}'.

3    idToObjectMap[ obj.id ] = obj;
      ~~~~~~~~~~~~~~~~~~~~~~~
```
To fix this error, explicitly declare the types of the keys and values of `idToElementMap`,
as follows:
```ts
const idToElementMap : Record<string, HTMLElement> = {};
```

Similarly, if you're using an empty object or an empty array as the second argument to a `.reduce()`
call, you may need a type assertion:
```ts
arrayOfObjects.reduce( ( prev, current ) => {
	prev.push( current.id );
	return prev;
}, [] as string[] );
```
Without the `as string[]` type assertion, you'll get the following error:
```
error TS2345: Argument of type 'string' is not assignable to parameter of type 'never'.

67    prev.push( current.id );
                 ~~~~~~~~~~
```

### Inlining a string type validator function
Code like this:
```typescript
	props: {
		myPropName: {
			type: String as PropType<SomeStringType>,
			validator: makeStringTypeValidator( SomeStringTypeValues )
		}
	}
```
can cause confusing errors like `Cannot find name 'myPropName'` or `Property 'myPropName' does
not exist`, or other errors you might expect to get if the `myPropName` prop didn't exist.

To work around this issue, use an intermediate variable for the validator:
```typescript
const myPropNameValidator = makeStringTypeValidator( SomeStringTypeValues );

// ... then in the component definition: ...

	props: {
		myPropName: {
			type: String as PropType<SomeStringType>,
			validator: myPropNameValidator
		}
	}
```
Alternatively, if you really really need to inline the validator, you can do so by specifying
the type, with `makeStringTypeValidator<SomeStringType>( SomeStringTypeValues )`, but this is
not recommended. For readability, it is recommended that you use a variable instead.

### Wrong types for props in Jest tests
If you have a prop definition like this:
```typescript
	props: {
		myPropName: {
			type: String as PropType<SomeStringType>,
			// default: '...',
			// validator: ...
		}
	}
```
And you have a Jest unit test testing this component that looks like this:
```typescript
describe( 'matches the snapshot', () => {
	type Case = [msg: string, myPropName: string, /* ...other props... */ ];
	const cases: Case[] = [
		// ... test cases ...
	];
	test.each( cases )( 'Case %# %s', ( _, myPropName, /* ... */ ) => {
		const wrapper = mount( CdxComponentName, { props: { myPropName, /* ... */ } } );
		expect( wrapper.element ).toMatchSnapshot();
	} );
} );
```
Then you will get a lengthy and confusing error message that likely doesn't appear in your IDE, but
only when running `npm test` on the command line (or in CI). The error looks something like this:
```bash
src/components/component-name/ComponentName.test.ts:27:26 - error TS2769: No overload matches this call.
  The last overload gave the following error.
    Argument of type 'DefineComponent<{ myPropName: { myPropName: PropType<"foo" | "bar" | "baz">; default: string; validator: StringTypeValidator<"foo" | "bar" | "baz">; }; }, ... 10 more ..., { ...; }>' is not assignable to parameter of type 'ComponentOptionsWithObjectProps<Readonly<ComponentPropsOptions<Data>>, { rootClasses: ComputedRef<{ 'cdx-button--action-default': boolean; 'cdx-button--action-progressive': boolean; ... 4 more ...; 'cdx-button--framed': boolean; }>; onClick: (event: Event) => void; }, ... 8 more ..., { ...; } | {}>'.
      Type 'DefineComponent<{ myPropName: { type: PropType<"foo" | "bar" | "baz">; default: string; validator: StringTypeValidator<"foo" | "bar" | "baz">; }; }, ... 10 more ..., { ...; }>' is not assignable to type 'ComponentOptionsBase<Readonly<(readonly unknown[] & { [x: number]: string; } & { [iterator]?: IterableIterator<string> | undefined; length?: number | undefined; toString?: string | undefined; concat?: string[] | undefined; ... 19 more ...; flat?: unknown[] | undefined; }) | ({ ...; } & ... 1 more ... & { ...; })> & ...'.
        Types of property 'setup' are incompatible.
          Type '((this: void, props: Readonly<LooseRequired<Readonly<{ myPropName?: unknown; } & { myPropName: "foo" | "bar" | "baz"; } & {}> & { onClick?: ((...args: any[]) => any) | undefined; }>>, ctx: SetupContext<...>) => void | ... 2 more ... | Promise<...>) | ...' is not assignable to type '((this: void, props: Readonly<LooseRequired<(Readonly<(readonly unknown[] & { [x: number]: string; } & { [iterator]?: IterableIterator<string> | undefined; length?: number | undefined; toString?: string | undefined; ... 20 more ...; flat?: unknown[] | undefined; }) | ({ ...; } & ... 1 more ... & { ...; })> & { ...; ...'.
            Type '(this: void, props: Readonly<LooseRequired<Readonly<{ myPropName?: unknown; } & { action: "foo" | "bar" | "baz"; } & {}> & { onClick?: ((...args: any[]) => any) | undefined; }>>, ctx: SetupContext<...>) => void | ... 2 more ... | Promise<...>' is not assignable to type '(this: void, props: Readonly<LooseRequired<(Readonly<(readonly unknown[] & { [x: number]: string; } & { [iterator]?: IterableIterator<string> | undefined; length?: number | undefined; toString?: string | undefined; ... 20 more ...; flat?: unknown[] | undefined; }) | ({ ...; } & ... 1 more ... & { ...; })> & { ...; }...'.
              Types of parameters 'props' and 'props' are incompatible.
                Type 'Readonly<LooseRequired<(Readonly<(readonly unknown[] & { [x: number]: string; } & { [iterator]?: IterableIterator<string> | undefined; length?: number | undefined; toString?: string | undefined; ... 20 more ...; flat?: unknown[] | undefined; }) | ({ ...; } & ... 1 more ... & { ...; })> & { ...; }) & {}>>' is missing the following properties from type 'Readonly<LooseRequired<Readonly<{ myPropName?: unknown; } & { myPropName: "foo" | "bar" | "baz"; } & {}> & { onClick?: ((...args: any[]) => any) | undefined; }>>': myPropName

27   const wrapper = mount( CdxComponentName, { props: { myPropName } } );
                            ~~~~~~~~~~~~~~~~
```
This happens because the type of `myPropName` in the `type Case` definition is too broad: it's
defined as a `string` there, but the component expects `SomeStringType`. All possible
values of `SomeStringType` are strings, but not all strings are valid `SomeStringType` values.
TypeScript is warning you that you are passing a value that could be an arbitrary string into
something that only takes a limited set of strings. To fix the error, use the correct type for each
prop in your `Case` definition:
```typescript
type Case = [msg: string, myPropName: SomeStringType /* not string! */, /* ... */ ];
```
Frustratingly, the error message doesn't tell you *which* prop has the incorrect type (instead, it
lists all of the component's props), so you'll have to check them all manually. The types of each
prop in your test case definition should exactly match the types used in the component definition.

### Incorrect event name passed to `useModelWrapper`
The third argument to `useModelWrapper` is an event name. If that event name isn't listed in the
component's `emits` property, TypeScript will complain.

For example, this code:
```ts
emits: [ 'click', 'update:foo' ],
setup( props, { emit } ) {
	const wrappedFoo = useModelWrapper( toRef( props, 'foo' ), emit, 'update:ofo' );
}
```
will result in the following error, because `update:ofo` is not a valid event name:
```ts{7}
src/components/foo-bar/FooBar.vue:117:24 - error TS2769: No overload matches this call.
  Overload 1 of 2, '(modelValueRef: Ref<ModelValue>, emit: EmitFunc<"update:modelValue">, eventName?: "update:modelValue" | undefined): WritableComputedRef<ModelValue>', gave the following error.
    Argument of type '(event: "click" | "update:foo", ...args: any[]) => void' is not assignable to parameter of type 'EmitFunc<"update:modelValue">'.
      Types of parameters 'event' and 'event' are incompatible.
        Type '"update:modelValue"' is not assignable to type '"click" | "update:foo"'.
  Overload 2 of 2, '(modelValueRef: Ref<ModelValue>, emit: EmitFunc<"click" | "update:foo">, eventName: "click" | "update:foo"): WritableComputedRef<ModelValue>', gave the following error.
    Argument of type '"update:ofo"' is not assignable to parameter of type '"click" | "update:foo"'
```

`useModelWrapper` also allows its third argument to be omitted, in which case it defaults to using
`update:modelValue` as the event name. If `update:modelValue` isn't one of the component's emitted
events, TypeScript will also complain, but the error message will look different.

For example, this code:
```ts
emits: [ 'click', 'update:foo' ],
setup( props, { emit } ) {
	const wrappedFoo = useModelWrapper( toRef( props, 'foo' ), emit );
}
```
will result in the following error complaining that the `emit` function has the wrong type:
```
src/components/foo-bar/FooBar.vue:117:71 - error TS2345: Argument of type '(event: "click" | "update:foo", ...args: any[]) => void' is not assignable to parameter of type 'EmitFunc<"update:modelValue">'.
  Types of parameters 'event' and 'event' are incompatible.
    Type '"update:modelValue"' is not assignable to type '"click" | "update:foo"'.
```

In both cases, the solution is to ensure that the event name passed to `useModelWrapper` matches
one of the event names in the component's `emits` array.

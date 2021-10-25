# Working with TypeScript

TypeScript can sometimes be difficult or confusing to work with. This page documents tips for
working with TypeScript, understanding errors, common pitfalls, and particular ways that Codex uses
TypeScript.

## String types
Some components have props that take only certain predefined string values. For example, the Button
component has a `action` prop that can be one of `'default'`, `'progressive'` or `'destructive'`.
This section documents how these string types are organized, and how to create a new one.
For more information on why we chose this approach, see
[the relevant ADR](../adrs/03-adr-string-types.md).

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
import { makeStringTypeValidator } from '../../utils';

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
```
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
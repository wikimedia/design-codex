---
outline: deep
---

# Developing components

## Local development

### Vite Sandbox

Running the Vite server for local development will spin up the component sandbox. Each component
should have a simple working demo in the sandbox for local development and testing. These basic
demos will also be used for testing components within MediaWiki.

To start the local dev server, run this command in the root of the Codex repository:

```bash
npm run dev
```

This will serve the sandbox page at `http://localhost:5173`, and automatically update it in the
browser as you make changes to the code (hot module reloading). If you need it to be served on a
different port, you can use `npm run dev --port=12345`.

To add a new component demo to the sandbox:

- In `packages/codex/src/demo`, add a new `.vue` file containing the new demo
- Import the new file into `packages/codex/src/demo/Sandbox.vue`, add it to the template, and add
  it to the `demoSections` array.

### VitePress docs site

Aside from Vite Sandbox, you can also run the VitePress site locally to write and test a full
suite of component demos. See the [component demos](./component-demos) section for more information.

## Component basics

The `codex` package uses [Vue 3](https://v3.vuejs.org/guide/introduction.html) and prefers
the [Composition API](https://v3.vuejs.org/guide/composition-api-introduction.html) over the
Options API.

Codex is written in TypeScript: see the [Working with TypeScript](./typescript.md) section for
information about code conventions, solved problems, and potential pitfalls.

### Conventions

- Export all components that are ready for public consumption in `src/lib.ts` to make them
available to library users.
- PascalCase multi-word component names are used per the Vue.js Style Guide. Component names should
be prefixed with "Cdx," e.g. `CdxButton`
- Slot names should be all lowercase. Use `kebab-case` for slot names with multiple words. This is
necessary to ensure support for environments that use DOM templates, including MediaWiki.

### WIP components

Until a component is ready for public consumption, it is considered a "work in progress" or "WIP"
component. WIP components are housed in a separate directory, `packages/codex/src/components-wip`,
and are included in `index.ts` in that same directory. WIP components will not be included in
public dist files, nor will they appear on the docs site when viewing the documentation for a
specific Codex release. However, WIP components will appear on the docs site for the main branch,
and when serving the docs site locally.

#### Adding a WIP component

To add a new WIP component:
- Add a new directory and `.vue` file to the WIP components directory, e.g.
  `packages/codex/src/components-wip/my-new-component/MyNewComponent.vue`
- Import this component into `packages/codex/src/components-wip/index.ts`

Before submitting a patch for the new component, we recommend at least adding a [basic demo to the
sandbox](#vite-sandbox) and [snapshot tests](./testing-components.md#snapshot-tests).

When adding examples for the VitePress demo page in the `codex-docs` package, the component should
be imported from the `@wikimedia/codex` package as usual. This will not work in real code as long
as the component is still WIP, but the `codex-docs` package is set up to be able to access
WIP components this way.

#### Transition to public component

Once the entire design spec has been implemented, the component has a full suite of interactive
demos, and the component has reached the unit test threshold, it is ready for public use. To make
this transition, submit a patch that:

- Moves the component directory from `components-wip` to `components`
- Exports the component in `lib.ts` instead of `components-wip/index.ts`

Once this patch is merged, the component will be included in the dist and will appear on the docs
site for the next release.

## Writing styles

Styles are written in [Less](https://lesscss.org/#) and are included in the single-file component
at the end in a `<style lang="less">` wrapped section. Codex design tokens are imported as Less
variables from the `@wikimedia/codex-design-tokens` package, using the default
`theme-wikimedia-ui` theme.

### Conventions

**Design tokens**

See [tokens organization, naming and structure for a detailed overview](../../design-tokens/overview.md).<br>
Stylesheet specific token application rules:
- If a component uses a value not represented by a Codex token yet, add a
  component-level Less variable in the `<style>` tag before the first selector.
- Tokens should follow [naming patterns established for MediaWiki](https://www.mediawiki.org/wiki/Manual:Coding_conventions/CSS#Variable_naming).
- Codex does not use shorthand properties `background`, `font`, `animation` and `transition` for
  simpler design token scoping and code modularization reasons. Only tokens of a category type are
  summarized into a shorthand token, e.g.
  ```
  "text-decoration": {
		"none": {
			"value": "{ text-decoration.0 }"
		},
		"line-through": {
			"value": "{ text-decoration.150 }"
		},
		"underline": {
			"value": "{ text-decoration.200 }"
		}
  },
  ```

**Selectors and structure**
- A light version of [BEM](http://getbem.com/) is used for class naming structure:
  - The root element will have the class `.cdx-component-name`
  - A block within that root element would have the class `.cdx-component-name__block-name`
  - A variation of that block would have the class `.cdx-component-name__block-name--modifier-name`
  - There is no need to go deeper than 2 block levels in a class name; class names of further
    sub-elements can omit some of the blocks for the sake of brevity.
- Add specificity when styling a subcomponent to avoid override styles. For example, an Icon
	component that is inside a Label component would use the selector, `.cdx-label__icon.cdx-icon`. In Less:
	```
	cdx-label {
		&__icon.cdx-icon {}
	}
	```
- If a style or selector isn't self-explanatory, add a comment above it in Less comment style `//`.
- Avoid HTML element selectors. The style rulesets should aim to be independent from specific
  element choices, which may change.
- Use `--has-` and `--is-` prefixes for modifiers that are not tied to a specific state, e.g.
  `--has-thumbnail` or `--is-link`.
- Styles specific to a component's enabled or disabled state should be contained in a selector
  specific to that state. This structure allows us to avoid overriding enabled styles for the
  disabled state.
  - The pseudo-classes `&:enabled` and `&:disabled` can be used when available, otherwise
    `&--enabled` and `&--disabled` classes should be added (e.g. `.cdx-menu-item--enabled`).
    These are available to contain styles for the two states and for simpler styles orientation.
  - The stylelint `no-descending-specificity` rule can be disabled to maintain this structure (see
    sample code below).

**Less mixin parameters**
- In order to distinguish clearer from CSS variables and Codex tokens, Less mixin function
  parameters should be prefixed with `param` (e.g. `@param-size`).

**Linting**
- Codex uses [stylelint-order](https://github.com/hudochenkov/stylelint-order/) to order CSS/Less
  rules
- Enforce relying only on specific CSS properties over shorthands for `background`, `font`,
  `animation` and `transition`.
- Stylelint rules can be disabled/enabled and should be marked as CSS style comment `/* stylelint-disable-next-line rule-name */`.

Below are some sample styles for a component to demonstrate these conventions:

```less
<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';
@import ( reference ) '../../themes/mixins/binary-input.less';

.cdx-radio {
	// Common binary input styles.
	.cdx-mixin-binary-input();

	// Custom-styled radio that's visible to the user.
	&__icon {
		border-radius: @border-radius-circle;

		// …
	}

	// HTML `<input type="radio">`.
	// Based on the HTML attributes of the radio input, we can change the style of the adjacent
	// `span`, which will look like a custom-styled radio.
	&__input {
		&:enabled {
			& + .cdx-radio__icon {
				border-color: @border-color-input-binary;
			}

			// Note: there is no focus behavior for the input in its unchecked state because you
			// can't focus on it without selecting it.
			&:hover + .cdx-radio__icon {
				border-color: @border-color-input-binary--hover;
			}

			// …
		}

		/* stylelint-disable no-descending-specificity */
		&:disabled {
			// Only disabled radios should have a gray label.
			& ~ .cdx-radio__label {
				color: @color-disabled;
			}

			// …
		}
		/* stylelint-enable no-descending-specificity */
}
</style>
```

## Bidirectional script support
Codex has limited support for [bidirectional text](https://en.wikipedia.org/wiki/Bidirectional_text).
It supports pages that are entirely in a left-to-right (LTR) script, or pages that are entirely
in a right-to-left (RTL) script. It does not support pages with a mix of LTR and RTL
content, or pages whose directionality changes at runtime, except in some special cases.
At the time of this writing, it's virtually impossible to support those use cases without the
`:dir()` CSS pseudo-class, which is
[not yet supported by most browsers](https://caniuse.com/css-dir-pseudo).

There are tools (like postcss-rtlcss, see below) that generate bidirectional CSS using attribute
selectors like `[dir='ltr']`, but this technique is fragile. It breaks in confusing and ugly ways
on pages that don't have a `dir` attribute set, and on pages where a `dir="ltr"` element is nested
inside a `dir="rtl"` element or vice versa. Because of these significant limitations, bidirectional
stylesheets are only useful in very limited circumstances, and Codex does not provide one.

### Flipping of direction-specific styles
Styles in Codex are written for left-to-right (LTR) environments. Codex uses
[RTLCSS](https://rtlcss.com/) to generate flipped versions of these styles for right-to-left (RTL)
environments. For example, a rule like `.foo { padding-left: 4px; }` will be changed to
`.foo { padding-right: 4px; }` in RTL. In the build, the LTR styles are placed in `codex.style.css`
and the RTL styles in`codex.style-rtl.css`.

In most cases, this automatic transformation should produce the correct result, but you should
always test style changes in both LTR and RTL. Both the sandbox (`npm run dev`) and the component
demos (`npm run doc:dev`) have direction switchers that allow you to switch between LTR and RTL
on the fly.

In some cases, the automatic flipping transformation doesn't produce the correct result. Override
directives can be used to address this. To prevent a rule from being flipped, put `/* rtl:ignore */`
on the line above it. To set a different value for a property in RTL, put the RTL value in
a comment like `/* rtl:4px */`. These two directives are the most important ones, but others exist;
see the postcss-rtlcss documentation on [control directives](https://rtlcss.com/learn/usage-guide/control-directives/)
and [value directives](https://rtlcss.com/learn/usage-guide/value-directives/)
for more information.

Below is an example that demonstrates these directives:
```less
.foo {
	// This rule isn't flipped. It uses float: left; in both LTR and RTL
	/* rtl:ignore */
	float: left;

	// This rule is flipped, because there is no rtl:ignore directive above it
	// It becomes padding-right: 12px; in RTL
	padding-left: 12px;
}

.bar {
	// This rule uses -100% (`@size-full`) in RTL, because that value is explicitly specified.
	transform: translateX( 0 ) /* rtl:translateX( -@size-full ) */;

	// This rule is NOT flipped to margin-right, because an explicit RTL value is specified
	// In RTL, this rule becomes margin-left: 30px; (NOT margin-right: 30px;)
	margin-left: 12px /* rtl:30px */;
}
```

### Direction-specific behavior in components
Some components need to adjust their behavior depending on the text direction. For example,
components that listen for the left and right arrow keys being pressed may need to react to those
key presses differently depending on the text direction.

To achieve this, components should use the `useComputedDirection()` composable, which detects the
direction of the surrounding context of the component at mount time. This works even on pages with
mixed or nested directionality; however it does not detect changes in directionality that happen
after the component is mounted.

Below is an example that demonstrates the use of the `useComputedDirection()` composable function:
```vue
<template>
	<!-- Set ref="rootElement" on the root element of your component -->
	<div
		ref="rootElement"
		class="cdx-my-component"
		@keydown.left.right="onKeydown"
	>
		<!-- ...component template goes here... -->
	</div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import useComputedDirection from '../../composables/useComputedDirection';
// ...other imports...

export default defineComponent( {
	setup() {
		const rootElement = ref(); // If using TypeScript, use ref<HTMLDivElement>();
		const computedDir = useComputedDirection( rootElement );

		function onKeydown( e ) {
			if ( e.key === 'ArrowLeft' ) {
				// Left means "next" in RTL, "previous" in LTR
				navigate( computedDir.value === 'rtl' ? 'next' : 'previous' );
			} else if ( e.key === 'ArrowRight' ) {
				navigate( computedDir.value === 'ltr' ? 'previous' : 'next' );
			}
		}

		function navigate( prevOrNext ) {
			// ...
		}

		return {
			rootElement,
			onKeydown
		};
	}
} );
</script>
```

The [Icon component](../../components/demos/icon.md) also uses this composable to detect the text direction,
and allows the detected direction to be overridden through the `dir` prop. For more information about
how bidirectionality is handled for icons in particular, see
[the icon documentation](../../icons/overview.md#right-to-left-rtl-and-language-support).

## Inheriting attributes

By default, components will place any attributes bound to them on the root element of the
component. Sometimes, though, we don't want this behavior. For example, for a component that
contains an `<input>` element, we may want to bind most of the attributes to that `<input>` element
rather than the root element.

Some attributes, however, should always be bound to the root element in order to provide expected
results for library users. This includes `class` and `style` attributes.

::: warning
Binding a `style` attribute to a component is highly discouraged as it could interfere with Design
System consistency and negatively impact performance. Nonetheless, if one is provided, it will be
bound to the root element of the component.
:::

To help achieve the desired behavior in components like this, we have a composable called
`useSplitAttributes`. It provides the following:
1. `rootClasses`: all CSS classes that should be bound to the root element, including those set via
the `class` attribute on the component and those that are internal to the component, like dynamic
and conditional classes
2. `rootStyle`: the `style` attribute bound to the component, should one be provided
2. `otherAttrs`: all other attributes, which can be bound to the desired child element

Below is sample usage from the TextInput component:

```vue
<template>
	<!-- Add rootClasses and rootStyle to the root element. -->
	<div
		class="cdx-text-input"
		:class="rootClasses"
		:style="rootStyle"
	>
		<!-- Bind otherAttrs to the input. -->
		<input
			v-bind="otherAttrs"
		>
	</div>
</template>

<script>
// Import the composable.
import useSplitAttributes from '../../composables/useSplitAttributes';

export default defineComponent( {
	name: 'CdxTextInput',
	// Set inheritAttrs to false.
	inheritAttrs: false,
	setup( props, context ) {
		// Define dynamic classes internal to the component, in Vue's object
		// syntax format.
		const internalClasses = computed( () => {
			return {
				'cdx-text-input--has-start-icon': !!props.startIcon,
				'cdx-text-input--has-end-icon': !!props.endIcon || props.clearable,
				'cdx-text-input--clearable': isClearable.value
			};
		} );

		// Get helpers from the composable.
		const {
			rootClasses,
			rootStyle,
			otherAttrs
		} = useSplitAttributes( context.attrs, internalClasses );
	}
} );
</script>
```

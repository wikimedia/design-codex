<script setup>
import { CdxAccordion } from '@wikimedia/codex';
import { cdxIconSearch, cdxIconInfoFilled } from '@wikimedia/codex-icons';
import CdxDocsConfigurableGeneric from '@/../src/components/configurable-generic/ConfigurableGeneric.vue';
import TextInputBasic from '@/../component-demos/text-input/examples/TextInputBasic.vue';
import TextInputInitialValue from '@/../component-demos/text-input/examples/TextInputInitialValue.vue';
import TextInputDate from '@/../component-demos/text-input/examples/TextInputDate.vue';
import TextInputWithIcons from '@/../component-demos/text-input/examples/TextInputWithIcons.vue';
import TextInputWithClearable from '@/../component-demos/text-input/examples/TextInputWithClearable.vue';
import TextInputField from '@/../component-demos/text-input/examples/TextInputField.vue';
import TextInputNativeValidation from '@/../component-demos/text-input/examples/TextInputNativeValidation.vue';

const controlsConfig = [
	{
		name: 'startIcon',
		type: 'icon'
	},
	{
		name: 'endIcon',
		type: 'icon'
	},
	{
		name: 'clearable',
		type: 'boolean'
	},
	{
		name: 'inputType',
		type: 'select',
		menuItems: [
			{ value: 'text' },
			{ value: 'search' },
			{ value: 'number' },
			{ value: 'email' },
			{ value: 'password' },
			{ value: 'tel' },
			{ value: 'url' },
			{ value: 'week' },
			{ value: 'month' },
			{ value: 'date' },
			{ value: 'datetime-local' },
			{ value: 'time' }
		]
	},
	{
		name: 'status',
		type: 'radio',
		options: [ 'default', 'error' ],
	},
	{
		name: 'disabled',
		type: 'boolean'
	},
	{
		name: 'readonly',
		type: 'boolean'
	},
	{
		name: 'placeholder',
		type: 'text'
	}
];
</script>

A TextInput is a form element that lets users input and edit a single-line text value.

<cdx-demo-wrapper :controls-config="controlsConfig" :show-generated-code="true" generated-model-name="inputValue">
<template v-slot:demo="{ propValues }">
	<cdx-docs-configurable-generic v-bind="propValues" />
</template>
</cdx-demo-wrapper>

## Overview

### When to use TextInput

Use the TextInput component in forms when the user’s answer to a prompt can not easily be predicted,
or when there is significant variability in potential inputs. For search queries, use [SearchInput](./search-input.md) instead.

You can provide autocomplete options that are tailored to the user’s input by using
[Lookup](./lookup.md).

### About TextInput

With a TextInput, users can input text, numbers, symbols, or mixed-format strings like dates or
email addresses. TextInput includes the following elements.

#### Start icon (optional)

A start icon can be included to visually enhance the input's purpose. For example, the "user avatar"
icon might be used in a username field.

<cdx-demo-best-practices>
<cdx-demo-best-practice>Use a simple icon that is easily understandable to users.</cdx-demo-best-practice>
</cdx-demo-best-practices>

#### Input

The following input types can be used:

<div class="cdx-docs-multi-column cdx-docs-multi-columns-2">

1. Text (default)
2. Search
3. Number
4. Email
5. Password
6. Telephone
7. URL
8. Week
9. Month
10. Date
11. Date and time
12. Time

</div>

##### Placeholder text (optional)

Placeholder text provides an example of what type of information is being requested in the input.

<cdx-demo-best-practices>
<cdx-demo-best-practice>Placeholder text should further illustrate and support the TextInput's label.</cdx-demo-best-practice>
<cdx-demo-best-practice type="dont">Placeholder text should never replace the label nor be the input's only description.</cdx-demo-best-practice>
</cdx-demo-best-practices>

#### End icon (optional)

A secondary end icon can be included if needed.

#### Clear button (optional)

A 'clear' button can be included to remove the typed content within the input field.

## Examples

### Basic usage

<cdx-demo-wrapper>
<template v-slot:demo>
	<text-input-basic />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/text-input/examples/TextInputBasic.vue [NPM]

<<< @/../component-demos/text-input/examples-mw/TextInputBasic.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

<cdx-accordion>
<template #title>Developer notes</template>

This simple example demonstrates how to bind a reactive reference to the input's value via
`v-model`. The reactive reference will automatically update when the input value changes.

Open up the browser console to review events emitted on input, change, focus, and blur.

</cdx-accordion>

### With initial value

<cdx-demo-wrapper :force-reset="true">
<template v-slot:demo>
	<text-input-initial-value />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/text-input/examples/TextInputInitialValue.vue [NPM]

<<< @/../component-demos/text-input/examples-mw/TextInputInitialValue.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

### Input type

Any of the [native input
types](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#input_types) can be used.
Some types may result in a browser-provided user interface, like a date picker for a date input.

<cdx-demo-wrapper>
<template v-slot:demo>
	<text-input-date />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/text-input/examples/TextInputDate.vue [NPM]

<<< @/../component-demos/text-input/examples-mw/TextInputDate.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

<cdx-accordion>
<template #title>Developer notes</template>

Use the `inputType` prop to set the native `<input>` type attribute.

</cdx-accordion>

### Clearable

A clearable TextInput will have a clear button when there is text in the input. When clicked, the
clear button will set the input value to an empty string.

<cdx-demo-wrapper>
<template v-slot:demo>
	<text-input-with-clearable />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/text-input/examples/TextInputWithClearable.vue [NPM]

<<< @/../component-demos/text-input/examples-mw/TextInputWithClearable.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

### With icons

A TextInput can have a start icon, end icon, or both. Any Codex icon can be used.

<cdx-demo-best-practices>
<cdx-demo-best-practice>Use simple icons that are easily understandable to users.</cdx-demo-best-practice>
</cdx-demo-best-practices>

Note that a clearable TextInput with an end icon will display both the clear button and the
end icon when the input is not empty. To review this behavior, type in the input below.

<cdx-demo-wrapper>
<template v-slot:demo>
	<text-input-with-icons />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/text-input/examples/TextInputWithIcons.vue [NPM]

<<< @/../component-demos/text-input/examples-mw/TextInputWithIcons.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

### Form field

A TextInput can be wrapped in the Field component to add features like a semantic label, description
and help text, validation messages, and more. Refer to the [Field](./field.md) page for more
information.

<cdx-demo-wrapper>
<template v-slot:demo>
	<text-input-field />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/text-input/examples/TextInputField.vue [NPM]

<<< @/../component-demos/text-input/examples-mw/TextInputField.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

### Native validation

The TextInput component exposes [native constraint validation](https://developer.mozilla.org/en-US/docs/Web/HTML/Constraint_validation)
methods. Refer to the [methods](#methods) below to review all of the supported features.

This demo sets the input type to "email" and validates the input on blur. When the input is invalid,
it sets the Field's status to "error" and passes the native validation message to the Field
component for display.

<cdx-demo-wrapper>
<template v-slot:demo>
	<text-input-native-validation />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/text-input/examples/TextInputNativeValidation.vue [NPM]

<<< @/../component-demos/text-input/examples-mw/TextInputNativeValidation.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

## Technical implementation

### Vue usage

`v-model` is used to track the current value of the input. Refer to the events table for details on
emitted events and their properties.

::: tip Attributes passed to input
This component will pass any HTML attributes applied to it, except for CSS class, to the `<input>` element within the component.
:::

### CSS-only version

#### Markup structure

The CSS-only TextInput component consists of a `<div>` wrapping an `<input>` element.

<cdx-demo-wrapper>
<template v-slot:demo>
	<div class="cdx-text-input">
		<input class="cdx-text-input__input" type="text" placeholder="Start typing...">
	</div>
</template>
<template v-slot:code>

```html
<!-- Wrapper `<div>` element. -->
<div class="cdx-text-input">
	<!-- Input element with CSS class and attributes. -->
	<input class="cdx-text-input__input" type="text" placeholder="Start typing...">
</div>
```

</template>
</cdx-demo-wrapper>

#### With icons

You can use [CSS-only icons](./icon.md#css-only-version) to add start and end icons to the input.

You'll need the following CSS classes on the root element:
- Start icon: `.cdx-text-input--has-start-icon`
- End icon: `.cdx-text-input--has-end-icon`

The icons will be `<span>` elements with the `.cdx-text-input__icon` class, plus:
- Start icon: `.cdx-text-input__start-icon`
- End icon: `.cdx-text-input__end-icon`

You will need to add your own CSS classes to set the icon styles and background image.

<cdx-demo-wrapper>
<template v-slot:demo>
	<div class="cdx-text-input cdx-text-input--has-start-icon cdx-text-input--has-end-icon">
		<input class="cdx-text-input__input" type="text">
		<span class="cdx-text-input__icon cdx-text-input__start-icon cdx-demo-css-icon--search"></span>
		<span class="cdx-text-input__icon cdx-text-input__end-icon cdx-demo-css-icon--info-filled"></span>
	</div>
</template>
<template v-slot:code>

```html
<div class="cdx-text-input cdx-text-input--has-start-icon cdx-text-input--has-end-icon">
	<input class="cdx-text-input__input" type="text">
	<span class="cdx-text-input__icon cdx-text-input__start-icon cdx-demo-css-icon--search"></span>
	<span class="cdx-text-input__icon cdx-text-input__end-icon cdx-demo-css-icon--info-filled"></span>
</div>
```

:::code-group

```less [NPM]
// Note: you must import the design tokens before importing the css-icon mixin
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';
@import ( reference ) '@wikimedia/codex/mixins/css-icon.less';

.cdx-demo-css-icon {
	&--search {
		.cdx-mixin-css-icon( @cdx-icon-search );
	}

	&--info-filled {
		.cdx-mixin-css-icon( @cdx-icon-info-filled );
	}
}
```

```less [MediaWiki]
@import 'mediawiki.skin.variables.less';

.cdx-demo-css-icon {
	&--search {
		.cdx-mixin-css-icon( @cdx-icon-search );
	}

	&--info-filled {
		.cdx-mixin-css-icon( @cdx-icon-info-filled );
	}
}
```

:::

</template>
</cdx-demo-wrapper>

#### Disabled

Add the `disabled` attribute to the `<input>` element for a disabled text input. This also works
for the `readonly` attribute.

<cdx-demo-wrapper>
<template v-slot:demo>
	<div class="cdx-text-input cdx-text-input--has-start-icon cdx-text-input--has-end-icon">
		<input class="cdx-text-input__input" type="text" placeholder="Start typing..." disabled>
		<span class="cdx-text-input__icon cdx-text-input__start-icon cdx-demo-css-icon--search"></span>
		<span class="cdx-text-input__icon cdx-text-input__end-icon cdx-demo-css-icon--info-filled"></span>
	</div>
</template>
<template v-slot:code>

```html
<div class="cdx-text-input cdx-text-input--has-start-icon cdx-text-input--has-end-icon">
	<input class="cdx-text-input__input" type="text" placeholder="Start typing..." disabled>
	<span class="cdx-text-input__icon cdx-text-input__start-icon cdx-demo-css-icon--search"></span>
	<span class="cdx-text-input__icon cdx-text-input__end-icon cdx-demo-css-icon--info-filled"></span>
</div>
```

:::code-group

```less [NPM]
// Note: you must import the design tokens before importing the css-icon mixin
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';
@import ( reference ) '@wikimedia/codex/mixins/css-icon.less';

.cdx-demo-css-icon {
	&--search {
		.cdx-mixin-css-icon( @cdx-icon-search );
	}

	&--info-filled {
		.cdx-mixin-css-icon( @cdx-icon-info-filled );
	}
}
```

```less [MediaWiki]
@import 'mediawiki.skin.variables.less';

.cdx-demo-css-icon {
	&--search {
		.cdx-mixin-css-icon( @cdx-icon-search );
	}

	&--info-filled {
		.cdx-mixin-css-icon( @cdx-icon-info-filled );
	}
}
```

:::

</template>
</cdx-demo-wrapper>

#### Error state

Add the `.cdx-text-input--status-error` class to the root element to show error styles.

<cdx-demo-wrapper>
<template v-slot:demo>
	<div class="cdx-text-input cdx-text-input--status-error">
		<input class="cdx-text-input__input" type="text" value="Something's wrong">
	</div>
</template>
<template v-slot:code>

```html
<div class="cdx-text-input cdx-text-input--status-error">
	<input class="cdx-text-input__input" type="text" value="Something's wrong">
</div>
```

</template>
</cdx-demo-wrapper>

<style lang="less" scoped>
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';
@import ( reference ) '@wikimedia/codex/mixins/css-icon.less';

.cdx-demo-css-icon {
	&--search {
		.cdx-mixin-css-icon( @cdx-icon-search );
	}

	&--info-filled {
		.cdx-mixin-css-icon( @cdx-icon-info-filled );
	}
}
</style>

### Keyboard navigation

| Key | Function |
| -- | -- |
| <kbd>Left arrow</kbd> / <kbd>Right arrow</kbd> | The left and right arrows navigate through the text content within the input. |
| <kbd>Up arrow</kbd> / <kbd>Down arrow</kbd> | Up arrow moves the focus from the last position of the input to the first one, while down arrow moves it from the first position to the last. |

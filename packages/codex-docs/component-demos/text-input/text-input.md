<script setup>
import { cdxIconSearch, cdxIconInfoFilled } from '@wikimedia/codex-icons';
import CdxDocsConfigurableGeneric from '@/../src/components/configurable-generic/ConfigurableGeneric.vue';
import TextInputDemo from '@/../component-demos/text-input/examples/TextInputDemo.vue';
import TextInputField from '@/../component-demos/text-input/examples/TextInputField.vue';

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

A text input is a form element that lets users input and edit a single-line text value.

## Guidelines

### Using text inputs

Through text input fields, users can input text, numbers, symbols or mixed-format strings (unless
specifically restricted).

Use the TextInput component in forms when the user’s answer to a prompt can not easily be predicted,
or when there is significant variability in potential inputs. Text inputs should also be used when
other form components prove more difficult (require additional steps) to achieve the same result
(e.g. selecting a date from a calendar versus typing in the date). The text input used for search
queries, known as the search type, is documented in [SearchInput](./search-input.md).

You can provide autocomplete options that are tailored to the user’s input by using
[Lookup](./lookup.md).

### Specifications

![Specification of TextInput.](../../assets/components/text-input-specifications.svg)

1. **Icon** (optional)<br>
Icons can add to simple identification of specific user inputs. Examples are 'search'  magnifying
glass for search bars or 'user avatar'  for user login input fields.
2. **Placeholder text** (optional)<br>
The placeholder text provides an example of what type of information is being requested in the
input. The placeholder text should further illustrate and support the text input label. However, it
should never be the only input description.
3. **End icon** (optional)<br>
A secondary end icon can be included if needed.
4. **Clear button** (optional)<br>
A 'clear' indicator can be included to remove the typed content within the input field.

The base min-width for the TextInput component is set at `@size-1600` (equivalent to `256px` in the default Codex theme), but it can be customized to a smaller width if needed. There is no maximum width limit.

If the text entered in the input exceeds the available space, it will overflow horizontally.

Refer to the
[TextInput component in Codex Figma](https://www.figma.com/file/KoDuJMadWBXtsOtzGS4134/%E2%9D%96-Codex-components?type=design&node-id=2547-28279&mode=design&t=yTcArGDe2utFY0wc-11).

### Types

The text input can accommodate the following types of inputs:

![Input types: Text, Search, Number, Email, Password, Telephone, URL, Week, Month, Date, Date and time, and Time.](../../assets/components/text-input-types.svg)

<div class="cdx-docs-multi-column cdx-docs-multi-columns-2">

1. Text
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

### Interaction states

Text inputs have the following visually separate states:

![States of the Text Input component: default, hover, active-focus, filled, disabled, read-only, error default, error focus, and error filled.](../../assets/components/text-input-interaction-states.svg)

<div class="cdx-docs-multi-column cdx-docs-multi-columns-2">

1. Default
2. Hover
3. Active - Focus
4. Filled
5. Disabled
6. Read-only
7. Error default
8. Error focus
9. Error filled

</div>

### Best practices

Consider the following recommendations when using text inputs.

#### Usage

<cdx-demo-rules>

<template #do-media>

![TextInput included within a Field.](../../assets/components/text-input-best-practices-usage-do.svg)

</template>

<template #do-text>

- Integrate the TextInput within a Field component to use all available properties of Field, such as label, helper text, and error messages.

</template>

<template #dont-media>

![Standalone TextInput.](../../assets/components/text-input-best-practices-usage-dont.svg)

</template>

<template #dont-text>

- Use standalone TextInput outside of a Field component.
- Use TextInputs without a label, as the label is essential for accessibility and ease of scanning.

</template>

</cdx-demo-rules>

#### Icon

<cdx-demo-rules>

<template #do-media>

![TextInput with a recognizable icon.](../../assets/components/text-input-best-practices-icon-do.svg)

</template>

<template #do-text>

- Use a start icon that meets the input's requirements.

</template>

<template #dont-media>

![TextInput with a complex icon.](../../assets/components/text-input-best-practices-icon-dont.svg)

</template>

<template #dont-text>

- Use icons that are difficult to understand or do not clearly convey their purpose.

</template>

</cdx-demo-rules>

## Demos

### Configurable

<cdx-demo-wrapper :controls-config="controlsConfig" :show-generated-code="true" generated-model-name="inputValue">
<template v-slot:demo="{ propValues }">
	<cdx-docs-configurable-generic v-bind="propValues" />
</template>
</cdx-demo-wrapper>

### Default

This simple example demonstrates how to bind a reactive reference to the input's value via
`v-model`. The reactive reference will automatically update when the input value changes.

Open up the browser console to see events emitted on input, change, focus, and blur.

<cdx-demo-wrapper>
<template v-slot:demo>
	<text-input-demo :showValue="true" />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/text-input/examples/TextInputDefault.vue [NPM]

<<< @/../component-demos/text-input/examples-mw/TextInputDefault.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

In this example, the parent component sets an initial value and has a reset button that will restore
that initial value on click.

<cdx-demo-wrapper :force-reset="true">
<template v-slot:demo>
	<text-input-demo :showValue="true" initialValue="Initial value" />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/text-input/examples/TextInputInitialValue.vue [NPM]

<<< @/../component-demos/text-input/examples-mw/TextInputInitialValue.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

### Input type

Use the `inputType` prop to set the native `<input>` type attribute.
Some `inputType` values will result in a browser provided UI like the date
`inputType` provided below.

<cdx-demo-wrapper>
<template v-slot:demo>
	<text-input-demo :showValue="true" :input-props="{ inputType: 'date' }" />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/text-input/examples/TextInputDate.vue [NPM]

<<< @/../component-demos/text-input/examples-mw/TextInputDate.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>


### Clearable

Including the `clearable` prop will add a clear button to the end of the icon when the input is not
empty. On click, the clear button will set the input value to an empty string.

<cdx-demo-wrapper>
<template v-slot:demo>
	<text-input-demo :showValue="true" :input-props="{ clearable: true }" />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/text-input/examples/TextInputWithClearable.vue [NPM]

<<< @/../component-demos/text-input/examples-mw/TextInputWithClearable.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

### With icons

A TextInput can have a `startIcon`, an `endIcon`, or both. Any Codex icon can be used.

Note that a clearable TextInput with an `endIcon` will display both the clear button and the
`endIcon` when the input is not empty. To see this behavior, type in the input below.

<cdx-demo-wrapper>
<template v-slot:demo>
	<text-input-demo :input-props="{ inputType: 'search', startIcon: cdxIconSearch, endIcon: cdxIconInfoFilled, clearable: true }" />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/text-input/examples/TextInputWithIcons.vue [NPM]

<<< @/../component-demos/text-input/examples-mw/TextInputWithIcons.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>


### With placeholder

To add placeholder text, add a `placeholder` attribute.

<cdx-demo-wrapper>
<template v-slot:demo>
	<text-input-demo placeholder="Start typing..." />
</template>

<template v-slot:code>

```vue-html
<cdx-text-input placeholder="Start typing..." />
```

</template>
</cdx-demo-wrapper>

### Disabled

To disable the input, add the `disabled` attribute.

<cdx-demo-wrapper>
<template v-slot:demo>
	<text-input-demo :input-props="{ startIcon: cdxIconSearch, disabled: true }" />
</template>

<template v-slot:code>

```vue-html
<cdx-text-input :start-icon="cdxIconSearch" :disabled="true" />
```

</template>
</cdx-demo-wrapper>

### Form field

A TextInput can be wrapped in the Field component to add features like a semantic label, description
and help text, validation messages, and more. See the [Field](./field.md) page for more information.

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

## Vue usage

`v-model` is used to track the current value of the input. See the events docs for details on emitted events and their properties.

::: tip Attributes passed to input
This component will pass any HTML attributes applied to it, except for CSS class, to the `<input>` element within the component.
:::

## CSS-only version

### Markup structure

The CSS-only TextInput component consists of a `<div>` wrapping an `<input>` element.

<cdx-demo-wrapper>
<template v-slot:demo>
	<div class="cdx-text-input">
		<input class="cdx-text-input__input" type="text" placeholder="Start typing...">
	</div>
</template>
<template v-slot:code>

```html
<!-- Wrapper div. -->
<div class="cdx-text-input">
	<!-- Input element with CSS class and attributes. -->
	<input class="cdx-text-input__input" type="text" placeholder="Start typing...">
</div>
```

</template>
</cdx-demo-wrapper>

### With icons

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

### Disabled

Add the `disabled` attribute to the `<input>` element for a disabled text input.

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

### Error state

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

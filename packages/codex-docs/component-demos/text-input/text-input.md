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
		name: 'placeholder',
		type: 'text'
	}
];
</script>

::: tip Attributes passed to input
This component will pass any HTML attributes applied to it, except for CSS class, to the `<input>`
element within the component.
:::

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

<<< @/../component-demos/text-input/examples/TextInputDefault.vue

</template>
</cdx-demo-wrapper>

In this example, the parent component sets an initial value and has a reset button that will restore
that initial value on click.

<cdx-demo-wrapper :force-reset="true">
<template v-slot:demo>
<text-input-demo :showValue="true" initialValue="Initial value" />
</template>

<template v-slot:code>

<<< @/../component-demos/text-input/examples/TextInputInitialValue.vue

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

<<< @/../component-demos/text-input/examples/TextInputDate.vue

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

```vue-html
<cdx-text-input :clearable="true" />
```

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

<<< @/../component-demos/text-input/examples/TextInputWithIcons.vue

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

<<< @/../component-demos/text-input/examples/TextInputField.vue

</template>
</cdx-demo-wrapper>

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

```less
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

```less
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

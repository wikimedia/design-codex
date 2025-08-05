<script setup>
import { ref } from 'vue';
import { CdxLabel, CdxTextInput, CdxAccordion } from '@wikimedia/codex';
import LabelBasic from '@/../component-demos/label/examples/LabelBasic.vue';
import LabelVisuallyHidden from '@/../component-demos/label/examples/LabelVisuallyHidden.vue';
import LabelWithRichText from '@/../component-demos/label/examples/LabelWithRichText.vue';
import LabelWithDescription from '@/../component-demos/label/examples/LabelWithDescription.vue';
import LegendWithDescription from '@/../component-demos/label/examples/LegendWithDescription.vue';

const controlsConfig = [
	{
		name: 'icon',
		type: 'icon'
	},
	{
		name: 'optional',
		type: 'boolean'
	},
	{
		name: 'visuallyHidden',
		type: 'boolean'
	},
	{
		name: 'isLegend',
		type: 'boolean'
	},
	{
		name: 'disabled',
		type: 'boolean'
	},
	{
		name: 'default',
		type: 'slot',
		default: 'Label text'
	},
	{
		name: 'description',
		type: 'slot',
		default: 'Short description text'
	},
];
</script>

A Label provides a descriptive title for an input or form field.

<cdx-demo-wrapper :controls-config="controlsConfig" :show-generated-code="true">
<template v-slot:demo="{ propValues, slotValues }">
	<cdx-label v-bind="propValues">
		{{ slotValues.default }}
		<template #description>{{ slotValues.description }}</template>
	</cdx-label>
</template>
</cdx-demo-wrapper>

## Overview

### When to use Label

Every input or form field must have an associated label. When creating a form, use the
[Field](./field.md) component, which contains a Label. When creating an input outside of a form,
such as a [SearchInput](./search-input.md)), use the Label component.

For more detailed information about form fields, consult the guidelines for [constructing forms](../../style-guide/constructing-forms.md).

### About Label

Label includes the following elements.

#### Icon (optional)

A start icon can be included to visually enhance the label's context. Any Codex icon can be used.

<cdx-demo-best-practices>
<cdx-demo-best-practice>Use a simple icon that is easily comprehensible to users.</cdx-demo-best-practice>
<cdx-demo-best-practice type="dont">Don't use an icon in the label if there is an icon in the input.</cdx-demo-best-practice>
</cdx-demo-best-practices>

#### Label text

A clear and descriptive title for the input tells the user what information to enter.

<cdx-demo-best-practices>
<cdx-demo-best-practice>Keep the label text short, clear, and easy to scan.</cdx-demo-best-practice>
<cdx-demo-best-practice>Label text is required, but can be visually-hidden if the context of an input is sufficient to identify it.</cdx-demo-best-practice>
<cdx-demo-best-practice>Label text is bold by default, but the label of nested fields should use the regular font weight to make the hierarchy clear.</cdx-demo-best-practice>
</cdx-demo-best-practices>

#### Optional indicator (optional)

Fields are assumed to be required by default. If a field is optional, it can be labeled as such.

<cdx-demo-best-practices>
<cdx-demo-best-practice>Ensure that the entire word "optional" is displayed for translation purposes.</cdx-demo-best-practice>
<cdx-demo-best-practice type="dont">Don't mark required labels with an asterisk.</cdx-demo-best-practice>
</cdx-demo-best-practices>

#### Description (optional)

The description provides additional information about the field.

## Examples

:::tip
Consider using the [Field](./field.md) component, which includes the Label component and handles
accessibility features like ARIA attributes internally. If you need more custom behavior, use the
Label component on its own.
:::

### Basic usage

By default, the Label will be visible with the label text styled in bold.

<cdx-demo-wrapper>
<template v-slot:demo>
	<label-basic />
</template>
<template v-slot:code>

:::code-group

<<< @/../component-demos/label/examples/LabelBasic.vue [NPM]

<<< @/../component-demos/label/examples-mw/LabelBasic.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

<cdx-accordion>
<template #title>Developer notes</template>

When using the Label component with an input, make sure to add an `id` attribute to the input and
use that to set the `for` attribute on the label. These attributes will be applied on the proper
element within each component (in the example below, that's the `<label>` for the Label component,
and the `<input>` for the TextInput).

</cdx-accordion>

### Visually-hidden label

All inputs need a label to meet accessibility standards. In rare instances, you may not need a
visible label if it's very clear from context how to use an input.

<cdx-demo-wrapper>
<template v-slot:demo>
	<label-visually-hidden />
</template>
<template v-slot:code>

:::code-group

<<< @/../component-demos/label/examples/LabelVisuallyHidden.vue [NPM]

<<< @/../component-demos/label/examples-mw/LabelVisuallyHidden.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

<cdx-accordion>
<template #title>Developer notes</template>

To achieve this, you can use the Label component to create a semantic label for assistive
technology, but visually hide the label.

Note that this will hide the entire output of the component, including the description.

</cdx-accordion>

### With description

Description text can include markup. Only links and text formatting are recommended as description
text should be concise.

<cdx-demo-wrapper :allow-link-styles="true">
<template v-slot:demo>
	<label-with-rich-text />
</template>
<template v-slot:code>

:::code-group

<<< @/../component-demos/label/examples/LabelWithRichText.vue [NPM]

<<< @/../component-demos/label/examples-mw/LabelWithRichText.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

### Label vs. legend

This component outputs a different HTML element depending on whether it is a label for a single
input or for a group of inputs. Below are examples of a label and a legend with an associated
description.

<cdx-demo-wrapper>
<template v-slot:demo>
	<label-with-description />
</template>
<template v-slot:code>

:::code-group

<<< @/../component-demos/label/examples/LabelWithDescription.vue [NPM]

<<< @/../component-demos/label/examples-mw/LabelWithDescription.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

<cdx-demo-wrapper>
<template v-slot:demo>
	<legend-with-description />
</template>
<template v-slot:code>

:::code-group

<<< @/../component-demos/label/examples/LegendWithDescription.vue [NPM]

<<< @/../component-demos/label/examples-mw/LegendWithDescription.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

<cdx-accordion>
<template #title>Developer notes</template>

Label outputs a `<label>` element by default. When the `isLegend` prop is set to `true`, it will
instead output a `<legend>` element. Use this within a `<fieldset>` element.

There is a named slot in the Label component, `description`, for including more information about
the field. It's important to note that, when `isLegend` is `true`, the description will be rendered
inside the `<legend>` element to ensure it will be read by assistive technology.

</cdx-accordion>

## Technical implementation

### Vue usage

### CSS-only version

#### Markup structure

Examples are shown with inputs to demonstrate the ARIA attributes required to connect the label and
input.

##### Label

Use a `<label>` element for a single input.

<cdx-demo-wrapper>
<template v-slot:demo>
	<!-- Outer element is a <div>. -->
	<div class="cdx-label">
		<!-- Label element. Include a `for` attribute to connect it with an input. -->
		<label class="cdx-label__label" for="cdx-demo-input-1">
			<!-- Label text. -->
			<span class="cdx-label__label__text">Label text</span>
			<!-- Optional flag. -->
			<span class="cdx-label__label__optional-flag"> (optional)</span>
		</label>
		<!-- Description. Include an `id` attribute so the input can have an `aria-describedby` attribute. -->
		<span id="cdx-demo-description-1" class="cdx-label__description">
			Short description text
		</span>
	</div>
	<!-- Input for demo purposes. -->
	<div class="cdx-text-input">
		<!-- Has `id` and `aria-describedby` attributes. -->
		<input id="cdx-demo-input-1" class="cdx-text-input__input" type="text" aria-describedby="cdx-demo-description-1" />
	</div>
</template>
<template v-slot:code>

```html
<!-- Outer element is a `<div>`. -->
<div class="cdx-label">
	<!-- Label element. Include a `for` attribute to connect it with an input. -->
	<label class="cdx-label__label" for="cdx-demo-input-1">
		<!-- Label text. -->
		<span class="cdx-label__label__text">Label text</span>
		<!-- Optional flag. -->
		<span class="cdx-label__label__optional-flag"> (optional)</span>
	</label>
	<!-- Description. Include an `id` attribute so the input can have an
	`aria-describedby` attribute. -->
	<span id="cdx-demo-description-1" class="cdx-label__description">
		Short description text
	</span>
</div>
<!-- Input for demo purposes. -->
<div class="cdx-text-input">
	<!-- Has `id` and `aria-describedby` attributes. -->
	<input id="cdx-demo-input-1" class="cdx-text-input__input" type="text" aria-describedby="cdx-demo-description-1" />
</div>
```

</template>
</cdx-demo-wrapper>

##### Legend

Inside a `<form>`, use a `<legend>` element within a `<fieldset>` for input groups.

When outputting a `<legend>` rather than a `<label>`, the markup of this component is quite
different:
- There is no wrapper `<div>`—`<legend>` must be a direct child of `<fieldset>`
- The description is included inside the `<legend>`
- The `for` and `aria-describedby` attributes are not needed

<cdx-demo-wrapper>
<template v-slot:demo>
	<!-- Note that the `cdx-field` class will remove browser `<fieldset>` styles. -->
	<fieldset class="cdx-field">
		<!-- Outer element is the <legend> element. -->
		<legend class="cdx-label">
			<!-- Wrapper span for the first line of text (legend text + optional flag). -->
			<span class="cdx-label__label">
				<!-- Legend text. -->
				<span class="cdx-label__label__text">Legend text</span>
				<!-- Optional flag. -->
				<span class="cdx-label__label__optional-flag"> (optional)</span>
			</span>
			<!-- Description text, which must be included inside the `<legend>` element. -->
			<span class="cdx-label__description">
				Short description text
			</span>
		</legend>
		<!-- Radio group for demo purposes. -->
		<div>
			<span class="cdx-radio">
				<input id="cdx-docs-radio-1" class="cdx-radio__input" type="radio" name="radio-legend-demo" checked/>
				<span class="cdx-radio__icon"></span>
				<label class="cdx-radio__label" for="cdx-docs-radio-1">Radio 1</label>
			</span>
			<span class="cdx-radio">
				<input id="cdx-docs-radio-2" class="cdx-radio__input" type="radio" name="radio-legend-demo" />
				<span class="cdx-radio__icon"></span>
				<label class="cdx-radio__label" for="cdx-docs-radio-2">Radio 2</label>
			</span>
		</div>
	</fieldset>
</template>
<template v-slot:code>

```html
<!-- Note that the `cdx-field` class will remove browser `<fieldset>` styles. -->
<fieldset class="cdx-field">
	<!-- Outer element is the `<legend>` element. -->
	<legend class="cdx-label">
		<!-- Wrapper span for the first line of text (legend text + optional flag). -->
		<span class="cdx-label__label">
			<!-- Legend text. -->
			<span class="cdx-label__label__text">Legend text</span>
			<!-- Optional flag. -->
			<span class="cdx-label__label__optional-flag"> (optional)</span>
		</span>
		<!-- Description text, which must be included inside the `<legend>` element. -->
		<span class="cdx-label__description">
			Short description text
		</span>
	</legend>
	<!-- Radio group for demo purposes. -->
	<div>
		<span class="cdx-radio">
			<input id="cdx-docs-radio-1" class="cdx-radio__input" type="radio" name="radio-legend-demo" checked/>
			<span class="cdx-radio__icon"></span>
			<label class="cdx-radio__label" for="cdx-docs-radio-1">Radio 1</label>
		</span>
		<span class="cdx-radio">
			<input id="cdx-docs-radio-2" class="cdx-radio__input" type="radio" name="radio-legend-demo" />
			<span class="cdx-radio__icon"></span>
			<label class="cdx-radio__label" for="cdx-docs-radio-2">Radio 2</label>
		</span>
	</div>
</fieldset>
```

</template>
</cdx-demo-wrapper>

#### With icon

To add an icon to the label:
- Add an empty `<span>` before the label text with the classes `.cdx-label__label__icon` and a
  custom class that you can target to add the CSS-only icon
- Apply the [CSS-only icon mixin](./icon.md#css-only-version) to that `<span>`

This works for `<label>` and `<legend>`.

<cdx-demo-wrapper>
<template v-slot:demo>
	<div class="cdx-label">
		<label class="cdx-label__label" for="cdx-demo-input-2">
			<span class="cdx-label__label__icon cdx-demo-css-icon--wiki-text"></span>
			<span class="cdx-label__label__text">Signature</span>
		</label>
		<span id="cdx-demo-description-2" class="cdx-label__description">
			Enter your signature using plain text or wikitext
		</span>
	</div>
	<div class="cdx-text-input">
		<input id="cdx-demo-input-2" class="cdx-text-input__input" type="text" aria-describedby="cdx-demo-description-2">
	</div>
</template>
<template v-slot:code>

```html
<div class="cdx-label">
	<label class="cdx-label__label" for="cdx-demo-input-2">
		<span class="cdx-label__label__icon cdx-demo-css-icon--wiki-text"></span>
		<span class="cdx-label__label__text">Signature</span>
	</label>
	<span id="cdx-demo-description-2" class="cdx-label__description">
		Enter your signature using plain text or wikitext
	</span>
</div>
<div class="cdx-text-input">
	<input id="cdx-demo-input-2" class="cdx-text-input__input" type="text" aria-describedby="cdx-demo-description-2">
</div>
```

:::code-group

```less [NPM]
// Note: you must import the design tokens before importing the css-icon mixin
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';
@import ( reference ) '@wikimedia/codex/mixins/css-icon.less';

.cdx-demo-css-icon--wiki-text {
	.cdx-mixin-css-icon( @cdx-icon-wikitext );
}
```

```less [MediaWiki]
@import 'mediawiki.skin.variables.less';

.cdx-demo-css-icon--wiki-text {
	.cdx-mixin-css-icon( @cdx-icon-wikitext );
}
```

:::

</template>
</cdx-demo-wrapper>

#### Visually-hidden

Occasionally, there may be a [use case](field.md#field-with-multiple-inputs) for the label to be
visually hidden. In these cases, it should still be present in the DOM with appropriate elements
and ARIA attributes.

To visually hide the label, add the `.cdx-label--visually-hidden` class to the outer element. This
works for `<label>` and `<legend>`.

<cdx-demo-wrapper>
<template v-slot:demo>
	<div class="cdx-label cdx-label--visually-hidden">
		<label class="cdx-label__label" for="cdx-demo-input-3">
			<span class="cdx-label__label__text">Field with invisible label</span>
		</label>
	</div>
	<div class="cdx-text-input">
		<input id="cdx-demo-input-3" class="cdx-text-input__input" type="text" placeholder="Do not actually use placeholders as labels!">
	</div>
</template>
<template v-slot:code>

```html
<div class="cdx-label cdx-label--visually-hidden">
	<label class="cdx-label__label" for="cdx-demo-input-3">
		<span class="cdx-label__label__text">Field with invisible label</span>
	</label>
</div>
<div class="cdx-text-input">
	<input id="cdx-demo-input-3" class="cdx-text-input__input" type="text" placeholder="Do not actually use placeholders as labels!">
</div>
```

</template>
</cdx-demo-wrapper>

#### Disabled

Add the `.cdx-label--disabled` class to the outer element to get disabled styles. This
works for `<label>` and `<legend>`.

<cdx-demo-wrapper>
<template v-slot:demo>
	<div class="cdx-label cdx-label--disabled">
		<label class="cdx-label__label" for="cdx-demo-input-4">
			<span class="cdx-label__label__text">Label text </span>
		</label>
	</div>
	<div class="cdx-text-input">
		<input id="cdx-demo-input-4" class="cdx-text-input__input" type="text" disabled />
	</div>
</template>
<template v-slot:code>

```html
<div class="cdx-label cdx-label--disabled">
	<label class="cdx-label__label" for="cdx-demo-input-4">
		<span class="cdx-label__label__text">Label text </span>
	</label>
</div>
<div class="cdx-text-input">
	<input id="cdx-demo-input-4" class="cdx-text-input__input" type="text" disabled />
</div>
```

</template>
</cdx-demo-wrapper>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';
@import ( reference ) '@wikimedia/codex/mixins/css-icon.less';

.cdx-demo-css-icon {
	&--wiki-text {
		.cdx-mixin-css-icon( @cdx-icon-wikitext );
	}
}
</style>

### Keyboard navigation

| Key | Function |
| -- | -- |
| <kbd>Enter</kbd> | If the focus is placed on one of the interactive elements within the Label, it activates them. |

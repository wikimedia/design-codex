<script setup>
import { ref } from 'vue';
import { CdxLabel, CdxTextInput } from '@wikimedia/codex';
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
		name: 'optionalFlag',
		type: 'text',
		initial: '(optional)'
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

A Label provides a descriptive title for a form input. Having labels is
essential when filling out a form, since each field is associated with its
label.

## Guidelines

### Using labels
The Label component will be placed above each form [Field](./field.md). An optional indicator, a
tooltip, and a description could also be included next to the label text.

### Specifications

![Specification of Label.](../../assets/components/label-specifications.svg)

Label is used within [Field](./field.md). It can also be used on its own for cases when the Field
component cannot or should not be used (e.g. to label a [SearchInput](./search-input.md)). The Label may include the following elements:
1. **Icon** (optional)<br>
A start icon can be included to visually enhance the label's context. This icon is fully customizable and any icon from the provided list can be used. Use a simple icon that is easily comprehensible to users.
2. **Label text**<br>
A clear and descriptive title for the form field that tells the user what information to enter.
3. **Field indicator** (optional)<br>
Subtle text indicating that the field associated with the label is not required.
4. **Description** (optional)<br>
Subtle descriptive text that provides additional information about the field.

The Label will be bold by default. However, it can be customized to regular weight when needed in specific cases:
- **Bold labels** should be used when grouping two or more form fields under a title with a larger text size. 
- **Regular labels** should be used when grouped under a title with the same text size as the form field label. This prevents hierarchy issues and ensures consistency.

Label and description can wrap onto multiple lines as needed, without strict length limits. However, it's best to keep them concise for better form readability. If the label spans multiple lines, the optional indicator will appear next to the last line of the label.

Refer to the [Label component in Codex Figma](https://www.figma.com/file/KoDuJMadWBXtsOtzGS4134/%E2%9D%96-Codex-components?type=design&node-id=10192-102686&mode=design&t=2O0ceqiRfqCtnidq-11).

### Interaction states
Label includes only two states:

![Interaction states of Label: default and disabled.](../../assets/components/label-interaction-states.svg)

1. Default
2. Disabled

### Best practices

Consider the following recommendations when using labels within form fields. For more detailed information about form fields, consult the guidelines for [constructing forms](../../style-guide/constructing-forms.md).

#### Usage

<cdx-demo-rules>

<template #do-media>

![Two examples where a Label is used within Fields.](../../assets/components/label-best-practices-usage-do.svg)

</template>

<template #do-text>

- Use the label as a title for any Field within a form.

</template>

<template #dont-media>

![Label being used on top of a ToggleButtonGroup.](../../assets/components/label-best-practices-usage-dont.svg)

</template>

<template #dont-text>

- Use the label component as a title for non-form items such as toggle buttons.
- Use labels as standalone elements on a page.

</template>

</cdx-demo-rules>

#### Icon

<cdx-demo-rules>

<template #do-media>

![Field using a start icon next to the Label.](../../assets/components/label-best-practices-icon-do.svg)

</template>

<template #do-text>

- Use a start icon next to the label to emphasize the required input in the form field.

</template>

<template #dont-media>

![Field featuring two icons: one positioned next to the label and the other inside the TextInput.](../../assets/components/label-best-practices-icon-dont.svg)

</template>

<template #dont-text>

- Use another icon in the label's section if the field already contains an icon.

</template>

</cdx-demo-rules>

#### Label and description

<cdx-demo-rules>

<template #do-media>

![Field with a short label and a lengthy description.](../../assets/components/label-best-practices-label-do.svg)

</template>

<template #do-text>

- Keep the Field’s label short, clear, and easy to scan. 
- Utilize the label’s description for additional information if needed.

</template>

<template #dont-media>

![Field with a lengthy label.](../../assets/components/label-best-practices-label-dont.svg)

</template>

<template #dont-text>

- Make the Field’s label text excessively large, which could make it difficult to scan.

</template>

</cdx-demo-rules>

#### Optional fields

<cdx-demo-rules>

<template #do-media>

![Two Fields: one featuring the "(optional)" indicator.](../../assets/components/label-best-practices-optional-do.svg)

</template>

<template #do-text>

- Only indicate the optional Fields in the form.
- Ensure that the entire word "optional" is displayed for translation purposes.

</template>

<template #dont-media>

![Two Fields: one required, marked with an asterisk, and an optional one indicated with "(opt)".](../../assets/components/label-best-practices-optional-dont.svg)

</template>

<template #dont-text>

- Mark required labels with an asterisk.
- Use abbreviations in the optional indicator.

</template>

</cdx-demo-rules>

#### Label style

<cdx-demo-rules>

<template #do-media>

![Fieldset with each field labeled as regular.](../../assets/components/label-best-practices-fieldset-do.svg)

</template>

<template #do-text>

- Customize the label of Fields to regular weight when grouped within a fieldset.

</template>

<template #dont-media>

![Fieldset with each field labeled as bold.](../../assets/components/label-best-practices-fieldset-dont.svg)

</template>

<template #dont-text>

- Avoid using bold labels in the Fields within a fieldset to maintain hierarchy and clarity.

</template>

</cdx-demo-rules>

## Demos

:::tip
You should consider using the [Field](./field.md) component, which includes the Label component and
handles accessibility features like ARIA attributes internally. If you need more custom behavior,
you can use the Label component on its own.
:::

### Configurable

<cdx-demo-wrapper :controls-config="controlsConfig" :show-generated-code="true">
<template v-slot:demo="{ propValues, slotValues }">
	<cdx-label v-bind="propValues">
		{{ slotValues.default }}
		<template #description>{{ slotValues.description }}</template>
	</cdx-label>
</template>
</cdx-demo-wrapper>

### Basic usage

When using the Label component with an input, make sure to add an `id` attribute to the input and
use that to set the `for` attribute on the label. These attributes will be applied on the proper
element within each component (in the example below, that's the `<label>` for the Label component,
and the `<input>` for the TextInput).

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

### Visually-hidden label

In rare instances, you may not need a visible label if it's very clear from context how to use an
input. To achieve this, you can use the Label component to create a semantic label for assistive
technology, but add the `visuallyHidden` prop to visually hide the label.

Note that this will hide the entire output of the component, including the description.

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

### With rich description text

You can include markup in the `description` slot. Only links and text formatting are recommended as
description text should be concise.

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

This component outputs a `<label>` element by default. When the `isLegend` prop is set to `true`,
it will instead output a `<legend>` element. Use this within a `<fieldset>` element.

There is a named slot in the Label component, `description`, for including more information about
the field. It's important to note that, when `isLegend` is true, the description will be rendered
inside the `<legend>` element to ensure it will be read by assistive technology.

Below are examples of a label and a legend with an associated description.

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

## Vue usage

## CSS-only version

### Markup structure

Examples are shown with inputs to demonstrate the ARIA attributes required to connect the label and
input.

#### Label

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
<!-- Outer element is a <div>. -->
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

#### Legend

Inside a `<form>`, use a `<legend>` element within a `<fieldset>` for input groups.

When outputting a `<legend>` rather than a `<label>`, the markup of this component is quite
different:
- There is no wrapper `<div>`—`<legend>` must be a direct child of `<fieldset>`
- The description is included inside the `<legend>`
- The `for` and `aria-describedby` attributes are not needed

<cdx-demo-wrapper>
<template v-slot:demo>
	<!-- Note that the `cdx-field` class will remove browser fieldset styles. -->
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
			<!-- Description text, which must be included inside the <legend> element. -->
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
<!-- Note that the `cdx-field` class will remove browser fieldset styles. -->
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
		<!-- Description text, which must be included inside the <legend> element. -->
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

### With icon

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
	.cdx-mixin-css-icon( @cdx-icon-wiki-text );
}
```

```less [MediaWiki]
@import 'mediawiki.skin.variables.less';

.cdx-demo-css-icon--wiki-text {
	.cdx-mixin-css-icon( @cdx-icon-wiki-text );
}
```

:::

</template>
</cdx-demo-wrapper>

### Visually hidden

Occasionally, there may be a [use case](field.md#complex-field-with-two-inputs) for the label to be
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
		.cdx-mixin-css-icon( @cdx-icon-wiki-text );
	}
}
</style>

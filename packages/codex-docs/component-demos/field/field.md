<script setup>
import { ref } from 'vue';
import { CdxField, CdxTextInput, CdxAccordion } from '@wikimedia/codex';
import FieldWithRichText from '@/../component-demos/field/examples/FieldWithRichText.vue';
import FieldWithValidation from '@/../component-demos/field/examples/FieldWithValidation.vue';
import FieldWithWarning from '@/../component-demos/field/examples/FieldWithWarning.vue';
import FieldWithSuccess from '@/../component-demos/field/examples/FieldWithSuccess.vue';
import FieldWithRadioGroup from '@/../component-demos/field/examples/FieldWithRadioGroup.vue';
import FieldWithTwoInputs from '@/../component-demos/field/examples/FieldWithTwoInputs.vue';
import FieldWithFields from '@/../component-demos/field/examples/FieldWithFields.vue';
import FieldWithCharacterCounter from '@/../component-demos/field/examples/FieldWithCharacterCounter.vue';

const inputValue = ref( '' );
const controlsConfig = [
	{
		name: 'labelIcon',
		type: 'icon'
	},
	{
		name: 'optional',
		type: 'boolean'
	},
	{
		name: 'hideLabel',
		type: 'boolean'
	},
	{
		name: 'isFieldset',
		type: 'boolean'
	},
	{
		name: 'disabled',
		type: 'boolean'
	},
	{
		name: 'status',
		type: 'radio',
		options: [ 'default', 'error', 'warning', 'success' ],
	},
	{
		name: 'label',
		type: 'slot',
		default: 'Label text'
	},
	{
		name: 'description',
		type: 'slot',
		default: 'Short description text'
	},
	{
		name: 'help-text',
		type: 'slot',
		default: 'Longer help text to explain how to use this field'
	}
];
// Object props aren't supported in the controls, so just hardcode an error message to show.
const messages = {
	error: 'Error message text',
	warning: 'Warning message text',
	success: 'Success message text'
}
</script>

A form field with a label, an input or control, and an optional validation message.

<cdx-demo-wrapper :controls-config="controlsConfig">
<template v-slot:demo="{ propValues, slotValues }">
	<cdx-field v-bind="{ messages, ...propValues }">
		<template #default>
			<cdx-text-input v-model="inputValue" placeholder="Placeholder text" />
		</template>
		<template #label>
			{{ slotValues.label }}
		</template>
		<template #description>
			{{ slotValues.description }}
		</template>
			<template #help-text>
			{{ slotValues[ 'help-text' ] }}
		</template>
	</cdx-field>
</template>
</cdx-demo-wrapper>

## Overview

### When to use Field

Use the Field component to create form layouts with a variety of form inputs, such as:
- TextInput and TextArea
- Select
- Combobox
- Checkbox, Radio groups, and ToggleSwitch
- ChipInput
- Lookup and MultiselectLookup

If you do not need to collect user input, do not use Field. For example, Field is not necessary to
display a SearchInput. Although SearchInput is built with a TextInput component, it triggers an
action and is not a form item.

### About Field

Field provides features for building a form field to collect user input. Field includes the following elements.

#### Label

A `label` serves as a precise and informative title for the form field, indicating the
type of information to be entered. Explore [Label](./label.md) to check its different properties.

<cdx-demo-best-practices>
<cdx-demo-best-practice>

Keep the Field’s label short, clear, and easy to scan. [*Consistent*](../../style-guide/writing-for-copy.html#is-this-consistent) & [*Clear*](../../style-guide/writing-for-copy.html#is-this-clear)

</cdx-demo-best-practice>

<cdx-demo-best-practice>Label text is bold by default, but the label of nested fields should use the regular font weight to make the hierarchy clear.</cdx-demo-best-practice>
<cdx-demo-best-practice>Use a start icon next to the label to emphasize the required input in the form field.</cdx-demo-best-practice>
<cdx-demo-best-practice type="dont">Avoid using an icon next to the label if the input already contains an icon.</cdx-demo-best-practice>
</cdx-demo-best-practices>

#### Optional indicator (optional)

Fields are assumed to be required by default. If a field is optional, it can be labeled as such.

<cdx-demo-best-practices>
<cdx-demo-best-practice>Only indicate the optional Fields in the form, ensuring that the entire word "optional" is displayed for translation purposes.</cdx-demo-best-practice>
<cdx-demo-best-practice type="dont">Don't mark required labels with an asterisk or use abbreviations in the optional indicator.</cdx-demo-best-practice>
</cdx-demo-best-practices>

#### Description (optional)

A description can also be added below the label to provide more information about it. This
description can include plain text and links.

#### Input(s)

The input element, or a group of inputs, where the user enters information. Field
can use any form input such as TextInput, Select, Checkbox, etc.

#### Placeholder (when applicable)

Labels indicate what the input should be. Placeholder text provides an example of what type of information is being requested in the input.

<cdx-demo-best-practices>
<cdx-demo-best-practice>

Placeholder text should further illustrate and support the label. [*Clear*](../../style-guide/writing-for-copy.html#is-this-clear)

</cdx-demo-best-practice>
<cdx-demo-best-practice type="dont">

Placeholder text should never replace the label nor be the input's only description. [*Accessible*](../../style-guide/writing-for-copy.html#is-this-accessible)

</cdx-demo-best-practice>
</cdx-demo-best-practices>

#### Help text (optional)

Help text provides supplementary information or instructions to guide users in completing the field
correctly. This text often clarifies formatting or indicates input restrictions. Help text can
include plain text and links.

<cdx-demo-best-practices>
<cdx-demo-best-practice>

Give clear information about input restrictions. [*Clear*](../../style-guide/writing-for-copy.html#is-this-clear) & [*Accessible*](../../style-guide/writing-for-copy.html#is-this-accessible)

</cdx-demo-best-practice>
</cdx-demo-best-practices>

#### Validation message

An inline validation message will appear to provide feedback about the status of the field.

## Examples

For more detailed information about form fields, consult the guidelines for [constructing forms](../../style-guide/constructing-forms.md).

### Validation messages

You can display a validation message based on the current status of the field.

<cdx-accordion separation="outline">

<template #title>Developer notes</template>

Set the `status` prop based on the field's validity, then pass in an object of `messages` keyed on
[validation status type](../types-and-constants.md#validationstatustype). If there is a message for
the current status, it will be displayed. Children of the Field component will automatically display
styles for that status.

Setting the status based on field validity is up to you. In the [error example](#error), it's
done as you're changing the input. You could also validate on
[blur](https://developer.mozilla.org/en-US/docs/Web/API/Element/blur_event) to give the user a
chance to finish filling out the field, as demonstrated in the [warning example](#warning) and the
[success example](#success).

</cdx-accordion>

#### Error

Try entering a username into the field below that's longer than a single character to trigger the
error state and error message.

<cdx-demo-best-practices>
<cdx-demo-best-practice>

Let a reader know exactly what to do to fix the issue. [*Relevant*](../../style-guide/writing-for-copy.html#is-this-relevant) & [*Trustworthy*](../../style-guide/writing-for-copy.html#is-this-trustworthy)

</cdx-demo-best-practice>
<cdx-demo-best-practice type="dont">

Don't give multiple options for fixing the issue. [*Concise*](../../style-guide/writing-for-copy.html#is-this-concise)

</cdx-demo-best-practice>
</cdx-demo-best-practices>

<cdx-demo-wrapper>
<template v-slot:demo>
	<field-with-validation />
</template>
<template v-slot:code>

:::code-group

<<< @/../component-demos/field/examples/FieldWithValidation.vue [NPM]

<<< @/../component-demos/field/examples-mw/FieldWithValidation.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

#### Warning

This example shows a warning message on blur if the username doesn't meet the criteria written in
the help text. Note that form inputs do not display a "warning" state.

<cdx-demo-best-practices>
<cdx-demo-best-practice>

Keep messages short and precise. [*Concise*](../../style-guide/writing-for-copy.html#is-this-concise) & [*Accessible*](../../style-guide/writing-for-copy.html#is-this-accessible)

</cdx-demo-best-practice>
<cdx-demo-best-practice type="dont">

Don't write in a way that might cause a reader to panic or worry. [*Trustworthy*](../../style-guide/writing-for-copy.html#is-this-trustworthy)

</cdx-demo-best-practice>
</cdx-demo-best-practices>

<cdx-demo-wrapper>
<template v-slot:demo>
	<field-with-warning />
</template>
<template v-slot:code>

:::code-group

<<< @/../component-demos/field/examples/FieldWithWarning.vue [NPM]

<<< @/../component-demos/field/examples-mw/FieldWithWarning.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

#### Success

This example shows a success message on blur when the username is unique. Note that form inputs do
not display a "success" state.

<cdx-demo-best-practices>
<cdx-demo-best-practice>

Use clear, positive, short messages. [*Accessible*](../../style-guide/writing-for-copy.html#is-this-accessible) & [*Concise*](../../style-guide/writing-for-copy.html#is-this-concise)

</cdx-demo-best-practice>
<cdx-demo-best-practice type="dont">

Don't include too much information. [*Relevant*](../../style-guide/writing-for-copy.html#is-this-relevant)

</cdx-demo-best-practice>
</cdx-demo-best-practices>

<cdx-demo-wrapper>
<template v-slot:demo>
	<field-with-success />
</template>
<template v-slot:code>

:::code-group

<<< @/../component-demos/field/examples/FieldWithSuccess.vue [NPM]

<<< @/../component-demos/field/examples-mw/FieldWithSuccess.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

### Fieldset with radio group

Groups of [Radio](./radio.md) or
[Checkbox](./checkbox.md) components are considered fieldsets.

<cdx-demo-best-practices>
<cdx-demo-best-practice>

Use a fieldset for groups of binary inputs.

</cdx-demo-best-practice>
</cdx-demo-best-practices>

<cdx-demo-wrapper>
<template v-slot:demo>
	<field-with-radio-group />
</template>
<template v-slot:code>

:::code-group

<<< @/../component-demos/field/examples/FieldWithRadioGroup.vue [NPM]

<<< @/../component-demos/field/examples-mw/FieldWithRadioGroup.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

<cdx-accordion>
<template #title>Developer notes</template>

For fieldsets, set the `isFieldset` prop to `true`. This will output a `<fieldset>` element with a
`<legend>` instead of a label.

</cdx-accordion>

### Field with multiple inputs

The following example is a fieldset with two inputs that depend on one another. Each input needs its
own individual label, but in this case, the individual labels can be visually-hidden.

<cdx-demo-best-practices>
<cdx-demo-best-practice>Use a fieldset for any field that contains multiple inputs or controls that depend on one another to form a single meaningful value or dataset.</cdx-demo-best-practice>
<cdx-demo-best-practice type="dont">Don't use a fieldset to group separate inputs or for layout purposes.</cdx-demo-best-practice>
</cdx-demo-best-practices>

<cdx-demo-wrapper>
<template v-slot:demo>
	<field-with-two-inputs />
</template>
<template v-slot:code>

:::code-group

<<< @/../component-demos/field/examples/FieldWithTwoInputs.vue [NPM]

<<< @/../component-demos/field/examples-mw/FieldWithTwoInputs.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

<cdx-accordion>
<template #title>Developer notes</template>

In the example below, the labels for the individual TextInput and Select components are included in
two different ways:

- For the TextInput, the [Label](./label.md) component is used with `hideLabel` set to `true`.
- For the Select, an `aria-label` is applied.

Note: when you enter erroneous data in the TextInput below, error styles for both the TextInput
and the Select will display since they are both contained in a single Field. If you need to show
separate states for each input, refer to the [nested Fields example](#fieldset-with-nested-fields)
below.

</cdx-accordion>

### Fieldset with nested Fields

Nest Fields within a Field when each input needs its own visible label, description, validation
status, and validation message.

<cdx-demo-best-practices>
<cdx-demo-best-practice>Use a fieldset to group Fields that depend on one another to form a single meaningful value or dataset.</cdx-demo-best-practice>
<cdx-demo-best-practice type="dont">Don't use a fieldset to group separate Fields or for layout purposes.</cdx-demo-best-practice>
</cdx-demo-best-practices>

<cdx-demo-wrapper>
<template v-slot:demo>
	<field-with-fields />
</template>
<template v-slot:code>

:::code-group

<<< @/../component-demos/field/examples/FieldWithFields.vue [NPM]

<<< @/../component-demos/field/examples-mw/FieldWithFields.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

<cdx-accordion>
<template #title>Developer notes</template>

This is a fieldset, so set `isFieldset` to `true`.

Note that each sub-field has its own status. This enables you to show error styles only for the
input that contains the error, not the entire fieldset.

Nested fields will become disabled when their parent field is disabled.

</cdx-accordion>

### Custom help text content

The `help-text` slot can contain markup, including other components and dynamic text. This is an
example of a custom character counter embedded inside a Field.

<cdx-demo-best-practices>
<cdx-demo-best-practice>Use a character counter only when it's necessary to limit the number of characters in a form input.</cdx-demo-best-practice>
<cdx-demo-best-practice>Display an inline error message if the character limit is exceeded.</cdx-demo-best-practice>
</cdx-demo-best-practices>

<cdx-demo-wrapper>
<template v-slot:demo>
	<field-with-character-counter />
</template>
<template v-slot:code>

:::code-group

<<< @/../component-demos/field/examples/FieldWithCharacterCounter.vue [NPM]

<<< @/../component-demos/field/examples-mw/FieldWithCharacterCounter.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

## Technical implementation

### Vue usage

This component can wrap the following:
- A single form input or control
- An input group (e.g. a group of Radios or Checkboxes)
- A set of nested fields (inputs wrapped in their own Field components).

The following Codex components can be used inside the Field component:
- Checkbox
- ChipInput
- Combobox
- Lookup
- MultiselectLookup
- Radio
- SearchInput
- Select
- TextArea
- TextInput
- ToggleSwitch

### CSS-only version

Refer to the [CSS-only Label docs](./label.md#css-only-version) for instructions on making the label
visually-hidden or adding a label icon.

#### Markup structure

##### Single input

<cdx-demo-wrapper>
<template v-slot:demo>
	<!-- Outer element is a <div>. -->
	<div class="cdx-field">
		<!-- Label. -->
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
		<!-- Input/control wrapper. -->
		<div class="cdx-field__control">
			<!-- Input or control. -->
			<div class="cdx-text-input">
				<!-- Has `id` and `aria-describedby` attributes. -->
				<input id="cdx-demo-input-1" class="cdx-text-input__input" type="text" aria-describedby="cdx-demo-description-1" />
			</div>
		</div>
	</div>
</template>
<template v-slot:code>

```html
<!-- Outer element is a <div>. -->
<div class="cdx-field">
	<!-- Label. -->
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
	<!-- Input/control wrapper. -->
	<div class="cdx-field__control">
		<!-- Input or control. -->
		<div class="cdx-text-input">
			<!-- Has `id` and `aria-describedby` attributes. -->
			<input id="cdx-demo-input-1" class="cdx-text-input__input" type="text" aria-describedby="cdx-demo-description-1" />
		</div>
	</div>
</div>
```

</template>
</cdx-demo-wrapper>

##### Fieldset

Inside a `<form>`, use a `<fieldset>` element for input groups.

When outputting a `<fieldset>`, the markup of this component is quite different:
- The outer element is the `<fieldset>` instead of a `<div>`
- A `<legend>` is used instead of a `<label>`. Refer to the docs on the [CSS-only Label](./label.md#css-only-version)
  for more info.
- The description is included inside the `<legend>`
- The `for` and `aria-describedby` attributes are not needed

<cdx-demo-wrapper>
<template v-slot:demo>
	<!-- Outer element is the <fieldset>. -->
	<fieldset class="cdx-field">
		<!-- Legend. -->
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
		<!-- Input/control wrapper. -->
		<div class="cdx-field__control">
			<div class="cdx-radio">
				<div class="cdx-radio__wrapper">
					<input id="cdx-docs-radio-1" class="cdx-radio__input" type="radio" name="radio-legend-demo" checked/>
					<span class="cdx-radio__icon"></span>
					<label class="cdx-radio__label" for="cdx-docs-radio-1">Radio 1</label>
				</div>
			</div>
			<div class="cdx-radio">
				<div class="cdx-radio__wrapper">
					<input id="cdx-docs-radio-2" class="cdx-radio__input" type="radio" name="radio-legend-demo" />
					<span class="cdx-radio__icon"></span>
					<label class="cdx-radio__label" for="cdx-docs-radio-2">Radio 2</label>
				</div>
			</div>
		</div>
		<div class="cdx-field__help-text">
			Help text with additional instructions
		</div>
	</fieldset>
</template>
<template v-slot:code>

```html
<!-- Outer element is the <fieldset>. -->
<fieldset class="cdx-field">
	<!-- Legend. -->
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
	<!-- Input/control wrapper. -->
	<div class="cdx-field__control">
		<div class="cdx-radio">
			<div class="cdx-radio__wrapper">
				<input id="cdx-docs-radio-1" class="cdx-radio__input" type="radio" name="radio-legend-demo" checked/>
				<span class="cdx-radio__icon"></span>
				<label class="cdx-radio__label" for="cdx-docs-radio-1">Radio 1</label>
			</div>
		</div>
		<div class="cdx-radio">
			<div class="cdx-radio__wrapper">
				<input id="cdx-docs-radio-2" class="cdx-radio__input" type="radio" name="radio-legend-demo" />
				<span class="cdx-radio__icon"></span>
				<label class="cdx-radio__label" for="cdx-docs-radio-2">Radio 2</label>
			</div>
		</div>
	</div>
	<!-- Help text. -->
	<div class="cdx-field__help-text">
		Help text with additional instructions
	</div>
</fieldset>
```

</template>
</cdx-demo-wrapper>

#### Disabled

To display a disabled field:
- Add the `.cdx-field--disabled` class to the outer element
- Add the `.cdx-label--disabled` class to the `.cdx-label` element
- Disable the input(s) or control(s) (in the example below, the `disabled` attribute is added to the
  `<input>` element)

This works with single fields and fieldsets.

<cdx-demo-wrapper>
<template v-slot:demo>
	<div class="cdx-field cdx-field--disabled">
		<div class="cdx-label cdx-label--disabled">
			<label class="cdx-label__label" for="cdx-demo-input-3">
				<span class="cdx-label__label__text">Label text</span>
			</label>
		</div>
		<div class="cdx-field__control">
			<div class="cdx-text-input">
				<input id="cdx-demo-input-3" class="cdx-text-input__input" type="text" disabled />
			</div>
		</div>
	</div>
</template>
<template v-slot:code>

```html
<div class="cdx-field cdx-field--disabled">
	<div class="cdx-label cdx-label--disabled">
		<label class="cdx-label__label" for="cdx-demo-input-3">
			<span class="cdx-label__label__text">Label text</span>
		</label>
	</div>
	<div class="cdx-field__control">
		<div class="cdx-text-input">
			<input id="cdx-demo-input-3" class="cdx-text-input__input" type="text" disabled />
		</div>
	</div>
</div>
```

</template>
</cdx-demo-wrapper>

#### Error status and message

To display error styles and show an error message:
- Apply error styles to the input (in the example below, the `.cdx-text-input--status-error` class
  is applied to the text input wrapper)
- Add the validation message below the control wrapper

<cdx-demo-wrapper>
<template v-slot:demo>
	<div class="cdx-field">
		<div class="cdx-label">
			<label class="cdx-label__label" for="cdx-demo-input-3">
				<span class="cdx-label__label__text">Label text</span>
			</label>
		</div>
		<div class="cdx-field__control">
			<div class="cdx-text-input cdx-text-input--status-error">
				<input id="cdx-demo-input-3" class="cdx-text-input__input" type="text" />
			</div>
		</div>
		<div class="cdx-field__validation-message">
			<div class="cdx-message cdx-message--inline cdx-message--error" role="alert">
				<span class="cdx-message__icon"></span>
				<div class="cdx-message__content">Error message text</div>
			</div>
		</div>
	</div>
</template>
<template v-slot:code>

```html
<div class="cdx-field">
	<div class="cdx-label">
		<label class="cdx-label__label" for="cdx-demo-input-3">
			<span class="cdx-label__label__text">Label text</span>
		</label>
	</div>
	<div class="cdx-field__control">
		<div class="cdx-text-input cdx-text-input--status-error">
			<input id="cdx-demo-input-3" class="cdx-text-input__input" type="text" />
		</div>
	</div>
	<div class="cdx-field__validation-message">
		<div class="cdx-message cdx-message--inline cdx-message--error" role="alert">
			<span class="cdx-message__icon"></span>
			<div class="cdx-message__content">Error message text</div>
		</div>
	</div>
</div>
```

</template>
</cdx-demo-wrapper>

### Keyboard navigation

| Key | Function |
| -- | -- |
| <kbd>Tab</kbd> | It moves the focus to the next interactive element in tab order. |
| <kbd>Shift</kbd> + <kbd>Tab</kbd> | It moves the focus to the previous interactive element. |
| <kbd>Enter</kbd> | If the focus is placed on one of the interactive elements within the Field, it activates them. |

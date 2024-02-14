<script setup>
import { ref } from 'vue';
import { CdxField, CdxTextInput } from '@wikimedia/codex';
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
		name: 'optionalFlag',
		type: 'text',
		initial: '(optional)'
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

## Guidelines

### Using fields
Field provides features for building an accessible, understandable form field to
collect user input.

![Example of a Codex Field with different field items: with a text input, with a select, and with a checkbox group.](../../assets/components/field-using.svg)

Use the Field component to create form layouts and to create a variety of form
inputs, such as text inputs, selects, radio buttons, checkboxes or toggle
switches.

If you do not need to collect user input, do not use Field. For example, Field
is not necessary to display a search input. Although search is built with a text
input component, it triggers an action and is not a form item.

### Specifications

![Specification of Field.](../../assets/components/field-specifications.svg)

It is composed of the following elements:
1. **Label**<br>A label serves as a precise and informative title for the form field, indicating the
type of information to be entered. It can also incorporate a description. Explore [Label](./label.md) to check the different label properties.
2. **Field**<br>The input element, or a group of inputs,  where the user enters information. Field
can use any form item such as text input, select, checkbox, etc.
3. **Helper text** (optional)<br>Text that provides additional information related to the field.
4. **Validation message**<br>An inline validation message will appear to provide feedback about the
status of the field. For example, to provide an error message to the user when the field contains
one or more errors.

Refer to the [Field component in Codex Figma](https://www.figma.com/file/KoDuJMadWBXtsOtzGS4134/%E2%9D%96-Codex-components?type=design&node-id=10193-109478&mode=design&t=2O0ceqiRfqCtnidq-11).

### Types
The Field component's control can be any form item component designed to gather user input, including:
- Text input and text area
- Select
- Combobox
- Checkbox, radio groups, and toggle switch
- Chip input
- Lookup

However, components not intended for collecting user input, such as SearchInput,
should not be used within Field.

![Types of Fields based on its field content: with a text
input, with a select, with a combobox, with a checkbox group, with a radio group, and with a
toggle switch group.](../../assets/components/field-types-field.svg)

A complex field may comprise multiple inputs, each accompanied by an individual label that can be
visually concealed.

![A Field component with two field items.](../../assets/components/field-types-two-fields.svg)

The helper text slot can include plain text with or without links.

![A Field component with a helper text including a link.](../../assets/components/field-types-helper.svg)

When combining the Field component with TextArea, you can use a custom character counter within the
helper text section. For non-TextArea items like TextInput, character counters are not used, as they
are not relevant for shorter inputs.

The character counter counts down as the user types, turning into an error state when the character
limit is exceeded. It displays the number of exceeded characters as negative numbers along with an
inline error message, informing the user that the entered message or text is too long.

![Example of a Field with a text area and characters counter.](../../assets/components/field-types-character-counter.svg)

### Interaction states
Form fields have the following visually separate states:

![Interaction states of the Field component: default, hover on field, focus field, filled field, disabled, read-only field, error, warning and success.](../../assets/components/field-interaction-states.svg)

<div class="cdx-docs-multi-column cdx-docs-multi-columns-2">

1. Default
2. Hover on field item
3. Focused field item
4. Filled field item
5. Disabled
6. Read-only
7. Error
8. Warning
9. Success

</div>

The interactive states will exclusively impact the field item within Field.
Hover, focus, filled, and read-only states apply solely to the field item (e.g.
the text input).

### Content

Form elements should guide the user to fill out the form easily. They will prevent the user from making mistakes.

#### Label and placeholder

Labels indicate what the input should be. Placeholders act as sample text for the kind of content the user needs to input. Different browsers handle placeholder text differently, and some have trouble displaying translations of placeholders. Use placeholders as helpful additions, but do not rely on them too heavily.

<cdx-demo-rules>
<template #do-media>

![A screenshot of interface inputs conveying an example of helpful labels and placeholder text.](../../assets/components/label-placeholder-content-do.svg)

</template>
<template #do-text>

- Make the label short, clear, and easy to scan. [*Consistent*](../../style-guide/writing-for-copy.html#is-this-consistent) & [*Clear*](../../style-guide/writing-for-copy.html#is-this-clear)
- Provide more context in the placeholder for what's indicated in the label. [*Clear*](../../style-guide/writing-for-copy.html#is-this-clear)

</template>
<template #dont-media>

![A screenshot of interface inputs conveying an example of repetitive and redundant labels and placeholder text.](../../assets/components/label-placeholder-content-dont.svg)

</template>
<template #dont-text>

- Leave out the label in favor of just a placeholder. [*Needed*](../../style-guide/writing-for-copy.html#is-this-needed) & [*Translatable*](../../style-guide/writing-for-copy.html#is-this-translatable)
- Repeat in the placeholder what’s in the label. [*Concise*](../../style-guide/writing-for-copy.html#is-this-concise)

</template>
</cdx-demo-rules>

#### Helper text

Helper text gives a user guidance on how to fill in the form field. These messages often clarify formatting or indicate character restrictions. Giving users appropriate context helps them to quickly and efficiently enter the input without errors.

<cdx-demo-rules>
<template #do-media>

![A screenshot of interface inputs conveying an example of helpful and concise helper text.](../../assets/components/helper-text-content-do.svg)

</template>
<template #do-text>

- Give clear information about input restrictions. [*Clear*](../../style-guide/writing-for-copy.html#is-this-clear) & [*Accessible*](../../style-guide/writing-for-copy.html#is-this-accessible)

</template>
<template #dont-media>

![A screenshot of interface inputs conveying an example of unnecessarily long helper text.](../../assets/components/helper-text-content-dont.svg)

</template>
<template #dont-text>

- List too many restrictions or use overly technical and robotic language. [*Relevant*](../../style-guide/writing-for-copy.html#is-this-relevant)

</template>
</cdx-demo-rules>

#### Inline error

These are short, simple contextual messages that allow the user to quickly understand how to fix the error they just made.

<cdx-demo-rules>
<template #do-media>

![A screenshot of interface inputs conveying an example of helpful and useful inline error text.](../../assets/components/inline-error-content-do.svg)

</template>
<template #do-text>

- Let a reader know exactly what to do to fix the issue. [*Relevant*](../../style-guide/writing-for-copy.html#is-this-relevant) & [*Trustworthy*](../../style-guide/writing-for-copy.html#is-this-trustworthy)

</template>
<template #dont-media>

![A screenshot of interface inputs conveying an example of inline error text without any instruction to correct the error.](../../assets/components/inline-error-content-dont.svg)

</template>
<template #dont-text>

- State the error without offering a way to correct it. [*Relevant*](../../style-guide/writing-for-copy.html#is-this-relevant) & [*Trustworthy*](../../style-guide/writing-for-copy.html#is-this-trustworthy)

</template>
</cdx-demo-rules>

## Demos

### Configurable

Note that this configurable demo is only shown with a TextInput inside the Field. See the demos
below for use of the Field component with other types of inputs or groups of inputs, along with
code samples.

See the [validation and error state demo](#with-validation-and-error-state) below for more
information about how to add and customize an error message.

<cdx-demo-wrapper :controls-config="controlsConfig">
<template v-slot:demo="{ propValues, slotValues }">
	<cdx-field v-bind="{ messages, ...propValues }">
		<template #default>
			<cdx-text-input v-model="inputValue" />
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


### With rich description and help text

You can include markup in the `description` and `help-text` slots. Only links and text formatting
are recommended as description and help text should be concise.

<cdx-demo-wrapper :allow-link-styles="true">
<template v-slot:demo>
	<field-with-rich-text />
</template>
<template v-slot:code>

:::code-group

<<< @/../component-demos/field/examples/FieldWithRichText.vue [NPM]

<<< @/../component-demos/field/examples-mw/FieldWithRichText.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

### With validation messages

You can display a validation message based on the current status of the field.
Set the `status` prop based on the field's validity, then pass in an object of
`messages` keyed on [validation status
type](../types-and-constants.md#validationstatustype).  If there is a message
for the current status, it will be displayed.

The `status` you bind to the Field component will also be passed down to its child components, which
will display appropriate styles for that status if they exist (e.g. a red border in the error
state). You do not need to bind the `status` prop to the child input components. Note that form
input components currently only have special styles for the `error` status.

Setting the status based on field validity is up to you. In the [error example](#error) below, it's done as you're changing the input. You could also validate on [blur](https://developer.mozilla.org/en-US/docs/Web/API/Element/blur_event)
to give the user a chance to finish filling out the field, as demonstrated in the
[warning example](#warning) and the [success example](#success).

#### Error

The `error` status can be used both to show an error message and to display the error state of the
form input. Try entering a username into the field below that's longer than a single character to
see the error state and error message.

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

The following example shows a warning message on blur if the username doesn't meet the criteria
written in the help text. In this case, the username will be corrected to meet the criteria, and
the message informs the user of this change. Note that form inputs do not display a "warning" state.

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

The following example shows a success message on blur when the username is unique. Note that form
inputs do not display a "success" state.

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

For any field that contains multiple inputs or controls, set the `isFieldset` prop to `true`. This
will output a `<fieldset>` element with a `<legend>` instead of a label.

Groups of [Radio](./radio.md) or [Checkbox](./checkbox.md) components are considered fieldsets.

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

### Complex field with two inputs

The field below has two inputs, a TextInput and a Select. In addition to the field-level label, each
input needs its own individual label. In this case, the individual labels can be visually hidden.
In the example below, the labels are included in two different ways:

- For the TextInput, the [Label](./label.md) component is used with `hideLabel` set to `true`
- For the Select, an `aria-label` is applied

To give the user a chance to type a valid coordinate location, this example doesn't validate as the
user types, but delays validation until the input is blurred. For an example of how to do validation
as the user types, see the [validation and error state example](#with-validation-and-error-state)
above.

Note that, when you enter erroneous data in the TextInput below, error styles for both the TextInput
and the Select will display since they are both contained in a single Field. If you need to show
separate states for each input, see the [nested Fields example](#fieldset-with-nested-fields) below.

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

### Fieldset with nested Fields

In this example, each input within the field needs its own visible label, description, validation
status, and validation message. To accomplish this, each input is wrapped in a Field component.
The entire field is wrapped in a top-level Field component with `isFieldset` set to `true`.

Note that each sub-field has its own status. This enables you to show error styles only for the
input that contains the error, not the entire fieldset.

Nested fields will become disabled when their parent field is disabled.

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

### Fieldset with custom help text content

The `help-text` slot is not limited to static text – more complex markup,
including other components and bound values, can be provided here as well. Below
is an example of a custom character counter embedded inside a Field. The counter
is bound to the `modelValue` of the TextArea component inside the Field, and an
error message is displayed if this text exceeds the maximum allowed number of
characters.

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

## Vue usage

This component can wrap the following:
- A single form input or control
- An input group (e.g. a group of Radios or Checkboxes)
- A set of nested fields (inputs wrapped in their own Field components).

The following Codex components can be used inside the Field component:
- Checkbox
- ChipInput
- Combobox
- Lookup
- Radio
- SearchInput
- Select
- TextArea
- TextInput
- ToggleSwitch

### CSS-only version

See the [CSS-only Label docs](./label.md#css-only-version) for instructions on making the label
visually-hidden or adding a label icon.

### Markup structure

#### Single input

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

#### Fieldset

Inside a `<form>`, use a `<fieldset>` element for input groups.

When outputting a `<fieldset>`, the markup of this component is quite different:
- The outer element is the `<fieldset>` instead of a `<div>`
- A `<legend>` is used instead of a `<label>`. See docs on the [CSS-only Label](./label.md#css-only-version)
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

### With help text

To add help text below the input or control:
- Add the `.cdx-field__control--has-help-text` class to the control wrapper
- Add a `<div>` below the control wrapper with the class `.cdx-field__help-text`

This works with single fields and fieldsets.

<cdx-demo-wrapper :allow-link-styles="true">
<template v-slot:demo>
	<div class="cdx-field">
		<div class="cdx-label">
			<label class="cdx-label__label" for="cdx-demo-input-2">
				<span class="cdx-label__label__text">Input type</span>
			</label>
			<span id="cdx-demo-description-2" class="cdx-label__description">
				<a href="https://wikifunctions.beta.wmflabs.org/wiki/Wikifunctions:Main_Page">Wikifunctions</a> input type
			</span>
		</div>
		<div class="cdx-field__control cdx-field__control--has-help-text">
			<select class="cdx-select">
				<option value="">Choose an option</option>
				<option value="boolean">boolean</option>
				<option value="function">function</option>
				<option value="object">object</option>
				<option value="string">string</option>
			</select>
		</div>
		<div class="cdx-field__help-text">
			What kind of data does the function accept? See <a href="https://wikifunctions.beta.wmflabs.org/wiki/Special:ListObjectsByType/Z4">list of input types</a>.
		</div>
	</div>
</template>
<template v-slot:code>

```html
<div class="cdx-field">
	<div class="cdx-label">
		<label class="cdx-label__label" for="cdx-demo-input-2">
			<span class="cdx-label__label__text">Input type</span>
		</label>
		<span id="cdx-demo-description-2" class="cdx-label__description">
			<a href="https://wikifunctions.beta.wmflabs.org/wiki/Wikifunctions:Main_Page">Wikifunctions</a> input type
		</span>
	</div>
	<div class="cdx-field__control cdx-field__control--has-help-text">
		<select class="cdx-select">
			<option value="">Choose an option</option>
			<option value="boolean">boolean</option>
			<option value="function">function</option>
			<option value="object">object</option>
			<option value="string">string</option>
		</select>
	</div>
	<div class="cdx-field__help-text">
		What kind of data does the function accept? See <a href="https://wikifunctions.beta.wmflabs.org/wiki/Special:ListObjectsByType/Z4">list of input types</a>.
	</div>
</div>
```

</template>
</cdx-demo-wrapper>

### Disabled

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

### Error status and message

To display error styles and show an error message:
- Add the `.cdx-field--status-error` class to the outer element
- Apply error styles to the input (in the example below, the `.cdx-text-input--status-error` class
  is applied to the text input wrapper)
- Add the validation message below the control wrapper

<cdx-demo-wrapper>
<template v-slot:demo>
	<div class="cdx-field cdx-field--status-error">
		<div class="cdx-label">
			<label class="cdx-label__label" for="cdx-demo-input-3">
				<span class="cdx-label__label__text">Label text</span>
			</label>
		</div>
		<div class="cdx-field__control cdx-field__control--has-help-text">
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
<div class="cdx-field cdx-field--status-error">
	<div class="cdx-label">
		<label class="cdx-label__label" for="cdx-demo-input-3">
			<span class="cdx-label__label__text">Label text</span>
		</label>
	</div>
	<div class="cdx-field__control cdx-field__control--has-help-text">
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

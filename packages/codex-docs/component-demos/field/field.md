<script setup>
import { ref } from 'vue';
import { CdxField, CdxTextInput } from '@wikimedia/codex';
import FieldWithRichText from '@/../component-demos/field/examples/FieldWithRichText.vue';
import FieldWithValidation from '@/../component-demos/field/examples/FieldWithValidation.vue';
import FieldWithRadioGroup from '@/../component-demos/field/examples/FieldWithRadioGroup.vue';
import FieldWithTwoInputs from '@/../component-demos/field/examples/FieldWithTwoInputs.vue';
import FieldWithFields from '@/../component-demos/field/examples/FieldWithFields.vue';

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
		options: [ 'default', 'error' ],
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
	error: 'Error message text'
}
</script>

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

### With validation and error state

You can display a validation message based on the current status of the field. Set the `status` prop
based on the field's validity, then pass in an object of `messages` keyed on [validation status type](../types-and-constants.md#validationstatustype). If there is a message for the current status, it will be displayed.

The `status` you bind to the Field component will also be passed down to its child components, which
will display appropriate styles for that status (e.g. a red border in the error state). You do not
need to bind the `status` prop to the child input components.

Setting the status based on field validity is up to you. In the example below, it's done as you're
changing the input. You could also validate on [blur](https://developer.mozilla.org/en-US/docs/Web/API/Element/blur_event)
to give the user a chance to finish filling out the field.

Try entering a username into the field below that's longer than a single character to see the error
state and error message.

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

### Fieldsets

For any field that contains multiple inputs or controls, set the `isFieldset` prop to `true`. This
will output a `<fieldset>` element with a `<legend>` instead of a label. Below are some examples of
fieldsets.

#### Radio group

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

#### Complex field with two inputs

The field below has two inputs, a TextInput and a Select. In addition to the field-level label, each
input needs its own individual label. In this case, the individual labels can be visually hidden.
In the example below, the labels are included in two different ways:

- For the TextInput, the [Label](./label.md) component is used with `hideLabel` set to `true`
- For the Select, an `aria-label` is applied

Note that, when you enter erroneous data in the TextInput below, error styles for both the TextInput
and the Select will display since they are both contained in a single Field. If you need to show
separate states for each input, see the nested Fields example below.

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

#### Fieldset with nested Fields

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

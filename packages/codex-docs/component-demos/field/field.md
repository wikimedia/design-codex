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

<<< @/../component-demos/field/examples/FieldWithRichText.vue

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

<<< @/../component-demos/field/examples/FieldWithValidation.vue

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

<<< @/../component-demos/field/examples/FieldWithRadioGroup.vue

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

<<< @/../component-demos/field/examples/FieldWithTwoInputs.vue

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

<<< @/../component-demos/field/examples/FieldWithFields.vue

</template>
</cdx-demo-wrapper>
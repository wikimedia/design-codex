<script setup>
import { ref } from 'vue';
import { CdxChipInput } from '@wikimedia/codex';
import ChipInputConfigurable from '@/../component-demos/chip-input/examples/ChipInputConfigurable.vue';
import ChipInputBasic from '@/../component-demos/chip-input/examples/ChipInputBasic.vue';
import ChipInputWithIcons from '@/../component-demos/chip-input/examples/ChipInputWithIcons.vue';
import ChipInputWithPlaceholder from '@/../component-demos/chip-input/examples/ChipInputWithPlaceholder.vue';
import ChipInputDisabled from '@/../component-demos/chip-input/examples/ChipInputDisabled.vue';
import ChipInputField from '@/../component-demos/chip-input/examples/ChipInputField.vue';

const controlsConfig = [
	{
		name: 'chipAriaDescription',
		type: 'text',
		default: 'Press Enter to edit or Delete to remove'
	},
	{
		name: 'separateInput',
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
	}
];
</script>

A ChipInput allows users to create chips to filter content or make selections.
Chips are created by typing characters or words and pressing the <kbd>Enter</kbd> key.

## Guidelines

### Using chip inputs

The ChipInput component utilizes a [TextInput](./text-input.html), enabling users to filter information by typing text that transforms into a chip. These chips can be edited by clicking directly on them or removed by interacting with the embedded remove button within each chip.

Use the ChipInput when users need to simplify a complex filtering process or when they need to edit the filters applied there.

Avoid using ChipInput if the filtering process is simple and doesn't require custom edits. In case you need to select static options that don't require editing, consider using a [Checkbox](./checkbox.html) group instead.

![Example of a Codex ChipInput with two chips within the input.](../../assets/components/chip-input-using.svg)

### Specifications

![Specification of ChipInput.](../../assets/components/chip-input-specifications.svg)

ChipInputs include the following items:
1. **TextInput**<br>The user can type letters or words within this input to create the chips and filter the information.
2. **Chip or chips**<br>The chip or chips created are stacked next to each other, and they are editable and can be removed.

Refer to the [ChipInput component in Codex Figma](https://www.figma.com/file/KoDuJMadWBXtsOtzGS4134/%E2%9D%96-Codex-components?type=design&node-id=10650-146265&mode=design&t=2O0ceqiRfqCtnidq-11).

### Types
Depending on the placement of the chips, there are two types of ChipInput:

1. **Chips within the input field**<br>In this case, when the chips are created they are placed next to the input’s placeholder text, and they are stacked next to each other.
2. **Chips separated from the input field**<br>In this case, the chips are placed in a light gray box above the input field once they are created.

![Chip input type based on chip placement: chips within the input or chips separated from the input.](../../assets/components/chip-input-types.svg)

### Interaction states

ChipInput has the following visually separate states:

![Interaction states of ChipInput: default, hover on input, focus-active, filled, disabled, hover on chip’s remove button, error default, error focus, error filled, hover on editable chip,focus on editable chip and chip being edited.
](../../assets/components/chip-input-interaction-states.svg)

1. Default
2. Hover on input
3. Focus or active
4. Filled
5. Disabled
6. Hover on chip’s remove button
7. Error default
8. Error focus
9. Error filled
10. Hover on editable chip
11. Focused editable chip
12. Editing the chip

## Demos

### Configurable

<cdx-demo-wrapper :controls-config="controlsConfig">
<template v-slot:demo="{ propValues }">
	<chip-input-configurable v-bind="propValues" />
</template>
</cdx-demo-wrapper>

### Basic Usage

Pass an array of chip data to the input using `v-model:input-chips`. When the user adds or
removes a chip, the array will automatically be updated.

Text for the `aria-label` of each chip's "remove" button is a required prop.

<cdx-demo-wrapper :force-reset="true">
<template v-slot:demo>
	<chip-input-basic />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/chip-input/examples/ChipInputBasic.vue [NPM]

<<< @/../component-demos/chip-input/examples-mw/ChipInputBasic.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

### With icons

Chips added by the user cannot be added with icons, but icons can be included in chips
provided by the parent component.

<cdx-demo-wrapper :force-reset="true">
<template v-slot:demo>
	<chip-input-with-icons />
</template>
<template v-slot:code>

:::code-group

<<< @/../component-demos/chip-input/examples/ChipInputWithIcons.vue [NPM]

<<< @/../component-demos/chip-input/examples-mw/ChipInputWithIcons.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

### With placeholder

Placeholder and other attributes of the `<input>` element can be bound to the ChipInput
component and will be passed down to the `<input>` element within.

<cdx-demo-wrapper :force-reset="true">
<template v-slot:demo>
	<chip-input-with-placeholder />
</template>
<template v-slot:code>

:::code-group

<<< @/../component-demos/chip-input/examples/ChipInputWithPlaceholder.vue [NPM]

<<< @/../component-demos/chip-input/examples-mw/ChipInputWithPlaceholder.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

### Disabled

<cdx-demo-wrapper :force-reset="true">
<template v-slot:demo>
	<chip-input-disabled />
</template>
<template v-slot:code>

:::code-group

<<< @/../component-demos/chip-input/examples/ChipInputDisabled.vue [NPM]

<<< @/../component-demos/chip-input/examples-mw/ChipInputDisabled.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

### Form field

A ChipInput can be wrapped in the Field component to add features like a semantic label, description
and help text, validation messages, and more. See the [Field](./field.md) page for more information.

<cdx-demo-wrapper>
<template v-slot:demo>
	<chip-input-field />
</template>
<template v-slot:code>

:::code-group

<<< @/../component-demos/chip-input/examples/ChipInputField.vue [NPM]

<<< @/../component-demos/chip-input/examples-mw/ChipInputField.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

## Vue usage

::: tip Attributes passed to input
This component will pass any HTML attributes applied to it, except for CSS class, to the `<input>`
element within the component.
:::

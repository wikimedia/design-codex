<script setup>
import { ref } from 'vue';
import { CdxChipInput, CdxAccordion } from '@wikimedia/codex';
import ChipInputConfigurable from '@/../component-demos/chip-input/examples/ChipInputConfigurable.vue';
import ChipInputBasic from '@/../component-demos/chip-input/examples/ChipInputBasic.vue';
import ChipInputWithIcons from '@/../component-demos/chip-input/examples/ChipInputWithIcons.vue';import ChipInputField from '@/../component-demos/chip-input/examples/ChipInputField.vue';

const controlsConfig = [
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
	},
	{
		name: 'readonly',
		type: 'boolean'
	}
];
</script>

A ChipInput allows users to create chips to filter content or make selections.

<cdx-demo-wrapper :controls-config="controlsConfig">
<template v-slot:demo="{ propValues }">
	<chip-input-configurable v-bind="propValues" />
</template>
</cdx-demo-wrapper>

## Overview

### When to use ChipInput

Use the ChipInput component when users need to enter multiple custom values in a single field, for
example when applying filters during a search process.

If only a single input value is anticipated, use [TextInput](./text-input.html) instead.

Avoid using ChipInput for simple filtering processes, or when you don't need to support entering
custom values. To provide a set of static options to choose from, use a [Checkbox](./checkbox.html)
group or [Select](./checkbox.html) instead. To provide a long, searchable list of predefined options
to choose from, use [MultiselectLookup](./multiselect-lookup.html).

### About ChipInput

ChipInput includes the following elements.

#### Input

The user can type within this input to create chips.

#### Chips

The chips are stacked next to each other. Chips are editable and can be removed.

## Examples

### Basic Usage

By default, the chips appear within the text input. Alternately, they can be placed in a separate container above the text input.

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

<cdx-accordion>
<template #title>Developer notes</template>

Pass an array of chip data to the input using `v-model:input-chips`. When the user adds or
removes a chip, the array will automatically be updated.

</cdx-accordion>

### With chip icons

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

### Form field

A ChipInput can be wrapped in the Field component to add features like a semantic label, description
and help text, validation messages, and more. Refer to the [Field](./field.md) page for more
information.

You can place restrictions on what kind of chips can be added. In this example, each chip's label
must have 10 characters or fewer.

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

<cdx-accordion>
<template #title>Developer notes</template>

To test chip text before a new chip is added, pass in a validation function via the `chipValidator`
prop. If the chip text fails validation, a new chip will not be added and the "error" status will be
set.

If you need access to the current value of the text input, for validation or other purposes, you can
use `v-model` to bind a string ref to the ChipInput, just like you would with a
[TextInput](./text-input.md#default).

In the example below, the input value is bound with `v-model` and is used to show the number of
remaining characters allowed as the user is typing. A `chipValidator` is passed in that tests
whether the text is 10 or fewer characters.

Placeholder and other attributes of the `<input>` element can be bound to the ChipInput component and will be passed down to the `<input>` element within.

</cdx-accordion>

## Technical implementation

### Vue usage

::: tip Attributes passed to input
This component will pass any HTML attributes applied to it, except for CSS class, to the `<input>`
element within the component.
:::

### Keyboard navigation

| Key | Function |
| -- | -- |
| <kbd>Tab</kbd> | It moves the focus between the chips within the input. When the focus is placed on the last chip, it moves the focus to the input to create more chips. While typing in the input, pressing it creates a chip with the typed text and then moves the focus to the next interactive element in tab order. |
| <kbd>Shift</kbd> + <kbd>Tab</kbd> | It moves the focus to the previous chip within the input or to the previous interactive element in the page. |
| <kbd>Enter</kbd> | While typing in the input, pressing <kbd>Enter</kbd> creates a chip with the typed text and keeps the input focused. If focused on a chip, pressing <kbd>Enter</kbd> makes the chip editable. |
| <kbd>Esc</kbd> | While typing in the input, pressing <kbd>Esc</kbd> creates a chip with the typed text. Once the chip is created, the input loses focus. When any of the chips or input is focused, pressing <kbd>Esc</kbd> removes the focus from the focused element. |
| <kbd>backspace</kbd> | If the focus is placed on a chip, this key removes the chip and moves the focus to the previous chip. If it removes the last chip, it moves the focus to the input. If the cursor is at the start of the input, it moves the focus to the last chip. |
| <kbd>Left arrow</kbd> / <kbd>Right arrow</kbd> | Arrow keys navigate between the chips within the input when they are focused. |

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

## Guidelines

### Using chip inputs

The [TextInput](./text-input.md) is utilized to build the ChipInput component, allowing information to be filtered by typing text that is transformed into a chip.

- Create chips by entering letters or words and pressing the <kbd>Enter</kbd> key, clicking outside, or tabbing out.
- Edit chips by clicking directly on them and typing.
- Remove chips using its remove button.

Use the ChipInput when users need to simplify a complex filtering process or when they need to edit the filters applied there.

Avoid using ChipInput if the filtering process is simple and doesn't require custom edits. In case you need to select static options that don't require editing, consider using a [Checkbox](./checkbox.html) group instead.

### Specifications

![Specification of ChipInput.](../../assets/components/chip-input-specifications.svg)

ChipInputs include the following items:
1. **TextInput**<br>The user can type letters or words within this input to create the chips and filter the information.
2. **Chip or chips**<br>The chip or chips created are stacked next to each other, and they are editable and can be removed.

The base min-width for the ChipInput component is set at `@size-1600` (equivalent to `256px` in the default Codex theme), but it can be customized to a smaller width if needed. There is no maximum width set.

Chips can vary in length as needed and will expand in width based on text length, with ellipsis applied if text exceeds the available width.
Chips may stack into multiple lines within the input when needed.

Refer to the [ChipInput component in Codex Figma](https://www.figma.com/file/KoDuJMadWBXtsOtzGS4134/%E2%9D%96-Codex-components?type=design&node-id=10650-146265&mode=design&t=2O0ceqiRfqCtnidq-11).

### Types
Depending on the placement of the chips, there are two types of ChipInput:

1. **Chips within the input field**<br>In this case, when the chips are created they are placed next to the input’s placeholder text, and they are stacked next to each other.
2. **Chips separated from the input field**<br>In this case, the chips are placed in a light gray box above the input field once they are created.

![Chip input types based on chip placement: chips within the input or chips separated from the input.](../../assets/components/chip-input-types.svg)

### Interaction states

ChipInput has the following visually separate states:

![Interaction states of ChipInput: default, hover on input, focus-active, filled, disabled, hover on chip’s remove button, error default, error focus, error filled, hover on editable chip,focus on editable chip and chip being edited.
](../../assets/components/chip-input-interaction-states.svg)

<div class="cdx-docs-multi-column cdx-docs-multi-columns-2">

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

</div>

### Best practices

Consider the following recommendations when using chip inputs.

<cdx-demo-rules>

<template #do-media>

![ChipInput with four chips included.](../../assets/components/chip-input-best-practices-usage-do.svg)

</template>

<template #do-text>

- Use ChipInput to enable users to input multiple items within a single field.

</template>

<template #dont-media>

![ChipInput with just one chip included.](../../assets/components/chip-input-best-practices-usage-dont.svg)

</template>

<template #dont-text>

- Use ChipInput if only a single item input is anticipated. In this case, consider using alternative components like [Select](./select.md) instead.

</template>

</cdx-demo-rules>

### Keyboard navigation

| Key | Function |
| -- | -- |
| <kbd>Tab</kbd> | It moves the focus between the chips within the input. When the focus is placed on the last chip, it moves the focus to the input to create more chips. While typing in the input, pressing it creates a chip with the typed text and then moves the focus to the next interactive element in tab order. |
| <kbd>Shift</kbd> + <kbd>Tab</kbd> | It moves the focus to the previous chip within the input or to the previous interactive element in the page. |
| <kbd>Enter</kbd> | While typing in the input, pressing <kbd>Enter</kbd> creates a chip with the typed text and keeps the input focused. If focused on a chip, pressing <kbd>Enter</kbd> makes the chip editable. |
| <kbd>Esc</kbd> | While typing in the input, pressing <kbd>Esc</kbd> creates a chip with the typed text. Once the chip is created, the input loses focus. When any of the chips or input is focused, pressing <kbd>Esc</kbd> removes the focus from the focused element. |
| <kbd>backspace</kbd> | If the focus is placed on a chip, this key removes the chip and moves the focus to the previous chip. If it removes the last chip, it moves the focus to the input. If the cursor is at the start of the input, it moves the focus to the last chip. |
| <kbd>Left arrow</kbd> / <kbd>Right arrow</kbd> | Arrow keys navigate between the chips within the input when they are focused. |

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

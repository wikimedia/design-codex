<script setup>
import { CdxAccordion } from '@wikimedia/codex';
import CdxDocsConfigurableGeneric from '@/../src/components/configurable-generic/ConfigurableGeneric.vue';
import SingleButton from '@/../component-demos/toggle-button/examples/SingleButton.vue';
import ButtonWithIcon from '@/../component-demos/toggle-button/examples/ButtonWithIcon.vue';
import IconOnlyButton from '@/../component-demos/toggle-button/examples/IconOnlyButton.vue';

const controlsConfig = [
	{
		name: 'disabled',
		type: 'boolean'
	},
	{
		name: 'quiet',
		type: 'boolean'
	},
	{
		name: 'default',
		type: 'slot',
		default: 'Button text'
	}
];
</script>

A ToggleButton is a button that can be toggled on and off.

<cdx-demo-wrapper :controls-config="controlsConfig" :show-generated-code="true" generated-model-name="buttonValue">
<template v-slot:demo="{ propValues, slotValues }">
	<cdx-docs-configurable-generic v-bind="propValues">
	{{ slotValues.default }}
	</cdx-docs-configurable-generic>
</template>
</cdx-demo-wrapper>

## Overview

### When to use ToggleButton

Use the ToggleButton component for options that require state persistence and are longer or more
involved than a typical button click action. Avoid using ToggleButton if you need to trigger an
immediate action; in this case use a [Button](./button.md) instead.

There are two types of ToggleButton: normal and quiet. Only use quiet ToggleButton for an easily recognizable
action that does not detract focus from the content. There is no ToggleButton variant designed
for progressive or destructive actions.

### About ToggleButton

ToggleButton includes the following elements.

#### Label

Labels should be as short as possible, with text that clearly states what state is changed
when toggling the ToggleButton (eg. show/hide). Note that the label text should not change depending on
the button’s toggled state.

<cdx-demo-best-practices>

<cdx-demo-best-practice>Use the same text and icon in both off and on states.</cdx-demo-best-practice>

</cdx-demo-best-practices>

#### Icon (optional)

Icons simplify user recognition and provide the ability to shorten labels to a minimum. For icon-only ToggleButtons, the label will be visually hidden while still available to
screen reader users.

<cdx-demo-best-practices>

<cdx-demo-best-practice>Ensure that icons used in buttons are relevant to the action they represent.</cdx-demo-best-practice>
<cdx-demo-best-practice>Use icons only when they are clear and easily recognizable.</cdx-demo-best-practice>
<cdx-demo-best-practice type="dont">Avoid using icons that are difficult to recognize or do not clearly convey their purpose.</cdx-demo-best-practice>

</cdx-demo-best-practices>

## Examples

### Basic usage

ToggleButtons should always have a static label. This helps indicate to the user (including users
of assistive technology) what it means for the ToggleButton to be on or off. If you want a button with a
label that changes when it is pressed, use the [Button](./button.md) component instead.

Press the ToggleButton to check the value change.

<cdx-demo-wrapper>
<template v-slot:demo>
	<single-button />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/toggle-button/examples/SingleButton.vue [NPM]

<<< @/../component-demos/toggle-button/examples-mw/SingleButton.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

<cdx-accordion>

<template #title>Developer notes</template>

Open up the console to see emitted events.

</cdx-accordion>

### With icon

Use an icon with the ToggleButton label when you need to convey meaning through both textual and visual elements.

<cdx-demo-wrapper>
<template v-slot:demo>
	<button-with-icon />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/toggle-button/examples/ButtonWithIcon.vue [NPM]

<<< @/../component-demos/toggle-button/examples-mw/ButtonWithIcon.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

### Icon-only button

When the ToggleButton includes only an icon and no text,  add an `aria-label` to the ToggleButton
to ensure the action is understandable to those using assistive technology.

<cdx-demo-wrapper>
<template v-slot:demo>
	<icon-only-button />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/toggle-button/examples/IconOnlyButton.vue [NPM]

<<< @/../component-demos/toggle-button/examples-mw/IconOnlyButton.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

## Technical implementation

### Vue usage

The `v-model` value will be a boolean, it is `true` if the ToggleButton is currently toggled ("on")
and `false` otherwise ("off").

### Keyboard navigation

| Key | Function |
| -- | -- |
| <kbd>Tab</kbd> | It moves the focus to the next interactive element. |
| <kbd>Shift</kbd> + <kbd>Tab</kbd> | It moves the focus to the previous interactive element. |
| <kbd>Enter</kbd> / <kbd>Space</kbd> | If the focus is placed on the button, it toggles the ToggleButton on and off. |
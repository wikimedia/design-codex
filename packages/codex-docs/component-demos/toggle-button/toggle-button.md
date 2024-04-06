<script setup>
import CdxDocsConfigurableGeneric from '@/../src/components/configurable-generic/ConfigurableGeneric.vue';
import IconOnlyButton from '@/../component-demos/toggle-button/examples/IconOnlyButton.vue';
import SingleButton from '@/../component-demos/toggle-button/examples/SingleButton.vue';

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

## Guidelines

### Using toggle buttons

Toggle buttons feature a normal and an “on” state. They generally contain a label and can also
include an icon. For icon-only buttons, the label will be visually hidden while still available to
screen reader users.

There are two types of toggle buttons: normal and quiet. There is no toggle button variant designed
for progressive or destructive actions.

Use the ToggleButton component for options that require state persistence and are longer or more
involved than a typical button click action. Avoid using ToggleButton if you need to trigger an
immediate action or toggle something within the current user context; in this case use a
[Button](./button.md) instead.

### Specifications

![Specification of ToggleButton.](../../assets/components/toggle-button-specifications.svg)

ToggleButton may include the following elements:
1. **Icon** (optional)<br>
Icons simplify user recognition and provide the ability to shorten button labels to a minimum.
2. **Label**<br>
Button labels should be as short as possible, with text that clearly states what state is changed
when toggling the button (eg. show/hide). Note that the label text should not change depending on
the button’s toggled state.

The minimum width and height for both icon and text toggle buttons is
`min-size-interactive-pointer` token (equivalent to `32px` in the default Codex theme). The toggle
button will adjust to fit the expanding text but will halt growth at a maximum width of
`max-width-button` (equivalent to `448px` in the default Codex theme). An ellipsis will appear
to accommodate the text if necessary.

On mobile, toggle buttons should span the full-width of the container, except for icon-only buttons, which will maintain their fixed square proportions.

Refer to the [ToggleButton component in Codex Figma](https://www.figma.com/file/KoDuJMadWBXtsOtzGS4134/%E2%9D%96-Codex-components?type=design&node-id=13076-164059&mode=design&t=PjLN7gsPGhALOhfp-0).

### Types
Depending on the style of the button, there are two types of toggle buttons:
1. **Normal toggle buttons.** They are the default choice for simplified recognition.
2. **Quiet toggle buttons (frameless).** Only use quiet toggle buttons for an easily recognizable
action that does not detract focus from the content.

![Type of ToggleButton based on its style: normal and quiet.](../../assets/components/toggle-button-types.svg)

Depending on the button's content, it can have one of the following formats:
1. Icon and text
2. Text-only
3. Icon-only

![Type of ToggleButton based on its content: icon and text, text-only, and icon-only.](../../assets/components/toggle-button-types-content.svg)

### Interaction states

Buttons have the following visually separate states:

![Interaction states of the normal toggle button for both toggled-off and toggled-on: default, hover, active, focus, and disabled.](../../assets/components/toggle-button-normal-interaction-states.svg)
*<p style="text-align: center;">Neutral buttons</p>*


![Interaction states of the quiet toggle button for both toggled-off and toggled-on: default, hover, active, focus, and disabled.](../../assets/components/toggle-button-framed-interaction-states.svg)
*<p style="text-align: center;">Quiet buttons</p>*

<div class="cdx-docs-multi-column cdx-docs-multi-columns-2">

1. Toggled-off default
2. Toggled-off hover
3. Toggled-off active
4. Toggled-off focus
5. Toggled-off disabled
6. Toggled-on default
7. Toggled-on hover
8. Toggled-on active
9. Toggled-on focus
10. Toggled-on disabled

</div>

### Best practices

Consider the following recommendations when working with toggle buttons.

#### Icon

<cdx-demo-rules>

<template #do-media>

![ToggleButton featuring an icon relevant to its action.](../../assets/components/toggle-button-best-practices-icon-do.svg)

</template>

<template #do-text>

- Ensure that icons used in buttons are relevant to the action they represent.
- Use icons only when they are clear and easily recognizable.

</template>

<template #dont-media>

![ToggleButton displaying a complex icon that doesn't add value to the button's text.](../../assets/components/toggle-button-best-practices-icon-dont.svg)

</template>

<template #dont-text>

- Use icons that are difficult to understand or do not clearly convey their purpose.

</template>

</cdx-demo-rules>

#### Toggle state

<cdx-demo-rules>

<template #do-media>

![ToggleButton in its default and toggled states, with the same icon used in both states.](../../assets/components/toggle-button-best-practices-toggled-do.svg)

</template>

<template #do-text>

- Maintain consistent text and icon representation across both default and toggled button states to indicate state changes solely through button color.

</template>

<template #dont-media>

![ToggleButton altering the icon in its default and toggled states.](../../assets/components/toggle-button-best-practices-toggled-dont.svg)

</template>

<template #dont-text>

- Alter the icon and/or text when the button is toggled.

</template>

</cdx-demo-rules>

## Demos

### Configurable

<cdx-demo-wrapper :controls-config="controlsConfig" :show-generated-code="true" generated-model-name="buttonValue">
<template v-slot:demo="{ propValues, slotValues }">
	<cdx-docs-configurable-generic v-bind="propValues">
	{{ slotValues.default }}
	</cdx-docs-configurable-generic>
</template>
</cdx-demo-wrapper>

### Default

Press the ToggleButton to see the value change. Open up the console to see emitted events.

ToggleButtons should always have a static label. This helps indicate to the user (including users
of assistive technology) what it means for the button to be on or off. If you want a button with a
label that changes when it is pressed, use the Button component instead.

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

### Icon only

When the ToggleButton includes only an icon and no text,  add an `aria-label` to the ToggleButton
to ensure the button is understandable to those using assistive technology.

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

## Vue usage

The `v-model` value will be a boolean, it is `true` if the button is currently toggled ("on")
and `false` otherwise ("off").

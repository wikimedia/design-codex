<script setup>
import { ref } from 'vue';
import { CdxAccordion } from '@wikimedia/codex';
import SwitchConfigurable from '@/../component-demos/toggle-switch/examples/SwitchConfigurable.vue';
import SwitchWithDescription from '@/../component-demos/toggle-switch/examples/SwitchWithDescription.vue';
import SwitchWithHiddenLabel from '@/../component-demos/toggle-switch/examples/SwitchWithHiddenLabel.vue';
import SwitchGroup from '@/../component-demos/toggle-switch/examples/SwitchGroup.vue';
import SwitchGroupField from '@/../component-demos/toggle-switch/examples/SwitchGroupField.vue';

const controlsConfig = [
	{
		name: 'alignSwitch',
		type: 'boolean'
	},
	{
		name: 'hideLabel',
		type: 'boolean'
	},
	{
		name: 'disabled',
		type: 'boolean'
	},
	{
		name: 'default',
		type: 'slot',
		default: 'ToggleSwitch label'
	},
	{
		name: 'description',
		type: 'slot',
		default: ''
	}
];
</script>

A ToggleSwitch enables the user to instantly toggle between on and off states.

<cdx-demo-wrapper :controls-config="controlsConfig">
<template v-slot:demo="{ propValues, slotValues }">
	<switch-configurable v-bind="propValues">
		{{ slotValues.default }}
		<template #description>
			{{ slotValues.description }}
		</template>
	</switch-configurable>
</template>
</cdx-demo-wrapper>

## Overview

### When to use ToggleSwitch

Toggle switches must feature a descriptive label.

Use the ToggleSwitch component only where an instant change in the
user-interface based on their assigned action is intended. For non-instant
selections and selection groups, use [Checkbox](./checkbox.md) instead.

Avoid using a ToggleSwitch to control opposing options like Yes/No.

### About ToggleSwitch

ToggleSwitch includes the following elements.

#### Label

The ToggleSwitch must always contain a label, with the text size matching the base font size for consistency with the body text. The label should be short, with text that clearly describes the state being toggled.

<cdx-demo-best-practices>

<cdx-demo-best-practice>Use text formatting like bold and italic sparingly in the label.</cdx-demo-best-practice>
<cdx-demo-best-practice>Include standalone links within the label to provide additional information regarding a specific option when necessary.</cdx-demo-best-practice>
<cdx-demo-best-practice type="dont">Avoid linking the entire label as it could cause issues with the selection.</cdx-demo-best-practice>

</cdx-demo-best-practices>

#### Switch

Toggle switches make the on and off states visually distinct by using different colors and moving
the grabber from left to right and vice versa.

#### Description (optional)

If additional information about the label is required, a description can be included.

## Examples

### Single switch

Single switches can be used, such as turning a setting on or off.

<cdx-demo-wrapper>
<template v-slot:demo>
	<switch-with-description />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/toggle-switch/examples/SwitchWithDescription.vue [NPM]

<<< @/../component-demos/toggle-switch/examples-mw/SwitchWithDescription.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

<cdx-accordion>

<template #title>Developer notes</template>

Always include label text via the default slot. You can also add description text via the
`#description` slot.

A single switch does not need an `inputValue` prop. `v-model` is bound to a boolean value: `true`
for "on", `false` for "off".

In rare cases, a visible label is not necessary.

</cdx-accordion>

In rare cases where the purpose of the ToggleSwitch is made clear in context, a visible label is not necessary.

<cdx-demo-wrapper>
<template v-slot:demo>
	<switch-with-hidden-label />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/toggle-switch/examples/SwitchWithHiddenLabel.vue [NPM]

<<< @/../component-demos/toggle-switch/examples-mw/SwitchWithHiddenLabel.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

<cdx-accordion>

<template #title>Developer notes</template>

You can use the `hideLabel` prop to visually hide
the label, which will still appear in the markup for accessibility purposes.

</cdx-accordion>

### Form field

When used in a form, a single ToggleSwitch or group of ToggleSwitches can be wrapped in the Field
component to add features like a semantic label, description and help text, validation messages,
and more. Visit the [Field documentation](./field.md) for more information.

If using a ToggleSwitch or ToggleSwitch group outside of a form, follow the instructions in the
next demo.

<cdx-demo-wrapper>
<template v-slot:demo>
	<switch-group-field />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/toggle-switch/examples/SwitchGroupField.vue [NPM]

<<< @/../component-demos/toggle-switch/examples-mw/SwitchGroupField.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

<cdx-accordion>

<template #title>Developer notes</template>

When building a ToggleSwitch field, **always set `isFieldset` to `true`**, even for a single
ToggleSwitch, to ensure proper accessibility support. This wraps the group in a `<fieldset>`
element and labels it with an associated `<legend>`.

</cdx-accordion>

### ToggleSwitch group

ToggleSwitches can be used in groups.

<cdx-demo-best-practices>
<cdx-demo-best-practice>

Use ToggleSwitch groups vertically for a clear and organized layout.

</cdx-demo-best-practice>
</cdx-demo-best-practices>

<cdx-demo-wrapper>
<template v-slot:demo>
	<switch-group />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/toggle-switch/examples/SwitchGroup.vue [NPM]

<<< @/../component-demos/toggle-switch/examples-mw/SwitchGroup.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

<cdx-accordion>

<template #title>Developer notes</template>

For a group of related ToggleSwitches, each ToggleSwitch component's `v-model` will be bound to an
array of the `inputValue` props of the ToggleSwitches that are currently "on".

Use the `alignSwitch` prop to align all of the switches to the end of the container, creating a more
streamlined look.

This demo shows what to do when using a ToggleSwitch group outside of a form:
1. Wrap the group in an element with `role="group"`
2. Connect the group with a label via the `aria-labelledby` attribute

</cdx-accordion>

## Technical implementation

### Vue usage

::: tip Attributes passed to input
This component will pass any HTML attributes applied to it, except for CSS class, to the `<input>`
element within the component.
:::

For a single ToggleSwitch, the `v-model` value will be a boolean `true` when the switch is "on"
and `false` when "off".<br>
For multiple ToggleSwitches, the `v-model` value will be an array of the `inputValue` props of
any currently "on" switches (or an empty array if all switches are "off").

### CSS-only version

#### Markup structure

<cdx-demo-wrapper>
<template v-slot:demo>
	<!-- Wrapper <span>. -->
	<span class="cdx-toggle-switch">
		<!-- <input> with type="checkbox" and ID. -->
		<input id="cdx-toggle-switch-css-1" class="cdx-toggle-switch__input" type="checkbox">
		<!-- <span> elements that will be styled to look like the toggle switch. -->
		<span class="cdx-toggle-switch__switch">
			<span class="cdx-toggle-switch__switch__grip"></span>
		</span>
		<div class="cdx-toggle-switch__label cdx-label">
			<!-- Label with `for` attribute matching the input's id. -->
			<label for="cdx-toggle-switch-css-1" class="cdx-label__label">
				<span class="cdx-label__label__text">
					Label
				</span>
			</label>
		</div>
	</span>
</template>
<template v-slot:code>

```html
<!-- Wrapper <span>. -->
<span class="cdx-toggle-switch">
	<!-- <input> with type="checkbox" and ID. -->
	<input id="cdx-toggle-switch-css-1" class="cdx-toggle-switch__input" type="checkbox">
	<!-- <span> elements that will be styled to look like the toggle switch. -->
	<span class="cdx-toggle-switch__switch">
		<span class="cdx-toggle-switch__switch__grip"></span>
	</span>
	<div class="cdx-toggle-switch__label cdx-label">
		<!-- Label with `for` attribute matching the input's id. -->
		<label for="cdx-toggle-switch-css-1" class="cdx-label__label">
			<span class="cdx-label__label__text">
				Label
			</span>
		</label>
	</div>
</span>
```

</template>
</cdx-demo-wrapper>

#### With description

To add a description below the label:
- Add a `<span>` after the `<label>` element with an ID and class `cdx-label__description`.
  Include the description text here.
- Add an `aria-describedby` attribute to the `<input>` element with the value of the ID of the
  description

<cdx-demo-wrapper>
<template v-slot:demo>
	<span class="cdx-toggle-switch">
		<input id="cdx-toggle-switch-css-7" class="cdx-toggle-switch__input" type="checkbox" aria-describedby="cdx-description-css-1">
		<span class="cdx-toggle-switch__switch">
			<span class="cdx-toggle-switch__switch__grip"></span>
		</span>
		<div class="cdx-toggle-switch__label cdx-label">
			<label for="cdx-toggle-switch-css-7" class="cdx-label__label">
				<span class="cdx-label__label__text">
					Visual editing mode
				</span>
			</label>
			<span id="cdx-description-css-1" class="cdx-label__description">
				Turn on to use the visual editor. You can switch back to source mode at any time.
			</span>
		</div>
	</span>
</template>
<template v-slot:code>

```html
<span class="cdx-toggle-switch">
	<input id="cdx-toggle-switch-css-7" class="cdx-toggle-switch__input" type="checkbox" aria-describedby="cdx-description-css-1">
	<span class="cdx-toggle-switch__switch">
		<span class="cdx-toggle-switch__switch__grip"></span>
	</span>
	<div class="cdx-toggle-switch__label cdx-label">
		<label for="cdx-toggle-switch-css-7" class="cdx-label__label">
			<span class="cdx-label__label__text">
				Visual editing mode
			</span>
		</label>
		<span id="cdx-description-css-1" class="cdx-label__description">
			Turn on to use the visual editor. You can switch back to source mode at any time.
		</span>
	</div>
</span>
```

</template>
</cdx-demo-wrapper>

#### With visually-hidden label

For a visually-hidden label, add the `cdx-label--visually-hidden` class to the `<div>` that has the
`cdx-label` class.

<cdx-demo-wrapper>
<template v-slot:demo>
	<span class="cdx-toggle-switch">
		<input id="cdx-toggle-switch-css-8" class="cdx-toggle-switch__input" type="checkbox">
		<span class="cdx-toggle-switch__switch">
			<span class="cdx-toggle-switch__switch__grip"></span>
		</span>
		<div class="cdx-toggle-switch__label cdx-label cdx-label--visually-hidden">
			<label for="cdx-toggle-switch-css-8" class="cdx-label__label">
				<span class="cdx-label__label__text">
					Label text
				</span>
			</label>
		</div>
	</span>
</template>
<template v-slot:code>

```html
<span class="cdx-toggle-switch">
	<input id="cdx-toggle-switch-css-8" class="cdx-toggle-switch__input" type="checkbox">
	<span class="cdx-toggle-switch__switch">
		<span class="cdx-toggle-switch__switch__grip"></span>
	</span>
	<div class="cdx-toggle-switch__label cdx-label cdx-label--visually-hidden">
		<label for="cdx-toggle-switch-css-8" class="cdx-label__label">
			<span class="cdx-label__label__text">
				Label text
			</span>
		</label>
	</div>
</span>
```

</template>
</cdx-demo-wrapper>

#### Initially on

The ToggleSwitch appears "on" when the hidden checkbox is checked. To initially set the switch to
"on", add the `checked` attribute to the `<input>`.

<cdx-demo-wrapper>
<template v-slot:demo>
	<span class="cdx-toggle-switch">
		<input id="cdx-toggle-switch-css-2" class="cdx-toggle-switch__input" type="checkbox" checked>
		<span class="cdx-toggle-switch__switch">
			<span class="cdx-toggle-switch__switch__grip"></span>
		</span>
		<div class="cdx-toggle-switch__label cdx-label">
			<label for="cdx-toggle-switch-css-2" class="cdx-label__label">
				<span class="cdx-label__label__text">
					Initially on
				</span>
			</label>
		</div>
	</span>
</template>
<template v-slot:code>

```html
<span class="cdx-toggle-switch">
	<input id="cdx-toggle-switch-css-2" class="cdx-toggle-switch__input" type="checkbox" checked>
	<span class="cdx-toggle-switch__switch">
		<span class="cdx-toggle-switch__switch__grip"></span>
	</span>
	<div class="cdx-toggle-switch__label cdx-label">
		<label for="cdx-toggle-switch-css-2" class="cdx-label__label">
			<span class="cdx-label__label__text">
				Initially on
			</span>
		</label>
	</div>
</span>
```

</template>
</cdx-demo-wrapper>

#### Disabled

To disable the ToggleSwitch, add the `disabled` attribute to the `<input>` element.

<cdx-demo-wrapper>
<template v-slot:demo>
	<span class="cdx-toggle-switch">
		<input id="cdx-toggle-switch-css-5" class="cdx-toggle-switch__input" type="checkbox" disabled>
		<span class="cdx-toggle-switch__switch">
			<span class="cdx-toggle-switch__switch__grip"></span>
		</span>
		<div class="cdx-toggle-switch__label cdx-label">
			<label for="cdx-toggle-switch-css-5" class="cdx-label__label">
				<span class="cdx-label__label__text">
					Disabled, off
				</span>
			</label>
		</div>
	</span>
	<br>
	<span class="cdx-toggle-switch">
		<input id="cdx-toggle-switch-css-6" class="cdx-toggle-switch__input" type="checkbox" checked disabled>
		<span class="cdx-toggle-switch__switch">
			<span class="cdx-toggle-switch__switch__grip"></span>
		</span>
		<div class="cdx-toggle-switch__label cdx-label">
			<label for="cdx-toggle-switch-css-6" class="cdx-label__label">
				<span class="cdx-label__label__text">
					Disabled, on
				</span>
			</label>
		</div>
	</span>
</template>
<template v-slot:code>

```html
<span class="cdx-toggle-switch">
	<input id="cdx-toggle-switch-css-5" class="cdx-toggle-switch__input" type="checkbox" disabled>
	<span class="cdx-toggle-switch__switch">
		<span class="cdx-toggle-switch__switch__grip"></span>
	</span>
	<div class="cdx-toggle-switch__label cdx-label">
		<label for="cdx-toggle-switch-css-5" class="cdx-label__label">
			<span class="cdx-label__label__text">
				Disabled, off
			</span>
		</label>
	</div>
</span>
<br>
<span class="cdx-toggle-switch">
	<input id="cdx-toggle-switch-css-6" class="cdx-toggle-switch__input" type="checkbox" checked disabled>
	<span class="cdx-toggle-switch__switch">
		<span class="cdx-toggle-switch__switch__grip"></span>
	</span>
	<div class="cdx-toggle-switch__label cdx-label">
		<label for="cdx-toggle-switch-css-6" class="cdx-label__label">
			<span class="cdx-label__label__text">
				Disabled, on
			</span>
		</label>
	</div>
</span>
```

</template>
</cdx-demo-wrapper>

### Keyboard navigation

| Key | Function |
| -- | -- |
| <kbd>Tab</kbd> | It moves the focus to the next ToggleSwitch within a group or to the next interactive element in tab order when the focus is placed on the last ToggleSwitch of a group. |
| <kbd>Shift</kbd> + <kbd>Tab</kbd> | It moves the focus to the previous button within the group or to the previous interactive element when the focus is placed on the first button of the group. |
| <kbd>Enter</kbd> / <kbd>Space</kbd> | If the focus is placed on the ToggleSwitch, it toggles the switch on and off. |
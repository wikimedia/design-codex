<script setup>
import { ref } from 'vue';
import CdxDocsConfigurableGeneric from '@/../src/components/configurable-generic/ConfigurableGeneric.vue';
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
		default: 'Label for ToggleSwitch'
	}
];
</script>

A ToggleSwitch enables the user to instantly toggle between on and off states.

## Guidelines

### Using toggle switches

Toggle switches must feature a descriptive label.

Use the ToggleSwitch component only where an instant change in the
user-interface based on their assigned action is intended. For non-instant
selections and selection groups, use [Checkbox](./checkbox.md) instead.

### Specifications

![Specification of ToggleSwitch.](../../assets/components/toggle-switch-specifications.svg)

1. **Toggle switch label**<br>
The toggle switch must always contain a label, with the text size matching the base font size for consistency with the body text. The label should be short, with text that clearly describes the state being toggled.
2. **Toggle switch**<br>
Toggle switches make the on and off states visually distinct by using different colors and moving
the grabber from left to right and vice versa.
3. **Description** (optional)<br>
If additional information about the label is required, a description can be included.

The ToggleSwitch label will expand to fit longer text while the ToggleSwith itself remains aligned with the first line of the label's text.

A group of toggle switches should consist of at least 2 items, with no maximum limit on the number of toggle switches per group.

Refer to the [ToggleSwitch component in Codex Figma](https://www.figma.com/file/KoDuJMadWBXtsOtzGS4134/%E2%9D%96-Codex-components?type=design&node-id=2554-32423&mode=design&t=7wyBmhfdJTJevQmT-11).

### Interaction states

Toggle switches’ states were designed with accessible color variations. These,
in addition to the toggle handle, facilitate distinguishing the toggle switch’s
on or off states (e.g. disabled, hover, active) visually:

![States of the ToggleSwitch component for both off and on states: default, hover, active, focus, and disabled.](../../assets/components/toggle-switch-interaction-states.svg)

<div class="cdx-docs-multi-column cdx-docs-multi-columns-2">

1. Default off
2. Hover off
3. Active off
4. Focus off
5. Disabled off
6. Default on
7. Hover on
8. Active on
9. Focus on
10. Disabled on

</div>

::: tip Accessibility note
The disabled state does not meet our minimum color contrast rules. WCAG 2.1
states that “…part[s] of an inactive user interface component […] have no contrast requirement”.
<sup>[[1]](#ref1)</sup><br>
Provide sufficient information in a disabled element's context, so the user can understand what is
disabled and how to enable it (if applicable).
:::

### Best practices

Consider the following recommendations when using toggle switches.

#### Label’s format

<cdx-demo-rules>

<template #do-media>

![ToggleSwitch group including different text formats and a link.](../../assets/components/toggle-switch-best-practices-label-do.svg)

</template>

<template #do-text>

- Accompany the ToggleSwitch with a label that matches the base font size. 
- Use text formatting and links in the label. 
- Include a description below the label to provide additional information.

</template>

<template #dont-media>

![ToggleSwitch group with bolded labels and a link within the last label.](../../assets/components/toggle-switch-best-practices-label-dont.svg)

</template>

<template #dont-text>

- Bold all the label.
- Link the entire ToggleSwitch label as it could cause issues with the selection.

</template>

</cdx-demo-rules>

#### Orientation
<cdx-demo-rules>

<template #do-media>

![Two ToggleSwitches stacked vertically.](../../assets/components/toggle-switch-best-practices-orientation-do.svg)

</template>

<template #do-text>

- Use ToggleSwitch groups in a vertical orientation for a clear and organized layout.

</template>

<template #dont-media>

![ToggleSwitch conveying switching between two opposing options.](../../assets/components/toggle-switch-best-practices-orientation-dont.svg)

</template>

<template #dont-text>

- Use a ToggleSwitch to control opposing options.

</template>

</cdx-demo-rules>

### References

1. <span id="ref1">[Web Content Accessibility Guidelines (WCAG) 2.1 – Success Criterion 1.4.3 Contrast (Minimum)](https://www.w3.org/TR/WCAG21/#contrast-minimum)</span>

## Demos

### Configurable

<cdx-demo-wrapper :controls-config="controlsConfig" :show-generated-code="true" generated-model-name="switchValue">
<template v-slot:demo="{ propValues, slotValues }">
	<cdx-docs-configurable-generic v-bind="propValues">
		{{ slotValues.default }}
	</cdx-docs-configurable-generic>
</template>
</cdx-demo-wrapper>

### Single switch with label and description

Always include label text via the default slot. You can also add description text via the
`#description` slot.

A single switch does not need an `inputValue` prop. `v-model` is bound to a boolean value: `true`
for "on", `false` for "off".

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

In rare cases, a visible label is not necessary. You can use the `hideLabel` prop to visually hide
the label, which will still appear in the markup for accessibility purposes.

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

### Form field

When used in a form, a single ToggleSwitch or group of ToggleSwitches can be wrapped in the Field
component to add features like a semantic label, description and help text, validation messages,
and more. See the [Field](./field.md) page for more information.

When building a ToggleSwitch field, **always set `isFieldset` to `true`**, even for a single
ToggleSwitch, to ensure proper accessibility support. This wraps the group in a `<fieldset>`
element and labels it with an associated `<legend>`.

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

### ToggleSwitch group

For a group of related toggle switches, each ToggleSwitch component's `v-model` will be bound to an
array of the `inputValue` props of the toggle switches that are currently "on".

Use the `alignSwitch` prop to align all of the switches to the end of the container, creating a more
streamlined look.

This demo shows what to do when using a ToggleSwitch group outside of a form:
1. Wrap the group in an element with `role="group"`
2. Connect the group with a label via the `aria-labelledby` attribute

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

## Vue usage

::: tip Attributes passed to input
This component will pass any HTML attributes applied to it, except for CSS class, to the `<input>`
element within the component.
:::


For a single toggle switch, the `v-model` value will be a boolean `true` when the switch is "on"
and `false` when "off".<br>
For multiple toggle switches, the `v-model` value will be an array of the `inputValue` props of
any currently "on" switches (or an empty array if all switches are "off").

## CSS-only version

### Markup structure

The structure below can be used for most cases. If you need a description or a visually-hidden
label, see the sections on those features below.

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
		<!-- <label> with for attribute matching input ID. -->
		<label for="cdx-toggle-switch-css-1" class="cdx-toggle-switch__label">
			Label
		</label>
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
	<!-- <label> with for attribute matching input ID. -->
	<label for="cdx-toggle-switch-css-1" class="cdx-toggle-switch__label">
		Label
	</label>
</span>
```

</template>
</cdx-demo-wrapper>

### With description

To add a description below the label:
- Add a span after the `<label>` element with an ID and class `cdx-label__description`. Include the
  description text here.
- Add class `cdx-label__label` to the `<label>` element
- Wrap the label and description in a div with classes `cdx-toggle-switch__label` and `cdx-label`
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
				Visual editing mode
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
			Visual editing mode
		</label>
		<span id="cdx-description-css-1" class="cdx-label__description">
			Turn on to use the visual editor. You can switch back to source mode at any time.
		</span>
	</div>
</span>
```

</template>
</cdx-demo-wrapper>

### With visually-hidden label

For a visually-hidden label:
- Add class `cdx-label__label` to the `<label>` element
- Wrap the label in a div with classes `cdx-toggle-switch__label`, `cdx-label`, and
  `cdx-label--visually-hidden`

<cdx-demo-wrapper>
<template v-slot:demo>
	<span class="cdx-toggle-switch">
		<input id="cdx-toggle-switch-css-8" class="cdx-toggle-switch__input" type="checkbox">
		<span class="cdx-toggle-switch__switch">
			<span class="cdx-toggle-switch__switch__grip"></span>
		</span>
		<div class="cdx-toggle-switch__label cdx-label cdx-label--visually-hidden">
			<label for="cdx-toggle-switch-css-8" class="cdx-label__label">
				Label text
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
			Label text
		</label>
	</div>
</span>
```

</template>
</cdx-demo-wrapper>

### Initially on

The toggle switch appears "on" when the hidden checkbox is checked. To initially set the switch to
"on", add the `checked` attribute to the `<input>`.

<cdx-demo-wrapper>
<template v-slot:demo>
	<span class="cdx-toggle-switch">
		<input id="cdx-toggle-switch-css-2" class="cdx-toggle-switch__input" type="checkbox" checked>
		<span class="cdx-toggle-switch__switch">
			<span class="cdx-toggle-switch__switch__grip"></span>
		</span>
		<label for="cdx-toggle-switch-css-2" class="cdx-toggle-switch__label">
			Initially on
		</label>
	</span>
</template>
<template v-slot:code>

```html
<span class="cdx-toggle-switch">
	<input id="cdx-toggle-switch-css-2" class="cdx-toggle-switch__input" type="checkbox" checked>
	<span class="cdx-toggle-switch__switch">
		<span class="cdx-toggle-switch__switch__grip"></span>
	</span>
	<label for="cdx-toggle-switch-css-2" class="cdx-toggle-switch__label">
		Initially on
	</label>
</span>
```

</template>
</cdx-demo-wrapper>

### Disabled

To disable the toggle switch, add the `disabled` attribute to the `<input>` element.

<cdx-demo-wrapper>
<template v-slot:demo>
	<span class="cdx-toggle-switch">
		<input id="cdx-toggle-switch-css-5" class="cdx-toggle-switch__input" type="checkbox" disabled>
		<span class="cdx-toggle-switch__switch">
			<span class="cdx-toggle-switch__switch__grip"></span>
		</span>
		<label for="cdx-toggle-switch-css-5" class="cdx-toggle-switch__label">
			Disabled, off
		</label>
	</span>
	<br>
	<span class="cdx-toggle-switch">
		<input id="cdx-toggle-switch-css-6" class="cdx-toggle-switch__input" type="checkbox" checked disabled>
		<span class="cdx-toggle-switch__switch">
			<span class="cdx-toggle-switch__switch__grip"></span>
		</span>
		<label for="cdx-toggle-switch-css-6" class="cdx-toggle-switch__label">
			Disabled, on
		</label>
	</span>
</template>
<template v-slot:code>

```html
<span class="cdx-toggle-switch">
	<input id="cdx-toggle-switch-css-5" class="cdx-toggle-switch__input" type="checkbox" disabled>
	<span class="cdx-toggle-switch__switch">
		<span class="cdx-toggle-switch__switch__grip"></span>
	</span>
	<label for="cdx-toggle-switch-css-5" class="cdx-toggle-switch__label">
		Disabled, off
	</label>
</span>
<br>
<span class="cdx-toggle-switch">
	<input id="cdx-toggle-switch-css-6" class="cdx-toggle-switch__input" type="checkbox" checked disabled>
	<span class="cdx-toggle-switch__switch">
		<span class="cdx-toggle-switch__switch__grip"></span>
	</span>
	<label for="cdx-toggle-switch-css-6" class="cdx-toggle-switch__label">
		Disabled, on
	</label>
</span>
```

</template>
</cdx-demo-wrapper>

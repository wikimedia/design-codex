<script setup>
import { ref } from 'vue';
import CdxDocsConfigurableGeneric from '@/../src/components/configurable-generic/ConfigurableGeneric.vue';
import SingleSwitch from '@/../component-demos/toggle-switch/examples/SingleSwitch.vue';
import SingleSwitchWithLabel from '@/../component-demos/toggle-switch/examples/SingleSwitchWithLabel.vue';
import SwitchGroup from '@/../component-demos/toggle-switch/examples/SwitchGroup.vue';
import SwitchGroupField from '@/../component-demos/toggle-switch/examples/SwitchGroupField.vue';

const controlsConfig = [
	{
		name: 'alignSwitch',
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

::: tip Attributes passed to input
This component will pass any HTML attributes applied to it, except for CSS class, to the `<input>`
element within the component.
:::

## Demos

### Configurable

<cdx-demo-wrapper :controls-config="controlsConfig" :show-generated-code="true" generated-model-name="switchValue">
<template v-slot:demo="{ propValues, slotValues }">
	<cdx-docs-configurable-generic v-bind="propValues">
		{{ slotValues.default }}
	</cdx-docs-configurable-generic>
</template>
</cdx-demo-wrapper>

### Default

Toggle the ToggleSwitch to see the value change. Open up the console to see emitted events.

<cdx-demo-wrapper>
<template v-slot:demo>
	<single-switch />
</template>

<template v-slot:code>

<<< @/../component-demos/toggle-switch/examples/SingleSwitch.vue

</template>
</cdx-demo-wrapper>

### With label

Adding content into ToggleSwitch's default slot will generate a `<label>` element associated with
the `<input>`.

<cdx-demo-wrapper>
<template v-slot:demo>
	<single-switch-with-label />
</template>

<template v-slot:code>

<<< @/../component-demos/toggle-switch/examples/SingleSwitchWithLabel.vue

</template>
</cdx-demo-wrapper>

### ToggleSwitch group

For a group of toggle switches, each ToggleSwitch component's `v-model` will be bound to an array of
the `inputValue` props of the toggle switches that are currently "on".

Use the `alignSwitch` prop to align all of the switches to the end of the container, creating a more
streamlined look.

<cdx-demo-wrapper>
<template v-slot:demo>
	<switch-group />
</template>

<template v-slot:code>

<<< @/../component-demos/toggle-switch/examples/SwitchGroup.vue

</template>
</cdx-demo-wrapper>

### Form field

A single ToggleSwitch or group of ToggleSwitches can be wrapped in the Field component to add
features like a semantic label, description and help text, validation messages, and more. See the
[Field](./field.md) page for more information.

When building a ToggleSwitch field, **always set `isFieldset` to `true`**, even for a single
ToggleSwitch, to ensure proper accessibility support.

<cdx-demo-wrapper>
<template v-slot:demo>
	<switch-group-field />
</template>

<template v-slot:code>

<<< @/../component-demos/toggle-switch/examples/SwitchGroupField.vue

</template>
</cdx-demo-wrapper>

## CSS-only version

### Markup structure

<cdx-demo-wrapper>
<template v-slot:demo>
	<!-- Wrapper <span>. -->
	<span class="cdx-toggle-switch">
		<!-- <label> with for attribute matching input ID. -->
		<label for="cdx-toggle-switch-11" class="cdx-toggle-switch__label">
			Label
		</label>
		<!-- <span> that wraps the input and visible switch. -->
		<span class="cdx-toggle-switch__input-wrapper">
			<!-- <input> with type="checkbox" and ID. -->
			<input id="cdx-toggle-switch-11" class="cdx-toggle-switch__input" type="checkbox">
			<!-- <span> elements that will be styled to look like the toggle switch. -->
			<span class="cdx-toggle-switch__switch">
				<span class="cdx-toggle-switch__switch__grip"></span>
			</span>
		</span>
	</span>
</template>
<template v-slot:code>

```html
<!-- Wrapper <span>. -->
<span class="cdx-toggle-switch">
	<!-- <label> with for attribute matching input ID. -->
	<label for="cdx-toggle-switch-11" class="cdx-toggle-switch__label">
		Label
	</label>
	<!-- <span> that wraps the input and visible switch. -->
	<span class="cdx-toggle-switch__input-wrapper">
		<!-- <input> with type="checkbox" and ID. -->
		<input id="cdx-toggle-switch-11" class="cdx-toggle-switch__input" type="checkbox">
		<!-- <span> elements that will be styled to look like the toggle switch. -->
		<span class="cdx-toggle-switch__switch">
			<span class="cdx-toggle-switch__switch__grip"></span>
		</span>
	</span>
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
		<label for="cdx-toggle-switch-12" class="cdx-toggle-switch__label">
			Initially on
		</label>
		<span class="cdx-toggle-switch__input-wrapper">
			<input id="cdx-toggle-switch-12" class="cdx-toggle-switch__input" type="checkbox" checked>
			<span class="cdx-toggle-switch__switch">
				<span class="cdx-toggle-switch__switch__grip"></span>
			</span>
		</span>
	</span>
</template>
<template v-slot:code>

```html
<span class="cdx-toggle-switch">
	<label for="cdx-toggle-switch-12" class="cdx-toggle-switch__label">
		Initially on
	</label>
	<span class="cdx-toggle-switch__input-wrapper">
		<input id="cdx-toggle-switch-12" class="cdx-toggle-switch__input" type="checkbox" checked>
		<span class="cdx-toggle-switch__switch">
			<span class="cdx-toggle-switch__switch__grip"></span>
		</span>
	</span>
</span>
```

</template>
</cdx-demo-wrapper>

### Disabled

To disable the toggle switch, add the `disabled` attribute to the `<input>` element.

<cdx-demo-wrapper>
<template v-slot:demo>
	<div class="cdx-docs-disabled-switches">
		<div>
			<span class="cdx-toggle-switch">
				<label for="cdx-toggle-switch-14" class="cdx-toggle-switch__label">
					Disabled, off
				</label>
				<span class="cdx-toggle-switch__input-wrapper">
					<input id="cdx-toggle-switch-14" class="cdx-toggle-switch__input" type="checkbox" disabled>
					<span class="cdx-toggle-switch__switch">
						<span class="cdx-toggle-switch__switch__grip"></span>
					</span>
				</span>
			</span>
		</div>
		<div>
			<span class="cdx-toggle-switch">
				<label for="cdx-toggle-switch-15" class="cdx-toggle-switch__label">
					Disabled, on
				</label>
				<span class="cdx-toggle-switch__input-wrapper">
					<input id="cdx-toggle-switch-15" class="cdx-toggle-switch__input" type="checkbox" checked disabled>
					<span class="cdx-toggle-switch__switch">
						<span class="cdx-toggle-switch__switch__grip"></span>
					</span>
				</span>
			</span>
		</div>
	</div>
</template>
<template v-slot:code>

```html
<div>
	<span class="cdx-toggle-switch">
		<label for="cdx-toggle-switch-14" class="cdx-toggle-switch__label">
			Disabled, off
		</label>
		<span class="cdx-toggle-switch__input-wrapper">
			<input id="cdx-toggle-switch-14" class="cdx-toggle-switch__input" type="checkbox" disabled>
			<span class="cdx-toggle-switch__switch">
				<span class="cdx-toggle-switch__switch__grip"></span>
			</span>
		</span>
	</span>
</div>
<div>
	<span class="cdx-toggle-switch">
		<label for="cdx-toggle-switch-15" class="cdx-toggle-switch__label">
			Disabled, on
		</label>
		<span class="cdx-toggle-switch__input-wrapper">
			<input id="cdx-toggle-switch-15" class="cdx-toggle-switch__input" type="checkbox" checked disabled>
			<span class="cdx-toggle-switch__switch">
				<span class="cdx-toggle-switch__switch__grip"></span>
			</span>
		</span>
	</span>
</div>
```

</template>
</cdx-demo-wrapper>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-demo-wrapper {
	.cdx-docs-disabled-switches {
		div:first-child {
			margin-bottom: @spacing-100;
		}
	}
}
</style>

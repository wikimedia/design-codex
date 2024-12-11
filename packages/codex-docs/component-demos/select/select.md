<script setup>
import { CdxAccordion } from '@wikimedia/codex';
import BasicSelect from '@/../component-demos/select/examples/BasicSelect.vue';
import SelectCustomLabel from '@/../component-demos/select/examples/SelectCustomLabel.vue';
import SelectWithIcons from '@/../component-demos/select/examples/SelectWithIcons.vue';
import SelectWithMenuGroups from '@/../component-demos/select/examples/SelectWithMenuGroups.vue';
import SelectConfigurable from '@/../component-demos/select/examples/SelectConfigurable.vue';
import SelectField from '@/../component-demos/select/examples/SelectField.vue';

const controlsConfig = [
	{
		name: 'disabled',
		type: 'boolean'
	},
	{
		name: 'defaultLabel',
		type: 'text',
		default: 'Choose an option'
	},
	{
		name: 'defaultIcon',
		type: 'icon'
	},
	{
		name: 'status',
		type: 'radio',
		options: [ 'default', 'error' ],
	},
];
</script>

A Select is an input with a dropdown menu of predefined, selectable options.

<cdx-demo-wrapper :controls-config="controlsConfig" :show-generated-code="true">
<template v-slot:demo="{ propValues }">
	<select-configurable v-bind="propValues" />
</template>
</cdx-demo-wrapper>

## Overview

### When to use Select

Use the Select component when users need to choose an option from a short, predefined
list.

**When not to use:**
- If the list of options is too long, consider using [Lookup](./lookup.md) instead.
- If users need to be able to select multiple options, use a [Checkbox group](./checkbox.md#checkbox-group) (for a short list of options) or [MultiselectLookup](./multiselect-lookup.md) (for a long list).
- If users need to be able to select a predefined option or enter their own custom value, use [Combobox](./combobox.md).

### About Select

Select includes the following elements.

#### Default icon (optional)

A default icon can be included alongside the default label to visually enhance the Select's purpose.

<cdx-demo-best-practices>
<cdx-demo-best-practice>Use a simple icon that is easily understandable to users.</cdx-demo-best-practice>
<cdx-demo-best-practice>Include an icon when the menu items also contain icons.</cdx-demo-best-practice>
</cdx-demo-best-practices>

#### Label

The Select will display the label of its selected item. If nothing is selected, a default label can
be displayed.

<cdx-demo-best-practices>
<cdx-demo-best-practice>

The default label text should clearly indicate the kinds of options that follow. [*Clear*](../../style-guide/writing-for-copy.html#is-this-clear) & [*Trustworthy*](../../style-guide/writing-for-copy.html#is-this-trustworthy)

</cdx-demo-best-practice>
<cdx-demo-best-practice type="dont">

Don't make the default label a part of a sentence that is completed by the options. [*Translatable*](../../style-guide/writing-for-copy.html#is-this-translatable)

</cdx-demo-best-practice>
</cdx-demo-best-practices>

#### Menu

When the Select is open, a [Menu with options](./menu.md) is displayed. These options can use all
the features of the [MenuItem](./menu-item.md) component.

<cdx-demo-best-practices>
<cdx-demo-best-practice>2–5 menu items are recommended for optimal usability.</cdx-demo-best-practice>
<cdx-demo-best-practice>When there are more items, consider setting a visible item limit to enable scrolling.</cdx-demo-best-practice>
</cdx-demo-best-practices>

## Examples

### Basic usage

Menu items must have a value, and can have a label that gets output in the Select component. If no
label is provided (like the third menu item in this example), the value will be displayed.

<cdx-demo-wrapper :force-reset="true">
<template v-slot:demo>
	<basic-select />
</template>
<template v-slot:code>

:::code-group

<<< @/../component-demos/select/examples/BasicSelect.vue [NPM]

<<< @/../component-demos/select/examples-mw/BasicSelect.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

### With icons

The `defaultLabel` and `menuItems` can have icons.

<cdx-demo-wrapper :force-reset="true">
<template v-slot:demo>
	<select-with-icons />
</template>
<template v-slot:code>

:::code-group

<<< @/../component-demos/select/examples/SelectWithIcons.vue [NPM]

<<< @/../component-demos/select/examples-mw/SelectWithIcons.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

### With custom label display

You can customize how the label of the selected item appears.

<cdx-demo-wrapper :force-reset="true">
<template v-slot:demo>
	<select-custom-label />
</template>
<template v-slot:code>

:::code-group

<<< @/../component-demos/select/examples/SelectCustomLabel.vue [NPM]

<<< @/../component-demos/select/examples-mw/SelectCustomLabel.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

<cdx-accordion>
<template #title>Developer notes</template>

The `label` scoped slot enables you to customize the display of the label, with
bindings for the `selectedMenuItem` and the `defaultLabel`.

</cdx-accordion>

### With menu groups

You can group `menuItems` to improve organization. Groups can be customized to add a description or
an icon.

<cdx-demo-wrapper :force-reset="true">
<template v-slot:demo>
	<select-with-menu-groups />
</template>
<template v-slot:code>

:::code-group

<<< @/../component-demos/select/examples/SelectWithMenuGroups.vue [NPM]

<<< @/../component-demos/select/examples-mw/SelectWithMenuGroups.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

<cdx-accordion>
<template #title>Developer notes</template>

You can add optgroup-like groupings within the Select via the `menuItems` prop. Refer to the
[MenuGroupData type](../types-and-constants.md#menugroupdata) for more information about the
configuration options for each menu group.

</cdx-accordion>

### Form field

A Select can be wrapped in the Field component to add features like a semantic label, description
and help text, validation messages, and more. Refer to the [Field](./field.md) page for more
information.

<cdx-demo-wrapper>
<template v-slot:demo>
	<select-field />
</template>
<template v-slot:code>

:::code-group

<<< @/../component-demos/select/examples/SelectField.vue [NPM]

<<< @/../component-demos/select/examples-mw/SelectField.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

### Other features

The Select component has an internal Menu. You can use the following features from Menu in the Select component:
- [Custom menu item display](./menu.html#with-custom-menu-item-display)
- [Limited height with scrolling](./menu.html#with-scrolling-enabled)
- [Menu groups](./menu.html#with-menu-groups) (demonstrated above)

## Technical implementation

### Vue usage

Menu items are provided as an array of MenuItemData types, and `v-model` is used to bind the current
selection's value.

### CSS-only version

#### Markup structure

The CSS-only version of this component uses the native `<select>` element. This element will be
styled to match the Vue version, but the menu will use native browser styles.

<cdx-demo-wrapper>
<template v-slot:demo>
	<select class="cdx-select">
		<option value="">Choose an option</option>
		<option value="a">Option A</option>
		<option value="b">Option B</option>
		<option value="c">Option C</option>
		<option value="d" disabled>Option D</option>
		<optgroup label="Other options">
			<option value="e">Option E</option>
			<option value="f">Option F</option>
		</optgroup>
	</select>
</template>
<template v-slot:code>

```html
<!-- The CSS-only version uses the `<select>` element. -->
<select class="cdx-select">
	<!-- Use <option> and <optgroup> elements as needed. -->
	<option value="">Choose an option</option>
	<option value="a">Option A</option>
	<option value="b">Option B</option>
	<option value="c">Option C</option>
	<!-- You can disable options by applying the `disabled` attribute. -->
	<option value="d" disabled>Option D</option>
	<optgroup label="Other options">
		<option value="e">Option E</option>
		<option value="f">Option F</option>
	</optgroup>
</select>
```

</template>
</cdx-demo-wrapper>

#### Disabled

Add the `disabled` attribute to the `<select>` element to get a disabled element with appropriate
styles.

<cdx-demo-wrapper>
<template v-slot:demo>
	<select class="cdx-select" disabled>
		<option value="">Choose an option</option>
		<option value="a">Option A</option>
		<option value="b">Option B</option>
		<option value="c">Option C</option>
		<option value="d" disabled>Option D</option>
	</select>
</template>
<template v-slot:code>

```html
<select class="cdx-select" disabled>
	<option value="">Choose an option</option>
	<option value="a">Option A</option>
	<option value="b">Option B</option>
	<option value="c">Option C</option>
	<option value="d" disabled>Option D</option>
</select>
```

</template>
</cdx-demo-wrapper>

### Keyboard navigation

| Key | Function |
| -- | -- |
| <kbd>Down arrow</kbd> | When the focus is placed on the input, it opens the menu. When the menu is open, it navigates through menu options. If pressed at the last visible option, it scrolls to the next "hidden" menu item. |
| <kbd>Up arrow</kbd> | When the focus is placed on the input, it opens the menu. When the menu is open, it navigates through menu options. |
| <kbd>Enter</kbd> | It expands and collapses the menu when the focus is placed on the Select. If the focus is placed in any of the options within the menu, the focused option is selected. |
| <kbd>Esc</kbd> | This key closes the menu when it is open. |
| <kbd>Home</kbd> | Optionally, it moves the focus to the first option. Optionally, in a single-select listbox, selection may also move with focus. Supporting this key is strongly recommended for lists with more than five options. |
| <kbd>End</kbd> | Optionally, it moves the focus to the last option. Optionally, in a single-select listbox, selection may also move with focus. Supporting this key is strongly recommended for lists with more than five options. |

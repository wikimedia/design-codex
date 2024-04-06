<script setup>
import BasicSelect from '@/../component-demos/select/examples/BasicSelect.vue';
import SelectCustomLabel from '@/../component-demos/select/examples/SelectCustomLabel.vue';
import SelectComplexMenuItem from '@/../component-demos/select/examples/SelectComplexMenuItem.vue';
import SelectCustomMenuItem from '@/../component-demos/select/examples/SelectCustomMenuItem.vue';
import SelectWithScroll from '@/../component-demos/select/examples/SelectWithScroll.vue';
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

A Select is an input with a dropdown [menu](./menu.md) of predefined, selectable items.

## Guidelines

### Using selects

Selects must feature a label stating the current selection and a menu of at least two, but
preferably three or more, options.

Use the Select component when users need to choose an option from a predefined
list. For example, to select a country or category. If the list of options is
too long, consider using [Combobox](./combobox.md) instead. If users need a
multi-selection, use a [Checkbox group](./checkbox.md#checkbox-group) instead.

### Specifications

![Specification of Select.](../../assets/components/select-specifications.svg)

1. **Icon** (optional)<br>
An icon can simplify the identification of the available options in selects.
2. **Label**<br>
Dropdown labels communicate what selections the component conveys. Labels are required for selects.
3. **Arrow indicator**<br>
Selects have a button-like appearance, and include a mandatory arrow indicator to communicate that
they can be expanded.
4. **Menu**<br>
When the select is open, a [menu with options](./menu.md) is displayed.

The base min-width for the Select component is set at `@size-1600` (equivalent to `256px` in the default Codex theme), but it can be customized to a smaller width if needed. There is no maximum width limit.

The Select menu must contain a minimum of 2 items. While the number of visible options can vary, we recommend around 5 for optimal usability. If there are more options than what's initially visible, a scrollbar will appear for users to access them.

Refer to the [Select component in Codex Figma](https://www.figma.com/file/KoDuJMadWBXtsOtzGS4134/%E2%9D%96-Codex-components?type=design&node-id=2319-6630&mode=design&t=7wyBmhfdJTJevQmT-11).

### Interaction states

Selects have the following visually separate states:

![States of the Select component: default, hover, focus, error, disabled, active, and filled with one option selected from the dropdown menu.](../../assets/components/select-interaction-states.svg)

<div class="cdx-docs-multi-column cdx-docs-multi-columns-2">

1. Default
2. Hover
3. Focus
4. Error
5. Disabled
6. Active select with menu displayed
7. Active select and hover on one of the menu options
8. Active select and one of the menu options being pressed
9. Active select with one of the menu options selected
10. Filled (with one option from the menu selected)

</div>

::: tip Accessibility note
The disabled state does not meet our minimum color contrast rules. WCAG 2.1
states that “…part[s] of an inactive user interface component […] have no contrast requirement”.
<sup>[[1]](#ref1)</sup><br>
Provide sufficient information in a disabled element's context, so the user can understand what is
disabled and how to enable it (if applicable).
:::

### Best practices

Consider the following recommendations when using selects.

#### Icon

<cdx-demo-rules>

<template #do-media>

![Select featuring a start icon, as the menu it displays utilizes start icons for its menu items.](../../assets/components/select-best-practices-icon-do.svg)

</template>

<template #do-text>

- Include the start icon in the Select if the selected menu item contains an icon, which is then displayed in the Select.

</template>

<template #dont-media>

![Select incorrectly using a start icon in its default state.](../../assets/components/select-best-practices-icon-dont.svg)

</template>

<template #dont-text>

- Include a start icon in the Select component by default unless a menu item with an icon has been selected.

</template>

</cdx-demo-rules>

### Content

Select text introduces the options available in a drop-down menu.

<cdx-demo-rules>
<template #do-media>

![Selects conveying examples of clear placeholder text.](../../assets/components/select-content-do.svg)

</template>
<template #do-text>

- Indicate clearly the kinds of options that follow. [*Clear*](../../style-guide/writing-for-copy.html#is-this-clear) & [*Trustworthy*](../../style-guide/writing-for-copy.html#is-this-trustworthy)

</template>
<template #dont-media>

![Selects conveying examples of vague placeholder text.](../../assets/components/select-content-dont.svg)

</template>
<template #dont-text>

- Make the select label vague or generic. [*Clear*](../../style-guide/writing-for-copy.html#is-this-clear) & [*Trustworthy*](../../style-guide/writing-for-copy.html#is-this-trustworthy)
- Write a part of a sentence that is completed by the choices. [*Translatable*](../../style-guide/writing-for-copy.html#is-this-translatable)

</template>
</cdx-demo-rules>

### References

1. <span id="ref1">[Web Content Accessibility Guidelines (WCAG) 2.1 – Success Criterion 1.4.3 Contrast (Minimum)](https://www.w3.org/TR/WCAG21/#contrast-minimum)</span>

## Demos

### Configurable

<cdx-demo-wrapper :controls-config="controlsConfig" :show-generated-code="true">
<template v-slot:demo="{ propValues }">
	<select-configurable v-bind="propValues" />
</template>
</cdx-demo-wrapper>

### Basic Usage

Menu items must have a value, and can have a label to display in the UI. If no
label is provided (like the third menu item in this example), the value will be
displayed.

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

### With menu item icons and descriptions

Items are displayed via the MenuItem component—see the [MenuItem docs](./menu-item) for more
options. In this example, a `menuConfig` object is passed to the Select to bold the label text and
hide the text overflow of the descriptions.

<cdx-demo-wrapper :force-reset="true">
<template v-slot:demo>
	<select-complex-menu-item />
</template>
<template v-slot:code>

:::code-group

<<< @/../component-demos/select/examples/SelectComplexMenuItem.vue [NPM]

<<< @/../component-demos/select/examples-mw/SelectComplexMenuItem.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

### With custom menu item display

The `menu-item` scoped slot enables you to customize the display of each menu item, with a binding
for the `menuItem`. In this example, only the menu item's icon is displayed in the menu.

<cdx-demo-wrapper :force-reset="true">
<template v-slot:demo>
	<select-custom-menu-item />
</template>
<template v-slot:code>

:::code-group

<<< @/../component-demos/select/examples/SelectCustomMenuItem.vue [NPM]

<<< @/../component-demos/select/examples-mw/SelectCustomMenuItem.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

### With custom label display

The `label` scoped slot enables you to customize the display of the label, with
bindings for the `selectedMenuItem` and the `defaultLabel`.

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

### With configurable scroll

By default, all menu items are displayed when the menu is expanded. To limit the height of the menu
and enable scrolling, use the `visibleItemLimit` property of the `menuConfig` prop.

<cdx-demo-wrapper :force-reset="true">
<template v-slot:demo>
	<select-with-scroll />
</template>
<template v-slot:code>

:::code-group

<<< @/../component-demos/select/examples/SelectWithScroll.vue [NPM]

<<< @/../component-demos/select/examples-mw/SelectWithScroll.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

### Form field

A Select can be wrapped in the Field component to add features like a semantic label, description
and help text, validation messages, and more. See the [Field](./field.md) page for more information.

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

## Vue usage

Menu items are provided as an array of MenuItemData types, and `v-model` is used to bind the current
selection's value.

## CSS-only version

### Markup structure

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

### Disabled

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

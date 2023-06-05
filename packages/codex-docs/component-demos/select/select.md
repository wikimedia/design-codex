<script setup>
import BasicSelect from '@/../component-demos/select/examples/BasicSelect.vue';
import SelectCustomLabel from '@/../component-demos/select/examples/SelectCustomLabel.vue';
import SelectComplexMenuItem from '@/../component-demos/select/examples/SelectComplexMenuItem.vue';
import SelectCustomMenuItem from '@/../component-demos/select/examples/SelectCustomMenuItem.vue';
import SelectWithScroll from '@/../component-demos/select/examples/SelectWithScroll.vue';
import SelectConfigurable from '@/../component-demos/select/examples/SelectConfigurable.vue';

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

<<< @/../component-demos/select/examples/BasicSelect.vue

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

<<< @/../component-demos/select/examples/SelectComplexMenuItem.vue

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

<<< @/../component-demos/select/examples/SelectCustomMenuItem.vue

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

<<< @/../component-demos/select/examples/SelectCustomLabel.vue

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

<<< @/../component-demos/select/examples/SelectWithScroll.vue

</template>
</cdx-demo-wrapper>

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

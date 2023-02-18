<script setup>
import { CdxButton } from '@wikimedia/codex';
import ButtonWithIcon from '@/../component-demos/button/examples/ButtonWithIcon.vue';
import QuietButtonWithIcon from '@/../component-demos/button/examples/QuietButtonWithIcon.vue';
import IconOnlyButton from '@/../component-demos/button/examples/IconOnlyButton.vue';
import QuietIconOnlyButton from '@/../component-demos/button/examples/QuietIconOnlyButton.vue';

const controlsConfig = [
	{
		name: 'action',
		type: 'radio',
		options: [ 'default', 'progressive', 'destructive' ],
	},
	{
		name: 'weight',
		type: 'radio',
		options: [ 'normal', 'primary', 'quiet' ],
	},
	{
		name: 'disabled',
		type: 'boolean'
	},
	{
		name: 'default',
		type: 'slot',
		default: 'Click me'
	}
];
</script>

## Demos

### Configurable

<cdx-demo-wrapper :controls-config="controlsConfig" :show-generated-code="true">
<template v-slot:demo="{ propValues, slotValues }">
	<cdx-button v-bind="propValues">
		{{ slotValues.default }}
	</cdx-button>
</template>
</cdx-demo-wrapper>

### Default

<cdx-demo-wrapper>
<template v-slot:demo>
	<cdx-button>Click me</cdx-button>
</template>

<template v-slot:code>

```vue-html
<cdx-button>Click me</cdx-button>
```

</template>
</cdx-demo-wrapper>

### Button actions

There are three button actions: default, progressive, and destructive.

<cdx-demo-wrapper>
<template v-slot:demo>
	<div>
		<cdx-button>Default button</cdx-button>
	</div>
	<div>
		<cdx-button action="progressive">Progressive button</cdx-button>
	</div>
	<div>
		<cdx-button action="destructive">Destructive button</cdx-button>
	</div>
</template>

<template v-slot:code>

```vue-html
<div>
	<cdx-button>Default button</cdx-button>
</div>
<div>
	<cdx-button action="progressive">Progressive button</cdx-button>
</div>
<div>
	<cdx-button action="destructive">Destructive button</cdx-button>
</div>
```

</template>
</cdx-demo-wrapper>

### Button weights

There are three button weights: normal, primary, and quiet.

<cdx-demo-wrapper>
<template v-slot:demo>
	<div>
		<cdx-button action="progressive">
			Normal progressive button
		</cdx-button>
	</div>
	<div>
		<cdx-button action="progressive" weight="primary">
			Primary progressive button
		</cdx-button>
	</div>
	<div>
		<cdx-button action="progressive" weight="quiet">
			Quiet progressive button
		</cdx-button>
	</div>
</template>

<template v-slot:code>

```vue-html
<div>
	<cdx-button action="progressive">
		Normal progressive button
	</cdx-button>
</div>
<div>
	<cdx-button action="progressive" weight="primary">
		Primary progressive button
	</cdx-button>
</div>
<div>
	<cdx-button action="progressive" weight="quiet">
		Quiet progressive button
	</cdx-button>
</div>
```

</template>
</cdx-demo-wrapper>

### Disabled

Add the `disabled` attribute for a disabled button.

<cdx-demo-wrapper>
<template v-slot:demo>
	<cdx-button disabled>Disabled button</cdx-button>
</template>

<template v-slot:code>

```vue-html
<cdx-button disabled>Disabled button</cdx-button>
```

</template>
</cdx-demo-wrapper>

### With icon

<cdx-demo-wrapper>
<template v-slot:demo>
<button-with-icon />
</template>

<template v-slot:code>

<<< @/../component-demos/button/examples/ButtonWithIcon.vue

</template>
</cdx-demo-wrapper>

<cdx-demo-wrapper>
<template v-slot:demo>
<quiet-button-with-icon />
</template>

<template v-slot:code>

<<< @/../component-demos/button/examples/QuietButtonWithIcon.vue

</template>
</cdx-demo-wrapper>

### Icon-only button

::: warning
Due to the lack of descriptive text, icon-only buttons require one of the following attributes: `aria-label` or `aria-hidden`.

The attribute `aria-label` has to be used on icon-only buttons to be understandable by screen reader users. Exceptions are buttons in component combinations, e.g. the button in the [Combobox component](./combobox), that are skipped by adding `aria-hidden` without negatively impacting the component's functionality.
:::

<cdx-demo-wrapper>
<template v-slot:demo>
<icon-only-button />
</template>

<template v-slot:code>

<<< @/../component-demos/button/examples/IconOnlyButton.vue

</template>
</cdx-demo-wrapper>

<cdx-demo-wrapper>
<template v-slot:demo>
<quiet-icon-only-button />
</template>

<template v-slot:code>

<<< @/../component-demos/button/examples/QuietIconOnlyButton.vue

</template>
</cdx-demo-wrapper>

## CSS-only version

### Markup structure

The CSS Button component uses the `<button>` element and the `.cdx-button` class.

<cdx-demo-wrapper>
<template v-slot:demo>
	<button class="cdx-button">Click me</button>
</template>
<template v-slot:code>

```html
<!-- Button element with CSS class(es). -->
<button class="cdx-button">Click me</button>
```

</template>
</cdx-demo-wrapper>

### Button actions

There are three button actions: default, progressive, and destructive. Use the following classes to
apply these actions:
- Default: `cdx-button--action-default` (class can be omitted since this is the default)
- Progressive: `cdx-button--action-progressive`
- Destructive: `cdx-button--action-destructive`

<cdx-demo-wrapper>
<template v-slot:demo>
	<div>
		<button class="cdx-button cdx-button--action-default">Default button</button>
	</div>
	<div>
		<button class="cdx-button cdx-button--action-progressive">Progressive button</button>
	</div>
	<div>
		<button class="cdx-button cdx-button--action-destructive">Destructive button</button>
	</div>
</template>
<template v-slot:code>

```html
	<div>
		<button class="cdx-button cdx-button--action-default">Default button</button>
	</div>
	<div>
		<button class="cdx-button cdx-button--action-progressive">Progressive button</button>
	</div>
	<div>
		<button class="cdx-button cdx-button--action-destructive">Destructive button</button>
	</div>
```

</template>
</cdx-demo-wrapper>

### Button weights

There are three button weights: normal, primary, and quiet. Use the following classes to
apply these actions:
- Normal: `cdx-button--weight-normal` (class can be omitted since this is the default)
- Primary: `cdx-button--weight-primary`
- Quiet: `cdx-button--weight-quiet`

<cdx-demo-wrapper>
<template v-slot:demo>
	<div>
		<button class="cdx-button cdx-button--action-progressive">Normal progressive button</button>
	</div>
	<div>
		<button class="cdx-button cdx-button--action-progressive cdx-button--weight-primary">Primary progressive button</button>
	</div>
	<div>
		<button class="cdx-button cdx-button--action-progressive cdx-button--weight-quiet">Quiet progressive button</button>
	</div>
</template>
<template v-slot:code>

```html
<div>
	<button class="cdx-button cdx-button--action-progressive">Progressive normal button</button>
</div>
<div>
	<button class="cdx-button cdx-button--action-progressive cdx-button--weight-primary">Progressive primary button</button>
</div>
<div>
	<button class="cdx-button cdx-button--action-progressive cdx-button--weight-quiet">Progressive quiet button</button>
</div>
```

</template>
</cdx-demo-wrapper>

### Disabled

Add the `disabled` attribute to the `<button>` element to get a disabled element with appropriate
styles.

<cdx-demo-wrapper>
<template v-slot:demo>
	<button class="cdx-button" disabled>Disabled button</button>
</template>
<template v-slot:code>

```html
<button class="cdx-button" disabled>Disabled button</button>
```

</template>
</cdx-demo-wrapper>

### With CSS icon

You can use [CSS icons](./icon.md#css-only-version) within button content. To set up an icon within
a CSS-only button, do the following:

1. Add an empty span inside the button before the label with the class `cdx-button__icon`.
2. Use the `.cdx-mixin-css-icon()` mixin with the `@param-is-button-icon` parameter set to `true`.

Note that in Firefox version 52 and below, full color support for icons inside CSS-only buttons is
not available, and the icon will fall back to a single color.

:::warning
Be sure to add `aria-hidden="true"` to the icon element to hide it from screen readers.
:::

<cdx-demo-wrapper>
<template v-slot:demo>
	<button class="cdx-button">
		<span class="cdx-button__icon cdx-demo-css-icon--arrow-previous" aria-hidden="true"></span>
		Go back
	</button>
</template>
<template v-slot:code>

```html
<button class="cdx-button">
	<span class="cdx-button__icon cdx-demo-css-icon--arrow-previous" aria-hidden="true"></span>
	Go back
</button>
```

```less
// Note: you must import the design tokens before importing the css-icon mixin
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';
@import ( reference ) '@wikimedia/codex/mixins/css-icon.less';

.cdx-demo-css-icon--arrow-previous {
	.cdx-mixin-css-icon( @cdx-icon-arrow-previous, @param-is-button-icon: true );
}
```

</template>
</cdx-demo-wrapper>

### Icon-only button

Add the `cdx-button--icon-only` class for an icon-only button.

:::warning
Be sure to add an `aria-label` attribute to the button element so it can be understandable to screen
reader users.
:::

<cdx-demo-wrapper>
<template v-slot:demo>
	<button class="cdx-button cdx-button--icon-only" aria-label="Back">
		<span class="cdx-button__icon cdx-demo-css-icon cdx-demo-css-icon--arrow-previous"></span>
	</button>
</template>
<template v-slot:code>

```html
<button class="cdx-button cdx-button--icon-only" aria-label="Back">
	<span class="cdx-button__icon cdx-demo-css-icon cdx-demo-css-icon--arrow-previous"></span>
</button>
```

```less
// Note: you must import the design tokens before importing the css-icon mixin
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';
@import ( reference ) '@wikimedia/codex/mixins/css-icon.less';

.cdx-demo-css-icon--arrow-previous {
	.cdx-mixin-css-icon( @cdx-icon-arrow-previous, @param-is-button-icon: true );
}
```

</template>
</cdx-demo-wrapper>

<style lang="less" scoped>
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-demo-wrapper {
	:deep( .cdx-demo-wrapper__demo-pane__demo > div ) {
		margin-bottom: @spacing-100;
	}
}
</style>

<style lang="less">
// Note: you must import the design tokens before importing the css-icon mixin
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';
@import ( reference ) '@wikimedia/codex/mixins/css-icon.less';

// Note that these styles can't be scoped. If they are, a data attribute is added to their
// selectors, which increases specificity.
.cdx-demo-css-icon--arrow-previous {
	.cdx-mixin-css-icon( @cdx-icon-arrow-previous, @param-is-button-icon: true );
}
</style>

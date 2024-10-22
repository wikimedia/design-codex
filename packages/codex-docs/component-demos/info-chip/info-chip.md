<script setup>
import ChipWithIcon from '@/../component-demos/info-chip/examples/ChipWithIcon.vue';
import ChipWithLongText from '@/../component-demos/info-chip/examples/ChipWithLongText.vue';
import { CdxInfoChip } from '@wikimedia/codex';

const controlsConfig = [
	{
		name: 'icon',
		type: 'icon'
	},
	{
		name: 'status',
		type: 'radio',
		options: [ 'notice', 'warning', 'error', 'success' ],
	},
	{
		name: 'default',
		type: 'slot',
		default: 'Info Chip'
	}
];
</script>

An InfoChip is a non-interactive item that provides information.

## Guidelines

### When to use info chips
Use the InfoChip component to label, categorize, or organize information using keywords. It can be also used to provide success, warning or error feedback to the user.

This type of chip is just informative so it cannot be clickable or removable.

### Specifications
![Specification of InfoChip.](../../assets/components/info-chip-specifications.svg)

Info chips may contain the following items:
1. **Icon** (optional)<br>You can include a starting icon to visually convey the label. For notice chips, this icon is optional, while for chips providing feedback (error, warning, and success chips), the icon is required to communicate the feedback status effectively.
2. **Label**<br>Descriptive text about the chip.

#### Component limitations

The InfoChip label should be kept concise. It's limited to one line of text, and if it exceeds this limit, it will be truncated with an ellipsis, with no text wrapping.

By default, the InfoChip's width dynamically adjusts based on the length of the text. However, for consistency when grouping similar chips, the width of these chips can also be set to a fixed value, if required.

<div class="cdx-docs-grid cdx-docs-grid-columns-2">
	<img src="../../assets/components/info-chip-specifications-length.svg" alt="Example of chips with short text and fixed width.">
	<img src="../../assets/components/info-chip-specifications-fixed-width.svg" alt="Chips with long text whose length grows with the chip's text.">
</div>

### Types

![Types of chip based on its feedback status: notice, success, warning and error.](../../assets/components/info-chip-types.svg)

InfoChip works as an informative element, with its default type being "notice." In addition to this, the chip can offer user feedback by including icons and colors associated with success, warning, or error statuses.

#### Notice chip
As the notice chip solely conveys information without offering user feedback, its icon serves to emphasize the chip's label in a decorative manner. Any icon can be used, or it can be omitted as needed.

![Example of notice chips with and without start icons.](../../assets/components/info-chip-types-notice.svg)

#### Success, warning, and error chips
Conversely, in chips that offer user feedback (success, warning, and error chips), both the icon and its associated feedback color are essential for conveying meaning and feedback effectively to users. Therefore, these icons cannot be replaced or removed.

![Example of a success, warning, and error chip.](../../assets/components/info-chip-types-feedback.svg)

Refer to the [InfoChip component in Codex Figma](https://www.figma.com/file/KoDuJMadWBXtsOtzGS4134/%E2%9D%96-Codex-components?type=design&node-id=8952-74698&mode=design&t=2O0ceqiRfqCtnidq-11).

### Interaction states
InfoChip is purely informative so it only uses the `default` state.

### Best practices

Consider the following recommendations when using info chips.

#### Usage

<cdx-demo-rules>

<template #do-media>

![Two accordions with an InfoChip adjacent to their labels.](../../assets/components/info-chip-practices-usage-do.svg)

</template>

<template #do-text>

- Use InfoChip to provide additional information within other components like [Accordion](./accordion.md).

</template>

<template #dont-media>

![Standalone InfoChip within a Wikipedia article.](../../assets/components/info-chip-practices-usage-dont.svg)

</template>

<template #dont-text>

- Use InfoChip as a standalone chip on a page.

</template>

</cdx-demo-rules>

#### Notice chips

<cdx-demo-rules>

<template #do-media>

![A group of three Notice InfoChips displaying icons, and another group of three notice InfoChips with text only.](../../assets/components/info-chip-practices-icon-notice-do.svg)

</template>

<template #do-text>

- Utilize the start icon in notice chips when needed to strengthen the text, or hide it if not required.
- Replace the Notice icon with any other that complements the chip's meaning.

</template>

<template #dont-media>

![A group of three notice InfoChips displaying complex icons, and another group of three notice InfoChips displaying an icon just in the first chip.](../../assets/components/info-chip-practices-icon-notice-dont.svg)

</template>

<template #dont-text>

- Use icons with complex meanings to prevent user confusion and frustration.
- Use icons selectively within a group of chips.

</template>

</cdx-demo-rules>

#### Success, warning, and error chips

<cdx-demo-rules>

<template #do-media>

![A group of success, warning, and error InfoChips displaying their respective status icons.](../../assets/components/info-chip-practices-icon-feedback-do.svg)

</template>

<template #do-text>

- Use the designated feedback icons for success, warning, and wrror chips.
- Customize the label if needed.

</template>

<template #dont-media>

![A group of success, warning, and error InfoChips without icons, and another group with custom icons.](../../assets/components/info-chip-practices-icon-feedback-dont.svg)

</template>

<template #dont-text>

- Remove the icon in success, warning, and error chips, as it is crucial for indicating their statuses.
- Replace the icon in success, warning, and error chips, as it reinforces the meaning of their respective statuses.

</template>

</cdx-demo-rules>

## Demos

### Configurable

<cdx-demo-wrapper :controls-config="controlsConfig" :show-generated-code="true">

<template v-slot:demo="{ propValues, slotValues }" :show-generated-code="true">
	<cdx-info-chip v-bind="propValues">
		{{ slotValues.default }}
	</cdx-info-chip>
</template>

</cdx-demo-wrapper>

### Default, with icon
Custom icons can only be used with the `notice` status. If they are passed with
a different status, they will be ignored.

<cdx-demo-wrapper>
<template v-slot:demo>
	<chip-with-icon />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/info-chip/examples/ChipWithIcon.vue [NPM]

<<< @/../component-demos/info-chip/examples-mw/ChipWithIcon.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

### Long Text
It is generally best practice to use short text with the InfoChip. Long text
content will be truncated with an ellipsis and lines will not be wrapped.

<cdx-demo-wrapper>
<template v-slot:demo>
	<chip-with-long-text />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/info-chip/examples/ChipWithLongText.vue [NPM]

<<< @/../component-demos/info-chip/examples-mw/ChipWithLongText.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

## Vue usage

## CSS-only version

### Markup structure

#### Text only

A simple chip with text content and no icon is straightforward.

<cdx-demo-wrapper>
<template v-slot:demo>
	<!-- Outer element is a <div>. -->
	<div class="cdx-info-chip">
		<!-- Text element. -->
		<span class="cdx-info-chip__text">
			<!-- Chip text -->
			Info Chip
		</span>
	</div>
</template>
<template v-slot:code>

```html
	<!-- Outer element is a <div>. -->
	<div class="cdx-info-chip">
		<!-- Text element. -->
		<span class="cdx-info-chip__text">
			<!-- Chip text -->
			Info Chip
		</span>
	</div>
```
</template>
</cdx-demo-wrapper>

The chip will inherit the reading direction of its context.

<cdx-demo-wrapper>
<template v-slot:demo>
	<!-- Establish a right-to-left reading context -->
	<div dir="rtl">
		<!-- Outer element is a <div>. -->
		<div class="cdx-info-chip">
			<!-- Text element. -->
			<span class="cdx-info-chip__text">
				<!-- Chip text -->
				Right-to-left Chip
			</span>
		</div>
	</div>
</template>
<template v-slot:code>

```html
	<!-- Establish a right-to-left reading context -->
	<div dir="rtl">
		<!-- Outer element is a <div>. -->
		<div class="cdx-info-chip">
			<!-- Text element. -->
			<span class="cdx-info-chip__text">
				<!-- Chip text -->
				Right-to-left Chip
			</span>
		</div>
	</div>
```
</template>
</cdx-demo-wrapper>

Long text behaves the same as with the full chip: it will be
truncated with an ellipsis and lines will not be wrapped.
<cdx-demo-wrapper>
<template v-slot:demo>
	<!-- Outer element is a <div>. -->
	<div class="cdx-info-chip">
		<!-- Text element. -->
		<span class="cdx-info-chip__text">
			<!-- Chip text -->
			This is really really really really really
			really really really really really really
			really really really really really really
			really really really really really really
			long text
		</span>
	</div>
</template>
<template v-slot:code>

```html
	<!-- Outer element is a <div>. -->
	<div class="cdx-info-chip">
		<!-- Text element. -->
		<span class="cdx-info-chip__text">
			<!-- Chip text -->
			This is really really really really really
			really really really really really really
			really really really really really really
			really really really really really really
			long text
		</span>
	</div>
```
</template>
</cdx-demo-wrapper>

### Status types

There are four status types, "notice", "warning", "error", and "success".

Apply the following classes to the root element to define the status styles:
- Notice: `cdx-info-chip--notice` (class can be omitted since this is the default)
- Warning: `cdx-info-chip--warning`
- Error: `cdx-info-chip--error`
- Success: `cdx-info-chip--success`

### Status icons

Each status has a corresponding default icon (`cdxIconInfoFilled` for "notice"
status, `cdxIconAlert` for "warning" status, `cdxIconError` for "error" status,
and `cdxIconSuccess` for "success" status). Examples of the default icons can be
found below.

To use the default icon for a given chip status, simply include an empty `<span>`
element with the class `cdx-info-chip__icon` inside the chip element.

<cdx-demo-wrapper>
<template v-slot:demo>
	<div class="cdx-demo-flex-container">
		<!-- Outer element is a <div> with the default "notice" class. -->
		<div class="cdx-info-chip cdx-info-chip--notice">
			<!-- Icon element. -->
			<span class="cdx-info-chip__icon"></span>
			<!-- Text element. -->
			<span class="cdx-info-chip__text">
				<!-- Chip text -->
				Notice
			</span>
		</div>
		<!-- Outer element is a <div> with the "warning" class. -->
		<div class="cdx-info-chip cdx-info-chip--warning">
			<span class="cdx-info-chip__icon"></span>
			<span class="cdx-info-chip__text">
				Warning
			</span>
		</div>
		<!-- Outer element is a <div> with the "error" class. -->
		<div class="cdx-info-chip cdx-info-chip--error">
			<span class="cdx-info-chip__icon"></span>
			<span class="cdx-info-chip__text">
				Error
			</span>
		</div>
		<!-- Outer element is a <div> with the "sucess" class. -->
		<div class="cdx-info-chip cdx-info-chip--success">
			<span class="cdx-info-chip__icon"></span>
			<span class="cdx-info-chip__text">
				Success
			</span>
		</div>
	</div>
</template>
<template v-slot:code>

```html
	<!-- Outer element is a <div> with the default "notice" class. -->
	<div class="cdx-info-chip cdx-info-chip--notice">
		<!-- Icon element. -->
		<span class="cdx-info-chip__icon"></span>
		<!-- Text element. -->
		<span class="cdx-info-chip__text">
			<!-- Chip text -->
			Notice
		</span>
	</div>
	<!-- Outer element is a <div> with the "warning" class. -->
	<div class="cdx-info-chip cdx-info-chip--warning">
		<span class="cdx-info-chip__icon"></span>
		<span class="cdx-info-chip__text">
			Warning
		</span>
	</div>
	<!-- Outer element is a <div> with the "error" class. -->
	<div class="cdx-info-chip cdx-info-chip--error">
		<span class="cdx-info-chip__icon"></span>
		<span class="cdx-info-chip__text">
			Error
		</span>
	</div>
	<!-- Outer element is a <div> with the "success" class. -->
	<div class="cdx-info-chip cdx-info-chip--success">
		<span class="cdx-info-chip__icon"></span>
		<span class="cdx-info-chip__text">
			Success
		</span>
	</div>
```
</template>
</cdx-demo-wrapper>

### Custom icons

You can customize the icon by using the CSS-only Icon Less mixin(`.cdx-mixin-css-icon`)
to apply the icon styles, passing the appropriate parameters to the mixin.

Custom icons should only be used with "notice" status InfoChips.

<cdx-demo-wrapper>
<template v-slot:demo>
	<div class="cdx-demo-flex-container">
		<div class="cdx-info-chip cdx-info-chip--notice">
			<!-- Custom icon element. -->
			<span class="cdx-demo-css-icon--heart"></span>
			<span class="cdx-info-chip__text">
				Notice
			</span>
		</div>
		<div class="cdx-info-chip cdx-info-chip--notice">
			<!-- Custom icon element. -->
			<span class="cdx-demo-css-icon--camera"></span>
			<span class="cdx-info-chip__text">
				Photos
			</span>
		</div>
		<div class="cdx-info-chip cdx-info-chip--notice">
			<!-- Custom icon element. -->
			<span class="cdx-demo-css-icon--user"></span>
			<span class="cdx-info-chip__text">
				Users
			</span>
		</div>
		<div class="cdx-info-chip cdx-info-chip--notice">
			<!-- Custom icon element. -->
			<span class="cdx-demo-css-icon--article"></span>
			<span class="cdx-info-chip__text">
				Articles
			</span>
		</div>
	</div>
</template>
<template v-slot:code>

```html
	<div class="cdx-info-chip cdx-info-chip--notice">
		<!-- Custom icon element. -->
		<span class="cdx-demo-css-icon--heart"></span>
		<span class="cdx-info-chip__text">
			Notice
		</span>
	</div>
	<div class="cdx-info-chip cdx-info-chip--notice">
		<!-- Custom icon element. -->
		<span class="cdx-demo-css-icon--camera"></span>
		<span class="cdx-info-chip__text">
			Photos
		</span>
	</div>
	<div class="cdx-info-chip cdx-info-chip--notice">
		<!-- Custom icon element. -->
		<span class="cdx-demo-css-icon--user"></span>
		<span class="cdx-info-chip__text">
			Users
		</span>
	</div>
	<div class="cdx-info-chip cdx-info-chip--notice">
		<!-- Custom icon element. -->
		<span class="cdx-demo-css-icon--article"></span>
		<span class="cdx-info-chip__text">
			Articles
		</span>
	</div>
```

:::code-group

```less [NPM]
// Note: Import the design tokens before importing the css-icon mixin
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';
@import ( reference ) '@wikimedia/codex/mixins/css-icon.less';

.cdx-demo-css-icon--heart {
	.cdx-mixin-css-icon( @cdx-icon-heart, @color-icon-notice, @size-icon-small );
}

.cdx-demo-css-icon--camera {
	.cdx-mixin-css-icon( @cdx-icon-camera, @color-icon-notice, @size-icon-small );
}

.cdx-demo-css-icon--user {
	.cdx-mixin-css-icon( @cdx-icon-user-avatar, @color-icon-notice, @size-icon-small );
}

.cdx-demo-css-icon--article {
	.cdx-mixin-css-icon( @cdx-icon-article, @color-icon-notice, @size-icon-small );
}
```

```less [MediaWiki]
@import 'mediawiki.skin.variables.less';

.cdx-demo-css-icon--heart {
	.cdx-mixin-css-icon( @cdx-icon-heart, @color-icon-notice, @size-icon-small );
}

.cdx-demo-css-icon--camera {
	.cdx-mixin-css-icon( @cdx-icon-camera, @color-icon-notice, @size-icon-small );
}

.cdx-demo-css-icon--user {
	.cdx-mixin-css-icon( @cdx-icon-user-avatar, @color-icon-notice, @size-icon-small );
}

.cdx-demo-css-icon--article {
	.cdx-mixin-css-icon( @cdx-icon-article, @color-icon-notice, @size-icon-small );
}
```

:::
</template>
</cdx-demo-wrapper>

<style lang="less" scoped>
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';
@import ( reference ) '@wikimedia/codex/mixins/css-icon.less';

.cdx-demo-flex-container {
	display: flex;
	gap: @spacing-150;
}

.cdx-demo-css-icon--heart {
	.cdx-mixin-css-icon( @cdx-icon-heart, @color-icon-notice, @size-icon-small );
}

.cdx-demo-css-icon--camera {
	.cdx-mixin-css-icon( @cdx-icon-camera, @color-icon-notice, @size-icon-small );
}

.cdx-demo-css-icon--user {
	.cdx-mixin-css-icon( @cdx-icon-user-avatar, @color-icon-notice, @size-icon-small );
}

.cdx-demo-css-icon--article {
	.cdx-mixin-css-icon( @cdx-icon-article, @color-icon-notice, @size-icon-small );
}

</style>

<script setup>
import ChipWithIcon from '@/../component-demos/info-chip/examples/ChipWithIcon.vue';
import ChipsWithStatuses from '@/../component-demos/info-chip/examples/ChipsWithStatuses.vue';
import { CdxInfoChip, CdxAccordion } from '@wikimedia/codex';

const controlsConfig = [
	{
		name: 'icon',
		type: 'icon'
	},
	{
		name: 'status',
		type: 'radio',
		options: [ 'subtle', 'notice', 'progressive', 'warning', 'error', 'success' ],
		default: 'notice'
	},
	{
		name: 'default',
		type: 'slot',
		default: 'Info Chip'
	}
];
</script>

An InfoChip is a non-interactive indicator that provides information and/or conveys a status.

<cdx-demo-wrapper :controls-config="controlsConfig" :show-generated-code="true">

<template v-slot:demo="{ propValues, slotValues }" :show-generated-code="true">
	<cdx-info-chip v-bind="propValues">
		{{ slotValues.default }}
	</cdx-info-chip>
</template>

</cdx-demo-wrapper>

## Overview

### When to use InfoChip

Use the InfoChip component to label, categorize, or organize information using keywords. This type of chip is informative so it cannot be clickable or removable.

Depending on the type of feedback conveyed to the user, InfoChips can be used to convey one of six statuses.

1. **Subtle**<br>Use for subtle information that does not need to convey "status" or the need for additional visible attention — the most basic version of a small pill of information.
2. **Notice**<br>Use to convey a general and non-urgent status. Think of this as a neutral version of warning, error, or success.
3. **Progressive**<br>Use to convey a progressive status that draws extra attention but does not communicate cautionary, negative, or positive status.
4. **Warning**<br>Use to convey a cautionary status.
5. **Error**<br>Use to convey a negative status.
6. **Success**<br>Use to convey a positive status.

### About InfoChip

InfoChip includes the following elements.

#### Icon (optional)

For `subtle`, `notice`, and `progressive` chips, the icon is optional and customizable, while for chips providing feedback (warning, error, and success), the icon is required to communicate the feedback status effectively.

<cdx-demo-best-practices>

<cdx-demo-best-practice>Use a start icon in subtle, notice, and progressive chips when needed to strengthen the text, or hide it if not required.</cdx-demo-best-practice>
<cdx-demo-best-practice type="dont">Avoid removing or replacing the icon in warning, error, and success chips, as it reinforces the meaning of their respective statuses.</cdx-demo-best-practice>

</cdx-demo-best-practices>

#### Label

Descriptive text about the chip.

<cdx-demo-best-practices>
<cdx-demo-best-practice>

Use short text with the InfoChip. Long text content will be truncated with an ellipsis and lines will not be wrapped.

</cdx-demo-best-practice>
</cdx-demo-best-practices>

## Examples

### With icon

For `subtle`, `notice`, and `progressive` chips, the icon can be customized.

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

<cdx-accordion separation="outline">

<template #title>Developer notes</template>

Custom icons can only be used with the `sublte`, `notice`, and `progressive` statuses. If they are passed with
a different status, they will be ignored.

</cdx-accordion>

### Statuses

Use the `status` prop to create subtle, progressive, warning, error, and success InfoChips.

<cdx-demo-wrapper>
<template v-slot:demo>
	<chips-with-statuses />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/info-chip/examples/ChipsWithStatuses.vue [NPM]

<<< @/../component-demos/info-chip/examples-mw/ChipsWithStatuses.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

## Technical implementation

### Vue usage

### CSS-only version

#### Markup structure

##### Text only

A simple chip with text content and no icon is straightforward.

<cdx-demo-wrapper>
<template v-slot:demo>
	<!-- Outer element is a `<div>`. -->
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
	<!-- Outer element is a `<div>`. -->
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

#### Status types

There are size status types, "subtle", "notice", "progressive", "warning", "error", and "success".

Apply the following classes to the root element to define the status styles:
- Subtle: `cdx-info-chip--subtle`
- Notice: `cdx-info-chip--notice` (class can be omitted since this is the default)
- Progressive: `cdx-info-chip--progressive`
- Warning: `cdx-info-chip--warning`
- Error: `cdx-info-chip--error`
- Success: `cdx-info-chip--success`

#### Status icons

Each status has a corresponding default icon (`cdxIconInfoFilled` for "subtle", "notice", and "progressive"
statuses, `cdxIconAlert` for "warning" status, `cdxIconError` for "error" status,
and `cdxIconSuccess` for "success" status). Examples of the default icons can be
found below.

To use the default icon for a given chip status, simply include an empty `<span>`
element with the class `cdx-info-chip__icon` inside the chip element.

<cdx-demo-wrapper>
<template v-slot:demo>
	<div class="cdx-demo-flex-container">
		<!-- Outer element is a `<div>` with the default `--notice` class. -->
		<div class="cdx-info-chip cdx-info-chip--subtle">
			<!-- Icon element. -->
			<span class="cdx-info-chip__icon"></span>
			<!-- Text element. -->
			<span class="cdx-info-chip__text">
				<!-- Chip text -->
				Subtle
			</span>
		</div>
		<div class="cdx-info-chip cdx-info-chip--notice">
			<span class="cdx-info-chip__icon"></span>
			<span class="cdx-info-chip__text">
				Notice
			</span>
		</div>
		<div class="cdx-info-chip cdx-info-chip--progressive">
			<span class="cdx-info-chip__icon"></span>
			<span class="cdx-info-chip__text">
				Progressive
			</span>
		</div>
		<!-- Outer element is a `<div>` with the `--warning` class. -->
		<div class="cdx-info-chip cdx-info-chip--warning">
			<span class="cdx-info-chip__icon"></span>
			<span class="cdx-info-chip__text">
				Warning
			</span>
		</div>
		<!-- Outer element is a `<div>` with the `--error` class. -->
		<div class="cdx-info-chip cdx-info-chip--error">
			<span class="cdx-info-chip__icon"></span>
			<span class="cdx-info-chip__text">
				Error
			</span>
		</div>
		<!-- Outer element is a `<div>` with the `--success` class. -->
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
	<!-- Outer element is a `<div>` with the default `--notice` class. -->
	<div class="cdx-info-chip cdx-info-chip--subtle">
		<!-- Icon element. -->
		<span class="cdx-info-chip__icon"></span>
		<!-- Text element. -->
		<span class="cdx-info-chip__text">
			<!-- Chip text -->
			Subtle
		</span>
	</div>
	<div class="cdx-info-chip cdx-info-chip--notice">
		<!-- Icon element. -->
		<span class="cdx-info-chip__icon"></span>
		<!-- Text element. -->
		<span class="cdx-info-chip__text">
			<!-- Chip text -->
			Notice
		</span>
	</div>
	<div class="cdx-info-chip cdx-info-chip--progressive">
		<!-- Icon element. -->
		<span class="cdx-info-chip__icon"></span>
		<!-- Text element. -->
		<span class="cdx-info-chip__text">
			<!-- Chip text -->
			Progressive
		</span>
	</div>
	<!-- Outer element is a `<div>` with the `--warning` class. -->
	<div class="cdx-info-chip cdx-info-chip--warning">
		<span class="cdx-info-chip__icon"></span>
		<span class="cdx-info-chip__text">
			Warning
		</span>
	</div>
	<!-- Outer element is a `<div>` with the `--error` class. -->
	<div class="cdx-info-chip cdx-info-chip--error">
		<span class="cdx-info-chip__icon"></span>
		<span class="cdx-info-chip__text">
			Error
		</span>
	</div>
	<!-- Outer element is a `<div>` with the `--success` class. -->
	<div class="cdx-info-chip cdx-info-chip--success">
		<span class="cdx-info-chip__icon"></span>
		<span class="cdx-info-chip__text">
			Success
		</span>
	</div>
```
</template>
</cdx-demo-wrapper>

#### Custom icons

You can customize the icon by using the CSS-only Icon Less mixin (`.cdx-mixin-css-icon`)
to apply the icon styles, passing the appropriate parameters to the mixin.

Custom icons should only be used with "subtle", "notice", and "progressive" status InfoChips.

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
		<div class="cdx-info-chip cdx-info-chip--progressive">
			<!-- Custom icon element. -->
			<span class="cdx-demo-css-icon--user"></span>
			<span class="cdx-info-chip__text">
				Users
			</span>
		</div>
		<div class="cdx-info-chip cdx-info-chip--subtle">
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
	<div class="cdx-info-chip cdx-info-chip--progressive">
		<!-- Custom icon element. -->
		<span class="cdx-demo-css-icon--user"></span>
		<span class="cdx-info-chip__text">
			Users
		</span>
	</div>
	<div class="cdx-info-chip cdx-info-chip--subtle">
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
	.cdx-mixin-css-icon( @cdx-icon-user-avatar, @color-icon-progressive, @size-icon-small );
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
	.cdx-mixin-css-icon( @cdx-icon-user-avatar, @color-icon-progressive, @size-icon-small );
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
	.cdx-mixin-css-icon( @cdx-icon-user-avatar, @color-icon-progressive, @size-icon-small );
}

.cdx-demo-css-icon--article {
	.cdx-mixin-css-icon( @cdx-icon-article, @color-icon-notice, @size-icon-small );
}

</style>

<script setup>
import { CdxAccordion } from '@wikimedia/codex';
import CardConfigurable from '@/../component-demos/card/examples/CardConfigurable.vue';
import CardDefault from '@/../component-demos/card/examples/CardDefault.vue';
import CardWithLink from '@/../component-demos/card/examples/CardWithLink.vue';
import CardWithIcon from '@/../component-demos/card/examples/CardWithIcon.vue';
import CardWithThumbnail from '@/../component-demos/card/examples/CardWithThumbnail.vue';
import CardWithThumbnailTitleOnly from '@/../component-demos/card/examples/CardWithThumbnailTitleOnly.vue';
import CardGroupWithThumbnails from '@/../component-demos/card/examples/CardGroupWithThumbnails.vue';

const controlsConfig = [
	{
		name: 'icon',
		type: 'icon'
	},
	{
		name: 'url',
		type: 'text'
	},
	{
		name: 'title',
		type: 'slot',
		default: 'Card title'
	},
	{
		name: 'description',
		type: 'slot',
		default: 'Description'
	},
	{
		name: 'supporting-text',
		type: 'slot',
		default: 'Supporting text'
	}
];
</script>

A Card groups information related to a single topic.

<cdx-demo-wrapper :controls-config="controlsConfig">
<template v-slot:demo="{ propValues, slotValues }">
	<card-configurable v-bind="propValues">
		<template #title>
			{{ slotValues.title }}
		</template>
		<template #description>
			{{ slotValues.description }}
		</template>
			<template #supporting-text>
			{{ slotValues[ 'supporting-text' ] }}
		</template>
	</card-configurable>
</template>
</cdx-demo-wrapper>

## Overview

### When to use Card

Use the Card component when you need to present individual pieces of information such as articles. Use them to create lists, grids or as standalone elements in the page. Cards can be clickable and offer a way to navigate to the content they represent.

Avoid using Cards when you have to display extensive content, multiple elements, or group unrelated topics together. In such cases, consider using a different component or layout.

### About Card

Card includes the following elements.

#### Visual element (optional)

They may include a Thumbnail or an Icon as a visual representation of its content.

<cdx-demo-best-practices>
<cdx-demo-best-practice>

Use a [Thumbnail](./thumbnail.md) when you intend to showcase articles and their associated images.

</cdx-demo-best-practice>
<cdx-demo-best-practice>

Use an [Icon](./icon.md) to help users quickly identify and associate Cards with specific actions or topics.

</cdx-demo-best-practice>
</cdx-demo-best-practices>

#### Title

A concise and descriptive title provides a brief description of the Card content.

#### Description

A description below the title provides more information about the element represented by the Card. If the Card itself is not a link, you can include links in the description.

<cdx-demo-best-practices>
<cdx-demo-best-practice>

Ensure that the content within the Card remains concise and pertinent.

</cdx-demo-best-practice>
<cdx-demo-best-practice type="dont">

Avoid overcrowding the Card with excessive content or unrelated topics.

</cdx-demo-best-practice>
</cdx-demo-best-practices>

#### Supporting text (optional)

Supporting text can be included to provide additional context about the Card’s content. If the Card itself is not a link, you can include links in the supporting text.

#### Link (optional)

As long as links are not included in the contents of the Card, the Card itself can be made a link.

## Examples

### Basic usage

<cdx-demo-wrapper>
<template v-slot:demo>
	<card-default />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/card/examples/CardDefault.vue [NPM]

<<< @/../component-demos/card/examples-mw/CardDefault.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

### With link

<cdx-demo-wrapper>
<template v-slot:demo>
	<card-with-link />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/card/examples/CardWithLink.vue [NPM]

<<< @/../component-demos/card/examples-mw/CardWithLink.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

<cdx-accordion separation="outline">

<template #title>Developer notes</template>

Adding the `url` prop will make the root element of the Card an anchor element.

</cdx-accordion>

### Media

A Card can have either a `thumbnail` or an `icon`. Card text will be aligned to the top of the media,
unless there is only a title, which will be aligned to the center of the media.

<cdx-demo-best-practices>

<cdx-demo-best-practice>Always use the same media for each Card in a group.</cdx-demo-best-practice>

</cdx-demo-best-practices>

#### With Icon

<cdx-demo-wrapper>
<template v-slot:demo>
	<card-with-icon />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/card/examples/CardWithIcon.vue [NPM]

<<< @/../component-demos/card/examples-mw/CardWithIcon.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

#### With Thumbnail

<cdx-demo-wrapper>
<template v-slot:demo>
	<card-with-thumbnail />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/card/examples/CardWithThumbnail.vue [NPM]

<<< @/../component-demos/card/examples-mw/CardWithThumbnail.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

#### Media and title only

<cdx-demo-wrapper>
<template v-slot:demo>
	<card-with-thumbnail-title-only />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/card/examples/CardWithThumbnailTitleOnly.vue [NPM]

<<< @/../component-demos/card/examples-mw/CardWithThumbnailTitleOnly.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

### Card groups

Cards will often be displayed in groups. The height and width of cards can be customized as needed,
and when multiple cards are aligned together, their heights should adjust to match the tallest card
in the set.

<cdx-demo-wrapper>
<template v-slot:demo>
	<card-group-with-thumbnails />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/card/examples/CardGroupWithThumbnails.vue [NPM]

<<< @/../component-demos/card/examples-mw/CardGroupWithThumbnails.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

<cdx-accordion separation="outline">

<template #title>Developer notes</template>

There are two considerations for Card groups:
- **Layout:** Layout styles for groups of Cards, e.g. margins or grid layout, must be added by the
application. The example above adds some simple layout styles to a group of Cards. Consider using
flexbox or CSS grid to lay out Cards consistently.
- **Media consistency:** As shown above, adding a `thumbnail` prop will display the Thumbnail.
For groups of Cards, you may want to display a Thumbnail for each Card if available, and otherwise
display a placeholder. To enable this behavior, add the `forceThumbnail` prop, as demonstrated
below.
The third item has no Thumbnail and display a placeholder Icon instead.

</cdx-accordion>

## Technical implementation

### Vue usage

### CSS-only version

#### Markup structure

<cdx-demo-wrapper>
<template v-slot:demo>
	<!-- Wrapper element (can be <span> or <a>). -->
	<span class="cdx-card">
		<!-- Card text. -->
		<span class="cdx-card__text">
			<!-- Title. -->
			<span class="cdx-card__text__title">Card title</span>
			<!-- Optional description. -->
			<span class="cdx-card__text__description">Description</span>
			<!-- Optional supporting text. -->
			<span class="cdx-card__text__supporting-text">Supporting text</span>
		</span>
	</span>
</template>
<template v-slot:code>

```html
<!-- Wrapper element (can be <span> or <a>). -->
<span class="cdx-card">
	<!-- Card text. -->
	<span class="cdx-card__text">
		<!-- Title. -->
		<span class="cdx-card__text__title">Card title</span>
		<!-- Optional description. -->
		<span class="cdx-card__text__description">Description</span>
		<!-- Optional supporting text. -->
		<span class="cdx-card__text__supporting-text">Supporting text</span>
	</span>
</span>
```

</template>
</cdx-demo-wrapper>

#### With link

To make the entire Card a link, use an `<a>` element and include the class `cdx-card--is-link`.

<cdx-demo-wrapper>
<template v-slot:demo>
	<a class="cdx-card cdx-card--is-link" href="https://www.example.com">
		<span class="cdx-card__text">
			<span class="cdx-card__text__title">Card title</span>
			<span class="cdx-card__text__description">Description</span>
		</span>
	</a>
</template>
<template v-slot:code>

```html
<a class="cdx-card cdx-card--is-link" href="https://www.example.com">
	<span class="cdx-card__text">
		<span class="cdx-card__text__title">Card title</span>
		<span class="cdx-card__text__description">Description</span>
	</span>
</a>
```

</template>
</cdx-demo-wrapper>

#### With media

##### Image

To add an image, add the following markup:
- A `<span>` with the classes `cdx-card--thumbnail` and `cdx-thumbnail`
- Inside of that `<span>`, add an empty `<span>` element with the class `cdx-thumbnail__image`, plus
  a custom CSS class that you can use to add a `background-image` rule (alternately, you can add
  the `background-image` rule via a `style` attribute on this `<span>`)

Refer to the [CSS-only Thumbnail](./thumbnail.md#css-only-version) documentation for more examples.

<cdx-demo-wrapper>
<template v-slot:demo>
	<span class="cdx-card">
		<span class="cdx-card__thumbnail cdx-thumbnail">
			<span class="cdx-thumbnail__image cdx-demo-colored-pencils"></span>
		</span>
		<span class="cdx-card__text">
			<span class="cdx-card__text__title">Card title</span>
			<span class="cdx-card__text__description">Description</span>
			<span class="cdx-card__text__supporting-text">Supporting text</span>
		</span>
	</span>
</template>
<template v-slot:code>

```html
<span class="cdx-card">
	<span class="cdx-card__thumbnail cdx-thumbnail">
		<span class="cdx-thumbnail__image cdx-demo-colored-pencils"></span>
	</span>
	<span class="cdx-card__text">
		<span class="cdx-card__text__title">Card title</span>
		<span class="cdx-card__text__description">Description</span>
		<span class="cdx-card__text__supporting-text">Supporting text</span>
	</span>
</span>
```

```less
.cdx-demo-colored-pencils {
	background-image: url( https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/64_365_Color_Macro_%285498808099%29.jpg/200px-64_365_Color_Macro_%285498808099%29.jpg );
}
```

</template>
</cdx-demo-wrapper>

##### Icon

To add an Icon, add a `<span>` element with the class `cdx-card__icon`, plus a custom class that you
can use to add a [CSS-only Icon](./icon.md#css-only-version).

<cdx-demo-wrapper>
<template v-slot:demo>
	<span class="cdx-card">
		<span class="cdx-card__icon cdx-demo-css-icon--robot"></span>
		<span class="cdx-card__text">
			<span class="cdx-card__text__title">Card title</span>
			<span class="cdx-card__text__description">Description</span>
			<span class="cdx-card__text__supporting-text">Supporting text</span>
		</span>
	</span>
</template>
<template v-slot:code>

```html
<span class="cdx-card">
	<span class="cdx-card__icon cdx-demo-css-icon--robot"></span>
	<span class="cdx-card__text">
		<span class="cdx-card__text__title">Card title</span>
		<span class="cdx-card__text__description">Description</span>
		<span class="cdx-card__text__supporting-text">Supporting text</span>
	</span>
</span>
```

:::code-group

```less [NPM]
// Note: you must import the design tokens before importing the css-icon mixin
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';
@import ( reference ) '@wikimedia/codex/mixins/css-icon.less';

.cdx-demo-css-icon--robot {
	.cdx-mixin-css-icon( @cdx-icon-robot );
}
```

```less [MediaWiki]
@import 'mediawiki.skin.variables.less';

.cdx-demo-css-icon--robot {
	.cdx-mixin-css-icon( @cdx-icon-robot );
}
```

:::

</template>
</cdx-demo-wrapper>

#### Card groups

Refer to the [documentation above](#card-groups) for UX guidelines.

<cdx-demo-wrapper>
<template v-slot:demo>
	<div class="cdx-docs-card-group-with-thumbnails">
		<p>Nearby Pages</p>
		<a href="https://en.wikipedia.org/wiki/Golden_Gate_National_Recreation_Area" class="cdx-card cdx-card--is-link cdx-docs-card-group-with-thumbnails__card">
			<span class="cdx-thumbnail cdx-card__thumbnail">
				<span style="background-image: url( https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Golden_Gate_-_Lands_End_-_Point_Lobos_2009.jpg/150px-Golden_Gate_-_Lands_End_-_Point_Lobos_2009.jpg );" class="cdx-thumbnail__image"></span>
			</span>
			<span class="cdx-card__text">
				<span class="cdx-card__text__title">Golden Gate National Recreation Area</span>
				<span class="cdx-card__text__description">U.S. National Recreation Area surrounding San Francisco Bay Area</span>
				<span class="cdx-card__text__supporting-text">
					<span class="cdx-demo-css-icon--map-pin"></span> Distance: 170m
				</span>
			</span>
		</a>
		<a href="https://en.wikipedia.org/wiki/Internet_Archive" class="cdx-card cdx-card--is-link cdx-docs-card-group-with-thumbnails__card">
			<span class="cdx-thumbnail cdx-card__thumbnail">
				<span style="background-image: url( https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Internet_Archive_logo_and_wordmark.svg/150px-Internet_Archive_logo_and_wordmark.svg.png );" class="cdx-thumbnail__image"></span>
			</span>
			<span class="cdx-card__text">
				<span class="cdx-card__text__title">Internet Archive</span>
				<span class="cdx-card__text__description">American non-profit organization providing archives of digital media since 1996</span>
				<span class="cdx-card__text__supporting-text">
					<span class="cdx-demo-css-icon--map-pin"></span> Distance: 300m
				</span>
			</span>
		</a>
		<a href="https://en.wikipedia.org/wiki/Green_Apple_Books_%26_Music" class="cdx-card cdx-card--is-link cdx-docs-card-group-with-thumbnails__card">
			<span class="cdx-thumbnail cdx-card__thumbnail">
				<span class="cdx-thumbnail__placeholder">
					<span class="cdx-thumbnail__placeholder__icon"></span>
				</span>
			</span>
			<span class="cdx-card__text">
				<span class="cdx-card__text__title">Green Apple Books &amp; Music</span>
				<span class="cdx-card__text__description">Bookstore in San Francisco</span>
				<span class="cdx-card__text__supporting-text">
					<span class="cdx-demo-css-icon--map-pin"></span> Distance: 350m
				</span>
			</span>
		</a>
	</div>
</template>
<template v-slot:code>

```html
<div class="cdx-docs-card-group-with-thumbnails">
	<p>Nearby Pages</p>
	<a href="https://en.wikipedia.org/wiki/Golden_Gate_National_Recreation_Area" class="cdx-card cdx-card--is-link cdx-docs-card-group-with-thumbnails__card">
		<span class="cdx-thumbnail cdx-card__thumbnail">
			<span style="background-image: url( https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Golden_Gate_-_Lands_End_-_Point_Lobos_2009.jpg/150px-Golden_Gate_-_Lands_End_-_Point_Lobos_2009.jpg );" class="cdx-thumbnail__image"></span>
		</span>
		<span class="cdx-card__text">
			<span class="cdx-card__text__title">
				Golden Gate National Recreation Area
			</span>
			<span class="cdx-card__text__description">
				U.S. National Recreation Area surrounding San Francisco Bay Area
			</span>
			<span class="cdx-card__text__supporting-text">
				<span class="cdx-demo-css-icon--map-pin"></span> Distance: 170m
			</span>
		</span>
	</a>
	<a href="https://en.wikipedia.org/wiki/Internet_Archive" class="cdx-card cdx-card--is-link cdx-docs-card-group-with-thumbnails__card">
		<span class="cdx-thumbnail cdx-card__thumbnail">
			<span style="background-image: url( https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Internet_Archive_logo_and_wordmark.svg/150px-Internet_Archive_logo_and_wordmark.svg.png );" class="cdx-thumbnail__image"></span>
		</span>
		<span class="cdx-card__text">
			<span class="cdx-card__text__title">
				Internet Archive
			</span>
			<span class="cdx-card__text__description">
				American non-profit organization providing archives of digital media since 1996
			</span>
			<span class="cdx-card__text__supporting-text">
				<span class="cdx-demo-css-icon--map-pin"></span> Distance: 300m
			</span>
		</span>
	</a>
	<a href="https://en.wikipedia.org/wiki/Green_Apple_Books_%26_Music" class="cdx-card cdx-card--is-link cdx-docs-card-group-with-thumbnails__card">
		<span class="cdx-thumbnail cdx-card__thumbnail">
			<span class="cdx-thumbnail__placeholder">
				<span class="cdx-thumbnail__placeholder__icon"></span>
			</span>
		</span>
		<span class="cdx-card__text">
			<span class="cdx-card__text__title">
				Green Apple Books & Music
			</span>
			<span class="cdx-card__text__description">
				Bookstore in San Francisco
			</span>
			<span class="cdx-card__text__supporting-text">
				<span class="cdx-demo-css-icon--map-pin"></span> Distance: 350m
			</span>
		</span>
	</a>
</div>
```

:::code-group

```less [NPM]
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-docs-card-group-with-thumbnails {
	p {
		margin-top: 0;
		font-weight: @font-weight-bold;
	}

	// The application implementing Cards must handle Card group layout styles.
	&__card {
		margin-bottom: @spacing-100;

		&:last-child {
			margin-bottom: 0;
		}
	}
}
```

```less [MediaWiki]
@import 'mediawiki.skin.variables.less';

.cdx-docs-card-group-with-thumbnails {
	p {
		margin-top: 0;
		font-weight: @font-weight-bold;
	}

	// The application implementing Cards must handle Card group layout styles.
	&__card {
		margin-bottom: @spacing-100;

		&:last-child {
			margin-bottom: 0;
		}
	}
}
```

:::

</template>
</cdx-demo-wrapper>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';
@import ( reference ) '@wikimedia/codex/mixins/css-icon.less';

.cdx-demo-colored-pencils {
	background-image: url( https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/64_365_Color_Macro_%285498808099%29.jpg/200px-64_365_Color_Macro_%285498808099%29.jpg );
}

.cdx-demo-css-icon {
	&--robot {
		.cdx-mixin-css-icon( @cdx-icon-robot );
	}

	&--map-pin {
		.cdx-mixin-css-icon( @cdx-icon-map-pin, @color-subtle, @size-icon-small );
	}
}
</style>

### Keyboard navigation

| Key | Function |
| -- | -- |
| <kbd>Tab</kbd> | If the Card is interactive, it places the focus on the Card. If a non-interactive Card contains a link, this key places the focus in that link. When the focus is placed within an interactive Card or within the link of a non-interactive Card, it moves the focus to the next interactive element in tab order. |
| <kbd>Shift</kbd> + <kbd>Tab</kbd> | It moves the focus to the previous interactive element. |
| <kbd>Enter</kbd> | If the focus is on an interactive Card, it will open its hyperlink. When the focus is on a link within a Card, it will open the link. |
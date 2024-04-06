<script setup>
import CardDefault from '@/../component-demos/card/examples/CardDefault.vue';
import CardWithLink from '@/../component-demos/card/examples/CardWithLink.vue';
import CardWithIcon from '@/../component-demos/card/examples/CardWithIcon.vue';
import CardWithThumbnail from '@/../component-demos/card/examples/CardWithThumbnail.vue';
import CardWithThumbnailTitleOnly from '@/../component-demos/card/examples/CardWithThumbnailTitleOnly.vue';
import CardGroupWithThumbnails from '@/../component-demos/card/examples/CardGroupWithThumbnails.vue';
import CardMaximum from '@/../component-demos/card/examples/CardMaximum.vue';
</script>

A Card is used to group information and actions related to a single topic.

Cards can be clickable and offer a way to navigate to the content they represent
(e.g. Wikipedia articles).


## Guidelines

### Using cards

Use the Card component when you need to present individual pieces of information such as articles. Use them to create lists, grids or as standalone elements in the page.

Avoid using cards when you have to display extensive content, multiple elements, or group unrelated topics together. In such cases, consider using a different component or layout.

Use short titles and descriptions along with visual reinforcements, such as thumbnails or icons, to ensure that the card's content is concise and easy to scan.

### Specifications

![Specification of Card.](../../assets/components/card-specifications.svg)

Cards include the following items:
1. **Visual element** (optional)<br>Cards may include a thumbnail or an icon as a visual representation of the card’s content.
2. **Title**<br>A concise and descriptive title provides a brief description of the card content.
3. **Description**<br>A subtle text below the title provides more information about the element represented by the card.
4. **Supporting text** (optional)<br>An optional subtle text (with an optional icon) could be included to provide additional information about the card’s content.
5. **Links** (optional)<br>The description and/or the supporting text may contain links to either the element the Cards represent (e.g. Wikipedia articles), or to related content.

The label, description, and supporting text within a card can vary in length without any minimum or maximum restrictions. Cards automatically adjust in height to accommodate longer text, although the recommendation is to keep card content concise whenever possible.

The height and width of cards can be customized as needed, and when multiple cards are aligned together, their heights should adjust to match the tallest card in the set.

![Two cards with varying content lengths, adjusting their height to match the tallest card.](../../assets/components/card-maximum.svg)

Refer to the [Card component in Codex Figma](https://www.figma.com/file/KoDuJMadWBXtsOtzGS4134/%E2%9D%96-Codex-components?type=design&node-id=6842-69713&mode=design&t=2O0ceqiRfqCtnidq-11).

### Types
Depending on the visual content presented within the card, there are three distinct variations:
1. **Card with thumbnail**<br>This variation includes a thumbnail image as the primary visual element. You can use this card variation when you intend to showcase articles and their associated images.
2. **Card with icon**<br>In this version, an icon serves as the primary visual element, enhancing recognition. Icons help users quickly identify and associate cards with specific actions or topics.
3. **Card with only text**<br>This variation lacks any visual elements and relies solely on text and content for information. This option simplifies the card's design, focusing on textual information and content.

![Example of types of Card.](../../assets/components/card-types-visual-element.svg)

### Interaction states
Cards have the following visually separate states:

![Interaction states of Card: default, hover, focus, and loading.
](../../assets/components/card-interaction-states.svg)

1. Default
2. Hover
3. Focus
4. Loading

The interactive states (hover, active, and focus) are only applicable to cards that contain links, while the loading state applies to all Cards.

### Best practices

Consider the following recommendations when using cards.

#### Card content

<cdx-demo-rules>

<template #do-media>

![Card with concise content.](../../assets/components/card-best-practices-content-do.svg)

</template>

<template #do-text>

- Use cards to organize information related to a single topic.
- Ensure that the content within the card remains concise and pertinent.

</template>

<template #dont-media>

![Card with excessive content.](../../assets/components/card-best-practices-content-dont.svg)

</template>

<template #dont-text>

- Use cards to compile unrelated topics or lists together.
- Overcrowd cards with excessive content.

</template>

</cdx-demo-rules>

#### Group of cards

<cdx-demo-rules>

<template #do-media>

![A group of cards aligned to the same height.](../../assets/components/card-best-practices-group-do.svg)

</template>

<template #do-text>

- Maintain consistency in the content and elements of grouped cards, ensuring their heights match for visual consistency.

</template>

<template #dont-media>

![A group of cards with different elements and height.](../../assets/components/card-best-practices-group-dont.svg)

</template>

<template #dont-text>

- Mix up the content and elements of cards when grouping them,
- Vary their heights to maintain visual uniformity.

</template>

</cdx-demo-rules>

## Demos

### Default

<cdx-demo-wrapper :force-controls="true">
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

Adding the `url` prop will make the root element of the Card an anchor element.

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

### Media

A Card can have either an icon or a thumbnail. Card text will be aligned to the top of the media,
unless there is only a title, which will be aligned to the center of the media.

#### With icon

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

#### With thumbnail

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

#### Title only

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

Cards will often be displayed in groups. There are two considerations for Card groups:
- **Layout:** Layout styles for groups of Cards, e.g. margins or grid layout, must be added by the
application. The example below adds some simple layout styles to a group of Cards.
- **Media consistency:** As shown above, adding a `thumbnail` prop will display the thumbnail.
For groups of Cards, you may want to display a thumbnail for each Card if available, and otherwise
display a placeholder. To enable this behavior, add the `forceThumbnail` prop, as demonstrated
below.
The third item has no thumbnail and display a placeholder icon instead.

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

### Maximum example

The example below contains a title, a description, a thumbnail image, and some
"supporting text" (which contains an Icon as well as text content).

**Note:** When using an Icon component inside the Card's `supporting-text` slot,
it is recommended to set the Icon `size` property to `small`.

<cdx-demo-wrapper>
<template v-slot:demo>
	<card-maximum />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/card/examples/CardMaximum.vue [NPM]

<<< @/../component-demos/card/examples-mw/CardMaximum.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

## Vue usage

## CSS-only version

### Markup structure

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

### With link

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

### With media

#### Image

To add an image, add the following markup:
- A `<span>` with the classes `cdx-card--thumbnail` and `cdx-thumbnail`
- Inside of that `<span>`, add an empty `<span>` element with the class `cdx-thumbnail__image`, plus
  a custom CSS class that you can use to add a `background-image` rule (alternately, you can add
  the `background-image` rule via a `style` attribute on this `<span>`)

See the [CSS-only Thumbnail](./thumbnail.md#css-only-version) documentation for more examples.

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
	background-image: url( https:https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/64_365_Color_Macro_%285498808099%29.jpg/200px-64_365_Color_Macro_%285498808099%29.jpg );
}
```

</template>
</cdx-demo-wrapper>

#### Icon

To add an icon, add a `<span>` element with the class `cdx-card__icon`, plus a custom class that you
can use to add a [CSS-only icon](./icon.md#css-only-version).

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

### Card groups

See the [documentation above](#card-groups) for UX guidelines.

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

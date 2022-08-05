<template>
	<component
		:is="contentTag"
		:href="cardLink"
		class="cdx-card"
		:class="{
			'cdx-card--is-link': isLink,
			// Include dynamic classes in the template so that $slots is reactive.
			'cdx-card--title-only': !$slots.description && !$slots[ 'supporting-text' ]
		}"
	>
		<cdx-thumbnail
			v-if="thumbnail || forceThumbnail"
			:thumbnail="thumbnail"
			:placeholder-icon="customPlaceholderIcon"
			class="cdx-card__thumbnail"
		/>
		<cdx-icon
			v-else-if="icon"
			:icon="icon"
			class="cdx-card__icon"
		/>

		<span class="cdx-card__text">
			<span class="cdx-card__text__title">
				<!-- @slot Card title -->
				<slot name="title" />
			</span>

			<span v-if="$slots.description" class="cdx-card__text__description">
				<!-- @slot Card description -->
				<slot name="description" />
			</span>

			<span v-if="$slots[ 'supporting-text' ]" class="cdx-card__text__supporting-text">
				<!-- @slot Short supporting text -->
				<slot name="supporting-text" />
			</span>
		</span>
	</component>
</template>

<script lang="ts">
import { PropType, defineComponent, computed } from 'vue';
import { Icon } from '@wikimedia/codex-icons';
import CdxIcon from '../icon/Icon.vue';
import CdxThumbnail from '../thumbnail/Thumbnail.vue';
import { Thumbnail } from '../../types';

/**
 * A structural component used to group information and actions related to a single topic.
 */
export default defineComponent( {
	name: 'CdxCard',

	components: { CdxIcon, CdxThumbnail },

	props: {
		/**
		 * If provided, the Card will be a link to this URL.
		 */
		url: {
			type: String,
			default: ''
		},

		/**
		 * Icon displayed at the start of the Card.
		 */
		icon: {
			type: [ String, Object ] as PropType<Icon>,
			default: ''
		},

		/**
		 * Thumbnail image data for the Card.
		 */
		thumbnail: {
			type: [ Object, null ] as PropType<Thumbnail|null>,
			default: null
		},

		/**
		 * Option to force a thumbnail layout.
		 *
		 * When set to `true`, the Card will display a Thumbnail. If a `thumbnail` prop was also
		 * provided, the thumbnail image will display. Otherwise, a placeholder icon will display.
		 *
		 * This is useful when displaying groups of Cards when some of the cards have thumbnail
		 * images but some do not. `forceThumbnail` will provide a consistent layout for that group.
		 *
		 * Note that this prop is not needed to display a thumbnail image: if the `thumbnail` prop
		 * is provided, it will display. This prop is only needed to enable the display of the
		 * thumbnail placeholder icon when the `thumbnail` prop is not provided.
		 */
		forceThumbnail: {
			type: Boolean,
			default: false
		},

		/**
		 * Optional custom icon for the placeholder shown when `forceThumbnail` is true but no
		 * thumbnail is provided.
		 *
		 * Defaults to the default placeholder icon set in the Thumbnail component.
		 */
		customPlaceholderIcon: {
			type: [ String, Object ] as PropType<Icon>,
			default: undefined
		}
	},

	setup( props ) {
		// If a URL is provided for this menu item, the content will be wrapped in an <a> tag with
		// the href value set to the URL. Otherwise, it'll just be wrapped in a <span>.
		const isLink = computed( () => !!props.url );
		const contentTag = computed( () => isLink.value ? 'a' : 'span' );
		const cardLink = computed( () => isLink.value ? props.url : undefined );

		return {
			isLink,
			contentTag,
			cardLink
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/dist/theme-wikimedia-ui.less';
@import '../../themes/mixins/common.less';

// TODO: Tokenize.
@font-size-browser: 16;
@font-size-base: 14 / @font-size-browser;
@font-size-card-supporting-text: unit( ( 14 / @font-size-browser ), em );

// TODO: this is the same for menu item; combine tokens?
@line-height-card: ( 22 / @font-size-browser );
@line-height-card-title: ( 20 / @font-size-browser );

@size-icon-relative: unit( ( @size-icon / @font-size-browser / @font-size-base ), em );
// TODO: this should either be a component-level token, or one of the available thumbnail sizes
// once we offer various sizes in the Thumbnail component.
@size-card-thumbnail: 48px;

@margin-end-card-media: 12px;

.cdx-card {
	display: flex;
	align-items: flex-start;
	position: relative;
	border: @border-width-base @border-style-base @border-color-base;
	border-radius: @border-radius-base;
	padding: @padding-horizontal-base;

	&--is-link {
		transition-property: @transition-property-base;
		transition-duration: @transition-duration-base;

		&,
		&:hover {
			text-decoration: none;
		}

		&:hover {
			border-color: @border-color-interactive;
		}

		&:focus {
			border-color: @border-color-progressive--focus;
			// Make `box-shadow` feature a `1px` White inset outline with a value combination.
			// stylelint-disable-next-line value-list-comma-newline-after
			box-shadow: @box-shadow-inset-small @box-shadow-color-progressive--focus,
				@box-shadow-inset-medium @box-shadow-color-inverted;
			outline: @outline-base--focus;
		}
	}

	&--title-only {
		align-items: center;
	}

	&__text {
		display: flex;
		flex-direction: column;
		line-height: @line-height-card;
		.hyphens();

		&__title {
			color: @color-base;
			font-weight: @font-weight-bold;
			line-height: @line-height-card-title;
		}

		&__description,
		&__supporting-text {
			&,
			.cdx-icon {
				color: @color-subtle;
			}
		}

		&__description {
			// TODO: token?
			margin-top: 4px;
		}

		&__supporting-text {
			// TODO: token?
			margin-top: 8px;
			font-size: @font-size-card-supporting-text;
		}
	}

	&__thumbnail {
		margin-right: @margin-end-card-media;

		.cdx-thumbnail__placeholder,
		.cdx-thumbnail__image {
			width: @size-card-thumbnail;
			height: @size-card-thumbnail;
		}
	}

	&__icon {
		// Make sure the icon inherits the content element's color.
		color: inherit;
		margin-right: @margin-end-card-media;

		// Icons must scale with font size to maintain top alignment with the label text.
		svg {
			width: @size-icon-relative;
			height: @size-icon-relative;
		}
	}
}
</style>

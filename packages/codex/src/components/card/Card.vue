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
 * An element which groups various kinds of content and is optionally clickable.
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
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';
@import ( reference ) '../../themes/mixins/common.less';

.cdx-card {
	background-color: @background-color-base;
	display: flex;
	align-items: flex-start;
	position: relative;
	border: @border-base;
	border-radius: @border-radius-base;
	padding: @spacing-75;

	&--is-link {
		transition-property: @transition-property-base;
		transition-duration: @transition-duration-base;

		&,
		&:hover,
		&:focus {
			text-decoration: @text-decoration-none;
		}

		&:hover {
			border-color: @border-color-interactive--hover;
		}

		// TODO: Decide to keep active styles after focus styles update T377727.
		&:active {
			border-color: @border-color-interactive--active;
		}

		&:focus {
			border-color: @border-color-progressive--focus;
			// Make `box-shadow` feature a `1px` White inset outline with a value combination.
			/* stylelint-disable-next-line stylistic/declaration-colon-newline-after,
				stylistic/value-list-comma-newline-after */
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
		line-height: @line-height-small;
		.hyphens();

		&__title {
			color: @color-base;
			font-weight: @font-weight-bold;
			line-height: @line-height-x-small;
		}

		&__description,
		&__supporting-text {
			&,
			.cdx-icon {
				color: @color-subtle;
			}
		}

		&__description {
			margin-top: @spacing-25;
		}

		&__supporting-text {
			margin-top: @spacing-50;
			font-size: @font-size-small;
		}
	}

	&__thumbnail.cdx-thumbnail {
		margin-right: @spacing-75;

		.cdx-thumbnail__placeholder,
		.cdx-thumbnail__image {
			width: @size-300;
			height: @size-300;
		}
	}

	.cdx-card__icon {
		// Make sure the icon inherits the content element's color.
		color: @color-subtle;
		margin-right: @spacing-75;
	}
}
</style>

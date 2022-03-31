<template>
	<li
		:id="id"
		role="option"
		class="cdx-menu-item"
		:class="rootClasses"
		:aria-disabled="disabled"
		:aria-selected="selected"
		@mouseenter="onMouseEnter"
		@mousedown.prevent="onMouseDown"
		@click="onClick"
	>
		<!-- @slot Custom menu item content. -->
		<slot>
			<component
				:is="contentTag"
				:href="url ? url : undefined"
				class="cdx-menu-item__content"
			>
				<!-- Thumbnail, thumbnail placeholder, or icon. -->
				<span
					v-if="showThumbnail && thumbnail"
					:style="{ backgroundImage: thumbnailBackgroundImage }"
					class="cdx-menu-item__thumbnail"
				/>
				<span
					v-else-if="showThumbnail"
					class="cdx-menu-item__thumbnail-placeholder"
				>
					<cdx-icon
						:icon="defaultThumbnailIcon"
						class="cdx-menu-item__thumbnail-placeholder__icon"
					/>
				</span>
				<span
					v-else-if="icon"
					class="cdx-menu-item__icon"
				>
					<cdx-icon :icon="icon" />
				</span>

				<!-- Item text. -->
				<span class="cdx-menu-item__text">
					<!-- Item label. -->
					<cdx-search-result-title
						v-if="highlightQuery"
						:title="title"
						:search-query="searchQuery"
						:lang="language?.label"
					/>
					<span
						v-else
						class="cdx-menu-item__text__label"
						:lang="language?.label"
					>
						<bdi>{{ title }}</bdi>
					</span>

					<!-- Item search query match (e.g. alias). -->
					<template v-if="match">
						<!-- Add a space before the match. Vue strips whitespace between everything
						except plain text, so we can't rely on a newline to add a natural space
						here. -->
						<!-- eslint-disable-next-line vue/no-useless-mustaches -->
						{{ ' ' }}
						<cdx-search-result-title
							v-if="highlightQuery"
							:title="match"
							:search-query="searchQuery"
							:lang="language?.match"
						/>
						<span
							v-else
							class="cdx-menu-item__text__match"
							:lang="language?.match"
						>
							<bdi>{{ match }}</bdi>
						</span>
					</template>

					<!-- Item description. -->
					<span
						v-if="description"
						class="cdx-menu-item__text__description"
						:lang="language?.description"
					>
						<bdi>{{ description }}</bdi>
					</span>
				</span>
			</component>
		</slot>
	</li>
</template>

<script lang="ts">
import { PropType, computed, defineComponent } from 'vue';
import { cdxIconImageLayoutFrameless, Icon } from '@wikimedia/codex-icons';
import CdxIcon from '../icon/Icon.vue';
import CdxSearchResultTitle from '../search-result-title/SearchResultTitle.vue';
import { MenuState, Thumbnail, MenuItemLanguageData } from '../../types';

/**
 * Item within a Menu component.
 *
 * A value must be provided, and various optional elements can be displayed:
 * - A human-readable label
 * - A description
 * - A thumbnail or icon
 *
 * Alternately, the entire content and layout of the menu item can be customized via the default
 * slot.
 *
 * For search results, the search query can be visually differentiated within the result title.
 */
export default defineComponent( {
	name: 'CdxMenuItem',

	components: { CdxIcon, CdxSearchResultTitle },

	props: {
		/**
		 * ID for HTML `id` attribute.
		 */
		id: {
			type: String,
			required: true
		},

		/**
		 * The value provided to the parent menu component when this menu item is selected.
		 */
		value: {
			type: [ String, Number ] as PropType<string|number>,
			required: true
		},

		/**
		 * Whether the menu item is disabled.
		 */
		disabled: {
			type: Boolean,
			default: false
		},

		/**
		 * Whether this menu item is selected.
		 */
		selected: {
			type: Boolean,
			default: false
		},

		/**
		 * Whether this menu item is being pressed.
		 */
		active: {
			type: Boolean,
			default: false
		},

		/**
		 * Whether this menu item is hovered over or highlighted via keyboard navigation.
		 */
		highlighted: {
			type: Boolean,
			default: false
		},

		/**
		 * Label for the menu item. If this isn't provided, the value will be displayed instead.
		 */
		label: {
			type: String,
			default: ''
		},

		/**
		 * Text that matches current search query. Only used for search results and will be
		 * displayed after the label.
		 */
		match: {
			type: String,
			default: ''
		},

		/**
		 * URL for the menu item. If provided, the content of the menu item will be wrapped in an
		 * anchor tag.
		 */
		url: {
			type: String,
			default: ''
		},

		/**
		 * Icon for the menu item.
		 */
		icon: {
			type: [ String, Object ] as PropType<Icon>,
			default: ''
		},

		/**
		 * Whether a thumbnail (or a placeholder icon) should be displayed.
		 */
		showThumbnail: {
			type: Boolean,
			default: false
		},

		/**
		 * Thumbnail for the menu item.
		 */
		thumbnail: {
			type: [ Object, null ] as PropType<Thumbnail|null>,
			default: null
		},

		/**
		 * Description of the menu item.
		 */
		description: {
			type: [ String, null ] as PropType<string|null>,
			default: ''
		},

		/**
		 * The search query to be highlighted within the menu item's title.
		 */
		searchQuery: {
			type: String,
			default: ''
		},

		/**
		 * Whether to bold menu item labels.
		 */
		boldLabel: {
			type: Boolean,
			default: false
		},

		/**
		 * Whether to hide description text overflow via an ellipsis.
		 */
		hideDescriptionOverflow: {
			type: Boolean,
			default: false
		},

		/**
		 * Optional language codes for label, match, and description.
		 *
		 * If included, that language code will be added as a `lang` attribute to the element
		 * wrapping that text node.
		 */
		language: {
			type: Object as PropType<MenuItemLanguageData>,
			default: () => {
				return {};
			}
		}
	},

	emits: [
		/**
		 * Emitted when the menu item becomes selected, active or highlighted in response to
		 * user interaction. Handled in the Menu component.
		 *
		 * @property {MenuState} menuState State this menu item is entering
		 */
		'change'
	],

	setup: ( props, { emit } ) => {
		const onMouseEnter = () => {
			emit( 'change', 'highlighted' );
		};

		const onMouseDown = ( e: MouseEvent ) => {
			// Only apply the active state on main mouse button click. This avoids applying active
			// styles on right click, for example. See T304605.
			if ( e.button === 0 ) {
				emit( 'change', 'active' );
			}
		};

		const onClick = () => {
			emit( 'change', 'selected' );
		};

		const highlightQuery = computed( () => props.searchQuery.length > 0 );

		const rootClasses = computed( () : Record<string, boolean> => {
			return {
				'cdx-menu-item--selected': props.selected,
				'cdx-menu-item--active': props.active,
				'cdx-menu-item--highlighted': props.highlighted,
				'cdx-menu-item--enabled': !props.disabled,
				'cdx-menu-item--disabled': props.disabled,
				'cdx-menu-item--highlight-query': highlightQuery.value,
				'cdx-menu-item--bold-label': props.boldLabel,
				'cdx-menu-item--hide-description-overflow': props.hideDescriptionOverflow
			};
		} );

		// If a URL is provided for this menu item, the content will be wrapped in an <a> tag.
		// Otherwise, it'll just be wrapped in a <span>.
		const contentTag = computed( () => props.url ? 'a' : 'span' );

		// Get the title, which will be passed to the Title component. Must be a string.
		const title = computed( () => props.label || String( props.value ) );

		// If there's a thumbnail image, set up the value of the background-image rule for the
		// thumbnail <span>.
		const thumbnailBackgroundImage = computed( () => {
			if ( props.thumbnail ) {
				const escapedUrl = props.thumbnail.url.replace( /([\\"\n])/g, '\\$1' );
				return `url("${escapedUrl}")`;
			}
			return '';
		} );

		return {
			onMouseEnter,
			onMouseDown,
			onClick,
			highlightQuery,
			rootClasses,
			contentTag,
			title,
			thumbnailBackgroundImage,
			defaultThumbnailIcon: cdxIconImageLayoutFrameless
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
@min-width-select: 280px;
@line-height-component: unit( ( 20 / @font-size-browser / @font-size-base ), em );

@padding-vertical-menu-item: 8px;

// The size of the input icon and footer icon containers in the TypeaheadSearch component, and the
// thumbnail in this component. We want these to be the same size so that these figures vertically
// line up nicely when they are used together in the TypeaheadSearch component.
@size-search-figure: unit( ( 36 / @font-size-browser / @font-size-base ), em );

@margin-end-menu-item-thumbnail: @padding-vertical-menu-item;
@border-color-menu-item-thumbnail: @color-base80;
@box-shadow-menu-item-thumbnail: 0 0 1px 1px @border-color-menu-item-thumbnail;

@background-color-menu-item-placeholder: @background-color-framed;
// Lighter than `@color-accessory`. See T286851.
@color-menu-item-thumbnail-placeholder-icon: @color-placeholder;

.cdx-menu-item {
	list-style: none;
	position: relative;
	padding: @padding-vertical-menu-item @padding-horizontal-base;
	line-height: @line-height-100;
	transition-property: @transition-property-base;
	transition-duration: @transition-duration-base;

	&__content {
		display: flex;
		align-items: center;
		text-decoration: none;
		.hyphens();
	}

	// Make sure the icon inherits the content element's color.
	.cdx-icon {
		color: inherit;
	}

	&__text__description {
		display: block;
	}

	&__thumbnail-placeholder,
	&__thumbnail {
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
		// Prevent thumbnail width from shrinking when descriptions are long.
		flex-shrink: 0;
		width: @size-search-figure;
		height: @size-search-figure;
		margin-right: @margin-end-menu-item-thumbnail;
		border-radius: @border-radius-base;
		// Borders tend to cut into the border-radius and it makes the border-radius look smaller
		// on the inside of the box than the outside.
		// Using a box-shadow disguised as a border prevents that from happening.
		box-shadow: @box-shadow-menu-item-thumbnail;
	}

	&__thumbnail {
		display: inline-block;
	}

	&__icon {
		margin-right: @margin-end-menu-item-thumbnail;
	}

	&__thumbnail-placeholder {
		background-color: @background-color-menu-item-placeholder;
		display: inline-flex;
		align-items: center;
		justify-content: center;

		&__icon {
			color: @color-menu-item-thumbnail-placeholder-icon;
		}
	}

	&--highlight-query {
		.cdx-menu-item__content {
			line-height: normal;
		}
	}

	&--bold-label {
		.cdx-menu-item__text__label {
			font-weight: @font-weight-bold;
		}
	}

	&--hide-description-overflow {
		.cdx-menu-item__text {
			// Prevent text section (label/title and description) from overflowing its container.
			// This is needed once we apply the `white-space: nowrap` rule to the description text
			// below via `.text-overflow()` mixin.
			overflow: hidden;
		}

		.cdx-menu-item__text__description {
			.text-overflow( @visible: false );
		}
	}

	&--enabled {
		.cdx-menu-item__content {
			// Color for all content, including icon and text.
			color: @color-base;
		}

		.cdx-menu-item__text__description {
			// Different color for description.
			color: @color-accessory;
		}

		&:hover,
		&.cdx-menu-item--highlighted {
			background-color: @background-color-base--hover;
			cursor: @cursor-base--hover;
		}

		&.cdx-menu-item--active,
		&.cdx-menu-item--active:hover {
			background-color: @background-color-base--active;

			.cdx-menu-item__content,
			.cdx-menu-item__text__description {
				color: @color-progressive;
			}
		}

		&.cdx-menu-item--selected,
		&.cdx-menu-item--selected:hover {
			background-color: @background-color-base--active;
		}

		&.cdx-menu-item--selected:hover,
		&.cdx-menu-item--selected.cdx-menu-item--highlighted {
			.cdx-menu-item__content,
			.cdx-menu-item__text__description {
				color: @color-progressive;
			}
		}
	}

	/* stylelint-disable no-descending-specificity */
	&--disabled {
		cursor: @cursor-base--disabled;

		.cdx-menu-item__content,
		.cdx-menu-item__text__description {
			color: @color-base--disabled;
		}
	}
	/* stylelint-enable no-descending-specificity */
}
</style>

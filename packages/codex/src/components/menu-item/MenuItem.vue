<template>
	<li
		:id="id"
		role="option"
		class="cdx-menu-item"
		:class="rootClasses"
		:aria-disabled="disabled"
		:aria-selected="selected"
		@mouseenter="onMouseEnter"
		@mouseleave="onMouseLeave"
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
				<cdx-thumbnail
					v-if="showThumbnail"
					:thumbnail="thumbnail"
					class="cdx-menu-item__thumbnail"
				/>

				<cdx-icon
					v-else-if="icon"
					:icon="icon"
					class="cdx-menu-item__icon"
				/>

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

					<!-- Item label supporting text. -->
					<template v-if="supportingText">
						<!-- eslint-disable-next-line vue/no-useless-mustaches -->
						{{ ' ' }}
						<span
							class="cdx-menu-item__text__supporting-text"
							:lang="language?.supportingText"
						>
							<bdi>{{ supportingText }}</bdi>
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
import { Icon } from '@wikimedia/codex-icons';
import CdxIcon from '../icon/Icon.vue';
import CdxThumbnail from '../thumbnail/Thumbnail.vue';
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

	components: { CdxIcon, CdxThumbnail, CdxSearchResultTitle },

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
		 * Text that supports the label. Supporting text will appear next to the label in a more
		 * subtle color.
		 */
		supportingText: {
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
		 * Optional language codes for label, match, supporting text, and description.
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
		 * @property {MenuState} menuState State to change
		 * @property {boolean} setState Whether to set that state to this menu item
		 */
		'change'
	],

	setup: ( props, { emit } ) => {
		const onMouseEnter = () => {
			emit( 'change', 'highlighted', true );
		};

		const onMouseLeave = () => {
			// Remove visual highlighted state. This will also remove the visual active state while
			// maintaining the menu item's active status within the menu. See comments on the
			// `--active` class below for more details.
			emit( 'change', 'highlighted', false );
		};

		const onMouseDown = ( e: MouseEvent ) => {
			// Only apply the active state on main mouse button click. This avoids applying active
			// styles on right click, for example. See T304605.
			if ( e.button === 0 ) {
				emit( 'change', 'active', true );
			}
		};

		const onClick = () => {
			emit( 'change', 'selected', true );
		};

		const highlightQuery = computed( () => props.searchQuery.length > 0 );

		const rootClasses = computed( () : Record<string, boolean> => {
			return {
				'cdx-menu-item--selected': props.selected,
				// Only show the active visual state when the menu item is both active and
				// highlighted. This means, on mousedown -> mouseleave, the menu item is still
				// technically tracked by the menu as active, but will not appear active to the
				// user. This also means in the case of mousedown -> mouseleave -> mouseenter, the
				// menu item will appear active again, and on click (releasing the mouse button),
				// the item will be selected.
				'cdx-menu-item--active': props.active && props.highlighted,
				'cdx-menu-item--highlighted': props.highlighted,
				'cdx-menu-item--enabled': !props.disabled,
				'cdx-menu-item--disabled': props.disabled,
				'cdx-menu-item--highlight-query': highlightQuery.value,
				'cdx-menu-item--bold-label': props.boldLabel,
				'cdx-menu-item--has-description': !!props.description,
				'cdx-menu-item--hide-description-overflow': props.hideDescriptionOverflow
			};
		} );

		// If a URL is provided for this menu item, the content will be wrapped in an <a> tag.
		// Otherwise, it'll just be wrapped in a <span>.
		const contentTag = computed( () => props.url ? 'a' : 'span' );

		// Get the title, which will be passed to the Title component. Must be a string.
		const title = computed( () => props.label || String( props.value ) );

		return {
			onMouseEnter,
			onMouseLeave,
			onMouseDown,
			onClick,
			highlightQuery,
			rootClasses,
			contentTag,
			title
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/dist/theme-wikimedia-ui.less';
@import ( reference ) '../../themes/mixins/common.less';

// TODO: Tokenize.
@font-size-browser: 16;
@font-size-base: 14 / @font-size-browser;
@size-icon-relative: unit( ( @size-icon / @font-size-browser / @font-size-base ), em );

.cdx-menu-item {
	list-style: none;
	position: relative;
	padding: @spacing-50 @spacing-75;
	line-height: @line-height-medium;
	transition-property: @transition-property-base;
	transition-duration: @transition-duration-base;

	&__content {
		display: flex;
		align-items: center;
		// TODO: change from this deprecated value to @line-height-small.
		// This will require some associated changes in thumbnail size, see T322384
		line-height: @line-height-x-small;
		.hyphens();

		&,
		&:hover {
			text-decoration: @text-decoration-none;
		}
	}

	&--has-description &__content {
		align-items: flex-start;
	}

	&__text__description {
		display: block;
	}

	&__thumbnail {
		margin-right: @spacing-50;
	}

	&__icon {
		// Make sure the icon inherits the content element's color.
		color: inherit;
		margin-right: @spacing-50;

		// Icons must scale with font size to maintain top alignment with the label text.
		svg {
			width: @size-icon-relative;
			height: @size-icon-relative;
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
			.text-overflow( @param-visible: false );
		}
	}

	&--enabled {
		// We need to set the color here, so it applies to all icons and text, regardless of whether
		// the default slot is customized or not. Then, we need to specifically target the
		// `&__content` element, which may be an anchor tag, since many sites set a color on `a`.
		&,
		.cdx-menu-item__content {
			color: @color-base;
		}

		.cdx-menu-item__text__supporting-text,
		.cdx-menu-item__text__description {
			color: @color-subtle;
		}

		&:hover,
		&.cdx-menu-item--highlighted {
			background-color: @background-color-interactive;
			cursor: @cursor-base--hover;
		}

		&.cdx-menu-item--active,
		&.cdx-menu-item--active:hover {
			background-color: @background-color-progressive-subtle;
			color: @color-progressive;

			.cdx-menu-item__content,
			.cdx-menu-item__text__description {
				color: @color-progressive;
			}
		}

		&.cdx-menu-item--selected,
		&.cdx-menu-item--selected:hover {
			background-color: @background-color-progressive-subtle;
		}

		&.cdx-menu-item--selected:hover,
		&.cdx-menu-item--selected.cdx-menu-item--highlighted {
			color: @color-progressive;

			.cdx-menu-item__content,
			.cdx-menu-item__text__description {
				color: @color-progressive;
			}
		}
	}

	/* stylelint-disable no-descending-specificity */
	&--disabled {
		color: @color-disabled;
		cursor: @cursor-base--disabled;

		.cdx-menu-item__text__description {
			color: @color-disabled;
		}
	}
	/* stylelint-enable no-descending-specificity */
}
</style>

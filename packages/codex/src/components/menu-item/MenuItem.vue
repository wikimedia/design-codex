<template>
	<li
		:id="id"
		role="option"
		class="cdx-menu-item"
		:class="rootClasses"
		:aria-disabled="disabled"
		:aria-selected="selected && !multiselect ? true : undefined"
		:aria-checked="selected && multiselect ? true : undefined"
		@mousemove="onMouseMove"
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
				<cdx-icon
					v-if="multiselect && selected"
					:icon="cdxIconCheck"
					size="small"
					class="cdx-menu-item__selected-icon"
				/>
			</component>
		</slot>
	</li>
</template>

<script lang="ts">
import { PropType, computed, defineComponent } from 'vue';
import { Icon, cdxIconCheck } from '@wikimedia/codex-icons';
import CdxIcon from '../icon/Icon.vue';
import CdxThumbnail from '../thumbnail/Thumbnail.vue';
import CdxSearchResultTitle from '../search-result-title/SearchResultTitle.vue';
import { MenuState, Thumbnail, MenuItemLanguageData, ButtonAction, MenuItemValue } from '../../types';

/**
 * A selectable option included within a Menu.
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
			type: [ String, Number ] as PropType<MenuItemValue>,
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
		 * Whether this menu item is visually highlighted due to hover or keyboard navigation.
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
		 * anchor `<a>` element.
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
		 *
		 * @default {}
		 */
		language: {
			type: Object as PropType<MenuItemLanguageData>,
			default: () => ( {} )
		},

		/**
		 * MenuItems inside a MenuButton can also support an "action" prop
		 */
		action: {
			type: String as PropType<ButtonAction>,
			default: 'default'
		},

		/**
		 * Whether this menu is in multiselect mode.
		 */
		multiselect: {
			type: Boolean,
			default: false
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
		/**
		 * Handle mousemove event.
		 *
		 * We use mousemove to achieve these behaviors:
		 *  - MenuItem will not be highlighted if the cursor happens to be on top of it when the
		 *    Menu expands, only when the user intentionally moves the mouse.
		 *  - In the case that the cursor is over the MenuItem but another MenuItem is highlighted,
		 *    on mousemove this item will become highlighted immediately.
		 */
		const onMouseMove = () => {
			// Only emit an event if this item is not already highlighted. This is necessary because
			// mousemove will fire on every move of the mouse over this element.
			if ( !props.highlighted ) {
				emit( 'change', 'highlighted', true );
			}
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

		const rootClasses = computed( () : Record<string, boolean> => ( {
			'cdx-menu-item--selected': props.selected,
			// Only show the active visual state when the menu item is both active and
			// highlighted. This means, on mousedown -> mouseleave, the menu item is still
			// technically tracked by the menu as active, but will not appear active to the
			// user. This also means in the case of mousedown -> mouseleave -> mouseenter, the
			// menu item will appear active again, and on click (releasing the mouse button),
			// the item will be selected.
			'cdx-menu-item--active': props.active && props.highlighted,
			'cdx-menu-item--highlighted': props.highlighted,
			'cdx-menu-item--destructive': props.action && props.action === 'destructive',
			'cdx-menu-item--enabled': !props.disabled,
			'cdx-menu-item--disabled': props.disabled,
			'cdx-menu-item--highlight-query': highlightQuery.value,
			'cdx-menu-item--bold-label': props.boldLabel,
			'cdx-menu-item--has-description': !!props.description,
			'cdx-menu-item--hide-description-overflow': props.hideDescriptionOverflow
		} ) );

		// If a URL is provided for this menu item, the content will be wrapped in an `<a>` element.
		// Otherwise, it'll just be wrapped in a `<span>` element.
		const contentTag = computed( () => props.url ? 'a' : 'span' );

		// Get the title, which will be passed to the Title component. Must be a string.
		const title = computed( () => props.label || String( props.value ) );

		return {
			onMouseMove,
			onMouseLeave,
			onMouseDown,
			onClick,
			highlightQuery,
			rootClasses,
			contentTag,
			title,
			cdxIconCheck
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';
@import ( reference ) '../../themes/mixins/common.less';

.cdx-menu-item {
	list-style: none;
	position: relative;
	padding: @spacing-50 @spacing-75;
	font-size: @font-size-medium;
	line-height: @line-height-small;
	transition-property: @transition-property-base;
	transition-duration: @transition-duration-base;

	&__content {
		display: flex;
		align-items: center;
		.break-words();

		&,
		&:hover {
			text-decoration: @text-decoration-none;
		}
	}

	&--has-description &__content {
		align-items: flex-start;
	}

	&__text {
		// Make sure long words won't overflow the container.
		max-width: @size-full;

		&__description {
			display: block;
		}
	}

	&__thumbnail.cdx-thumbnail {
		margin-right: @spacing-50;
	}

	&__icon {
		// Setting the height of the icon to the line-height of the accompanying text
		// to ensure centering of the icon to text
		height: @line-height-small;
		margin-right: @spacing-50;

		&.cdx-icon {
			color: @color-subtle;
		}
	}

	&__selected-icon {
		// Setting the height of the icon to the line-height of the accompanying text
		// to ensure centering of the icon to text
		height: @line-height-small;
		margin-left: auto;

		&.cdx-icon {
			color: inherit;
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
		// `&__content` element, which may be an anchor element, since many sites set a color
		// on `<a>`.
		&,
		.cdx-menu-item__content {
			color: @color-base;
		}

		.cdx-menu-item__text__supporting-text,
		.cdx-menu-item__text__description {
			color: @color-subtle;
		}

		&.cdx-menu-item--highlighted {
			background-color: @background-color-interactive-subtle--hover;
			cursor: @cursor-base--hover;
		}

		&.cdx-menu-item--active {
			background-color: @background-color-interactive-subtle--active;
		}

		&.cdx-menu-item--selected {
			background-color: @background-color-progressive-subtle;
			color: @color-progressive;

			.cdx-menu-item__content,
			.cdx-menu-item__text__supporting-text,
			.cdx-menu-item__text__description,
			.cdx-menu-item__icon {
				color: @color-progressive;
			}
		}

		&.cdx-menu-item--selected.cdx-menu-item--highlighted {
			background-color: @background-color-progressive-subtle--hover;

			.cdx-menu-item__content,
			.cdx-menu-item__text__supporting-text,
			.cdx-menu-item__text__description,
			.cdx-menu-item__icon {
				color: @color-progressive--hover;
			}
		}

		&.cdx-menu-item--selected.cdx-menu-item--active {
			background-color: @background-color-progressive-subtle--active;

			.cdx-menu-item__content,
			.cdx-menu-item__text__supporting-text,
			.cdx-menu-item__text__description,
			.cdx-menu-item__icon {
				color: @color-progressive--active;
			}
		}
	}

	/* stylelint-disable no-descending-specificity */
	&--disabled {
		color: @color-disabled;
		cursor: @cursor-base--disabled;

		.cdx-menu-item__text__description,
		.cdx-menu-item__icon {
			color: inherit;
		}
	}
	/* stylelint-enable no-descending-specificity */

	/* stylelint-disable no-descending-specificity */
	&--destructive {
		.cdx-menu-item__content,
		.cdx-menu-item__text__supporting-text,
		.cdx-menu-item__text__description,
		.cdx-menu-item__icon {
			color: @color-destructive;
		}

		&.cdx-menu-item--highlighted {
			background-color: @background-color-destructive-subtle--hover;

			.cdx-menu-item__content,
			.cdx-menu-item__text__supporting-text,
			.cdx-menu-item__text__description,
			.cdx-menu-item__icon {
				color: @color-destructive--hover;
			}
		}

		&.cdx-menu-item--active {
			background-color: @background-color-destructive-subtle--active;

			.cdx-menu-item__content,
			.cdx-menu-item__text__supporting-text,
			.cdx-menu-item__text__description,
			.cdx-menu-item__icon {
				color: @color-destructive--active;
			}
		}

		&.cdx-menu-item--selected {
			background-color: @background-color-destructive-subtle;
			color: @color-destructive;

			.cdx-menu-item__content,
			.cdx-menu-item__text__supporting-text,
			.cdx-menu-item__text__description,
			.cdx-menu-item__icon {
				color: @color-destructive;
			}
		}

		&.cdx-menu-item--selected.cdx-menu-item--highlighted {
			background-color: @background-color-destructive-subtle--hover;

			.cdx-menu-item__content,
			.cdx-menu-item__text__supporting-text,
			.cdx-menu-item__text__description,
			.cdx-menu-item__icon {
				color: @color-destructive--hover;
			}
		}

		&.cdx-menu-item--selected.cdx-menu-item--active {
			background-color: @background-color-destructive-subtle--active;

			.cdx-menu-item__content,
			.cdx-menu-item__text__supporting-text,
			.cdx-menu-item__text__description,
			.cdx-menu-item__icon {
				color: @color-destructive--active;
			}
		}
	}
	/* stylelint-enable no-descending-specificity */
}
</style>

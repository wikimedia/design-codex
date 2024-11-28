<template>
	<nav class="cdx-breadcrumb" aria-label="Breadcrumb">
		<ol>
			<li v-if="overflowItems.length" class="cdx-breadcrumb__overflow">
				<cdx-menu-button
					v-model:selected="selection"
					:menu-items="overflowMenuItems"
					:aria-label="breadcrumbOverflowAriaLabel"
					class="cdx-breadcrumb__overflow-button"
				>
					<cdx-icon size="small" :icon="cdxIconEllipsis" />
				</cdx-menu-button>
				<cdx-icon
					size="x-small"
					class="cdx-breadcrumb__separator-icon"
					aria-hidden="true"
					:icon="cdxIconDoubleChevronEnd"
				/>
			</li>
			<li
				v-for="( item, index ) in Items"
				:key="index">
				<a
					v-tooltip:top="item.isTruncated ? item.fullText : undefined"
					:title="item.text"
					:href="item.href"
					:aria-current="item.ariaCurrent"
					class="cdx-breadcrumb__link"
				>
					{{ item.text }}
				</a>
				<cdx-icon
					v-if="item.showDivider"
					size="x-small"
					class="cdx-breadcrumb__separator-icon"
					aria-hidden="true"
					:icon="cdxIconNext"
				/>
			</li>
		</ol>
	</nav>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue';
import { BreadcrumbItem, MenuButtonItemData, MenuGroupData } from '../../types';
import {
	cdxIconNext,
	cdxIconDoubleChevronEnd,
	cdxIconEllipsis
} from '@wikimedia/codex-icons';
import CdxIcon from '../../components/icon/Icon.vue';
import CdxMenuButton from '../../components/menu-button/MenuButton.vue';
import CdxTooltip from '../../components/tooltip/Tooltip';
import useI18n from '../../composables/useI18n';

/**
 * Shows a breadcrumb trail for the current page.
 * Includes links to parent pages for easy navigation.
 * Helps users see where they are and go back if needed.
 */
export default defineComponent( {
	name: 'CdxBreadcrumb',
	components: { CdxIcon, CdxMenuButton },
	directives: {
		tooltip: CdxTooltip
	},
	props: {
		/**
		 * An array of breadcrumb items.
		 * Each item is an object with the following:
		 * - `text` (string): The display text.
		 * - `href` (string): The URL. Use an empty string if not needed.
		 * - `active` (boolean, optional): Marks the current page.
		 * - `ariaCurrent` (`'page'`, optional): ARIA attribute for the current page.
		 * - `showDivider` (boolean): Shows a divider after the item.
		 * - `isTruncated` (boolean, optional): Truncates the text if needed.
		 * - `fullText` (string, optional): Full text for tooltips or accessibility.
		 */
		items: {
			type: Array as PropType<BreadcrumbItem[]>,
			required: true
		},
		/**
		 * The minimum number of characters before truncation occurs.
		 * This allows you to configure the length at which breadcrumb item texts are truncated.
		 */
		truncateLength: {
			type: Number,
			default: 10,
			validator: ( value: number ) => value >= 5
		},
		/**
		 * The maximum number of visible breadcrumb items.
		 * If the number of items exceeds this number,
		 * the extra items will be moved into an overflow menu.
		 */
		maxVisible: {
			type: Number,
			default: 6,
			validator: ( value: number ) => {
				if ( typeof value !== 'number' ) {
					// eslint-disable-next-line no-console
					console.warn(
						'[CdxBreadcrumb]: The "maxVisible" property must be of type number.'
					);
					return false;
				}
				if ( value < 1 ) {
					// eslint-disable-next-line no-console
					console.warn(
						'[CdxBreadcrumb]: The "maxVisible" property must be at least 1.'
					);
					return false;
				}
				return true;
			}
		}
	},
	setup( props ) {
		const selection = ref( null );

		/**
		 * Computes the effective maximum number of visible breadcrumb items.
		 * If `maxVisible` is less than 1, it falls back to 1.
		 */
		const effectiveMaxVisible = computed( () => props.maxVisible >= 1 ? props.maxVisible : 1 );

		/**
		 * Computes the visible breadcrumb items that will be displayed in the breadcrumb trail.
		 * These are the most recent breadcrumb items, up to the maximum number of visible items.
		 * Also handles truncation of page names according to content overflow guidelines.
		 */
		const Items = computed<BreadcrumbItem[]>( () => {
			const visibleItems = props.items.slice( -effectiveMaxVisible.value );

			return visibleItems.map( ( item, index ) => {
				const isCurrentPage = item.active;
				const { truncatedText, isTruncated } = truncateText( item.text );
				return {
					...item,
					href: item.href ?? '',
					ariaCurrent: isCurrentPage ? 'page' : undefined,
					showDivider: index < visibleItems.length - 1,
					text: truncatedText,
					fullText: item.text,
					isTruncated: isTruncated
				};
			} );
		} );

		/**
		 * Computes the overflow items that will be placed in the overflow menu.
		 * These are the earliest breadcrumb items, from first to the ones
		 * that are not in the visible items.
		 */
		const overflowItems = computed( (): BreadcrumbItem[] => {
			if ( props.items.length > effectiveMaxVisible.value ) {
				const overflowEndIndex =
					effectiveMaxVisible.value === 1 ?
						props.items.length - 1 :
						props.items.length - effectiveMaxVisible.value;
				return props.items.slice( 0, overflowEndIndex ).map( ( item ) => ( {
					...item,
					href: item.href ?? '',
					showDivider: false
				} ) );
			}
			return [];
		} );

		/**
		 * Computes the menu items to be displayed in the overflow menu.
		 * These are the overflowed breadcrumb items, and should include their values and URLs.
		 */
		const overflowMenuItems = computed(
			(): ( MenuGroupData | MenuButtonItemData )[] => overflowItems.value.map( ( item ) => ( {
				label: item.text,
				value: item.href ?? item.text,
				url: item.href ?? '',
				disabled: false
			} ) )
		);

		/**
		 * i18n label message for the overflow menu button
		 */
		const breadcrumbOverflowAriaLabel = useI18n(
			'cdx-breadcrumb-overflow-label',
			'More navigation options'
		);

		/**
		 * Truncates a string to a specified number of characters before adding an ellipsis.
		 * The truncation length is determined by the `truncateLength` prop.
		 *
		 * @param {string} text - The text to truncate.
		 * @return {Object} An object containing the truncated text, and a flag indicating
		 *                  if truncation occurred.
		 */
		function truncateText( text: string ): { truncatedText: string; isTruncated: boolean } {
			const maxCharacters = props.truncateLength;
			if ( text.length > maxCharacters ) {
				return {
					truncatedText: text.slice( 0, maxCharacters ) + '…',
					isTruncated: true
				};
			}
			return {
				truncatedText: text,
				isTruncated: false
			};
		}

		return {
			cdxIconNext,
			cdxIconDoubleChevronEnd,
			cdxIconEllipsis,
			Items,
			overflowItems,
			overflowMenuItems,
			selection,
			breadcrumbOverflowAriaLabel
		};
	}
} );
</script>

<style lang="less">
@import (reference) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-breadcrumb {
	display: flex;
	flex-wrap: nowrap;
	height: @size-200;

	ol {
		list-style: none;
		display: flex;
		align-items: center;
		margin: @spacing-0;
		padding-left: @spacing-0;
	}

	li {
		display: flex;
		align-items: center;
		flex-shrink: 1;
		height: @size-150;

		.cdx-tooltip {
			background-color: @color-placeholder;
			color: @color-inverted;
			min-width: @size-150;
			max-width: @size-1600;
			border-radius: @border-radius-base;
			padding: @spacing-12 @spacing-35;
			font-size: @spacing-75;
		}
	}

	&__link {
		color: @color-progressive;
		min-width: @spacing-0;
		border-radius: @border-radius-base;
		overflow: hidden;
		font-size: @font-size-small;
		text-decoration: @text-decoration-none;
		text-overflow: @text-overflow-ellipsis;
		white-space: nowrap;

		&:hover {
			color: @color-progressive--hover;
			text-decoration: @text-decoration-underline;
		}

		&:visited {
			color: @color-visited;

			&:hover {
				color: @color-visited--hover;
			}

			&:active {
				color: @color-visited--active;
			}
		}

		&[ aria-current='page' ] {
			color: @color-base;
			font-weight: @font-weight-bold;
			pointer-events: none;
			cursor: @cursor-base;
		}
	}

	&__separator-icon {
		flex-shrink: @spacing-0;
		margin: @spacing-0 @spacing-25;
		vertical-align: middle;
	}
}

</style>

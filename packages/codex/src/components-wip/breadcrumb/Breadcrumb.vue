<template>
	<nav class="cdx-breadcrumb" :aria-label="translatedNavigationLabel">
		<ol class="cdx-breadcrumb__list">
			<li v-if="overflowItems.length" class="cdx-breadcrumb__list__overflow">
				<cdx-menu-button
					v-model:selected="selectedOverflowItem"
					:menu-items="overflowItems"
					:aria-label="translatedOverflowLabel"
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
				v-for="( item, index ) in visibleItems"
				:key="index"
				class="cdx-breadcrumb__list__item"
			>
				<a
					v-tooltip:top="item.isTruncated ? item.fullText : undefined"
					:href="item.url"
					:aria-current="item.isCurrentPage ? 'page' : undefined"
					class="cdx-breadcrumb__link"
				>
					{{ item.label }}
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
import { BreadcrumbItem, BreadcrumbData, MenuButtonItemData } from '../../types';
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
		 * An array of breadcrumb items. Items will be displayed in the order they appear. The
		 * final item should be the current page.
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
		 * Extra items will be moved into an overflow menu.
		 */
		maxVisible: {
			type: Number,
			default: 6,
			validator: ( value: number ) => {
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
		const selectedOverflowItem = ref( null );

		/**
		 * Computes the effective maximum number of visible breadcrumb items.
		 * If `maxVisible` is less than 1, it falls back to 1.
		 */
		const computedMaxVisible = computed( () => props.maxVisible >= 1 ? props.maxVisible : 1 );

		/**
		 * Computes the visible breadcrumb items that will be displayed in the breadcrumb trail.
		 * These are the most recent breadcrumb items, up to the maximum number of visible items.
		 * Also handles truncation of page names according to content overflow guidelines.
		 */
		const visibleItems = computed<BreadcrumbData[]>( () => {
			const itemsToShow = props.items.slice( -computedMaxVisible.value );

			return itemsToShow.map( ( item, index ) => {
				const { truncatedText, isTruncated } = truncateText( item.label );
				return {
					label: truncatedText,
					url: item.url,
					isCurrentPage: index === itemsToShow.length - 1,
					showDivider: index < itemsToShow.length - 1,
					fullText: item.label,
					isTruncated: isTruncated
				};
			} );
		} );

		/**
		 * Computes the overflow items that will be placed in the overflow menu.
		 * These are the earliest breadcrumb items, from first to the ones
		 * that are not in the visible items.
		 */
		const overflowItems = computed( (): MenuButtonItemData[] => {
			if ( props.items.length > computedMaxVisible.value ) {
				const overflowEndIndex =
					computedMaxVisible.value === 1 ?
						props.items.length - 1 :
						props.items.length - computedMaxVisible.value;
				return props.items.slice( 0, overflowEndIndex ).map( ( item ) => ( {
					label: item.label,
					value: item.url ?? item.label,
					url: item.url ?? ''
				} ) );
			}
			return [];
		} );

		/**
		 * i18n label message for the overflow menu button
		 */
		const translatedOverflowLabel = useI18n(
			'cdx-breadcrumb-overflow-label',
			'More navigation options'
		);

		/**
		 * i18n label message for the `<nav>` element's navigation type.
		 */
		const translatedNavigationLabel = useI18n(
			'cdx-breadcrumb-navigation-label',
			'Breadcrumb'
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
			selectedOverflowItem,
			visibleItems,
			overflowItems,
			translatedOverflowLabel,
			translatedNavigationLabel,
			cdxIconNext,
			cdxIconDoubleChevronEnd,
			cdxIconEllipsis
		};
	}
} );
</script>

<style lang="less">
@import (reference) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';
@import (reference) '../../themes/mixins/public/link.less';

.cdx-breadcrumb {
	display: flex;
	align-items: center;
	gap: @spacing-25;

	&__list {
		list-style: none;
		display: flex;
		align-items: center;
		gap: @spacing-25;
		margin: @spacing-0;
		padding-left: @spacing-0;

		&__overflow,
		&__item {
			display: flex;
			align-items: center;
			gap: @spacing-25;
		}

		&__item {
			flex-shrink: 1;

			.cdx-tooltip {
				background-color: @color-placeholder;
				font-size: @font-size-small;
			}
		}
	}

	&__link {
		.cdx-mixin-link-base();
		overflow: hidden;
		text-overflow: @text-overflow-ellipsis;
		white-space: nowrap;

		&[ aria-current='page' ] {
			color: @color-base;
			font-weight: @font-weight-bold;
			pointer-events: none;
			cursor: @cursor-base;
		}
	}

	&__separator-icon {
		flex-shrink: 0;
	}
}

</style>

<template>
	<div class="cdx-table-pager">
		<div class="cdx-table-pager__start">
			<cdx-select
				v-model:selected="wrappedItemsPerPage"
				:default-label="defaultItemsPerPageLabel"
				:menu-items="paginationSizeOptions"
			>
				<template #label="{ selectedMenuItem, defaultLabel }">
					<span v-if="selectedMenuItem">
						<span>{{ currentItemsPerPageLabel }}</span>
					</span>
					<span v-else>
						{{ defaultLabel }}
					</span>
				</template>
			</cdx-select>
		</div>

		<div class="cdx-table-pager__center">
			<!-- @slot pagination status -->
			<slot />
		</div>

		<div class="cdx-table-pager__end">
			<cdx-button
				:disabled="prevDisabled"
				class="cdx-table-pager__button-first"
				weight="quiet"
				:aria-label="btnLabelFirst"
				@click="$emit( 'first' )"
			>
				<cdx-icon :icon="cdxIconMoveFirst" />
			</cdx-button>

			<cdx-button
				:disabled="prevDisabled"
				class="cdx-table-pager__button-prev"
				weight="quiet"
				:aria-label="btnLabelPrev"
				@click="$emit( 'prev' )"
			>
				<cdx-icon :icon="cdxIconPrevious" />
			</cdx-button>

			<cdx-button
				:disabled="nextDisabled"
				class="cdx-table-pager__button-next"
				weight="quiet"
				:aria-label="btnLabelNext"
				@click="$emit( 'next' )"
			>
				<cdx-icon :icon="cdxIconNext" />
			</cdx-button>

			<cdx-button
				:disabled="nextDisabled || lastDisabled"
				class="cdx-table-pager__button-last"
				weight="quiet"
				:aria-label="btnLabelLast"
				@click="$emit( 'last' )"
			>
				<cdx-icon :icon="cdxIconMoveLast" />
			</cdx-button>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType, toRef } from 'vue';
import { cdxIconMoveFirst, cdxIconMoveLast, cdxIconNext, cdxIconPrevious } from '@wikimedia/codex-icons';
import CdxButton from '../button/Button.vue';
import CdxIcon from '../icon/Icon.vue';
import CdxSelect from '../select/Select.vue';
import useModelWrapper from '../../composables/useModelWrapper';
import useI18n from '../../composables/useI18n';

import { TablePaginationSizeOption } from '../../types';

export default defineComponent( {
	name: 'CdxTablePager',
	components: { CdxButton, CdxIcon, CdxSelect },
	props: {
		paginationSizeOptions: {
			type: Array as PropType<TablePaginationSizeOption[]>,
			required: true
		},

		itemsPerPage: {
			type: Number,
			required: true
		},

		nextDisabled: {
			type: Boolean,
			default: false
		},

		prevDisabled: {
			type: Boolean,
			default: false
		},

		lastDisabled: {
			type: Boolean,
			default: false
		}
	},

	emits: [
		/**
		 * When the items per page option changes
		 *
		 * @property {number} itemsPerPage the number of items to display
		 */
		'update:itemsPerPage',

		/**
		 * Emitted when the user requests the first page of data
		 */
		'first',

		/**
		 * Emitted when the user requests the last page of data
		 */
		'last',

		/**
		 * Emitted when the user requests the next page of data
		 */
		'next',

		/**
		 * Emitted when the user requests the previous page of data
		 */
		'prev'
	],

	setup( props, { emit } ) {
		const wrappedItemsPerPage = useModelWrapper(
			toRef( props, 'itemsPerPage' ),
			emit,
			'update:itemsPerPage'
		);

		const defaultItemsPerPageLabel = useI18n(
			'cdx-table-pager-items-per-page-default',
			'Results per page'
		);

		const currentItemsPerPageLabel = useI18n(
			'cdx-table-pager-items-per-page-current',
			( current ) => `${ current } rows`,
			[ wrappedItemsPerPage ]
		);

		const btnLabelFirst = useI18n(
			'cdx-table-pager-button-first-page',
			'First page'
		);

		const btnLabelNext = useI18n(
			'cdx-table-pager-button-next-page',
			'Next page'
		);

		const btnLabelPrev = useI18n(
			'cdx-table-pager-button-prev-page',
			'Previous page'
		);

		const btnLabelLast = useI18n(
			'cdx-table-pager-button-last-page',
			'Last page'
		);

		return {
			defaultItemsPerPageLabel,
			currentItemsPerPageLabel,
			btnLabelFirst,
			btnLabelNext,
			btnLabelPrev,
			btnLabelLast,

			wrappedItemsPerPage,
			cdxIconPrevious,
			cdxIconNext,
			cdxIconMoveFirst,
			cdxIconMoveLast
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';
@import ( reference ) '../../themes/mixins/public/css-icon.less';

.cdx-table-pager {
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	justify-content: space-between;
	gap: @spacing-75;
	padding: @spacing-75;

	@media screen and ( min-width: @min-width-breakpoint-tablet ) {
		flex-wrap: nowrap;
	}

	&__start {
		.cdx-select,
		.cdx-select-vue__handle {
			min-width: @size-800;
		}
	}

	&__center {
		color: @color-subtle;
		flex: 1 1 40%;
		font-size: @font-size-medium;
		text-align: center;

		@media screen and ( min-width: @min-width-breakpoint-tablet ) {
			flex: 0 1 auto;
		}
	}

	&__end {
		display: flex;
		flex: 1 0 100%;
		justify-content: space-between;
		gap: @spacing-25;

		@media screen and ( min-width: @min-width-breakpoint-tablet ) {
			flex: 0 1 auto;
		}
	}

	// Set up CSS-only icons for the buttons.
	&__icon {
		&--first {
			.cdx-mixin-css-icon( @cdx-icon-move-first );
		}

		&--previous {
			.cdx-mixin-css-icon( @cdx-icon-previous );
		}

		&--next {
			.cdx-mixin-css-icon( @cdx-icon-next );
		}

		&--last {
			.cdx-mixin-css-icon( @cdx-icon-move-last );
		}
	}
}
</style>

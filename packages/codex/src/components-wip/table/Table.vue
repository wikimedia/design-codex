<template>
	<div class="cdx-table">
		<div
			v-if="!hideCaption || ( $slots.header && $slots.header().length > 0 )"
			class="cdx-table__header"
		>
			<!-- We need this div, even if the caption is hidden, to ensure the
				slot is aligned to the end. -->
			<div class="cdx-table__header__caption">
				<!-- Visible table title. -->
				<template v-if="!hideCaption">
					{{ caption }}
				</template>
			</div>
			<div class="cdx-table__header__slot">
				<!-- @slot Header content. Not to be confused with `<thead>`; use the default
					slot to customize that. -->
				<slot name="header" />
			</div>
		</div>
		<div class="cdx-table__table-wrapper">
			<table class="cdx-table__table" :class="tableClasses">
				<!-- Visually-hidden caption element, for assistive technology. -->
				<caption>{{ caption }}</caption>
				<thead v-if="columns.length > 0">
					<th v-if="useRowSelection" class="cdx-table__row-selection">
						<cdx-checkbox
							v-model="selectAll"
							:hide-label="true"
							:indeterminate="selectAllIndeterminate"
							@update:model-value="handleSelectAll"
						>
							{{ selectAllLabel }}
						</cdx-checkbox>
					</th>
					<th
						v-for="column in columns"
						:key="column.id"
						:class="getCellClass( column )"
						:style="getCellStyle( column )"
					>
						<span class="cdx-table__th-content">
							{{ column.label }}
							<cdx-icon
								v-if="column.allowSort"
								:icon="cdxIconSortVertical"
								size="small"
								class="cdx-table__table__sort-icon"
							/>
						</span>
					</th>
				</thead>
				<tbody v-if="data.length > 0">
					<tr
						v-for="( row, rowIndex ) in data"
						:key="rowIndex"
						:class="getRowClass( rowIndex )"
					>
						<td v-if="useRowSelection">
							<cdx-checkbox
								v-model="wrappedSelectedRows"
								:input-value="rowIndex"
								:hide-label="true"
								@update:model-value="handleRowSelection"
							>
								{{ selectRowLabel }}
							</cdx-checkbox>
						</td>
						<component
							:is="getCellElement( column.id )"
							v-for="column in columns"
							:key="column.id"
							:class="getCellClass( column )"
						>
							<!--
								@slot Table cell content, per column.
								@binding item Data for the cell
							-->
							<slot :name="'item-' + column.id" :item="row[ column.id ]">
								{{ row[ column.id ] }}
							</slot>
						</component>
					</tr>
				</tbody>
				<!-- @slot Custom thead, tbody, and tfoot. -->
				<slot />
			</table>
		</div>
		<div v-if="$slots.footer && $slots.footer().length > 0" class="cdx-table__footer">
			<!-- @slot Footer content. Not to be confused with `<tfoot>`; use the default
				slot to add that. -->
			<slot name="footer" />
		</div>
	</div>
</template>

<script lang="ts">
import { PropType, defineComponent, nextTick, ref, toRef, computed } from 'vue';
import { TableColumn, TableRow } from '../../types';
import { TableTextAlignments } from '../../constants';
import useModelWrapper from '../../composables/useModelWrapper';
import { makeStringTypeValidator } from '../../utils/stringTypeValidator';
import CdxCheckbox from '../../components/checkbox/Checkbox.vue';
import CdxIcon from '../../components/icon/Icon.vue';
import { cdxIconSortVertical } from '@wikimedia/codex-icons';

const tableTextAlignmentsValidator = makeStringTypeValidator( TableTextAlignments );

/**
 * An HTML table for displaying data.
 */
export default defineComponent( {
	name: 'CdxTable',
	components: { CdxCheckbox, CdxIcon },
	props: {
		/**
		 * Table caption.
		 *
		 * Required to support users of assistive technology, but can be visually hidden.
		 */
		caption: {
			type: String,
			required: true
		},
		/**
		 * Whether to visually hide the caption.
		 */
		hideCaption: {
			type: Boolean,
			default: false
		},
		/**
		 * Column definitions.
		 */
		columns: {
			type: Array as PropType<TableColumn[]>,
			default: () => {
				return [];
			},
			validator: ( value: TableColumn[] ) => {
				const ids = value.map( ( column: TableColumn ) => column.id );
				const hasUniqueIds = ( new Set( ids ) ).size === ids.length;
				if ( !hasUniqueIds ) {
					// Vue prints an unhelpful warning when the validator fails. Instead, print our
					// own warning, then return true regardless.
					// eslint-disable-next-line no-console
					console.warn(
						'Each column in the `columns` prop of CdxTable must have a unique `id`.'
					);
				}
				return true;
			}
		},
		/**
		 * Table data.
		 *
		 * An array of objects, with each object representing the data for a table row. Item keys
		 * should align with column IDs, as defined in the `columns` prop.
		 */
		data: {
			type: Array as PropType<TableRow[]>,
			default: () => {
				return [];
			}
		},
		/**
		 * Whether to use `<th>` for the first cell in each row.
		 */
		useRowHeaders: {
			type: Boolean,
			default: false
		},
		/**
		 * Whether vertical borders separating columns should be rendered.
		 */
		showVerticalBorders: {
			type: Boolean,
			default: false
		},
		/**
		 * Whether to enable row selection.
		 */
		useRowSelection: {
			type: Boolean,
			default: false
		},
		/**
		 * An array of selected row indices. Must be bound with `v-model:selected-rows`.
		 */
		selectedRows: {
			type: Array as PropType<number[]>,
			default: () => []
		},
		/**
		 * Label for the "select all rows" checkbox.
		 *
		 * This label is visually hidden but needed for assistive technology.
		 */
		selectAllLabel: {
			type: String,
			default: 'Select all rows'
		},
		/**
		 * Label for the "select row" checkboxes.
		 *
		 * These labels are visually hidden but needed for assistive technology.
		 */
		selectRowLabel: {
			type: String,
			default: 'Select row'
		}
	},
	emits: [
		/**
		 * When the selected row(s) changes.
		 *
		 * @property {string[]} selectedRows The new selected rows.
		 */
		'update:selectedRows'

	],
	setup( props, { emit } ) {
		const tableClasses = computed( () => {
			const useFixedLayout = props.columns?.filter( ( column ) =>
				( 'width' in column ) || ( 'minWidth' in column ) ).length > 0;
			return {
				'cdx-table__table--layout-fixed': useFixedLayout,
				'cdx-table__table--borders-vertical': props.showVerticalBorders
			};
		} );

		/**
		 * Determine whether a cell in the tbody should be a th or td element.
		 *
		 * @param columnId
		 * @return 'th' or 'td'
		 */
		function getCellElement( columnId: string ): 'th'|'td' {
			const firstColumn = props.columns[ 0 ].id;
			if ( props.useRowHeaders && columnId === firstColumn ) {
				return 'th';
			}
			return 'td';
		}

		/**
		 * Get a CSS class for a cell based on its column's text alignment.
		 *
		 * @param column
		 * @return Dynamic class object
		 */
		function getCellClass( column: TableColumn ): Record<string, boolean>|undefined {
			// Don't assign a class for the default value 'start'. Instead, we'll set
			// text-align: left on the td and th elements.
			if ( !( 'textAlign' in column ) || column.textAlign === 'start' ) {
				return undefined;
			}

			if ( !tableTextAlignmentsValidator( column.textAlign ) ) {
				// eslint-disable-next-line no-console
				console.warn( 'Invalid value for TableColumn textAlign property.' );
				return undefined;
			}

			return {
				[ `cdx-table__cell--align-${ column.textAlign }` ]: true
			};
		}

		/**
		 * Get style binding for thead th cells.
		 *
		 * Enables users to set width and min-width on columns.
		 *
		 * @param column
		 * @return Dynamic style object
		 */
		function getCellStyle( column: TableColumn ): Record<string, string>|undefined {
			const styles: { width?: string, minWidth?: string } = {};

			if ( 'width' in column ) {
				styles.width = column.width;
			}
			if ( 'minWidth' in column ) {
				styles.minWidth = column.minWidth;
			}

			return styles;
		}

		// Row selection.
		const wrappedSelectedRows = useModelWrapper( toRef( props, 'selectedRows' ), emit, 'update:selectedRows' );
		const selectAll = ref( props.data.length === wrappedSelectedRows.value.length );
		const selectAllIndeterminate = ref( false );

		/**
		 * Handle "select all" changes.
		 *
		 * @param newValue Whether the "select all" box is checked.
		 */
		function handleSelectAll( newValue: boolean ) {
			// Always remove indeterminate status.
			selectAllIndeterminate.value = false;

			if ( newValue ) {
				wrappedSelectedRows.value = props.data.map( ( row, rowIndex ) => rowIndex );
			} else {
				wrappedSelectedRows.value = [];
			}
		}

		/**
		 * Handle row selection changes.
		 */
		async function handleRowSelection() {
			// Wait for wrappedSelectedRows.value to update.
			await nextTick();

			// If all rows are selected, check the "select all" box.
			if ( props.data.length === wrappedSelectedRows.value.length ) {
				selectAll.value = true;
				selectAllIndeterminate.value = false;
				return;
			}

			// Now we know that all rows are not selected.
			// If "select all" was previously checked, set it to indeterminate and uncheck it.
			if ( selectAll.value === true ) {
				selectAllIndeterminate.value = true;
				selectAll.value = false;
			}

			// If no rows are selected, clear indeterminate status.
			if ( wrappedSelectedRows.value.length === 0 ) {
				selectAllIndeterminate.value = false;
			}
		}

		/**
		 * Get a CSS class for a table row based on whether it is selected.
		 *
		 * @param rowIndex
		 * @return Dynamic class object
		 */
		function getRowClass( rowIndex: number ): Record<string, boolean>|undefined {
			return {
				'cdx-table__row--selected': wrappedSelectedRows.value.indexOf( rowIndex ) !== -1
			};
		}

		return {
			tableClasses,
			getCellElement,
			getCellClass,
			getCellStyle,
			selectAll,
			selectAllIndeterminate,
			wrappedSelectedRows,
			handleSelectAll,
			handleRowSelection,
			getRowClass,
			cdxIconSortVertical
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';
@import ( reference ) '../../themes/mixins/common.less';

.cdx-table {
	color: @color-base;
	border: @border-base;
	border-radius: @border-radius-base;

	&__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: @spacing-100;
		box-sizing: @box-sizing-base;
		min-height: @min-height-table-header;
		padding: @spacing-100 @spacing-75;

		&__caption {
			color: @color-emphasized;
			font-size: @font-size-large;
			font-weight: @font-weight-bold;
			line-height: @line-height-xxx-small;
		}
	}

	&__th-content {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	&__table-wrapper {
		// Enable horizontal scroll on just the actual table.
		overflow-x: auto;
	}

	&__table {
		min-width: @size-full;
		line-height: @line-height-xx-small;
		/* stylelint-disable-next-line scale-unlimited/declaration-strict-value */
		border-collapse: collapse;

		// Note that element selectors are used here because we can predict which elements will be
		// used inside a table, and this will simplify both the CSS-only implementation and use of
		// the default slot to add ones own sub-table elements.
		caption {
			.screen-reader-text();
		}

		th {
			color: @color-emphasized;
		}

		th,
		td {
			padding: @spacing-75;
			text-align: left;
		}

		.cdx-table__cell {
			&--align-center {
				text-align: center;
			}

			&--align-end {
				text-align: right;

				/* stylelint-disable-next-line max-nesting-depth */
				.cdx-table__th-content {
					flex-direction: row-reverse;
				}
			}
		}

		// Column of row selection checkboxes.
		.cdx-table__row-selection {
			// Make this column as narrow as possible.
			width: @size-6;
		}

		.cdx-table__row {
			&--selected {
				background-color: @background-color-progressive-subtle;
			}
		}

		thead {
			th {
				border-bottom: @border-base;
			}
		}

		tfoot {
			td,
			th {
				border-top: @border-base;
			}
		}

		tbody {
			td,
			th {
				border-top: @border-subtle;
				vertical-align: top;
			}

			tr:first-child {
				/* stylelint-disable-next-line max-nesting-depth */
				td,
				th {
					border-top: 0;
				}
			}
		}

		&--layout-fixed {
			/* stylelint-disable-next-line scale-unlimited/declaration-strict-value */
			table-layout: fixed;
		}

		/* stylelint-disable no-descending-specificity */
		&--borders-vertical {
			th,
			td {
				border-right: @border-subtle;
			}

			th:last-child,
			td:last-child {
				border-right: 0;
			}

			thead {
				/* stylelint-disable-next-line max-nesting-depth */
				th {
					border-top: @border-base;
				}
			}

			// Class to add a vertical border as needed. Useful for custom layouts with colspans.
			.cdx-table__cell--force-vertical-border {
				/* stylelint-disable-next-line declaration-no-important */
				border-right: @border-subtle !important;
			}
		}
		/* stylelint-enable no-descending-specificity */
	}

	&__footer {
		display: flex;
		align-items: center;
		gap: @spacing-100;
		box-sizing: @box-sizing-base;
		min-height: @min-height-table-footer;
		border-top: @border-base;
		padding: @spacing-75;
	}
}

</style>

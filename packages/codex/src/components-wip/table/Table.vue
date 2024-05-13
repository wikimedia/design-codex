<template>
	<div class="cdx-table" tabindex="0">
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
			<div class="cdx-table__header__content">
				<!-- eslint-disable-next-line max-len -->
				<!-- @slot Header content. Not to be confused with <thead>; use the thead slot to customize that. -->
				<slot name="header" />
			</div>
		</div>
		<div class="cdx-table__table-wrapper">
			<table class="cdx-table__table" :class="tableClasses">
				<!-- Visually-hidden caption element, for assistive technology. -->
				<caption>{{ caption }}</caption>
				<!-- @slot Custom <thead>. -->
				<slot name="thead">
					<thead v-if="columns.length > 0">
						<tr>
							<th v-if="useRowSelection" class="cdx-table__table__select-rows">
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
								scope="col"
								:class="getCellClass( column, column.allowSort )"
								:aria-sort="getSortOrder( column.id, column.allowSort )"
								:style="getCellStyle( column )"
							>
								<template v-if="column.allowSort">
									<button
										:aria-selected="column.id === activeSortColumn"
										class="cdx-table__table__sort-button"
										@click="handleSort( column.id )"
									>
										{{ column.label }}
										<cdx-icon
											:icon="getSortIcon( column.id )"
											size="small"
											class="cdx-table__table__sort-icon"
											:aria-label="getSortIconLabel( column )"
											aria-hidden="true"
										/>
									</button>
								</template>
								<template v-else>
									{{ column.label }}
								</template>
							</th>
						</tr>
					</thead>
				</slot>

				<!-- @slot Custom <tbody>. -->
				<slot name="tbody">
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
								:scope="getRowHeaderScope( column.id )"
								:class="getCellClass( column )"
							>
								<!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
								<slot
									:name="'item-' + column.id"
									:item="row[ column.id ]"
									:row="row">
									{{ row[ column.id ] }}
								</slot>
							</component>
						</tr>
					</tbody>
				</slot>
				<!-- @slot Custom <tfoot>. -->
				<slot name="tfoot" />
			</table>
		</div>
		<div v-if="$slots.footer && $slots.footer().length > 0" class="cdx-table__footer">
			<!-- eslint-disable-next-line max-len -->
			<!-- @slot Footer content. Not to be confused with <tfoot>; use the tfoot slot to add that. -->
			<slot name="footer" />
		</div>
	</div>
</template>

<script lang="ts">
import { PropType, defineComponent, ref, toRef, computed } from 'vue';
import { TableColumn, TableRow, TableSort, TableSortOption } from '../../types';
import { TableTextAlignments } from '../../constants';
import useModelWrapper from '../../composables/useModelWrapper';
import { makeStringTypeValidator } from '../../utils/stringTypeValidator';
import CdxCheckbox from '../../components/checkbox/Checkbox.vue';
import CdxIcon from '../../components/icon/Icon.vue';
import { cdxIconSortVertical, cdxIconUpTriangle, cdxIconDownTriangle, Icon } from '@wikimedia/codex-icons';

type TableSortIconMap = { [P in TableSortOption]: Icon };
type TableSortDirection = 'none' | 'ascending' | 'descending';
type TableSortDirectionMap = { [P in TableSortOption]: TableSortDirection };

const tableTextAlignmentsValidator = makeStringTypeValidator( TableTextAlignments );
const iconMap: TableSortIconMap = {
	none: cdxIconSortVertical,
	asc: cdxIconUpTriangle,
	desc: cdxIconDownTriangle
};
const sortOrderMap: TableSortDirectionMap = {
	none: 'none',
	asc: 'ascending',
	desc: 'descending'
};

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
			default: () => []
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
		},
		/**
		 * Definition of sort order. Column(s) can be sorted ascending, descending, or not sorted.
		 * To display data unsorted initially, set to an empty object initially.
		 * Must be bound with v-model:sort
		 */
		sort: {
			type: Object as PropType<TableSort>,
			default: () => ( {} )
		}
	},
	emits: [
		/**
		 * When the selected row(s) changes.
		 *
		 * @property {string[]} selectedRows The new selected rows.
		 */
		'update:selectedRows',
		/**
		 * When the sort order changes emit an event to update the sort order.
		 *
		 * @property {Object} sort The new sort order.
		 */
		'update:sort'
	],
	setup( props, { emit } ) {
		// Row selection.
		const wrappedSelectedRows = useModelWrapper( toRef( props, 'selectedRows' ), emit, 'update:selectedRows' );
		const selectAll = ref( props.data.length === wrappedSelectedRows.value.length );
		const selectAllIndeterminate = ref( false );

		// Sorting.
		const activeSortColumn = computed( () => {
			return Object.keys( props.sort )[ 0 ];
		} );

		// Elements and CSS classes.
		const tableClasses = computed( () => {
			const useFixedLayout = props.columns?.some( ( column ) =>
				( 'width' in column ) || ( 'minWidth' in column ) );
			return {
				'cdx-table__table--layout-fixed': useFixedLayout,
				'cdx-table__table--borders-vertical': props.showVerticalBorders
			};
		} );

		/**
		 * Get a CSS class for a table row based on whether it is selected.
		 *
		 * @param rowIndex
		 * @return Dynamic class object
		 */
		function getRowClass( rowIndex: number ): Record<string, boolean> {
			return {
				'cdx-table__table__row--selected': wrappedSelectedRows.value.indexOf( rowIndex ) !== -1
			};
		}

		/**
		 * Determine the scope attribute for row headers (`th` in a `tr` element).
		 *
		 * @param columnId
		 * @return scope attribute value
		 */
		function getRowHeaderScope( columnId: string ): string | undefined {
			const firstColumn = props.columns[ 0 ].id;
			if ( props.useRowHeaders === true && columnId === firstColumn ) {
				return 'row';
			}
		}

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
		 * Get a CSS class for a cell based on its column's text alignment and whether sorting is
		 * enabled.
		 *
		 * @param column
		 * @param hasSort
		 * @return Dynamic class object
		 */
		function getCellClass(
			column: TableColumn, hasSort = false
		): Record<string, boolean>|undefined {
			if ( 'textAlign' in column && !tableTextAlignmentsValidator( column.textAlign ) ) {
				// eslint-disable-next-line no-console
				console.warn( 'Invalid value for TableColumn textAlign property.' );
				return undefined;
			}

			return {
				// Don't assign a class for the default value 'start'. Instead, we'll set
				// text-align: left on the td and th elements.
				[ `cdx-table__table__cell--align-${ column.textAlign }` ]: ( 'textAlign' in column ) && column.textAlign !== 'start',
				'cdx-table__table__cell--has-sort': hasSort
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
		function getCellStyle( column: TableColumn ): Record<string, string> {
			const styles: { width?: string, minWidth?: string } = {};

			if ( 'width' in column ) {
				styles.width = column.width;
			}
			if ( 'minWidth' in column ) {
				styles.minWidth = column.minWidth;
			}

			return styles;
		}

		/**
		 * Handle row selection changes.
		 * @param newSelectedRows New value of wrappedSelectedRows
		 */
		function handleRowSelection( newSelectedRows: number[] ) {
			// NOTE: wrappedSelectedRows.value has not yet been updated at this point, so we have
			// to use newSelectedRows in this function.

			// If all rows are selected, check the "select all" box.
			if ( props.data.length === newSelectedRows.length ) {
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
			if ( newSelectedRows.length === 0 ) {
				selectAllIndeterminate.value = false;
			}
		}

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
		 * Determine the new sort order based on the current sort state.
		 * The sort state switches between ascending, descending, or unsorted (in that order).
		 *
		 * @param columnId
		 */
		function handleSort( columnId: string ) {
			const currentSortOrder = props.sort[ columnId ] ?? 'none';
			// newSortOrder is initially set to 'asc' for the case that currentSortOrder is "none".
			let newSortOrder: TableSortOption = 'asc';

			if ( currentSortOrder === 'asc' ) {
				newSortOrder = 'desc';
			}
			if ( currentSortOrder === 'desc' ) {
				newSortOrder = 'none';
			}
			// Set the sort order on a single column at a time and remove any previously sorted
			// column.
			emit( 'update:sort', { [ columnId ]: newSortOrder } );
		}

		/**
		 * Determine the sort icon to display based on the sort order.
		 *
		 * @param columnId
		 * @return Icon
		 */
		function getSortIcon( columnId: string ): Icon {
			const currentSortOrder = props.sort[ columnId ] ?? 'none';

			return iconMap[ currentSortOrder ];
		}

		/**
		 * Determine the sort icon's aria label.
		 *
		 * @param column
		 * @return aria-label attribute value
		 */
		function getSortIconLabel( column: TableColumn ): string | undefined {
			const currentSortOrder = props.sort[ column.id ] ?? 'none';
			const columnLabel = column?.label ?? column.id;

			if ( currentSortOrder !== 'none' ) {
				return `Sort rows by ${ columnLabel.toLowerCase() } in ${ sortOrderMap[ currentSortOrder ] } order.`;
			}
		}

		/**
		 * Determine the sort order for the aria attribute `aria-sort`.
		 *
		 * @param columnId
		 * @param hasSort
		 * @return aria-sort attribute value
		 */
		function getSortOrder( columnId: string, hasSort = false ): TableSortDirection | undefined {
			if ( hasSort ) {
				const currentSortOrder = props.sort[ columnId ] ?? 'none';
				return sortOrderMap[ currentSortOrder ];
			}
		}

		return {
			// Row selection constants.
			wrappedSelectedRows,
			selectAll,
			selectAllIndeterminate,

			// Sorting constants.
			activeSortColumn,

			// Elements and CSS classes.
			tableClasses,
			getRowClass,
			getRowHeaderScope,
			getCellElement,
			getCellClass,
			getCellStyle,

			// Row selection methods.
			handleRowSelection,
			handleSelectAll,

			// Sorting methods.
			handleSort,
			getSortIcon,
			getSortIconLabel,
			getSortOrder
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
	.hyphens();

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

		&__sort-button {
			// Override browser <button> styles for background.
			background-color: @background-color-transparent;
			display: flex;
			align-items: center;
			justify-content: space-between;
			width: @size-full;
			max-width: @size-1600;
			// Override browser <button> styles for border.
			border: 0;
			padding: @spacing-75;
			font-size: @font-size-medium;
			font-weight: @font-weight-bold;
			line-height: @line-height-x-small;
			text-decoration: @text-decoration-none;
			// Hide overflowing text.
			.text-overflow( @param-visible: false );

			&:hover {
				background-color: @background-color-interactive-subtle;
				border-color: @border-color-base;
				cursor: @cursor-base--hover;
			}

			&:focus {
				// Override browser <button> styles for outline.
				outline: @outline-base--focus;
			}

			&:active {
				background-color: @background-color-interactive;
				border-color: @border-color-base;
			}

			&:focus:not( :active ) {
				background-color: @background-color-base;
				box-shadow: @box-shadow-inset-medium @box-shadow-color-progressive--focus;
			}
		}

		&__sort-icon {
			color: @color-subtle;
			padding-left: @spacing-50;
		}

		// Modifiers for table cells (th and td). Note that the extra class selector is needed to
		// override styles placed on .cdx-table__table th/td above.
		.cdx-table__table__cell {
			&--align-center {
				text-align: center;
			}

			&--align-end {
				text-align: right;

				/* stylelint-disable-next-line max-nesting-depth */
				.cdx-table__table__sort-button {
					flex-direction: row-reverse;
				}

				/* stylelint-disable-next-line max-nesting-depth */
				.cdx-table__table__sort-icon {
					padding-right: @spacing-50;
				}
			}

			// Numbers should be aligned right in both reading directionalities.
			&--align-number {
				// Trick postcss-rtlcss into setting text-align to right in both LTR and RTL. We
				// can't just use the rtl:ignore directive, because in bidirectional mode, we need
				// the [dir] selector to be added to match the specificity of the text-align rule
				// applied to all th and td elements. Hat-tip to Roan for this one.
				text-align: right /* rtl:right */;
			}

			// Remove padding on th elements if sorting is enabled, since padding will be added to
			// the sort button instead.
			&--has-sort {
				padding: 0;
			}
		}

		// Column of row selection checkboxes.
		&__select-rows {
			// Make this column as narrow as possible.
			width: @size-6;
		}

		&__row {
			&--selected {
				background-color: @background-color-progressive-subtle;
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

<template>
	<div class="cdx-table" tabindex="0">
		<div
			v-if="!hideCaption || ( $slots.header && $slots.header().length > 0 )"
			class="cdx-table__header"
		>
			<!--
				We need this div, even if the caption is hidden, to ensure the
				slot is aligned to the end.
				aria-hidden is used so assistive tech will skip the visible caption and only read
				the <caption> element. However, if there is header content, the visible caption
				should be read too to ensure the caption is read before the header content.
			-->
			<div
				class="cdx-table__header__caption"
				:aria-hidden="$slots.header && $slots.header().length > 0 ? undefined : true"
			>
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

		<cdx-table-pager
			v-if="paginate && ( paginationPosition === 'top' || paginationPosition === 'both' )"
			v-model:items-per-page="pageSize"
			class="cdx-table__pagination--top"
			:pagination-size-options="paginationSizeOptions"
			:prev-disabled="prevDisabled"
			:next-disabled="nextDisabled"
			:last-disabled="lastDisabled"
			@next="onNext"
			@prev="onPrev"
			@first="onFirst"
			@last="onLast"
		>
			<span class="cdx-table__pagination-status--long">
				{{ paginationStatusMessageLong }}
			</span>

			<span class="cdx-table__pagination-status--short">
				{{ paginationStatusMessageShort }}
			</span>
		</cdx-table-pager>

		<div class="cdx-table__table-wrapper">
			<table class="cdx-table__table" :class="tableClasses">
				<!-- Visually-hidden caption element, for assistive technology. -->
				<caption>
					<template v-if="!hasSortableColumns">
						{{ caption }}
					</template>
					<template v-else>
						{{ translatedSortCaption }}
					</template>
				</caption>
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
									{{ translatedSelectAllLabel }}
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
										<span class="cdx-table__table__sort-label">
											{{ column.label }}
										</span>
										<cdx-icon
											:icon="getSortIcon( column.id )"
											size="small"
											class="cdx-table__table__sort-icon"
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

				<cdx-progress-bar
					v-if="pending"
					:inline="true"
					class="cdx-table__pending-indicator"
				/>

				<!-- @slot Custom <tbody>. -->
				<slot name="tbody">
					<tbody v-if="dataForDisplay.length > 0">
						<tr
							v-for="( row, rowIndex ) in dataForDisplay"
							:key="getRowKey( row, rowIndex )"
							:class="getRowClass( row, rowIndex )"
						>
							<td v-if="useRowSelection">
								<cdx-checkbox
									v-model="wrappedSelectedRows"
									:input-value="getRowKey( row, rowIndex )"
									:hide-label="true"
									@update:model-value="handleRowSelection"
								>
									{{ translatedSelectRowLabel(
										rowIndex + 1,
										dataForDisplay.length
									) }}
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
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
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
					<!-- eslint-disable-next-line max-len -->
					<tbody v-else-if="$slots[ 'empty-state' ] && $slots[ 'empty-state' ]().length > 0">
						<tr class="cdx-table__table__empty-state">
							<td class="cdx-table__table__empty-state-content">
								<!-- @slot Empty state content. -->
								<slot name="empty-state" />
							</td>
						</tr>
					</tbody>
				</slot>
				<!-- @slot Custom <tfoot>. -->
				<slot name="tfoot" />
			</table>
		</div>

		<cdx-table-pager
			v-if="paginate && ( paginationPosition === 'bottom' || paginationPosition === 'both' )"
			v-model:items-per-page="pageSize"
			class="cdx-table__pagination--bottom"
			:pagination-size-options="paginationSizeOptions"
			:prev-disabled="prevDisabled"
			:next-disabled="nextDisabled"
			:last-disabled="lastDisabled"
			@next="onNext"
			@prev="onPrev"
			@first="onFirst"
			@last="onLast"
		>
			<span class="cdx-table__pagination-status--long">
				{{ paginationStatusMessageLong }}
			</span>

			<span class="cdx-table__pagination-status--short">
				{{ paginationStatusMessageShort }}
			</span>
		</cdx-table-pager>

		<div v-if="$slots.footer && $slots.footer().length > 0" class="cdx-table__footer">
			<!-- eslint-disable-next-line max-len -->
			<!-- @slot Footer content. Not to be confused with <tfoot>; use the tfoot slot to add that. -->
			<slot name="footer" />
		</div>
	</div>
</template>

<script lang="ts">
import {
	PropType,
	defineComponent,
	computed,
	ref,
	toRef,
	watch
} from 'vue';

import CdxCheckbox from '../checkbox/Checkbox.vue';
import CdxIcon from '../icon/Icon.vue';
import CdxTablePager from './TablePager.vue';
import CdxProgressBar from '../progress-bar/ProgressBar.vue';

import useModelWrapper from '../../composables/useModelWrapper';
import useI18n from '../../composables/useI18n';

import { makeStringTypeValidator } from '../../utils/stringTypeValidator';
import { cdxIconSortVertical, cdxIconUpTriangle, cdxIconDownTriangle, Icon } from '@wikimedia/codex-icons';

import {
	TableColumn,
	TableRow,
	TableRowWithIdentifier,
	TableSort,
	TableSortOption,
	TablePaginationSizeOption,
	TablePaginationPosition
} from '../../types';

import {
	TableTextAlignments,
	TableRowIdentifier,
	TablePaginationPositions
} from '../../constants';

type TableSortIconMap = { [P in TableSortOption]: Icon };
type TableSortDirection = 'none' | 'ascending' | 'descending';
type TableSortDirectionMap = { [P in TableSortOption]: TableSortDirection };

const tableTextAlignmentsValidator = makeStringTypeValidator( TableTextAlignments );
const paginationPositionValidator = makeStringTypeValidator( TablePaginationPositions );

const iconMap: TableSortIconMap = {
	none: cdxIconSortVertical,
	asc: cdxIconUpTriangle,
	desc: cdxIconDownTriangle
};
const sortDirectionMap: TableSortDirectionMap = {
	none: 'none',
	asc: 'ascending',
	desc: 'descending'
};
/**
 * An HTML table for displaying data.
 */
export default defineComponent( {
	name: 'CdxTable',
	components: {
		CdxCheckbox,
		CdxIcon,
		CdxTablePager,
		CdxProgressBar
	},
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
		 *
		 * @default []
		 */
		columns: {
			type: Array as PropType<TableColumn[]>,
			default: () => [],
			validator: ( value: TableColumn[] ) => {
				const ids = value.map( ( column: TableColumn ) => column.id );
				const hasUniqueIds = ( new Set( ids ) ).size === ids.length;
				if ( !hasUniqueIds ) {
					// The warning that Vue prints when a validator fails isn't very informative,
					// so we add our own.
					// eslint-disable-next-line no-console
					console.warn(
						'Each column in the "columns" prop of CdxTable must have a unique "id".'
					);
					return false;
				}
				return true;
			}
		},
		/**
		 * Table data.
		 *
		 * An array of objects, with each object representing the data for a table row. Item keys
		 * should align with column IDs, as defined in the `columns` prop.
		 *
		 * @default []
		 */
		data: {
			type: Array as PropType<TableRow[]|TableRowWithIdentifier[]>,
			default: () => [],
			validator: ( value: TableRow[]|TableRowWithIdentifier[], props ) => {
				if (
					!Array.isArray( props.columns ) ||
					props.columns.length === 0 ||
					value.length === 0
				) {
					return true;
				}

				const hasSort = props.columns.some( ( column ) => 'allowSort' in column );
				const rowsHaveIds = value.every( ( row ) => TableRowIdentifier in row );

				if ( hasSort && props.useRowSelection && !rowsHaveIds ) {
					// eslint-disable-next-line no-console
					console.warn(
						'For CdxTables with sorting and row selection, each row in the "data" prop must have a "TableRowIdentifier".'
					);
					return false;
				}
				return true;
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
		 *
		 * If sorting is also enabled, this will be an array of TableRowIdentifiers.
		 *
		 * @default []
		 */
		selectedRows: {
			type: Array as PropType<( number|string )[]>,
			default: () => []
		},
		/**
		 * Definition of sort order. Column(s) can be sorted ascending, descending, or not sorted.
		 * To display data unsorted initially, set to an empty object initially.
		 * Must be bound with v-model:sort
		 *
		 * @default {}
		 */
		sort: {
			type: Object as PropType<TableSort>,
			default: () => ( {} )
		},

		/**
		 * Whether the table is waiting for data to be fetched.
		 */
		pending: {
			type: Boolean,
			default: false
		},

		/**
		 * Whether to enable pagination.
		 */
		paginate: {
			type: Boolean,
			default: false
		},

		/**
		 * Whether the table is paginating through remote data. Setting this to
		 * "true" will cause the table to emit events indicating that more data
		 * should be loaded when the user navigates between pages.
		 */
		serverPagination: {
			type: Boolean,
			default: false
		},

		/**
		 * The total number of rows/results available on the server that the
		 * user can access via pagination. Providing this value will make for
		 * a better user experience when navigating through pages of remote
		 * data, but it is not required.
		 */
		totalRows: {
			type: Number,
			default: NaN
		},

		/**
		 * Where the pagination controls should appear relative to the table body.
		 */
		paginationPosition: {
			type: String as PropType<TablePaginationPosition>,
			default: 'bottom',
			validator: paginationPositionValidator
		},

		/**
		 * Pre-defined options for how may rows should be displayed per page.
		 * The value of these menu items must be a number.
		 *
		 * @default [ { value: 10 }, { value: 20 }, { value: 50 } ]
		 */
		paginationSizeOptions: {
			type: Array as PropType<TablePaginationSizeOption[]>,
			default: () => [
				{ value: 10 },
				{ value: 20 },
				{ value: 50 }
			],
			validator: ( value: TablePaginationSizeOption[] ) => {
				const hasNumberValue = ( item: TablePaginationSizeOption ) => typeof item.value === 'number';
				if ( value.every( hasNumberValue ) ) {
					return true;
				} else {
					// eslint-disable-next-line no-console
					console.warn( '"value" property of all menu items in PaginationOptions must be a number.' );
					return false;
				}
			}
		},

		/**
		 * The default number of rows to show per page. For basic pagination,
		 * this will default to the value of the first of the pagination options
		 * if not provided. For server-side pagination, this will default to
		 * the initial number of rows if no default is provided.
		 *
		 * @default paginationSizeOptions[ 0 ].value
		 */
		paginationSizeDefault: {
			type: Number,
			default: (
				rawProps: {
					paginationSizeOptions: TablePaginationSizeOption[],
					paginate: boolean,
					serverPagination: boolean,
					data: TableRow[]|TableRowWithIdentifier[]
				}
			) => {
				if ( rawProps.paginate && rawProps.serverPagination ) {
					return rawProps.data.length;
				} else {
					return rawProps.paginationSizeOptions[ 0 ].value;
				}
			}
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
		'update:sort',

		/**
		 * When the user requests another page of data from the server.
		 *
		 * @property {number} offset Index of the first visible row on the new page.
		 * @property {number} rows Number of rows to display.
		 *
		 */
		'load-more',

		/**
		 * When the user requests the last page of data from the server.
		 *
		 * @property {number} rows Number of rows to display.
		 */
		'last'
	],
	setup( props, { emit } ) {
		// pagination
		const offset = ref( 0 );
		const pageSize = ref( props.paginationSizeDefault );

		const dataForDisplay = computed( () => {
			if ( props.serverPagination && props.paginate ) {
				return props.data;
			} else if ( props.paginate ) {
				return props.data.slice( offset.value, pageSize.value + offset.value );
			} else {
				return props.data;
			}
		} );

		const totalCount = computed( () => {
			if ( props.serverPagination ) {
				return props.totalRows ?? NaN;
			} else {
				return props.data.length;
			}
		} );

		const indeterminate = computed( () => isNaN( totalCount.value ) );
		const currentCount = computed( () => dataForDisplay.value.length );
		const firstOrdinal = computed( () => offset.value + 1 );
		const lastOrdinal = computed( () => offset.value + currentCount.value );
		const lastDisabled = computed( () => indeterminate.value );
		const prevDisabled = computed( () => offset.value <= 0 );

		const nextDisabled = computed( () => {
			if ( indeterminate.value ) {
				return currentCount.value < pageSize.value;
			} else {
				return offset.value + pageSize.value >= totalCount.value;
			}
		} );

		const paginationStatusMessageDeterminateShort = useI18n(
			'cdx-table-pagination-status-message-determinate-short',
			( x, y, z ) => `${ x }–${ y } of ${ z }`,
			[ firstOrdinal, lastOrdinal, totalCount ]
		);

		const paginationStatusMessageDeterminateLong = useI18n(
			'cdx-table-pagination-status-message-determinate-long',
			( x, y, z ) => `Showing results ${ x }–${ y } of ${ z }`,
			[ firstOrdinal, lastOrdinal, totalCount ]
		);

		const paginationStatusMessageIndeterminateShort = useI18n(
			'cdx-table-pagination-status-message-indeterminate-short',
			( x, y ) => `${ x }–${ y } of many`,
			[ firstOrdinal, lastOrdinal ]
		);

		const paginationStatusMessageIndeterminateLong = useI18n(
			'cdx-table-pagination-status-message-indeterminate-long',
			( x, y ) => `Showing results ${ x }–${ y } of many`,
			[ firstOrdinal, lastOrdinal ]
		);

		const paginationStatusMessageIndeterminateFinal = useI18n(
			'cdx-table-pagination-status-message-indeterminate-final',
			( x ) => `Showing the last ${ x } results`,
			[ currentCount ]
		);

		const paginationStatusMessagePending = useI18n(
			'cdx-table-pagination-status-message-pending',
			'Loading results...'
		);

		const paginationStatusMessageShort = computed( () => {
			if ( props.pending ) {
				return paginationStatusMessagePending.value;
			} else if ( indeterminate.value && nextDisabled.value ) {
				return paginationStatusMessageIndeterminateFinal.value;
			} else if ( indeterminate.value ) {
				return paginationStatusMessageIndeterminateShort.value;
			} else {
				return paginationStatusMessageDeterminateShort.value;
			}
		} );

		const paginationStatusMessageLong = computed( () => {
			if ( props.pending ) {
				return paginationStatusMessagePending.value;
			} else if ( indeterminate.value && nextDisabled.value ) {
				return paginationStatusMessageIndeterminateFinal.value;
			} else if ( indeterminate.value ) {
				return paginationStatusMessageIndeterminateLong.value;
			} else {
				return paginationStatusMessageDeterminateLong.value;
			}
		} );

		function onNext() {
			offset.value += pageSize.value;
			if ( props.serverPagination ) {
				emit( 'load-more', offset.value, pageSize.value );
			}
		}

		function onPrev() {
			if ( offset.value - pageSize.value < 1 ) {
				onFirst();
			} else {
				offset.value -= pageSize.value;
				if ( props.serverPagination ) {
					emit( 'load-more', offset.value, pageSize.value );
				}
			}
		}

		function onFirst() {
			offset.value = 0;
			if ( props.serverPagination ) {
				emit( 'load-more', offset.value, pageSize.value );
			}
		}

		function onLast() {
			if ( totalCount.value % pageSize.value === 0 ) {
				offset.value = totalCount.value - pageSize.value;
				emit( 'load-more', offset.value, pageSize.value );
			} else {
				offset.value = (
					Math.floor( totalCount.value / pageSize.value ) *
					pageSize.value
				);
				emit( 'load-more', offset.value, pageSize.value );
			}
		}

		watch( pageSize, ( newPageSize ) => {
			if ( props.serverPagination ) {
				emit( 'load-more', offset.value, newPageSize );
			}
		} );

		// Row selection.
		const wrappedSelectedRows = useModelWrapper( toRef( props, 'selectedRows' ), emit, 'update:selectedRows' );
		const selectAll = ref( totalCount.value === wrappedSelectedRows.value.length );
		const selectAllIndeterminate = ref( false );

		// Sorting.
		const activeSortColumn = computed( () => {
			return Object.keys( props.sort )[ 0 ];
		} );
		const hasSortableColumns = computed( () => {
			return props.columns.some( ( column ) => column.allowSort );
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

		// i18n
		const translatedSortCaption = useI18n(
			'cdx-table-sort-caption',
			( caption ) => `${ caption }, column headers with buttons are sortable.`,
			[ toRef( props, 'caption' ) ]
		);
		const translatedSelectRowLabel = ( rowIndex: number, totalRows: number ) => useI18n(
			'cdx-table-select-row-label',
			( row, total ) => `Select row ${ row } of ${ total }`,
			[ () => rowIndex, () => totalRows ]
		).value;
		const translatedSelectAllLabel = useI18n( 'cdx-table-select-all-label', 'Select all rows' );

		/**
		 * Get the key for a row, either the row index or the TableRowIdentifier.
		 *
		 * @param row
		 * @param index
		 * @return The key
		 */
		function getRowKey( row: TableRow|TableRowWithIdentifier, index: number ): string|number {
			return TableRowIdentifier in row ? row[ TableRowIdentifier ] : index;
		}

		/**
		 * Get a CSS class for a table row based on whether it is selected.
		 *
		 * @param row
		 * @param rowIndex
		 * @return Dynamic class object
		 */
		function getRowClass(
			row: TableRow|TableRowWithIdentifier,
			rowIndex: number
		): Record<string, boolean> {
			const rowKey = getRowKey( row, rowIndex );
			return {
				'cdx-table__row--selected': wrappedSelectedRows.value.indexOf( rowKey ) !== -1
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
			if ( totalCount.value === newSelectedRows.length ) {
				selectAll.value = true;
				selectAllIndeterminate.value = false;
				return;
			}

			// Now we know that all rows are not selected.
			selectAll.value = false;

			// If some checkboxes are checked then the "select all" checkbox is indeterminate.
			if ( totalCount.value > newSelectedRows.length ) {
				selectAllIndeterminate.value = true;
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
				wrappedSelectedRows.value = props.data.map( ( row, rowIndex ) =>
					getRowKey( row, rowIndex ) );
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
		 * Determine the sort order for the aria attribute `aria-sort`.
		 *
		 * @param columnId
		 * @param hasSort
		 * @return aria-sort attribute value
		 */
		function getSortOrder( columnId: string, hasSort = false ): TableSortDirection | undefined {
			if ( hasSort ) {
				const currentSortOrder = props.sort[ columnId ] ?? 'none';
				// Don't add an `aria-sort` attribute if the order is 'none'.
				return currentSortOrder === 'none' ? undefined : sortDirectionMap[ currentSortOrder ];
			}
		}

		return {
			// pagination
			dataForDisplay,
			pageSize,
			onNext,
			onPrev,
			onFirst,
			onLast,
			nextDisabled,
			prevDisabled,
			lastDisabled,
			paginationStatusMessageShort,
			paginationStatusMessageLong,

			// Row selection constants.
			wrappedSelectedRows,
			selectAll,
			selectAllIndeterminate,

			// Sorting constants.
			activeSortColumn,
			hasSortableColumns,

			// Template helpers.
			tableClasses,
			getRowKey,
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
			getSortOrder,

			// i18n
			translatedSortCaption,
			translatedSelectRowLabel,
			translatedSelectAllLabel
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
		flex-wrap: wrap;
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

	&__pagination {
		&--bottom {
			border-top: @border-base;
		}
	}

	&__pagination-status {
		&--short {
			display: block;
			text-align: right;

			@media screen and ( min-width: @min-width-breakpoint-tablet ) {
				display: none;
			}
		}

		&--long {
			display: none;

			@media screen and ( min-width: @min-width-breakpoint-tablet ) {
				display: block;
				text-align: center;
			}
		}
	}

	&__pending-indicator {
		position: absolute;
	}

	&__table-wrapper {
		position: relative;
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

		th,
		td {
			padding: @spacing-75;
		}

		th {
			color: @color-emphasized;
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
			gap: @spacing-50;
			width: @size-full;
			// Override browser <button> styles for border.
			border: 0;
			padding: @spacing-75;
			font-family: inherit;
			font-size: inherit;
			font-weight: @font-weight-bold;
			line-height: @line-height-x-small;
			text-align: left;
			text-decoration: @text-decoration-none;
			transition-property: @transition-property-base;
			transition-duration: @transition-duration-base;

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
			flex-shrink: 0;
		}

		// Modifiers for table cells (th and td). Note that the extra class selector is needed to
		// override styles placed on .cdx-table__table th/td above.
		.cdx-table__table__cell {
			&--align-center {
				text-align: center;
				// Note that other styles for the sort button and icon are not included here
				// because they should behave just like with the default start alignment.
			}

			&--align-end {
				text-align: right;

				/* stylelint-disable-next-line max-nesting-depth */
				.cdx-table__table__sort-button {
					flex-direction: row-reverse;
					// Override text-align: left style above.
					text-align: right;
				}
			}

			// Numbers should be aligned right in both reading directionalities.
			&--align-number {
				// Trick postcss-rtlcss into setting text-align to right in both LTR and RTL. We
				// can't just use the rtl:ignore directive, because in bidirectional mode, we need
				// the [dir] selector to be added to match the specificity of the text-align rule
				// applied to all th and td elements. Hat-tip to Roan for this one.
				text-align: right /* rtl:right */;

				/* stylelint-disable-next-line max-nesting-depth */
				.cdx-table__table__sort-button {
					// Only reverse flex direction in LTR. In RTL, this will happen automatically.
					flex-direction: row-reverse /* rtl: row */;
					// This can be rtl-ignored because it's already set by flipping the text-align
					// style on .cdx-table__table__sort-button above, and it's more specific than
					// that rule.
					text-align: right /* rtl:ignore */;
				}
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
			width: @size-absolute-1;
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
				tr:not( :first-child ) {
					/* stylelint-disable-next-line max-nesting-depth */
					th {
						// Border styles for <th> elements that are not in the first <tr>
						// element of the <thead>.
						border-top: @border-base;
					}
				}
			}

			.cdx-table__header + .cdx-table__table-wrapper & thead th {
				// Set border-top style when table header is present.
				border-top: @border-base;
			}
		}

		&__empty-state {
			border-top: @border-base;

			&-content {
				color: @color-subtle;
				display: flex;
				align-items: center;
				justify-content: center;
				min-height: @min-height-table-footer - @spacing-150;
			}
		}
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

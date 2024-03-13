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
			<table class="cdx-table__table">
				<!-- Visually-hidden caption element, for assistive technology. -->
				<caption>{{ caption }}</caption>
				<thead v-if="columns.length > 0">
					<th v-for="column in columns" :key="column.id">
						{{ column.label }}
					</th>
				</thead>
				<tbody v-if="data.length > 0">
					<tr v-for="( row, rowIndex ) in data" :key="rowIndex">
						<component
							:is="getCellElement( column.id )"
							v-for="column in columns"
							:key="column.id"
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
import { PropType, defineComponent } from 'vue';
import { TableColumn, TableRow } from '../../types';

/**
 * An HTML table for displaying data.
 */
export default defineComponent( {
	name: 'CdxTable',
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
		}
	},
	setup( props ) {
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

		return {
			getCellElement
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
				text-align: left;
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

		tfoot {
			border-top: @border-base;
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

<!-- eslint-disable vue/singleline-html-element-content-newline -->
<template>
	<demo-base-layout class="cdx-demo-table-page">
		<template #header>
			Codex Table demos
		</template>
		<template #content>
			<section class="cdx-demo-table-page" :class="rootClasses">
				<cdx-toggle-switch v-model="restrictWidth">
					Restrict width to test scroll behavior
				</cdx-toggle-switch>

				<h2>Basic table</h2>
				<cdx-table
					caption="Table caption"
					:columns="columnsBasic"
					:data="dataBasic"
				/>

				<h2>Table with data out of order</h2>
				<p>This should look exactly like the table above.</p>
				<cdx-table
					caption="Table caption"
					:columns="columnsBasic"
					:data="dataOutOfOrder"
				/>

				<h2>Table with extra data and an ID column</h2>
				<p>Only the ID and Name columns should display.</p>
				<cdx-table
					caption="Favorite animals"
					:columns="columnsExtraData"
					:data="dataExtraData"
				/>

				<h2>Table with varied content width</h2>
				<cdx-table
					caption="User data"
					:columns="columnsVariedWidth"
					:data="dataVariedWidth"
				/>

				<h2>Table with many columns</h2>
				<cdx-table
					caption="User data"
					:columns="columnsManyColumns"
					:data="dataManyColumns"
				/>

				<h2>Table with row headers</h2>
				<cdx-table
					caption="Table caption"
					:columns="columnsBasic"
					:data="dataBasic"
					:use-row-headers="true"
				/>

				<h2>Table with visually-hidden caption</h2>
				<cdx-table
					caption="Table caption"
					:columns="columnsBasic"
					:data="dataBasic"
					:hide-caption="true"
				/>

				<h2>Table using header and footer slots</h2>
				<p>With extra-wide columns to demonstrate scroll behavior</p>
				<cdx-table
					caption="Table caption"
					:columns="columnsBasic"
					:data="dataBasic"
					class="cdx-demo-table-page__header-footer"
				>
					<template #header>
						<div class="cdx-demo-table-page__header-footer__buttons">
							<cdx-button>Default action</cdx-button>
							<cdx-button action="progressive" weight="primary">
								Primary action
							</cdx-button>
						</div>
					</template>
					<template #footer>
						<cdx-checkbox>There's a checkbox here for some reason</cdx-checkbox>
					</template>
				</cdx-table>

				<h2>Table using item slot</h2>
				<cdx-table
					caption="Function implementations"
					:columns="columnsItemSlot"
					:data="dataItemSlot"
				>
					<template #item-name="{ item }">
						<a :href="item.url">{{ item.label }}</a>
					</template>
					<template #item-status="{ item }">
						<cdx-info-chip :status="getChipStatus( item )">
							{{ item }}
						</cdx-info-chip>
					</template>
				</cdx-table>

				<h2>Table using tbody slot and columns</h2>
				<cdx-table caption="Table caption" :columns="columnsBasic">
					<template #tbody>
						<tbody>
							<tr>
								<td colspan="3" class="cdx-table__table__cell--align-center">
									First section
								</td>
							</tr>
							<tr>
								<td>One</td>
								<td class="cdx-table__table__cell--align-number">1</td>
								<td>Uno</td>
							</tr>
							<tr>
								<td>Two</td>
								<td class="cdx-table__table__cell--align-number">2</td>
								<td>Dos</td>
							</tr>
							<tr>
								<td colspan="3" class="cdx-table__table__cell--align-center">
									Second section
								</td>
							</tr>
							<tr>
								<td>Three</td>
								<td class="cdx-table__table__cell--align-number">3</td>
								<td>Tres</td>
							</tr>
							<tr>
								<td>Four</td>
								<td class="cdx-table__table__cell--align-number">4</td>
								<td>Cuatro</td>
							</tr>
						</tbody>
					</template>
				</cdx-table>

				<h2>Table using tfoot slot</h2>
				<cdx-table
					caption="Monthly budget"
					:columns="columnsTfoot"
					:data="dataTfoot"
					:use-row-headers="true"
				>
					<template #tfoot>
						<tfoot>
							<tr>
								<th>Total:</th>
								<td class="cdx-table__table__cell--align-number">$2,200</td>
							</tr>
						</tfoot>
					</template>
				</cdx-table>

				<h2>Table using thead and tbody slot, <code>showVerticalBorders</code> is true</h2>
				<cdx-table caption="Doctor Who seasons" :show-vertical-borders="true">
					<template #thead>
						<thead>
							<tr>
								<th rowspan="2">Season/series</th>
								<th rowspan="2">Doctor</th>
								<th rowspan="2" class="cdx-table__table__cell--align-number">
									Episodes
								</th>
								<th
									rowspan="1"
									colspan="2"
									class="cdx-table__table__cell--align-center"
								>
									Originally aired
								</th>
								<th rowspan="2" class="cdx-table__table__cell--align-number">
									Average viewers (millions)
								</th>
							</tr>
							<tr>
								<th>First aired</th>
								<th>Last aired</th>
							</tr>
						</thead>
					</template>

					<template #tbody>
						<tbody>
							<tr>
								<td colspan="6">Classic era</td>
							</tr>
							<template v-for="( doctor, key ) in dataDoctorWho" :key="key">
								<tr v-for="( season, index ) in doctor" :key="index">
									<td>{{ season.season }}</td>
									<td v-if="season.doctor" :rowspan="doctor.length">
										{{ season.doctor }}
									</td>
									<td class="cdx-table__table__cell--align-number">
										{{ season.episodes }}
									</td>
									<td>{{ season.airStart }}</td>
									<td>{{ season.airEnd }}</td>
									<td class="cdx-table__table__cell--align-number">
										{{ season.viewers }}
									</td>
								</tr>
							</template>
						</tbody>
					</template>
				</cdx-table>

				<h2>Table with row selection</h2>
				<cdx-table
					v-model:selected-rows="selectedRows"
					caption="Table with row selection"
					:columns="columnsBasic"
					:data="dataBasic"
					:use-row-selection="true"
				>
					<template #header>
						Selected rows: {{ selectedRows }}
					</template>
				</cdx-table>

				<h2>Table with single sort</h2>
				<p>Note that "Age at win" column has textAlign "end" for testing purposes.</p>
				<cdx-table
					v-model:sort="singleSort"
					caption="Recent Nobel laureates in Economic Sciences"
					:columns="columnsSingleSort"
					:data="dataSingleSort"
					@update:sort="( newSort ) => onSort( newSort, 'singleSort' )"
				/>

				<h2>Table with sort and row selection</h2>
				<cdx-table
					v-model:sort="sortWithSelection"
					v-model:selected-rows="selectedRowsSortWithSelection"
					caption="Recent Nobel laureates in Economic Sciences"
					:columns="columnsSingleSort"
					:data="dataSortWithSelection"
					:use-row-selection="true"
					@update:sort="( newSort ) => onSort( newSort, 'withSelection' )"
				/>

				<h2>Table with row actions</h2>
				<cdx-table
					caption="Instruments"
					:columns="columnsRowActions"
					:data="dataRowActions"
				>
					<template #item-actions>
						<cdx-menu-button
							v-model:selected="actionSelection"
							:menu-items="menuItems"
							aria-label="Actions"
						>
							<cdx-icon :icon="cdxIconEllipsis" />
						</cdx-menu-button>
					</template>
				</cdx-table>
			</section>
		</template>
	</demo-base-layout>
</template>

<script lang="ts" setup>
import { Ref, ref, computed } from 'vue';
import {
	CdxButton,
	CdxCheckbox,
	CdxIcon,
	CdxInfoChip,
	CdxMenuButton,
	CdxTable,
	CdxToggleSwitch,
	TableColumn,
	TableSortOption,
	TableSort,
	TableRow,
	TableRowIdentifier
} from '../lib';
import { cdxIconEllipsis, cdxIconEdit, cdxIconNotice, cdxIconMessage, cdxIconAlert, cdxIconTrash } from '@wikimedia/codex-icons';
import DemoBaseLayout from './DemoBaseLayout.vue';

const restrictWidth = ref( true );
const rootClasses = computed( () => {
	return {
		'cdx-demo-table-page--restrict-width': restrictWidth.value
	};
} );

// Basic table.
const columnsBasic: TableColumn[] = [
	{ id: 'col1', label: 'Column 1' },
	{ id: 'col2', label: 'Column 2', textAlign: 'number' },
	{ id: 'col3', label: 'Column 3' }
];
const dataBasic = [
	{ col1: 'One', col2: 1, col3: 'Uno' },
	{ col1: 'Two', col2: 2, col3: 'Dos' },
	{ col1: 'Three', col2: 3, col3: 'Tres' },
	{ col1: 'Four', col2: 4, col3: 'Cuatro' }
];

// Table with data out of order.
const dataOutOfOrder = [
	{ col2: 1, col1: 'One', col3: 'Uno' },
	{ col2: 2, col3: 'Dos', col1: 'Two' },
	{ col1: 'Three', col3: 'Cuatro', col2: 3 },
	{ col3: 'Cuatro', col1: 'Four', col2: 4 }
];

// Table with ID column and extra data.
const columnsExtraData: TableColumn[] = [
	{ id: 'id', label: 'ID', textAlign: 'number', width: '30%' },
	{ id: 'name', label: 'Name', width: '70%' }
];
const dataExtraData = [
	{ id: '1234', name: 'Toast', species: 'cat', coat: 'tortoiseshell' },
	{ id: '5678', species: 'dog', breed: 'Shiba Inu', name: 'Laszlo' }
];

// Table with columns of varied widths.
const columnsVariedWidth: TableColumn[] = [
	{ id: 'user', label: 'User' },
	{ id: 'ip', label: 'IP(s)' },
	{ id: 'userAgent', label: 'User Agent(s)', minWidth: '300px' }
];

const ids = [
	'Abc',
	'Twoword Username',
	'Shortish',
	'123.45.6.789',
	'Donau­dampf­schiffahrts­elektrizitäten­haupt­betriebs­werk­bau­unter­beamten­gesellschaft',
	'PascalCase'
];
const ip = '123.45.6.789';
const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64, x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36 [10]';
const dataVariedWidth = [
	{ user: ids[ 0 ], ip, userAgent },
	{ user: ids[ 1 ], ip, userAgent },
	{ user: ids[ 2 ], ip, userAgent },
	{ user: ids[ 3 ], ip, userAgent },
	{ user: ids[ 4 ], ip, userAgent },
	{ user: ids[ 5 ], ip, userAgent }
];

// Table with many columns.
const columnsManyColumns: TableColumn[] = columnsVariedWidth.concat( [
	{ id: 'user2', label: 'User 2' },
	{ id: 'ip2', label: 'IP(s) 2' },
	{ id: 'userAgent2', label: 'User Agent(s) 2', minWidth: '300px' }
] );
const dataManyColumns = [
	{ user: ids[ 0 ], ip, userAgent, user2: ids[ 0 ], ip2: ip, userAgent2: userAgent },
	{ user: ids[ 1 ], ip, userAgent, user2: ids[ 1 ], ip2: ip, userAgent2: userAgent },
	{ user: ids[ 2 ], ip, userAgent, user2: ids[ 2 ], ip2: ip, userAgent2: userAgent },
	{ user: ids[ 3 ], ip, userAgent, user2: ids[ 3 ], ip2: ip, userAgent2: userAgent },
	{ user: ids[ 4 ], ip, userAgent, user2: ids[ 4 ], ip2: ip, userAgent2: userAgent },
	{ user: ids[ 5 ], ip, userAgent, user2: ids[ 5 ], ip2: ip, userAgent2: userAgent }
];

// Table using the item slot.
const columnsItemSlot: TableColumn[] = [
	{ id: 'name', label: 'Name' },
	{ id: 'status', label: 'Status' },
	{ id: 'language', label: 'Language' }
];
const dataItemSlot = [
	{
		name: {
			label: 'JavaScript modulo 2',
			url: 'https://www.wikifunctions.org/view/en/Z12483'
		},
		status: 'Connected',
		language: 'javascript'
	},
	{
		name: {
			label: 'Composite modulo 2',
			url: 'https://www.wikifunctions.org/view/en/Z12486'
		},
		status: 'Connected',
		language: 'Composition'
	},
	{
		name: {
			label: 'number is even, python',
			url: 'https://www.wikifunctions.org/view/en/Z12694'
		},
		status: 'Disconnected',
		language: 'python'
	}
];

function getChipStatus( itemStatus: string ) {
	switch ( itemStatus ) {
		case 'Connected':
			return 'success';
		case 'Disconnected':
			return 'warning';
		default:
			return 'notice';
	}
}

// Table using default slot for tfoot.
const columnsTfoot: TableColumn[] = [
	{ id: 'item', label: 'Item' },
	{ id: 'cost', label: 'Cost', textAlign: 'number' }
];
const dataTfoot = [
	{ item: 'Housing', cost: '$1,500' },
	{ item: 'Groceries', cost: '$500' },
	{ item: 'Utilities', cost: '$200' }
];

// Table using default slot.
const dataDoctorWho = {
	firstDoctor: [
		{
			season: 'Season 1',
			doctor: 'First Doctor',
			episodes: 42,
			airStart: '23 November 1963',
			airEnd: '12 September 1964',
			viewers: 8.08
		},
		{
			season: 'Season 2',
			episodes: 39,
			airStart: '31 October 1964',
			airEnd: '24 July 1965',
			viewers: 10.46
		},
		{
			season: 'Season 3',
			episodes: 45,
			airStart: '11 September 1965',
			airEnd: '16 July 1966',
			viewers: 7.65
		}
	],
	secondDoctor: [
		{
			season: 'Season 4',
			doctor: 'Second Doctor',
			episodes: 43,
			airStart: '10 September 1966',
			airEnd: '1 July 1967',
			viewers: 7.1
		},
		{
			season: 'Season 5',
			episodes: 40,
			airStart: '2 September 1967',
			airEnd: '1 June 1968',
			viewers: 7.23
		},
		{
			season: 'Season 6',
			episodes: 45,
			airStart: '10 August 1968',
			airEnd: '21 June 1969',
			viewers: 6.38
		}
	]
};

// Table with row selection.
const selectedRows = ref( [] );

// Sort types.
interface NobelPrizeWinner {
	year: number;
	name: string;
	age: number;
}
type SingleSort = TableSort<keyof NobelPrizeWinner>;

// Table with single sort.
const columnsSingleSort: TableColumn[] = [
	{ id: 'year', label: 'Year', textAlign: 'number', allowSort: true },
	{ id: 'name', label: 'Last name', allowSort: true },
	{ id: 'pronoun', label: 'Pronoun', textAlign: 'number' },
	{ id: 'age', label: 'Age at win', textAlign: 'end', allowSort: true }
];
const dataSingleSort = ref<TableRow[]>( [
	{ year: 2023, name: 'Goldin', age: 77, pronoun: 'unknown' },
	{ year: 2022, name: 'Bernanke', age: 69, pronoun: 'unknown' },
	{ year: 2022, name: 'Diamond', age: 69, pronoun: 'unknown' },
	{ year: 2022, name: 'Dybvig', age: 67, pronoun: 'unknown' },
	{ year: 2021, name: 'Card', age: 65, pronoun: 'unknown' },
	{ year: 2021, name: 'Angrist', age: 61, pronoun: 'unknown' },
	{ year: 2021, name: 'Imbens', age: 58, pronoun: 'unknown' }
] );
const singleSort = ref<SingleSort>( { year: 'asc' } );

// Table with row selection and sorting.
const selectedRowsSortWithSelection = ref( [] );
const dataSortWithSelection = ref( [
	{ [ TableRowIdentifier ]: 'goldin', year: 2023, name: 'Goldin', age: 77 },
	{ [ TableRowIdentifier ]: 'bernanke', year: 2022, name: 'Bernanke', age: 69 },
	{ [ TableRowIdentifier ]: 'diamond', year: 2022, name: 'Diamond', age: 69 },
	{ [ TableRowIdentifier ]: 'dybvig', year: 2022, name: 'Dybvig', age: 67 },
	{ [ TableRowIdentifier ]: 'card', year: 2021, name: 'Card', age: 65 },
	{ [ TableRowIdentifier ]: 'angrist', year: 2021, name: 'Angrist', age: 61 },
	{ [ TableRowIdentifier ]: 'imbens', year: 2021, name: 'Imbens', age: 58 }
] );
const sortWithSelection = ref<SingleSort>( { year: 'asc' } );

function onSort( newSort: SingleSort, demoKey: 'singleSort'|'withSelection' ) {
	if ( demoKey === 'singleSort' ) {
		handleSort( newSort, singleSort, dataSingleSort );
	}
	if ( demoKey === 'withSelection' ) {
		handleSort( newSort, sortWithSelection, dataSortWithSelection );
	}
}

function handleSort( newSort: SingleSort, sortRef: Ref<SingleSort>, sortData: Ref<TableRow[]> ) {
	const sortKey = Object.keys( newSort )[ 0 ] as keyof SingleSort;

	function sortNumerically( columnId: 'year' | 'age', sortDir: TableSortOption ) {
		return sortData.value.sort( ( a, b ):number => {
			if ( sortDir === 'asc' ) {
				return b[ columnId ] - a[ columnId ];
			}
			return a[ columnId ] - b[ columnId ];
		} );
	}

	function sortByName( sortDir: TableSortOption ) {
		return sortData.value.sort( ( a, b ) => {
			const multiplier = sortDir === 'asc' ? 1 : -1;
			return multiplier * ( a.name.localeCompare( b.name ) );
		} );
	}

	// Handle default sort.
	if ( newSort[ sortKey ] === 'none' ) {
		sortData.value = sortNumerically( 'year', 'asc' );
		sortRef.value[ sortKey ] = 'none';
		return;
	}

	// Sort data.
	switch ( sortKey ) {
		case 'year':
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			sortData.value = sortNumerically( 'year', newSort.year! );
			return;
		case 'name':
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			sortData.value = sortByName( newSort.name! );
			return;
		case 'age':
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			sortData.value = sortNumerically( 'age', newSort.age! );
			return;
		default:
			return;
	}
}

// With row actions.
const columnsRowActions = [
	{ id: 'name', label: 'Name' },
	{ id: 'team', label: 'Team' },
	{ id: 'type', label: 'Type' },
	{ id: 'startDate', label: 'Start Date' },
	{ id: 'progress', label: 'Progress' },
	{ id: 'status', label: 'Status' },
	{ id: 'actions', label: 'Actions' }
];
const dataRowActions = [
	{ name: 'test Web Scroll UI', team: 'Web Team', type: 'baseline', startDate: '2024-08-17', progress: '', status: 'Off' },
	{ name: 'test Desktop UI Interactions', team: 'Growth Team', type: 'baseline', startDate: '2024-08-17', progress: '', status: 'Off' },
	{ name: 'test Android Article Find in Page', team: 'Android Team', type: 'baseline', startDate: '2024-08-17', progress: '', status: 'Off' },
	{ name: 'test Android Article Link Preview Interaction', team: 'Android Team', type: 'baseline', startDate: '2024-08-17', progress: '', status: 'Off' },
	{ name: 'test Android Article TOC', team: 'Android Team', type: 'baseline', startDate: '2024-08-17', progress: '', status: 'Off' }
];
const actionSelection = ref( '' );
const menuItems = [
	{ label: 'Edit Configuration', value: 'edit', icon: cdxIconEdit },
	{ label: 'View Phab Ticket', value: 'phab', icon: cdxIconNotice },
	{ label: 'Contact Owner', value: 'contact', icon: cdxIconMessage },
	{ label: 'Turn Instrument On', value: 'status', icon: cdxIconAlert },
	{ label: 'Delete Instrument', value: 'delete', icon: cdxIconTrash }
];

</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

body {
	font-family: @font-family-system-sans;
}

h1 {
	font-size: @font-size-xxx-large;
}

h2 {
	font-size: @font-size-xx-large;
}

/* stylelint-disable scale-unlimited/declaration-strict-value */
.cdx-demo-table-page {
	padding-bottom: @size-400;

	&--restrict-width {
		max-width: 40em;
	}

	&__header-footer {
		&__buttons {
			display: flex;
			gap: @spacing-50;
		}

		table {
			table-layout: fixed;

			th {
				min-width: 300px;
			}
		}
	}
}
</style>

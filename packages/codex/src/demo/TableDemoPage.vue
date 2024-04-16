<!-- eslint-disable vue/singleline-html-element-content-newline vue/no-static-inline-styles -->
<template>
	<section class="cdx-demo-table-page" :class="rootClasses">
		<h1>Table demos</h1>

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

		<h2>Table using default slot and columns</h2>
		<cdx-table caption="Table caption" :columns="columnsBasic">
			<tbody>
				<tr>
					<td colspan="3" class="cdx-table__cell--align-center">
						First section
					</td>
				</tr>
				<tr>
					<td>One</td>
					<td class="cdx-table__cell--align-end">1</td>
					<td>Uno</td>
				</tr>
				<tr>
					<td>Two</td>
					<td class="cdx-table__cell--align-end">2</td>
					<td>Dos</td>
				</tr>
				<tr>
					<td colspan="3" class="cdx-table__cell--align-center">
						Second section
					</td>
				</tr>
				<tr>
					<td>Three</td>
					<td class="cdx-table__cell--align-end">3</td>
					<td>Tres</td>
				</tr>
				<tr>
					<td>Four</td>
					<td class="cdx-table__cell--align-end">4</td>
					<td>Cuatro</td>
				</tr>
			</tbody>
		</cdx-table>

		<h2>Table using default slot for tfoot</h2>
		<cdx-table
			caption="Monthly budget"
			:columns="columnsTfoot"
			:data="dataTfoot"
			:use-row-headers="true"
		>
			<tfoot>
				<tr>
					<th>Total:</th>
					<td class="cdx-table__cell--align-end">$2,200</td>
				</tr>
			</tfoot>
		</cdx-table>

		<h2>Table using default slot</h2>
		<cdx-table caption="Doctor Who seasons">
			<thead>
				<tr>
					<th rowspan="2">Season/series</th>
					<th rowspan="2">Doctor</th>
					<th rowspan="2" class="cdx-table__cell--align-end">Episodes</th>
					<th
						rowspan="1"
						colspan="2"
						class="cdx-table__cell--align-center"
					>
						Originally aired
					</th>
					<th rowspan="2" class="cdx-table__cell--align-end">
						Average viewers (millions)
					</th>
				</tr>
				<tr>
					<th>First aired</th>
					<th>Last aired</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td colspan="6">Classic era</td>
				</tr>
				<template v-for="( doctor, key ) in dataDoctorWho" :key="key">
					<tr v-for="( season, index ) in doctor" :key="index">
						<td>{{ season.season }}</td>
						<td v-if="season.doctor" :rowspan="doctor.length">{{ season.doctor }}</td>
						<td class="cdx-table__cell--align-end">{{ season.episodes }}</td>
						<td>{{ season.airStart }}</td>
						<td>{{ season.airEnd }}</td>
						<td class="cdx-table__cell--align-end">{{ season.viewers }}</td>
					</tr>
				</template>
			</tbody>
		</cdx-table>

		<h2>Table with sort icon</h2>
		<cdx-table
			caption="Table caption"
			:columns="columnsSortable"
			:data="dataBasic"
		/>
	</section>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
// eslint-disable-next-line no-restricted-imports
import { CdxTable } from '../components-wip/index';
import { CdxButton, CdxCheckbox, CdxInfoChip, CdxToggleSwitch, TableColumn } from '../lib';

const restrictWidth = ref( false );
const rootClasses = computed( () => {
	return {
		'cdx-demo-table-page--restrict-width': restrictWidth.value
	};
} );

// Basic table.
const columnsBasic: TableColumn[] = [
	{ id: 'col1', label: 'Column 1' },
	{ id: 'col2', label: 'Column 2', textAlign: 'end' },
	{ id: 'col3', label: 'Column 3!' }
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
	{ id: 'id', label: 'ID', textAlign: 'end' },
	{ id: 'name', label: 'Name' }
];
const dataExtraData = [
	{ id: '1234', name: 'Toast', species: 'cat', coat: 'tortoiseshell' },
	{ id: '5678', species: 'dog', breed: 'Shiba Inu', name: 'Laszlo' }
];

// Table with columns of varied widths.
const columnsVariedWidth: TableColumn[] = [
	{ id: 'user', label: 'User' },
	{ id: 'ip', label: 'IP(s)' },
	{ id: 'userAgent', label: 'User Agent(s)' }
];

const ids = [
	'Abc',
	'Twoword Username',
	'Shortish',
	'123.45.6.789',
	'Short',
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
	{ id: 'userAgent2', label: 'User Agent(s) 2' }
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

const columnsSortable: TableColumn[] = [
	{ id: 'col1', label: 'Column 1' },
	{ id: 'col2', label: 'Column 2', textAlign: 'end', allowSort: true },
	{ id: 'col3', label: 'Column 3', allowSort: true }
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
	{ id: 'cost', label: 'Cost', textAlign: 'end' }
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

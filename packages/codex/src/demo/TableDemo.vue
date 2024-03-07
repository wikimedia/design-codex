<template>
	<section id="cdx-table">
		<h2>Tables</h2>
		<p>
			See also an extended set of <a href="demos/table.html">Table demos</a>.
		</p>

		<cdx-table
			caption="Table caption"
			:columns="columns"
			:data="data"
		/>
	</section>
</template>

<script lang="ts" setup>
// eslint-disable-next-line no-restricted-imports
import { CdxTable } from '../components-wip/index';

const columns = [
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
const data = [
	{ user: ids[ 0 ], ip, userAgent },
	{ user: ids[ 1 ], ip, userAgent },
	{ user: ids[ 2 ], ip, userAgent },
	{ user: ids[ 3 ], ip, userAgent },
	{ user: ids[ 4 ], ip, userAgent },
	{ user: ids[ 5 ], ip, userAgent }
];
</script>

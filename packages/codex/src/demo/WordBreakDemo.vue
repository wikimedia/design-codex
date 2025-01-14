<!-- eslint-disable vue/singleline-html-element-content-newline max-len -->
<template>
	<demo-base-layout class="cdx-demo-word-break-page">
		<template #header>
			Word break demos
		</template>
		<template #content>
			<h2>Cards</h2>
			<p>Shrink the viewport to see how the text responds on smaller screens.</p>
			<div class="cdx-demo-word-break-page__cards">
				<cdx-card lang="en">
					<template #title>Long English word</template>
					<template #description>Do you have pneumonoultramicroscopicsilicovolcanoconiosis?</template>
				</cdx-card>
				<cdx-card lang="de">
					<template #title>Long German word</template>
					<template #description>One of the longest known German words is Donaudampfschifffahrtselektrizitätenhauptbetriebswerkbauunterbeamtengesellschaft.</template>
				</cdx-card>
				<cdx-card lang="en">
					<template #title>URL</template>
					<template #description>Visit https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/64_365_Color_Macro_%285498808099%29.jpg</template>
				</cdx-card>
				<cdx-card lang="en">
					<template #title>Long number</template>
					<template #description>I am 12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789 years old.</template>
				</cdx-card>
			</div>

			<h2>Messages</h2>
			<div class="cdx-demo-word-break-page__messages" lang="en">
				<p>
					From the English Wikipedia create account page on mobile; see T353005. A
					max-width of 290px is applied to mimic very small mobiles and the max-width set
					on larger screens.
				</p>
				<cdx-message class="cdx-demo-word-break-page__messages--enwiki">
					<p><strong>Wikipedia is made by people like you.</strong></p>
					<p>Log in to continue.</p>
				</cdx-message>

				<p>
					From the IDM/Bitu create account page; see T376648. A max-width of 470px is set
					to mimic the max-width of that message on desktop.
				</p>
				<cdx-message class="cdx-demo-word-break-page__messages--bitu">
					When you create or use a
					<a href="https://www.mediawiki.org/wiki/Special:MyLanguage/Developer_account">Wikimedia developer account</a>,
					some information becomes visible to other users of
					<a href="https://wikitech.wikimedia.org/wiki/Special:MyLanguage/Help:Cloud_Services_introduction">Wikimedia Cloud Services</a>.
					Specifically, the email address linked to your account will be publicly visible.
					Additionally, when you connect to virtual machines in Wikimedia Cloud VPS using
					SSH, your IP address will be recorded. This information might be visible to
					other users of Cloud VPS or Toolforge.
				</cdx-message>
			</div>

			<h2>Table</h2>
			<cdx-table
				class="cdx-demo-word-break-page__table"
				caption="User data"
				:columns="columnsVariedWidth"
				:data="dataVariedWidth"
			/>
		</template>
	</demo-base-layout>
</template>

<script lang="ts" setup>
import { CdxCard, CdxMessage, CdxTable, TableColumn } from '../lib';
import DemoBaseLayout from './DemoBaseLayout.vue';

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
const dataVariedWidth = [
	{ user: ids[ 0 ], ip, userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64, x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36 [10]' },
	{ user: ids[ 1 ], ip: '123456789', userAgent: 'Do you have pneumonoultramicroscopicsilicovolcanoconiosis?' },
	{ user: ids[ 2 ], ip, userAgent: 'One of the longest known German words is Donaudampfschifffahrtselektrizitätenhauptbetriebswerkbauunterbeamtengesellschaft.' },
	{ user: ids[ 3 ], ip, userAgent: 'Visit https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/64_365_Color_Macro_%285498808099%29.jpg' },
	{ user: ids[ 4 ], ip, userAgent: 'I am 12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789 years old.' }
];
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';
@import ( reference ) '../themes/mixins/common.less';

.cdx-demo {
	font-family: @font-family-system-sans;
}

h1 {
	font-size: @font-size-xxx-large;
}

h2 {
	font-size: @font-size-xx-large;
}

/* stylelint-disable scale-unlimited/declaration-strict-value */
.cdx-demo-word-break-page {
	padding-bottom: @size-400;

	&__cards {
		display: grid;
		grid-template-columns: repeat( 1, 1fr );
		grid-template-rows: repeat( 4, 1fr );
		grid-gap: @spacing-100;
		max-width: @size-5600;

		@media screen and ( min-width: @min-width-breakpoint-tablet ) {
			grid-template-columns: repeat( 2, 1fr );
			grid-template-rows: repeat( 2, 1fr );
		}

		.cdx-card {
			max-width: calc( @size-5600 / 2 - @spacing-50 );
		}
	}

	&__messages {
		&--enwiki {
			box-sizing: border-box;
			max-width: 290px;
		}

		&--bitu {
			box-sizing: border-box;
			max-width: 470px;
		}
	}

	&__table {
		max-width: @size-4000;
	}
}
</style>

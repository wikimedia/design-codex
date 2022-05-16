<template>
	<cdx-tabs v-model:active="currentTab" :framed="framed">
		<cdx-tab
			v-for="( tab, index ) in tabsData"
			:key="index"
			:name="tab.name"
			:label="tab.label"
		>
			<!-- Tab content -->
			<h2>{{ tab.heading }}</h2>

			<template v-if="tab.name === 'read'">
				<p>
					The <b>sand cat</b> (<i>Felis margarita</i>), also known as
					the <b>sand dune cat</b>, is a small wild
					<a href="#" title="Felis">cat</a> that inhabits
					sandy and stony <a href="#" title="Desert">deserts</a>
					far from water sources. With its sandy to light grey fur, it
					is well camouflaged in a desert environment.
				</p>
			</template>
			<template v-if="tab.name === 'source'">
				<code>
					The '''sand cat''' (''Felis margarita''), also known as the
					'''sand dune cat''', is a small wild [[Felis|cat]] that
					inhabits sandy and stony [[deserts]] far from water sources.
					With its sandy to light grey fur, it is well camouflaged in
					a desert environment.
				</code>
			</template>
			<template v-if="tab.name === 'history'">
				<h3>Revisions</h3>
				<ul>
					<li>Revision 3</li>
					<li>Revision 2</li>
					<li>Revision 1</li>
				</ul>
			</template>
		</cdx-tab>
	</cdx-tabs>
</template>

<script lang="ts">
import { CdxTabs, CdxTab } from '@wikimedia/codex';
import { defineComponent } from 'vue';

export default defineComponent( {
	name: 'BasicTabs',
	components: {
		CdxTabs,
		CdxTab
	},
	props: {
		framed: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			tabsData: [ {
				name: 'read',
				label: 'Read',
				heading: 'Sand cat'
			}, {
				name: 'source',
				label: 'View source',
				heading: 'View source for Sand cat'
			}, {
				name: 'history',
				label: 'View history',
				heading: 'Sand cat: Revision history'
			} ],

			currentTab: 'read'
		};
	}
} );
</script>

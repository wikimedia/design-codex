<template>
	<cdx-tabs :framed="framed">
		<cdx-tab
			v-for="( tab, index ) in tabsData"
			:key="index"
			:name="tab.name"
			:label="tab.label"
			:disabled="tab.disabled"
		>
			<h2>Content for {{ tab.name }}</h2>
			<p>
				This is the content for the {{ tab.label }}
			</p>
		</cdx-tab>
	</cdx-tabs>
</template>

<script>
import { CdxTabs, CdxTab } from '@wikimedia/codex';
import { defineComponent } from 'vue';

const tabsData = [ {
	name: 'tab1',
	label: 'First Tab'
}, {
	name: 'tab2',
	label: 'Second Tab with a really really really really long name'
}, {
	name: 'tab3',
	label: 'Third Tab'
}, {
	name: 'tab4',
	label: 'Fourth Tab',
	disabled: true
}, {
	name: 'tab5',
	label: 'Fifth Tab'
}, {
	name: 'tab6',
	label: 'Sixth Tab'
} ];

export default defineComponent( {
	name: 'ManyTabs',
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
			tabsData
		};
	}
} );
</script>

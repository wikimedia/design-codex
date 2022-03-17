<template>
	<cdx-tabs v-model:active="currentTab" :framed="framed">
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

	<cdx-button @click="swapTabs">
		Swap out tabs
	</cdx-button>
</template>

<script lang="ts">
import { CdxTabs, CdxTab, CdxButton } from '@wikimedia/codex';
import { defineComponent } from 'vue';

const firstSetOfTabs = [ {
	name: 'tab1',
	label: 'First Tab'
}, {
	name: 'tab2',
	label: 'Second Tab with a really really really really long name'
}, {
	name: 'tab3',
	label: 'Third Tab',
	disabled: true
}, {
	name: 'tab4',
	label: 'Fourth Tab'
}, {
	name: 'tab5',
	label: 'Fifth Tab'
} ];

const secondSetOfTabs = [ {
	name: 'tab6',
	label: 'Sixth Tab'
}, {
	name: 'tab7',
	label: 'Seventh Tab'
}, {
	name: 'tab8',
	label: 'Eighth Tab',
	disabled: true
}, {
	name: 'tab9',
	label: 'Ninth Tab'
} ];

export default defineComponent( {
	name: 'DynamicallyGeneratedTabs',
	components: {
		CdxTabs,
		CdxTab,
		CdxButton
	},
	props: {
		framed: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			tabsData: firstSetOfTabs,
			currentTab: 'tab1'
		};
	},

	methods: {
		swapTabs() {
			if ( this.tabsData[ 0 ].name === 'tab1' ) {
				this.tabsData = secondSetOfTabs;
			} else {
				this.tabsData = firstSetOfTabs;
			}

			this.currentTab = this.tabsData[ 0 ].name;
		}
	}
} );
</script>

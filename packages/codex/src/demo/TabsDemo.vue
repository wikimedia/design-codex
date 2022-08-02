<template>
	<section id="cdx-tabs">
		<h2>Tabs</h2>

		<cdx-tabs v-model:active="activeTab">
			<cdx-tab
				v-for="( tab, index ) in tabs"
				:key="index"
				:name="tab"
			>
				<p>Content for {{ tab }}</p>
			</cdx-tab>
		</cdx-tabs>

		<cdx-button @click="reverseTabs">
			Reverse tab order
		</cdx-button>
	</section>
</template>

<script lang="ts" setup>
import { CdxButton, CdxTab, CdxTabs } from '../lib';
import { ref } from 'vue';
const activeTab = ref( 'tab1' );
const tabs = ref( [ 'tab1', 'tab2', 'tab3' ] );

function reverseTabs() {
	tabs.value.reverse();
}
</script>

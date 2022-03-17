<template>
	<cdx-tabs v-model:active="currentTab">
		<cdx-tab
			:name="tabName"
			:disabled="disabled"
			:label="label"
		>
			<p>
				<slot />
			</p>
		</cdx-tab>

		<cdx-tab name="tab2">
			<p>
				Content for second tab
			</p>
		</cdx-tab>
	</cdx-tabs>
</template>

<script lang="ts">
import { CdxTab, CdxTabs } from '@wikimedia/codex';
import { defineComponent } from 'vue';

export default defineComponent( {
	name: 'ConfigurableTabDemo',
	components: {
		CdxTabs,
		CdxTab
	},
	props: {
		tabName: {
			type: String,
			required: true
		},

		disabled: {
			type: Boolean,
			default: false
		},

		label: {
			type: String,
			default: ''
		}
	},

	data() {
		return {
			currentTab: ''
		};
	},

	watch: {
		tabName( newVal, oldVal ) {
			if ( this.currentTab === oldVal ) {
				this.currentTab = newVal;
			}
		}
	},

	mounted() {
		this.currentTab = this.tabName;
	}
} );
</script>

<template>
	<section
		v-show="isActive"
		:id="tab.id"
		:aria-hidden="!isActive ? true : undefined"
		:aria-labelledby="`${tab.id}-label`"
		class="cdx-tab"
		role="tabpanel"
		tabindex="-1"
	>
		<!-- @slot Tab content -->
		<slot />
	</section>
</template>

<script lang="ts">
import { defineComponent, computed, inject } from 'vue';
import { TabsKey, ActiveTabKey } from '../../constants';
import { TabData } from '../../types';

/**
 * A section of content within a Tabs layout.
 */
export default defineComponent( {
	name: 'CdxTab',

	/**
	 * The "label" and "disabled" props are referenced by the parent Tabs
	 * component during the generation of a list of labels.
	 */
	props: {
		/**
		 * String name of the tab, used for programmatic selection. Each Tab
		 * inside a layout must have a unique name. This prop will also be
		 * used as the tab label if no "label" prop is provided.
		 */
		name: {
			type: String,
			required: true
		},

		/**
		 * Label that corresponds to this Tab in the Tabs component's header.
		 * Lengthy labels will be truncated.
		 */
		// eslint-disable-next-line vue/no-unused-properties
		label: {
			type: String,
			default: ''
		},

		/**
		 * Whether or not the tab is disabled. Disabled tabs cannot be accessed
		 * via label clicks or keyboard navigation.
		 */
		// eslint-disable-next-line vue/no-unused-properties
		disabled: {
			type: Boolean,
			default: false
		}
	},

	setup( props ) {
		const tabsData = inject( TabsKey );
		const activeTab = inject( ActiveTabKey );

		// Throw error if used outside of Tabs
		if ( !tabsData || !activeTab ) {
			throw new Error( 'Tab component must be used inside a Tabs component' );
		}

		// This component must rely on data that is provided from the parent Tabs
		// instance for two additional pieces of information:
		// * unique generated ID for the tab
		// * whether or not the given tab is active
		// In both cases this info is needed to support correct ARIA attributes.
		const tab = tabsData.value.get( props.name ) || {} as TabData;
		const isActive = computed( () => props.name === activeTab.value );

		return {
			tab,
			isActive
		};
	}

} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-tab {
	// For CSS-only tab.
	&[ aria-hidden='true' ] {
		display: none;
	}

	&:focus {
		outline: @outline-base--focus;
	}
}
</style>

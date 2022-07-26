<template>
	<!--
		Need to use v-if and not v-show because if the icon is not set or invalid, the
		component will still try to use the :icon="demoIcon" with the value of undefined,
		which breaks.
	-->
	<cdx-icon
		v-if="demoIcon"
		:icon="demoIcon"
	/>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { CdxIcon } from '@wikimedia/codex';
import getIconByName from '../../utils/getIconByName';

/**
 * Helper for component demos for testing icons being used within a slot. The property
 * `icon` should be the *name* of the icon to use, or an empty string for no icon, and this
 * component will either render a cdx-icon component based on the icon name, or do nothing. This
 * gets the *name* of the icon rather than an actual icon object to simplify the logic.
 */
export default defineComponent( {
	name: 'CdxDemoSlotIcon',
	components: { CdxIcon },
	props: {
		/**
		 * Icon name
		 */
		icon: {
			type: String,
			required: true
		}
	},
	setup( props ) {
		// Icon object, or undefined for no matching icon (including empty icon name)
		const demoIcon = computed( () => getIconByName( props.icon ) );

		return {
			demoIcon
		};
	}
} );
</script>

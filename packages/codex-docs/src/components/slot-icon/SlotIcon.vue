<template>
	<!--
		Need to use v-if and not v-show because if the icon is not set the component will
		still try to use the :icon="demoIcon" with the value of false, which breaks.
	-->
	<cdx-icon
		v-if="demoIcon"
		:icon="demoIcon"
	/>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { CdxIcon } from '@wikimedia/codex';
import * as allIcons from '@wikimedia/codex-icons';
import { Icon } from '@wikimedia/codex-icons';

// Access to icon objects by name
const iconsByName = {} as Record<string, Icon>;
for ( const iconName in allIcons ) {
	const icon = allIcons[ iconName as keyof typeof allIcons ];
	// Some of the exports are utility functions, filter those out
	if ( typeof icon === 'function' ) {
		continue;
	}
	// Add to known map
	iconsByName[ iconName ] = icon;
}

/**
 * Helper for component demos for testing icons being used within a slot. The property
 * `icon` should be the *name* of the icon to use, or an empty string for no icon, and this
 * component will either render a cdx-icon component based on the icon name, or do nothing. This
 * gets the *name* of the icon rather than an actual icon object to simplify the logic.
 *
 * @author DannyS712
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
		const demoIcon = computed( () => {
			if ( props.icon && iconsByName[ props.icon ] ) {
				return iconsByName[ props.icon ];
			}
			return false;
		} );

		return {
			demoIcon
		};
	}
} );
</script>

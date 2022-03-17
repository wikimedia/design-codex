<template>
	<cdx-icon v-if="icon" :icon="icon" />
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { CdxIcon } from '@wikimedia/codex';
import * as allIcons from '@wikimedia/codex-icons';
import { Icon } from '@wikimedia/codex-icons';

export default defineComponent( {
	name: 'CdxDocsNamedIcon',
	components: {
		CdxIcon
	},
	props: {
		iconName: {
			type: String,
			default: ''
		}
	},
	setup( props ) {
		const icon = computed( () : Icon | undefined => {
			const iconOrFunction = allIcons[ props.iconName as keyof typeof allIcons ];
			return typeof iconOrFunction !== 'function' ? iconOrFunction : undefined;
		} );

		return {
			icon
		};
	}
} );
</script>

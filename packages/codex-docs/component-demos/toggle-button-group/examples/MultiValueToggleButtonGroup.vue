<template>
	<cdx-toggle-button-group
		v-model="selectedValue"
		:buttons="buttons"
	/>
	<p>
		Selected values:
		{{ selectedValue.join( ', ' ) || '(none)' }}
	</p>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxToggleButtonGroup } from '@wikimedia/codex';
import { cdxIconBell, cdxIconCalendar, cdxIconUserAvatar } from '@wikimedia/codex-icons';

export default defineComponent( {
	name: 'MultiValueToggleButtonGroup',
	components: {
		CdxToggleButtonGroup
	},
	setup() {
		const buttons = [
			{ value: 'notification', label: null, icon: cdxIconBell, ariaLabel: 'Notification' },
			{ value: 'calendar', label: null, icon: cdxIconCalendar, ariaLabel: 'Calendar' },
			{ value: 'user', label: null, icon: cdxIconUserAvatar, ariaLabel: 'User' }
		];

		// Initializing to an array indicates that this is a multi-select group
		const selectedValue = ref( [] );

		return {
			buttons,
			selectedValue
		};
	}
} );
</script>

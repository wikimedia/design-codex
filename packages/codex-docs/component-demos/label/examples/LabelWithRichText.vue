<template>
	<div>
		<cdx-label input-id="muted-users-input">
			Muted users
			<template #description>
				Do not display notifications from these users.
				<a href="https://www.mediawiki.org/wiki/Help:Notifications#mute">Learn more about how this works</a>.
			</template>
		</cdx-label>
		<cdx-text-input
			id="muted-users-input"
			v-model="inputValue"
			placeholder="Add users..."
		/>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { CdxTextInput, CdxLabel } from '@wikimedia/codex';

export default defineComponent( {
	name: 'LabelWithRichText',
	components: { CdxTextInput, CdxLabel },
	setup() {
		const inputValue = ref( '' );

		return {
			inputValue
		};
	}
} );
</script>

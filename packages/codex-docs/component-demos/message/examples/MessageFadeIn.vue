<template>
	<div class="cdx-docs-message-fade-in">
		<cdx-button @click="showMessage = true">
			Show message
		</cdx-button>
		<cdx-message
			v-if="showMessage"
			type="success"
			:fade-in="true"
		>
			Success!
		</cdx-message>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { CdxMessage, CdxButton } from '@wikimedia/codex';

export default defineComponent( {
	name: 'MenuItemDefault',
	components: { CdxMessage, CdxButton },
	setup() {
		const showMessage = ref( false );
		return {
			showMessage
		};
	}
} );
</script>

<style lang="less" scoped>
.cdx-docs-message-fade-in {
	min-height: 112px;

	// stylelint-disable-next-line selector-class-pattern
	.cdx-message {
		margin-top: 16px;
	}
}
</style>

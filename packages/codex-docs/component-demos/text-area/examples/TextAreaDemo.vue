<template>
	<div>
		<cdx-text-area />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { CdxTextArea } from '@wikimedia/codex';

export default defineComponent( {
	name: 'TextAreaDemo',
	components: { CdxTextArea }
} );
</script>

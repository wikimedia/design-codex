<template>
	<section id="cdx-chip-input">
		<h2>
			ChipInput
		</h2>
		<p>Normal:</p>
		<cdx-chip-input
			v-model:input-chips="chips"
			chip-aria-description="Press Enter to edit or Delete to remove"
		/>
		<p>With separate input:</p>
		<cdx-chip-input
			v-model:input-chips="chips"
			chip-aria-description="Press Enter to edit or Delete to remove"
			separate-input
		/>
	</section>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { CdxChipInput } from '../lib';

const chips = ref( [] );
</script>

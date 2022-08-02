<template>
	<section id="cdx-toggle">
		<h2>ToggleButton and ToggleSwitch</h2>
		<cdx-toggle-button v-model="toggleValue">
			<cdx-icon :icon="toggleButtonIcon" />
			{{ toggleButtonLabel }}
		</cdx-toggle-button>

		<p>
			Playing:
			<cdx-toggle-switch v-model="toggleValue" />
		</p>
	</section>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { CdxToggleButton, CdxToggleSwitch, CdxIcon } from '../lib';
import { cdxIconPause, cdxIconPlay } from '@wikimedia/codex-icons';

const toggleValue = ref( false );
const toggleButtonIcon = computed( () => toggleValue.value ? cdxIconPause : cdxIconPlay );
const toggleButtonLabel = computed( () => toggleValue.value ? 'Pause' : 'Play' );
</script>

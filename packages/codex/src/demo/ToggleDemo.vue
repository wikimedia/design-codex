<template>
	<section id="cdx-toggle">
		<h2>ToggleButton and ToggleSwitch</h2>
		<cdx-toggle-button v-model="toggleValue">
			<cdx-icon :icon="toggleButtonIcon" />
			{{ toggleButtonLabel }}
		</cdx-toggle-button>

		<p>
			<cdx-toggle-switch v-model="toggleValue">
				Playing:
			</cdx-toggle-switch>
		</p>

		<h3>CSS-only ToggleSwitch</h3>
		<span class="cdx-toggle-switch">
			<input
				id="cdx-toggle-switch-css-1"
				class="cdx-toggle-switch__input"
				type="checkbox"
			>
			<span class="cdx-toggle-switch__switch">
				<span class="cdx-toggle-switch__switch__grip" />
			</span>
			<label for="cdx-toggle-switch-css-1" class="cdx-toggle-switch__label">
				Label
			</label>
		</span>
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

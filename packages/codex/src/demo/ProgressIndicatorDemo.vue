<template>
	<section id="cdx-progress-indicator">
		<h2>ProgressIndicator</h2>
		<cdx-progress-indicator>
			ProgressIndicator example
		</cdx-progress-indicator>
		<br>
		<cdx-progress-indicator aria-label="test" />
		<br>

		<h3>CSS-only version</h3>
		<div
			class="cdx-progress-indicator"
		>
			<div class="cdx-progress-indicator__indicator">
				<progress
					class="cdx-progress-indicator__indicator__progress"
					aria-label="ProgressIndicator example"
				/>
			</div>
		</div>
	</section>
</template>

<script lang="ts" setup>
// eslint-disable-next-line no-restricted-imports
import CdxProgressIndicator from '../components-wip/progress-indicator/ProgressIndicator.vue';
</script>

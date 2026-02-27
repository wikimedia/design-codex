<template>
	<section id="cdx-progress-bar">
		<h2>ProgressBar</h2>
		<cdx-progress-bar aria-label="ProgressBar example" />
		<br>
		<cdx-progress-bar :inline="true" aria-label="Inline ProgressBar" />
		<br>
		<cdx-progress-bar aria-label="Disabled ProgressBar" :disabled="true" />
		<br>
		<cdx-progress-bar
			aria-label="Determinate ProgressBar example"
			:value="40"
		/>
		<br>
		<cdx-progress-bar
			:inline="true"
			aria-label="Determinate Inline ProgressBar"
			:value="40"
		/>
		<br>
		<cdx-progress-bar
			aria-label="Determinate Disabled ProgressBar"
			:disabled="true"
			:value="40"
		/>
		<h3>
			CSS-only version
		</h3>
		<div
			class="cdx-progress-bar"
			role="progressbar"
			aria-label="ProgressBar example"
		>
			<div class="cdx-progress-bar__bar" />
		</div>
		<br>

		<div
			class="cdx-progress-bar cdx-progress-bar--inline"
			role="progressbar"
			aria-label="Inline ProgressBar example"
		>
			<div class="cdx-progress-bar__bar" />
		</div>
		<br>

		<div
			class="cdx-progress-bar cdx-progress-bar--disabled"
			role="progressbar"
			aria-label="Disabled ProgressBar example"
			aria-valuemin="0"
			aria-valuemax="100"
		>
			<div class="cdx-progress-bar__bar" />
		</div>
	</section>
</template>

<script lang="ts" setup>
import { CdxProgressBar } from '../lib';
</script>

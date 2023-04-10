<template>
	<section id="cdx-progress-bar">
		<h2>ProgressBar</h2>
		<cdx-progress-bar />
		<br>
		<cdx-progress-bar :inline="true" />
		<br>
		<cdx-progress-bar :disabled="true" />

		<h3>CSS-only version</h3>
		<div
			class="cdx-progress-bar"
			role="progressbar"
			aria-valuemin="0"
			aria-valuemax="100"
		>
			<div class="cdx-progress-bar__bar" />
		</div>
		<br>

		<div
			class="cdx-progress-bar cdx-progress-bar--inline"
			role="progressbar"
			aria-valuemin="0"
			aria-valuemax="100"
		>
			<div class="cdx-progress-bar__bar" />
		</div>
		<br>

		<div
			class="cdx-progress-bar cdx-progress-bar--disabled"
			role="progressbar"
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

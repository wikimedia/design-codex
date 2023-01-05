<template>
	<section id="cdx-message">
		<h2>Message</h2>
		<cdx-message
			v-for="( type ) in StatusTypes"
			:key="type"
			:type="type"
			dismiss-button-label="Dismiss"
		>
			{{ 'This is a ' + type + ' message.' }}
		</cdx-message>

		<cdx-message
			v-for="( type ) in StatusTypes"
			:key="type + '-inline'"
			:type="type"
			:inline="true"
			dismiss-button-label="Dismiss"
		>
			{{ 'This is an inline ' + type + ' message.' }}
		</cdx-message>

		<h3>CSS-only messages</h3>
		<div class="cdx-message cdx-message--block cdx-message--notice" aria-live="polite">
			<span class="cdx-message__icon" />
			<div class="cdx-message__content">
				This is a notice message.
			</div>
		</div>
		<div class="cdx-message cdx-message--block cdx-message--warning" aria-live="polite">
			<span class="cdx-message__icon" />
			<div class="cdx-message__content">
				This is a warning message.
			</div>
		</div>
		<div class="cdx-message cdx-message--block cdx-message--error" role="alert">
			<span class="cdx-message__icon" />
			<div class="cdx-message__content">
				<p><strong>This is a multiline error message.</strong></p>
				<p>Comprehensive explanation of the error.</p>
				<p><a href="#">Link</a> to more information.</p>
			</div>
		</div>
		<div class="cdx-message cdx-message--block cdx-message--success" aria-live="polite">
			<span class="cdx-message__icon" />
			<div class="cdx-message__content">
				This is a success message.
			</div>
		</div>
		<div class="cdx-message cdx-message--inline cdx-message--notice" aria-live="polite">
			<span class="cdx-message__icon" />
			<div class="cdx-message__content">
				This is an inline notice message.
			</div>
		</div>
		<div class="cdx-message cdx-message--inline cdx-message--warning" aria-live="polite">
			<span class="cdx-message__icon" />
			<div class="cdx-message__content">
				This is an inline warning message.
			</div>
		</div>
		<div class="cdx-message cdx-message--inline cdx-message--error" role="alert">
			<span class="cdx-message__icon" />
			<div class="cdx-message__content">
				This is an inline error message.
			</div>
		</div>
		<div class="cdx-message cdx-message--inline cdx-message--success" aria-live="polite">
			<span class="cdx-message__icon" />
			<div class="cdx-message__content">
				This is an inline success message.
			</div>
		</div>
	</section>
</template>

<script lang="ts" setup>
import { CdxMessage } from '../lib';
import { StatusTypes } from '../constants';
</script>

<style lang="less" scoped>
p {
	margin: 0;
}
</style>

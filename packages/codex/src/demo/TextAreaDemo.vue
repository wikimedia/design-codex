<template>
	<section id="cdx-text-area">
		<h2>TextArea</h2>
		<cdx-text-area
			v-model="textareaValue"
			:start-icon="cdxIconNotBright"
			:end-icon="cdxIconInfoFilled"
			placeholder="Start typing..."
			aria-label="Textarea demo"
		/>
		<p>
			Textarea value: {{ textareaValue }}
		</p>

		<h3>CSS-only version</h3>
		<div class="cdx-text-area cdx-text-area--has-start-icon cdx-text-area--has-end-icon">
			<textarea
				class="cdx-text-area__textarea"
				placeholder="Start typing..."
				aria-label="CSS-only TextArea demo"
			/>
			<span
				class="cdx-text-area__icon cdx-text-area__start-icon cdx-demo-css-icon--not-bright"
			/>
			<span
				class="cdx-text-area__icon cdx-text-area__end-icon cdx-demo-css-icon--info-filled"
			/>
		</div>
	</section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { CdxTextArea } from '../lib';
import { cdxIconNotBright, cdxIconInfoFilled } from '@wikimedia/codex-icons';

const textareaValue = ref( '' );
</script>

<style lang="less">
// Note: you must import the design tokens before importing the css-icon mixin
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';
@import ( reference ) '../themes/mixins/public/css-icon.less';

.cdx-demo-css-icon {
	&--not-bright {
		.cdx-mixin-css-icon-background-image( @cdx-icon-not-bright );
	}

	&--info-filled {
		.cdx-mixin-css-icon-background-image( @cdx-icon-info-filled );
	}
}
</style>

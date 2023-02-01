<template>
	<section id="cdx-text-input">
		<h2>TextInput</h2>
		<cdx-text-input
			v-model="inputValue"
			:start-icon="cdxIconSearch"
			:end-icon="cdxIconInfoFilled"
			clearable
			placeholder="Start typing..."
			aria-label="TextInput demo"
		/>
		<p>
			Input value: {{ inputValue }}
		</p>

		<h3>CSS-only version</h3>
		<div class="cdx-text-input cdx-text-input--has-start-icon cdx-text-input--has-end-icon">
			<input
				class="cdx-text-input__input"
				type="text"
				placeholder="Start typing..."
				aria-label="CSS-only TextInput demo"
			>
			<span
				class="cdx-text-input__icon cdx-text-input__start-icon cdx-demo-css-icon--search"
			/>
			<span
				class="cdx-text-input__icon cdx-text-input__end-icon cdx-demo-css-icon--info-filled"
			/>
		</div>
	</section>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { CdxTextInput } from '../lib';
import { cdxIconSearch, cdxIconInfoFilled } from '@wikimedia/codex-icons';

const inputValue = ref<string>();
</script>

<style lang="less">
@import ( reference ) '../themes/mixins/public/css-icon.less';

.cdx-demo-css-icon {
	&--search {
		.cdx-mixin-css-icon( @cdx-icon-search );
	}

	&--info-filled {
		.cdx-mixin-css-icon( @cdx-icon-info-filled );
	}
}
</style>

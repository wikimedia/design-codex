<template>
	<cdx-field
		class="cdx-demo-field-with-counter"
		:status="status"
		:messages="errorMessage"
	>
		<template #label>
			Enter your message
		</template>

		<cdx-text-area v-model="userMessageText" />

		<template #help-text>
			<div
				class="cdx-demo-field-with-counter__help-text"
				:class="dynamicClasses"
			>
				<!-- Display help text or error message depending on error status. -->
				<div class="cdx-demo-field-with-counter__help-text__message">
					<p>{{ helpText }}</p>
				</div>

				<!-- Display the remaining character count. -->
				<div class="cdx-demo-field-with-counter__help-text__counter">
					{{ charsRemaining }}
				</div>
			</div>
		</template>
	</cdx-field>
</template>

<script>
import { defineComponent, ref, computed } from 'vue';
import { CdxField, CdxTextArea } from '@wikimedia/codex';

export default defineComponent( {
	name: 'FieldWithCharacterCounter',
	components: {
		CdxField,
		CdxTextArea
	},
	setup() {
		const MAX_MESSAGE_LENGTH = 100;
		const helpText = `Please enter a message of ${MAX_MESSAGE_LENGTH} characters or less`;

		const errorMessage = { error: 'Message is too long' };
		const userMessageText = ref( '' );

		// This is a simplified example; support for other languages/scripts may
		// require more complex code.
		const charsRemaining = computed( () => MAX_MESSAGE_LENGTH - userMessageText.value.length );
		const status = computed( () => charsRemaining.value < 0 ? 'error' : 'default' );

		const dynamicClasses = computed( () => {
			return {
				'cdx-demo-field-with-counter__help-text--error': status.value === 'error'
			};
		} );

		return {
			userMessageText,
			status,
			charsRemaining,
			errorMessage,
			helpText,
			dynamicClasses
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-demo-field-with-counter {
	&__help-text {
		display: flex;
		align-items: center;
		flex-direction: row no-wrap;
		justify-content: space-between;

		&--error &__counter {
			color: @color-error;
		}
	}
}
</style>

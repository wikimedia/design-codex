<template>
	<cdx-field
		class="cdx-demo-textarea-field"
		:status="status"
		:messages="messages"
	>
		<cdx-text-area v-model="messageText" placeholder="Post your reply" />
		<template #label>
			Comments
		</template>
		<template #help-text>
			<div
				class="cdx-demo-textarea-field__help-text"
				:class="dynamicClasses"
			>
				<!-- Display help text or error message depending on error status. -->
				<div class="cdx-demo-textarea-field__help-text__message">
					<p>{{ helpText }}</p>
				</div>

				<!-- Display the remaining character count. -->
				<div class="cdx-demo-textarea-field__help-text__counter">
					{{ charsRemaining }}
				</div>
			</div>
		</template>
	</cdx-field>
</template>

<script>
import { defineComponent, ref, computed } from 'vue';
import { CdxTextArea, CdxField } from '@wikimedia/codex';

export default defineComponent( {
	name: 'TextAreaField',
	components: { CdxTextArea, CdxField },
	setup() {
		const MAX_MESSAGE_LENGTH = 100;
		const helpText = `Enter a message of ${ MAX_MESSAGE_LENGTH } characters or less`;

		const messages = { error: 'Message is too long' };
		const messageText = ref( '' );

		// This is a simplified example; support for other languages/scripts may
		// require more complex code.
		const charsRemaining = computed( () => MAX_MESSAGE_LENGTH - messageText.value.length );
		const status = computed( () => charsRemaining.value < 0 ? 'error' : 'default' );

		const dynamicClasses = computed( () => ( {
			'cdx-demo-field-with-counter__help-text--error': status.value === 'error'
		} ) );

		return {
			messageText,
			status,
			charsRemaining,
			messages,
			helpText,
			dynamicClasses
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-demo-textarea-field {
	&__help-text {
		display: flex;
		align-items: baseline;
		flex-direction: row no-wrap;
		justify-content: space-between;
		gap: @spacing-100;

		&--error &__counter {
			color: @color-error;
		}
	}
}
</style>

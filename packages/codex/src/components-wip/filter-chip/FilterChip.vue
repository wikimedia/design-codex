<template>
	<div class="cdx-filter-chip" :class="rootClasses">
		<cdx-icon
			v-if="icon"
			:icon="icon"
			size="small"
		/>
		<span class="cdx-filter-chip__text">
			<!-- @slot Chip text. -->
			<slot />
		</span>
		<cdx-button
			class="cdx-filter-chip__button"
			weight="quiet"
			:aria-label="removeButtonLabel"
			:disabled="disabled"
			@click="$emit( 'remove-chip' )"
		>
			<cdx-icon :icon="cdxIconClose" size="x-small" />
		</cdx-button>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue';
import CdxButton from '../../components/button/Button.vue';
import CdxIcon from '../../components/icon/Icon.vue';
import { cdxIconClose, Icon } from '@wikimedia/codex-icons';

/**
 * Interactive chip that can be selected, removed, or generated from an input.
 */
export default defineComponent( {
	name: 'CdxFilterChip',
	components: {
		CdxButton,
		CdxIcon
	},
	props: {
		/**
		 * `aria-label` for the icon-only remove button.
		 *
		 * Text must be provided for accessibility purposes.
		 */
		removeButtonLabel: {
			type: String,
			required: true
		},
		/**
		 * Custom icon.
		 */
		icon: {
			type: [ String, Object ] as PropType<Icon>,
			default: null
		},
		/**
		 * Whether the filter chip can be removed.
		 */
		disabled: {
			type: Boolean,
			default: false
		}
	},
	emits: [
		/**
		 * Emitted when a chip is removed by the user.
		 */
		'remove-chip'
	],
	setup( props ) {
		const rootClasses = computed( () => {
			return {
				'cdx-filter-chip--disabled': props.disabled
			};
		} );

		return {
			rootClasses,
			cdxIconClose
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';
@import ( reference ) '../../themes/mixins/common.less';

// TODO: create a design token.
@min-size-clear-button: 20px;

.cdx-filter-chip {
	background-color: @background-color-interactive-subtle;
	color: @color-base;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	gap: @spacing-25;
	max-width: @size-3200;
	border: @border-width-base @border-style-base @border-color-subtle;
	border-radius: @border-radius-pill;
	padding: 0 0 0 @spacing-50;
	font-size: @font-size-small;
	line-height: @line-height-small;

	&--disabled {
		background-color: @background-color-disabled;
		color: @color-inverted;
		border-color: @border-color-transparent;

		.cdx-icon {
			color: @color-inverted;
		}
	}

	&__text {
		.text-overflow( @param-visible: false );
	}

	// The remove button is small and round, which is not supported within the Button component
	// itself, so the styles are included here.
	&__button {
		min-width: @min-size-clear-button;
		min-height: @min-size-clear-button;
		margin-right: @size-absolute-1;
		border-radius: @border-radius-pill;
		padding-right: @spacing-12;
		padding-left: @spacing-12;
		font-size: @font-size-x-small;
	}
}
</style>

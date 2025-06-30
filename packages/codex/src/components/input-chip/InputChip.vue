<template>
	<div
		ref="rootElement"
		v-tooltip="tooltipContent"
		class="cdx-input-chip"
		:class="rootClasses"
		:tabindex="tabIndex"
		role="option"
		:aria-description="ariaDescription"
		@keydown="onKeydown"
		@click="$emit( 'click-chip' )"
	>
		<cdx-icon
			v-if="icon"
			:icon="icon"
			size="small"
		/>
		<span
			ref="textElement"
			class="cdx-input-chip__text"
		>
			<!-- @slot Chip text. -->
			<slot />
		</span>
		<cdx-button
			class="cdx-input-chip__button"
			weight="quiet"
			tabindex="-1"
			aria-hidden="true"
			:disabled="disabled || readonly"
			@click.stop="$emit( 'remove-chip', 'button' )"
		>
			<cdx-icon :icon="cdxIconClose" size="x-small" />
		</cdx-button>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, PropType, onMounted } from 'vue';
import useSlotContents from '../../composables/useSlotContents';
import CdxButton from '../button/Button.vue';
import CdxIcon from '../icon/Icon.vue';
import useI18n from '../../composables/useI18n';
import { cdxIconClose, Icon } from '@wikimedia/codex-icons';
import CdxTooltip from '../tooltip/Tooltip';

/**
 * Interactive chip used within the ChipInput.
 *
 * This component is not available for public use and should only be used inside ChipInput.
 */
export default defineComponent( {
	name: 'CdxInputChip',
	components: {
		CdxButton,
		CdxIcon
	},
	directives: {
		tooltip: CdxTooltip
	},
	props: {
		/**
		 * Custom icon.
		 */
		icon: {
			type: [ String, Object ] as PropType<Icon>,
			default: null
		},
		/**
		 * Whether the InputChip can be removed.
		 */
		disabled: {
			type: Boolean,
			default: false
		},
		/**
		 * Whether the InputChip is readonly.
		 */
		readonly: {
			type: Boolean,
			default: false
		},
		/**
		 * CSS class for the InputChip.
		 */
		className: {
			type: String,
			default: ''
		}
	},
	// expose is temporarily disabled to work around a Vue / vue-tsc bug, see
	// https://github.com/vuejs/language-tools/issues/5069
	/*
	expose: [
		'focus'
	],
	*/
	emits: [
		/**
		 * Emitted when a chip is removed by the user.
		 *
		 * @property {'button'|'Backspace'|'Delete'} method How the chip was removed
		 */
		'remove-chip',
		/**
		 * Emitted when a chip is clicked by the user.
		 */
		'click-chip',
		/**
		 * Emitted when the user presses the left arrow key.
		 */
		'arrow-left',
		/**
		 * Emitted when the user presses the right arrow key.
		 */
		'arrow-right'
	],
	setup( props, { emit, slots } ) {
		const tabIndex = computed( () => props.disabled ? -1 : 0 );
		const rootElement = ref<HTMLDivElement>();
		const rootClasses = computed( () => ( {
			'cdx-input-chip--disabled': props.disabled,
			'cdx-input-chip--readonly': props.readonly,
			[ props.className ]: props.className.length > 0
		} ) );

		const ariaDescription = useI18n(
			'cdx-input-chip-aria-description',
			'Press Enter to edit or Delete to remove'
		);

		const textElement = ref<HTMLSpanElement>();
		const isMounted = ref( false );
		const tooltipContent = computed( () => {
			if ( !isMounted.value ) {
				return null;
			}

			// Check for content overflow and return slot content for the tooltip
			// if it does overflow
			if (
				textElement.value && textElement.value.scrollWidth > textElement.value.clientWidth
			) {
				return useSlotContents( slots?.default )[ 0 ];
			}

			// No tooltip by default
			return null;
		} );

		onMounted( () => {
			isMounted.value = true;
		} );

		function onKeydown( e: KeyboardEvent ) {
			switch ( e.key ) {
				case 'Enter':
					emit( 'click-chip' );
					e.preventDefault();
					e.stopPropagation();
					break;
				case 'Escape':
					rootElement.value?.blur();
					e.preventDefault();
					e.stopPropagation();
					break;
				case 'Backspace':
				case 'Delete':
					emit( 'remove-chip', e.key );
					e.preventDefault();
					e.stopPropagation();
					break;
				case 'ArrowLeft':
					emit( 'arrow-left' );
					e.preventDefault();
					e.stopPropagation();
					break;
				case 'ArrowRight':
					emit( 'arrow-right' );
					e.preventDefault();
					e.stopPropagation();
					break;
			}
		}

		return {
			rootElement,
			rootClasses,
			ariaDescription,
			onKeydown,
			cdxIconClose,
			tabIndex,
			tooltipContent,
			textElement
		};
	},
	methods: {
		/**
		 * Focus the chip.
		 *
		 * @public
		 */
		focus() {
			( this.$refs.rootElement as HTMLDivElement ).focus();
		}
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';
@import ( reference ) '../../themes/mixins/common.less';

// TODO: create a design token.
@min-size-clear-button: 20px;

.cdx-input-chip {
	background-color: @background-color-interactive-subtle;
	color: @color-base;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	gap: @spacing-12;
	box-sizing: @box-sizing-base;
	max-width: @size-full;
	max-height: @max-height-chip;
	border: @border-width-base @border-style-base @border-color-interactive;
	border-radius: @border-radius-pill;
	padding: 0 @spacing-12 0 @spacing-50;
	font-size: @font-size-small;

	.cdx-icon {
		margin-right: @spacing-12;
	}

	&:not( .cdx-input-chip--disabled ):not( .cdx-input-chip--readonly ) {
		transition-property: @transition-property-base;
		transition-duration: @transition-duration-medium;

		&:hover {
			background-color: @background-color-interactive-subtle--hover;
			border-color: @border-color-interactive--hover;
			cursor: @cursor-base--hover;
		}

		&:focus {
			outline: @outline-base--focus;
		}

		&:active {
			background-color: @background-color-interactive-subtle--active;
			border-color: @border-color-interactive--active;
		}

		&:focus:not( :active ) {
			border-color: @border-color-progressive--focus;
			box-shadow: @box-shadow-inset-small @box-shadow-color-progressive--focus;
		}
	}

	&--readonly {
		background-color: @background-color-neutral-subtle;
		border-color: @border-color-base;

		// Override the button's interactive background color and cursor styles.
		.cdx-input-chip__button.cdx-button {
			&:hover {
				background-color: @background-color-transparent;
				cursor: @cursor-base;
			}

			&:active {
				background-color: @background-color-transparent;
				border-color: @border-color-transparent;
			}

			&:focus:not( :active ) {
				border-color: @border-color-transparent;
				box-shadow: none;
			}
		}
	}

	&--disabled {
		background-color: @background-color-disabled;
		color: @color-disabled-emphasized;
		border-color: @border-color-transparent;

		.cdx-icon {
			color: @color-disabled-emphasized;
		}
	}

	&__text {
		.text-overflow( @param-visible: false );
	}

	// The remove button is small and round, which is not supported within the Button component
	// itself, so the styles are included here.
	/* stylelint-disable-next-line no-descending-specificity */
	&__button.cdx-button {
		min-width: @min-size-clear-button;
		min-height: @min-size-clear-button;
		margin-right: @size-absolute-1;
		border-radius: @border-radius-pill;
		padding-right: @spacing-12;
		padding-left: @spacing-12;
		font-size: @font-size-small;
	}
}
</style>

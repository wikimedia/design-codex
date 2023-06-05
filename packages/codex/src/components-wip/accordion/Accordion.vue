<template>
	<div
		class="cdx-accordion"
		:class="rootClasses"
	>
		<component
			:is="headingLevel"
			class="cdx-accordion__header"
		>
			<cdx-button
				:aria-expanded="isExpanded"
				:aria-hidden="true"
				tabindex="-1"
				class="cdx-accordion__toggle"
				:disabled="disabled"
				type="button"
				weight="quiet"
				@click="toggle"
			>
				<cdx-icon
					class="cdx-accordion__toggle__icon"
					:icon="cdxIconExpand"
					size="small"
				/>
				<span class="cdx-accordion__toggle__text">
					<!-- @slot Customizable Accordion title -->
					<slot name="title" />
				</span>
			</cdx-button>
			<cdx-button
				v-if="shouldShowActionButton"
				class="cdx-accordion__action"
				:aria-label="actionButtonLabel"
				:disabled="disabled"
				type="button"
				weight="quiet"
				@click="emitActionButtonClick"
			>
				<cdx-icon
					:icon="actionIcon"
					:icon-label="actionButtonLabel"
					size="medium"
				/>
			</cdx-button>
		</component>
		<div v-if="isExpanded" class="cdx-accordion__content">
			<!-- @slot Customizable Accordion content -->
			<slot />
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue';
import CdxIcon from '../../components/icon/Icon.vue';
import CdxButton from '../../components/button/Button.vue';
import { cdxIconExpand, Icon } from '@wikimedia/codex-icons';
import { HeadingLevel } from '../../types';

/**
 * A vertical item with hidden content.
 */
export default defineComponent( {
	name: 'CdxAccordion',
	components: { CdxButton, CdxIcon },
	props: {
		/**
		 * The icon that will be displayed on the right side of the accordion header when expanded.
		 *
		 */
		actionIcon: {
			type: [ String, Object ] as PropType<Icon>,
			default: null
		},

		/**
		 * Label for the action button. If an action icon is being used, then a label for that icon
		 * should be provided for ARIA support.
		 */
		actionButtonLabel: {
			type: String,
			default: ''
		},

		/**
		 * Disables the accordion.
		 *
		 * @values 'true', 'false'
		 */
		disabled: {
			type: Boolean,
			default: false
		},
		/**
		 * The heading level of the accordion title.
		 *
		 * @values 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'
		 */
		headingLevel: {
			type: String as PropType<HeadingLevel>,
			default: 'h3'
		},
		/**
		 * Forces the accordion to show the action icon.
		 *
		 * @values 'true', 'false'
		 */
		iconAlwaysVisible: {
			type: Boolean,
			default: false
		}
	},
	emits: [
		/**
		 * When the action button is clicked.
		 *
		 */
		'action-button-click'
	],
	setup( props, { emit } ) {
		const isExpanded = ref( false );

		const toggle = (): void => {
			isExpanded.value = !isExpanded.value;
		};

		const emitActionButtonClick = (): void => {
			emit( 'action-button-click' );
		};

		const shouldShowActionButton = computed( () => {
			return props.actionIcon && ( isExpanded.value || props.iconAlwaysVisible );
		} );

		const rootClasses = computed( () => ( {
			'cdx-accordion--disabled': props.disabled
		} ) );

		return {
			cdxIconExpand,
			isExpanded,
			toggle,
			emitActionButtonClick,
			rootClasses,
			shouldShowActionButton
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-accordion {
	position: relative;

	&--disabled {
		color: @color-disabled;
		cursor: @cursor-base--disabled;
	}

	&::after {
		content: '';
		background-color: @border-color-subtle;
		opacity: @opacity-base;
		position: absolute;
		right: 0;
		left: 0;
		z-index: @z-index-base;
		height: @size-absolute-1;
	}

	// Add specificity to override heading styles
	& &__header {
		position: relative;
		margin-top: 0;
		margin-bottom: 0;
		border-top: 0;
		padding-top: 0;
		padding-bottom: 0;
		font-size: @font-size-small;
		transition-property: @transition-property-base;
		transition-duration: @transition-duration-medium;
		transition-timing-function: @transition-timing-function-system;

		&:focus {
			position: relative;
			z-index: @z-index-stacking-2;
			outline: @border-style-base @border-width-thick @color-progressive--focus;
		}

		&:hover {
			background-color: @background-color-interactive;
			cursor: @cursor-base--hover;
		}

		&:focus:not( :focus-visible ) {
			outline: @outline-base--focus;
		}
	}

	&__content {
		padding: @spacing-75;
		font-size: @font-size-small;
	}

	&__toggle {
		display: flex;
		align-items: center;
		flex-grow: 1;
		flex-basis: 0;
		gap: @spacing-75;
		width: @size-full;
		max-width: unset;
		padding: @spacing-75;
		line-height: @line-height-small;

		&__icon {
			transition-property: @transition-property-toggle-switch-grip;
			transition-duration: @transition-duration-medium;
			transition-timing-function: @transition-timing-function-system;
		}

		&[ aria-expanded='true' ] &__icon {
			transform: rotate( -180deg );
		}
	}

	// Add specificity to override button styles
	& &__action {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: @z-index-stacking-3;
		padding: 0 @spacing-75;
	}
}
</style>

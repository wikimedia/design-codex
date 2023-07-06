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
				:id="accordionId"
				:aria-disabled="disabled"
				:aria-expanded="isExpanded"
				:aria-controls="accordionPanelId"
				class="cdx-accordion__toggle"
				:disabled="disabled"
				type="button"
				weight="quiet"
				@click="toggle"
			>
				<span class="cdx-accordion__toggle__title">
					<cdx-icon
						class="cdx-accordion__toggle__title-icon"
						:icon="cdxIconExpand"
						size="small"
					/>
					<span class="cdx-accordion__toggle__title-text">
						<!-- @slot Customizable Accordion title -->
						<slot name="title" />
					</span>
				</span>
				<span class="cdx-accordion__toggle__description">
					<!-- @slot Customizable Accordion description -->
					<slot name="description" />
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
		<div
			v-show="isExpanded"
			:id="accordionPanelId"
			:aria-labelledby="accordionId"
			:aria-hidden="isExpanded ? undefined : true"
			class="cdx-accordion__content"
			role="region"
		>
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
import useGeneratedId from '../../composables/useGeneratedId';
/**
 * A vertical item with hidden content.
 */
export default defineComponent( {
	name: 'CdxAccordion',
	components: { CdxButton, CdxIcon },
	props: {
		/**
		 * Forces the accordion to show the action icon.
		 *
		 * @values 'true', 'false'
		 */
		actionAlwaysVisible: {
			type: Boolean,
			default: false
		},

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
		const accordionId = useGeneratedId( 'accordion' );
		const accordionPanelId = useGeneratedId( 'accordion-panel' );

		const toggle = (): void => {
			isExpanded.value = !isExpanded.value;
		};

		const emitActionButtonClick = (): void => {
			emit( 'action-button-click' );
		};

		const shouldShowActionButton = computed( () => {
			return props.actionIcon && ( isExpanded.value || props.actionAlwaysVisible );
		} );

		const rootClasses = computed( () => ( {
			'cdx-accordion--disabled': props.disabled,
			'cdx-accordion--has-icon': shouldShowActionButton
		} ) );

		return {
			cdxIconExpand,
			emitActionButtonClick,
			isExpanded,
			rootClasses,
			shouldShowActionButton,
			toggle,
			accordionId,
			accordionPanelId
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-accordion {
	position: relative;

	&::after {
		content: '';
		background-color: @border-color-subtle;
		opacity: @opacity-base;
		position: absolute;
		right: 0;
		left: 0;
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
		transition-property: @transition-property-base;
		transition-duration: @transition-duration-medium;
		transition-timing-function: @transition-timing-function-system;

		&:focus {
			position: relative;
			outline: @border-style-base @border-width-thick @color-progressive--focus;
		}

		&:focus:not( :focus-visible ) {
			outline: @outline-base--focus;
		}
	}

	/* stylelint-disable-next-line selector-not-notation */
	&:not( &--disabled ) &__header:hover {
		background-color: @background-color-interactive;
		cursor: @cursor-base--hover;
	}

	&__content {
		padding: @spacing-50 @spacing-75 @spacing-75;
		font-size: @font-size-base;
	}

	&__toggle {
		width: @size-full;
		max-width: unset;
		padding: @spacing-75;
		font-size: @font-size-base;
		word-break: break-word;
		text-align: left;
		white-space: normal;

		&__title {
			display: flex;
			gap: @spacing-50;
			line-height: @line-height-xx-small;
			pointer-events: none;

			&-icon {
				// Make the icon as tall as the text, so that its vertical centering causes
				// it to be aligned with the text
				height: unit( @line-height-xx-small, em );
				transition-property: @transition-property-toggle-switch-grip;
				transition-duration: @transition-duration-medium;
				transition-timing-function: @transition-timing-function-system;
			}
		}

		&__description {
			color: @color-subtle;
			display: flex;
			padding-left: @spacing-150;
			font-weight: @font-weight-normal;
			line-height: @line-height-xx-small;
			pointer-events: none;
		}

		&[ aria-expanded='true' ] .cdx-accordion__toggle__title-icon {
			transform: rotate( -180deg );
		}
	}

	&--has-icon &__toggle__title-text {
		// The width of the icon, plus @spacing-35 for the left padding+border on
		// the button, plus @spacing-50 of buffer space between the text and the button
		padding-right: calc( @size-icon-medium + @spacing-35 + @spacing-50 );
	}

	&__action {
		display: flex;
		align-items: center;
		position: absolute;
		top: 0;
		right: 0;
		// Align the icon with the text by making it as tall as the text, plus 2 times the distance
		// between the edge of the button and the text (which is @spacing-75 for the padding and
		// @border-width-base for the button border)
		height: calc( unit( @line-height-xx-small, em ) + 2*@spacing-75 + 2*@border-width-base );
		padding-right: @spacing-75;
		padding-left: @spacing-75;
		// Set the font-size so that the em-based height calculation above works correctly
		font-size: @font-size-base;

		&:hover {
			background-color: unset;
		}
	}

	// Specifically target toggle__description to override its color style
	&--disabled,
	&--disabled &__toggle__description {
		color: @color-disabled;
		cursor: @cursor-base--disabled;
	}
}
</style>

<template>
	<details
		class="cdx-accordion"
		:class="rootClasses"
		:open="computedOpen || undefined"
		@toggle="onToggle"
	>
		<summary>
			<component
				:is="headingLevel"
				class="cdx-accordion__header"
			>
				<span class="cdx-accordion__header__title">
					<!-- @slot Customizable Accordion title-->
					<slot name="title" />
				</span>
				<span class="cdx-accordion__header__description">
					<!-- @slot Customizable Accordion description-->
					<slot name="description" />
				</span>
			</component>
			<cdx-button
				v-if="shouldShowActionButton"
				class="cdx-accordion__action"
				:aria-label="actionButtonLabel"
				type="button"
				weight="quiet"
				@click.stop="emitActionButtonClick"
			>
				<cdx-icon
					:icon="actionIcon"
					:icon-label="actionButtonLabel"
					size="medium"
				/>
			</cdx-button>
		</summary>

		<div class="cdx-accordion__content" @click.stop>
			<!-- @slot Customizable Accordion content -->
			<slot />
		</div>
	</details>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref, toRef } from 'vue';
import CdxIcon from '../icon/Icon.vue';
import CdxButton from '../button/Button.vue';
import { Icon } from '@wikimedia/codex-icons';
import { AccordionSeparation, HeadingLevel } from '../../types';
import useOptionalModelWrapper from '../../composables/useOptionalModelWrapper';
import { makeStringTypeValidator } from '../../utils/stringTypeValidator';
import { AccordionSeparations } from '../../constants';

const separationValidator = makeStringTypeValidator( AccordionSeparations );

/**
 * An item that contains an expandable and collapsible section of content.
 */
export default defineComponent( {
	name: 'CdxAccordion',
	components: { CdxButton, CdxIcon },
	props: {
		/**
		 * This component accepts an optional v-model binding; use it if you
		 * want to programmatically control the Accordion's open/closed state.
		 * If this feature is not needed, you can omit `v-model` and just use
		 * the "open" attribute if you want the component to render in the
		 * expanded state.
		 */
		modelValue: {
			type: [ Boolean, null ],
			default: null
		},

		/**
		 * Forces the accordion to show the action icon.
		 */
		actionAlwaysVisible: {
			type: Boolean,
			default: false
		},

		/**
		 * Sets the visual style and sometimes size of the accordion.
		 *
		 * - 'none': no divider or outline, size scales with header content.
		 * - 'minimal': no divider or outline, fixed small size.
		 * - 'divider': divider line between mmultiple accordions, size scales with header content.
		 * - 'outline': border around entire accordion, size scales with header content.
		 *
		 * @values 'none', 'minimal', 'divider', 'outline'
		 */
		separation: {
			type: String as PropType<AccordionSeparation>,
			default: 'divider',
			validator: separationValidator
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
		'action-button-click',

		/**
		 * When the "open" state changes. Only emitted if v-model binding
		 * is used in the parent scope.
		 *
		 * @param {boolean} newVal
		 */
		'update:modelValue',

		/**
		 * When the Accordion is toggled open or closed. Always emitted
		 * regardless of v-model binding.
		 *
		 * @param {boolean} isOpen
		 */
		'toggle'
	],
	setup( props, { attrs, emit } ) {
		const internalOpen = ref<boolean>( 'open' in attrs );
		const computedOpen = useOptionalModelWrapper(
			internalOpen,
			toRef( props, 'modelValue' ),
			emit
		);

		const emitActionButtonClick = (): void => {
			emit( 'action-button-click' );
		};

		const onToggle = ( e: ToggleEvent ): void => {
			computedOpen.value = e.newState === 'open';
			emit( 'toggle', computedOpen.value );
		};

		const shouldShowActionButton = computed( () => {
			if ( props.actionIcon ) {
				if ( computedOpen.value ) {
					return true;
				} else if ( props.actionAlwaysVisible ) {
					return true;
				} else {
					return false;
				}
			} else {
				return false;
			}
		} );

		const rootClasses = computed( () => ( {
			'cdx-accordion--has-icon': shouldShowActionButton.value,
			[ `cdx-accordion--separation-${ props.separation }` ]: true,
		} ) );

		return {
			emitActionButtonClick,
			rootClasses,
			shouldShowActionButton,
			onToggle,
			computedOpen
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';
@import ( reference ) '../../themes/mixins/public/css-icon.less';
@import ( reference ) '../../themes/mixins/public/typography.less';

.cdx-accordion {
	margin: @size-6;
	overflow: hidden;

	& + & {
		// This avoids having a 1px gap between accordions due to the default margin,
		// or a double border between two outlined accordions
		margin-top: calc( @spacing-6 * -1 );
		border-top: @border-subtle;
	}

	// The `<summary>` element is always visible.
	& > summary {
		background-color: @background-color-transparent;
		list-style: none; // disable the built-in indicator icon since we're providing our own
		display: flex;
		gap: @spacing-50;
		border-radius: @border-radius-sharp;
		padding: @spacing-75;
		word-break: break-word;
		white-space: normal;
		transition-property: @transition-property-base;
		transition-duration: @transition-duration-medium;
		transition-timing-function: @transition-timing-function-system;

		&:hover {
			background-color: @background-color-interactive-subtle--hover;
			cursor: @cursor-base--hover;
		}

		&:active {
			background-color: @background-color-interactive-subtle--active;
		}

		&:focus {
			outline: @outline-base--focus;
		}

		/* stylelint-disable-next-line plugin/no-unsupported-browser-features */
		&:focus-visible {
			border-color: @border-color-progressive--focus;
			box-shadow: @box-shadow-inset-small @box-shadow-color-progressive--focus;
		}

		// Support: Firefox <= 84, Chrome <= 85, Edge <= 85, Safari <= 15.3.
		@supports not selector( :focus-visible ) {
			&:focus {
				border-color: @border-color-progressive--focus;
				box-shadow: @box-shadow-inset-small @box-shadow-color-progressive--focus;
			}
		}

		// Most browsers remove the default indicator triangle icon when
		// list-style is set to none on the `<summary>` element. But WebKit requires
		// this vendor-specific override as well. We are providing our own Codex
		// Icon instead of the browser-supplied default for this purpose.
		&::-webkit-details-marker {
			display: none;
		}
	}

	// Add specificity to override heading styles.
	& &__header {
		flex-grow: 1;
		margin-top: 0;
		margin-bottom: 0;
		border-top: 0;
		padding-top: 0;
		padding-bottom: 0;
		// Hack to reset font-size to the default for the heading level.
		// TODO: Decide if we set custom heading levels all the to the same size out of box.
		font-size: @font-size-medium;

		&__title {
			display: block;
			line-height: @line-height-small;
		}

		&__description {
			color: @color-subtle;
			display: block;
			font-weight: @font-weight-normal;
			line-height: @line-height-small;
			pointer-events: none;
		}
	}

	&__action.cdx-button {
		align-self: flex-start;
		flex-shrink: 0;
		margin-top: -@spacing-12;
		margin-bottom: -@spacing-12;

		&:hover {
			background-color: unset;
		}

		svg {
			pointer-events: none;
		}
	}

	&__content {
		padding: @spacing-50 @spacing-75 @spacing-75;
		.cdx-mixin-body-text();
	}

	// Indicator icon
	& > summary::before {
		content: '';
		.cdx-mixin-css-icon( @cdx-icon-expand, @param-size-icon: @size-icon-small );
		// Ensure icon doesn't shrink if text is especially long and/or in large font size
		flex-shrink: 0;
		// Setting the height of the icon to the line-height of the accompanying text
		// to ensure centering of the icon to text
		height: @line-height-small;
		transition-property: @transition-property-toggle-switch-grip;
		transition-duration: @transition-duration-medium;
		transition-timing-function: @transition-timing-function-system;
	}

	&[ open ] > summary::before {
		transform: rotate( -180deg );
	}

	// No separator
	& + &--separation-none,
	& + &--separation-minimal {
		margin-top: 0;
		border-top: @border-transparent;
	}

	// Outline
	&--separation-outline {
		margin: 0;
		border: @border-subtle;
		border-radius: @border-radius-base;
		border-bottom-left-radius: @border-radius-sharp;
		border-bottom-right-radius: @border-radius-sharp;
	}

	& + &--separation-outline {
		border-radius: @border-radius-sharp;
	}

	// The last accordion in a group (an accordion not followed by another accordion)
	// For older browsers that don't support :has(), fall back to :last-child.
	// This won't catch all cases, but it will catch some
	/* stylelint-disable-next-line plugin/no-unsupported-browser-features */
	&--separation-outline:not( :has( + & ) ),
	& + &--separation-outline:last-child {
		border-bottom-left-radius: @border-radius-base;
		border-bottom-right-radius: @border-radius-base;
	}

	// Minimal
	&--separation-minimal {
		> summary {
			padding: @spacing-35 0;

			&:hover {
				background-color: @background-color-transparent;
				color: @color-progressive--hover;
				cursor: @cursor-base--hover;

				&::before {
					background-color: @color-progressive--hover;
				}
			}

			&:active {
				background-color: @background-color-transparent;
				color: @color-progressive--active;

				&::before {
					background-color: @color-progressive--active;
				}
			}
		}
	}

	&--separation-minimal &__action.cdx-button {
		padding-right: @spacing-35;
		padding-left: @spacing-35;
	}

	&--separation-minimal &__content {
		padding: 0;
	}
}
</style>

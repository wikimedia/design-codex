<template>
	<details
		class="cdx-accordion"
		:class="rootClasses"
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
import { computed, defineComponent, PropType, ref } from 'vue';
import CdxIcon from '../../components/icon/Icon.vue';
import CdxButton from '../../components/button/Button.vue';
import { Icon } from '@wikimedia/codex-icons';
import { HeadingLevel } from '../../types';

/**
 * An item that contains an expandable and collapsible section of content.
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
	setup( props, { attrs, emit } ) {
		const isExpanded = ref<boolean>( 'open' in attrs );

		const emitActionButtonClick = (): void => {
			emit( 'action-button-click' );
		};

		const onToggle = ( e: ToggleEvent ): void => {
			isExpanded.value = e.newState === 'open';
		};

		const shouldShowActionButton = computed( () => {
			return props.actionIcon && ( isExpanded.value || props.actionAlwaysVisible );
		} );

		const rootClasses = computed( () => ( {
			'cdx-accordion--has-icon': shouldShowActionButton.value
		} ) );

		return {
			emitActionButtonClick,
			rootClasses,
			shouldShowActionButton,
			onToggle
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';
@import ( reference ) '../../themes/mixins/public/css-icon.less';

.cdx-accordion {
	position: relative;
	border-bottom: @border-subtle;

	// The summary element is always visible
	& > summary {
		background-color: @background-color-transparent;
		list-style: none; // disable the built-in indicator icon since we're providing our own
		display: flex;
		gap: @spacing-50;
		border-width: @border-width-base;
		border-style: @border-style-base;
		border-color: @border-color-transparent;
		border-radius: @border-radius-sharp;
		padding: @spacing-75;
		word-break: break-word;
		white-space: normal;
		transition-property: @transition-property-base;
		transition-duration: @transition-duration-medium;
		transition-timing-function: @transition-timing-function-system;

		&:hover {
			background-color: @background-color-interactive-subtle;
			cursor: @cursor-base--hover;
		}

		&:active {
			background-color: @background-color-interactive;
		}

		&:focus-visible {
			box-shadow: @box-shadow-inset-medium @border-color-progressive;
			outline: @outline-base--focus;
		}

		&:focus:not( :active ) {
			border-color: @border-color-progressive--focus;
			box-shadow: @box-shadow-inset-small @box-shadow-color-progressive--focus;
		}

		// Most browsers remove the default indicator triangle icon when
		// list-style is set to none on the summary element. But webkit requires
		// this vendor-specific override as well. We are providing our own Codex
		// Icon instead of the browser-supplied default for this purpose.
		&::-webkit-details-marker {
			display: none;
		}
	}

	// Add specificity to override heading styles.
	& &__header {
		position: relative;
		margin-top: 0;
		margin-bottom: 0;
		border-top: 0;
		padding-top: 0;
		padding-bottom: 0;
		// Hack to reset font-size to the default for the heading level.
		// TODO: Decide if we set custom heading levels all the to the same size out of box.
		font-size: @font-size-medium;

		&__title {
			display: flex;
			gap: @spacing-50;
			line-height: @line-height-xx-small;
		}

		&__description {
			color: @color-subtle;
			display: flex;
			font-weight: @font-weight-normal;
			line-height: @line-height-xx-small;
			pointer-events: none;
		}
	}

	&__action.cdx-button {
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
		font-size: @font-size-medium;

		&:hover {
			background-color: unset;
		}
	}

	&__content {
		padding: @spacing-50 @spacing-75 @spacing-75;
		font-size: @font-size-medium;
	}

	// Indicator icon
	& > summary::before {
		content: '';
		.cdx-mixin-css-icon( @cdx-icon-expand, @param-size-icon: @size-icon-small );
		height: unit( @line-height-xx-small, em );
		transition-property: @transition-property-toggle-switch-grip;
		transition-duration: @transition-duration-medium;
		transition-timing-function: @transition-timing-function-system;
	}

	&[ open ] > summary::before {
		transform: rotate( -180deg );
	}
}
</style>

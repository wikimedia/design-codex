<template>
	<button
		class="cdx-toggle-button"
		:class="rootClasses"
		:aria-pressed="modelValue"
		:disabled="disabled"
		@mousedown.prevent
		@click="onClick"
	>
		<!-- @slot Button content -->
		<slot />
	</button>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

/**
 * A toggle button wrapping slotted content.
 *
 * You should always include some content to display on the button via the default slot.
 *
 * The `v-model` value will be a boolean, it is `true` if the button is currently toggled ("on")
 * and `false` otherwise (button is "off").
 */
export default defineComponent( {
	name: 'CdxToggleButton',
	props: {
		/**
		 * Whether the button should be set to "on" (true) or "off" (false).
		 *
		 * Provided by `v-model` binding in the parent component.
		 */
		modelValue: {
			type: Boolean,
			default: false
		},
		/**
		 * Whether the disabled attribute should be added to the button, which prevents
		 * it from being clicked.
		 */
		disabled: {
			type: Boolean,
			default: false
		}
	},
	emits: [
		/**
		 * Emitted when modelValue changes (i.e. when the state is toggled)
		 *
		 * @property {boolean} modelValue The new model value
		 */
		'update:modelValue'
	],
	setup( props, { emit } ) {
		const rootClasses = computed( () => ( {
			// Provide --toggled-off too so that we can simplify selectors
			'cdx-toggle-button--toggled-on': props.modelValue,
			'cdx-toggle-button--toggled-off': !props.modelValue
		} ) );

		const onClick = (): void => {
			emit( 'update:modelValue', !props.modelValue );
		};

		return {
			rootClasses,
			onClick
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/dist/theme-wikimedia-ui.less';
@import './../../themes/mixins/button.less';

// Same as OOUI
// TODO add this to wikimedia-ui tokens instead
@background-color-filled--active--disabled: mix(
	@color-primary--active,
	@background-color-filled--disabled,
	35%
);

.cdx-toggle-button {
	// mixin for common base styles for buttons
	.cdx-mixin-button();

	&:enabled {
		background-color: @background-color-framed;
		color: @color-base;
		border-color: @border-color-base;

		// Use hand cursor. This is non-standard for a button but allows for a visible
		// interactivity distinction from the disabled state.
		cursor: @cursor-pointer;

		&:focus {
			border-color: @color-primary--focus;
			box-shadow: @box-shadow-base--focus;
			// In Windows high contrast mode the outline becomes visible.
			outline: @outline-base--focus;
		}

		&:hover {
			background-color: @background-color-framed--hover;
			color: @color-base--hover;
		}

		&:active {
			background-color: @background-color-framed--active;
			color: @color-base--active;
			border-color: @border-color-base--active;
			box-shadow: none;
		}
	}

	/* stylelint-disable-next-line no-descending-specificity */
	&:disabled {
		background-color: @background-color-filled--disabled;
		color: @color-filled--disabled;
		border-color: @border-color-base--disabled;
	}

	&--toggled-on:disabled {
		background-color: @background-color-filled--active--disabled;
	}

	&--toggled-on:enabled {
		background-color: @color-primary--active;
		color: @color-base--inverted;
		border-color: @border-color-primary--active;

		&:focus {
			border-color: @border-color-primary--focus;
			box-shadow: @box-shadow-primary--focus;
		}

		&:hover {
			// Same as not hovering, needed to override the rule of hovering over all
			// non-disabled instances set above.
			background-color: @color-primary--active;
			color: @color-base--inverted;
		}
	}

	.cdx-icon {
		/*
		Any icons used in the toggle button content should have the same color as the
		rest of the content. This overrides the color rule in Icon.vue.
		*/
		color: inherit;
	}
}
</style>

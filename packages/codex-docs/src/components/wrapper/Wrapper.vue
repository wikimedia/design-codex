<template>
	<div class="cdx-demo-wrapper" :class="rootClasses">
		<!--
			Note :key="dir" below is needed to ensure that icons and other things that use
			useComputedDirection rerender when the direction is changed
		-->
		<div
			:key="dir"
			class="cdx-demo-wrapper__demo-pane"
			:dir="dir"
		>
			<cdx-button
				v-if="includeReset"
				class="cdx-demo-wrapper__demo-pane__reset-button"
				type="quiet"
				@click="onReset"
			>
				Reset
			</cdx-button>
			<div class="cdx-demo-wrapper__demo-pane__demo">
				<!-- The key is used to allow resetting the component -->
				<slot
					:key="demoRenderKey"
					name="demo"
					:prop-values="propValues"
					:slot-values="slotValues"
				/>
			</div>
			<cdx-button
				v-if="hasCodeSample"
				class="cdx-demo-wrapper__demo-pane__code-toggle"
				type="quiet"
				@click="onClick"
			>
				{{ buttonLabel }}
			</cdx-button>
		</div>
		<div
			v-if="hasCodeSample"
			v-show="showCode"
			class="cdx-demo-wrapper__code"
		>
			<slot name="code" />
		</div>
		<div v-if="hasControls" class="cdx-demo-wrapper__controls">
			<cdx-docs-controls
				dir="ltr"
				:controls-with-values="controlsWithValues"
				@control-change="handleControlChange"
			/>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, computed, inject, PropType } from 'vue';
import { ControlsConfig, ControlConfigWithValue, PropValues, SlotValues } from '../../types';
import { DirectionKey } from '../../constants';
import CdxDocsControls from '../controls/Controls.vue';
import { CdxButton } from '@wikimedia/codex';

/**
 * Wrapper for component demos.
 *
 * Includes:
 *  - Formatting for the demo itself
 *  - Show/hide code button and functionality
 *  - Optional controls for configurable demos
 */
export default defineComponent( {
	name: 'CdxDemoWrapper',
	components: { CdxDocsControls, CdxButton },
	props: {
		/**
		 * Data for configurable props and slots.
		 */
		controlsConfig: {
			type: Array as PropType<ControlsConfig>,
			default: () => {
				return [];
			}
		},
		/**
		 * Whether to include a reset option even when there are no configurable properties
		 * and slots. This is intended for components with internal states like an
		 * indeterminate Checkbox or a dismissable Message, where even when there are
		 * no configuration options it should still be possible to reset to restore the
		 * original state. If the user can easily restore the original state (eg clicking
		 * a toggle again or clearing their input) a reset button is unneeded.
		 */
		forceReset: {
			type: Boolean,
			default: false
		}
	},
	setup( props, { slots } ) {
		// Inject direction from CustomLayout.vue
		const dir = inject( DirectionKey );

		// Set up show code/hide code button.
		const hasCodeSample = slots && slots.code;
		const showCode = ref( false );
		const buttonLabel = computed( () => {
			return showCode.value === true ? 'Hide code' : 'Show code';
		} );
		const onClick = (): void => {
			showCode.value = !showCode.value;
		};

		// Set up controls if config is provided.
		const hasControls = ref( props.controlsConfig.length > 0 );

		// Set up reset button if configuration is provided, or if the demo wants to
		// show the button anyway
		const includeReset = computed( () => {
			return hasControls.value || props.forceReset;
		} );

		const rootClasses = computed( () => {
			return {
				'cdx-demo-wrapper--has-controls': hasControls.value,
				'cdx-demo-wrapper--has-reset': includeReset.value
			};
		} );

		/**
		 * Create a map of the defaults to use for resetting. Because the default values
		 * of some of the types can be undefined, which cannot be used as the
		 * actual value of the object, when filling in missing defaults they are saved
		 * as the "value" of the objects to simplify typescript handling. The default
		 * value is used as the initial value, and will be either the provided default or
		 * an appropriate default based on the control type.
		 */
		const defaultControlValues = props.controlsConfig.map(
			( config ) : ControlConfigWithValue => {
				switch ( config.type ) {
					case 'radio':
						return { ...config, value: config.default ?? config.options[ 0 ] };
					case 'boolean':
						return { ...config, value: config.default ?? false };
					case 'slot':
						return { ...config, value: config.default };
					case 'text':
					default:
						return { ...config, value: config.default ?? '' };
				}
			}
		);

		/**
		 * Start off the values based on the defaults, making a copy of the default
		 * objects so that they can be used to reset.
		 */
		const controlsWithValues = reactive( defaultControlValues.map(
			( config ) : ControlConfigWithValue => {
				return { ...config };
			}
		) );

		/**
		 * Store new control value so it can be passed back into the controls
		 * and to the component via the demo slot.
		 *
		 * @param name The prop or slot name
		 * @param value The new value
		 */
		const handleControlChange = ( name: string, value: string | number | boolean ) => {
			const control = controlsWithValues.find( ( c ) => c.name === name );
			if ( control ) {
				control.value = value;
			}
		};

		/**
		 * Pull out prop values so we can pass them to the scoped slot, for use in component demos.
		 * It will be easier to write a demo if the props and slots are separated.
		 */
		const propValues = computed( () => {
			const constructedPropValues = {} as PropValues;
			for ( const control of controlsWithValues ) {
				if ( control.type !== 'slot' ) {
					constructedPropValues[ control.name ] = control.value;
				}
			}
			return constructedPropValues;
		} );

		/**
		 * Pull out slot values for the same reason.
		 */
		const slotValues = computed( () => {
			const constructedSlotValues = {} as SlotValues;
			for ( const control of controlsWithValues ) {
				if ( control.type === 'slot' ) {
					constructedSlotValues[ control.name ] = control.value;
				}
			}
			return constructedSlotValues;
		} );

		// Allow resetting the display, which forces the component to rerender with
		// its initial state
		const demoRenderKey = ref( 1 );
		const onReset = (): void => {
			demoRenderKey.value++;
			for ( const control of controlsWithValues ) {
				const defaultControl = defaultControlValues.find(
					( c ) => c.name === control.name
				);
				// should always exist, but satisfy typescript checks
				if ( defaultControl ) {
					control.value = defaultControl.value;
				}
			}
		};

		return {
			dir,
			hasCodeSample,
			showCode,
			buttonLabel,
			onClick,
			hasControls,
			rootClasses,
			controlsWithValues,
			propValues,
			slotValues,
			handleControlChange,
			includeReset,
			onReset,
			demoRenderKey
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/dist/theme-wikimedia-ui.less';

// TODO: Tokenize. Also in use in TypeaheadSearch.
@border-color-heading: @color-base70;

.cdx-demo-wrapper {
	margin-top: 16px;

	&__demo-pane {
		position: relative;
		border: @border-width-base @border-style-base @border-color-heading;
		border-radius: @border-radius-base;
		padding: 24px;

		&__reset-button {
			position: absolute;
			top: 0;
			right: 0;
			font-size: 0.875em;
		}

		&__code-toggle {
			position: absolute;
			right: 0;
			bottom: 0;
			font-size: 0.875em;
		}

		// TODO: We need to unset all global styles inside this element to keep them from
		// polluting component demos. For now, manually undo styles that are causing issues.
		a {
			color: inherit;

			&:hover {
				text-decoration: none;
			}
		}
	}

	// Add some space above the component demo to ensure that it does not collide with the
	// reset button, if there is such a button included
	&--has-reset &__demo-pane__demo {
		margin-top: 16px;
	}

	// Add some space below the component demo to ensure it never collides with the show code/hide
	// code button. Right now this doesn't apply for configurable demos, since that button is
	// hidden, but if we ever add dynamic code samples to configurable demos, we should apply
	// this margin to the demo always.
	&:not( .cdx-demo-wrapper--has-controls ) .cdx-demo-wrapper__demo-pane__demo {
		margin-bottom: 16px;
	}

	// Code output underneath component with code language class, for example `language-vue`.
	&__code [ class*='language-' ] {
		margin-top: 0;
		border-top-left-radius: 0;
		border-top-right-radius: 0;
	}
}
</style>

<template>
	<div class="cdx-docs-wrapper">
		<!--
			Note :key="dir" below is needed to ensure that icons and other things that use
			useComputedDirection rerender when the direction is changed
		-->
		<div
			:key="dir"
			class="cdx-docs-wrapper__demo-pane"
			:dir="dir"
		>
			<div class="cdx-docs-wrapper__demo-pane__demo">
				<slot
					name="demo"
					:prop-values="propValues"
					:slot-values="slotValues"
				/>
			</div>
			<cdx-button
				v-if="hasCodeSample"
				class="cdx-docs-wrapper__demo-pane__button"
				type="quiet"
				@click="onClick"
			>
				{{ buttonLabel }}
			</cdx-button>
		</div>
		<div
			v-if="hasCodeSample"
			v-show="showCode"
			class="cdx-docs-wrapper__code"
		>
			<slot name="code" />
		</div>
		<div v-if="hasControls" class="cdx-docs-wrapper__controls">
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
	name: 'CdxDocsWrapper',
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
		const hasControls = props.controlsConfig.length > 0;

		/**
		 * Create a copy of the controls config and add a value property to each control. The
		 * initial value will either be the provided default or an  appropriate default based on
		 * the control type.
		 */
		const controlsWithValues = reactive( props.controlsConfig.map(
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

		return {
			dir,
			hasCodeSample,
			showCode,
			buttonLabel,
			onClick,
			hasControls,
			controlsWithValues,
			propValues,
			slotValues,
			handleControlChange
		};
	}
} );
</script>

<style lang="less">
// TODO: Remove references to wikimedia-ui-base once we have the proper tokens in place.
@import 'wikimedia-ui-base/wikimedia-ui-base.less';

.cdx-docs-wrapper {
	margin-top: 16px;

	&__demo-pane {
		position: relative;
		border: @border-width-base @border-style-base @border-color-heading;
		border-radius: @border-radius-base;
		padding: 24px;

		&__demo {
			margin-bottom: 16px;
		}

		&__button {
			position: absolute;
			right: 0;
			bottom: 0;
			font-size: 0.875em;
		}

		// TODO: We need to unset all global styles inside this element to keep them from
		// polluting component demos. For now, manually undo styles that are causing issues.
		a:hover {
			text-decoration: none;
		}
	}

	&__code div[ class*='language-' ] {
		margin-top: 0;
		border-top-left-radius: 0;
		border-top-right-radius: 0;
	}
}
</style>

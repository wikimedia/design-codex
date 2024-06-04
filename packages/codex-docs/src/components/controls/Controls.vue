<template>
	<table class="cdx-docs-controls" :class="rootClasses">
		<thead>
			<tr>
				<th>Name</th>
				<th>Value</th>
			</tr>
		</thead>
		<tbody>
			<tr v-if="propControls.length > 0">
				<td class="cdx-docs-controls__section-header" colspan="2">
					Props
				</td>
			</tr>
			<tr v-for="propControl in propControls" :key="propControl.name">
				<td class="cdx-docs-controls__control-name">
					<pre>{{ propControl.name }}</pre>
				</td>
				<td class="cdx-docs-controls__control-value">
					<div class="cdx-docs-controls__control-value-wrapper">
						<!-- Special handling for Radio and Select controls. -->
						<!-- Needs template because v-if and v-for clash. -->
						<template v-if="propControl.type === 'radio'">
							<cdx-radio
								v-for="option in propControl.options"
								:key="`${propControl.name}-${option}`"
								:model-value="propControl.value"
								:input-value="option"
								:inline="true"
								:name="'radio-group-' + propControl.name"
								@update:model-value="emitControlChange( propControl.name, $event )"
							>
								{{ option }}
							</cdx-radio>
						</template>
						<cdx-select
							v-if="propControl.type === 'select'"
							v-model:selected="propControl.value"
							default-label="Choose an option"
							:menu-items="propControl.menuItems"
							@update:model-value="emitControlChange( propControl.name, $event )"
						/>

						<!-- All other controls. -->
						<component
							:is="componentForType( propControl.type )"
							v-if="componentForType( propControl.type )"
							:aria-label="'prop: ' + propControl.name"
							:model-value="propControl.value"
							@update:model-value="emitControlChange( propControl.name, $event )"
						/>
					</div>
				</td>
			</tr>

			<tr v-if="slotControls.length > 0">
				<td class="cdx-docs-controls__section-header" colspan="2">
					Slots
				</td>
			</tr>
			<tr v-for="slotControl in slotControls" :key="slotControl.name">
				<td class="cdx-docs-controls__control-name">
					<pre>{{ slotControl.name }}</pre>
				</td>
				<td class="cdx-docs-controls__control-value">
					<component
						:is="componentForType( slotControl.type )"
						v-if="componentForType( slotControl.type )"
						:aria-label="'slot: ' + slotControl.name"
						:model-value="slotControl.value"
						@update:model-value="emitControlChange( slotControl.name, $event )"
					/>
				</td>
			</tr>
			<tr>
				<td class="cdx-docs-controls__section-header" colspan="2">
					View
				</td>
			</tr>
			<tr>
				<td class="cdx-docs-controls__control-name">
					<pre>Reading direction</pre>
				</td>
				<td class="cdx-docs-controls__control-value">
					<cdx-radio
						v-model="wrappedDirection"
						input-value="ltr"
						:name="directionGroupName"
					>
						Left to right (LTR)
					</cdx-radio>
					<cdx-radio
						v-model="wrappedDirection"
						input-value="rtl"
						:name="directionGroupName"
					>
						Right to left (RTL)
					</cdx-radio>
				</td>
			</tr>
		</tbody>
		<tfoot v-if="hasIconProp">
			<tr>
				<td colspan="2">
					<strong>Note</strong>:
					For icon properties, the relevant icon also needs to be
					imported from the
					<code>@wikimedia/codex-icons</code>
					package. See
					<a href="../../using-codex/usage.html#using-icons">
						the usage documentation
					</a>
					for more information.
				</td>
			</tr>
		</tfoot>
	</table>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, toRef } from 'vue';
import { ControlConfigWithValue, SlotConfigWithValue, PropConfigWithValue } from '../../types';
import { CdxRadio, CdxTextInput, CdxToggleSwitch, HTMLDirection, useModelWrapper, useGeneratedId, CdxSelect } from '@wikimedia/codex';
import CdxDocsIconLookup from '../icon-lookup/IconLookup.vue';

/**
 * A table of interactive controls to configure a component demo.
 *
 * The table consists of a section for props, with a row for each provided prop, and a section for
 * slots, with a row for each provided slot.
 *
 * Control values are tracked in the parent Wrapper component so it can pass them to the component
 * demo in its named "demo" slot. When a control value changes, this component will emit an event
 * with the control name and its new value up to the Wrapper.
 */
export default defineComponent( {
	name: 'CdxDocsControls',
	components: { CdxRadio, CdxTextInput, CdxToggleSwitch, CdxDocsIconLookup, CdxSelect },
	props: {
		controlsWithValues: {
			type: Array as PropType<ControlConfigWithValue[]>,
			required: true
		},
		/**
		 * Current direction of the wrapper content.
		 */
		direction: {
			type: String as PropType<HTMLDirection>,
			default: 'ltr'
		}
	},
	emits: [
		'control-change',
		'update:direction'
	],
	setup( props, { emit } ) {
		const allControls = computed( () => {
			const propsInfo: PropConfigWithValue[] = [];
			const slotsInfo: SlotConfigWithValue[] = [];
			for ( const control of props.controlsWithValues ) {
				if ( control.type === 'slot' || control.type === 'slot-icon' ) {
					slotsInfo.push( control );
				} else {
					propsInfo.push( control );
				}
			}
			return { propsInfo, slotsInfo };
		} );
		// Split out the props and slots controls so we can display them in separate sections.
		const propControls = computed( () : PropConfigWithValue[] => allControls.value.propsInfo );
		const slotControls = computed( () : SlotConfigWithValue[] => allControls.value.slotsInfo );

		// Show a note about Icon props if there are any
		const hasIconProp = computed( () => {
			return props.controlsWithValues.some(
				( currentControl ) => currentControl.type === 'icon' ||
					currentControl.type === 'slot-icon'
			);
		} );

		// When icon properties are included, make sure that the full dropdown menu
		// can be seen without needing its own scroll bar
		const rootClasses = computed( () => {
			return {
				'cdx-docs-controls--has-icon': hasIconProp.value
			};
		} );

		const emitControlChange = ( name: string, value: string | number | boolean ) =>
			emit( 'control-change', name, value );

		/**
		 * Reduce duplication by adding a helper method to determine which component
		 * should be used to render a specific type of control. Returns undefined for
		 * no matching component, e.g. for 'radio' and 'select' controls.
		 *
		 * @param {string} controlType
		 * @return {string|undefined}
		 */
		const componentForType = ( controlType: string ) => {
			switch ( controlType ) {
				// Properties:
				case 'boolean':
					return 'cdx-toggle-switch';
				case 'icon':
					return 'cdx-docs-icon-lookup';
				case 'text':
					return 'cdx-text-input';

				// Slots:
				case 'slot':
					return 'cdx-text-input';
				case 'slot-icon':
					return 'cdx-docs-icon-lookup';
			}
		};

		const wrappedDirection = useModelWrapper( toRef( props, 'direction' ), emit, 'update:direction' );
		const directionGroupName = useGeneratedId( 'radio-group-direction' );

		return {
			propControls,
			slotControls,
			hasIconProp,
			rootClasses,
			emitControlChange,
			componentForType,
			wrappedDirection,
			directionGroupName
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-docs-controls {
	width: @size-full;
	font-size: @font-size-small;

	&__section-header {
		font-weight: @font-weight-bold;
	}

	&--has-icon {
		overflow: visible;
	}

	&__control-value .cdx-docs-controls__control-value-wrapper {
		display: flex;
		flex-wrap: wrap;
		row-gap: @spacing-100;
	}

	// stylelint-disable-next-line selector-class-pattern
	.cdx-radio {
		// stylelint-disable-next-line selector-class-pattern
		&:not( .cdx-radio--inline ) {
			margin-right: @spacing-100;

			@media screen and ( min-width: @min-width-breakpoint-tablet ) {
				// Use inline flex on larger screens.
				display: inline-flex;
				margin-bottom: 0;

				&:last-child {
					margin-right: 0;
				}
			}
		}
	}
}
</style>

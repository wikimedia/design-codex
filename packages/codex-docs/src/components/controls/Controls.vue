<template>
	<table class="cdx-docs-controls" :class="rootClasses">
		<thead>
			<tr>
				<th>Name</th>
				<th>Value</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td class="cdx-docs-controls__section-header" colspan="2">
					Props
				</td>
			</tr>
			<tr v-for="propControl in propControls" :key="propControl.name">
				<td class="cdx-docs-tokens-table__name">
					<pre>{{ propControl.name }}</pre>
				</td>
				<td>
					<!-- needs template because v-if and v-for clash -->
					<template v-if="propControl.type === 'radio'">
						<cdx-radio
							v-for="option in propControl.options"
							:key="`${propControl.name}-${option}`"
							:model-value="propControl.value"
							:input-value="option"
							:name="'radio-group-' + propControl.name"
							:inline="true"
							@update:model-value="emitControlChange( propControl.name, $event )"
						>
							{{ option }}
						</cdx-radio>
					</template>

					<component
						:is="componentForType( propControl.type )"
						v-if="componentForType( propControl.type )"
						:aria-label="'prop: ' + propControl.name"
						:model-value="propControl.value"
						@update:model-value="emitControlChange( propControl.name, $event )"
					/>
				</td>
			</tr>

			<tr v-if="slotControls.length > 0">
				<td class="cdx-docs-controls__section-header" colspan="2">
					Slots
				</td>
			</tr>
			<tr v-for="slotControl in slotControls" :key="slotControl.name">
				<td class="cdx-docs-tokens-table__name">
					<pre>{{ slotControl.name }}</pre>
				</td>
				<td>
					<component
						:is="componentForType( slotControl.type )"
						v-if="componentForType( slotControl.type )"
						:aria-label="'slot: ' + slotControl.name"
						:model-value="slotControl.value"
						@update:model-value="emitControlChange( slotControl.name, $event )"
					/>
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
					<a href="../../introduction/usage.html#using-icons">
						the usage documentation
					</a>
					for more information.
				</td>
			</tr>
		</tfoot>
	</table>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue';
import { ControlConfigWithValue, SlotConfigWithValue, PropConfigWithValue } from '../../types';
import { CdxRadio, CdxTextInput, CdxToggleSwitch } from '@wikimedia/codex';
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
	components: { CdxRadio, CdxTextInput, CdxToggleSwitch, CdxDocsIconLookup },
	props: {
		controlsWithValues: {
			type: Array as PropType<ControlConfigWithValue[]>,
			required: true
		}
	},
	emits: [
		'control-change'
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
		 * no matching component, e.g. for 'radio' controls.
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

		return {
			propControls,
			slotControls,
			hasIconProp,
			rootClasses,
			emitControlChange,
			componentForType
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/dist/theme-wikimedia-ui.less';

.cdx-docs-controls {
	font-size: 0.875em;

	&__section-header {
		font-weight: @font-weight-bold;
	}

	&--has-icon {
		overflow: visible;
	}
}
</style>

<template>
	<table class="vp-controls">
		<thead>
			<tr>
				<th>Name</th>
				<th>Value</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td class="vp-controls__section-header" colspan="2">
					Props
				</td>
			</tr>
			<tr v-for="propControl in propControls" :key="propControl.name">
				<td class="vp-tokens-table__name">
					<pre>{{ propControl.name }}</pre>
				</td>
				<td>
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

					<template v-if="propControl.type === 'text'">
						<cdx-text-input
							:model-value="propControl.value"
							@update:model-value="emitControlChange( propControl.name, $event )"
						/>
					</template>

					<!-- TODO: replace Radios with a Checkbox or ToggleSwitch -->
					<template v-if="propControl.type === 'boolean'">
						<cdx-radio
							v-for="booleanOption in [ false, true ]"
							:key="`${propControl.name}-${booleanOption}`"
							:model-value="propControl.value"
							:input-value="booleanOption"
							:name="'radio-group-' + propControl.name"
							:inline="true"
							@update:model-value="emitControlChange( propControl.name, $event )"
						>
							{{ booleanOption }}
						</cdx-radio>
					</template>
				</td>
			</tr>

			<tr>
				<td class="vp-controls__section-header" colspan="2">
					Slots
				</td>
			</tr>
			<tr v-for="slotControl in slotControls" :key="slotControl.name">
				<td class="vp-tokens-table__name">
					<pre>{{ slotControl.name }}</pre>
				</td>
				<td>
					<cdx-text-input
						:model-value="slotControl.value"
						@update:model-value="emitControlChange( slotControl.name, $event )"
					/>
				</td>
			</tr>
		</tbody>
	</table>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue';
import { ControlConfigWithValue, SlotConfigWithValue, PropConfigWithValue } from '../../types';
import CdxRadio from 'vue-components/src/components/radio/Radio.vue';
import CdxTextInput from 'vue-components/src/components/text-input/TextInput.vue';

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
	// TODO: rename this to something multi-word and more descriptive.
	// eslint-disable-next-line vue/multi-word-component-names
	name: 'Controls',
	components: { CdxRadio, CdxTextInput },
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
		// Split out the props and slots controls so we can display them in separate sections.
		const propControls = computed( () : PropConfigWithValue[] => {
			return props.controlsWithValues.filter(
				( control ) : control is PropConfigWithValue => {
					return control.type !== 'slot';
				} );
		} );
		const slotControls = computed( () : SlotConfigWithValue[] => {
			return props.controlsWithValues.filter(
				( control ) : control is SlotConfigWithValue => {
					return control.type === 'slot';
				} );
		} );

		const emitControlChange = ( name: string, value: string | number | boolean ) =>
			emit( 'control-change', name, value );

		return {
			propControls,
			slotControls,
			emitControlChange
		};
	}
} );
</script>

<style lang="less">
// TODO: Remove references to wikimedia-ui-base once we have the proper tokens in place.
@import 'wikimedia-ui-base/wikimedia-ui-base.less';

.vp-controls {
	font-size: 0.875em;

	&__section-header {
		font-weight: bold;
	}
}

</style>

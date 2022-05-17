<template>
	<div>
		<!-- Have a slot -->
		<component
			:is="componentName"
			v-if="$slots.default"
			v-model="modelValue"
			v-bind="$attrs"
		>
			<slot />
		</component>
		<!-- No slot content -->
		<component
			:is="componentName"
			v-else
			v-model="modelValue"
			v-bind="$attrs"
		/>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRoute } from 'vitepress';
import toKebabCase from '../../utils/toKebabCase';

// Supported configurable components, add new ones as needed
import {
	CdxToggleButton,
	CdxToggleSwitch,
	CdxTextInput
} from '@wikimedia/codex';

/**
 * Generic "configurable" demo component where all unknown properties are passed to the demo
 * component, as is the default slot, where the demo component is determined from the page name.
 * This is meant specifically for components that need to have a v-model value, like ToggleButton;
 * other components, like the normal Button, that just need the properties and slots passed can
 * bind directly to an instance of the component in the demo markdown file.
 *
 * Note that any component that this will be used to demonstrate needs to be added to the
 * components available for the demo.
 *
 * @author DannyS712
 */
export default defineComponent( {
	name: 'CdxDocsConfigurableGeneric',
	components: {
		CdxToggleButton,
		CdxToggleSwitch,
		CdxTextInput
	},
	inheritAttrs: false,
	setup() {
		const modelValue = ref();
		// Extract from page name and convert to cdx-* and kebab case, based on Wrapper.vue
		const route = useRoute();
		const componentName = 'cdx-' + toKebabCase( route.data.title );

		return {
			modelValue,
			componentName
		};
	}
} );
</script>
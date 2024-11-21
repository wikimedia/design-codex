<template>
	<cdx-lookup
		v-model:selected="wrappedModel"
		v-model:input-value="inputValue"
		class="cdx-docs-icon-lookup"
		:menu-items="menuItems"
		:menu-config="menuConfig"
		:clearable="true"
		placeholder="Start typing an icon name"
		@update:input-value="getMenuItems"
	/>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, toRef, watch } from 'vue';
import { CdxLookup, MenuItemData, MenuConfig, useModelWrapper } from '@wikimedia/codex';
import * as allIcons from '@wikimedia/codex-icons';
import { Icon } from '@wikimedia/codex-icons';
import { nextTick } from 'vue';

// Icon data based on AllIcons.vue in icon demo
// Type is compatible with MenuItemData
const displayIcons : {
	value: string,
	icon: Icon
}[] = [];

for ( const iconName in allIcons ) {
	const icon = allIcons[ iconName as keyof typeof allIcons ];
	// Some of the exports are utility functions, filter those out
	if ( typeof icon === 'function' ) {
		continue;
	}
	// We don't separate out the specific versions (language or LTR/RTL) of the icons
	// into different entries, just use the overall Icon object. The direction will be
	// based on the LTR/RTL control of the overall demo, and languages are not changeable
	// yet, but perhaps will be in the future.
	displayIcons.push( {
		value: iconName,
		icon
	} );
}

/**
 * Lookup for different icons to be used in component demos.
 */
export default defineComponent( {
	name: 'CdxDocsIconLookup',

	components: { CdxLookup },

	props: {
		/**
		 * Currently selected icon name, the value of the input.
		 *
		 * Provided by `v-model` binding in the parent component.
		 */
		modelValue: {
			type: String,
			default: ''
		}
	},

	emits: [
		/**
		 * When the selected icon changes.
		 *
		 * @property {string} modelValue The new model value
		 */
		'update:modelValue'
	],

	setup( props, { emit } ) {
		// Take the modelValue provided by the parent component via v-model and
		// generate a wrapped model that we can use for the model in the inner lookup,
		// maintaining reactivity
		const modelValueProp = toRef( props, 'modelValue' );
		const wrappedModel = useModelWrapper( modelValueProp, emit );
		const menuItems = ref<MenuItemData[]>( [] );
		const inputValue = ref( wrappedModel.value );

		const menuConfig: MenuConfig = {
			boldLabel: true
		};

		function getMenuItems( value: string ) {
			if ( value ) {
				// Filter is case-insensitive
				const lowerCased = value.toLowerCase();
				// Limit to at most 10 icons
				menuItems.value = displayIcons
					.filter( ( item ) => item.value.toLowerCase().includes( lowerCased ) )
					.slice( 0, 10 );
			} else {
				// Clear current filtered items
				menuItems.value = [];
			}
		}

		// When the modelValueProp changes from above, this means that the demo was reset,
		// and we want to make sure that the menu actually uses the new value
		watch( modelValueProp, async ( newValue: string ) => {
			getMenuItems( newValue );
			await nextTick();
			inputValue.value = newValue;
		} );

		// Normally, we want to start with an empty menu set, *but* if the model value
		// is set to have an initial icon, we want to make sure that it is available.
		onMounted( () => getMenuItems( props.modelValue ) );

		return {
			wrappedModel,
			menuItems,
			inputValue,
			menuConfig,
			getMenuItems
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-docs-icon-lookup {
	// Ensure that the longer icon names are not cut off or split into multiple lines in
	// the menu
	min-width: @size-1600;
}
</style>

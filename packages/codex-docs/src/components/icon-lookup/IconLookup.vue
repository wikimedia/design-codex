<template>
	<cdx-lookup
		v-model:selected="selection"
		v-model:input-value="input"
		class="cdx-docs-icon-lookup"
		:menu-items="menuItems"
		:menu-config="menuConfig"
		:clearable="true"
		placeholder="Start typing an icon name"
	/>
</template>

<script lang="ts">
import { defineComponent, ref, toRef, computed, watch, nextTick } from 'vue';
import { CdxLookup, MenuConfig, useModelWrapper } from '@wikimedia/codex';
import * as allIcons from '@wikimedia/codex-icons';
import { Icon } from '@wikimedia/codex-icons';

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
		const selection = useModelWrapper( toRef( props, 'modelValue' ), emit );
		const input = ref( selection.value );

		const menuConfig: MenuConfig = {
			boldLabel: true
		};

		const menuItems = computed( () => {
			if ( input.value ) {
				// Filter is case-insensitive
				const lowerCased = input.value.toLowerCase();
				// Limit to at most 10 icons
				return displayIcons
					.filter( ( item ) => item.value.toLowerCase().includes( lowerCased ) )
					.slice( 0, 10 );
			} else {
				// Clear current filtered items
				return [];
			}
		} );

		// If the selection changes to a non-null value, and that value
		// does not match the current  value in the text input, then update
		// the latter to match the former (after waiting for child components
		// to fully render);
		watch( selection, async ( newValue ) => {
			await nextTick();
			if ( newValue && newValue !== input.value ) {
				input.value = newValue;
			}
		} );

		return {
			selection,
			menuItems,
			input,
			menuConfig
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

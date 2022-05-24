<template>
	<div class="cdx-docs-icon-lookup">
		<cdx-lookup
			ref="lookup"
			v-model:selected="wrappedModel"
			:menu-items="menuItems"
			:menu-config="menuConfig"
			:clearable="true"
			placeholder="Start typing an icon name"
			@input="onInput"
		/>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, toRef, watch } from 'vue';
import { CdxLookup, MenuItemData, MenuConfig, useModelWrapper } from '@wikimedia/codex';
import * as allIcons from '@wikimedia/codex-icons';
import { Icon } from '@wikimedia/codex-icons';

// Icon data based on AllIcons.vue in icon demo
// Type is compatable with MenuItemData
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
 *
 * @author DannyS712
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
			required: true
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

		const menuConfig: MenuConfig = {
			boldLabel: true
		};

		function onInput( value: string ) {
			if ( value ) {
				// Filter is case-insensitive
				const lowerCased = value.toLowerCase();
				// Limit to at most 10 icons
				menuItems.value = displayIcons.filter( ( item ) =>
					item.value.toLowerCase().includes( lowerCased )
				).slice( 0, 10 );
			} else {
				// Clear current filtered items
				menuItems.value = [];
			}
		}

		// Need to be able to set the chosen icon on initial render/when reset
		const lookup = ref<InstanceType<typeof CdxLookup>>();
		function forceSetIcon( iconName: string ) {
			if ( !iconName || !lookup.value ) {
				return;
			}
			// Do the same menu item filtering
			onInput( iconName );
			const lookupWrapper: HTMLElement = lookup.value.$el;
			const iconInput = lookupWrapper.querySelector( 'input' );
			if ( iconInput ) {
				// Custom function added by Vue for v-model updates
				// We have no control over the function name here, need to use
				// _assign. TypeScript complains that _assign doesn't exist on
				// HTMLInputElement (which is true, and the reason for using ?.()
				// just in case) so we need to suppress that.
				/* eslint-disable no-underscore-dangle, @typescript-eslint/ban-ts-comment */
				// @ts-ignore: see above
				iconInput._assign?.( iconName );
				/* eslint-enable no-underscore-dangle, @typescript-eslint/ban-ts-comment */
			}
		}
		// When the modelValueProp changes from above, this means that the demo was reset,
		// and we want to make sure that the menu actually uses the new value
		watch(
			modelValueProp,
			( newValue: string ) => forceSetIcon( newValue )
		);
		// Normally, we want to start with an empty menu set, *but* if the model value
		// is set to have an initial icon, we want to make sure that it is available.
		onMounted( () => forceSetIcon( props.modelValue ) );

		return {
			lookup,
			wrappedModel,
			menuItems,
			menuConfig,
			onInput
		};
	}
} );
</script>

<style lang="less">
.cdx-docs-icon-lookup {
	// Ensure that the longer icon names are not cut off or split into multiple lines in
	// the menu
	min-width: 300px;
}
</style>

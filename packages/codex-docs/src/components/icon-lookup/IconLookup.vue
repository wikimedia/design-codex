<template>
	<cdx-lookup
		v-model="modelWrapper"
		class="cdx-docs-icon-lookup"
		:menu-items="filteredMenuItems"
		placeholder="Type an icon name"
		@new-input="onInput"
	>
		<template #menu-item="{ menuItem }">
			<cdx-icon :icon="menuItem.icon" />
			{{ menuItem.value }}
		</template>

		<template #label="{ selectedMenuItem, defaultLabel }">
			<cdx-icon v-if="selectedMenuItem" :icon="selectedMenuItem.icon" />
			{{ selectedMenuItem ? selectedMenuItem.value : defaultLabel }}
		</template>
	</cdx-lookup>
</template>

<script lang="ts">
import { defineComponent, ref, toRef } from 'vue';
import { CdxIcon, CdxLookup, MenuItemData, useModelWrapper } from '@wikimedia/codex';
import * as allIconExports from '@wikimedia/codex-icons';
import { Icon } from '@wikimedia/codex-icons';

const allIcons = {} as Record<string, Icon>;
for ( const iconName in allIconExports ) {
	const iconOrFunction = allIconExports[ iconName as keyof typeof allIconExports ];
	if ( typeof iconOrFunction !== 'function' ) {
		allIcons[ iconName ] = iconOrFunction;
	}
}

export default defineComponent( {
	name: 'CdxDocsIconLookup',
	components: {
		CdxIcon,
		CdxLookup
	},
	props: {
		modelValue: {
			type: String,
			default: ''
		},
		maxResults: {
			type: Number,
			default: 10
		}
	},
	emits: [
		'update:modelValue'
	],
	setup( props, { emit } ) {
		const menuItems = Object.keys( allIcons ).map( ( iconName ) => ( {
			value: iconName,
			icon: allIcons[ iconName ]
		} ) );

		const filteredMenuItems = ref<MenuItemData[]>( [] );

		const modelWrapper = useModelWrapper( toRef( props, 'modelValue' ), emit );

		function onInput( value: string ) {
			if ( value === '' ) {
				filteredMenuItems.value = [];
			} else {
				filteredMenuItems.value = menuItems.filter(
					( item ) => item.value.toLowerCase().includes( value.toLowerCase() )
				).slice( 0, props.maxResults );
			}
		}

		return {
			filteredMenuItems,
			modelWrapper,
			onInput
		};
	}
} );
</script>

<template>
	<div>
		<CdxLookup
			v-model="selection"
			class="vp-lookup-custom-option"
			:options="menuOptions"
			@update:input-value="onInput"
		>
			<template #menuOption="{ option }">
				<p class="vp-lookup-custom-option__label">
					{{ option.label || option.value }}
				</p>
				<p v-if="option.description" class="vp-lookup-custom-option__description">
					{{ option.description }}
				</p>
			</template>
		</CdxLookup>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { CdxLookup } from 'vue-components/src/lib';
import { MenuOption } from 'vue-components/src/types';
import vegetableItems from './data';

export default defineComponent( {
	name: 'LookupCustomOption',
	components: { CdxLookup },
	setup() {
		const selection = ref( '' );
		const menuOptions = ref<MenuOption[]>( [] );

		function onInput( value: string ) {
			if ( value ) {
				menuOptions.value = vegetableItems.filter( ( item ) =>
					item.label.includes( value )
				);
			}
		}

		return {
			selection,
			menuOptions,
			onInput
		};
	}
} );
</script>

<style lang="less">
.vp-lookup-custom-option {
	p {
		margin: 0;
	}

	&__label {
		font-weight: bold;
	}

	&__description {
		font-size: 0.875em;
		line-height: 1.25;
	}
}
</style>

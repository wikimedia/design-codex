<template>
	<cdx-field>
		<cdx-multiselect-lookup
			v-model:input-chips="chips"
			v-model:selected="selection"
			v-model:input-value="inputValue"
			:menu-items="menuItems"
			:menu-config="menuConfig"
			placeholder="Add a namespace..."
			@input="onInput"
		>
			<template #no-results>
				No matching namespaces.
			</template>
		</cdx-multiselect-lookup>
		<template #label>
			Namespaces
		</template>
		<template #description>
			Filter results by namespace
		</template>
	</cdx-field>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue';
import { CdxField, CdxMultiselectLookup } from '@wikimedia/codex';

export default defineComponent( {
	name: 'MultiselectLookupField',
	components: {
		CdxField, CdxMultiselectLookup
	},
	setup() {
		const chips = ref( [] );
		const selection = ref( [] );
		const inputValue = ref( '' );

		const namespaces = ref( [] );
		const menuItems = ref( [] );

		const menuConfig = {
			visibleItemLimit: 6
		};

		/**
		 * Handle lookup input.
		 *
		 * @param {string} value The new input value
		 */
		function onInput( value ) {
			// Reset menu items if the input was cleared.
			if ( !value ) {
				menuItems.value = namespaces.value;
				return;
			}

			// Make sure this data is still relevant first.
			if ( inputValue.value !== value ) {
				return;
			}

			// Update menuItems.
			menuItems.value = namespaces.value.filter( ( namespace ) => {
				return namespace.label.includes( value );
			} );
		}

		/**
		 * Get a list of namespaces from English Wikipedia.
		 *
		 * @return {Promise}
		 */
		function getNamespaces() {
			const params = new URLSearchParams( {
				origin: '*',
				action: 'query',
				meta: 'siteinfo',
				siprop: 'namespaces',
				format: 'json',
				language: 'en'
			} );
			return fetch( `https://en.wikipedia.org/w/api.php?${ params.toString() }` )
				.then( ( response ) => response.json() );
		}

		function formatData( namespaceData ) {
			const formattedData = [];
			for ( const namespaceId of Object.keys( namespaceData ) ) {
				if ( 'canonical' in namespaceData[ namespaceId ] ) {
					formattedData.push( {
						value: namespaceId,
						label: namespaceData[ namespaceId ].canonical
					} );
				}
			}
			return formattedData;
		}

		onMounted( () => {
			getNamespaces()
				.then( ( data ) => {
					// Store formatted namespaces.
					namespaces.value = formatData( data.query.namespaces );
					// Set initial menu items.
					menuItems.value = namespaces.value;
				} );
		} );

		return {
			chips,
			selection,
			inputValue,
			menuItems,
			menuConfig,
			onInput
		};
	}
} );
</script>

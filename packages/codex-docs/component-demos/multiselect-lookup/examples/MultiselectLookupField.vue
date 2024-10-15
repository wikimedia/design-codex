<template>
	<form class="cdx-docs-multiselect-lookup-form">
		<cdx-field :status="status" :messages="messages">
			<cdx-multiselect-lookup
				v-model:input-chips="chips"
				v-model:selected="selection"
				v-model:input-value="inputValue"
				:menu-items="menuItems"
				:menu-config="menuConfig"
				placeholder="Add a namespace..."
				@input="onInput"
				@update:selected="onSelection"
				@blur="validateInstantly"
				@keydown.enter="validateInstantly"
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
		<cdx-button
			class="cdx-docs-multiselect-lookup-form__submit"
			action="progressive"
			weight="primary"
			type="submit"
			@click.prevent="onSubmit"
		>
			Submit
		</cdx-button>
	</form>
</template>

<script>
import { defineComponent, onMounted, ref, nextTick } from 'vue';
import { CdxField, CdxMultiselectLookup, CdxButton } from '@wikimedia/codex';

export default defineComponent( {
	name: 'MultiselectLookupField',
	components: {
		CdxField, CdxMultiselectLookup, CdxButton
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

		const status = ref( 'default' );

		const messages = {
			warning: 'This entry is invalid. Please select an option from the menu.',
			error: 'This entry is invalid. Please select an option from the menu.'
		};

		/**
		 * Maybe set a warning message when the user moves out of the field or hits enter.
		 */
		function validateInstantly() {
			// Await nextTick in case the user has selected a menu item via the Enter key - this
			// will ensure the selection ref has been updated.
			nextTick( () => {
				// Set warning status if there's input. This might happen if a user types something
				// but doesn't select an item from the menu.
				status.value = inputValue.value.length > 0 ? 'warning' : 'default';
			} );
		}

		/**
		 * Maybe set an error message on submit.
		 */
		function onSubmit() {
			// Set an error message if there's input left in the field, or if there's no selection.
			if ( inputValue.value.length > 0 || selection.value.length === 0 ) {
				status.value = 'error';
			} else {
				status.value = 'default';
				// eslint-disable-next-line no-alert
				alert( 'Validation successful!' );
			}
		}

		/**
		 * Clear warning or error after a selection is made.
		 */
		function onSelection() {
			if ( selection.value !== null ) {
				status.value = 'default';
			}
		}

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
			status,
			messages,
			validateInstantly,
			onSubmit,
			onSelection,
			onInput
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-docs-multiselect-lookup-form {
	&__submit {
		margin-top: @spacing-100;
	}
}
</style>

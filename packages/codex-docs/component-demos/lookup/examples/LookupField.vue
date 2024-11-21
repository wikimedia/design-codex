<template>
	<form class="cdx-docs-lookup-form">
		<cdx-field :status="status" :messages="messages">
			<cdx-lookup
				v-model:selected="selection"
				v-model:input-value="inputValue"
				:menu-items="menuItems"
				:menu-config="menuConfig"
				@input="onInput"
				@load-more="onLoadMore"
				@update:selected="onSelection"
				@blur="validateInstantly"
				@keydown.enter="validateInstantly"
			>
				<template #no-results>
					No results found.
				</template>
			</cdx-lookup>
			<template #label>
				Item lookup
			</template>
			<template #description>
				Search Wikidata items
			</template>
			<template #help-text>
				Start typing the name of a Wikidata item to see suggestions
			</template>
		</cdx-field>
		<cdx-button
			class="cdx-docs-lookup-form__submit"
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
import { defineComponent, ref, nextTick } from 'vue';
import { CdxLookup, CdxField, CdxButton } from '@wikimedia/codex';

export default defineComponent( {
	name: 'LookupField',
	components: { CdxLookup, CdxField, CdxButton },
	setup() {
		const selection = ref( null );
		const menuItems = ref( [] );
		const inputValue = ref( '' );

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
				// Set 'warning' status if there's input but no selection. This might happen if a
				// user types something but doesn't select an item from the menu.
				status.value = inputValue.value.length > 0 && selection.value === null ?
					'warning' :
					'default';
			} );
		}

		/**
		 * Show error message on submit if nothing is selected.
		 */
		function onSubmit() {
			if ( selection.value === null ) {
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
		 * Get search results.
		 *
		 * @param {string} searchTerm
		 * @param {number} offset Optional result offset
		 *
		 * @return {Promise}
		 */
		function fetchResults( searchTerm, offset ) {
			const params = new URLSearchParams( {
				origin: '*',
				action: 'wbsearchentities',
				format: 'json',
				limit: '10',
				props: 'url',
				language: 'en',
				search: searchTerm
			} );
			if ( offset ) {
				params.set( 'continue', String( offset ) );
			}
			return fetch( `https://www.wikidata.org/w/api.php?${ params.toString() }` )
				.then( ( response ) => response.json() );
		}

		/**
		 * Handle lookup input.
		 *
		 * TODO: this should be debounced.
		 *
		 * @param {string} value
		 */
		function onInput( value ) {
			// Do nothing if we have no input.
			if ( !value ) {
				menuItems.value = [];
				return;
			}

			fetchResults( value )
				.then( ( data ) => {
					// Make sure this data is still relevant first.
					if ( inputValue.value !== value ) {
						return;
					}

					// Reset the menu items if there are no results.
					if ( !data.search || data.search.length === 0 ) {
						menuItems.value = [];
						return;
					}

					// Build an array of menu items.
					const results = data.search.map( ( result ) => ( {
						label: result.label,
						value: result.id,
						description: result.description
					} ) );

					// Update menuItems.
					menuItems.value = results;
				} )
				.catch( () => {
					// On error, set results to empty.
					menuItems.value = [];
				} );
		}

		function deduplicateResults( results ) {
			const seen = new Set( menuItems.value.map( ( result ) => result.value ) );
			return results.filter( ( result ) => !seen.has( result.value ) );
		}

		function onLoadMore() {
			if ( !inputValue.value ) {
				return;
			}

			fetchResults( inputValue.value, menuItems.value.length )
				.then( ( data ) => {
					if ( !data.search || data.search.length === 0 ) {
						return;
					}

					const results = data.search.map( ( result ) => ( {
						label: result.label,
						value: result.id,
						description: result.description
					} ) );

					// Update menuItems.
					const deduplicatedResults = deduplicateResults( results );
					menuItems.value.push( ...deduplicatedResults );
				} );
		}

		const menuConfig = {
			visibleItemLimit: 6
		};

		return {
			selection,
			menuItems,
			inputValue,
			status,
			messages,
			validateInstantly,
			onSubmit,
			onSelection,
			onInput,
			onLoadMore,
			menuConfig
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-docs-lookup-form {
	&__submit {
		margin-top: @spacing-100;
	}
}
</style>

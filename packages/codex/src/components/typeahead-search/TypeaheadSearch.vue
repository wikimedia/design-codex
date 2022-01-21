<template>
	<div
		class="cdx-typeahead-search"
		:class="rootClasses"
		:style="rootStyle"
	>
		<form
			:id="id"
			class="cdx-typeahead-search__form"
			:action="formAction"
			@submit="onSubmit"
		>
			<div class="cdx-typeahead-search__wrapper">
				<cdx-text-input
					ref="textInput"
					v-model="inputValue"
					v-bind="otherAttrs"
					:start-icon="searchIcon"
					input-type="search"
					name="search"
					role="combobox"
					autocomplete="off"
					aria-autocomplete="list"
					:aria-owns="menuId"
					:aria-expanded="expanded"
					:aria-activedescendant="state.highlighted.value?.id"
					autocapitalize="off"
					@update:model-value="onUpdateInputValue"
					@focus="onFocus"
					@blur="onBlur"
					@keydown.space.enter.up.down.tab.esc="onKeyNavigation"
				/>

				<ol
					v-show="expanded"
					:id="menuId"
					class="cdx-typeahead-search__menu"
					role="listbox"
					:aria-label="searchResultsLabel"
					aria-multiselectable="false"
				>
					<cdx-option
						v-for="searchResult in computedSearchResults"
						:key="searchResult.value"
						class="cdx-typeahead-search__menu__option"
						v-bind="searchResult"
						@change="handleOptionChange"
					>
						<cdx-list-tile
							v-if="searchResult.value !== MenuFooterValue"
							:search-query="searchQuery"
							:item="searchResult"
							:highlight-query="highlightQuery"
							:hide-thumbnail="hideThumbnail"
							:hide-description="hideDescription"
							@click="onSearchResultClick( searchResult )"
						/>
						<a
							v-else
							class="cdx-typeahead-search__search-footer"
							:href="searchResult.url"
							@click.capture.stop="onSearchFooterClick( searchResult )"
						>
							<cdx-icon
								v-if="!hideThumbnail"
								class="cdx-typeahead-search__search-footer__icon"
								:icon="articleIcon"
							/>
							<span
								class="cdx-typeahead-search__search-footer__text"
							>
								<!-- eslint-disable max-len -->
								<!--
									@slot A slot for passing in translated search footer text.
									@binding {string} searchQuery Input text entered by the user
								-->
								<slot name="search-footer-text" :searchQuery="searchQuery">
									<strong class="cdx-typeahead-search__search-footer__query">
										{{ searchQuery }}
									</strong>
								</slot>
								<!-- eslint-enable max-len -->
							</span>
						</a>
					</cdx-option>
				</ol>

				<!--
					@slot A slot for passing hidden inputs, i.e.
					`<input type="hidden" name="language" value="en">`
				-->
				<slot />
			</div>
			<cdx-button class="cdx-typeahead-search__submit">
				{{ buttonLabel }}
			</cdx-button>
		</form>
	</div>
</template>

<script lang="ts">
import { PropType, ComputedRef, defineComponent, computed, ref, toRefs, watch, onMounted } from 'vue';
import { cdxIconSearch, cdxIconArticleSearch } from '@wikimedia/codex-icons';
import CdxButton from '../button/Button.vue';
import CdxIcon from '../icon/Icon.vue';
import CdxListTile from '../list-tile/ListTile.vue';
import CdxOption from '../option/Option.vue';
import CdxTextInput from '../text-input/TextInput.vue';
import useGeneratedId from '../../composables/useGeneratedId';
import useMenu from '../../composables/useMenu';
import useSplitAttributes from '../../composables/useSplitAttributes';
import { MenuOption, SearchResult, SearchResultWithId, SearchResultClickEvent } from '../../types';
import { DebounceInterval, MenuFooterValue } from '../../constants';

/**
 * A search form with stylized autocomplete suggestions.
 *
 * TypeaheadSearch contains a form with a text input, a submit button, and a slot for hidden inputs.
 * The parent component must listen for changes in the search query (which are debounced by
 * default), fetch or calculate search results, then provide them as an array of search results for
 * display to the user as a menu of ListTiles.
 *
 * At the end of the list of search results, a final option to go to the search page for the current
 * search query is provided.
 *
 * Events are emitted to the parent when a search result is selected and when the form is submitted,
 * with data about the selected item (e.g. for analytics).
 */
export default defineComponent( {
	name: 'CdxTypeaheadSearch',

	components: {
		CdxButton,
		CdxIcon,
		CdxListTile,
		CdxOption,
		CdxTextInput
	},

	/**
	 * Attributes, besides class, will be passed to the TextInput's input element.
	 */
	inheritAttrs: false,

	props: {
		/**
		 * ID attribute for the form.
		 */
		id: {
			type: String,
			required: true
		},
		/**
		 * Action attribute for form.
		 */
		formAction: {
			type: String,
			required: true
		},
		/**
		 * Submit button text.
		 */
		buttonLabel: {
			type: String,
			required: true
		},
		/**
		 * Label attribute for the list of search results.
		 */
		searchResultsLabel: {
			type: String,
			required: true
		},
		/**
		 * List of search results. See the SearchResult type.
		 */
		searchResults: {
			type: Array as PropType<SearchResult[]>,
			default: () => []
		},
		/**
		 * Initial value for the text input.
		 *
		 * Triggers an initial new-input event on mount.
		 */
		initialInputValue: {
			type: String,
			default: ''
		},
		/**
		 * Link for the final option.
		 *
		 * This will typically be a link to the search page for the current search query.
		 */
		searchFooterUrl: {
			type: String,
			default: ''
		},
		/**
		 * Time interval for debouncing input events, in ms.
		 */
		debounceInterval: {
			type: Number,
			default: DebounceInterval
		},
		/**
		 * Whether the search query should be highlighted within a search result's title.
		 */
		highlightQuery: {
			type: Boolean,
			default: false
		},
		/**
		 * Whether to hide search results' thumbnails.
		 */
		hideThumbnail: {
			type: Boolean,
			default: false
		},
		/**
		 * Whether to hide search results' descriptions.
		 */
		hideDescription: {
			type: Boolean,
			default: false
		}
	},

	emits: [
		/**
		 * When the text input value changes. Debounced by default.
		 *
		 * @property {string} value The new input value
		 */
		'new-input',
		/**
		 * When a search result is selected.
		 *
		 * @property {SearchResultClickEvent} event Data for the selected result
		 */
		'search-result-click',
		/**
		 * When the form is submitted.
		 *
		 * @property {SearchResultClickEvent} event Data for the selected result
		 */
		'submit'
	],

	setup( props, context ) {
		const { searchResults, searchFooterUrl, debounceInterval } = toRefs( props );

		// Generated ID for menu; needed for aria-attributes.
		const menuId = useGeneratedId( 'typeahead-search-menu' );

		// Whether the TypeaheadSearch is being used; used for applying conditional styles.
		const isActive = ref( false );

		// Current text input value; initially set to the initialInputValue prop.
		const inputValue = ref( props.initialInputValue );

		// Current search query. This is the query for which search results have been fetched, and
		// will display in the search footer.
		// This will typically match the input value, except while results are being fetched and
		// if the user scrolls through results via the keyboard.
		const searchQuery = ref( '' );

		const internalSelection = ref<string|number|null>( null );

		// Define a menuData variable, which will eventually be set by calling useMenu, so we can
		// refer to it in the selection setter below.
		let menuData: ReturnType<typeof useMenu> | null = null;

		// Create a writable computed ref for the value of the current selection.
		const selection = computed( {
			get: () => internalSelection.value,
			set: ( value: string|number|null ) => {
				internalSelection.value = value;

				// If there is a newVal, including an empty string...
				if ( value !== null && menuData !== null ) {
					// If there is a search result selected, show the label (or the value, if there
					// is no label). Otherwise, set the input to empty.
					const selectedOption = menuData.state.selected.value;
					inputValue.value = selectedOption ?
						selectedOption.label || String( selectedOption.value ) :
						'';
				}
			}
		} );

		// Add in search footer option.
		const searchResultsWithFooter = computed( () =>
			searchFooterUrl.value ?
				searchResults.value.concat( [
					{ value: MenuFooterValue, url: searchFooterUrl.value }
				] ) :
				searchResults.value
		);

		// Get helpers from useMenu.
		const {
			computedOptions,
			state,
			expanded,
			handleOptionChange,
			handleKeyNavigation
		} = menuData = useMenu(
			searchResultsWithFooter,
			selection,
			{
				inputValue,
				footerCallback: () => {
					inputValue.value = searchQuery.value;
					selection.value = null;
				}
			}
		);

		// The elements of computedOptions are actually SearchResult objects with an ID added,
		// but TypeScript doesn't know this. Tell TS that the objects in this array implement both
		// the SearchResult and MenuOptionWithId interfaces. The intermediate cast via MenuOption
		// is needed to avoid a TS error complaining the types are incompatible.
		const computedSearchResults =
			( computedOptions as ComputedRef<MenuOption[]> ) as
			ComputedRef<SearchResultWithId[]>;

		// Get helpers from useSplitAttributes.
		const internalClasses = computed( () => {
			return {
				'cdx-typeahead-search--active': isActive.value,
				'cdx-typeahead-search--show-thumbnail': !props.hideThumbnail,
				'cdx-typeahead-search--expanded': expanded.value
			};
		} );
		const {
			rootClasses,
			rootStyle,
			otherAttrs
		} = useSplitAttributes( context.attrs, internalClasses );

		const debounceId = ref<ReturnType<typeof setTimeout>>();

		/**
		 * Handle changes to the text input.
		 *
		 * 'new-input' events with the new value will be emitted, but this will be debounced if a
		 * positive debounceInterval is provided as a prop or if the default DebounceInterval is
		 * used.
		 *
		 * TODO: use a library-wide debounce function.
		 *
		 * @param value New value of the text input
		 * @param immediate Whether to trigger event emission on leading edge
		 */
		function onUpdateInputValue( value: string, immediate = false ) {
			inputValue.value = value;
			const handleUpdateInputValue = () => {
				context.emit( 'new-input', inputValue.value );
			};

			// Cancel the last setTimeout callback in case it hasn't executed yet.
			if ( debounceId.value ) {
				clearTimeout( debounceId.value );
			}

			if ( immediate ) {
				handleUpdateInputValue();
			} else {
				debounceId.value = setTimeout( () => {
					handleUpdateInputValue();
				}, debounceInterval.value );
			}
		}

		function onFocus() {
			isActive.value = true;

			if ( searchQuery.value ) {
				expanded.value = true;
			}
		}

		function onBlur() {
			isActive.value = false;
			expanded.value = false;
		}

		/**
		 * Emit event data for selected search result on click.
		 *
		 * @param searchResult
		 */
		function onSearchResultClick( searchResult: SearchResultWithId ) {
			// First, process the search result. We can ditch the generated ID, and if this is the
			// search footer, we don't want to emit a search result.
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { id, ...resultWithoutId } = searchResult;
			const emittedResult = resultWithoutId.value !== MenuFooterValue ?
				resultWithoutId :
				null;

			const searchResultClickEvent: SearchResultClickEvent = {
				searchResult: emittedResult,
				index: computedOptions.value.indexOf( searchResult ),
				numberOfResults: searchResults.value.length
			};

			context.emit( 'search-result-click', searchResultClickEvent );
		}

		/**
		 * Handle search footer click.
		 *
		 * Unlike search results, when the search footer is clicked, we don't want the selection
		 * value to be updated to the value of the search footer option. So, we handle this case
		 * separately here.
		 *
		 * @param footerOption
		 */
		function onSearchFooterClick( footerOption: SearchResultWithId ) {
			// Like we would with other options, close the menu and clear the active option.
			expanded.value = false;
			handleOptionChange( 'active' );

			// Run the search result click handler.
			onSearchResultClick( footerOption );
		}

		/**
		 * Emit event data on form submit.
		 */
		function onSubmit() {
			// Set default data for no selection.
			let emittedResult: SearchResult|null = null;
			let selectedResultIndex = -1;

			// Edit data if there is a selection.
			if ( state.selected.value ) {
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				const { id, ...resultWithoutId } = state.selected.value;
				emittedResult = resultWithoutId as SearchResult;
				selectedResultIndex = computedOptions.value.indexOf( state.selected.value );
			}

			const submitEvent: SearchResultClickEvent = {
				searchResult: emittedResult,
				index: selectedResultIndex,
				numberOfResults: searchResults.value.length
			};

			context.emit( 'submit', submitEvent );
		}

		/**
		 * Respond to key navigation.
		 *
		 * This component has some special cases it needs to cover, then will relegate the rest to
		 * the handleKeyNavigation function provided by useMenu.
		 *
		 * @param e
		 */
		function onKeyNavigation( e: KeyboardEvent ) {
			if (
				( !searchQuery.value ) ||
				( e.key === ' ' && expanded.value )
			) {
				return;
			}

			switch ( e.key ) {
				case 'Enter':
					if ( state.highlighted.value ) {
						// If this is the search footer...
						if ( state.highlighted.value.value === MenuFooterValue ) {
							// Directly navigate to the search footer URL so the link is the same on
							// both mouse and keyboard.
							window.location.assign( searchFooterUrl.value );
						} else {
							// Otherwise, handle the option change as usual.
							handleOptionChange( 'selected', state.highlighted.value );
						}
					}

					expanded.value = false;
					break;

				case 'Tab':
					expanded.value = false;
					break;

				default:
					handleKeyNavigation( e );
					break;
			}
		}

		// Manually run onUpdateInputValue to fetch initial results.
		onMounted( () => {
			if ( props.initialInputValue ) {
				onUpdateInputValue( props.initialInputValue, true );
			}
		} );

		// When the options change, maybe show the menu.
		// This is the main method of opening the menu of the component, since showing the menu
		// depends mostly on whether there are any options to show.
		watch( computedOptions, ( newVal ) => {
			// Now that we have received a response, set the searchQuery to the value of the input.
			// This ensures that the search footer corresponds to the new search results.
			searchQuery.value = inputValue.value.trim();

			/**
			 * @return Whether the inputValue is equal to the current selection.
			 */
			function inputValueIsSelection() {
				return state.selected.value?.label === inputValue.value ||
					String( state.selected.value?.value ) === inputValue.value;
			}

			// Show the menu if there are options to show, and if the input value is not equal to
			// the current selection. The latter condition covers the case where, upon selecting an
			// option, computedOptions changes, but we don't want the menu to be open anymore.
			if ( newVal.length > 0 && isActive.value && !inputValueIsSelection() ) {
				expanded.value = true;
			}
		} );

		// When the input value changes...
		watch( inputValue, ( newVal ) => {
			// If there is a selection and it doesn't match the new value, clear it.
			if (
				state.selected.value &&
				state.selected.value.label !== newVal &&
				state.selected.value.value !== newVal
			) {
				selection.value = null;
			}

			// If the input is cleared, close the menu.
			if ( newVal === '' ) {
				expanded.value = false;
			}
		} );

		return {
			menuId,
			inputValue,
			searchQuery,
			computedSearchResults,
			state,
			expanded,
			handleOptionChange,
			rootClasses,
			rootStyle,
			otherAttrs,
			onUpdateInputValue,
			onFocus,
			onBlur,
			onSearchResultClick,
			onSearchFooterClick,
			onSubmit,
			onKeyNavigation,
			MenuFooterValue,
			searchIcon: cdxIconSearch,
			articleIcon: cdxIconArticleSearch
		};
	},
	methods: {
		/**
		 * Focus the component's input element.
		 *
		 * @public
		 */
		focus(): void {
			const textInput = this.$refs.textInput as InstanceType<typeof CdxTextInput>;
			// Run the TextInput component's focus method, which will set focus
			// to the <input> within.
			textInput.focus();
		}
	}
} );
</script>

<style lang="less">
@import ( reference ) 'wikimedia-ui-base/wikimedia-ui-base.less';
@import './../../themes/mixins/options-menu.less';

// TODO: add component-level tokens; many of these are repeated in ListTile.vue.
@font-size-browser: 16;
@font-size-base: 14 / @font-size-browser;
@font-size-list-tile-label: unit( ( 16 / @font-size-browser / @font-size-base ), em );

@size-search-figure: unit( ( 36 / @font-size-browser / @font-size-base ), em );
@size-input-icon-container: @padding-horizontal-input-text * 2 + @size-icon;

@padding-vertical-list-tile: 8px;
@padding-horizontal-list-tile: @padding-horizontal-base;
@margin-end-list-tile-thumb: @padding-horizontal-list-tile;

.cdx-typeahead-search {
	// Add `background-color` as `border` is around input including button.
	background-color: @background-color-base;
	// Border is styled the same as the input border to visually encapsulate search submit button.
	border: @border-base;
	border-radius: @border-radius-base;

	&__form {
		display: flex;
	}

	&__wrapper {
		flex-grow: 1;
		// Makes search results start at the same horizontal position as input.
		position: relative;
		// Set negative margin to make button border overlap with
		// `.cdx-typeahead-search`'s border.
		margin: -@border-width-base;
	}

	&__menu {
		.cdx-options-menu();

		&__option {
			// Unset Option padding since we'll apply padding to .cdx-list-tile instead.
			padding: 0;
			// Unset white-space: nowrap from Option.
			white-space: normal;
		}
	}

	&__submit {
		opacity: 0;
		position: relative;
		// Prevent submit button from shrinking on smaller viewports, which causes the button label
		// to overflow.
		flex-shrink: 0;
		// Set negative margin to make button border overlap with `.cdx-typeahead-search`'s border
		// on all but start margin.
		// The input already has a negative margin which causes part of the button's  border and
		// input's border to intentionally overlap.
		margin: -@border-width-base -@border-width-base -@border-width-base 0;
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;
		transition-property: opacity;
		transition-duration: @transition-duration-base;

		&:hover {
			// Make the button be on top of the input border when the button is hovered.
			z-index: 1;
		}

		&:focus {
			opacity: @opacity-base;
			// Make the button be on top of the input border when the input is hovered while the
			// button is focused.
			z-index: 1;
		}
	}

	&__search-footer {
		color: @color-base;
		display: flex;
		align-items: center;
		border-top: @border-width-base @border-style-base @border-color-heading;
		padding: @padding-vertical-list-tile @padding-horizontal-list-tile;
		text-decoration: none;
		cursor: pointer;

		&:visited,
		&:active {
			color: @color-base;
		}

		&__icon {
			color: @color-accessory;
			// Because the footer icon should line up vertically with the search result text when
			// `hideThumbnail` is true, we set its width to `auto` here instead of using the more
			// intuitive @size-search-figure variable so it doesn't have extra horizontal space.
			width: auto;
			height: @size-search-figure;
			margin-right: @padding-horizontal-base;
		}

		&__text {
			font-size: @font-size-list-tile-label;
		}
	}

	.cdx-text-input__input {
		border-right-color: transparent;
	}

	// Remove bottom-left border radius on input when the menu is open.
	&--expanded .cdx-text-input__input {
		border-bottom-left-radius: 0;
	}

	&--active,
	&:hover {
		.cdx-typeahead-search__submit {
			opacity: @opacity-base;
		}

		.cdx-text-input {
			// Allow the input's border to be on top of the parent's border when
			// focused or hovered.
			z-index: 1;
		}

		.cdx-text-input__input {
			border-top-right-radius: 0;
			border-bottom-right-radius: 0;
		}
	}

	&--show-thumbnail {
		// The amount of space between the typeahead search figure's parent component and the
		// typeahead search figure (input icon container, search result thumbnail, and footer icon
		// container). We want this space to be uniform so that the figures vertically line up
		// nicely. For pragmatic reasons, we use the horizontal padding of the list tile.
		@spacing-start-typeahead-search-figure: @padding-horizontal-list-tile;
		// The amount of spacing from the end of the input icon container, list tile
		// thumb, and footer icon container to the start of their associated text. We need the text
		// to vertically line up nicely. For pragmatic reasons, we use the spacing from the
		// list tile thumb.
		@spacing-end-typeahead-search-figure: @margin-end-list-tile-thumb;
		// The amount the width of the input increases when it is focused to allow for the extra
		// spacing around the search figures. The caret position should remain in place for the
		// smoothest transition.
		@size-typeahead-search-focus-addition: @spacing-start-typeahead-search-figure +
			@spacing-end-typeahead-search-figure;

		.cdx-text-input__input {
			padding-left: @size-search-figure;

			&:focus {
				position: relative;
				// Don't let the input grow over the search button.
				left: -@size-typeahead-search-focus-addition;
				width: calc( @size-full + @size-typeahead-search-focus-addition );
				// Keep the cursor in the same place on the screen.
				// stylelint-disable function-parentheses-newline-inside
				padding-left: calc( @spacing-start-typeahead-search-figure +
				@size-search-figure +
				@spacing-end-typeahead-search-figure );
				// stylelint-enable function-parentheses-newline-inside
			}
		}

		.cdx-text-input__start-icon {
			width: @size-search-figure;
		}

		.cdx-text-input__input:focus + .cdx-text-input__start-icon {
			// We use @border-width-base here since the input's start icon position is relative to
			// the input's container (which is outside the input's border) when the input has focus.
			left: -@size-typeahead-search-focus-addition +
				@spacing-start-typeahead-search-figure +
				@border-width-base;
		}

		.cdx-typeahead-search__menu {
			left: -@size-typeahead-search-focus-addition;
			width: calc( @size-full + @size-typeahead-search-focus-addition );
		}

		.cdx-list-tile {
			padding-right: @padding-horizontal-list-tile;
			padding-left: @spacing-start-typeahead-search-figure;
		}

		.cdx-typeahead-search__search-footer {
			padding-right: @padding-horizontal-list-tile;
			padding-left: @spacing-start-typeahead-search-figure;

			// stylelint-disable-next-line max-nesting-depth
			&__icon {
				// Prevent the icon container from shrinking when large text is present
				flex-shrink: 0;
				width: @size-search-figure;
			}

			// stylelint-disable-next-line max-nesting-depth
			&__text,
			&__query {
				// stylelint-disable-next-line plugin/no-unsupported-browser-features
				hyphens: auto;
				// Progressive enhancement. Fine to override unsupported Android 4. See T280982.
				word-break: break-word;
				// Legacy `word-wrap`; IE 6-11, Edge 12+, Firefox 3.5+, Chrome 4+, Safari 3.1+,
				// Opera 11.5+, iOS 3.2+, Android 2.1+
				// `overflow-wrap` is W3 standard, but it doesn't seem as if browser vendors will
				//  abandon `word-wrap` (it has wider support), therefore no duplication.
				word-wrap: break-word;
			}
		}
	}
}
</style>

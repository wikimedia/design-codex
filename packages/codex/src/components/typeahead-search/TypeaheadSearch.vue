<template>
	<div
		class="cdx-typeahead-search"
		:class="rootClasses"
		:style="rootStyle"
	>
		<form
			:id="id"
			ref="form"
			class="cdx-typeahead-search__form"
			:action="formAction"
			@submit="onSubmit"
		>
			<cdx-search-input
				ref="searchInput"
				v-model="inputValue"
				:button-label="buttonLabel"
				:use-button="useButton && !isMobileView"
				:hide-icon="isMobileView"
				:clearable="isMobileView"
				v-bind="otherAttrs"
				class="cdx-typeahead-search__input"
				name="search"
				role="combobox"
				autocomplete="off"
				aria-autocomplete="list"
				:aria-owns="showEmptyQueryResults && searchQuery.length === 0 ?
					menuId :
					undefined"
				:aria-controls="!showEmptyQueryResults || searchQuery.length > 0 ?
					menuId :
					undefined"
				:aria-expanded="expanded"
				:aria-activedescendant="highlightedId"
				@update:model-value="onUpdateInputValue"
				@focus="onFocus"
				@blur="onBlur"
				@keydown="onKeydown"
			>
				<cdx-menu
					:id="menuId"
					ref="menu"
					v-model:expanded="expanded"
					class="cdx-typeahead-search__menu"
					:show-pending="showPending"
					:selected="selection"
					:menu-items="searchResults"
					:footer="footer"
					:search-query="highlightQuery ? searchQuery : ''"
					:show-no-results-slot="searchQuery.length > 0 &&
						searchResults.length === 0 &&
						$slots['search-no-results-text'] &&
						$slots['search-no-results-text']().length > 0"
					v-bind="menuConfig"
					:aria-label="translatedSearchResultsLabel"
					@update:selected="onUpdateMenuSelection"
					@menu-item-click="( menuItem ) =>
						onSearchResultClick( asSearchResult( menuItem ) )"
					@menu-item-keyboard-navigation="onSearchResultKeyboardNavigation"
					@load-more="$emit( 'load-more' )"
				>
					<template #pending>
						<div
							class="cdx-menu-item__content cdx-typeahead-search__menu-message"
							:class="menuMessageClass"
						>
							<span class="cdx-typeahead-search__menu-message__text">
								<!--
									@slot A slot for a translated "Loading search results" message.
								-->
								<slot name="search-results-pending" />
							</span>
						</div>
					</template>
					<template #no-results>
						<div
							class="cdx-menu-item__content cdx-typeahead-search__menu-message"
							:class="menuMessageClass"
						>
							<span class="cdx-typeahead-search__menu-message__text">
								<!--
									@slot A slot for passing in a translated "no results" message.
								-->
								<slot name="search-no-results-text" />
							</span>
						</div>
					</template>
					<template #default="{ menuItem, active }">
						<a
							v-if="menuItem.value === MenuFooterValue"
							class="cdx-menu-item__content cdx-typeahead-search__search-footer"
							:class="{
								'cdx-typeahead-search__search-footer__active': active
							}"
							:href="asSearchResult( menuItem ).url"
							@click.capture.stop="onSearchFooterClick( asSearchResult( menuItem ) )"
						>
							<!-- eslint-disable max-len -->
							<cdx-icon
								class="cdx-menu-item__thumbnail cdx-typeahead-search__search-footer__icon"
								:icon="articleIcon"
							/>
							<span
								class="cdx-menu-item__text cdx-typeahead-search__search-footer__text"
							>
								<!-- eslint-enable max-len -->
								<!--
									@slot A slot for passing in translated search footer text.
									@binding {string} search-query Input text entered by the user
								-->
								<slot name="search-footer-text" :search-query="searchQuery">
									<strong class="cdx-typeahead-search__search-footer__query">
										{{ searchQuery }}
									</strong>
								</slot>
							</span>
						</a>
					</template>
				</cdx-menu>
			</cdx-search-input>

			<!--
				@slot A slot for passing hidden inputs, i.e.
				`<input type="hidden" name="language" value="en">`
			-->
			<slot />
		</form>
	</div>
</template>

<script lang="ts">
import { PropType, defineComponent, computed, ref, watch, onMounted, toRef, useId } from 'vue';
import { cdxIconArticleSearch } from '@wikimedia/codex-icons';
import CdxIcon from '../icon/Icon.vue';
import CdxMenu from '../menu/Menu.vue';
import CdxSearchInput from '../search-input/SearchInput.vue';
import useSplitAttributes from '../../composables/useSplitAttributes';
import useI18n from '../../composables/useI18n';
import { SearchResult, SearchResultWithId, SearchResultClickEvent, MenuItemDataWithId, MenuConfig } from '../../types';
import { DebounceInterval, PendingDelay, MenuFooterValue } from '../../constants';

/**
 * A search form that provides a menu with autocomplete suggestions.
 */
export default defineComponent( {
	name: 'CdxTypeaheadSearch',

	components: {
		CdxIcon,
		CdxMenu,
		CdxSearchInput
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
		 * List of search results. See the SearchResult type.
		 */
		searchResults: {
			type: Array as PropType<SearchResult[]>,
			required: true
		},
		/**
		 *
		 * Whether to display a submit button.
		 */
		useButton: {
			type: Boolean,
			default: false
		},
		// DEPRECATED: set default to 'Search' and remove validator (T368444).
		/**
		 * Custom label for the submit button.
		 *
		 * Omit this prop to use the default value, "Search".
		 */
		buttonLabel: {
			type: String,
			default: '',
			validator: ( value: string, props ) => {
				if ( value.length > 0 && !props.useButton ) {
					// eslint-disable-next-line no-console
					console.warn(
						`[CdxTypeaheadSearch]: The boolean \`useButton\` prop is required to show the search button.\n
Refer to https://doc.wikimedia.org/codex/latest/components/demos/typeahead-search.html#props.`
					);
					return false;
				}
				return true;
			}
		},
		/**
		 * Initial value for the text input.
		 *
		 * Triggers an initial `input` event on mount.
		 */
		initialInputValue: {
			type: String,
			default: ''
		},
		/**
		 * Link for the final menu item.
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
		 * Whether to show search results' thumbnails (or a placeholder icon).
		 */
		showThumbnail: {
			type: Boolean,
			default: false
		},
		/**
		 * Contract the width of the input when unfocused and expand the width of
		 * the input when focused to accommodate the extra width of the thumbnails.
		 *
		 * This prop is ignored if showThumbnail is false.
		 */
		autoExpandWidth: {
			type: Boolean,
			default: false
		},
		/**
		 * Limit the number of menu items to display before scrolling.
		 *
		 * Setting this prop to anything falsy will show all menu items.
		 *
		 * By default, all menu items are shown.
		 */
		visibleItemLimit: {
			type: Number as PropType<number|null>,
			default: null
		},
		/**
		 * By default, search results will be shown only when the query is not empty.
		 * When this prop is set to true, search results will be shown even if the query is empty
		 * This is used for empty search recommendations in Vector & MinervaNeue
		 */
		showEmptyQueryResults: {
			type: Boolean,
			default: false
		},
		/**
		 * When this prop is set to true, the UI will be modified to accommodate mobile devices,
		 * including making the button clearable and the removal of the search icon to save space
		 */
		isMobileView: {
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
		'input',
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
		'submit',
		/**
		 * When the user scrolls towards the bottom of the menu.
		 *
		 * If it is possible to add or load more menu items, then now would be a good moment
		 * so that the user can experience infinite scrolling.
		 */
		'load-more'
	],

	setup( props, { attrs, emit, slots } ) {
		const form = ref<HTMLFormElement>();
		const menu = ref<InstanceType<typeof CdxMenu>>();

		// Generated ID for menu; needed for aria-attributes.
		const menuId = useId();

		// Inject a translatable message string.
		const translatedSearchResultsLabel = useI18n( 'cdx-typeahead-search-search-results-label', 'Search results' );

		// Whether the menu should be displayed.
		const expanded = ref( false );

		// Whether the component is waiting on its parent to provide it with new search results.
		const pending = ref( false );
		// Whether to display the pending state indicators (in the Menu component). This is separate
		// from the `pending` ref because the pending state indicators are only displayed after a
		// delay, to avoid momentarily showing them to users with fast connections.
		const showPending = ref( false );

		// Whether the TypeaheadSearch input is focused.
		// TODO: consider changing this variable and the one in Lookup to `isFocused` for clarity.
		const isActive = ref( false );

		// Current text input value; initially set to the initialInputValue prop.
		const inputValue = ref( props.initialInputValue );

		// Current search query. This is the query for which search results have been fetched, and
		// will display in the search footer.
		// This will typically match the input value, except while results are being fetched and
		// if the user scrolls through results via the keyboard.
		const searchQuery = ref( '' );

		const highlightedId = computed( () => menu.value?.getHighlightedMenuItem()?.id );

		const selection = ref<string|number|null>( null );

		const menuMessageClass = computed( () => ( {
			'cdx-typeahead-search__menu-message--has-thumbnail': props.showThumbnail
		} ) );

		const selectedResult = computed( () => props.searchResults.find(
			( searchResult ) => searchResult.value === selection.value
		)
		);

		const footer = computed( () => props.searchFooterUrl && searchQuery.value.length > 0 ?
			{ value: MenuFooterValue, url: props.searchFooterUrl } :
			undefined
		);

		// Get helpers from useSplitAttributes.
		const internalClasses = computed( () => ( {
			'cdx-typeahead-search--expanded': expanded.value,
			// isMobileView will override thumbnail and autoExpandWidth classes because the
			// search input on mobile views shouldnt have extra space for thumbnails to save space
			'cdx-typeahead-search--show-thumbnail': props.showThumbnail && !props.isMobileView,
			'cdx-typeahead-search--auto-expand-width': props.showThumbnail && props.autoExpandWidth && !props.isMobileView
		} ) );
		const {
			rootClasses,
			rootStyle,
			otherAttrs
		} = useSplitAttributes( attrs, internalClasses );

		function asSearchResult( menuItem: MenuItemDataWithId ): SearchResultWithId {
			return menuItem as SearchResultWithId;
		}

		// Create MenuConfig to pass into Menu component.
		const menuConfig = computed( (): MenuConfig => ( {
			visibleItemLimit: props.visibleItemLimit,
			showThumbnail: props.showThumbnail,
			// In case search queries aren't highlighted, default to a bold label.
			boldLabel: true,
			hideDescriptionOverflow: true
		} ) );

		let debounceId: ReturnType<typeof setTimeout>|undefined;
		let pendingDelayId: ReturnType<typeof setTimeout>|undefined;

		/**
		 * Handle changes to the text input.
		 *
		 * 'input' events with the new value will be emitted, but this will be debounced if a
		 * positive debounceInterval is provided as a prop or if the default DebounceInterval is
		 * used.
		 *
		 * Pending state indicators will also be displayed after a brief delay, then removed once
		 * search results are received.
		 *
		 * TODO: use a library-wide debounce function.
		 *
		 * @param newVal New value of the text input
		 * @param immediate Whether to trigger event emission on leading edge
		 */
		function onUpdateInputValue( newVal: string, immediate = false ) {
			// If there is a selection and it doesn't match the new value, clear it.
			if (
				selectedResult.value &&
				selectedResult.value.label !== newVal &&
				selectedResult.value.value !== newVal
			) {
				selection.value = null;
			}

			// Always clear previous pending delay timeout function.
			if ( pendingDelayId !== undefined ) {
				clearTimeout( pendingDelayId );
				pendingDelayId = undefined;
			}

			if ( newVal === '' ) {
				// If the input is cleared, close the menu.
				expanded.value = false;
			} else {
				// Otherwise, we have new input. Set pending to true to indicate that new search
				// results are being fetched.
				pending.value = true;

				// After a delay, pending state indicators will be displayed to the user by
				// expanding the menu and setting the Menu component's `showPending` prop to true.
				// Note that this only happens if the `search-results-pending` slot is populated.
				if ( slots[ 'search-results-pending' ] ) {
					pendingDelayId = setTimeout( () => {
						if ( isActive.value ) {
							expanded.value = true;
						}
						showPending.value = true;
					}, PendingDelay );
				}
			}

			// Cancel the last setTimeout callback in case it hasn't executed yet.
			if ( debounceId !== undefined ) {
				clearTimeout( debounceId );
				debounceId = undefined;
			}

			const handleUpdateInputValue = () => {
				emit( 'input', newVal );
			};

			if ( immediate ) {
				handleUpdateInputValue();
			} else {
				debounceId = setTimeout( () => {
					handleUpdateInputValue();
				}, props.debounceInterval );
			}
		}

		function onUpdateMenuSelection( newVal: string|number|null ) {
			if ( newVal === MenuFooterValue ) {
				// If we're trying to select the footer, clear the selection instead
				selection.value = null;
				// and restore the text in the input
				inputValue.value = searchQuery.value;
				return;
			}

			selection.value = newVal;
			// If there is a newVal, including an empty string...
			if ( newVal !== null ) {
				// If there is a search result selected, show the label (or the value, if there
				// is no label). Otherwise, set the input to empty.
				inputValue.value = selectedResult.value ?
					selectedResult.value.label ?? String( selectedResult.value.value ) :
					'';
			}
		}

		function onFocus() {
			isActive.value = true;

			if (
				searchQuery.value ||
				showPending.value ||
				( props.showEmptyQueryResults && props.searchResults.length > 0 )
			) {

				expanded.value = true;
			}
		}

		function onBlur() {
			isActive.value = false;
			expanded.value = false;
		}

		/**
		 * Handle a click on a search result,
		 * emitting event data if it was a real result.
		 *
		 * @param searchResult
		 */
		function onSearchResultClick( searchResult: SearchResultWithId ) {
			// First, process the search result. We can ditch the generated ID, and if this is the
			// search footer, we don't want to emit a search result.
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { id, ...resultWithoutId } = searchResult;
			if ( resultWithoutId.value === MenuFooterValue ) {
				emit( 'search-result-click', {
					searchResult: null,
					index: props.searchResults.length,
					numberOfResults: props.searchResults.length
				} );
				return;
			}

			emitSearchResultClick( resultWithoutId );
		}

		/**
		 * Emit event data for a selected real search result on click.
		 *
		 * @param searchResult
		 */
		function emitSearchResultClick( searchResult: SearchResult ) {
			const searchResultClickEvent: SearchResultClickEvent = {
				searchResult,
				index: props.searchResults.findIndex(
					( r ) => r.value === searchResult.value
				),
				numberOfResults: props.searchResults.length
			};

			emit( 'search-result-click', searchResultClickEvent );
		}

		/**
		 * When the user reaches a search result via keyboard navigation, update
		 * the input value to that item's label or value
		 *
		 * @param searchResult
		 */
		function onSearchResultKeyboardNavigation( searchResult: SearchResultWithId ) {
			// Don't set the input to the value of the menu footer, revert to search query instead
			if ( searchResult.value === MenuFooterValue ) {
				inputValue.value = searchQuery.value;
				return;
			}

			inputValue.value = searchResult.value ?
				searchResult.label ?? String( searchResult.value ) :
				'';
		}

		/**
		 * Handle search footer click.
		 *
		 * Unlike search results, when the search footer is clicked, we don't want the selection
		 * value to be updated to the value of the search footer item. So, we handle this case
		 * separately here.
		 *
		 * @param footerMenuItem
		 */
		function onSearchFooterClick( footerMenuItem: SearchResultWithId ) {
			// Like we would with other menu items, close the menu and clear the active item.
			expanded.value = false;
			menu.value?.clearActive();

			// Run the search result click handler.
			onSearchResultClick( footerMenuItem );
		}

		/**
		 * Emit event data on form submit.
		 *
		 * @param e
		 */
		function onSubmit( e: Event ) {
			if ( selectedResult.value ) {
				// Treat submit with a selected result like a click on the result:
				// Emit a click event instead of the submit event...
				emitSearchResultClick( selectedResult.value );
				e.stopPropagation();
				// ...and navigate to the URL instead of submitting the form.
				window.location.assign( selectedResult.value.url );
				e.preventDefault();
			} else {
				// Emit event for no selection.
				const submitEvent: SearchResultClickEvent = {
					searchResult: null,
					index: -1,
					numberOfResults: props.searchResults.length
				};
				emit( 'submit', submitEvent );
			}
		}

		/**
		 * Respond to key navigation.
		 *
		 * This component has some special cases it needs to cover, then will relegate the rest to
		 * the delegateKeyNavigation function provided by useMenu.
		 *
		 * @param e
		 */
		function onKeydown( e: KeyboardEvent ) {
			if (
				!menu.value ||
				( !searchQuery.value && !props.showEmptyQueryResults ) ||
				e.key === ' '
			) {
				return;
			}

			const highlightedResult = menu.value.getHighlightedMenuItem();
			const resultHighlightedViaKeyboard = menu.value.getHighlightedViaKeyboard();
			switch ( e.key ) {
				case 'Enter':
					if ( highlightedResult ) {
						// If this is the search footer and it was highlighted via keyboard nav...
						if (
							highlightedResult.value === MenuFooterValue &&
							resultHighlightedViaKeyboard
						) {
							// Directly navigate to the search footer URL so the link is the same on
							// both mouse and keyboard.
							window.location.assign( props.searchFooterUrl );
						} else {
							// Otherwise, handle the item change as usual. But don't prevent the
							// event, otherwise the form won't be submitted
							menu.value.delegateKeyNavigation( e, { prevent: false } );
						}
					}

					expanded.value = false;
					break;

				case 'Tab':
					expanded.value = false;
					break;

				default:
					menu.value.delegateKeyNavigation( e );
					break;
			}
		}

		// Manually run onUpdateInputValue to fetch initial results.
		onMounted( () => {
			if ( props.initialInputValue ) {
				onUpdateInputValue( props.initialInputValue, true );
			}
		} );

		// When the menu items change, maybe show the menu.
		// This is the main method of opening the menu of the component, since showing the menu
		// depends mostly on whether there are any menu items to show.
		watch( toRef( props, 'searchResults' ), () => {
			// Now that we have received a response, set the searchQuery to the value of the input.
			// This ensures that the search footer corresponds to the new search results.
			searchQuery.value = inputValue.value.trim();

			// Show the menu if:
			// 1. The input is currently focused
			// 2. Pending state is true, which indicates that the new searchResults value was
			//    returned after new user input
			// 3. The input is not empty or the showEmptyQueryResults prop is true
			// Whether we open the menu doesn't depend on whether there are results to show, because
			// we always show the search footer, even if there are no results and the no-results
			// slot is not set.
			// Note that the menu may already have been expanded if the pending delay threshold has
			// been met and the pending state is being displayed to the user.
			if (
				isActive.value &&
				// The user has entered input and new results were fetched.
				( pending.value && searchQuery.value.length > 0 ) ||
				// There are empty search results suggestions to show.
				( props.showEmptyQueryResults && props.searchResults.length > 0 )
			) {
				expanded.value = true;
			}

			// Make sure pending doesn't get set to true by clearing the timeout function, and
			// explicitly set pending to false.
			if ( pendingDelayId !== undefined ) {
				clearTimeout( pendingDelayId );
				pendingDelayId = undefined;
			}
			pending.value = false;
			showPending.value = false;
		} );

		return {
			form,
			menu,
			menuId,
			highlightedId,
			selection,
			menuMessageClass,
			footer,
			asSearchResult,
			inputValue,
			searchQuery,
			expanded,
			showPending,
			rootClasses,
			rootStyle,
			otherAttrs,
			menuConfig,
			onUpdateInputValue,
			onUpdateMenuSelection,
			onFocus,
			onBlur,
			onSearchResultClick,
			onSearchResultKeyboardNavigation,
			onSearchFooterClick,
			onSubmit,
			onKeydown,
			MenuFooterValue,
			articleIcon: cdxIconArticleSearch,
			translatedSearchResultsLabel
		};
	},
	methods: {
		/**
		 * Focus the component's input element.
		 *
		 * @public
		 */
		focus(): void {
			const searchInput = this.$refs.searchInput as InstanceType<typeof CdxSearchInput>;
			// Run the searchInput component's focus method, which will set focus
			// to the <input> within.
			searchInput.focus();
		}
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';
@import ( reference ) '../../themes/mixins/common.less';
@import ( reference ) '../../themes/mixins/icon-alignment.less';

.cdx-typeahead-search {
	&__menu.cdx-menu {
		border-top-left-radius: @border-radius-sharp;
		border-top-right-radius: @border-radius-sharp;
	}

	.cdx-menu-item {
		// Unset padding so we can add it to the anchor elements instead. This is necessary to get
		// proper styling on the search footer.
		padding: 0;

		&__content {
			padding: @spacing-50 @spacing-75;
		}
	}

	&__search-footer {
		&.cdx-menu-item {
			box-sizing: @box-sizing-base;
			// Set `min-height` on the footer so that it has the same height as the search results.
			// We can't set it on `&__icon` because the icon would get scaled itself.
			// Clarify origin of value by calculation instead of component token.
			/* stylelint-disable-next-line scale-unlimited/declaration-strict-value */
			min-height: @min-size-search-figure + ( 2 * @spacing-50 );

			&:visited {
				color: @color-base;
			}

			&:hover {
				text-decoration: @text-decoration-none;
				cursor: @cursor-base--hover;
			}
		}

		&__icon.cdx-icon {
			color: @color-subtle;
			margin-right: @spacing-50;
		}

		// We cannot use a pseudo class ":active" because that does not work
		// in firefox due to the use of "preventDefault" in the menuItem component
		&__active.cdx-menu-item {
			.cdx-typeahead-search__search-footer__icon.cdx-icon,
			.cdx-typeahead-search__search-footer__text {
				color: @color-progressive;
			}
		}
	}

	// When props showThumbnail is true, special menu messages (like no results and pending) should
	// have different padding.
	.cdx-typeahead-search__menu-message--has-thumbnail {
		padding-left: @spacing-125;
	}

	&--expanded &__input.cdx-search-input .cdx-text-input {
		border-bottom-left-radius: @border-radius-sharp;
		border-bottom-right-radius: @border-radius-sharp;
	}

	// TODO: Overwrite TextInput default to feature px based `min-size-icon-medium`.
	// Revisit and remove as soon as we're providing legacy theme to Vector at 14px base.
	.cdx-text-input--has-start-icon {
		.cdx-text-input__input {
			.cdx-mixin-icon-wrapper-padding(
				start,
				@spacing-50,
				@param-size-icon: @min-size-icon-medium
			);
		}
	}

	&--show-thumbnail {
		&.cdx-typeahead-search--auto-expand-width:not( .cdx-typeahead-search--expanded ) {
			margin-left: @spacing-typeahead-search-focus-addition;
		}

		&:not( .cdx-typeahead-search--auto-expand-width ),
		&.cdx-typeahead-search--auto-expand-width.cdx-typeahead-search--expanded {
			margin-left: 0;

			.cdx-text-input__input {
				.cdx-mixin-icon-wrapper-padding(
					start,
					@spacing-start-typeahead-search-figure,
					@min-size-search-figure
				);
			}

			.cdx-text-input__start-icon {
				.cdx-mixin-icon(
					start,
					@param-external-padding: @spacing-start-typeahead-search-icon );
			}
		}

		.cdx-typeahead-search__search-footer {
			&__icon {
				// Prevent the icon container from shrinking when large text is present.
				flex-shrink: 0;
				// Prevent the icon container from shrinking on smaller base font sizes.
				min-width: @min-size-search-figure;
				width: @size-search-figure;
				margin-right: 0;
			}
		}
	}

	// Remove border-top when search-footer is the only menu item
	.cdx-menu-item:first-child {
		.cdx-typeahead-search__search-footer {
			border-top: unset;
		}
	}
}
</style>

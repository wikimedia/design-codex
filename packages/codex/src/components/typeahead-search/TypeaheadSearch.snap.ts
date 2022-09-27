// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`TypeaheadSearch initial state Case 0 Default: ({"buttonLabel": "Search", "formAction": "/w/index.php", "id": "foo", "placeholder": "Search Wikipedia", "searchResults": [Array], "searchResultsLabel": "Search results"}) => HTML 1`] = `
<div
  class="cdx-typeahead-search"
>
  <form
    action="/w/index.php"
    class="cdx-typeahead-search__form"
    id="foo"
  >
    <div
      class="cdx-search-input cdx-search-input--has-end-button cdx-typeahead-search__input"
    >
      <div
        class="cdx-search-input__input-wrapper"
      >
        <div
          class="cdx-text-input cdx-text-input--has-start-icon cdx-search-input__text-input"
        >
          <input
            aria-autocomplete="list"
            aria-expanded="false"
            aria-owns="cdx-typeahead-search-menu-0"
            autocomplete="off"
            class="cdx-text-input__input"
            name="search"
            placeholder="Search Wikipedia"
            role="combobox"
            type="search"
          />
          <span
            class="cdx-icon cdx-text-input__icon cdx-text-input__start-icon"
          >
            <svg
              aria-hidden="true"
              height="20"
              viewBox="0 0 20 20"
              width="20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <!--v-if-->
              <!-- eslint-disable vue/no-v-html -->
              <g
                fill="currentColor"
              >
                <path
                  d="M12.2 13.6a7 7 0 111.4-1.4l5.4 5.4-1.4 1.4zM3 8a5 5 0 1010 0A5 5 0 003 8z"
                />
              </g>
            </svg>
          </span>
          <!--v-if-->
          <!--v-if-->
        </div>
        <!--
				@slot A slot for passing in an options menu that needs to be positioned
				relatively to the text input. See TypeaheadSearch for sample usage.
			-->
        
        <div
          class="cdx-menu"
          style="display: none;"
        >
          <ul
            aria-label="Search results"
            aria-multiselectable="false"
            class="cdx-menu__listbox"
            id="cdx-typeahead-search-menu-0"
            role="listbox"
          >
            <!--v-if-->
            <!--v-if-->
            
            
            <!--v-if-->
          </ul>
        </div>
        
      </div>
      <button
        class="cdx-button cdx-button--action-default cdx-button--type-normal cdx-button--framed cdx-search-input__end-button"
      >
        <!-- @slot Button content -->
        
        Search
        
      </button>
    </div>
    <!--
				@slot A slot for passing hidden inputs, i.e.
				\`&lt;input type="hidden" name="language" value="en"&gt;\`
			-->
    
    
    <input
      name="title"
      type="hidden"
      value="Special:Search"
    />
    
    
  </form>
</div>
`;

exports[`TypeaheadSearch initial state Case 1 With \`autoExpandWidth\` true and \`showThumbnail\` true: ({"autoExpandWidth": true, "buttonLabel": "Search", "formAction": "/w/index.php", "id": "foo", "placeholder": "Search Wikipedia", "searchResults": [Array], "searchResultsLabel": "Search results", "showThumbnail": true}) => HTML 1`] = `
<div
  class="cdx-typeahead-search cdx-typeahead-search--show-thumbnail cdx-typeahead-search--auto-expand-width"
>
  <form
    action="/w/index.php"
    class="cdx-typeahead-search__form"
    id="foo"
  >
    <div
      class="cdx-search-input cdx-search-input--has-end-button cdx-typeahead-search__input"
    >
      <div
        class="cdx-search-input__input-wrapper"
      >
        <div
          class="cdx-text-input cdx-text-input--has-start-icon cdx-search-input__text-input"
        >
          <input
            aria-autocomplete="list"
            aria-expanded="false"
            aria-owns="cdx-typeahead-search-menu-1"
            autocomplete="off"
            class="cdx-text-input__input"
            name="search"
            placeholder="Search Wikipedia"
            role="combobox"
            type="search"
          />
          <span
            class="cdx-icon cdx-text-input__icon cdx-text-input__start-icon"
          >
            <svg
              aria-hidden="true"
              height="20"
              viewBox="0 0 20 20"
              width="20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <!--v-if-->
              <!-- eslint-disable vue/no-v-html -->
              <g
                fill="currentColor"
              >
                <path
                  d="M12.2 13.6a7 7 0 111.4-1.4l5.4 5.4-1.4 1.4zM3 8a5 5 0 1010 0A5 5 0 003 8z"
                />
              </g>
            </svg>
          </span>
          <!--v-if-->
          <!--v-if-->
        </div>
        <!--
				@slot A slot for passing in an options menu that needs to be positioned
				relatively to the text input. See TypeaheadSearch for sample usage.
			-->
        
        <div
          class="cdx-menu"
          style="display: none;"
        >
          <ul
            aria-label="Search results"
            aria-multiselectable="false"
            class="cdx-menu__listbox"
            id="cdx-typeahead-search-menu-1"
            role="listbox"
          >
            <!--v-if-->
            <!--v-if-->
            
            
            <!--v-if-->
          </ul>
        </div>
        
      </div>
      <button
        class="cdx-button cdx-button--action-default cdx-button--type-normal cdx-button--framed cdx-search-input__end-button"
      >
        <!-- @slot Button content -->
        
        Search
        
      </button>
    </div>
    <!--
				@slot A slot for passing hidden inputs, i.e.
				\`&lt;input type="hidden" name="language" value="en"&gt;\`
			-->
    
    
    <input
      name="title"
      type="hidden"
      value="Special:Search"
    />
    
    
  </form>
</div>
`;

exports[`TypeaheadSearch initial state Case 2 With \`autoExpandWidth\` true and \`showThumbnail\` false: ({"autoExpandWidth": true, "buttonLabel": "Search", "formAction": "/w/index.php", "id": "foo", "placeholder": "Search Wikipedia", "searchResults": [Array], "searchResultsLabel": "Search results", "showThumbnail": false}) => HTML 1`] = `
<div
  class="cdx-typeahead-search"
>
  <form
    action="/w/index.php"
    class="cdx-typeahead-search__form"
    id="foo"
  >
    <div
      class="cdx-search-input cdx-search-input--has-end-button cdx-typeahead-search__input"
    >
      <div
        class="cdx-search-input__input-wrapper"
      >
        <div
          class="cdx-text-input cdx-text-input--has-start-icon cdx-search-input__text-input"
        >
          <input
            aria-autocomplete="list"
            aria-expanded="false"
            aria-owns="cdx-typeahead-search-menu-2"
            autocomplete="off"
            class="cdx-text-input__input"
            name="search"
            placeholder="Search Wikipedia"
            role="combobox"
            type="search"
          />
          <span
            class="cdx-icon cdx-text-input__icon cdx-text-input__start-icon"
          >
            <svg
              aria-hidden="true"
              height="20"
              viewBox="0 0 20 20"
              width="20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <!--v-if-->
              <!-- eslint-disable vue/no-v-html -->
              <g
                fill="currentColor"
              >
                <path
                  d="M12.2 13.6a7 7 0 111.4-1.4l5.4 5.4-1.4 1.4zM3 8a5 5 0 1010 0A5 5 0 003 8z"
                />
              </g>
            </svg>
          </span>
          <!--v-if-->
          <!--v-if-->
        </div>
        <!--
				@slot A slot for passing in an options menu that needs to be positioned
				relatively to the text input. See TypeaheadSearch for sample usage.
			-->
        
        <div
          class="cdx-menu"
          style="display: none;"
        >
          <ul
            aria-label="Search results"
            aria-multiselectable="false"
            class="cdx-menu__listbox"
            id="cdx-typeahead-search-menu-2"
            role="listbox"
          >
            <!--v-if-->
            <!--v-if-->
            
            
            <!--v-if-->
          </ul>
        </div>
        
      </div>
      <button
        class="cdx-button cdx-button--action-default cdx-button--type-normal cdx-button--framed cdx-search-input__end-button"
      >
        <!-- @slot Button content -->
        
        Search
        
      </button>
    </div>
    <!--
				@slot A slot for passing hidden inputs, i.e.
				\`&lt;input type="hidden" name="language" value="en"&gt;\`
			-->
    
    
    <input
      name="title"
      type="hidden"
      value="Special:Search"
    />
    
    
  </form>
</div>
`;

exports[`TypeaheadSearch, with no results matches the snapshot 1`] = `
<div
  class="cdx-typeahead-search cdx-typeahead-search--show-thumbnail"
>
  <form
    action="/w/index.php"
    class="cdx-typeahead-search__form"
    id="foo"
  >
    <div
      class="cdx-search-input cdx-search-input--has-end-button cdx-typeahead-search__input"
    >
      <div
        class="cdx-search-input__input-wrapper"
      >
        <div
          class="cdx-text-input cdx-text-input--has-start-icon cdx-search-input__text-input"
        >
          <input
            aria-autocomplete="list"
            aria-expanded="false"
            aria-owns="cdx-typeahead-search-menu-59"
            autocomplete="off"
            class="cdx-text-input__input cdx-text-input__input--has-value"
            name="search"
            placeholder="Search Wikipedia"
            role="combobox"
            type="search"
          />
          <span
            class="cdx-icon cdx-text-input__icon cdx-text-input__start-icon"
          >
            <svg
              aria-hidden="true"
              height="20"
              viewBox="0 0 20 20"
              width="20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <!--v-if-->
              <!-- eslint-disable vue/no-v-html -->
              <g
                fill="currentColor"
              >
                <path
                  d="M12.2 13.6a7 7 0 111.4-1.4l5.4 5.4-1.4 1.4zM3 8a5 5 0 1010 0A5 5 0 003 8z"
                />
              </g>
            </svg>
          </span>
          <!--v-if-->
          <!--v-if-->
        </div>
        <!--
				@slot A slot for passing in an options menu that needs to be positioned
				relatively to the text input. See TypeaheadSearch for sample usage.
			-->
        
        <div
          class="cdx-menu"
          style="display: none;"
        >
          <ul
            aria-label="Search results"
            aria-multiselectable="false"
            class="cdx-menu__listbox"
            id="cdx-typeahead-search-menu-59"
            role="listbox"
          >
            <!--v-if-->
            <li
              class="cdx-menu__no-results cdx-menu-item"
            >
              <!--
					@slot Message to show if there are no menu items to display.
				-->
              
              <div
                class="cdx-typeahead-search__menu-message cdx-typeahead-search__menu-message--has-thumbnail"
              >
                <span
                  class="cdx-typeahead-search__menu-message__text"
                >
                  <!--
									@slot A slot for passing in a translated "no results" message.
								-->
                  
                  No results found
                  
                </span>
              </div>
              
            </li>
            
            <li
              aria-disabled="false"
              aria-selected="false"
              class="cdx-menu-item cdx-menu-item--enabled cdx-menu-item--bold-label cdx-menu-item--hide-description-overflow"
              id="cdx-menu-item-61"
              role="option"
            >
              <!-- @slot Custom menu item content. -->
              
              <!--
					@slot Display of an individual item in the menu
					@binding {MenuItem} menuItem The current menu item
					@binding {boolean} active Whether the current item is visually active
				-->
              
              <a
                class="cdx-typeahead-search__search-footer"
                href="https://foo.org/search?query=Co"
              >
                <span
                  class="cdx-icon cdx-typeahead-search__search-footer__icon"
                >
                  <svg
                    aria-hidden="true"
                    height="20"
                    viewBox="0 0 20 20"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <!--v-if-->
                    <!-- eslint-disable vue/no-v-html -->
                    <g
                      fill="currentColor"
                    >
                      <path
                        d="M12.43 14.34A5 5 0 0110 15a5 5 0 113.95-2L17 16.09V3a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 001.45-.63z"
                      />
                      <circle
                        cx="10"
                        cy="10"
                        r="3"
                      />
                    </g>
                  </svg>
                </span>
                <span
                  class="cdx-typeahead-search__search-footer__text"
                >
                  <!--
									@slot A slot for passing in translated search footer text.
									@binding {string} searchQuery Input text entered by the user
								-->
                  
                  <strong
                    class="cdx-typeahead-search__search-footer__query"
                  >
                    Co
                  </strong>
                  
                </span>
              </a>
              
              
            </li>
            
            <!--v-if-->
          </ul>
        </div>
        
      </div>
      <button
        class="cdx-button cdx-button--action-default cdx-button--type-normal cdx-button--framed cdx-search-input__end-button"
      >
        <!-- @slot Button content -->
        
        Search
        
      </button>
    </div>
    <!--
				@slot A slot for passing hidden inputs, i.e.
				\`&lt;input type="hidden" name="language" value="en"&gt;\`
			-->
    
    
    <input
      name="title"
      type="hidden"
      value="Special:Search"
    />
    
    
  </form>
</div>
`;

exports[`TypeaheadSearch, with search results matches the snapshot 1`] = `
<div
  class="cdx-typeahead-search cdx-typeahead-search--show-thumbnail"
>
  <form
    action="/w/index.php"
    class="cdx-typeahead-search__form"
    id="foo"
  >
    <div
      class="cdx-search-input cdx-search-input--has-end-button cdx-typeahead-search__input"
    >
      <div
        class="cdx-search-input__input-wrapper"
      >
        <div
          class="cdx-text-input cdx-text-input--has-start-icon cdx-search-input__text-input"
        >
          <input
            aria-autocomplete="list"
            aria-expanded="false"
            aria-owns="cdx-typeahead-search-menu-14"
            autocomplete="off"
            class="cdx-text-input__input cdx-text-input__input--has-value"
            name="search"
            placeholder="Search Wikipedia"
            role="combobox"
            type="search"
          />
          <span
            class="cdx-icon cdx-text-input__icon cdx-text-input__start-icon"
          >
            <svg
              aria-hidden="true"
              height="20"
              viewBox="0 0 20 20"
              width="20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <!--v-if-->
              <!-- eslint-disable vue/no-v-html -->
              <g
                fill="currentColor"
              >
                <path
                  d="M12.2 13.6a7 7 0 111.4-1.4l5.4 5.4-1.4 1.4zM3 8a5 5 0 1010 0A5 5 0 003 8z"
                />
              </g>
            </svg>
          </span>
          <!--v-if-->
          <!--v-if-->
        </div>
        <!--
				@slot A slot for passing in an options menu that needs to be positioned
				relatively to the text input. See TypeaheadSearch for sample usage.
			-->
        
        <div
          class="cdx-menu"
          style="display: none;"
        >
          <ul
            aria-label="Search results"
            aria-multiselectable="false"
            class="cdx-menu__listbox"
            id="cdx-typeahead-search-menu-14"
            role="listbox"
          >
            <!--v-if-->
            <!--v-if-->
            
            <li
              aria-disabled="false"
              aria-selected="false"
              class="cdx-menu-item cdx-menu-item--enabled cdx-menu-item--bold-label cdx-menu-item--hide-description-overflow"
              id="cdx-menu-item-16"
              role="option"
            >
              <!-- @slot Custom menu item content. -->
              
              <a
                class="cdx-menu-item__content"
                href="https://en.wikipedia.org/wiki/CO"
              >
                <!-- Thumbnail, thumbnail placeholder, or icon. -->
                <span
                  class="cdx-thumbnail cdx-menu-item__thumbnail"
                >
                  <span
                    class="cdx-thumbnail__placeholder"
                  >
                    <span
                      class="cdx-icon cdx-thumbnail__placeholder__icon"
                    >
                      <svg
                        aria-hidden="true"
                        height="20"
                        viewBox="0 0 20 20"
                        width="20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <!--v-if-->
                        <!-- eslint-disable vue/no-v-html -->
                        <g
                          fill="currentColor"
                        >
                          <path
                            d="M19 3H1v14h18zM3 14l3.5-4.5 2.5 3L12.5 8l4.5 6z"
                          />
                          <path
                            d="M19 5H1V3h18zm0 12H1v-2h18z"
                          />
                        </g>
                      </svg>
                    </span>
                  </span>
                  <transition-stub>
                    <!--v-if-->
                  </transition-stub>
                </span>
                <!-- Item text. -->
                <span
                  class="cdx-menu-item__text"
                >
                  <!-- Item label. -->
                  <span
                    class="cdx-menu-item__text__label"
                  >
                    <bdi>
                      Co
                    </bdi>
                  </span>
                  <!-- Item search query match (e.g. alias). -->
                  <!--v-if-->
                  <!-- Item description. -->
                  <!--v-if-->
                </span>
              </a>
              
            </li>
            <li
              aria-disabled="false"
              aria-selected="false"
              class="cdx-menu-item cdx-menu-item--enabled cdx-menu-item--bold-label cdx-menu-item--has-description cdx-menu-item--hide-description-overflow"
              id="cdx-menu-item-17"
              role="option"
            >
              <!-- @slot Custom menu item content. -->
              
              <a
                class="cdx-menu-item__content"
                href="https://en.wikipedia.org/wiki/Color"
              >
                <!-- Thumbnail, thumbnail placeholder, or icon. -->
                <span
                  class="cdx-thumbnail cdx-menu-item__thumbnail"
                >
                  <span
                    class="cdx-thumbnail__placeholder"
                  >
                    <span
                      class="cdx-icon cdx-thumbnail__placeholder__icon"
                    >
                      <svg
                        aria-hidden="true"
                        height="20"
                        viewBox="0 0 20 20"
                        width="20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <!--v-if-->
                        <!-- eslint-disable vue/no-v-html -->
                        <g
                          fill="currentColor"
                        >
                          <path
                            d="M19 3H1v14h18zM3 14l3.5-4.5 2.5 3L12.5 8l4.5 6z"
                          />
                          <path
                            d="M19 5H1V3h18zm0 12H1v-2h18z"
                          />
                        </g>
                      </svg>
                    </span>
                  </span>
                  <transition-stub>
                    <!--v-if-->
                  </transition-stub>
                </span>
                <!-- Item text. -->
                <span
                  class="cdx-menu-item__text"
                >
                  <!-- Item label. -->
                  <span
                    class="cdx-menu-item__text__label"
                  >
                    <bdi>
                      Color
                    </bdi>
                  </span>
                  <!-- Item search query match (e.g. alias). -->
                  <!--v-if-->
                  <!-- Item description. -->
                  <span
                    class="cdx-menu-item__text__description"
                  >
                    <bdi>
                      visual perception of light wavelengths
                    </bdi>
                  </span>
                </span>
              </a>
              
            </li>
            <li
              aria-disabled="false"
              aria-selected="false"
              class="cdx-menu-item cdx-menu-item--enabled cdx-menu-item--bold-label cdx-menu-item--hide-description-overflow"
              id="cdx-menu-item-18"
              role="option"
            >
              <!-- @slot Custom menu item content. -->
              
              <!--
					@slot Display of an individual item in the menu
					@binding {MenuItem} menuItem The current menu item
					@binding {boolean} active Whether the current item is visually active
				-->
              
              <a
                class="cdx-typeahead-search__search-footer"
                href="https://foo.org/search?query=Co"
              >
                <span
                  class="cdx-icon cdx-typeahead-search__search-footer__icon"
                >
                  <svg
                    aria-hidden="true"
                    height="20"
                    viewBox="0 0 20 20"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <!--v-if-->
                    <!-- eslint-disable vue/no-v-html -->
                    <g
                      fill="currentColor"
                    >
                      <path
                        d="M12.43 14.34A5 5 0 0110 15a5 5 0 113.95-2L17 16.09V3a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 001.45-.63z"
                      />
                      <circle
                        cx="10"
                        cy="10"
                        r="3"
                      />
                    </g>
                  </svg>
                </span>
                <span
                  class="cdx-typeahead-search__search-footer__text"
                >
                  <!--
									@slot A slot for passing in translated search footer text.
									@binding {string} searchQuery Input text entered by the user
								-->
                  
                  <strong
                    class="cdx-typeahead-search__search-footer__query"
                  >
                    Co
                  </strong>
                  
                </span>
              </a>
              
              
            </li>
            
            <!--v-if-->
          </ul>
        </div>
        
      </div>
      <button
        class="cdx-button cdx-button--action-default cdx-button--type-normal cdx-button--framed cdx-search-input__end-button"
      >
        <!-- @slot Button content -->
        
        Search
        
      </button>
    </div>
    <!--
				@slot A slot for passing hidden inputs, i.e.
				\`&lt;input type="hidden" name="language" value="en"&gt;\`
			-->
    
    
    <input
      name="title"
      type="hidden"
      value="Special:Search"
    />
    
    
  </form>
</div>
`;

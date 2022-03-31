// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`Basic usage Case 0 No selection: ([[Object], [Object], [Object], [Object]]) => HTML 1`] = `
<div
  class="cdx-select cdx-select--no-selections"
>
  <div
    aria-autocomplete="list"
    aria-disabled="false"
    aria-expanded="false"
    aria-haspopup="listbox"
    aria-labelledby="cdx-select-handle-0"
    aria-owns="cdx-select-menu-1"
    class="cdx-select__handle"
    role="combobox"
    tabindex="0"
  >
    <span
      aria-readonly="true"
      id="cdx-select-handle-0"
      role="textbox"
    >
      <!--
					@slot Display of the current selection or default label
					@binding {MenuItemData|undefined} selectedMenuItem The currently selected menu
					item
					@binding {string} defaultLabel The default label, provided via a prop
				-->
      
      Choose an option
      
    </span>
    <span
      class="cdx-icon cdx-select__indicator"
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
            d="m17.5 4.75-7.5 7.5-7.5-7.5L1 6.25l9 9 9-9z"
          />
        </g>
      </svg>
    </span>
  </div>
  <ul
    aria-multiselectable="false"
    class="cdx-menu"
    id="cdx-select-menu-1"
    role="listbox"
    style="display: none;"
  >
    <!--v-if-->
    
    <li
      aria-disabled="false"
      aria-selected="false"
      class="cdx-menu-item cdx-menu-item--enabled"
      id="cdx-menu-item-2"
      role="option"
    >
      <!-- @slot Custom menu item content. -->
      
      <span
        class="cdx-menu-item__content"
      >
        <!-- Thumbnail, thumbnail placeholder, or icon. -->
        <!--v-if-->
        <!-- Item text. -->
        <span
          class="cdx-menu-item__text"
        >
          <!-- Item label. -->
          <span
            class="cdx-menu-item__text__label"
          >
            <bdi>
              Option A
            </bdi>
          </span>
          <!-- Item search query match (e.g. alias). -->
          <!--v-if-->
          <!-- Item description. -->
          <!--v-if-->
        </span>
      </span>
      
    </li>
    <li
      aria-disabled="false"
      aria-selected="false"
      class="cdx-menu-item cdx-menu-item--enabled"
      id="cdx-menu-item-3"
      role="option"
    >
      <!-- @slot Custom menu item content. -->
      
      <span
        class="cdx-menu-item__content"
      >
        <!-- Thumbnail, thumbnail placeholder, or icon. -->
        <!--v-if-->
        <!-- Item text. -->
        <span
          class="cdx-menu-item__text"
        >
          <!-- Item label. -->
          <span
            class="cdx-menu-item__text__label"
          >
            <bdi>
              Option B
            </bdi>
          </span>
          <!-- Item search query match (e.g. alias). -->
          <!--v-if-->
          <!-- Item description. -->
          <!--v-if-->
        </span>
      </span>
      
    </li>
    <li
      aria-disabled="false"
      aria-selected="false"
      class="cdx-menu-item cdx-menu-item--enabled"
      id="cdx-menu-item-4"
      role="option"
    >
      <!-- @slot Custom menu item content. -->
      
      <span
        class="cdx-menu-item__content"
      >
        <!-- Thumbnail, thumbnail placeholder, or icon. -->
        <!--v-if-->
        <!-- Item text. -->
        <span
          class="cdx-menu-item__text"
        >
          <!-- Item label. -->
          <span
            class="cdx-menu-item__text__label"
          >
            <bdi>
              c
            </bdi>
          </span>
          <!-- Item search query match (e.g. alias). -->
          <!--v-if-->
          <!-- Item description. -->
          <!--v-if-->
        </span>
      </span>
      
    </li>
    <li
      aria-disabled="true"
      aria-selected="false"
      class="cdx-menu-item cdx-menu-item--disabled"
      id="cdx-menu-item-5"
      role="option"
    >
      <!-- @slot Custom menu item content. -->
      
      <span
        class="cdx-menu-item__content"
      >
        <!-- Thumbnail, thumbnail placeholder, or icon. -->
        <!--v-if-->
        <!-- Item text. -->
        <span
          class="cdx-menu-item__text"
        >
          <!-- Item label. -->
          <span
            class="cdx-menu-item__text__label"
          >
            <bdi>
              Option D
            </bdi>
          </span>
          <!-- Item search query match (e.g. alias). -->
          <!--v-if-->
          <!-- Item description. -->
          <!--v-if-->
        </span>
      </span>
      
    </li>
    
  </ul>
</div>
`;

exports[`Basic usage Case 1 Menu item with label selected: ([[Object], [Object], [Object], [Object]]) => HTML 1`] = `
<div
  class="cdx-select cdx-select--value-selected"
>
  <div
    aria-autocomplete="list"
    aria-disabled="false"
    aria-expanded="false"
    aria-haspopup="listbox"
    aria-labelledby="cdx-select-handle-6"
    aria-owns="cdx-select-menu-7"
    class="cdx-select__handle"
    role="combobox"
    tabindex="0"
  >
    <span
      aria-readonly="true"
      id="cdx-select-handle-6"
      role="textbox"
    >
      <!--
					@slot Display of the current selection or default label
					@binding {MenuItemData|undefined} selectedMenuItem The currently selected menu
					item
					@binding {string} defaultLabel The default label, provided via a prop
				-->
      
      Option A
      
    </span>
    <span
      class="cdx-icon cdx-select__indicator"
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
            d="m17.5 4.75-7.5 7.5-7.5-7.5L1 6.25l9 9 9-9z"
          />
        </g>
      </svg>
    </span>
  </div>
  <ul
    aria-multiselectable="false"
    class="cdx-menu"
    id="cdx-select-menu-7"
    role="listbox"
    style="display: none;"
  >
    <!--v-if-->
    
    <li
      aria-disabled="false"
      aria-selected="true"
      class="cdx-menu-item cdx-menu-item--selected cdx-menu-item--enabled"
      id="cdx-menu-item-8"
      role="option"
    >
      <!-- @slot Custom menu item content. -->
      
      <span
        class="cdx-menu-item__content"
      >
        <!-- Thumbnail, thumbnail placeholder, or icon. -->
        <!--v-if-->
        <!-- Item text. -->
        <span
          class="cdx-menu-item__text"
        >
          <!-- Item label. -->
          <span
            class="cdx-menu-item__text__label"
          >
            <bdi>
              Option A
            </bdi>
          </span>
          <!-- Item search query match (e.g. alias). -->
          <!--v-if-->
          <!-- Item description. -->
          <!--v-if-->
        </span>
      </span>
      
    </li>
    <li
      aria-disabled="false"
      aria-selected="false"
      class="cdx-menu-item cdx-menu-item--enabled"
      id="cdx-menu-item-9"
      role="option"
    >
      <!-- @slot Custom menu item content. -->
      
      <span
        class="cdx-menu-item__content"
      >
        <!-- Thumbnail, thumbnail placeholder, or icon. -->
        <!--v-if-->
        <!-- Item text. -->
        <span
          class="cdx-menu-item__text"
        >
          <!-- Item label. -->
          <span
            class="cdx-menu-item__text__label"
          >
            <bdi>
              Option B
            </bdi>
          </span>
          <!-- Item search query match (e.g. alias). -->
          <!--v-if-->
          <!-- Item description. -->
          <!--v-if-->
        </span>
      </span>
      
    </li>
    <li
      aria-disabled="false"
      aria-selected="false"
      class="cdx-menu-item cdx-menu-item--enabled"
      id="cdx-menu-item-10"
      role="option"
    >
      <!-- @slot Custom menu item content. -->
      
      <span
        class="cdx-menu-item__content"
      >
        <!-- Thumbnail, thumbnail placeholder, or icon. -->
        <!--v-if-->
        <!-- Item text. -->
        <span
          class="cdx-menu-item__text"
        >
          <!-- Item label. -->
          <span
            class="cdx-menu-item__text__label"
          >
            <bdi>
              c
            </bdi>
          </span>
          <!-- Item search query match (e.g. alias). -->
          <!--v-if-->
          <!-- Item description. -->
          <!--v-if-->
        </span>
      </span>
      
    </li>
    <li
      aria-disabled="true"
      aria-selected="false"
      class="cdx-menu-item cdx-menu-item--disabled"
      id="cdx-menu-item-11"
      role="option"
    >
      <!-- @slot Custom menu item content. -->
      
      <span
        class="cdx-menu-item__content"
      >
        <!-- Thumbnail, thumbnail placeholder, or icon. -->
        <!--v-if-->
        <!-- Item text. -->
        <span
          class="cdx-menu-item__text"
        >
          <!-- Item label. -->
          <span
            class="cdx-menu-item__text__label"
          >
            <bdi>
              Option D
            </bdi>
          </span>
          <!-- Item search query match (e.g. alias). -->
          <!--v-if-->
          <!-- Item description. -->
          <!--v-if-->
        </span>
      </span>
      
    </li>
    
  </ul>
</div>
`;

exports[`Basic usage Case 2 Menu item with no label selected: ([[Object], [Object], [Object], [Object]]) => HTML 1`] = `
<div
  class="cdx-select cdx-select--value-selected"
>
  <div
    aria-autocomplete="list"
    aria-disabled="false"
    aria-expanded="false"
    aria-haspopup="listbox"
    aria-labelledby="cdx-select-handle-12"
    aria-owns="cdx-select-menu-13"
    class="cdx-select__handle"
    role="combobox"
    tabindex="0"
  >
    <span
      aria-readonly="true"
      id="cdx-select-handle-12"
      role="textbox"
    >
      <!--
					@slot Display of the current selection or default label
					@binding {MenuItemData|undefined} selectedMenuItem The currently selected menu
					item
					@binding {string} defaultLabel The default label, provided via a prop
				-->
      
      c
      
    </span>
    <span
      class="cdx-icon cdx-select__indicator"
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
            d="m17.5 4.75-7.5 7.5-7.5-7.5L1 6.25l9 9 9-9z"
          />
        </g>
      </svg>
    </span>
  </div>
  <ul
    aria-multiselectable="false"
    class="cdx-menu"
    id="cdx-select-menu-13"
    role="listbox"
    style="display: none;"
  >
    <!--v-if-->
    
    <li
      aria-disabled="false"
      aria-selected="false"
      class="cdx-menu-item cdx-menu-item--enabled"
      id="cdx-menu-item-14"
      role="option"
    >
      <!-- @slot Custom menu item content. -->
      
      <span
        class="cdx-menu-item__content"
      >
        <!-- Thumbnail, thumbnail placeholder, or icon. -->
        <!--v-if-->
        <!-- Item text. -->
        <span
          class="cdx-menu-item__text"
        >
          <!-- Item label. -->
          <span
            class="cdx-menu-item__text__label"
          >
            <bdi>
              Option A
            </bdi>
          </span>
          <!-- Item search query match (e.g. alias). -->
          <!--v-if-->
          <!-- Item description. -->
          <!--v-if-->
        </span>
      </span>
      
    </li>
    <li
      aria-disabled="false"
      aria-selected="false"
      class="cdx-menu-item cdx-menu-item--enabled"
      id="cdx-menu-item-15"
      role="option"
    >
      <!-- @slot Custom menu item content. -->
      
      <span
        class="cdx-menu-item__content"
      >
        <!-- Thumbnail, thumbnail placeholder, or icon. -->
        <!--v-if-->
        <!-- Item text. -->
        <span
          class="cdx-menu-item__text"
        >
          <!-- Item label. -->
          <span
            class="cdx-menu-item__text__label"
          >
            <bdi>
              Option B
            </bdi>
          </span>
          <!-- Item search query match (e.g. alias). -->
          <!--v-if-->
          <!-- Item description. -->
          <!--v-if-->
        </span>
      </span>
      
    </li>
    <li
      aria-disabled="false"
      aria-selected="true"
      class="cdx-menu-item cdx-menu-item--selected cdx-menu-item--enabled"
      id="cdx-menu-item-16"
      role="option"
    >
      <!-- @slot Custom menu item content. -->
      
      <span
        class="cdx-menu-item__content"
      >
        <!-- Thumbnail, thumbnail placeholder, or icon. -->
        <!--v-if-->
        <!-- Item text. -->
        <span
          class="cdx-menu-item__text"
        >
          <!-- Item label. -->
          <span
            class="cdx-menu-item__text__label"
          >
            <bdi>
              c
            </bdi>
          </span>
          <!-- Item search query match (e.g. alias). -->
          <!--v-if-->
          <!-- Item description. -->
          <!--v-if-->
        </span>
      </span>
      
    </li>
    <li
      aria-disabled="true"
      aria-selected="false"
      class="cdx-menu-item cdx-menu-item--disabled"
      id="cdx-menu-item-17"
      role="option"
    >
      <!-- @slot Custom menu item content. -->
      
      <span
        class="cdx-menu-item__content"
      >
        <!-- Thumbnail, thumbnail placeholder, or icon. -->
        <!--v-if-->
        <!-- Item text. -->
        <span
          class="cdx-menu-item__text"
        >
          <!-- Item label. -->
          <span
            class="cdx-menu-item__text__label"
          >
            <bdi>
              Option D
            </bdi>
          </span>
          <!-- Item search query match (e.g. alias). -->
          <!--v-if-->
          <!-- Item description. -->
          <!--v-if-->
        </span>
      </span>
      
    </li>
    
  </ul>
</div>
`;

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
					@binding {MenuOption|undefined} selectedOption The currently selected option
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
    class="cdx-select__menu"
    id="cdx-select-menu-1"
    role="listbox"
    style="display: none;"
  >
    
    <li
      aria-disabled="false"
      aria-selected="false"
      class="cdx-option cdx-option--enabled"
      id="cdx-option-2"
      role="option"
    >
      <!-- @slot Optional content, will replace label if provided -->
      
      Option A
      
    </li>
    <li
      aria-disabled="false"
      aria-selected="false"
      class="cdx-option cdx-option--enabled"
      id="cdx-option-3"
      role="option"
    >
      <!-- @slot Optional content, will replace label if provided -->
      
      Option B
      
    </li>
    <li
      aria-disabled="false"
      aria-selected="false"
      class="cdx-option cdx-option--enabled"
      id="cdx-option-4"
      role="option"
    >
      <!-- @slot Optional content, will replace label if provided -->
      
      c
      
    </li>
    <li
      aria-disabled="true"
      aria-selected="false"
      class="cdx-option cdx-option--disabled"
      id="cdx-option-5"
      role="option"
    >
      <!-- @slot Optional content, will replace label if provided -->
      
      Option D
      
    </li>
    
  </ul>
</div>
`;

exports[`Basic usage Case 1 Option with label selected: ([[Object], [Object], [Object], [Object]]) => HTML 1`] = `
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
					@binding {MenuOption|undefined} selectedOption The currently selected option
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
    class="cdx-select__menu"
    id="cdx-select-menu-7"
    role="listbox"
    style="display: none;"
  >
    
    <li
      aria-disabled="false"
      aria-selected="true"
      class="cdx-option cdx-option--selected cdx-option--enabled"
      id="cdx-option-8"
      role="option"
    >
      <!-- @slot Optional content, will replace label if provided -->
      
      Option A
      
    </li>
    <li
      aria-disabled="false"
      aria-selected="false"
      class="cdx-option cdx-option--enabled"
      id="cdx-option-9"
      role="option"
    >
      <!-- @slot Optional content, will replace label if provided -->
      
      Option B
      
    </li>
    <li
      aria-disabled="false"
      aria-selected="false"
      class="cdx-option cdx-option--enabled"
      id="cdx-option-10"
      role="option"
    >
      <!-- @slot Optional content, will replace label if provided -->
      
      c
      
    </li>
    <li
      aria-disabled="true"
      aria-selected="false"
      class="cdx-option cdx-option--disabled"
      id="cdx-option-11"
      role="option"
    >
      <!-- @slot Optional content, will replace label if provided -->
      
      Option D
      
    </li>
    
  </ul>
</div>
`;

exports[`Basic usage Case 2 Option with no label selected: ([[Object], [Object], [Object], [Object]]) => HTML 1`] = `
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
					@binding {MenuOption|undefined} selectedOption The currently selected option
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
    class="cdx-select__menu"
    id="cdx-select-menu-13"
    role="listbox"
    style="display: none;"
  >
    
    <li
      aria-disabled="false"
      aria-selected="false"
      class="cdx-option cdx-option--enabled"
      id="cdx-option-14"
      role="option"
    >
      <!-- @slot Optional content, will replace label if provided -->
      
      Option A
      
    </li>
    <li
      aria-disabled="false"
      aria-selected="false"
      class="cdx-option cdx-option--enabled"
      id="cdx-option-15"
      role="option"
    >
      <!-- @slot Optional content, will replace label if provided -->
      
      Option B
      
    </li>
    <li
      aria-disabled="false"
      aria-selected="true"
      class="cdx-option cdx-option--selected cdx-option--enabled"
      id="cdx-option-16"
      role="option"
    >
      <!-- @slot Optional content, will replace label if provided -->
      
      c
      
    </li>
    <li
      aria-disabled="true"
      aria-selected="false"
      class="cdx-option cdx-option--disabled"
      id="cdx-option-17"
      role="option"
    >
      <!-- @slot Optional content, will replace label if provided -->
      
      Option D
      
    </li>
    
  </ul>
</div>
`;

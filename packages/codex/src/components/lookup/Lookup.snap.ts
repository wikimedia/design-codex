// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`Basic usage Case 0 Default: ([]) => HTML 1`] = `
<div
  class="cdx-lookup"
>
  <div
    class="cdx-text-input"
  >
    <input
      aria-autocomplete="list"
      aria-expanded="false"
      aria-owns="cdx-lookup-menu-0"
      autocomplete="off"
      class="cdx-text-input__input"
      role="combobox"
      type="text"
    />
    <!--v-if-->
    <!--v-if-->
  </div>
  <ul
    aria-multiselectable="false"
    class="cdx-menu"
    id="cdx-lookup-menu-0"
    role="listbox"
    style="display: none;"
  >
    
    
    <!--v-if-->
  </ul>
</div>
`;

exports[`Basic usage Case 1 With initial input: ([[Object], [Object], [Object], [Object]]) => HTML 1`] = `
<div
  class="cdx-lookup"
>
  <div
    class="cdx-text-input"
  >
    <input
      aria-autocomplete="list"
      aria-expanded="false"
      aria-owns="cdx-lookup-menu-1"
      autocomplete="off"
      class="cdx-text-input__input"
      role="combobox"
      type="text"
    />
    <!--v-if-->
    <!--v-if-->
  </div>
  <ul
    aria-multiselectable="false"
    class="cdx-menu"
    id="cdx-lookup-menu-1"
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
    
    <!--v-if-->
  </ul>
</div>
`;

exports[`Basic usage Case 2 With selection: ([[Object], [Object], [Object], [Object]]) => HTML 1`] = `
<div
  class="cdx-lookup"
>
  <div
    class="cdx-text-input"
  >
    <input
      aria-autocomplete="list"
      aria-expanded="false"
      aria-owns="cdx-lookup-menu-6"
      autocomplete="off"
      class="cdx-text-input__input"
      role="combobox"
      type="text"
    />
    <!--v-if-->
    <!--v-if-->
  </div>
  <ul
    aria-multiselectable="false"
    class="cdx-menu"
    id="cdx-lookup-menu-6"
    role="listbox"
    style="display: none;"
  >
    
    <li
      aria-disabled="false"
      aria-selected="true"
      class="cdx-option cdx-option--selected cdx-option--enabled"
      id="cdx-option-7"
      role="option"
    >
      <!-- @slot Optional content, will replace label if provided -->
      
      Option A
      
    </li>
    <li
      aria-disabled="false"
      aria-selected="false"
      class="cdx-option cdx-option--enabled"
      id="cdx-option-8"
      role="option"
    >
      <!-- @slot Optional content, will replace label if provided -->
      
      Option B
      
    </li>
    <li
      aria-disabled="false"
      aria-selected="false"
      class="cdx-option cdx-option--enabled"
      id="cdx-option-9"
      role="option"
    >
      <!-- @slot Optional content, will replace label if provided -->
      
      c
      
    </li>
    <li
      aria-disabled="true"
      aria-selected="false"
      class="cdx-option cdx-option--disabled"
      id="cdx-option-10"
      role="option"
    >
      <!-- @slot Optional content, will replace label if provided -->
      
      Option D
      
    </li>
    
    <!--v-if-->
  </ul>
</div>
`;

exports[`Basic usage Case 3 Disabled: ([]) => HTML 1`] = `
<div
  class="cdx-lookup cdx-lookup--disabled"
>
  <div
    class="cdx-text-input"
  >
    <input
      aria-autocomplete="list"
      aria-expanded="false"
      aria-owns="cdx-lookup-menu-11"
      autocomplete="off"
      class="cdx-text-input__input"
      disabled=""
      role="combobox"
      type="text"
    />
    <!--v-if-->
    <!--v-if-->
  </div>
  <ul
    aria-multiselectable="false"
    class="cdx-menu"
    id="cdx-lookup-menu-11"
    role="listbox"
    style="display: none;"
  >
    
    
    <!--v-if-->
  </ul>
</div>
`;

exports[`Basic usage Case 4 With footer content: ([]) => HTML 1`] = `
<div
  class="cdx-lookup"
>
  <div
    class="cdx-text-input"
  >
    <input
      aria-autocomplete="list"
      aria-expanded="false"
      aria-owns="cdx-lookup-menu-12"
      autocomplete="off"
      class="cdx-text-input__input"
      role="combobox"
      type="text"
    />
    <!--v-if-->
    <!--v-if-->
  </div>
  <ul
    aria-multiselectable="false"
    class="cdx-menu"
    id="cdx-lookup-menu-12"
    role="listbox"
    style="display: none;"
  >
    
    
    <li
      class="cdx-option"
    >
      <!--
				@slot Optional content to display at the end of the options list
			-->
      
      <!--
					@slot Content to display at the end of the options list
				-->
      
      No results
      
      
    </li>
  </ul>
</div>
`;

exports[`Basic usage Case 5 With class attributes: ([]) => HTML 1`] = `
<div
  class="cdx-lookup class-one class-two"
>
  <div
    class="cdx-text-input"
  >
    <input
      aria-autocomplete="list"
      aria-expanded="false"
      aria-owns="cdx-lookup-menu-13"
      autocomplete="off"
      class="cdx-text-input__input"
      role="combobox"
      type="text"
    />
    <!--v-if-->
    <!--v-if-->
  </div>
  <ul
    aria-multiselectable="false"
    class="cdx-menu"
    id="cdx-lookup-menu-13"
    role="listbox"
    style="display: none;"
  >
    
    
    <!--v-if-->
  </ul>
</div>
`;

exports[`Basic usage Case 6 With type and placeholder attributes: ([]) => HTML 1`] = `
<div
  class="cdx-lookup"
>
  <div
    class="cdx-text-input"
  >
    <input
      aria-autocomplete="list"
      aria-expanded="false"
      aria-owns="cdx-lookup-menu-14"
      autocomplete="off"
      class="cdx-text-input__input"
      placeholder="Type something... "
      role="combobox"
      type="search"
    />
    <!--v-if-->
    <!--v-if-->
  </div>
  <ul
    aria-multiselectable="false"
    class="cdx-menu"
    id="cdx-lookup-menu-14"
    role="listbox"
    style="display: none;"
  >
    
    
    <!--v-if-->
  </ul>
</div>
`;

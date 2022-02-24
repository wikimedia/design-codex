// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`Matches the snapshots Case 0 Nothing selected: => HTML 1`] = `
<ul
  aria-multiselectable="false"
  class="cdx-menu"
  role="listbox"
>
  
  <li
    aria-disabled="false"
    aria-selected="false"
    class="cdx-option cdx-option--enabled"
    id="cdx-option-4"
    role="option"
  >
    <!-- @slot Optional content, will replace label if provided -->
    
    Option A
    
  </li>
  <li
    aria-disabled="false"
    aria-selected="false"
    class="cdx-option cdx-option--enabled"
    id="cdx-option-5"
    role="option"
  >
    <!-- @slot Optional content, will replace label if provided -->
    
    Option B
    
  </li>
  <li
    aria-disabled="false"
    aria-selected="false"
    class="cdx-option cdx-option--enabled"
    id="cdx-option-6"
    role="option"
  >
    <!-- @slot Optional content, will replace label if provided -->
    
    c
    
  </li>
  <li
    aria-disabled="true"
    aria-selected="false"
    class="cdx-option cdx-option--disabled"
    id="cdx-option-7"
    role="option"
  >
    <!-- @slot Optional content, will replace label if provided -->
    
    Option D
    
  </li>
  
  <!--v-if-->
</ul>
`;

exports[`Matches the snapshots Case 1 Something selected: => HTML 1`] = `
<ul
  aria-multiselectable="false"
  class="cdx-menu"
  role="listbox"
>
  
  <li
    aria-disabled="false"
    aria-selected="false"
    class="cdx-option cdx-option--enabled"
    id="cdx-option-8"
    role="option"
  >
    <!-- @slot Optional content, will replace label if provided -->
    
    Option A
    
  </li>
  <li
    aria-disabled="false"
    aria-selected="true"
    class="cdx-option cdx-option--selected cdx-option--enabled"
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
  
  <!--v-if-->
</ul>
`;

exports[`Matches the snapshots Case 2 Not expanded: => HTML 1`] = `
<ul
  aria-multiselectable="false"
  class="cdx-menu"
  role="listbox"
  style="display: none;"
>
  
  <li
    aria-disabled="false"
    aria-selected="false"
    class="cdx-option cdx-option--enabled"
    id="cdx-option-12"
    role="option"
  >
    <!-- @slot Optional content, will replace label if provided -->
    
    Option A
    
  </li>
  <li
    aria-disabled="false"
    aria-selected="true"
    class="cdx-option cdx-option--selected cdx-option--enabled"
    id="cdx-option-13"
    role="option"
  >
    <!-- @slot Optional content, will replace label if provided -->
    
    Option B
    
  </li>
  <li
    aria-disabled="false"
    aria-selected="false"
    class="cdx-option cdx-option--enabled"
    id="cdx-option-14"
    role="option"
  >
    <!-- @slot Optional content, will replace label if provided -->
    
    c
    
  </li>
  <li
    aria-disabled="true"
    aria-selected="false"
    class="cdx-option cdx-option--disabled"
    id="cdx-option-15"
    role="option"
  >
    <!-- @slot Optional content, will replace label if provided -->
    
    Option D
    
  </li>
  
  <!--v-if-->
</ul>
`;

exports[`Matches the snapshots Case 3 With footer: => HTML 1`] = `
<ul
  aria-multiselectable="false"
  class="cdx-menu"
  role="listbox"
>
  
  <li
    aria-disabled="false"
    aria-selected="false"
    class="cdx-option cdx-option--enabled"
    id="cdx-option-16"
    role="option"
  >
    <!-- @slot Optional content, will replace label if provided -->
    
    Option A
    
  </li>
  <li
    aria-disabled="false"
    aria-selected="true"
    class="cdx-option cdx-option--selected cdx-option--enabled"
    id="cdx-option-17"
    role="option"
  >
    <!-- @slot Optional content, will replace label if provided -->
    
    Option B
    
  </li>
  <li
    aria-disabled="false"
    aria-selected="false"
    class="cdx-option cdx-option--enabled"
    id="cdx-option-18"
    role="option"
  >
    <!-- @slot Optional content, will replace label if provided -->
    
    c
    
  </li>
  <li
    aria-disabled="true"
    aria-selected="false"
    class="cdx-option cdx-option--disabled"
    id="cdx-option-19"
    role="option"
  >
    <!-- @slot Optional content, will replace label if provided -->
    
    Option D
    
  </li>
  
  <li
    class="cdx-option"
  >
    <!--
				@slot Optional content to display at the end of the options list
			-->
    
    Footer text
    
  </li>
</ul>
`;

exports[`Matches the snapshots Case 4 Custom option rendering: => HTML 1`] = `
<ul
  aria-multiselectable="false"
  class="cdx-menu"
  role="listbox"
>
  
  <li
    aria-disabled="false"
    aria-selected="false"
    class="cdx-option cdx-option--enabled"
    id="cdx-option-20"
    role="option"
  >
    <!-- @slot Optional content, will replace label if provided -->
    
    <!--
				@slot Display of an individual option in the menu
				@binding {MenuOption} option The current option
			-->
    
    Option A (value: a) 
    
    
  </li>
  <li
    aria-disabled="false"
    aria-selected="true"
    class="cdx-option cdx-option--selected cdx-option--enabled"
    id="cdx-option-21"
    role="option"
  >
    <!-- @slot Optional content, will replace label if provided -->
    
    <!--
				@slot Display of an individual option in the menu
				@binding {MenuOption} option The current option
			-->
    
    Option B (value: b) 
    
    
  </li>
  <li
    aria-disabled="false"
    aria-selected="false"
    class="cdx-option cdx-option--enabled"
    id="cdx-option-22"
    role="option"
  >
    <!-- @slot Optional content, will replace label if provided -->
    
    <!--
				@slot Display of an individual option in the menu
				@binding {MenuOption} option The current option
			-->
    
     (value: c) 
    
    
  </li>
  <li
    aria-disabled="true"
    aria-selected="false"
    class="cdx-option cdx-option--disabled"
    id="cdx-option-23"
    role="option"
  >
    <!-- @slot Optional content, will replace label if provided -->
    
    <!--
				@slot Display of an individual option in the menu
				@binding {MenuOption} option The current option
			-->
    
    Option D (value: d) 
    
    
  </li>
  
  <!--v-if-->
</ul>
`;
